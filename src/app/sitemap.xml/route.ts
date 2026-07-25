import { SITE_URL } from "@/lib/i18n/config";
import { sitemapIndexXml, xmlResponse, today } from "@/lib/sitemap-xml";

export const revalidate = 3600;

/** Sitemap index — points Google at one child map per content type. */
export function GET() {
  const lastmod = today();
  const maps = [
    "sitemap-pages.xml",
    "sitemap-tools.xml",
    "sitemap-blog.xml",
    "sitemap-best.xml",
    "sitemap-vs.xml",
  ].map((f) => ({ loc: `${SITE_URL}/${f}`, lastmod }));

  return xmlResponse(sitemapIndexXml(maps));
}
