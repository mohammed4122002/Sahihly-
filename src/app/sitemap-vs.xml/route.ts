import { SITE_URL } from "@/lib/i18n/config";
import { competitors } from "@/content/competitors";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = competitors.map((c) => ({
    loc: `${SITE_URL}/vs/${c.slug}`,
    lastmod,
    changefreq: "monthly",
    priority: 0.7,
  }));
  return xmlResponse(urlsetXml(entries));
}
