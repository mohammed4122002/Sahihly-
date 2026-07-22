import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { roundups } from "@/content/tools";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "أفضل أدوات الذكاء الاصطناعي — مراجعات وقوائم" : "Best AI Tools — Reviews & Rankings",
    description:
      loc === "ar"
        ? "قوائم مراجعة صادقة لأفضل أدوات الذكاء الاصطناعي: كواشف، مُنسّنات، أدوات كتابة، وأدوات تقارير — بالعربية والإنجليزية."
        : "Honest ranked reviews of the best AI tools: detectors, humanizers, writing tools, and report tools — English and Arabic.",
    alternates: { canonical: "/best" },
  };
}

export default async function BestHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ar ? "أفضل أدوات الذكاء الاصطناعي" : "Best AI Tools",
    url: `${SITE_URL}/best`,
    hasPart: roundups.map((r) => ({
      "@type": "WebPage",
      name: r.title[locale],
      url: `${SITE_URL}/best/${r.slug}`,
    })),
  };

  return (
    <div className="container-x max-w-4xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">{ar ? "مراجعات مستقلة" : "Independent reviews"}</span>
        </div>
        <h1 className="mt-3 text-center text-4xl font-bold sm:text-5xl">
          {ar ? "أفضل أدوات الذكاء الاصطناعي" : "Best AI Tools"}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {ar
            ? "قوائم مرتّبة وصادقة نحدّثها باستمرار — نذكر منافسينا بإنصاف ونشير بوضوح أين نتفوق."
            : "Ranked, honest, regularly updated lists — we include our competitors fairly and clearly flag where we lead."}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {roundups.map((r, i) => (
          <Reveal key={r.slug} delay={i} as="div">
            <Link
              href={`/best/${r.slug}`}
              className="glass glow-card tilt group flex h-full flex-col rounded-2xl p-6"
            >
              <Trophy size={20} className="mb-3 text-violet-300" />
              <h2 className="text-lg font-semibold transition-colors group-hover:text-violet-200">
                {r.h1[locale]}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/55">{r.intro[locale]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                {ar ? "اقرأ القائمة" : "Read the list"}
                <ArrowRight size={14} className="flip-x" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
