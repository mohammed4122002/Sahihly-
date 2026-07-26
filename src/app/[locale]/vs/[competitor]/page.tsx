import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { competitors, getCompetitor } from "@/content/competitors";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return competitors.flatMap((c) =>
    ["en", "ar"].map((locale) => ({ locale, competitor: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; competitor: string }>;
}): Promise<Metadata> {
  const { locale, competitor } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const c = getCompetitor(competitor);
  if (!c) return {};
  return {
    title: c.title[loc],
    description: c.intro[loc],
    alternates: { canonical: `/vs/${competitor}` },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string; competitor: string }>;
}) {
  const { locale: raw, competitor } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const c = getCompetitor(competitor);
  if (!c) notFound();
  const base = "";

  const ar = locale === "ar";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/vs` },
        { "@type": "ListItem", position: 3, name: c.title[locale], item: `${SITE_URL}/vs/${c.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q[locale],
        acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
      })),
    },
  ];

  return (
    <div className="container-x max-w-4xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{c.title[locale]}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">{c.intro[locale]}</p>
      </Reveal>

      <Reveal delay={1}>
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            {ar ? `ما هو ${c.name}؟` : `What is ${c.name}?`}
          </h2>
          {c.whatItIs[locale].map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-white/70">
              {p}
            </p>
          ))}
        </section>
      </Reveal>

      <Reveal delay={1}>
        <div className="glass-strong glow-card mt-12 overflow-hidden rounded-3xl">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold">
            <span className="text-white/50">{locale === "ar" ? "الميزة" : "Feature"}</span>
            <span className="w-20 text-center text-violet-300">{dict.compare.columnUs}</span>
            <span className="w-24 text-center text-white/50">{c.name}</span>
          </div>
          {c.rows.map((r) => (
            <div
              key={r.feature.en}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-white/5 px-6 py-4 text-sm last:border-0"
            >
              <span className="text-white/80">{r.feature[locale]}</span>
              <span className="flex w-20 justify-center">
                {r.us ? (
                  <Check size={18} className="text-violet-300" />
                ) : (
                  <X size={18} className="text-white/25" />
                )}
              </span>
              <span className="flex w-24 justify-center">
                {r.them ? (
                  <Check size={18} className="text-white/60" />
                ) : (
                  <X size={18} className="text-white/25" />
                )}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            {ar ? `أين يتفوّق ${c.name} فعلاً` : `Where ${c.name} genuinely wins`}
          </h2>
          <p className="mt-3 text-sm text-white/50">
            {ar
              ? "نكتب هذا القسم لأن مقارنة لا تعترف بنقاط قوة الطرف الآخر ليست معلومة بل إعلان."
              : "We include this section because a comparison that concedes nothing is advertising, not information."}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.theirStrengths.map((s) => (
              <div key={s.title.en} className="glass rounded-2xl p-5">
                <h3 className="font-semibold text-white/90">{s.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body[locale]}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            {ar ? "أين يختلف صحيحلي" : "Where Sahihly differs"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.ourDifference.map((s) => (
              <div key={s.title.en} className="glass rounded-2xl p-5">
                <h3 className="font-semibold text-violet-200">{s.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body[locale]}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">{ar ? "التكلفة" : "What it costs"}</h2>
          <p className="mt-4 leading-relaxed text-white/70">{c.pricingNote[locale]}</p>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            {ar ? "أيّهما تختار؟" : "Which should you pick?"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white/50">
                {ar ? `اختر ${c.name}` : `Pick ${c.name}`}
              </h3>
              <p className="mt-2 leading-relaxed text-white/75">{c.chooseThem[locale]}</p>
            </div>
            <div className="rounded-2xl border border-violet-400/25 bg-violet-400/[0.06] p-5">
              <h3 className="text-sm font-semibold text-violet-300">
                {ar ? "اختر صحيحلي" : "Pick Sahihly"}
              </h3>
              <p className="mt-2 leading-relaxed text-white/80">{c.chooseUs[locale]}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            {ar ? "أسئلة شائعة" : "Common questions"}
          </h2>
          <div className="mt-6 space-y-4">
            {c.faq.map((f) => (
              <div key={f.q.en} className="glass rounded-2xl p-5">
                <h3 className="font-semibold text-white/90">{f.q[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.a[locale]}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <div className="mt-14 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-8 text-center">
          <p className="text-lg text-white/80">{c.verdict[locale]}</p>
          <Link href="/" className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm">
            {dict.compare.tryFree}
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {competitors
          .filter((x) => x.slug !== c.slug)
          .map((x) => (
            <Link
              key={x.slug}
              href={`${base}/vs/${x.slug}`}
              className="btn-ghost rounded-full px-4 py-2 text-sm"
            >
              {locale === "ar" ? "مقابل" : "vs"} {x.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
