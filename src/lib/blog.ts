import { createClient, createServiceClient } from "@/lib/supabase/server";
import { posts as staticPosts, type BlogPost } from "@/content/blog";
import { getAuthorUsernames } from "@/lib/authors";

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
  author_name: string | null;
  author_id: string | null;
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
    author: r.author_name || undefined,
    authorId: r.author_id || undefined,
  };
}

/** Byline photos for the accounts that published these posts.
 *
 *  Read with the service client on purpose: `profiles` is restricted to each
 *  user's own row, so a visitor's session cannot see an author's record, and
 *  opening that policy up would expose the email address stored alongside the
 *  photo. Only the two fields that belong on a public byline are selected, and
 *  a missing service key simply means no photo rather than a broken page. */
type AuthorBits = {
  avatar?: string;
  title: { ar: string; en: string };
  bio: { ar: string; en: string };
};

async function authorBits(ids: string[]): Promise<Map<string, AuthorBits>> {
  const unique = [...new Set(ids)];
  if (unique.length === 0 || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new Map();
  try {
    const svc = createServiceClient();
    const { data } = await svc
      .from("profiles")
      .select("id, avatar_url, title_ar, title_en, bio_ar, bio_en")
      .in("id", unique);
    type Row = {
      id: string;
      avatar_url: string | null;
      title_ar: string | null;
      title_en: string | null;
      bio_ar: string | null;
      bio_en: string | null;
    };
    return new Map(
      ((data ?? []) as Row[]).map((r) => [
        r.id,
        {
          avatar: r.avatar_url || undefined,
          title: { ar: (r.title_ar || "").trim(), en: (r.title_en || "").trim() },
          bio: { ar: (r.bio_ar || "").trim(), en: (r.bio_en || "").trim() },
        },
      ])
    );
  } catch {
    return new Map();
  }
}

async function dbPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, category, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, reading_time, author_name, author_id, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    const posts = (data as DbRow[]).map(rowToPost);
    const ids = posts.map((p) => p.authorId).filter((id): id is string => Boolean(id));
    const [bits, usernames] = await Promise.all([
      authorBits(ids),
      getAuthorUsernames(ids),
    ]);
    return posts.map((p) => {
      if (!p.authorId) return p;
      const b = bits.get(p.authorId);
      return {
        ...p,
        authorAvatar: b?.avatar ?? p.authorAvatar,
        authorUsername: usernames.get(p.authorId),
        authorTitle: b?.title,
        authorBio: b?.bio,
      };
    });
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
