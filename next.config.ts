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

/**
 * Roundup slugs now served at /best/{slug}. Every slug already starts with
 * "best-" (a leftover from when these lived at the site root as /{slug}), so
 * old links and cached copies still point at the flat URL — Search Console
 * caught Google trying /en/best-ai-tools-for-reports, which redirects the
 * /en prefix away but 404s right after since /best-ai-tools-for-reports was
 * never a route. Sending the flat URL into /best/{slug} instead lands it on
 * the live page and hands the redirect's accumulated signal on, rather than
 * dropping it at a 404.
 */
const roundupSlugs: string[] = [
  "best-ai-detectors",
  "best-ai-humanizers",
  "best-ai-writing-tools",
  "best-ai-tools-for-reports",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const postRedirects = Object.entries(retiredPosts).flatMap(([from, to]) => [
      { source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true },
      { source: `/ar/blog/${from}`, destination: `/ar/blog/${to}`, permanent: true },
    ]);
    const roundupRedirects = roundupSlugs.flatMap((slug) => [
      { source: `/${slug}`, destination: `/best/${slug}`, permanent: true },
      { source: `/ar/${slug}`, destination: `/ar/best/${slug}`, permanent: true },
      // /en/* is otherwise handled by middleware stripping the prefix, which
      // would bounce through the bare flat URL above for a second hop — worth
      // a direct entry since this is the exact form Search Console found.
      { source: `/en/${slug}`, destination: `/best/${slug}`, permanent: true },
    ]);
    return [...postRedirects, ...roundupRedirects];
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
