import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sahihly — AI Detector & Humanizer",
    short_name: "Sahihly",
    description:
      "Bilingual AI detection and humanizing studio — Arabic + English on one engine.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b16",
    theme_color: "#0b1f3a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
