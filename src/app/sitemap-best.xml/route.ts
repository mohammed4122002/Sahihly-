import { SITE_URL } from "@/lib/i18n/config";
import { roundups } from "@/content/tools";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = roundups.map((r) => ({
    loc: `${SITE_URL}/best/${r.slug}`,
    lastmod,
    changefreq: "weekly",
    priority: 0.75,
  }));
  return xmlResponse(urlsetXml(entries));
}
