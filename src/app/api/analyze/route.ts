import { NextRequest, NextResponse } from "next/server";
import { detectAI, humanizeText } from "@/lib/analysis";
import { countWords } from "@/lib/utils";
import { createHash } from "crypto";

export const runtime = "nodejs";
export const maxDuration = 60;

const FREE_WORD_LIMIT = 250;
const FREE_DAILY_RUNS = 3;

// Best-effort in-memory limiter (per warm instance). DB-backed limiting can be
// layered on for production via the service client.
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

  const words = countWords(text);
  if (words > FREE_WORD_LIMIT) {
    return NextResponse.json(
      { error: "too_long", limit: FREE_WORD_LIMIT, words },
      { status: 413 }
    );
  }

  // daily run limit (best-effort)
  const key = clientKey(req);
  const today = new Date().toISOString().slice(0, 10);
  const entry = memory.get(key);
  if (entry && entry.day === today) {
    if (entry.count >= FREE_DAILY_RUNS) {
      return NextResponse.json(
        { error: "limit_reached", limit: FREE_DAILY_RUNS },
        { status: 429 }
      );
    }
    entry.count += 1;
  } else {
    memory.set(key, { day: today, count: 1 });
  }

  try {
    if (kind === "humanize") {
      const result = await humanizeText(text, locale);
      return NextResponse.json({ kind, ...result, words });
    }
    const result = await detectAI(text, locale);
    return NextResponse.json({ kind, ...result, words });
  } catch (err) {
    console.error("analyze error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
