import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { Languages, BookOpenCheck, Feather, ShieldCheck, Gauge, Users, FileWarning } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
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
        ? "كاشف الذكاء الاصطناعي للنصوص العربية — مجاني وبلا تسجيل"
        : "Arabic AI Detector — Free AI Detector for Arabic Text",
    description:
      loc === "ar"
        ? "كاشف ذكاء اصطناعي مجاني للنصوص العربية، مبني للغة لا مترجَم إليها: يقرأ الصرف والمستوى اللغوي، ويميّز الجمل التي رفعت النتيجة، ويخبرك بمقدار ثقته. بلا تسجيل."
        : "A free AI detector for Arabic text, built for the language rather than translated into it: it reads Arabic morphology and register, highlights the sentences driving the score, and reports how confident it is. No signup.",
    alternates: alternatesFor(loc, "/arabic-ai-detector"),
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Arabic AI Detector")}&sub=${encodeURIComponent("The first detector genuinely built for Arabic — morphology, register, highlights")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
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
      {
        icon: Gauge,
        h: "Why English-trained detectors misjudge Arabic",
        p: "Almost every detector on the market was trained and validated on English, then pointed at other languages and shipped. Arabic breaks the assumptions that training encoded. Root-and-pattern morphology packs meaning into word forms rather than word counts, so sentence-length statistics mean something different. Classical connective conventions produce regular, flowing prose that an English-calibrated model reads as machine-smooth. The result is a tool that flags perfectly natural Arabic and misses genuinely generated Arabic, while displaying the same confident percentage either way.",
      },
      {
        icon: Users,
        h: "The cost of getting this wrong falls on real people",
        p: "Published research has documented that AI detectors flag writing by non-native English speakers at dramatically higher rates than native speakers. The same structural bias applies when an English-tuned model judges Arabic. In practice that means Arabic-speaking students and professionals bear the highest false-positive risk from tools that were never calibrated on their language — which is precisely why we report a confidence rating rather than a bare number, and why we say plainly that a score is not evidence.",
      },
      {
        icon: FileWarning,
        h: "What we still cannot do",
        p: "Arabic tuning improves the judgement; it does not make it certain. Short passages remain unreliable, heavily edited generated text still evades detection, and dialectal writing sits outside what any current detector handles well. We would rather state those limits than let a confident interface imply precision we do not have.",
      },
    ],
    faq: [
      { q: "Are there really no other Arabic AI detectors?", a: "There are tools that accept Arabic input. The distinction we draw is between accepting a language and being calibrated on it — most run one model generalised across many languages, which is why Arabic results from them are often closer to noise than judgement." },
      { q: "Does it handle dialects as well as Modern Standard Arabic?", a: "Standard Arabic is where it performs best. Dialectal writing is harder for every detector because the training material is thinner and the conventions vary widely by region, so treat dialect results with extra caution." },
      { q: "Can I check a mix of Arabic and English?", a: "Yes. Mixed-language passages are common in real writing and the analysis handles them, though a passage that switches constantly gives the statistics less to work with in either language." },
      { q: "Is checking Arabic free?", a: "Yes. Arabic and English are covered identically on the free tier, with no account required. Paid plans exist for longer documents and the humanizer, not for unlocking Arabic." },
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
      {
        icon: Gauge,
        h: "لماذا تُخطئ الكواشف المدرَّبة على الإنجليزية في العربية",
        p: "كل كاشف تقريباً في السوق دُرِّب وتُحقِّق على الإنجليزية، ثم وُجِّه للغات أخرى وشُحِن. والعربية تكسر الافتراضات التي رمّزها ذلك التدريب. فالصرف القائم على الجذر والوزن يحزم المعنى داخل صيغ الكلمات لا في عددها، فتصير إحصاءات أطوال الجمل تعني شيئاً مختلفاً. وأعراف الربط الفصيحة تُنتج نثراً منتظماً منساباً يقرأه نموذج مُعايَر على الإنجليزية كنعومة آلية. والنتيجة أداة تُصنِّف عربية سليمة تماماً كآلية وتُفوّت عربية مولّدة فعلاً، وتعرض النسبة الواثقة نفسها في الحالتين.",
      },
      {
        icon: Users,
        h: "ثمن الخطأ يقع على أشخاص حقيقيين",
        p: "وثّقت أبحاث منشورة أن كواشف الذكاء الاصطناعي تُصنِّف كتابة غير الناطقين بالإنجليزية كآلية بمعدلات أعلى بكثير من الناطقين الأصليين. والانحياز البنيوي نفسه ينطبق حين يحكم نموذج مضبوط على الإنجليزية على العربية. وهذا عملياً يعني أن الطلاب والمهنيين الناطقين بالعربية يتحمّلون أعلى خطر خطأ من أدوات لم تُعايَر على لغتهم قط — ولهذا تحديداً نعرض تقييماً للثقة بدل رقم مجرّد، ونقول بوضوح إن النتيجة ليست دليلاً.",
      },
      {
        icon: FileWarning,
        h: "ما لا نستطيعه بعد",
        p: "ضبط العربية يحسّن الحكم؛ ولا يجعله يقيناً. فالمقاطع القصيرة تبقى غير موثوقة، والنص المولّد المحرَّر بكثافة ما زال يفلت من الكشف، والكتابة باللهجات تقع خارج ما يُحسنه أي كاشف حالي. ونفضّل ذكر هذه الحدود على أن توحي واجهة واثقة بدقة لا نملكها.",
      },
    ],
    faq: [
      { q: "هل لا توجد فعلاً كواشف عربية أخرى؟", a: "توجد أدوات تقبل مُدخلاً عربياً. والتمييز الذي نضعه بين قبول لغة والمعايرة عليها — فمعظمها يشغّل نموذجاً واحداً معمّماً على لغات كثيرة، ولهذا كثيراً ما تكون نتائجها العربية أقرب للضجيج منها للحكم." },
      { q: "هل يتعامل مع اللهجات كالفصحى؟", a: "الفصحى هي حيث يؤدي أفضل ما لديه. والكتابة باللهجات أصعب على كل كاشف لأن المادة التدريبية أرقّ والأعراف تتباين بشدة بين المناطق، فتعامل مع نتائج اللهجات بحذر إضافي." },
      { q: "هل أفحص نصاً يخلط العربية والإنجليزية؟", a: "نعم. المقاطع مختلطة اللغة شائعة في الكتابة الواقعية والتحليل يتعامل معها، وإن كان المقطع الذي يتبدّل باستمرار يترك للإحصاء مادة أقل في كلتا اللغتين." },
      { q: "هل فحص العربية مجاني؟", a: "نعم. العربية والإنجليزية مغطّاتان بالتساوي في الخطة المجانية بلا حساب. والخطط المدفوعة للمستندات الأطول وللمُنسّن، لا لفتح العربية." },
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl(locale, "/arabic-ai-detector") },
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <TreeLink href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
              {c.ctaLink}
            </TreeLink>
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
