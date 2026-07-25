import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Repeat2 } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { alternatives } from "@/content/alternatives";
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
        ? "بدائل أدوات كشف الذكاء الاصطناعي — مقارنات صادقة"
        : "AI Tool Alternatives — Honest Comparisons",
    description:
      loc === "ar"
        ? "تبحث عن بديل لأداة تستخدمها؟ قوائم بدائل صادقة لكل من Undetectable.ai وQuillBot وGPTZero وZeroGPT وCopyleaks."
        : "Looking to switch tools? Honest alternative lists for Undetectable.ai, QuillBot, GPTZero, ZeroGPT, and Copyleaks.",
    alternates: { canonical: "/alternatives" },
  };
}

export default async function AlternativesHub({
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
    name: ar ? "بدائل الأدوات" : "Tool alternatives",
    url: `${SITE_URL}/alternatives`,
    hasPart: alternatives.map((a) => ({
      "@type": "WebPage",
      name: ar ? `أفضل بدائل ${a.target}` : `Best ${a.target} Alternatives`,
      url: `${SITE_URL}/alternatives/${a.slug}`,
    })),
  };

  return (
    <div className="container-x max-w-4xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">{ar ? "تفكّر بالتبديل؟" : "Thinking of switching?"}</span>
        </div>
        <h1 className="mt-3 text-center text-4xl font-bold sm:text-5xl">
          {ar ? "بدائل الأدوات" : "Tool alternatives"}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {ar
            ? "لكل أداة نقاط ضعف. هنا نشرح لماذا يبدّل الناس، ونرشّح البدائل الأنسب — بما فيها بدائل غيرنا."
            : "Every tool has weak spots. Here we explain why people switch and recommend the best options — including ones that aren't us."}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {alternatives.map((a, i) => (
          <Reveal key={a.slug} delay={i} as="div">
            <Link
              href={`/alternatives/${a.slug}`}
              className="glass glow-card tilt group flex h-full flex-col rounded-2xl p-6"
            >
              <Repeat2 size={20} className="mb-3 text-violet-300" />
              <h2 className="text-lg font-semibold transition-colors group-hover:text-violet-200">
                {ar ? `أفضل بدائل ${a.target}` : `Best ${a.target} alternatives`}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/55">
                {a.reasons[locale][0]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                {ar ? "اقرأ القائمة" : "See the list"}
                <ArrowRight size={14} className="flip-x" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
