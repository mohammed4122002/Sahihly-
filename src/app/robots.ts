import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Arabic tree mirrors every path, so the private areas need blocking
      // in both — /ar/admin is a different URL to a crawler than /admin.
      disallow: [
        "/api/",
        "/dashboard",
        "/admin",
        "/account",
        "/ar/dashboard",
        "/ar/admin",
        "/ar/account",
      ],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-pages.xml`,
      `${SITE_URL}/sitemap-tools.xml`,
      `${SITE_URL}/sitemap-blog.xml`,
      `${SITE_URL}/sitemap-best.xml`,
      `${SITE_URL}/sitemap-vs.xml`,
      `${SITE_URL}/sitemap-alternatives.xml`,
    ],
    host: SITE_URL,
  };
}
