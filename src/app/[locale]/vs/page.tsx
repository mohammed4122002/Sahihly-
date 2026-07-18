import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { competitors } from "@/content/competitors";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title:
      loc === "ar"
        ? "صحيحلي مقابل المنافسين — مقارنات صادقة"
        : "Sahihly vs the Alternatives — Honest Comparisons",
    description:
      loc === "ar"
        ? "قارن صحيحلي مع Undetectable.ai وQuillBot وGPTZero وCopyleaks وZeroGPT — أين نتفوق فعلاً وأين يتعادلون."
        : "Compare Sahihly with Undetectable.ai, QuillBot, GPTZero, Copyleaks, and ZeroGPT — where we genuinely win and where they hold their own.",
    alternates: { canonical: "/vs" },
  };
}

export default async function VsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: competitors.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title[locale],
      url: `${SITE_URL}/vs/${c.slug}`,
    })),
  };

  return (
    <div className="container-x max-w-4xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{dict.compare.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {dict.compare.subtitle}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {competitors.map((c, i) => (
          <Reveal key={c.slug} delay={i} as="div">
            <Link
              href={`/vs/${c.slug}`}
              className="glass glow-card tilt group flex h-full flex-col rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold transition-colors group-hover:text-violet-200">
                {c.title[locale]}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/55">{c.intro[locale]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                {dict.blog.readMore}
                <ArrowRight size={14} className="flip-x" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm">
            {dict.compare.tryFree}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
