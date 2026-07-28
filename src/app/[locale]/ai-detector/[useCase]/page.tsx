import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { useCases, getUseCase } from "@/content/use-cases";
import ToolStudio from "@/components/ToolStudio";
import TreeLink from "@/components/TreeLink";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";

export function generateStaticParams() {
  return useCases.flatMap((u) =>
    locales.map((locale) => ({ locale, useCase: u.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; useCase: string }>;
}): Promise<Metadata> {
  const { locale, useCase } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const u = getUseCase(useCase);
  if (!u) return {};
  const c = u[loc];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternatesFor(loc, `/ai-detector/${useCase}`),
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent(u.en.h1)}&sub=${encodeURIComponent(u.en.metaDescription.slice(0, 110))}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; useCase: string }>;
}) {
  const { locale: raw, useCase } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const u = getUseCase(useCase);
  if (!u) notFound();
  const dict = getDictionary(locale);
  const c = u[locale];
  const ar = locale === "ar";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        {
          "@type": "ListItem",
          position: 2,
          name: ar ? "كاشف الذكاء الاصطناعي" : "AI Detector",
          item: pageUrl(locale, "/ai-detector"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: c.h1,
          item: pageUrl(locale, `/ai-detector/${useCase}`),
        },
      ],
    },
  ];

  return (
    <div className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-x">
        <Reveal>
          <nav
            aria-label={ar ? "مسار التنقل" : "Breadcrumb"}
            className="mb-6 flex justify-center text-xs text-white/40"
          >
            <TreeLink href="/ai-detector" className="hover:text-white/70">
              {ar ? "كاشف الذكاء الاصطناعي" : "AI Detector"}
            </TreeLink>
            <span className="mx-2">/</span>
            <span className="text-white/60">{c.h1}</span>
          </nav>
          <h1 className="text-center text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">{c.h1}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-white/70">
            {c.lede}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10">
            <ToolStudio locale={locale} dict={dict} />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-20 max-w-3xl">
        <div className="space-y-10">
          {c.sections.map((s, i) => (
            <Reveal key={s.h} delay={i % 3} as="section">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-white/65">{s.p}</p>
            </Reveal>
          ))}
        </div>

        {/* Decision rules — the part a reader can act on without reading the rest. */}
        <Reveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {ar ? "قواعد قرار سريعة" : "Quick decision rules"}
            </h2>
            <div className="mt-5 space-y-3">
              {c.rules.map((r) => (
                <div
                  key={r.when}
                  className="glass rounded-2xl border border-white/10 p-5 sm:flex sm:items-start sm:gap-5"
                >
                  <p className="flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-200 sm:w-2/5">
                    <CheckCircle2 size={15} className="shrink-0" />
                    {r.when}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 sm:mt-0 sm:flex-1">
                    {r.then}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-16">
            <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
              {ar ? "أسئلة شائعة" : "Frequently asked questions"}
            </h2>
            <FAQ items={c.faq} />
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-16">
            <h2 className="text-lg font-semibold text-white">
              {ar ? "اقرأ أيضاً" : "Read next"}
            </h2>
            <ul className="mt-4 space-y-2">
              {u.related.map((r) => (
                <li key={r.href}>
                  <TreeLink
                    href={r.href}
                    className="inline-flex items-center gap-2 text-sm text-violet-300 transition-colors hover:text-violet-200"
                  >
                    <ArrowRight size={14} className="flip-x" />
                    {ar ? r.ar : r.en}
                  </TreeLink>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {useCases
              .filter((x) => x.slug !== u.slug)
              .map((x) => (
                <TreeLink
                  key={x.slug}
                  href={`/ai-detector/${x.slug}`}
                  className="btn-ghost rounded-full px-4 py-2 text-sm"
                >
                  {x[locale].h1}
                </TreeLink>
              ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
