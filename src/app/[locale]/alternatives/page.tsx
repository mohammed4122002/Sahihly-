import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Repeat2 } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { alternatives } from "@/content/alternatives";
import Reveal from "@/components/Reveal";

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
        ? "بدائل أدوات كشف الذكاء الاصطناعي — مقارنات صادقة"
        : "AI Tool Alternatives — Honest Comparisons",
    description:
      loc === "ar"
        ? "تبحث عن بديل لأداة تستخدمها؟ قوائم بدائل صادقة لكل من Undetectable.ai وQuillBot وGPTZero وZeroGPT وCopyleaks."
        : "Looking to switch tools? Honest alternative lists for Undetectable.ai, QuillBot, GPTZero, ZeroGPT, and Copyleaks.",
    alternates: { canonical: "/alternatives" },
  };
}

export default async function AlternativesHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ar ? "بدائل الأدوات" : "Tool alternatives",
    url: `${SITE_URL}/alternatives`,
    hasPart: alternatives.map((a) => ({
      "@type": "WebPage",
      name: ar ? `أفضل بدائل ${a.target}` : `Best ${a.target} Alternatives`,
      url: `${SITE_URL}/alternatives/${a.slug}`,
    })),
  };

  return (
    <div className="container-x max-w-4xl py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <div className="text-center">
          <span className="eyebrow">{ar ? "تفكّر بالتبديل؟" : "Thinking of switching?"}</span>
        </div>
        <h1 className="mt-3 text-center text-4xl font-bold sm:text-5xl">
          {ar ? "بدائل الأدوات" : "Tool alternatives"}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {ar
            ? "لكل أداة نقاط ضعف. هنا نشرح لماذا يبدّل الناس، ونرشّح البدائل الأنسب — بما فيها بدائل غيرنا."
            : "Every tool has weak spots. Here we explain why people switch and recommend the best options — including ones that aren't us."}
        </p>
      </Reveal>

      <Reveal>
        <section className="mt-16 space-y-8">
          {(ar
            ? [
          {
            h: "لماذا يبدّل الناس أدواتهم فعلاً",
            p: "بحسب تجربتنا، نادراً ما يكون السبب ميزة ناقصة. فالأسباب الشائعة تكلفة لم تعد منطقية مع نمو الاستخدام، أو لغة لم تدعمها الأداة حقاً، أو نتائج تعذّر شرحها لزميل أو طالب، أو تغيير سياسة في مؤسسة جعل سير العمل السابق غير صالح. ومعرفة أيّها يدفعك مهمّة، لأن البديل الصحيح لمشكلة تسعير غير البديل الصحيح لمشكلة لغة.",
          },
          {
            h: "تكاليف التبديل التي يغفلها الناس",
            p: "قبل أن تنتقل، تحقّق ممّا ستخسره. فالسجلّ المحفوظ والتقارير السابقة لا تنتقل عادةً. والتكاملات مع معالج نصوص أو نظام تعلّم قد تحتاج موافقة جديدة من شخص آخر. وأعضاء الفريق عليهم تعلّم واجهة من جديد، وإن صنّفت الأداة الجديدة النص نفسه بشكل مختلف — وستفعل — فكل ما عايرته على الأرقام القديمة يحتاج مراجعة. ولا شيء من هذا سبب للبقاء، لكن اكتشافه لاحقاً هو ما يحوّل الانتقال إلى فوضى.",
          },
          {
            h: "أحياناً تكون الإجابة الصادقة أن تبقى",
            p: "كل صفحة هنا تسمّي الحالات التي تبقى فيها الأداة الحالية الخيار الأفضل، بما فيها حالات تتفوّق فيها علينا. فإن احتجت مطابقة انتحال أو تكاملات مؤسسية أو اتساعاً عبر لغات كثيرة، فسنقول لك ذلك بدل أن نجادلك للخروج من أداة تناسب متطلّبك أكثر منّا. والتوصية التي لا تثق بها حين تقول ابقَ لا تساوي كثيراً حين تقول بدّل.",
          },
              ]
            : [
          {
            h: "Why people actually switch tools",
            p: "In our experience it is rarely about a missing feature. The common reasons are cost that stopped making sense as usage grew, a language the tool never really supported, results that could not be explained to a colleague or a student, or a policy change at an institution that made the previous workflow unusable. Knowing which of those is driving you matters, because the right replacement for a pricing problem is different from the right replacement for a language one.",
          },
          {
            h: "Switching costs people forget",
            p: "Before you move, check what you lose. Saved history and past reports usually do not transfer. Integrations into a word processor or an LMS may need re-approval by someone else. Team members have to relearn an interface, and if the new tool scores the same text differently — which it will — anything you had calibrated against the old numbers needs revisiting. None of these is a reason to stay, but discovering them afterwards is how a migration turns into a mess.",
          },
          {
            h: "Sometimes the honest answer is to stay",
            p: "Each page here names the cases where the incumbent is still the better choice, including cases where it beats us. If you need plagiarism matching, institutional integrations, or breadth across many languages, we will tell you so rather than argue you out of a tool that fits your requirement better than ours does. A recommendation you cannot trust when it says stay is not worth much when it says switch.",
          },
              ]
          ).map((sec) => (
            <div key={sec.h}>
              <h2 className="text-xl font-bold">{sec.h}</h2>
              <p className="mt-3 leading-relaxed text-white/65">{sec.p}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {alternatives.map((a, i) => (
          <Reveal key={a.slug} delay={i} as="div">
            <Link
              href={`/alternatives/${a.slug}`}
              className="glass glow-card tilt group flex h-full flex-col rounded-2xl p-6"
            >
              <Repeat2 size={20} className="mb-3 text-violet-300" />
              <h2 className="text-lg font-semibold transition-colors group-hover:text-violet-200">
                {ar ? `أفضل بدائل ${a.target}` : `Best ${a.target} alternatives`}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/55">
                {a.reasons[locale][0]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                {ar ? "اقرأ القائمة" : "See the list"}
                <ArrowRight size={14} className="flip-x" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
