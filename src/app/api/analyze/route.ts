import { NextRequest, NextResponse } from "next/server";
import { detectAI, humanizeText } from "@/lib/analysis";
import { countWords } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createHash } from "crypto";

export const runtime = "nodejs";
export const maxDuration = 60;

// Per-plan limits — mirrors the pricing page.
const PLAN_LIMITS: Record<string, { words: number; dailyRuns: number | null }> = {
  free: { words: 250, dailyRuns: 3 },
  pro: { words: 3000, dailyRuns: null }, // null = unlimited
  ultimate: { words: 12000, dailyRuns: null },
};

// Best-effort in-memory limiter (per warm instance) for anonymous users.
const memory = new Map<string, { day: string; count: number }>();

function clientKey(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

export async function POST(req: NextRequest) {
  let body: { text?: string; kind?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const text = (body.text || "").toString();
  const kind = body.kind === "humanize" ? "humanize" : "detect";
  const locale = body.locale === "ar" ? "ar" : "en";

  if (!text.trim()) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  // Resolve the caller's plan (anonymous => free).
  let userId: string | null = null;
  let plan = "free";
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.plan && PLAN_LIMITS[profile.plan]) plan = profile.plan;
    }
  } catch {
    /* treat as anonymous */
  }

  const limits = PLAN_LIMITS[plan];
  const words = countWords(text);
  if (words > limits.words) {
    return NextResponse.json(
      { error: "too_long", limit: limits.words, words, plan },
      { status: 413 }
    );
  }

  // Daily run limit — only for plans that have one.
  if (limits.dailyRuns !== null) {
    const key = userId ?? clientKey(req);
    const today = new Date().toISOString().slice(0, 10);
    const entry = memory.get(key);
    if (entry && entry.day === today) {
      if (entry.count >= limits.dailyRuns) {
        return NextResponse.json(
          { error: "limit_reached", limit: limits.dailyRuns, plan },
          { status: 429 }
        );
      }
      entry.count += 1;
    } else {
      memory.set(key, { day: today, count: 1 });
    }
  }

  try {
    let payload: Record<string, unknown>;
    if (kind === "humanize") {
      const result = await humanizeText(text, locale);
      payload = { kind, ...result, words, plan };
    } else {
      const result = await detectAI(text, locale);
      payload = { kind, ...result, words, plan };
    }

    // Save history for signed-in users (RLS: insert own rows only).
    if (userId) {
      try {
        const supabase = await createClient();
        await supabase.from("analyses").insert({
          user_id: userId,
          kind,
          locale,
          input_text: text.slice(0, 2000),
          word_count: words,
          result:
            kind === "detect"
              ? { score: payload.score, verdict: payload.verdict }
              : { engine: payload.engine },
        });
      } catch {
        /* history is best-effort */
      }
    }

    return NextResponse.json(payload);
  } catch (err) {
    console.error("analyze error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
