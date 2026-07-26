import { NextResponse } from "next/server";
import { getHeaderUser } from "@/lib/auth-user";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Authoritative auth state for client chrome (header avatar/menu). Kept as
 * its own route handler — rather than fetched in the shared layout — so
 * public pages stay statically/ISR-rendered; only this small request is
 * dynamic. Also the only place allowed to resolve the env-based
 * ADMIN_EMAILS bootstrap, since that variable is never exposed to the
 * client bundle.
 */
export async function GET() {
  const user = await getHeaderUser();
  return NextResponse.json(
    { user },
    { headers: { "Cache-Control": "no-store" } }
  );
}
