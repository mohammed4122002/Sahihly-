import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic Open Graph card: /og?title=...&sub=...
 * Gives every landing page its own share image (higher social CTR).
 * Latin text only — satori's bundled font lacks Arabic glyphs.
 */
export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Sahihly").slice(0, 70);
  const sub = (searchParams.get("sub") || "AI Detector & Humanizer — English + Arabic").slice(0, 100);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050b16 0%, #0b1f3a 55%, #16345f 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,95,211,0.4), transparent 65%)",
            top: -260,
            right: -180,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <path
              d="M33 13.5c-2.4-2.6-6-4-9.7-4-5.6 0-9.8 3.1-9.8 7.6 0 4.2 3.3 6 8.7 7.2 5.9 1.3 9.9 3.2 9.9 8.1 0 4.8-4.4 8-10.4 8-4.3 0-8.2-1.7-10.7-4.6"
              stroke="#b8a6e8"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M15 25.5l7 7 14-16"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: -1 }}>
            sahihly
          </span>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 68,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#b8a6e8", maxWidth: 900 }}>
          {sub}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          sahihly.com · Free · No signup
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
