import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidateAuthorPages } from "@/lib/revalidate-public";

/**
 * Called by the account forms after a successful save.
 *
 * The forms write to Supabase straight from the browser, so there is no server
 * action for Next to hang cache invalidation off — without this the site kept
 * serving a writer's old name, photo and social links until the ISR window
 * happened to expire, and /about (built once, never revalidated) kept them
 * indefinitely.
 *
 * Requires a session: busting the public cache is harmless in itself, but an
 * open endpoint that does it on demand is a cheap way to make every page
 * regenerate on every request.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidateAuthorPages();
  return NextResponse.json({ ok: true });
}
