import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const next = searchParams.get("next") || "/dashboard";

  // Provider / Supabase error passthrough → show it on the login page.
  const errDesc = searchParams.get("error_description") || searchParams.get("error");
  if (errDesc) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errDesc)}`
    );
  }

  const supabase = await createClient();

  // OAuth / PKCE flow
  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // Email confirmation / magic-link flow (token_hash form)
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
