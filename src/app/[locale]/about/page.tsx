import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import TreeLink from "@/components/TreeLink";
import { getAuthors } from "@/lib/authors";
import VerifiedBadge from "@/components/VerifiedBadge";
import AuthorLinks from "@/components/AuthorLinks";
import { ShieldCheck, Globe, Heart } from "lucide-react";

// The team section reads live profiles, so this page cannot be baked once at
// build time: it was still showing the name, photo and (missing) social links
// a writer had on the day of the last deploy, while /author/<name> — which does
// revalidate — showed the current ones. Same interval as the author page, so
// the two never disagree for longer than one window.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  return {
    title: dict.nav.about,
    description: dict.ethics.body,
    alternates: alternatesFor(loc, "/about"),
  };
}

const content = {
  en: {
    heading: "About Sahihly",
    lead: "Sahihly is a bilingual writing-quality studio built on a simple belief: great tools should treat Arabic as a first language, not an afterthought.",
    story:
      "We started Sahihly because every serious AI detection and humanizing tool was English-only. Arabic writers — students, creators, professionals — were left with clumsy translations of English rules. Sahihly runs a single engine that reasons natively in both languages, so results feel right whether you write in Cairo, Riyadh, London, or New York.",
    values: [
      { icon: "globe", title: "Bilingual by design", body: "Arabic and English are equal citizens here — same engine, same quality." },
      { icon: "shield", title: "Honest about limits", body: "No detector is perfect. We show scores as guidance, never as accusations." },
      { icon: "heart", title: "Built with care", body: "Crafted from Gaza for the world, with an obsession for quality and fairness." },
    ],
    sectionsTitle: "How we work",
    sections: [
      {
        h: "What we actually build",
        p: "Sahihly is a two-part tool. The detector estimates how machine-like a passage reads and shows you the specific sentences producing that judgement, alongside a style report covering rhythm variance, vocabulary range, and the filler phrases models overuse. The humanizer then loosens that rhythm without touching your terminology, and re-checks the result automatically. Both halves run on the same engine in Arabic and English, and both are free to try without an account.",
      },
      {
        h: "How the engine reaches a score",
        p: "We combine deterministic statistical analysis with a language-model judgement and blend the two, rather than relying on either alone. The statistical half measures things that can be counted — sentence-length variance, lexical diversity, average length, known machine-typical phrasing. The model half reads the passage the way a person would. Where the two disagree sharply, that disagreement is itself information, and it feeds the confidence rating we publish with every result. Long texts are split into chunks, analysed in parallel, and merged.",
      },
      {
        h: "Why we publish a confidence rating",
        p: "Because a bare percentage hides how much the tool actually knows. Under roughly three hundred words there is not enough variation to measure reliably, and a score on a short passage deserves far less weight than the same score on a long one. Most tools present both identically. We would rather tell you when we are guessing, even though it makes the product look less certain than competitors that do not.",
      },
      {
        h: "Where we know we fall short",
        p: "Dialectal Arabic is harder for us than Modern Standard Arabic, because the training material is thinner and conventions vary widely by region. Heavily edited generated text evades detection here as it does everywhere. Very short passages are unreliable. And like every detector, we are more likely to misjudge writing by second-language authors — a bias we work to reduce and cannot claim to have eliminated. We would rather list these than let a confident interface imply precision we do not have.",
      },
      {
        h: "Who is behind this",
        p: "A small independent team, building from Gaza. We are not venture-funded and we answer support email ourselves. That shapes the product: we ship narrow features properly rather than broad ones badly, and we decline the parts of this market — surveillance tooling, guarantees of beating detectors — that we think do more harm than good.",
      },
      {
        h: "How we make money",
        p: "Subscriptions, and advertising on some pages. That is the whole list. We do not sell your data, we do not train models on the text you submit, and we do not take commissions for recommending other tools — including in our comparison pages, where we say plainly where competitors beat us. If that ever changes, it will be stated here before it happens.",
      },
    ],
    policyTitle: "Usage Policy",
    policyBody:
      "Sahihly is a style- and quality-review tool for improving your own writing. It is not designed, sold, or endorsed as a way to defeat academic-integrity systems such as Turnitin, or to misrepresent authorship. Detection scores are probabilistic estimates and must not be used as sole evidence of misconduct. By using Sahihly you agree to follow your institution's and employer's policies, and to use the tool responsibly and honestly. We may refuse service for misuse.",
  },
  ar: {
    heading: "عن صحيحلي",
    lead: "صحيحلي استوديو ثنائي اللغة لجودة الكتابة، مبني على قناعة بسيطة: الأدوات الرائعة يجب أن تعامل العربية كلغة أولى، لا كإضافة لاحقة.",
    story:
      "بدأنا صحيحلي لأن كل أداة جادّة للكشف والتنسين كانت إنجليزية فقط. تُرك الكتّاب العرب — طلاباً وصنّاع محتوى ومحترفين — أمام ترجمات ركيكة لقواعد إنجليزية. يعمل صحيحلي بمحرّك واحد يستدل بالعربية والإنجليزية بأصالة، لتبدو النتائج صحيحة سواء كتبت من القاهرة أو الرياض أو لندن أو نيويورك.",
    values: [
      { icon: "globe", title: "ثنائي اللغة بالتصميم", body: "العربية والإنجليزية متساويتان هنا — نفس المحرّك ونفس الجودة." },
      { icon: "shield", title: "صادقون حول الحدود", body: "لا كاشف مثالي. نعرض النتائج كإرشاد، لا كاتهامات." },
      { icon: "heart", title: "صُنع بعناية", body: "مصنوع من غزة للعالم، بشغفٍ للجودة والإنصاف." },
    ],
    sectionsTitle: "كيف نعمل",
    sections: [
      {
        h: "ما الذي نبنيه فعلاً",
        p: "صحيحلي أداة من شقّين. الكاشف يقدّر كم يبدو المقطع آلياً ويعرض لك الجمل المحدّدة التي أنتجت ذلك الحكم، إلى جانب تقرير أسلوب يغطّي تباين الإيقاع ومدى المفردات وعبارات الحشو التي تُفرط النماذج في استخدامها. ثم يليّن المُنسّن ذلك الإيقاع دون المساس بمصطلحاتك، ويعيد فحص النتيجة تلقائياً. ويعمل الشقّان على المحرّك نفسه بالعربية والإنجليزية، وكلاهما مجاني للتجربة بلا حساب.",
      },
      {
        h: "كيف يصل المحرّك إلى النتيجة",
        p: "نجمع تحليلاً إحصائياً حتمياً مع حكم نموذج لغوي ونمزج الاثنين، بدل الاعتماد على أحدهما وحده. فالشقّ الإحصائي يقيس ما يمكن عدّه — تباين أطوال الجمل والتنوّع المعجمي ومتوسّط الطول والصياغات الآلية المعروفة. والشقّ النموذجي يقرأ المقطع كما يقرؤه إنسان. وحيث يختلف الاثنان بحدّة، فذلك الاختلاف نفسه معلومة، ويغذّي تقييم الثقة الذي ننشره مع كل نتيجة. والنصوص الطويلة تُقسَّم وتُحلَّل بالتوازي ثم تُدمَج.",
      },
      {
        h: "لماذا ننشر تقييماً للثقة",
        p: "لأن النسبة المجرّدة تُخفي كم تعرف الأداة فعلاً. فتحت ثلاثمئة كلمة تقريباً لا يوجد تباين كافٍ للقياس الموثوق، والنتيجة على مقطع قصير تستحقّ وزناً أقل بكثير من النتيجة نفسها على نصّ طويل. ومعظم الأدوات تعرض الحالتين بالشكل ذاته. ونحن نفضّل إخبارك حين نخمّن، وإن جعل ذلك المنتج يبدو أقل يقيناً من منافسين لا يفعلون.",
      },
      {
        h: "أين نعرف أننا نقصّر",
        p: "العربية العامّية أصعب علينا من الفصحى، لأن المادة التدريبية أرقّ والأعراف تتباين بشدة بين المناطق. والنص المولّد المحرَّر بكثافة يفلت من الكشف هنا كما يفلت في كل مكان. والمقاطع القصيرة جداً غير موثوقة. وككل كاشف، احتمال خطئنا أعلى مع كتابة أصحاب اللغة الثانية — انحياز نعمل على تقليله ولا ندّعي أننا أزلناه. ونفضّل سرد هذه على أن توحي واجهة واثقة بدقة لا نملكها.",
      },
      {
        h: "من خلف هذا",
        p: "فريق صغير مستقل، يبني من غزة. لسنا مموَّلين استثمارياً ونردّ على بريد الدعم بأنفسنا. وهذا يشكّل المنتج: نُطلق ميزات ضيّقة بإتقان بدل واسعة برداءة، ونرفض من هذا السوق أجزاءه — أدوات المراقبة وضمانات هزيمة الكواشف — التي نراها تضرّ أكثر مما تنفع.",
      },
      {
        h: "كيف نكسب المال",
        p: "الاشتراكات، وإعلانات على بعض الصفحات. هذه القائمة كاملة. لا نبيع بياناتك، ولا ندرّب نماذج على النص الذي ترسله، ولا نأخذ عمولات مقابل ترشيح أدوات أخرى — بما في ذلك في صفحات المقارنة، حيث نقول بوضوح أين يتفوّق المنافسون علينا. وإن تغيّر ذلك يوماً، فسيُذكر هنا قبل أن يحدث.",
      },
    ],
    policyTitle: "سياسة الاستخدام",
    policyBody:
      "صحيحلي أداة لمراجعة الأسلوب والجودة لتحسين كتابتك أنت. لم تُصمَّم ولا تُباع ولا تُروَّج كوسيلة لتجاوز أنظمة النزاهة الأكاديمية مثل Turnitin، أو للتضليل حول هوية الكاتب. نتائج الكشف تقديرات احتمالية ولا يجوز استخدامها كدليل وحيد على مخالفة. باستخدامك صحيحلي توافق على الالتزام بسياسات مؤسستك وجهة عملك، وعلى استخدام الأداة بمسؤولية وأمانة. قد نرفض الخدمة عند إساءة الاستخدام.",
  },
};

