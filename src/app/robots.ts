import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard", "/admin"],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-pages.xml`,
      `${SITE_URL}/sitemap-tools.xml`,
      `${SITE_URL}/sitemap-blog.xml`,
      `${SITE_URL}/sitemap-best.xml`,
      `${SITE_URL}/sitemap-vs.xml`,
    ],
    host: SITE_URL,
  };
}
