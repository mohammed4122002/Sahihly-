import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Fingerprint, RefreshCcw, ShieldCheck } from "lucide-react";
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
        ? "كاشف ChatGPT المجاني — افحص النص خلال ثوانٍ"
        : "Free ChatGPT Detector — Check Text in Seconds",
    description:
      loc === "ar"
        ? "هل كُتب هذا النص بـ ChatGPT؟ الصقه واحصل على نسبة الاحتمال مع تمييز الجمل المشبوهة وتقرير أسلوب كامل — بالعربية والإنجليزية، مجاناً وبلا تسجيل."
        : "Was this written by ChatGPT? Paste it and get an AI-likelihood score with suspicious sentences highlighted and a full style report — English and Arabic, free, no signup.",
    alternates: { canonical: "/chatgpt-detector" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("ChatGPT Detector")}&sub=${encodeURIComponent("Check text for the AI fingerprint in seconds — free, English & Arabic")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "ChatGPT Detector",
    sub: "Paste any text and see in seconds how strongly it carries the stylistic fingerprint of ChatGPT and similar AI models — with the exact sentences highlighted and a four-metric style report.",
    sections: [
      {
        icon: Fingerprint,
        h: "The ChatGPT fingerprint",
        p: "ChatGPT text tends to be suspiciously even: uniform sentence lengths, tidy transitions (\"furthermore\", \"moreover\", \"in conclusion\"), balanced clause structures, and a fondness for words like seamless, robust, and holistic. Individually harmless — together, a fingerprint.",
      },
      {
        icon: Bot,
        h: "Why we detect patterns, not models",
        p: "Sahihly doesn't claim to identify one specific product. It measures the stylistic signals shared by ChatGPT, Claude, Gemini, and their successors — which keeps detection meaningful even as new models ship every month.",
      },
      {
        icon: RefreshCcw,
        h: "Flagged? Fix it in one click",
        p: "When a passage scores high, jump straight into the humanizer: it rewrites the robotic rhythm into natural prose while preserving your meaning, then automatically re-checks the result and shows the before/after signal drop.",
      },
      {
        icon: ShieldCheck,
        h: "Honest limits",
        p: "No ChatGPT detector is 100% accurate — anyone claiming otherwise is selling certainty they don't have. Heavily edited AI text can pass; distinctive human writing can trip alarms. Use scores to revise, never to accuse.",
      },
    ],
    faq: [
      { q: "Can it really tell ChatGPT wrote something?", a: "It estimates the probability based on style signals strongly associated with AI text. It's evidence for your own revision process, not proof of authorship." },
      { q: "Does it work on GPT-5 / newer models?", a: "Yes — because it detects the shared statistical style of AI writing rather than fingerprinting one version, it stays relevant as models evolve." },
      { q: "Does it detect ChatGPT in Arabic?", a: "Yes — Sahihly is the rare detector built natively for Arabic as well as English, with the same sentence-level highlights in both." },
    ],
    ctaLink: "Also try the Arabic AI Detector",
  },
  ar: {
    h1: "كاشف ChatGPT",
    sub: "الصق أي نص وشاهد خلال ثوانٍ مدى حمله للبصمة الأسلوبية لـ ChatGPT والنماذج المشابهة — مع تمييز الجمل بعينها وتقرير أسلوب من أربعة مقاييس.",
    sections: [
      {
        icon: Fingerprint,
        h: "بصمة ChatGPT",
        p: "نص ChatGPT منتظم بشكل مريب: أطوال جمل متساوية، روابط مرتبة («علاوة على ذلك»، «في الختام»)، تراكيب متوازنة، وولع بكلمات مثل سلس وشامل وقوي. كل واحدة بريئة وحدها — ومعاً بصمة.",
      },
      {
        icon: Bot,
        h: "لماذا نكشف الأنماط لا النماذج",
        p: "لا يدّعي صحيحلي تحديد منتج بعينه. يقيس الإشارات الأسلوبية المشتركة بين ChatGPT وClaude وGemini وخلفائها — فيبقى الكشف ذا معنى حتى مع صدور نماذج جديدة كل شهر.",
      },
      {
        icon: RefreshCcw,
        h: "طلع مشبوهاً؟ أصلحه بنقرة",
        p: "حين ترتفع نتيجة فقرة، انتقل مباشرة للمُنسّن: يعيد كتابة الإيقاع الآلي نثراً طبيعياً مع حفظ معناك، ثم يعيد فحص النتيجة تلقائياً ويعرض انخفاض الإشارات قبل/بعد.",
      },
      {
        icon: ShieldCheck,
        h: "حدود صادقة",
        p: "لا يوجد كاشف ChatGPT دقيق ١٠٠٪ — ومن يدّعي غير ذلك يبيع يقيناً لا يملكه. النص الآلي المحرَّر بعناية قد يمرّ، والكتابة البشرية المميزة قد تُنذر خطأً. استخدم النتائج للمراجعة لا للاتهام.",
      },
    ],
    faq: [
      { q: "هل يجزم فعلاً أن ChatGPT كتب النص؟", a: "يقدّر الاحتمال بناءً على إشارات أسلوبية شديدة الارتباط بنصوص الذكاء الاصطناعي. إنه دليل لعملية مراجعتك أنت، لا إثبات لهوية الكاتب." },
      { q: "هل يعمل مع GPT-5 والنماذج الأحدث؟", a: "نعم — لأنه يكشف الأسلوب الإحصائي المشترك لكتابة الذكاء الاصطناعي لا بصمة إصدار واحد، فيبقى فعالاً مع تطور النماذج." },
      { q: "هل يكشف ChatGPT بالعربية؟", a: "نعم — صحيحلي الكاشف النادر المبني بأصالة للعربية كما للإنجليزية، بنفس تمييز الجمل في اللغتين." },
    ],
    ctaLink: "جرّب أيضاً كاشف النصوص العربية",
  },
};

export default async function ChatGPTDetectorPage({
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
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/chatgpt-detector` },
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
            <Link
              href="/arabic-ai-detector"
              className="font-medium text-violet-300 hover:text-violet-200"
            >
              {c.ctaLink}
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
