import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireStaff } from "@/lib/admin";
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

  const staff = await requireStaff();
  if (!staff) notFound();

  let posts: DbPost[] = [];
  let defaultAuthor = staff.user.email?.split("@")[0] || "";
  try {
    const svc = createServiceClient();
    const [{ data }, { data: profile }] = await Promise.all([
      svc
        .from("blog_posts")
        .select("id, slug, category, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, reading_time, author_name, published, created_at")
        .order("created_at", { ascending: false }),
      svc.from("profiles").select("full_name").eq("id", staff.user.id).maybeSingle(),
    ]);
    posts = (data ?? []) as DbPost[];
    if (profile?.full_name) defaultAuthor = profile.full_name;
  } catch {
    /* service key not set */
  }

  return (
    <div className="container-x py-8 sm:py-12">
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
      <AdminNav ar={ar} role={staff.role} />

      <div className="mt-6">
        <ArticleEditor posts={posts} ar={ar} defaultAuthor={defaultAuthor} />
      </div>
    </div>
  );
}
