import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Fingerprint, RefreshCcw, ShieldCheck, Gauge, Users, FileWarning } from "lucide-react";
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
        ? "كاشف ChatGPT المجاني — افحص النص خلال ثوانٍ"
        : "Free ChatGPT Detector — Check Text in Seconds",
    description:
      loc === "ar"
        ? "هل كُتب هذا النص بـ ChatGPT؟ الصقه واحصل على نسبة الاحتمال مع تمييز الجمل المشبوهة وتقرير أسلوب كامل — بالعربية والإنجليزية، مجاناً وبلا تسجيل."
        : "Was this written by ChatGPT? Paste it and get an AI-likelihood score with suspicious sentences highlighted and a full style report — English and Arabic, free, no signup.",
    alternates: alternatesFor(loc, "/chatgpt-detector"),
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
      {
        icon: Gauge,
        h: "No detector identifies ChatGPT specifically",
        p: "This is worth being blunt about, because the whole category markets otherwise. There is no watermark in ChatGPT output and no database of everything it has produced. What any detector actually measures is how predictable your text is to a language model — the statistical signature that generated text tends to share, whichever system produced it. That is why a tool that claims to name the model should be treated with suspicion, and why ours reports what it actually knows: how machine-like the writing reads, and how confident it is in that reading.",
      },
      {
        icon: Users,
        h: "Why honest writing gets flagged",
        p: "Because the detector measures uniformity, not origin. Second-language writers, students trained in rigid essay formats, and careful editors all produce even, conventional prose that lands in the same statistical territory as generated text. Research has documented that non-native English writers are flagged at markedly higher rates. If you have been accused on the strength of a percentage, that context matters, and it is why we publish the confidence rating alongside every score.",
      },
      {
        icon: FileWarning,
        h: "What a high score should actually prompt",
        p: "A conversation, not a conclusion. If you are assessing someone else's work, ask them about the argument — nobody who did not write a piece can explain why they cut a paragraph or what they nearly argued instead. If it is your own writing, read the highlighted sentences: they are usually the flattest ones, and fixing them improves the draft whether or not a model was involved.",
      },
    ],
    faq: [
      { q: "Can this tell me if text came from ChatGPT rather than Claude or Gemini?", a: "No, and neither can anything else honestly. Detectors read a shared statistical signature of generated text, not per-model fingerprints. Any tool naming a specific model is inferring, not identifying." },
      { q: "Does ChatGPT watermark its output?", a: "Not in any form a third-party detector can read. Watermarking has been researched and discussed publicly, but you should assume nothing usable is present in text you are checking." },
      { q: "Why did my score change when I reran the same text?", a: "Short or borderline passages sit near a decision boundary where small differences move the result. That instability is itself information: it means the text is genuinely ambiguous, which is why we show confidence rather than a lone number." },
      { q: "Is it free to use?", a: "Yes, on the free tier, with no account needed. Paid plans raise the per-run word limit and add the humanizer and saved history." },
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
      {
        icon: Gauge,
        h: "لا كاشف يتعرّف على ChatGPT تحديداً",
        p: "يستحق هذا صراحةً، لأن المجال كله يسوّق خلاف ذلك. فلا توجد علامة مائية في مخرجات ChatGPT ولا قاعدة بيانات لكل ما أنتجه. وما يقيسه أي كاشف فعلاً هو مدى قابلية نصّك للتوقّع من نموذج لغوي — البصمة الإحصائية التي يميل النص المولّد لمشاركتها، أياً كان النظام الذي أنتجه. ولهذا ينبغي التعامل بريبة مع أداة تدّعي تسمية النموذج، ولهذا يعرض كاشفنا ما يعرفه فعلاً: كم تبدو الكتابة آلية، وكم هو واثق من هذه القراءة.",
      },
      {
        icon: Users,
        h: "لماذا تُصنَّف الكتابة النزيهة كآلية",
        p: "لأن الكاشف يقيس الانتظام لا المصدر. فالكاتبون بلغة ثانية والطلاب المدرَّبون على قوالب مقالية صارمة والمحرّرون الدقيقون كلهم يُنتجون نثراً مستوياً تقليدياً يقع في المنطقة الإحصائية نفسها للنص المولّد. وقد وثّقت الأبحاث أن غير الناطقين بالإنجليزية يُصنَّفون بمعدلات أعلى بوضوح. فإن اتُّهمت بناءً على نسبة مئوية، فهذا السياق مهم، ولهذا ننشر تقييم الثقة مع كل نتيجة.",
      },
      {
        icon: FileWarning,
        h: "ما ينبغي أن تستدعيه النتيجة العالية فعلاً",
        p: "محادثة لا خلاصة. فإن كنت تُقيّم عمل غيرك فاسأله عن حجّته — فلا أحد لم يكتب نصاً يستطيع تفسير سبب حذفه فقرة أو ما كاد يقوله بدلاً منها. وإن كانت كتابتك أنت فاقرأ الجمل المميّزة: هي عادةً الأكثر تسطّحاً، وإصلاحها يحسّن المسودّة سواء تدخّل نموذج أم لا.",
      },
    ],
    faq: [
      { q: "هل يميّز نصّ ChatGPT عن Claude أو Gemini؟", a: "لا، ولا يستطيع غيره ذلك بصدق. فالكواشف تقرأ بصمة إحصائية مشتركة للنص المولّد لا بصمات لكل نموذج. وأي أداة تسمّي نموذجاً بعينه فهي تستنتج لا تتعرّف." },
      { q: "هل يضع ChatGPT علامة مائية في مخرجاته؟", a: "ليس بصيغة يستطيع كاشف خارجي قراءتها. فقد بُحثت العلامات المائية ونوقشت علناً، لكن افترض أن لا شيء صالحاً للاستخدام موجود في النص الذي تفحصه." },
      { q: "لماذا تغيّرت النتيجة عند إعادة فحص النص نفسه؟", a: "المقاطع القصيرة أو الحدّية تقع قرب حدّ قرار تُحرّكه فروق صغيرة. وهذا التذبذب نفسه معلومة: يعني أن النص ملتبس فعلاً، ولهذا نعرض الثقة لا رقماً وحيداً." },
      { q: "هل الاستخدام مجاني؟", a: "نعم في الخطة المجانية بلا حساب. والخطط المدفوعة ترفع حدّ الكلمات لكل محاولة وتضيف المُنسّن وحفظ السجلّ." },
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl(locale, "/chatgpt-detector") },
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
