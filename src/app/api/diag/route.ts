import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { providerStatus, pingProviders } from "@/lib/analysis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * "I added the key and nothing changed."
 *
 * Environment variables on Vercel are baked into a deployment, so a key added
 * after the last build is invisible until a redeploy; a key that is present
 * but rejected looks identical from the outside, because both end at the same
 * statistical badge. This route separates the two without a redeploy and
 * without reading the value back: what the running instance can see, and —
 * with ?ping=1 — whether each key actually answers.
 *
 * Admin-only. It spends real quota and it echoes provider error text, neither
 * of which belongs on a public URL.
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const status = providerStatus();
  const ping = req.nextUrl.searchParams.get("ping") === "1";

  return NextResponse.json(
    {
      ...status,
      // Distinguishes "this build predates the key" from "the key is bad":
      // the deployment that served this response is the one doing the work.
      deployment: {
        commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
        env: process.env.VERCEL_ENV ?? null,
        builtAt: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      },
      ...(ping ? { ping: await pingProviders() } : {}),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
