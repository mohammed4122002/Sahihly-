import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Scale, GitCompare, TriangleAlert, ShieldCheck } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "منهجيتنا — كيف نحسب النتائج" : "Our Methodology — How We Score Text",
    description:
      loc === "ar"
        ? "شرح كامل وشفاف لكيفية عمل محرّك صحيحلي الهجين: الإشارات الإحصائية، استدلال الذكاء الاصطناعي، درجة الثقة، وحدود الدقة."
        : "A full, transparent explanation of how Sahihly's hybrid engine works: statistical signals, AI reasoning, the confidence rating, and the limits of accuracy.",
    alternates: { canonical: "/methodology" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Our Methodology")}&sub=${encodeURIComponent("How Sahihly scores text — transparently")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "How Sahihly scores text",
    lead: "Most detectors hand you a number and ask for trust. We'd rather show our work. Here is exactly what the engine measures, how the final score is produced, and where it can be wrong.",
    sections: [
      {
        icon: FlaskConical,
        h: "1. Deterministic style metrics",
        p: "Before any AI is involved, we compute four measurable properties of your text. Rhythm variety (burstiness) is the coefficient of variation of sentence lengths — human writing alternates short and long, machine writing is flat. Vocabulary richness is the ratio of unique words to total words. Average sentence length captures pacing. And we count machine-typical stock phrases, with a separate phrase list for Arabic and English. These numbers are reproducible: the same text always yields the same metrics.",
      },
      {
        icon: GitCompare,
        h: "2. A hybrid ensemble, not a single opinion",
        p: "Those metrics are then passed into the language model as evidence alongside the text itself, so the model reasons with data rather than vibes. The final score blends the model's judgment (65%) with the deterministic statistical score (35%). Two independent views cross-check each other, which reduces the erratic swings you get from a single-model detector.",
      },
      {
        icon: Scale,
        h: "3. Long texts are chunked, not truncated",
        p: "Passages above roughly 600 words are split at sentence boundaries and analyzed in parallel, then merged with a word-weighted average. This keeps sentence-level detail sharp on long documents instead of degrading or silently cutting your text short.",
      },
      {
        icon: ShieldCheck,
        h: "4. An honest confidence rating",
        p: "Every result carries a confidence level. Under ~40 words the signal is physically weak, so confidence is low. If only one engine ran, confidence is capped at medium. And when the statistical and AI views disagree by more than 30 points, we demote confidence — because a genuine disagreement means the case is ambiguous, and you deserve to know that.",
      },
      {
        icon: TriangleAlert,
        h: "5. Where we can be wrong",
        p: "Two error types matter. A false positive flags genuinely human writing as AI — most likely with very formal, highly edited, or non-native prose. A false negative misses AI text, most likely when it has been heavily rewritten by a person. No detector on the market escapes this trade-off, and any tool claiming 99% certainty is selling confidence it cannot have. That is why we present scores as guidance for revision, never as evidence for an accusation.",
      },
    ],
    updated: "Last reviewed: July 2026",
    cta: "See the methodology in action — run a free check",
  },
  ar: {
    h1: "كيف يحسب صحيحلي نتائجه",
    lead: "معظم الكواشف تعطيك رقماً وتطلب منك الثقة. نحن نفضّل أن نُريك عملنا. إليك بالضبط ما يقيسه المحرّك، وكيف تُنتَج النتيجة النهائية، وأين يمكن أن يخطئ.",
    sections: [
      {
        icon: FlaskConical,
        h: "١. مقاييس أسلوب حتمية",
        p: "قبل تدخّل أي ذكاء اصطناعي، نحسب أربع خصائص قابلة للقياس في نصّك. تنوّع الإيقاع (التباين) هو معامل اختلاف أطوال الجمل — الكتابة البشرية تناوب بين القصير والطويل، وكتابة الآلة مسطّحة. وثراء المفردات نسبة الكلمات الفريدة إلى إجماليها. ومتوسط طول الجملة يلتقط الإيقاع. ونعدّ العبارات النمطية الآلية بقائمة منفصلة للعربية وأخرى للإنجليزية. هذه الأرقام قابلة للتكرار: النص نفسه يعطي المقاييس نفسها دائماً.",
      },
      {
        icon: GitCompare,
        h: "٢. مزيج هجين، لا رأي واحد",
        p: "تُمرَّر تلك المقاييس بعدها إلى النموذج اللغوي كأدلة إلى جانب النص نفسه، فيستدل النموذج ببيانات لا بانطباعات. وتمزج النتيجة النهائية حكم النموذج (٦٥٪) مع النتيجة الإحصائية الحتمية (٣٥٪). رأيان مستقلان يصحّحان بعضهما، ما يقلّل التذبذب الذي تعانيه الكواشف أحادية النموذج.",
      },
      {
        icon: Scale,
        h: "٣. النصوص الطويلة تُجزّأ لا تُبتر",
        p: "الفقرات فوق ٦٠٠ كلمة تقريباً تُقسَّم عند حدود الجمل وتُحلَّل بالتوازي، ثم تُدمج بمتوسط موزون بعدد الكلمات. هذا يُبقي التفصيل على مستوى الجملة حاداً في المستندات الطويلة بدل أن تتدهور الدقة أو يُقتطع نصّك بصمت.",
      },
      {
        icon: ShieldCheck,
        h: "٤. درجة ثقة صادقة",
        p: "كل نتيجة تحمل درجة ثقة. تحت ٤٠ كلمة تقريباً تكون الإشارة ضعيفة فيزيائياً، فالثقة منخفضة. وإذا عمل محرّك واحد فقط، تُحدَّد الثقة عند «متوسطة». وحين يختلف الرأيان الإحصائي والذكي بأكثر من ٣٠ نقطة، نخفض الثقة — لأن الاختلاف الحقيقي يعني أن الحالة ملتبسة، ومن حقك أن تعرف.",
      },
      {
        icon: TriangleAlert,
        h: "٥. أين يمكن أن نخطئ",
        p: "نوعان من الخطأ يهمّان. الإيجابي الكاذب يَسِم كتابة بشرية أصيلة بأنها آلية — وأرجح ما يحدث مع النثر شديد الرسمية أو المحرَّر بكثافة أو لغير الناطق الأصلي. والسلبي الكاذب يفوّت نصاً آلياً، وأرجح ما يحدث حين يعيد إنسان صياغته بعمق. لا كاشف في السوق ينجو من هذه المقايضة، وأي أداة تدّعي يقيناً بنسبة ٩٩٪ تبيع ثقة لا تملكها. لهذا نقدّم النتائج كإرشاد للمراجعة، لا كدليل للاتهام أبداً.",
      },
    ],
    updated: "آخر مراجعة: يوليو ٢٠٢٦",
    cta: "شاهد المنهجية عملياً — شغّل فحصاً مجانياً",
  },
};

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = C[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: c.h1,
    description: c.lead,
    inLanguage: locale,
    author: { "@type": "Organization", name: "Sahihly" },
    publisher: { "@type": "Organization", name: "Sahihly" },
    url: `${SITE_URL}/methodology`,
  };

  return (
    <div className="container-x max-w-3xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">{locale === "ar" ? "الشفافية" : "Transparency"}</span>
        </div>
        <h1 className="mt-3 text-center text-4xl font-bold sm:text-5xl">{c.h1}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">{c.lead}</p>
        <p className="mt-3 text-center text-xs text-white/35">{c.updated}</p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {c.sections.map((s, i) => (
          <Reveal key={s.h} delay={Math.min(i, 5)} as="div">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                  <s.icon size={18} />
                </span>
                <h2 className="text-lg font-semibold">{s.h}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-6 text-center">
          <Link href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
            {c.cta}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
