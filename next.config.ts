import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/**
 * Retired article slugs, pointed at whatever superseded them.
 *
 * Two pieces on the same question split each other's ranking instead of
 * compounding it, so the weaker URL is unpublished and sent here permanently —
 * a 301 hands its accumulated signals to the survivor, where a 404 would simply
 * throw them away along with any link anyone had already shared.
 *
 * Both language trees need an entry: /ar/blog/x is a separate URL to a crawler.
 */
const retiredPosts: Record<string, string> = {
  "turnitin-arabic-ai-detection2": "turnitin-arabic-ai-detection",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return Object.entries(retiredPosts).flatMap(([from, to]) => [
      { source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true },
      { source: `/ar/blog/${from}`, destination: `/ar/blog/${to}`, permanent: true },
    ]);
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // The embeddable widget must be frameable by third-party sites.
        // CSP frame-ancestors takes precedence over X-Frame-Options in
        // all modern browsers.
        source: "/embed",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
          { key: "X-Frame-Options", value: "" },
        ],
      },
    ];
  },
};

export default nextConfig;
