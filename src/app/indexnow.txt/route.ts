import { NextResponse } from "next/server";

// IndexNow key file (keyLocation form). Set INDEXNOW_KEY to any long
// random hex string, e.g. `openssl rand -hex 16`.
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new NextResponse("", { status: 404 });
  return new NextResponse(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
