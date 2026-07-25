import { SITE_URL } from "@/lib/i18n/config";
import { alternatives } from "@/content/alternatives";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = [
    { loc: `${SITE_URL}/alternatives`, lastmod, changefreq: "monthly", priority: 0.8 },
    ...alternatives.map((a) => ({
      loc: `${SITE_URL}/alternatives/${a.slug}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.75,
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
