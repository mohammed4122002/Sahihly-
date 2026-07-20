import { NextRequest, NextResponse } from "next/server";
import { detectAI, humanizeText, styleSignalScore, type HumanizeStyle } from "@/lib/analysis";
import { countWords } from "@/lib/utils";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { createHash } from "crypto";

export const runtime = "nodejs";
export const maxDuration = 60;

// Per-plan limits — mirrors the pricing page.
const PLAN_LIMITS: Record<string, { words: number; dailyRuns: number | null }> = {
  free: { words: 250, dailyRuns: 3 },
  pro: { words: 3000, dailyRuns: null }, // null = unlimited
  ultimate: { words: 12000, dailyRuns: null },
};

// Fallback in-memory limiter (per warm instance) when the DB isn't configured.
const memory = new Map<string, { day: string; count: number }>();

/**
 * Daily limit check. Prefers the atomic DB counter (accurate across all
 * serverless instances); falls back to per-instance memory.
 * Returns true when the run is allowed.
 */
async function allowRun(identifier: string, kind: string, limit: number): Promise<boolean> {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const svc = createServiceClient();
      const { data, error } = await svc.rpc("usage_increment", {
        p_identifier: identifier,
        p_kind: kind,
        p_limit: limit,
      });
      if (!error) return data === true;
    } catch {
      /* fall through to memory */
    }
  }
  const today = new Date().toISOString().slice(0, 10);
  const entry = memory.get(identifier);
  if (entry && entry.day === today) {
    if (entry.count >= limit) return false;
    entry.count += 1;
    return true;
  }
  memory.set(identifier, { day: today, count: 1 });
  return true;
}

function clientKey(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

export async function POST(req: NextRequest) {
  let body: { text?: string; kind?: string; locale?: string; style?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const text = (body.text || "").toString();
  const kind = body.kind === "humanize" ? "humanize" : "detect";
  const locale = body.locale === "ar" ? "ar" : "en";
  const style: HumanizeStyle = ["natural", "academic", "casual"].includes(body.style || "")
    ? (body.style as HumanizeStyle)
    : "natural";

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
    const allowed = await allowRun(key, kind, limits.dailyRuns);
    if (!allowed) {
      return NextResponse.json(
        { error: "limit_reached", limit: limits.dailyRuns, plan },
        { status: 429 }
      );
    }
  }

  try {
    let payload: Record<string, unknown>;
    if (kind === "humanize") {
      const result = await humanizeText(text, locale, style);
      // Verify loop: deterministic style-signal score before vs after,
      // so the user sees the rewrite actually moved the needle.
      const verify = {
        before: styleSignalScore(text),
        after: styleSignalScore(result.text),
      };
      payload = { kind, ...result, verify, style, words, plan };
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
