import { SITE_URL } from "@/lib/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { urlsetXml, xmlResponse, type Entry } from "@/lib/sitemap-xml";

export const revalidate = 600;

export async function GET() {
  const posts = await getAllPosts();
  const entries: Entry[] = posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: 0.7,
  }));
  return xmlResponse(urlsetXml(entries));
}
