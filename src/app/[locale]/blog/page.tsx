import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { posts } from "@/content/blog";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: { canonical: `/${locale}/blog`, languages: { en: "/en/blog", ar: "/ar/blog" } },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <div className="container-x py-16">
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{dict.blog.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">{dict.blog.subtitle}</p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i} as="div">
            <Link
              href={`${base}/blog/${post.slug}`}
              className="glass glow-card group block rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span className="rounded-full bg-violet-400/15 px-2.5 py-0.5 text-violet-300">
                  {post.category}
                </span>
                <span>{formatDate(post.date, locale)}</span>
                <span>· {post.readingTime} {dict.blog.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold transition-colors group-hover:text-violet-200">
                {post.title[locale]}
              </h2>
              <p className="mt-2 text-sm text-white/55">{post.excerpt[locale]}</p>
              <span className="mt-4 inline-block text-sm text-violet-300">
                {dict.blog.readMore} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
