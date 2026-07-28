import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import WordCounterTool from "@/components/WordCounterTool";
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
        ? "عدّاد الكلمات المجاني — كلمات، أحرف، جمل، وقت القراءة"
        : "Free Word Counter — Words, Characters, Sentences & Reading Time",
    description:
      loc === "ar"
        ? "عدّاد كلمات فوري يعمل بالعربية والإنجليزية: كلمات، أحرف مع/بدون مسافات، جمل، فقرات، وقت القراءة والإلقاء — مجاناً وبلا تسجيل، ويعمل مباشرة في متصفحك."
        : "Instant word counter for English and Arabic: words, characters with/without spaces, sentences, paragraphs, reading and speaking time — free, no signup, runs entirely in your browser.",
    alternates: alternatesFor(loc, "/word-counter"),
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Free Word Counter")}&sub=${encodeURIComponent("Words, characters, sentences & reading time — private, in your browser")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "Free Word Counter",
    sub: "Count words, characters, sentences, and paragraphs instantly — with reading and speaking time. Works for English and Arabic, entirely in your browser: your text never leaves your device.",
    labels: {
      placeholder: "Type or paste your text here…",
      words: "Words",
      chars: "Characters",
      charsNoSpaces: "Characters (no spaces)",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      readingTime: "Reading time",
      speakingTime: "Speaking time",
      minutes: "min",
      clear: "Clear",
    },
    sections: [
      {
        h: "Why word counts matter more than writers expect",
        p: "Almost every place your writing lands has a limit attached. Academic assignments are marked against one, journals desk-reject over one, job applications cap personal statements, and meta descriptions get truncated at a character count rather than a word count. Counting after the fact is the wrong habit — knowing the target before you draft changes what you choose to include, and it is far easier to write to 800 words than to cut 1,400 down to 800 without losing the argument.",
      },
      {
        h: "How reading and speaking time are estimated",
        p: "We use 200 words per minute for silent reading and 130 for reading aloud. Those are conventional averages and they are genuinely rough: comprehension speed varies with subject difficulty, reader familiarity, and language. Treat the reading estimate as a planning aid for blog length or study time, and the speaking estimate as a rehearsal starting point for a talk — then time yourself once, because your real pace is the only one that matters.",
      },
      {
        h: "Counting Arabic correctly",
        p: "Arabic raises problems most counters ignore. Words are separated by whitespace as in English, but sentence boundaries use different punctuation — the Arabic question mark and full stop are distinct characters — and a counter that only looks for Latin punctuation will merge whole paragraphs into one sentence. Arabic is also more compact than English: the same idea usually takes noticeably fewer words, which matters when you are translating to a fixed limit.",
      },
      {
        h: "Your text never leaves this page",
        p: "The counting runs entirely in your browser. Nothing is uploaded, stored, or logged, which means you can safely paste a confidential draft, an unpublished manuscript, or a client document without it touching a server. That is a deliberate design choice rather than a policy promise — there is no upload step to trust.",
      },
    ],
    faq: [
      { q: "Is the word counter private?", a: "Completely. Counting happens in your browser with JavaScript — the text is never uploaded to any server." },
      { q: "How is reading time calculated?", a: "We use the common average of 200 words per minute for silent reading and 130 for speaking aloud. Real speeds vary by reader and content." },
      { q: "Does it count Arabic correctly?", a: "Yes — words are split on whitespace and sentence detection understands Arabic punctuation (؟ ۔), so Arabic text counts accurately." },
      { q: "What counts as a word?", a: "Any run of characters separated by whitespace. That matches how most editors, journals, and assignment briefs count, though be aware that hyphenated compounds count as one and numbers count as words." },
      { q: "How many words should a blog post be?", a: "There is no universal number, and word count is not a ranking factor. Write the length the question needs — a precise 600-word answer outperforms a padded 2,000-word one, and padding is the most common way good pages get worse." },
      { q: "Why does my word processor show a different count?", a: "Different tools treat footnotes, captions, headings, and hyphenated words differently. If you are writing to a hard limit, always confirm with the counter the assessor will actually use." },
    ],
    ctaTitle: "Need more than a count?",
    ctaBody: "Check whether your text reads as AI-written, or rewrite it into a natural human voice.",
    ctaDetector: "Try the AI Detector",
    ctaHumanizer: "Try the Humanizer",
  },
  ar: {
    h1: "عدّاد الكلمات المجاني",
    sub: "عدّ الكلمات والأحرف والجمل والفقرات فوراً — مع وقت القراءة والإلقاء. يعمل بالعربية والإنجليزية بالكامل داخل متصفحك: نصّك لا يغادر جهازك أبداً.",
    labels: {
      placeholder: "اكتب أو الصق نصّك هنا…",
      words: "كلمة",
      chars: "حرف",
      charsNoSpaces: "حرف (بلا مسافات)",
      sentences: "جملة",
      paragraphs: "فقرة",
      readingTime: "وقت القراءة",
      speakingTime: "وقت الإلقاء",
      minutes: "د",
      clear: "مسح",
    },
    sections: [
      {
        h: "لماذا يهمّ عدد الكلمات أكثر مما يتوقّع الكاتب",
        p: "كل مكان تصل إليه كتابتك تقريباً مرتبط بحدّ. فالواجبات الأكاديمية تُقيَّم مقابل حدّ، والمجلات ترفض مباشرةً بسببه، وطلبات التوظيف تحدّ الرسائل الشخصية، وأوصاف الميتا تُقتطع عند عدد أحرف لا كلمات. والعدّ بعد الكتابة عادة خاطئة — فمعرفة الهدف قبل الصياغة تغيّر ما تختار إدراجه، والكتابة إلى ٨٠٠ كلمة أسهل بكثير من تقليص ١٤٠٠ إلى ٨٠٠ دون خسارة الحجّة.",
      },
      {
        h: "كيف يُقدَّر زمن القراءة والإلقاء",
        p: "نستخدم ٢٠٠ كلمة في الدقيقة للقراءة الصامتة و١٣٠ للقراءة بصوت عالٍ. وهذه متوسّطات متعارف عليها وتقريبية فعلاً: فسرعة الاستيعاب تتفاوت بصعوبة الموضوع وألفة القارئ واللغة. اعتبر تقدير القراءة معيناً لتخطيط طول المقال أو زمن المذاكرة، وتقدير الإلقاء نقطة بداية للتمرين على كلمة — ثم قِس وقتك مرة واحدة، فسرعتك الحقيقية هي الوحيدة التي تهمّ.",
      },
      {
        h: "عدّ العربية بشكل صحيح",
        p: "تطرح العربية مشكلات تتجاهلها معظم العدّادات. فالكلمات تفصلها المسافات كالإنجليزية، لكن حدود الجمل تستخدم ترقيماً مختلفاً — فعلامة الاستفهام والنقطة العربيتان محرفان مستقلان — والعدّاد الذي يبحث عن الترقيم اللاتيني فقط سيدمج فقرات كاملة في جملة واحدة. والعربية أيضاً أكثر إيجازاً من الإنجليزية: فالفكرة نفسها تأخذ كلمات أقل بوضوح، وهذا يهمّ حين تترجم إلى حدّ ثابت.",
      },
      {
        h: "نصّك لا يغادر هذه الصفحة",
        p: "العدّ يجري بالكامل في متصفّحك. لا شيء يُرفَع أو يُحفَظ أو يُسجَّل، ما يعني أنك تستطيع بأمان لصق مسودّة سرّية أو مخطوطة غير منشورة أو مستند عميل دون أن يلمس خادماً. وهذا خيار تصميم مقصود لا وعد سياسة — إذ لا توجد خطوة رفع تحتاج للثقة بها.",
      },
    ],
    faq: [
      { q: "هل العدّاد خاص وآمن؟", a: "تماماً. يجري العدّ داخل متصفحك بجافاسكربت — النص لا يُرفع لأي خادم إطلاقاً." },
      { q: "كيف يُحسب وقت القراءة؟", a: "نستخدم المتوسط الشائع: ٢٠٠ كلمة بالدقيقة للقراءة الصامتة و١٣٠ للإلقاء. السرعات الفعلية تختلف حسب القارئ والمحتوى." },
      { q: "هل يعدّ العربية بشكل صحيح؟", a: "نعم — تُفصل الكلمات على المسافات ويفهم كاشف الجمل علامات الترقيم العربية (؟ ۔)، فيَعُدّ النص العربي بدقة." },
      { q: "ما الذي يُحسب كلمةً؟", a: "أي تتابع من المحارف تفصله مسافة. وهذا يوافق طريقة العدّ في معظم المحرّرات والمجلات وتوصيفات الواجبات، مع الانتباه إلى أن المركّبات الموصولة بشَرطة تُحسب واحدة وأن الأرقام تُحسب كلمات." },
      { q: "كم كلمة ينبغي أن يكون المقال؟", a: "لا رقم عالمي، وعدد الكلمات ليس عامل ترتيب. اكتب الطول الذي يحتاجه السؤال — فإجابة دقيقة في ٦٠٠ كلمة تتفوّق على أخرى محشوّة في ٢٠٠٠، والحشو أشيع طريقة تسوء بها الصفحات الجيدة." },
      { q: "لماذا يعرض معالج النصوص عدداً مختلفاً؟", a: "الأدوات تتعامل مع الحواشي والتعليقات والعناوين والكلمات الموصولة بطرق مختلفة. فإن كنت تكتب لحدّ صارم، فتأكّد دائماً بالعدّاد الذي سيستخدمه المُقيّم فعلاً." },
    ],
    ctaTitle: "تحتاج أكثر من مجرد عدّ؟",
    ctaBody: "افحص إن كان نصّك يبدو مكتوباً بالذكاء الاصطناعي، أو أعد صياغته بصوت بشري طبيعي.",
    ctaDetector: "جرّب كاشف الذكاء الاصطناعي",
    ctaHumanizer: "جرّب المُنسّن",
  },
};

export default async function WordCounterPage({
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
      "@type": "WebApplication",
      name: c.h1,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: pageUrl(locale, "/word-counter"),
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
        { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl(locale, "/word-counter") },
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
          <div className="mx-auto mt-10 max-w-4xl">
            <WordCounterTool labels={c.labels} />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-16 max-w-3xl">
        <Reveal>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-8 text-center">
            <h2 className="text-xl font-semibold">{c.ctaTitle}</h2>
            <p className="mt-2 text-sm text-white/60">{c.ctaBody}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <TreeLink href="/ai-detector" className="btn-primary rounded-full px-5 py-2.5 text-sm">
                {c.ctaDetector}
              </TreeLink>
              <TreeLink href="/ai-humanizer" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
                {c.ctaHumanizer}
              </TreeLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 space-y-8">
          {c.sections.map((sec) => (
            <section key={sec.h}>
              <h2 className="text-xl font-bold">{sec.h}</h2>
              <p className="mt-3 leading-relaxed text-white/70">{sec.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-center text-2xl font-bold">{dict.faq.title}</h2>
          <div className="mt-6">
            <FAQ items={c.faq} />
          </div>
        </div>
      </div>
    </div>
  );
}
