import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sahihly — AI Detector & Humanizer, Arabic + English";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050b16 0%, #0b1f3a 55%, #16345f 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,95,211,0.45), transparent 65%)",
            top: -220,
            right: -160,
          }}
        />
        {/* S-check mark */}
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
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
        <div
          style={{
            marginTop: 28,
            fontSize: 82,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          sahihly
        </div>
        <div style={{ marginTop: 14, fontSize: 32, color: "#b8a6e8" }}>
          AI Detector & Humanizer — English + Arabic
        </div>
        <div style={{ marginTop: 26, fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
          Detect AI. Refine style. Write with confidence.
        </div>
      </div>
    ),
    { ...size }
  );
}
