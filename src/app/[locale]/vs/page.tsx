import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { competitors } from "@/content/competitors";
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
        ? "صحيحلي مقابل المنافسين — مقارنات صادقة"
        : "Sahihly vs the Alternatives — Honest Comparisons",
    description:
      loc === "ar"
        ? "قارن صحيحلي مع Undetectable.ai وQuillBot وGPTZero وCopyleaks وZeroGPT — أين نتفوق فعلاً وأين يتعادلون."
        : "Compare Sahihly with Undetectable.ai, QuillBot, GPTZero, Copyleaks, and ZeroGPT — where we genuinely win and where they hold their own.",
    alternates: alternatesFor(loc, "/vs"),
  };
}

export default async function VsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const ar = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: competitors.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title[locale],
      url: pageUrl(locale, `/vs/${c.slug}`),
    })),
  };

  return (
    <div className="container-x max-w-4xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{dict.compare.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {dict.compare.subtitle}
        </p>
      </Reveal>

      <Reveal>
        <section className="mt-16 space-y-8">
          {(ar
            ? [
          {
            h: "كيف تقرأ مقارنة كتبها أحد طرفيها",
            p: "نحن بنينا إحدى الأدوات في هذه الصفحة، فتعامل مع كل ما هنا بالشكّ الذي يستحقّه ذلك. وما نستطيع تقديمه بدل الحياد هو التحديد: كل مقارنة تذكر ما هو المنتج الآخر فعلاً، وتسمّي ما يفعله أفضل منّا، وتخبرك بوضوح أيّهما تختار لمهمة بعينها. وحين نقول إن منافساً يتفوّق فنحن نعنيها — فالصفحة التي لا تعترف بشيء إعلانٌ، وينبغي أن تخصم من قيمتها تبعاً لذلك.",
          },
          {
            h: "الفروق التي تحسم الأمر فعلاً",
            p: "معظم جداول الميزات ضجيج. وعملياً تحدّد ثلاثة أمور أي أداة تناسبك. الأول اللغة: فكل كاشف تقريباً دُرِّب وتُحقِّق على الإنجليزية، فإن كان أي جزء من عملك بالعربية فذلك يضيّق الميدان بحدّة. والثاني ما تحتاجه بعد النتيجة — فبعض الأدوات تُشير إلى النص فقط، وأخرى تساعدك على تحسينه. والثالث لمن بُني المنتج: فمنصّة امتثال مؤسسية وأداة كاتب تحلّان مشكلتين مختلفتين وليست إحداهما نسخة سيئة من الأخرى.",
          },
          {
            h: "ما لا تستطيعه أي أداة في هذا المجال",
            p: "لا واحدة منها تستطيع إثبات التأليف. فكل كاشف، وكاشفنا منها، يُعيد احتمالاً مشتقاً من مدى قابلية كتابتك للتوقّع، وكلها تُخطئ في حقّ الكاتبين بلغة ثانية أكثر من الناطقين الأصليين. وتعامل مع أي مزوّد يَعِد بكشف مضمون أو تهرّب مضمون أو القدرة على تسمية النموذج الذي كتب نصاً كسبب للبحث في مكان آخر — فهذه ادعاءات لا يستطيع أحد إسنادها.",
          },
              ]
            : [
          {
            h: "How to read a comparison written by one of the parties",
            p: "We built one of the tools on this page, so treat everything here with the scepticism that deserves. What we can offer instead of neutrality is specificity: each comparison states what the other product actually is, names the things it does better than us, and tells you plainly which of the two to pick for a given job. Where we say a competitor wins, we mean it — a page that concedes nothing is advertising, and you should discount it accordingly.",
          },
          {
            h: "The differences that actually decide it",
            p: "Most feature tables are noise. In practice three things determine which tool suits you. First, language: nearly every detector was trained and validated on English, so if any part of your work is Arabic, that narrows the field sharply. Second, what you need after the score — some tools only flag text, others help you improve it. Third, who the product is built for: an institutional compliance platform and a writer's tool solve different problems and neither is a bad version of the other.",
          },
          {
            h: "What no tool in this category can do",
            p: "None of them can prove authorship. Every detector, ours included, returns a probability derived from how predictable your writing is, and all of them misjudge second-language writers more often than native speakers. Treat any vendor promising guaranteed detection, guaranteed evasion, or the ability to name which model wrote something as a reason to look elsewhere — those claims are not supportable by anyone.",
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
        {competitors.map((c, i) => (
          <Reveal key={c.slug} delay={i} as="div">
            <TreeLink
              href={`/vs/${c.slug}`}
              className="glass glow-card tilt group flex h-full flex-col rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold transition-colors group-hover:text-violet-200">
                {c.title[locale]}
              </h2>
              <p className="mt-2 flex-1 text-sm text-white/55">{c.intro[locale]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                {dict.blog.readMore}
                <ArrowRight size={14} className="flip-x" />
              </span>
            </TreeLink>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <TreeLink href="/" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm">
            {dict.compare.tryFree}
          </TreeLink>
        </div>
      </Reveal>
    </div>
  );
}
