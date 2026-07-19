import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import WordCounterTool from "@/components/WordCounterTool";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";

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
        ? "عدّاد الكلمات المجاني — كلمات، أحرف، جمل، وقت القراءة"
        : "Free Word Counter — Words, Characters, Sentences & Reading Time",
    description:
      loc === "ar"
        ? "عدّاد كلمات فوري يعمل بالعربية والإنجليزية: كلمات، أحرف مع/بدون مسافات، جمل، فقرات، وقت القراءة والإلقاء — مجاناً وبلا تسجيل، ويعمل مباشرة في متصفحك."
        : "Instant word counter for English and Arabic: words, characters with/without spaces, sentences, paragraphs, reading and speaking time — free, no signup, runs entirely in your browser.",
    alternates: { canonical: "/word-counter" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Free Word Counter")}&sub=${encodeURIComponent("Words, characters, sentences & reading time — private, in your browser")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "Free Word Counter",
    sub: "Count words, characters, sentences, and paragraphs instantly — with reading and speaking time. Works for English and Arabic, entirely in your browser: your text never leaves your device.",
    labels: {
      placeholder: "Type or paste your text here…",
      words: "Words",
      chars: "Characters",
      charsNoSpaces: "Characters (no spaces)",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      readingTime: "Reading time",
      speakingTime: "Speaking time",
      minutes: "min",
      clear: "Clear",
    },
    faq: [
      { q: "Is the word counter private?", a: "Completely. Counting happens in your browser with JavaScript — the text is never uploaded to any server." },
      { q: "How is reading time calculated?", a: "We use the common average of 200 words per minute for silent reading and 130 for speaking aloud. Real speeds vary by reader and content." },
      { q: "Does it count Arabic correctly?", a: "Yes — words are split on whitespace and sentence detection understands Arabic punctuation (؟ ۔), so Arabic text counts accurately." },
    ],
    ctaTitle: "Need more than a count?",
    ctaBody: "Check whether your text reads as AI-written, or rewrite it into a natural human voice.",
    ctaDetector: "Try the AI Detector",
    ctaHumanizer: "Try the Humanizer",
  },
  ar: {
    h1: "عدّاد الكلمات المجاني",
    sub: "عدّ الكلمات والأحرف والجمل والفقرات فوراً — مع وقت القراءة والإلقاء. يعمل بالعربية والإنجليزية بالكامل داخل متصفحك: نصّك لا يغادر جهازك أبداً.",
    labels: {
      placeholder: "اكتب أو الصق نصّك هنا…",
      words: "كلمة",
      chars: "حرف",
      charsNoSpaces: "حرف (بلا مسافات)",
      sentences: "جملة",
      paragraphs: "فقرة",
      readingTime: "وقت القراءة",
      speakingTime: "وقت الإلقاء",
      minutes: "د",
      clear: "مسح",
    },
    faq: [
      { q: "هل العدّاد خاص وآمن؟", a: "تماماً. يجري العدّ داخل متصفحك بجافاسكربت — النص لا يُرفع لأي خادم إطلاقاً." },
      { q: "كيف يُحسب وقت القراءة؟", a: "نستخدم المتوسط الشائع: ٢٠٠ كلمة بالدقيقة للقراءة الصامتة و١٣٠ للإلقاء. السرعات الفعلية تختلف حسب القارئ والمحتوى." },
      { q: "هل يعدّ العربية بشكل صحيح؟", a: "نعم — تُفصل الكلمات على المسافات ويفهم كاشف الجمل علامات الترقيم العربية (؟ ۔)، فيَعُدّ النص العربي بدقة." },
    ],
    ctaTitle: "تحتاج أكثر من مجرد عدّ؟",
    ctaBody: "افحص إن كان نصّك يبدو مكتوباً بالذكاء الاصطناعي، أو أعد صياغته بصوت بشري طبيعي.",
    ctaDetector: "جرّب كاشف الذكاء الاصطناعي",
    ctaHumanizer: "جرّب المُنسّن",
  },
};

export default async function WordCounterPage({
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
      "@type": "WebApplication",
      name: c.h1,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: `${SITE_URL}/word-counter`,
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
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/word-counter` },
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
          <div className="mx-auto mt-10 max-w-4xl">
            <WordCounterTool labels={c.labels} />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-16 max-w-3xl">
        <Reveal>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-8 text-center">
            <h2 className="text-xl font-semibold">{c.ctaTitle}</h2>
            <p className="mt-2 text-sm text-white/60">{c.ctaBody}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/ai-detector" className="btn-primary rounded-full px-5 py-2.5 text-sm">
                {c.ctaDetector}
              </Link>
              <Link href="/ai-humanizer" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
                {c.ctaHumanizer}
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <h2 className="text-center text-2xl font-bold">{dict.faq.title}</h2>
          <div className="mt-6">
            <FAQ items={c.faq} />
          </div>
        </div>
      </div>
    </div>
  );
}
