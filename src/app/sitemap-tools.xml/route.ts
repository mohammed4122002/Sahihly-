import { SITE_URL } from "@/lib/i18n/config";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = [
    { loc: `${SITE_URL}/ai-detector`, lastmod, changefreq: "weekly", priority: 0.95 },
    { loc: `${SITE_URL}/ai-humanizer`, lastmod, changefreq: "weekly", priority: 0.95 },
    { loc: `${SITE_URL}/arabic-ai-detector`, lastmod, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE_URL}/chatgpt-detector`, lastmod, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE_URL}/word-counter`, lastmod, changefreq: "monthly", priority: 0.8 },
  ];
  return xmlResponse(urlsetXml(entries));
}
