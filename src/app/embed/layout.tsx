import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { inter, spaceGrotesk, plexArabic } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sahihly AI Detector — Embed",
  robots: { index: false, follow: false },
};

// Minimal chrome-free layout for third-party embedding via <iframe>.
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-screen bg-[#050b16] p-3 text-white sm:p-4">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
