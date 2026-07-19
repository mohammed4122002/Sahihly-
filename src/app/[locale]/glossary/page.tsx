import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import Reveal from "@/components/Reveal";
import { TERMS } from "@/content/glossary";

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
        ? "قاموس مصطلحات كشف الذكاء الاصطناعي"
        : "AI Detection Glossary — Every Term Explained",
    description:
      loc === "ar"
        ? "شرح مبسّط لكل مصطلحات كشف الذكاء الاصطناعي: الحيرة، التباين، ثراء المفردات، التنسين، وأكثر — بالعربية والإنجليزية."
        : "Plain-language definitions of every AI-detection term: perplexity, burstiness, lexical diversity, humanizing, and more — in English and Arabic.",
    alternates: { canonical: "/glossary" },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: locale === "ar" ? "قاموس مصطلحات كشف الذكاء الاصطناعي" : "AI Detection Glossary",
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/glossary#${t.id}`,
      name: t.term[locale],
      description: t.def[locale],
    })),
  };

  return (
    <div className="container-x max-w-3xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          {locale === "ar" ? "قاموس المصطلحات" : "AI Detection Glossary"}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {locale === "ar"
            ? "كل مصطلح تصادفه في عالم كشف الذكاء الاصطناعي — مشروحاً ببساطة."
            : "Every term you'll meet in the AI-detection world — explained simply."}
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {TERMS.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 5)} as="div">
            <div id={t.id} className="glass scroll-mt-24 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-violet-200">{t.term[locale]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{t.def[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-6 text-center">
          <Link href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
            {locale === "ar"
              ? "شاهد هذه المفاهيم عملياً — جرّب الكاشف مجاناً"
              : "See these concepts in action — try the detector free"}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
