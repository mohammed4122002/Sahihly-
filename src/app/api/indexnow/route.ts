import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { competitors } from "@/content/competitors";
import { roundups } from "@/content/tools";

export const runtime = "nodejs";

/**
 * Submits every indexable URL to IndexNow (Bing, DuckDuckGo, and the
 * engines behind ChatGPT Search pull from this). Call after each deploy:
 *   curl -X POST https://sahihly.com/api/indexnow
 */
export async function POST() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "indexnow_not_configured" }, { status: 503 });
  }

  const staticPaths = [
    "", "/ai-detector", "/ai-humanizer", "/arabic-ai-detector",
    "/chatgpt-detector", "/word-counter", "/glossary", "/pricing",
    "/blog", "/vs", "/best", "/about", "/contact", "/privacy", "/terms",
  ];
  const posts = await getAllPosts();
  const urlList = [
    ...staticPaths.map((p) => `${SITE_URL}${p}`),
    ...roundups.map((r) => `${SITE_URL}/best/${r.slug}`),
    ...posts.map((p) => `${SITE_URL}/blog/${p.slug}`),
    ...competitors.map((c) => `${SITE_URL}/vs/${c.slug}`),
  ];

  const host = new URL(SITE_URL).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${SITE_URL}/indexnow.txt`,
      urlList,
    }),
  });

  return NextResponse.json({
    submitted: urlList.length,
    status: res.status,
  });
}
