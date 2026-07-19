import type { Metadata } from "next";
import Link from "next/link";
import { Languages, BookOpenCheck, Feather, ShieldCheck } from "lucide-react";
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
        ? "كاشف الذكاء الاصطناعي للنصوص العربية — الأول من نوعه"
        : "Arabic AI Detector — The First Built for Arabic, Free",
    description:
      loc === "ar"
        ? "أول كاشف ذكاء اصطناعي مبني للعربية فعلاً: يفهم الصرف والتشكيل والمستوى اللغوي، يميّز الجمل المشبوهة، ويعطي تقرير أسلوب كامل — مجاناً وبلا تسجيل."
        : "The first AI detector genuinely built for Arabic: it understands morphology, diacritics, and register, highlights suspicious sentences, and gives a full style report — free, no signup.",
    alternates: { canonical: "/arabic-ai-detector" },
  };
}

const C = {
  en: {
    h1: "Arabic AI Detector",
    sub: "Every mainstream detector was trained on English and merely tolerates Arabic. Sahihly is the opposite: an engine that reasons about Arabic morphology, diacritics, and register natively — paste Arabic text below and see the difference.",
    sections: [
      {
        icon: Languages,
        h: "Why English tools fail on Arabic",
        p: "Arabic builds dozens of word forms from a single root, marks meaning with optional diacritics, and moves freely between verbal and nominal sentences. Detectors trained on English statistics see all of that as noise — which produces random scores and unfair false accusations for Arabic writers.",
      },
      {
        icon: BookOpenCheck,
        h: "What native support actually means",
        p: "Sahihly's engine evaluates the signals that matter in Arabic: root-pattern variety, the rhythm of connected prose, register consistency (فصحى vs simplified), and the stock transitions Arabic AI text overuses — علاوة على ذلك، في الختام، من الجدير بالذكر.",
      },
      {
        icon: Feather,
        h: "From detection to better writing",
        p: "A score alone doesn't help you improve. Every Arabic analysis highlights the machine-flavored sentences and includes a style report — rhythm variety, vocabulary richness, AI-pattern count — so you know exactly which lines to rework, then the humanizer can rewrite them in fluent فصحى.",
      },
      {
        icon: ShieldCheck,
        h: "Fair by design",
        p: "Because false accusations hit Arabic speakers hardest with English-only tools, Sahihly treats every result as an estimate, shows its reasoning, and never claims courtroom certainty. Use scores to revise your work — not to judge someone else's.",
      },
    ],
    faq: [
      { q: "Is this really different from running Arabic through GPTZero?", a: "Yes. English-trained detectors don't model Arabic morphology, so their Arabic scores are close to noise. Sahihly evaluates Arabic-specific signals and shows per-sentence reasoning you can verify yourself." },
      { q: "Does it handle dialects or only فصحى?", a: "It's strongest on Modern Standard Arabic (فصحى), which is what essays, articles, and professional writing use. Dialect text is analyzed too, but MSA results are the most reliable." },
      { q: "Is the Arabic detector free?", a: "Yes — 250 words per run, 3 runs a day, no account. Paid plans raise limits and save your history." },
    ],
    ctaTitle: "Write in both languages?",
    ctaLink: "The same engine powers our English AI Detector",
  },
  ar: {
    h1: "كاشف الذكاء الاصطناعي للنصوص العربية",
    sub: "كل الكواشف المشهورة دُرّبت على الإنجليزية وتتحمّل العربية على مضض. صحيحلي العكس تماماً: محرّك يستدل على الصرف والتشكيل والمستوى اللغوي بأصالة — الصق نصاً عربياً بالأسفل وشاهد الفرق.",
    sections: [
      {
        icon: Languages,
        h: "لماذا تفشل الأدوات الإنجليزية مع العربية",
        p: "تبني العربية عشرات الصيغ من جذر واحد، وتحمل المعنى بتشكيل اختياري، وتتنقل بحرية بين الجملة الفعلية والاسمية. الكواشف المدرّبة على إحصاءات الإنجليزية ترى كل ذلك ضجيجاً — فتنتج نتائج عشوائية واتهامات ظالمة للكتّاب العرب.",
      },
      {
        icon: BookOpenCheck,
        h: "ماذا يعني الدعم الأصيل فعلاً",
        p: "يقيّم محرّك صحيحلي الإشارات المهمة في العربية: تنوّع الجذور والأوزان، إيقاع النثر المسبوك، اتساق المستوى اللغوي (فصحى أم مبسّطة)، والروابط الجاهزة التي يفرط فيها نص الذكاء الاصطناعي العربي — علاوة على ذلك، في الختام، من الجدير بالذكر.",
      },
      {
        icon: Feather,
        h: "من الكشف إلى كتابة أفضل",
        p: "الرقم وحده لا يطوّرك. كل تحليل عربي يميّز الجمل ذات النكهة الآلية ويرفق تقرير أسلوب — تنوّع الإيقاع، ثراء المفردات، عدد الأنماط الآلية — لتعرف أي السطور تعيد صياغتها بالضبط، ثم يعيد المُنسّن كتابتها بفصحى سليمة.",
      },
      {
        icon: ShieldCheck,
        h: "عادل بالتصميم",
        p: "لأن الاتهامات الخاطئة تصيب الناطقين بالعربية أكثر مع الأدوات الإنجليزية، يعامل صحيحلي كل نتيجة كتقدير، ويعرض منطقه، ولا يدّعي يقيناً قاطعاً أبداً. استخدم النتائج لتحسين عملك — لا للحكم على عمل غيرك.",
      },
    ],
    faq: [
      { q: "هل يختلف فعلاً عن تمرير العربية في GPTZero؟", a: "نعم. الكواشف المدرّبة على الإنجليزية لا تنمذج صرف العربية، فنتائجها العربية أقرب للضجيج. يقيّم صحيحلي إشارات عربية مخصوصة ويعرض استدلالاً لكل جملة يمكنك التحقق منه بنفسك." },
      { q: "هل يتعامل مع اللهجات أم الفصحى فقط؟", a: "أقوى ما يكون مع الفصحى الحديثة، وهي لغة المقالات والأبحاث والكتابة المهنية. يحلّل النص اللهجي أيضاً، لكن نتائج الفصحى هي الأوثق." },
      { q: "هل الكاشف العربي مجاني؟", a: "نعم — ٢٥٠ كلمة لكل محاولة، ٣ محاولات يومياً، بلا حساب. الخطط المدفوعة ترفع الحدود وتحفظ سجلّك." },
    ],
    ctaTitle: "تكتب باللغتين؟",
    ctaLink: "نفس المحرّك يشغّل كاشفنا الإنجليزي",
  },
};

export default async function ArabicDetectorPage({
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
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/arabic-ai-detector` },
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
            <span className="text-sm text-white/60">{c.ctaTitle} </span>
            <Link href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
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
