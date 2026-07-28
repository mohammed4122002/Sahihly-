export type Entry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** The Arabic twin of a clean (English) URL — mirrors localePath in lib/seo. */
function arabicTwin(loc: string): string {
  const url = new URL(loc);
  url.pathname = url.pathname === "/" ? "/ar" : `/ar${url.pathname}`;
  return url.toString().replace(/\/$/, "");
}

/**
 * Emits both language versions of every entry, each annotated with the full
 * hreflang set.
 *
 * A sitemap listing one URL per page tells Google the site is monolingual. The
 * Arabic pages live at their own URLs (see lib/seo), and the `xhtml:link`
 * annotations are what pair them with their English twins instead of leaving
 * the two looking like unrelated — or duplicate — documents.
 */
export function urlsetXml(entries: Entry[]): string {
  const body = entries
    .flatMap((e) => {
      const en = e.loc;
      const ar = arabicTwin(e.loc);
      const links = [
        `    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="ar" href="${esc(ar)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(en)}"/>`,
      ];
      return [en, ar].map((loc) => {
        const parts = [`    <loc>${esc(loc)}</loc>`, ...links];
        if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
        if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
        if (e.priority !== undefined)
          parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
        return `  <url>\n${parts.join("\n")}\n  </url>`;
      });
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

export function sitemapIndexXml(maps: { loc: string; lastmod?: string }[]): string {
  const body = maps
    .map(
      (m) =>
        `  <sitemap>\n    <loc>${esc(m.loc)}</loc>${
          m.lastmod ? `\n    <lastmod>${m.lastmod}</lastmod>` : ""
        }\n  </sitemap>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export const today = () => new Date().toISOString().slice(0, 10);
