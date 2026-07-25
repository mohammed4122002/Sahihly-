import { SITE_URL } from "@/lib/i18n/config";
import { urlsetXml, xmlResponse, today, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastmod = today();
  const entries: Entry[] = [
    { loc: SITE_URL, lastmod, changefreq: "daily", priority: 1 },
    { loc: `${SITE_URL}/pricing`, lastmod, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE_URL}/blog`, lastmod, changefreq: "daily", priority: 0.8 },
    { loc: `${SITE_URL}/best`, lastmod, changefreq: "weekly", priority: 0.85 },
    { loc: `${SITE_URL}/vs`, lastmod, changefreq: "monthly", priority: 0.8 },
    { loc: `${SITE_URL}/glossary`, lastmod, changefreq: "monthly", priority: 0.6 },
    { loc: `${SITE_URL}/methodology`, lastmod, changefreq: "monthly", priority: 0.7 },
    { loc: `${SITE_URL}/about`, lastmod, changefreq: "monthly", priority: 0.6 },
    { loc: `${SITE_URL}/contact`, lastmod, changefreq: "yearly", priority: 0.5 },
    { loc: `${SITE_URL}/privacy`, lastmod, changefreq: "yearly", priority: 0.3 },
    { loc: `${SITE_URL}/terms`, lastmod, changefreq: "yearly", priority: 0.3 },
  ];
  return xmlResponse(urlsetXml(entries));
}
