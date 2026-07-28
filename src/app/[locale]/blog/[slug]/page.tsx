import TreeLink from "@/components/TreeLink";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale, ORG_ID } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { withHeadingIds } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import VerifiedBadge from "@/components/VerifiedBadge";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title[loc],
    description: post.excerpt[loc],
    alternates: alternatesFor(loc, `/blog/${slug}`),
    openGraph: {
      title: post.title[loc],
      description: post.excerpt[loc],
      type: "article",
      images: [
        {
          url: `/og?title=${encodeURIComponent(post.title.en)}&sub=${encodeURIComponent("Sahihly Blog · " + post.category)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const all = await getAllPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) notFound();
  const base = "";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title[locale],
      description: post.excerpt[locale],
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: locale,
      author: post.author
        ? {
            "@type": "Person",
            name: post.author,
            ...(post.authorAvatar ? { image: post.authorAvatar } : {}),
          }
        : { "@type": "Organization", name: "Sahihly" },
      url: pageUrl(locale, `/blog/${slug}`),
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl(locale, `/blog/${slug}`) },
      publisher: { "@id": ORG_ID },
      isAccessibleForFree: true,
      wordCount: post.body[locale].replace(/<[^>]*>/g, " ").trim().split(/\s+/).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: pageUrl(locale, "/blog") },
        { "@type": "ListItem", position: 3, name: post.title[locale], item: pageUrl(locale, `/blog/${slug}`) },
      ],
    },
  ];

  const related = all.filter((p) => p.slug !== slug).slice(0, 2);
  const ar = locale === "ar";
  const { html: bodyHtml, toc } = withHeadingIds(post.body[locale]);

  return (
    <div className="container-x py-10 sm:py-16 xl:grid xl:grid-cols-[1fr_16rem] xl:gap-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb trail — matches the BreadcrumbList schema above, so the
          path Google shows in results is the one a reader can actually click. */}
      <div className="mx-auto w-full max-w-3xl xl:mx-0 xl:ms-auto">
      <nav aria-label={ar ? "مسار التنقّل" : "Breadcrumb"}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/40">
          <li><TreeLink href="/" className="hover:text-white">{ar ? "الرئيسية" : "Home"}</TreeLink></li>
          <li aria-hidden><ChevronLeft size={13} className="flip-x opacity-50" /></li>
          <li><TreeLink href={`${base}/blog`} className="hover:text-white">{ar ? "المدوّنة" : "Blog"}</TreeLink></li>
          <li aria-hidden><ChevronLeft size={13} className="flip-x opacity-50" /></li>
          <li className="truncate text-white/60" aria-current="page">{post.title[locale]}</li>
        </ol>
      </nav>

      <div className="mt-6 flex items-center gap-3 text-xs text-white/40">
        <span className="rounded-full bg-violet-400/15 px-2.5 py-0.5 text-violet-300">
          {post.category}
        </span>
        <span>{formatDate(post.date, locale)}</span>
        <span>· {post.readingTime} {dict.blog.readingTime}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">
        {post.title[locale]}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-white/60">
        {post.excerpt[locale]}
      </p>

      {/* byline — E-E-A-T signal */}
      <div className="mt-6 flex items-center gap-3 border-b border-white/10 pb-6">
        {post.authorAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.authorAvatar}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full border border-white/15 object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-400/15 font-display text-sm font-bold text-violet-300">
            {(post.author || "S").trim().charAt(0).toUpperCase()}
          </span>
        )}
        <div className="text-sm">
          {post.author ? (
            post.authorUsername ? (
              <TreeLink
                href={`/author/${post.authorUsername}`}
                className="inline-flex items-center gap-1.5 font-medium text-white/85 hover:text-violet-200"
              >
                {post.author}
                <VerifiedBadge size={14} label={ar ? "كاتب موثّق" : "Verified writer"} />
              </TreeLink>
            ) : (
              <span className="font-medium text-white/85">{post.author}</span>
            )
          ) : (
            <TreeLink href="/about" className="font-medium text-white/85 hover:text-violet-200">
              {locale === "ar" ? "فريق صحيحلي" : "The Sahihly Team"}
            </TreeLink>
          )}
          <p className="text-xs text-white/40">
            {post.author
              ? post.authorTitle?.[locale] ||
                (locale === "ar" ? "من فريق صحيحلي" : "Writer at Sahihly")
              : locale === "ar"
                ? "نبني أدوات جودة الكتابة ثنائية اللغة"
                : "Building bilingual writing-quality tools"}
          </p>
        </div>
      </div>

        <article className="mt-10">
          <div
            className="prose-sahihly"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* Author box — the E-E-A-T signal Google looks for: a named person
              with a face, not an anonymous byline. */}
          {post.author && (
            <div className="glass mt-14 flex items-start gap-4 rounded-2xl p-6">
              {post.authorAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.authorAvatar}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-full border border-white/15 object-cover"
                />
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-400/15 font-display text-lg font-bold text-violet-300">
                  {post.author.trim().charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-white/35">
                  {ar ? "بقلم" : "Written by"}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-white/90">
                  {post.authorUsername ? (
                    <TreeLink href={`/author/${post.authorUsername}`} className="hover:text-violet-200">
                      {post.author}
                    </TreeLink>
                  ) : (
                    post.author
                  )}
                  <VerifiedBadge size={15} label={ar ? "كاتب موثّق في صحيحلي" : "Verified Sahihly writer"} />
                </p>
                {post.authorTitle?.[locale] && (
                  <p className="mt-0.5 text-xs text-violet-200/70">
                    {post.authorTitle[locale]}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {post.authorBio?.[locale] ||
                    (ar
                      ? "من فريق صحيحلي — نكتب عن جودة الكتابة وأدوات الذكاء الاصطناعي بالعربية والإنجليزية."
                      : "Part of the Sahihly team, covering writing quality and AI tooling in Arabic and English.")}
                </p>
                {post.authorUsername && (
                  <TreeLink
                    href={`/author/${post.authorUsername}`}
                    className="mt-3 inline-block text-sm text-violet-300 hover:text-violet-200"
                  >
                    {ar ? "كل مقالات الكاتب ←" : "All articles by this writer →"}
                  </TreeLink>
                )}
              </div>
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-6 text-center">
            <p className="text-sm text-white/70">{dict.cta.subtitle}</p>
            <TreeLink href="/" className="btn-primary mt-4 inline-flex rounded-full px-6 py-2.5 text-sm">
              {dict.cta.button}
            </TreeLink>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-semibold text-white/80">
                {ar ? "اقرأ أيضاً" : "Keep reading"}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((p) => (
                  <TreeLink
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="glass tilt group rounded-2xl p-5"
                  >
                    <span className="text-xs text-violet-300">{p.category}</span>
                    <h3 className="mt-1.5 font-semibold transition-colors group-hover:text-violet-200">
                      {p.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/50">{p.excerpt[locale]}</p>
                  </TreeLink>
                ))}
              </div>
            </div>
          )}

          <TreeLink
            href={`${base}/blog`}
            className="mt-14 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
          >
            <ArrowLeft size={15} className="flip-x" /> {dict.blog.backToBlog}
          </TreeLink>
        </article>
      </div>

      {/* Sticky contents list. Only shown from xl up — on anything narrower a
          long list would push the article itself below the fold. */}
      <aside className="hidden xl:block">
        <TableOfContents entries={toc} label={ar ? "في هذه الصفحة" : "On this page"} />
      </aside>
    </div>
  );
}
