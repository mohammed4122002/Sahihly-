import { SITE_URL } from "@/lib/i18n/config";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";
import { useCases } from "@/content/use-cases";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = [
    { loc: `${SITE_URL}/ai-detector`, lastmod, changefreq: "weekly", priority: 0.95 },
    { loc: `${SITE_URL}/ai-humanizer`, lastmod, changefreq: "weekly", priority: 0.95 },
    { loc: `${SITE_URL}/arabic-ai-detector`, lastmod, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE_URL}/chatgpt-detector`, lastmod, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE_URL}/word-counter`, lastmod, changefreq: "monthly", priority: 0.8 },
    { loc: `${SITE_URL}/readability-checker`, lastmod, changefreq: "monthly", priority: 0.8 },
    // Use-case landing pages: same tool, a different reader's question each time.
    ...useCases.map((u) => ({
      loc: `${SITE_URL}/ai-detector/${u.slug}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.85,
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
