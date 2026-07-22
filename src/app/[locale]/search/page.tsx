import type { Metadata } from "next";
import { Suspense } from "react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { competitors } from "@/content/competitors";
import { roundups } from "@/content/tools";
import { TERMS } from "@/content/glossary";

export const dynamic = "force-dynamic";
import SearchClient, { type SearchItem } from "@/components/SearchClient";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "بحث" : "Search",
    description:
      loc === "ar"
        ? "ابحث في أدوات صحيحلي ومقالاته ومصطلحاته ومقارناته."
        : "Search Sahihly's tools, articles, glossary terms, and comparisons.",
    alternates: { canonical: "/search" },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const tools: SearchItem[] = [
    {
      title: ar ? "كاشف الذكاء الاصطناعي" : "AI Detector",
      desc: ar ? "افحص أي نص واحصل على نسبة الاحتمال مع تمييز الجمل." : "Check any text for AI-likelihood with sentence highlights.",
      href: "/ai-detector",
      type: "tool",
    },
    {
      title: ar ? "كاشف النصوص العربية" : "Arabic AI Detector",
      desc: ar ? "أول كاشف مبني للعربية بأصالة — صرف وتشكيل ومستوى لغوي." : "The first detector genuinely built for Arabic morphology and register.",
      href: "/arabic-ai-detector",
      type: "tool",
    },
    {
      title: ar ? "كاشف ChatGPT" : "ChatGPT Detector",
      desc: ar ? "افحص النص بحثاً عن البصمة الأسلوبية لنماذج ChatGPT." : "Check text for the stylistic fingerprint of ChatGPT-class models.",
      href: "/chatgpt-detector",
      type: "tool",
    },
    {
      title: ar ? "مُنسّن النصوص" : "AI Humanizer",
      desc: ar ? "أعد صياغة النص الآلي بصوت بشري مع حفظ المعنى وتحقق تلقائي." : "Rewrite AI text into a human voice, meaning-safe, auto-verified.",
      href: "/ai-humanizer",
      type: "tool",
    },
    {
      title: ar ? "عدّاد الكلمات" : "Word Counter",
      desc: ar ? "كلمات وأحرف وجمل ووقت قراءة — فوري وخاص داخل متصفحك." : "Words, characters, sentences, reading time — instant and private.",
      href: "/word-counter",
      type: "tool",
    },
  ];

  const posts = await getAllPosts();
  const articles: SearchItem[] = posts.map((p) => ({
    title: p.title[locale],
    desc: p.excerpt[locale],
    href: `/blog/${p.slug}`,
    type: "article" as const,
  }));

  const bestLists: SearchItem[] = roundups.map((r) => ({
    title: r.h1[locale],
    desc: r.intro[locale],
    href: `/best/${r.slug}`,
    type: "compare" as const,
  }));

  const terms: SearchItem[] = TERMS.map((t) => ({
    title: t.term[locale],
    desc: t.def[locale],
    href: `/glossary#${t.id}`,
    type: "term" as const,
  }));

  const compares: SearchItem[] = competitors.map((c) => ({
    title: c.title[locale],
    desc: c.intro[locale],
    href: `/vs/${c.slug}`,
    type: "compare" as const,
  }));

  const items = [...tools, ...bestLists, ...articles, ...compares, ...terms];

  return (
    <div className="container-x max-w-3xl py-16">
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          {ar ? "ابحث في صحيحلي" : "Search Sahihly"}
        </h1>
      </Reveal>
      <div className="mt-10">
        <Suspense>
          <SearchClient
            items={items}
            labels={{
              placeholder: ar ? "ابحث عن أداة أو مقال أو مصطلح…" : "Search tools, articles, terms…",
              empty: ar ? "لا نتائج — جرّب كلمة أخرى." : "No results — try another word.",
              types: {
                tool: ar ? "أداة" : "Tool",
                article: ar ? "مقال" : "Article",
                term: ar ? "مصطلح" : "Term",
                compare: ar ? "مقارنة" : "Comparison",
              },
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
