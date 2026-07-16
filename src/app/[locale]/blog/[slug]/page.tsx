import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { posts, getPost } from "@/content/blog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return posts.flatMap((p) =>
    ["en", "ar"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title[loc],
    description: post.excerpt[loc],
    alternates: {
      canonical: `/${loc}/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, ar: `/ar/blog/${slug}` },
    },
    openGraph: { title: post.title[loc], description: post.excerpt[loc], type: "article" },
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
  const post = getPost(slug);
  if (!post) notFound();
  const base = `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    datePublished: post.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: "Sahihly" },
    url: `${SITE_URL}/${locale}/blog/${slug}`,
  };

  return (
    <article className="container-x max-w-3xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href={`${base}/blog`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
      >
        <ArrowLeft size={15} className="flip-x" /> {dict.blog.backToBlog}
      </Link>

      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="rounded-full bg-violet-400/15 px-2.5 py-0.5 text-violet-300">
          {post.category}
        </span>
        <span>{formatDate(post.date, locale)}</span>
        <span>· {post.readingTime} {dict.blog.readingTime}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
        {post.title[locale]}
      </h1>
      <p className="mt-4 text-lg text-white/60">{post.excerpt[locale]}</p>

      <div
        className="prose-sahihly mt-8"
        dangerouslySetInnerHTML={{ __html: post.body[locale] }}
      />

      <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-6 text-center">
        <p className="text-sm text-white/70">{dict.cta.subtitle}</p>
        <Link href={base} className="btn-primary mt-4 inline-flex rounded-full px-6 py-2.5 text-sm">
          {dict.cta.button}
        </Link>
      </div>
    </article>
  );
}
