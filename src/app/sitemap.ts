import type { MetadataRoute } from "next";
import { SITE_URL, locales } from "@/lib/i18n/config";
import { posts } from "@/content/blog";
import { competitors } from "@/content/competitors";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/pricing", "/blog", "/about"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${p}`,
            ar: `${SITE_URL}/ar${p}`,
          },
        },
      });
    }
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    for (const c of competitors) {
      entries.push({
        url: `${SITE_URL}/${locale}/vs/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
