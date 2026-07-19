import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Repeat, FileCheck2, HeartHandshake } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import ToolStudio from "@/components/ToolStudio";
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
        ? "مُنسّن النصوص المجاني — حوّل نص الذكاء الاصطناعي لكتابة طبيعية"
        : "Free AI Humanizer — Turn AI Text Into Natural Writing",
    description:
      loc === "ar"
        ? "أعد صياغة النص الآلي بأسلوب بشري طبيعي دون تغيير المعنى، مع مقارنة قبل/بعد. يدعم العربية الفصحى بأصالة والإنجليزية بجودة كاملة — مجاناً وبلا تسجيل."
        : "Rewrite robotic AI text into a natural human voice without changing the meaning, with a before/after comparison. Native Arabic and full-quality English — free, no signup.",
    alternates: { canonical: "/ai-humanizer" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Free AI Humanizer")}&sub=${encodeURIComponent("Turn AI text into natural writing — meaning-safe, verified, Arabic + English")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "Free AI Humanizer",
    sub: "Paste AI-sounding text below and get it rewritten in a natural human voice — same meaning, same facts, better rhythm. Compare before and after side by side, then copy or download.",
    sections: [
      {
        icon: Repeat,
        h: "What actually changes",
        p: "The humanizer varies sentence length, removes assembly-line transitions like \"furthermore\" and \"moreover\", cuts robotic repetition, and restores the natural unevenness of human rhythm. What it never touches: your facts, your claims, your language, or your intent.",
      },
      {
        icon: FileCheck2,
        h: "Meaning-safe by design",
        p: "Rewriting tools often \"improve\" text by quietly changing what it says. Sahihly's humanizer is instructed to preserve the exact original meaning — it's a style pass, not a re-authoring pass. The before/after view makes that easy to verify with your own eyes.",
      },
      {
        icon: Sparkles,
        h: "Real Arabic fluency",
        p: "Humanizing Arabic isn't swapping synonyms. It means knowing when حيث sounds bureaucratic, when a nominal sentence flows better than a verbal one, and how real Arabic prose breathes. That understanding is built into the engine, not bolted on.",
      },
      {
        icon: HeartHandshake,
        h: "Use it with integrity",
        p: "This tool improves the style of writing you have the right to work on. It is not for disguising authorship where disclosure is required. Follow your institution's rules — our usage policy is explicit about this.",
      },
    ],
    faq: [
      { q: "Will it change my meaning?", a: "No — it's engineered as a style-only pass. Sentence rhythm, transitions, and repetition change; facts, claims, and intent stay. The before/after split view lets you verify every line." },
      { q: "Does it work in Arabic?", a: "Yes, natively. It produces fluent Modern Standard Arabic with correct grammar — not machine-translated phrasing." },
      { q: "Is the humanizer free?", a: "Up to 250 words per run and 3 runs a day, no account needed. Paid plans raise the word limit and remove the daily cap." },
    ],
    ctaDetector: "Not sure your text needs it? Check it first with the AI Detector",
  },
  ar: {
    h1: "مُنسّن النصوص المجاني",
    sub: "الصق النص الآلي بالأسفل واحصل عليه معاد الصياغة بصوت بشري طبيعي — نفس المعنى ونفس الحقائق بإيقاع أفضل. قارن قبل وبعد جنباً إلى جنب، ثم انسخ أو نزّل.",
    sections: [
      {
        icon: Repeat,
        h: "ما الذي يتغيّر فعلاً",
        p: "ينوّع المُنسّن أطوال الجمل، ويزيل روابط خط الإنتاج مثل «علاوة على ذلك» و«بالإضافة إلى ذلك»، ويقلّم التكرار الآلي، ويعيد التفاوت الطبيعي لإيقاع البشر. وما لا يلمسه أبداً: حقائقك وادعاءاتك ولغتك وقصدك.",
      },
      {
        icon: FileCheck2,
        h: "حفظ المعنى بالتصميم",
        p: "أدوات إعادة الصياغة كثيراً ما «تحسّن» النص بتغيير ما يقوله خلسة. مُنسّن صحيحلي موجَّه لحفظ المعنى الأصلي بدقة — إنها تمريرة أسلوب لا إعادة تأليف. وعرض قبل/بعد يجعل التحقق سهلاً بعينيك.",
      },
      {
        icon: Sparkles,
        h: "طلاقة عربية حقيقية",
        p: "تنسين العربية ليس تبديل مترادفات. إنه معرفة متى تبدو «حيث» بيروقراطية، ومتى تنساب الجملة الاسمية أفضل من الفعلية، وكيف يتنفس النثر العربي الحقيقي. هذا الفهم مبني في المحرّك لا ملصق عليه.",
      },
      {
        icon: HeartHandshake,
        h: "استخدمه بنزاهة",
        p: "تحسّن هذه الأداة أسلوب كتابةٍ تملك حق العمل عليها. ليست لإخفاء هوية الكاتب حيث يُشترط الإفصاح. التزم بقواعد مؤسستك — وسياسة استخدامنا صريحة في هذا.",
      },
    ],
    faq: [
      { q: "هل سيغيّر معناي؟", a: "لا — صُمّم كتمريرة أسلوب فقط. يتغيّر إيقاع الجمل والروابط والتكرار؛ وتبقى الحقائق والادعاءات والقصد. وعرض قبل/بعد يتيح التحقق من كل سطر." },
      { q: "هل يعمل بالعربية؟", a: "نعم، بأصالة. ينتج فصحى حديثة سليمة نحوياً — لا صياغة مترجمة آلياً." },
      { q: "هل المُنسّن مجاني؟", a: "حتى ٢٥٠ كلمة لكل محاولة و٣ محاولات يومياً بلا حساب. الخطط المدفوعة ترفع حد الكلمات وتزيل السقف اليومي." },
    ],
    ctaDetector: "مش متأكد أن نصك يحتاجه؟ افحصه أولاً بكاشف الذكاء الاصطناعي",
  },
};

export default async function AIHumanizerPage({
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
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/ai-humanizer` },
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
            <ToolStudio locale={locale} dict={dict} initialTab="humanize" />
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
            <Link href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
              {c.ctaDetector}
            </Link>
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
