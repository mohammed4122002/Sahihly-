import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireAdmin } from "@/lib/admin";
import { createServiceClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import ArticleEditor, { type DbPost } from "@/components/admin/ArticleEditor";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const admin = await requireAdmin();
  if (!admin) notFound();

  let posts: DbPost[] = [];
  try {
    const svc = createServiceClient();
    const { data } = await svc
      .from("blog_posts")
      .select("id, slug, category, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, reading_time, published, created_at")
      .order("created_at", { ascending: false });
    posts = (data ?? []) as DbPost[];
  } catch {
    /* service key not set */
  }

  return (
    <div className="container-x py-12">
      <div>
        <span className="eyebrow">{ar ? "المحتوى" : "Content"}</span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {ar ? "إدارة المقالات" : "Article management"}
        </h1>
        <p className="mt-1 text-sm text-white/40">
          {ar
            ? "أضف مقالات جديدة تظهر فوراً في المدونة والخريطة والبحث."
            : "Add articles that appear instantly in the blog, sitemap, and search."}
        </p>
      </div>
      <AdminNav ar={ar} />

      <div className="mt-6">
        <ArticleEditor posts={posts} ar={ar} />
      </div>
    </div>
  );
}
