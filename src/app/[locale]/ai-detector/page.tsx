import type { Metadata } from "next";
import Link from "next/link";
import { ScanLine, Languages, AlignLeft, ShieldCheck } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import ToolStudio from "@/components/ToolStudio";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import EmbedSnippet from "@/components/EmbedSnippet";

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
        ? "كاشف الذكاء الاصطناعي المجاني — للعربية والإنجليزية"
        : "Free AI Detector — Check Text for AI in English & Arabic",
    description:
      loc === "ar"
        ? "الصق نصك واحصل فوراً على نسبة احتمال كتابته بالذكاء الاصطناعي، مع تمييز الجمل المشبوهة. يدعم العربية بأصالة والإنجليزية بجودة كاملة — مجاناً وبلا تسجيل."
        : "Paste your text and instantly see how likely it was AI-generated, with suspicious sentences highlighted. Native Arabic and full-quality English — free, no signup.",
    alternates: { canonical: "/ai-detector" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Free AI Detector")}&sub=${encodeURIComponent("Check any text for AI — English & Arabic, sentence highlights, style report")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "Free AI Detector",
    sub: "Paste any text below and get an AI-likelihood score in seconds — with the exact sentences that triggered it highlighted inline. Works in English and Arabic on the same engine.",
    sections: [
      {
        icon: ScanLine,
        h: "How the score works",
        p: "Sahihly analyzes the statistical fingerprint of your text: how uniform the sentence lengths are, how repetitive the vocabulary is, and how many machine-typical phrases appear. Human writing is naturally uneven — it mixes short punches with long, winding thoughts. Machine writing tends to be smooth and regular. The score expresses how strongly your text leans machine-smooth, from 0 (reads human) to 100 (reads AI).",
      },
      {
        icon: AlignLeft,
        h: "Sentence-level highlights",
        p: "A single number can't tell you what to fix. That's why every analysis highlights the individual sentences carrying the strongest AI patterns, so you can see exactly where the robotic rhythm lives — and revise those lines, not the whole draft.",
      },
      {
        icon: Languages,
        h: "Built for Arabic, not translated to it",
        p: "Most detectors are trained and validated on English only; run Arabic through them and you get noise. Sahihly reasons about Arabic directly — morphology, register, and natural phrasing — which is why Arabic results here are meaningful rather than decorative.",
      },
      {
        icon: ShieldCheck,
        h: "Read scores responsibly",
        p: "No detector on the market is 100% accurate, including this one. Treat every score as guidance for improving style — never as proof of authorship, and never as sole evidence in an academic or professional dispute.",
      },
    ],
    faq: [
      { q: "How accurate is the AI detector?", a: "It provides a well-calibrated estimate based on stylistic signals, and shows its reasoning through sentence highlights. Like every detector, it can be wrong — treat results as guidance, not proof." },
      { q: "How many words can I check for free?", a: "Up to 250 words per run and 3 runs per day, no account needed. Pro raises this to 3,000 words per run with unlimited runs." },
      { q: "Does it detect ChatGPT, Claude, and Gemini text?", a: "It detects the stylistic patterns common to AI-generated text in general rather than fingerprinting one specific model — which also makes it robust to new models." },
    ],
    ctaHumanizer: "Text scored high? Rewrite it naturally with the AI Humanizer",
  },
  ar: {
    h1: "كاشف الذكاء الاصطناعي المجاني",
    sub: "الصق أي نص بالأسفل واحصل على نسبة احتمال الذكاء الاصطناعي خلال ثوانٍ — مع تمييز الجمل التي رفعت النتيجة داخل النص. يعمل بالعربية والإنجليزية على نفس المحرّك.",
    sections: [
      {
        icon: ScanLine,
        h: "كيف تُحسب النتيجة",
        p: "يحلل صحيحلي البصمة الإحصائية لنصك: مدى انتظام أطوال الجمل، ومدى تكرار المفردات، وكم عبارة نمطية آلية تظهر فيه. الكتابة البشرية متفاوتة بطبعها — تمزج جملاً قصيرة حادة بأخرى طويلة متأملة. أما كتابة الآلة فتميل للسلاسة والانتظام. تعبّر النتيجة عن مدى ميل نصك للنعومة الآلية، من ٠ (يبدو بشرياً) إلى ١٠٠ (يبدو آلياً).",
      },
      {
        icon: AlignLeft,
        h: "تمييز على مستوى الجملة",
        p: "رقم واحد لا يخبرك ماذا تصلح. لذلك يميّز كل تحليل الجمل الفردية التي تحمل أقوى الأنماط الآلية، لترى بالضبط أين يسكن الإيقاع الروبوتي — وتعيد صياغة تلك السطور تحديداً، لا المسودة كلها.",
      },
      {
        icon: Languages,
        h: "مبني للعربية، لا مترجم إليها",
        p: "معظم الكواشف دُرّبت وتُحقّقت على الإنجليزية فقط؛ مرّر العربية خلالها وستحصل على ضجيج. يستدل صحيحلي على العربية مباشرة — صرفها ومستواها وصياغتها الطبيعية — ولهذا نتائج العربية هنا ذات معنى لا مجرد زينة.",
      },
      {
        icon: ShieldCheck,
        h: "اقرأ النتائج بمسؤولية",
        p: "لا يوجد كاشف في السوق دقيق ١٠٠٪، بما فيه هذا. اعتبر كل نتيجة إرشاداً لتحسين الأسلوب — لا دليلاً على هوية الكاتب، ولا بيّنة وحيدة في أي نزاع أكاديمي أو مهني.",
      },
    ],
    faq: [
      { q: "ما مدى دقة الكاشف؟", a: "يقدّم تقديراً مدروساً مبنياً على إشارات أسلوبية، ويُظهر منطقه عبر تمييز الجمل. وككل كاشف قد يخطئ — اعتبر النتائج إرشادية لا قاطعة." },
      { q: "كم كلمة أفحص مجاناً؟", a: "حتى ٢٥٠ كلمة لكل محاولة و٣ محاولات يومياً بلا حساب. خطة برو ترفعها إلى ٣٬٠٠٠ كلمة لكل محاولة بمحاولات غير محدودة." },
      { q: "هل يكشف نصوص ChatGPT وClaude وGemini؟", a: "يكشف الأنماط الأسلوبية الشائعة في نصوص الذكاء الاصطناعي عموماً بدل بصمة نموذج بعينه — وهذا يجعله صامداً أمام النماذج الجديدة أيضاً." },
    ],
    ctaHumanizer: "طلعت النتيجة عالية؟ أعد صياغته طبيعياً بمُنسّن النص",
  },
};

export default async function AIDetectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const c = C[locale];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: c.h1,
      step: dict.how.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.desc,
      })),
    },
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/ai-detector` },
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
          <h1 className="text-center text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">{c.h1}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">{c.sub}</p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10">
            <ToolStudio locale={locale} dict={dict} />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-20 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {c.sections.map((s, i) => (
            <Reveal key={s.h} delay={i} as="div">
              <div className="glass tilt h-full rounded-2xl p-6">
                <s.icon size={20} className="mb-3 text-violet-300" />
                <h2 className="text-lg font-semibold">{s.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-6 text-center">
            <Link href="/ai-humanizer" className="font-medium text-violet-300 hover:text-violet-200">
              {c.ctaHumanizer}
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10">
            <EmbedSnippet locale={locale} />
          </div>
        </Reveal>

        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold">{dict.faq.title}</h2>
          <div className="mt-6">
            <FAQ items={c.faq} />
          </div>
        </div>
      </div>
    </div>
  );
}
