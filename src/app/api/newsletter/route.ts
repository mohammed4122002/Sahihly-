import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, locale } = (await req.json()) as { email?: string; locale?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  try {
    const supabase = await createClient();
    await supabase.from("subscribers").insert({ email, locale: locale === "ar" ? "ar" : "en" });
  } catch {
    // duplicate or not configured — treat as success for UX
  }
  return NextResponse.json({ ok: true });
}
