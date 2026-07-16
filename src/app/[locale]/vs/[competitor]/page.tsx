import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
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
    alternates: {
      canonical: `/${loc}/vs/${competitor}`,
      languages: { en: `/en/vs/${competitor}`, ar: `/ar/vs/${competitor}` },
    },
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
  const base = `/${locale}`;

  return (
    <div className="container-x max-w-4xl py-16">
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{c.title[locale]}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">{c.intro[locale]}</p>
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
        <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-8 text-center">
          <p className="text-lg text-white/80">{c.verdict[locale]}</p>
          <Link href={base} className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm">
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