const icons = { globe: Globe, shield: ShieldCheck, heart: Heart };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = content[locale];
  const ar = locale === "ar";
  const team = await getAuthors();

  return (
    <div className="container-x max-w-3xl py-16">
      <Reveal>
        <h1 className="text-4xl font-bold sm:text-5xl">{c.heading}</h1>
        <p className="mt-5 text-lg text-white/70">{c.lead}</p>
        <p className="mt-4 leading-relaxed text-white/55">{c.story}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {c.values.map((v, i) => {
          const Icon = icons[v.icon as keyof typeof icons];
          return (
            <Reveal key={v.title} delay={i} as="div">
              <div className="glass h-full rounded-2xl p-5">
                <Icon className="mb-3 text-violet-300" size={20} />
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{v.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {team.length > 0 && (
        <Reveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold">{ar ? "الفريق" : "The team"}</h2>
            <p className="mt-2 text-sm text-white/50">
              {ar
                ? "الأشخاص الذين يكتبون هنا. لكل واحد صفحة تجمع مقالاته وطريقة للتواصل معه."
                : "The people who write here. Each has a page collecting their articles and a way to reach them."}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {team.map((m) => (
                <div key={m.id} className="glass glow-card rounded-2xl p-5">
                  <TreeLink href={`/author/${m.username}`} className="group flex items-center gap-3">
                    {m.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.avatarUrl}
                        alt={m.fullName}
                        className="h-14 w-14 shrink-0 rounded-full border border-white/15 object-cover"
                      />
                    ) : (
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-400/15 font-display text-lg font-bold text-violet-300">
                        {m.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 font-semibold text-white/90 transition-colors group-hover:text-violet-200">
                        {m.fullName}
                        <VerifiedBadge size={14} label={ar ? "كاتب موثّق" : "Verified writer"} />
                      </p>
                      <p className="truncate text-xs text-violet-200/70">
                        {m.title[locale] || (ar ? "كاتب في صحيحلي" : "Writer at Sahihly")}
                      </p>
                    </div>
                  </TreeLink>
                  {m.bio[locale] && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                      {m.bio[locale]}
                    </p>
                  )}
                  <div className="mt-4">
                    <AuthorLinks author={m} ar={ar} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="mt-16">
          <h2 className="text-2xl font-bold">{c.sectionsTitle}</h2>
          <div className="mt-6 space-y-7">
            {c.sections.map((sec) => (
              <div key={sec.h}>
                <h3 className="font-semibold text-white/90">{sec.h}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{sec.p}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div
          id="policy"
          className="glow-card mt-16 scroll-mt-24 rounded-3xl border border-violet-400/20 bg-violet-400/[0.05] p-8"
        >
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <ShieldCheck className="text-violet-300" /> {c.policyTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{c.policyBody}</p>
        </div>
      </Reveal>
    </div>
  );
}
