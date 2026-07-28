import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { Sparkles, Repeat, FileCheck2, HeartHandshake, Gauge, ShieldAlert, Users } from "lucide-react";
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
        ? "مُنسّن النصوص المجاني — حوّل نص الذكاء الاصطناعي لكتابة طبيعية"
        : "Free AI Humanizer — Turn AI Text Into Natural Writing",
    description:
      loc === "ar"
        ? "أعد صياغة النص الآلي بأسلوب بشري طبيعي دون تغيير المعنى، مع مقارنة قبل/بعد. يدعم العربية الفصحى بأصالة والإنجليزية بجودة كاملة — مجاناً وبلا تسجيل."
        : "Rewrite robotic AI text into a natural human voice without changing the meaning, with a before/after comparison. Native Arabic and full-quality English — free, no signup.",
    alternates: alternatesFor(loc, "/ai-humanizer"),
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
      {
        icon: Gauge,
        h: "Rhythm is what gives machine text away — not vocabulary",
        p: "The instinct when a draft reads robotic is to swap words for fancier synonyms. That is the wrong lever, and it is why paraphrasing tools so often make things worse. What marks text as machine-written is structural: sentences clustering around one length, paragraphs opening with the same construction, and connective filler like \"furthermore\" and \"it is important to note that\" doing work no human writer asks of it. Our humanizer targets that structure and deliberately leaves your terminology alone, because a synonym swap in a technical sentence changes what you said.",
      },
      {
        icon: ShieldAlert,
        h: "What we will not help you do",
        p: "We do not market this as a way to defeat an academic integrity check, and we would rather lose the sale than pretend otherwise. Deliberately disguising AI authorship to pass a check is misconduct at most institutions regardless of which tool produced the text. If your institution permits assisted work, disclose it; if it does not, do not submit it. The legitimate use of a humanizer is making your own writing read the way you actually sound.",
      },
      {
        icon: Users,
        h: "Who this is genuinely built for",
        p: "Writers who drafted with a model and want the delivery to sound like them. Non-native speakers whose grammar is fine but whose rhythm is flat. Teams publishing content who need it to read like a person wrote it rather than like the average of everything already published on the topic. In every one of those cases the substance is already yours — what is missing is cadence, and that is a fixable, purely stylistic problem.",
      },
    ],
    faq: [
      { q: "Will humanizing change what my text means?", a: "It is tuned not to. We alter sentence rhythm and connective phrasing rather than substituting vocabulary, and the result is re-checked automatically after rewriting. Still read technical terms, figures, and dates afterwards — that is where meaning drift shows up first in any rewriting tool." },
      { q: "Can I use this for academic work?", a: "Only where your institution permits assisted writing, and disclose it when it does. Using a humanizer to disguise AI authorship from an integrity check is misconduct almost everywhere. Using it to improve the rhythm of writing you are permitted to produce is not." },
      { q: "Does it work as well in Arabic as in English?", a: "Arabic runs on Arabic-tuned rewriting rather than a translated English pipeline, because Arabic rhythm and connective conventions differ substantially. Try a paragraph on the free tier and judge the output yourself before paying anything." },
      { q: "Why does my rewritten text still score as AI?", a: "Usually because the underlying structure is still uniform, or because the passage is too short for either the humanizer or the detector to work with reliably. It can also mean the reasoning itself is generic — no rewriting tool makes vague thinking specific." },
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
      {
        icon: Gauge,
        h: "الإيقاع هو ما يفضح النص الآلي — لا المفردات",
        p: "الغريزة حين تبدو المسودّة آليةً أن تستبدل الكلمات بمرادفات أفخم. وهذه الرافعة الخاطئة، ولهذا كثيراً ما تزيد أدوات إعادة الصياغة الأمر سوءاً. فما يَسِم النص كآلي بنيوي: جمل تتكتّل حول طول واحد، وفقرات تبدأ بالتركيب نفسه، وحشو رابط مثل «علاوة على ذلك» و«من المهم الإشارة إلى أن» يؤدي عملاً لا يطلبه كاتب بشري. ومُنسّننا يستهدف تلك البنية ويترك مصطلحاتك عمداً، لأن استبدال مرادف في جملة تقنية يغيّر ما قلته.",
      },
      {
        icon: ShieldAlert,
        h: "ما لن نساعدك عليه",
        p: "لا نسوّق هذا كوسيلة لهزيمة فحص النزاهة الأكاديمية، ونفضّل خسارة البيع على ادعاء غير ذلك. فتمويه تأليف الذكاء الاصطناعي عمداً لتجاوز فحص مخالفةٌ في معظم المؤسسات أياً كانت الأداة التي أنتجت النص. إن سمحت مؤسستك بالاستعانة فأفصح عنها، وإن لم تسمح فلا تُسلّمه. والاستخدام المشروع للمُنسّن أن تجعل كتابتك أنت تُقرأ بالطريقة التي تتحدّث بها فعلاً.",
      },
      {
        icon: Users,
        h: "لمن بُني هذا فعلاً",
        p: "كاتبون صاغوا بمساعدة نموذج ويريدون أن يبدو العرض بصوتهم. وغير الناطقين بالأصل ممن نحوهم سليم لكن إيقاعهم مسطّح. وفرق تنشر محتوى وتحتاجه أن يُقرأ كأن إنساناً كتبه لا كأنه متوسّط كل ما نُشر في الموضوع. وفي كل حالة من هذه يكون المضمون لك أصلاً — والناقص هو الجَرْس، وهي مشكلة أسلوبية بحتة قابلة للإصلاح.",
      },
    ],
    faq: [
      { q: "هل يغيّر التنسين معنى نصّي؟", a: "مضبوط على ألا يفعل. نغيّر إيقاع الجمل وصياغة الروابط بدل استبدال المفردات، وتُفحص النتيجة تلقائياً بعد إعادة الصياغة. ومع ذلك راجع المصطلحات التقنية والأرقام والتواريخ بعدها — فهناك يظهر انزياح المعنى أولاً في أي أداة إعادة كتابة." },
      { q: "هل أستخدمه في العمل الأكاديمي؟", a: "فقط حيث تسمح مؤسستك بالكتابة المدعومة، وأفصح عنها حين تسمح. فاستخدام مُنسّن لتمويه تأليف الذكاء الاصطناعي أمام فحص نزاهة مخالفةٌ في كل مكان تقريباً. أما استخدامه لتحسين إيقاع كتابة يُسمح لك بإنتاجها فليس كذلك." },
      { q: "هل يعمل بالعربية بجودة الإنجليزية؟", a: "العربية تعمل على إعادة صياغة مضبوطة للعربية لا على خط إنجليزي مترجَم، لأن الإيقاع العربي وأعراف الربط تختلف جوهرياً. جرّب فقرة على الخطة المجانية واحكم على المخرجات بنفسك قبل أن تدفع شيئاً." },
      { q: "لماذا ما زال نصّي المُعاد صياغته يُصنَّف كآلي؟", a: "غالباً لأن البنية ما زالت منتظمة، أو لأن المقطع أقصر من أن يعمل عليه المُنسّن أو الكاشف بموثوقية. وقد يعني أيضاً أن التفكير نفسه عام — فلا أداة إعادة كتابة تجعل الفكرة الغامضة محدّدة." },
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl(locale, "/ai-humanizer") },
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
            <TreeLink href="/ai-detector" className="font-medium text-violet-300 hover:text-violet-200">
              {c.ctaDetector}
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
