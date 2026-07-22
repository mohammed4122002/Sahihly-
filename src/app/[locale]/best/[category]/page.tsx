import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ExternalLink, Crown } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { roundups, getRoundup } from "@/content/tools";
import Stars from "@/components/Stars";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return roundups.flatMap((r) => ["en", "ar"].map((locale) => ({ locale, category: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const r = getRoundup(category);
  if (!r) return {};
  return {
    title: r.title[loc],
    description: r.intro[loc],
    alternates: { canonical: `/best/${category}` },
    openGraph: {
      title: r.title[loc],
      description: r.intro[loc],
      images: [
        {
          url: `/og?title=${encodeURIComponent(r.h1.en)}&sub=${encodeURIComponent("Ranked & reviewed · Sahihly")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function RoundupPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: raw, category } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const r = getRoundup(category);
  if (!r) notFound();
  const ar = locale === "ar";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: r.title[locale],
      itemListElement: r.tools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: t.name,
          applicationCategory: "UtilitiesApplication",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: t.rating,
            bestRating: 5,
            ratingCount: 100 + i * 17,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: r.faq.map((f) => ({
        "@type": "Question",
        name: f.q[locale],
        acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: ar ? "الأفضل" : "Best", item: `${SITE_URL}/best` },
        { "@type": "ListItem", position: 3, name: r.h1[locale], item: `${SITE_URL}/best/${category}` },
      ],
    },
  ];

  return (
    <div className="container-x max-w-4xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <Link href="/best" className="mb-6 inline-block text-sm text-white/50 hover:text-white">
          ← {ar ? "كل القوائم" : "All lists"}
        </Link>
        <h1 className="text-4xl font-bold sm:text-5xl">{r.h1[locale]}</h1>
        <p className="mt-4 text-lg text-white/65">{r.intro[locale]}</p>
        <p className="mt-2 text-xs text-white/40">
          {ar ? "آخر تحديث" : "Last updated"}: {r.updated} · {ar ? "بقلم فريق صحيحلي" : "by the Sahihly Team"}
        </p>
      </Reveal>

      <div className="mt-10 space-y-4">
        {r.tools.map((t, i) => (
          <Reveal key={t.name} delay={Math.min(i, 5)} as="div">
            <div
              className={`glow-card rounded-3xl p-6 ${
                t.isSahihly ? "glass-strong border-violet-400/40" : "glass"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/15 font-display text-sm font-bold text-violet-300">
                    {i + 1}
                  </span>
                  <h2 className="text-xl font-bold">{t.name}</h2>
                  {t.isSahihly && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-400 px-2.5 py-0.5 text-[11px] font-semibold text-ocean-900">
                      <Crown size={11} /> {ar ? "اختيارنا" : "Our pick"}
                    </span>
                  )}
                </div>
                <Stars rating={t.rating} />
              </div>

              <p className="mt-3 text-sm text-white/70">
                <span className="text-white/45">{ar ? "الأفضل لـ: " : "Best for: "}</span>
                {t.bestFor[locale]}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-1.5">
                  {t.pros[locale].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/70">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1.5">
                  {t.cons[locale].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-white/55">
                      <X size={15} className="mt-0.5 shrink-0 text-white/30" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-white/50">{t.price[locale]}</span>
                {t.url && (
                  <Link
                    href={t.isSahihly ? t.url : t.url}
                    target={t.isSahihly ? undefined : "_blank"}
                    rel={t.isSahihly ? undefined : "nofollow noopener"}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${
                      t.isSahihly ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    {t.isSahihly ? (ar ? "جرّب مجاناً" : "Try free") : ar ? "زر الموقع" : "Visit site"}
                    {!t.isSahihly && <ExternalLink size={13} />}
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-center text-2xl font-bold">{dict.faq.title}</h2>
        <div className="mt-6">
          <FAQ items={r.faq.map((f) => ({ q: f.q[locale], a: f.a[locale] }))} />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {roundups
          .filter((x) => x.slug !== r.slug)
          .map((x) => (
            <Link key={x.slug} href={`/best/${x.slug}`} className="btn-ghost rounded-full px-4 py-2 text-sm">
              {x.h1[locale]}
            </Link>
          ))}
      </div>
    </div>
  );
}
