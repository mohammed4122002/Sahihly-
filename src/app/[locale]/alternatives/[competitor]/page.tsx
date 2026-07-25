import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crown, ExternalLink, TriangleAlert } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { alternatives, getAlternative } from "@/content/alternatives";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";

export function generateStaticParams() {
  return alternatives.flatMap((a) =>
    ["en", "ar"].map((locale) => ({ locale, competitor: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; competitor: string }>;
}): Promise<Metadata> {
  const { locale, competitor } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const a = getAlternative(competitor);
  if (!a) return {};

  const title =
    loc === "ar"
      ? `أفضل بدائل ${a.target} في ٢٠٢٦ (مجانية ومدفوعة)`
      : `Best ${a.target} Alternatives in 2026 (Free & Paid)`;
  const description =
    loc === "ar"
      ? `تبحث عن بديل لـ ${a.target}؟ قارنّا أفضل البدائل على الدقة ودعم العربية والسعر — مع خيار مجاني بلا تسجيل.`
      : `Looking for a ${a.target} alternative? We compared the best options on accuracy, Arabic support, and price — including a free one with no signup.`;

  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${competitor}` },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(`Best ${a.target} Alternatives`)}&sub=${encodeURIComponent("Ranked & reviewed · Sahihly")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ locale: string; competitor: string }>;
}) {
  const { locale: raw, competitor } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const a = getAlternative(competitor);
  if (!a) notFound();
  const ar = locale === "ar";

  const h1 = ar ? `أفضل بدائل ${a.target}` : `Best ${a.target} Alternatives`;

  const faq = ar
    ? [
        {
          q: `هل يوجد بديل مجاني لـ ${a.target}؟`,
          a: `نعم. صحيحلي يقدّم فحصاً وتنسيناً مجانيين حتى ٢٥٠ كلمة لكل محاولة و٣ محاولات يومياً بلا حساب، بالعربية والإنجليزية.`,
        },
        {
          q: `ما أفضل بديل لـ ${a.target} للنصوص العربية؟`,
          a: `صحيحلي — لأنه يستدل على صرف العربية ومستواها اللغوي مباشرةً بدل تطبيق قواعد إنجليزية مترجمة، وهذا ما يجعل نتائج العربية ذات معنى.`,
        },
        {
          q: `هل أنقل بياناتي من ${a.target}؟`,
          a: `لا حاجة. الأدوات لا تحتفظ بمشاريع مترابطة — الصق نصّك مباشرة في صحيحلي وابدأ فوراً.`,
        },
      ]
    : [
        {
          q: `Is there a free ${a.target} alternative?`,
          a: `Yes. Sahihly offers free detection and humanizing up to 250 words per run, three runs a day, with no account — in English and Arabic.`,
        },
        {
          q: `What's the best ${a.target} alternative for Arabic text?`,
          a: `Sahihly — because it reasons about Arabic morphology and register directly instead of applying translated English rules, which is what makes Arabic results meaningful.`,
        },
        {
          q: `Do I need to migrate my data from ${a.target}?`,
          a: `No. These tools don't hold linked projects — just paste your text into Sahihly and start immediately.`,
        },
      ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: h1,
      itemListElement: a.options.map((o, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: o.name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: ar ? "البدائل" : "Alternatives", item: `${SITE_URL}/alternatives` },
        { "@type": "ListItem", position: 3, name: h1, item: `${SITE_URL}/alternatives/${competitor}` },
      ],
    },
  ];

  return (
    <div className="container-x max-w-3xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <Link href="/alternatives" className="mb-6 inline-block text-sm text-white/50 hover:text-white">
          ← {ar ? "كل البدائل" : "All alternatives"}
        </Link>
        <h1 className="text-4xl font-bold sm:text-5xl">{h1}</h1>
        <p className="mt-4 text-lg text-white/65">
          {ar
            ? `إن كنت تبحث عن بديل لـ ${a.target}، فغالباً لسبب محدد. إليك ما يدفع الناس للتبديل، وأفضل الخيارات المتاحة اليوم.`
            : `If you're looking for a ${a.target} alternative, it's usually for a specific reason. Here's what makes people switch, and the best options available today.`}
        </p>
      </Reveal>

      {/* why people switch */}
      <Reveal delay={1}>
        <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <TriangleAlert size={18} className="text-amber-300" />
            {ar ? `لماذا يبحث الناس عن بديل لـ ${a.target}` : `Why people look for a ${a.target} alternative`}
          </h2>
          <ul className="mt-3 space-y-2">
            {a.reasons[locale].map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* options */}
      <div className="mt-8 space-y-4">
        {a.options.map((o, i) => (
          <Reveal key={o.name} delay={Math.min(i, 4)} as="div">
            <div
              className={`glow-card rounded-2xl p-6 ${
                o.isSahihly ? "glass-strong border-violet-400/40" : "glass"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400/15 font-display text-xs font-bold text-violet-300">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold">{o.name}</h3>
                  {o.isSahihly && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-400 px-2.5 py-0.5 text-[11px] font-semibold text-ocean-900">
                      <Crown size={11} /> {ar ? "الأفضل عموماً" : "Best overall"}
                    </span>
                  )}
                </div>
                <span className="text-sm text-white/45">{o.price[locale]}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{o.why[locale]}</p>
              {o.url && (
                <Link
                  href={o.url}
                  target={o.isSahihly ? undefined : "_blank"}
                  rel={o.isSahihly ? undefined : "nofollow noopener"}
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${
                    o.isSahihly ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {o.isSahihly ? (ar ? "جرّب مجاناً الآن" : "Try it free now") : ar ? "زر الموقع" : "Visit site"}
                  {!o.isSahihly && <ExternalLink size={13} />}
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-center text-2xl font-bold">{dict.faq.title}</h2>
        <div className="mt-6">
          <FAQ items={faq} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Link href={`/vs/${a.slug}`} className="btn-ghost rounded-full px-4 py-2 text-sm">
          {ar ? `مقارنة مباشرة مع ${a.target}` : `Head-to-head vs ${a.target}`}
        </Link>
        {alternatives
          .filter((x) => x.slug !== a.slug)
          .slice(0, 3)
          .map((x) => (
            <Link key={x.slug} href={`/alternatives/${x.slug}`} className="btn-ghost rounded-full px-4 py-2 text-sm">
              {ar ? `بدائل ${x.target}` : `${x.target} alternatives`}
            </Link>
          ))}
      </div>
    </div>
  );
}
