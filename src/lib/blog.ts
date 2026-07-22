import { createClient } from "@/lib/supabase/server";
import { posts as staticPosts, type BlogPost } from "@/content/blog";

type DbRow = {
  slug: string;
  category: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  body_en: string | null;
  body_ar: string | null;
  reading_time: number;
  created_at: string;
};

function rowToPost(r: DbRow): BlogPost {
  return {
    slug: r.slug,
    date: String(r.created_at).slice(0, 10),
    readingTime: r.reading_time,
    category: r.category,
    title: { en: r.title_en, ar: r.title_ar },
    excerpt: { en: r.excerpt_en || "", ar: r.excerpt_ar || "" },
    body: { en: r.body_en || "", ar: r.body_ar || "" },
  };
}

async function dbPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, category, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, reading_time, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as DbRow[]).map(rowToPost);
  } catch {
    return [];
  }
}

/** All posts: DB-managed posts merged with built-in static ones, newest first.
 *  DB slugs win over static duplicates. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await dbPosts();
  const seen = new Set(db.map((p) => p.slug));
  const merged = [...db, ...staticPosts.filter((p) => !seen.has(p.slug))];
  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug);
}
