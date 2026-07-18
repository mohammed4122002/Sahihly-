import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: (body.name || "").slice(0, 120),
      email: email.slice(0, 200),
      subject: (body.subject || "").slice(0, 200),
      message: message.slice(0, 5000),
      locale: body.locale === "ar" ? "ar" : "en",
    });
    if (error) throw error;
  } catch (err) {
    console.error("contact insert failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
