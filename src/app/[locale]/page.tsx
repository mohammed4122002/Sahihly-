import Link from "next/link";
import {
  Languages,
  Sparkles,
  ScanText,
  ShieldCheck,
  Lock,
  Zap,
  ArrowRight,
  Check,
  X,
  GraduationCap,
  PenTool,
  Briefcase,
  Users,
  BadgeCheck,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import ToolStudio from "@/components/ToolStudio";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { LogoMark } from "@/components/Logo";

const featureIcons = [Languages, Sparkles, ScanText, ShieldCheck, Lock, Zap];
const useCaseIcons = [GraduationCap, PenTool, Briefcase, Users];

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const base = "";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden pb-8 pt-14 sm:pt-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs text-violet-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              {dict.hero.badge}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[1.1] sm:text-6xl">
              {dict.hero.title}
              <br />
              <span className="text-gradient">{dict.hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base text-white/60 sm:text-lg">
              {dict.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#detector"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                {dict.hero.ctaPrimary}
                <ArrowRight size={16} className="flip-x" />
              </a>
              <Link
                href={`${base}/pricing`}
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-white/40">{dict.hero.trust}</p>
          </Reveal>
        </div>

        {/* ---------------- TOOL ---------------- */}
        <div className="container-x mt-12">
          <Reveal delay={2}>
            <ToolStudio locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- LOGO MARQUEE ---------------- */}
      <section className="border-y border-white/5 py-6">
        <div className="mask-fade overflow-hidden">
          <div className="marquee text-sm text-white/30">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                {["ChatGPT", "Claude", "Gemini", "Llama", "DeepSeek", "Mistral", "Copilot"].map(
                  (n) => (
                    <span key={n} className="whitespace-nowrap font-display">
                      Detects {n}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TRUST STRIP ---------------- */}
      <section className="py-10">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {dict.trustStrip.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70"
                >
                  <BadgeCheck size={14} className="text-violet-300" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="py-20">
        <div className="container-x">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">{dict.features.eyebrow}</span>
            </div>
            <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
              {dict.features.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
              {dict.features.subtitle}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.features.items.map((f, i) => {
              const Icon = featureIcons[i] ?? Sparkles;
              return (
                <Reveal key={f.title} delay={i} as="div">
                  <div className="glass glow-card tilt h-full rounded-2xl p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-white/55">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">{dict.how.eyebrow}</span>
            </div>
            <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">{dict.how.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dict.how.steps.map((s, i) => (
              <Reveal key={s.title} delay={i} as="div">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="font-display absolute -top-4 text-6xl font-bold text-white/5">
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/55">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- USE CASES ---------------- */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">{dict.useCases.eyebrow}</span>
            </div>
            <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
              {dict.useCases.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
              {dict.useCases.subtitle}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.useCases.items.map((u, i) => {
              const Icon = useCaseIcons[i] ?? Users;
              return (
                <Reveal key={u.title} delay={i} as="div">
                  <div className="glass tilt h-full rounded-2xl p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold">{u.title}</h3>
                    <p className="mt-2 text-sm text-white/55">{u.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- COMPARE STRIP ---------------- */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="glass-strong glow-card mx-auto max-w-3xl rounded-3xl p-8">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">
                {dict.compare.title}
              </h2>
              <p className="mt-2 text-center text-sm text-white/55">
                {dict.compare.subtitle}
              </p>
              <div className="mt-6 space-y-2">
                {dict.compare.rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span className="text-white/80">{r.label}</span>
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1.5 text-violet-300">
                        {r.us ? <Check size={16} /> : <X size={16} className="text-white/30" />}
                        <span className="hidden text-xs sm:inline">{dict.compare.columnUs}</span>
                      </span>
                      <span className="text-white/30">
                        {r.them ? <Check size={16} /> : <X size={16} />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="#detector" className="btn-primary inline-flex rounded-full px-6 py-2.5 text-sm">
                  {dict.compare.tryFree}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ETHICS ---------------- */}
      <section className="py-12">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-8 text-center">
              <ShieldCheck className="text-violet-300" />
              <h2 className="text-xl font-semibold">{dict.ethics.title}</h2>
              <p className="text-sm text-white/60">{dict.ethics.body}</p>
              <Link href={`${base}/about#policy`} className="text-sm text-violet-300 hover:text-violet-200">
                {dict.ethics.link} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">{dict.faq.eyebrow}</span>
            </div>
            <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">{dict.faq.title}</h2>
          </Reveal>
          <div className="mt-10">
            <FAQ items={dict.faq.items} />
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="glow-card relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-ocean-800 to-ocean-950 p-10 text-center sm:p-16">
              <LogoMark className="floaty mx-auto mb-6 h-14 w-14" />
              <h2 className="text-3xl font-bold sm:text-4xl">{dict.cta.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/60">{dict.cta.subtitle}</p>
              <a href="/#detector" className="btn-primary mt-8 inline-flex rounded-full px-8 py-3 text-sm">
                {dict.cta.button}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
