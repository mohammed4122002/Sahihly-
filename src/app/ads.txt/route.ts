import { NextResponse } from "next/server";

// Google AdSense ads.txt — served when the publisher id is configured.
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) {
    return new NextResponse("", { status: 404 });
  }
  const pub = client.replace(/^ca-/, ""); // ca-pub-XXXX -> pub-XXXX
  return new NextResponse(
    `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
