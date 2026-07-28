import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { notFound } from "next/navigation";
import { Crown, ExternalLink, TriangleAlert } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
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
    alternates: alternatesFor(loc, `/alternatives/${competitor}`),
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
        {
          q: `لماذا يعطيني ${a.target} وأداة أخرى نتيجتين مختلفتين؟`,
          a: `لأنهما نموذجان مختلفان بتدريب وعتبات مختلفة يقدّران الخاصية الغامضة نفسها. والاختلاف الواسع بين أداتين إشارة إلى أن النص يقع في منطقة ملتبسة، لا إلى أن إحداهما معطّلة.`,
        },
        {
          q: `هل يضمن أي بديل تجاوز الكشف؟`,
          a: `لا، وتعامل مع أي ضمان كهذا كإشارة تحذير. فالكواشف تُحدّث نماذجها باستمرار، ولا يستطيع أحد ضمان نتيجة عند طرف ثالث. نحن لا نقدّم هذا الوعد.`,
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
        {
          q: `Why do ${a.target} and another tool give me different scores?`,
          a: `Because they are different models with different training and thresholds, all estimating the same fuzzy property. Wide disagreement between two tools signals that the text sits in an ambiguous zone — not that one of them is broken.`,
        },
        {
          q: `Does any alternative guarantee it will pass detection?`,
          a: `No, and treat any such guarantee as a warning sign. Detectors update their models continuously and nobody can guarantee an outcome at a third party. We do not make that promise.`,
        },
      ];


  // Applies to every alternatives page: the questions someone mid-switch is
  // actually weighing, rather than another restatement of the ranking above.
  const guide = ar
    ? [
        {
          h: "كيف رتّبنا هذه الخيارات",
          p: `لا يوجد ترتيب واحد صحيح لبدائل ${a.target}، لأن سبب مغادرتك يحدّد ما يناسبك. فمن يغادر بسبب التكلفة يحتاج شيئاً آخر تماماً عمّن يغادر لأن الأداة لم تدعم لغته. ولذلك يذكر كل خيار أدناه لمن يصلح تحديداً بدل ادعاء تفوّق عام. ونحن أحد الخيارات المدرجة، فاقرأ ترشيحنا لأنفسنا بالشكّ الذي يستحقّه — وتحقّق من الباقي بنفسك.`,
        },
        {
          h: "ما الذي تخسره حين تبدّل",
          p: "تحقّق من هذا قبل الانتقال لا بعده. فالسجلّ المحفوظ والتقارير السابقة لا تنتقل بين هذه الأدوات. والتكاملات مع معالج النصوص أو نظام التعلّم قد تحتاج موافقة جديدة من قسم آخر. والأهم: الأداة الجديدة ستصنّف النص نفسه بدرجة مختلفة، لأن كل كاشف يستخدم نموذجاً وعتبات مختلفة — فأي عتبة داخلية عايرتها على الأرقام القديمة صارت بلا معنى وتحتاج ضبطاً من جديد.",
        },
        {
          h: "متى يكون البقاء هو القرار الصحيح",
          p: `إن كنت تحتاج مطابقة انتحال أمام مصادر منشورة، أو تكاملات مؤسسية وإدارة مقاعد، أو تغطية عبر لغات كثيرة، فقد يظل ${a.target} أو منافس مؤسسي أنسب لك منّا. نحن نغطي لغتين بعمق ولا ندّعي اتساعاً لا نملكه. والتوصية التي لا تقول لك «ابقَ» حين ينبغي ذلك لا تستحق الثقة حين تقول «بدّل».`,
        },
      ]
    : [
        {
          h: "How we ordered these options",
          p: `There is no single correct ranking of ${a.target} alternatives, because the reason you are leaving decides what suits you. Someone leaving over cost needs something quite different from someone leaving because the tool never really supported their language. So each option below says who it is specifically for rather than claiming to be best overall. We are one of the listed options, so read our recommendation of ourselves with the scepticism it deserves — and check the others yourself.`,
        },
        {
          h: "What you lose when you switch",
          p: "Check this before you move rather than after. Saved history and past reports do not transfer between these tools. Integrations into a word processor or an LMS may need fresh approval from another department. And most importantly, the new tool will score the same text differently, because every detector uses a different model and different thresholds — so any internal threshold you had calibrated against the old numbers is now meaningless and needs setting again.",
        },
        {
          h: "When staying is the right call",
          p: `If you need plagiarism matching against published sources, institutional integrations and seat management, or coverage across many languages, then ${a.target} or an enterprise competitor may still fit you better than we do. We cover two languages in depth and do not claim breadth we lack. A recommendation that will not tell you to stay when it should is not worth trusting when it tells you to switch.`,
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: ar ? "البدائل" : "Alternatives", item: pageUrl(locale, "/alternatives") },
        { "@type": "ListItem", position: 3, name: h1, item: pageUrl(locale, `/alternatives/${competitor}`) },
      ],
    },
  ];

  return (
    <div className="container-x max-w-3xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <TreeLink href="/alternatives" className="mb-6 inline-block text-sm text-white/50 hover:text-white">
          ← {ar ? "كل البدائل" : "All alternatives"}
        </TreeLink>
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

      <Reveal delay={1}>
        <section className="mt-12 space-y-8">
          {guide.map((g) => (
            <div key={g.h}>
              <h2 className="text-xl font-bold">{g.h}</h2>
              <p className="mt-3 leading-relaxed text-white/65">{g.p}</p>
            </div>
          ))}
        </section>
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
                <TreeLink
                  href={o.url}
                  target={o.isSahihly ? undefined : "_blank"}
                  rel={o.isSahihly ? undefined : "nofollow noopener"}
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${
                    o.isSahihly ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {o.isSahihly ? (ar ? "جرّب مجاناً الآن" : "Try it free now") : ar ? "زر الموقع" : "Visit site"}
                  {!o.isSahihly && <ExternalLink size={13} />}
                </TreeLink>
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
        <TreeLink href={`/vs/${a.slug}`} className="btn-ghost rounded-full px-4 py-2 text-sm">
          {ar ? `مقارنة مباشرة مع ${a.target}` : `Head-to-head vs ${a.target}`}
        </TreeLink>
        {alternatives
          .filter((x) => x.slug !== a.slug)
          .slice(0, 3)
          .map((x) => (
            <TreeLink key={x.slug} href={`/alternatives/${x.slug}`} className="btn-ghost rounded-full px-4 py-2 text-sm">
              {ar ? `بدائل ${x.target}` : `${x.target} alternatives`}
            </TreeLink>
          ))}
      </div>
    </div>
  );
}
