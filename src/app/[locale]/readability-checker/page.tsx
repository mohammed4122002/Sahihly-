import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import ReadabilityTool from "@/components/ReadabilityTool";
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
        ? "فاحص سهولة القراءة المجاني — عربي وإنجليزي"
        : "Free Readability Checker — English & Arabic",
    description:
      loc === "ar"
        ? "اعرف مدى سهولة قراءة نصّك فوراً: درجة القراءة، مستوى الجمهور، متوسط طول الجملة، والجمل الطويلة — مجاناً وداخل متصفحك."
        : "See how easy your text is to read instantly: readability score, audience level, average sentence length, and long sentences — free, entirely in your browser.",
    alternates: { canonical: "/readability-checker" },
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Free Readability Checker")}&sub=${encodeURIComponent("Score, audience level & sentence stats — private, in your browser")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const C = {
  en: {
    h1: "Free Readability Checker",
    sub: "Paste your text to see how easily people can read it — with a readability score, the audience level it suits, and the long sentences slowing readers down. Runs entirely in your browser.",
    labels: {
      placeholder: "Paste your text here…",
      clear: "Clear",
      score: "Readability score",
      level: "Level",
      words: "Words",
      sentences: "Sentences",
      avgWords: "Avg words / sentence",
      longSentences: "Long sentences (25+)",
      hint: "Higher is easier. Most web writing should land between 50 and 70. Split your long sentences first — it's the fastest way to raise the score.",
      levels: {
        veryEasy: "Very easy",
        easy: "Easy",
        medium: "Fairly readable",
        hard: "Difficult",
        veryHard: "Very difficult",
      },
      audience: {
        veryEasy: "Suits any reader, including younger audiences",
        easy: "Comfortable for a general online audience",
        medium: "Fine for informed readers and most blogs",
        hard: "Suits specialists; general readers will struggle",
        veryHard: "Academic or technical readers only",
      },
    },
    sections: [
      {
        h: "What the score means",
        p: "The score runs from 0 to 100 and reflects two things: how long your sentences are, and how heavy your words are. Short sentences with familiar words score high; long sentences packed with multi-syllable words score low. Most web writing reads best between 50 and 70.",
      },
      {
        h: "How to raise it fast",
        p: "Start with the long sentences the tool counts for you — splitting one 35-word sentence into two usually moves the score more than any word swap. Then replace heavy words with plain ones, and cut filler transitions entirely.",
      },
      {
        h: "Readability and AI-sounding text",
        p: "AI-generated writing often scores in a narrow middle band, because it produces uniformly medium-length sentences. Human writing varies. If your readability is fine but your text still feels robotic, run it through the AI detector — the style report shows rhythm variety, which readability alone doesn't capture.",
      },
      {
        h: "Where readability formulas come from — and what they miss",
        p: "Scores of this kind descend from mid-century formulas built to grade school textbooks, and they measure exactly two proxies: sentence length and word weight. That is all. They cannot see whether your argument is coherent, whether the paragraph order makes sense, or whether a technical term was the right choice. A page of well-formed nonsense can score beautifully. Use the number to catch sentences that have run away from you, not as a verdict on whether the writing is good.",
      },
      {
        h: "Why a low score is sometimes correct",
        p: "Academic papers, legal writing, and technical documentation legitimately score low, because precision requires the long qualified sentences and specialist vocabulary the formula penalises. Optimising a methods section up to 70 would mean stripping out the qualifications that make it accurate. Match the target to the audience: general web writing between 50 and 70, instructions and health information higher, scholarly work lower and unapologetically so.",
      },
      {
        h: "Readability in Arabic works differently",
        p: "The classic formulas count English syllables, which does not transfer. Arabic packs meaning into root-and-pattern morphology, so a single word can carry what English needs three or four to say, and syllable counting on an unvowelled text is guesswork. We estimate word weight from Arabic letter structure instead and detect sentences using Arabic punctuation. The result is a usable relative signal — good for comparing two drafts of your own — rather than a grade-level equivalent imported from English.",
      },
    ],
    faq: [
      { q: "Is a higher score always better?", a: "No. Above roughly 80 the writing often reads as clipped and simplistic for an adult audience, and specialist subjects legitimately sit lower. Aim for the band your readers expect rather than the highest number you can reach." },
      { q: "Does readability affect search rankings?", a: "Not as a direct ranking factor. It affects whether people stay and finish reading, which does matter. Write for comprehension, not for the meter." },
      { q: "Why did my score drop after I added a heading?", a: "Short fragments like headings are counted as sentences by most formulas, which shifts the averages. Judge the score on the body text, and re-check after any structural change." },
      { q: "Does the readability checker work in Arabic?", a: "Yes. Sentence detection understands Arabic punctuation and word weight is estimated from Arabic vowel letters, so Arabic text gets a meaningful score rather than a broken one." },
      { q: "Is my text uploaded anywhere?", a: "No. The entire calculation runs in your browser with JavaScript — nothing is sent to a server." },
      { q: "What score should I aim for?", a: "For blogs, marketing, and general web writing, aim for 50–70. Academic writing naturally scores lower and that's appropriate for its audience." },
    ],
    ctaTitle: "Want more than readability?",
    ctaBody: "Check whether your text reads as AI-written, then rewrite it into a natural human voice.",
  },
  ar: {
    h1: "فاحص سهولة القراءة المجاني",
    sub: "الصق نصّك لترى مدى سهولة قراءته — بدرجة قراءة، ومستوى الجمهور المناسب، والجمل الطويلة التي تُبطئ القارئ. يعمل بالكامل داخل متصفحك.",
    labels: {
      placeholder: "الصق نصّك هنا…",
      clear: "مسح",
      score: "درجة سهولة القراءة",
      level: "المستوى",
      words: "كلمة",
      sentences: "جملة",
      avgWords: "متوسط الكلمات/جملة",
      longSentences: "جمل طويلة (٢٥+)",
      hint: "كلما ارتفعت كان النص أسهل. معظم الكتابة على الويب يفضّل أن تقع بين ٥٠ و٧٠. ابدأ بتقسيم جملك الطويلة — أسرع طريقة لرفع الدرجة.",
      levels: {
        veryEasy: "سهل جداً",
        easy: "سهل",
        medium: "مقبول القراءة",
        hard: "صعب",
        veryHard: "صعب جداً",
      },
      audience: {
        veryEasy: "يناسب أي قارئ، بما فيهم الفئات الأصغر سناً",
        easy: "مريح لجمهور الإنترنت العام",
        medium: "مناسب للقارئ المطّلع ومعظم المدوّنات",
        hard: "يناسب المتخصصين؛ القارئ العام سيجد صعوبة",
        veryHard: "للقارئ الأكاديمي أو التقني فقط",
      },
    },
    sections: [
      {
        h: "ماذا تعني الدرجة",
        p: "تتراوح الدرجة من ٠ إلى ١٠٠ وتعكس أمرين: طول جملك، وثقل كلماتك. الجمل القصيرة بكلمات مألوفة ترفع الدرجة، والجمل الطويلة المحمّلة بكلمات متعددة المقاطع تخفضها. ومعظم الكتابة على الويب تُقرأ أفضل بين ٥٠ و٧٠.",
      },
      {
        h: "كيف ترفعها بسرعة",
        p: "ابدأ بالجمل الطويلة التي تعدّها لك الأداة — تقسيم جملة من ٣٥ كلمة إلى جملتين يحرّك الدرجة أكثر من أي استبدال للكلمات. ثم استبدل الكلمات الثقيلة ببسيطة، واحذف روابط الحشو تماماً.",
      },
      {
        h: "سهولة القراءة والنص الآلي",
        p: "غالباً ما تقع الكتابة الآلية في نطاق أوسط ضيّق، لأنها تنتج جملاً متوسطة الطول بانتظام، بينما الكتابة البشرية تتنوّع. إن كانت سهولة قراءتك جيدة لكن النص ما زال يبدو روبوتياً، مرّره عبر كاشف الذكاء الاصطناعي — فتقرير الأسلوب يُظهر تنوّع الإيقاع الذي لا تلتقطه سهولة القراءة وحدها.",
      },
      {
        h: "من أين جاءت معادلات القراءة — وما الذي تُغفله",
        p: "تنحدر نتائج من هذا النوع من معادلات منتصف القرن الماضي التي بُنيت لتصنيف كتب المدارس، وهي تقيس مؤشّرين اثنين فقط: طول الجملة وثقل الكلمة. هذا كل شيء. فهي لا ترى ما إذا كانت حجّتك متماسكة، ولا إن كان ترتيب الفقرات منطقياً، ولا إن كان المصطلح التقني اختياراً صائباً. وصفحة من الهراء حسن الصياغة قد تحصل على نتيجة ممتازة. استخدم الرقم لالتقاط الجمل التي أفلتت منك، لا حُكماً على جودة الكتابة.",
      },
      {
        h: "لماذا تكون النتيجة المنخفضة صحيحة أحياناً",
        p: "الأوراق الأكاديمية والكتابة القانونية والتوثيق التقني تحصل على نتائج منخفضة بحقّ، لأن الدقة تستلزم الجمل الطويلة المقيّدة والمفردات المتخصّصة التي تعاقبها المعادلة. ورفع قسم المنهجية إلى ٧٠ يعني نزع القيود التي تجعله دقيقاً. طابق الهدف مع الجمهور: الكتابة العامة على الويب بين ٥٠ و٧٠، والتعليمات والمعلومات الصحية أعلى، والعمل الأكاديمي أدنى وبلا اعتذار.",
      },
      {
        h: "سهولة القراءة بالعربية تعمل بشكل مختلف",
        p: "المعادلات الكلاسيكية تعدّ المقاطع الإنجليزية، وهذا لا ينتقل. فالعربية تحزم المعنى في صرف الجذر والوزن، فقد تحمل كلمة واحدة ما تحتاج الإنجليزية ثلاثاً أو أربعاً لقوله، وعدّ المقاطع في نص غير مشكول تخمين. ونحن نقدّر ثقل الكلمة من بنية الحروف العربية بدلاً من ذلك، ونكشف الجمل بالترقيم العربي. والنتيجة إشارة نسبية صالحة للاستخدام — جيدة لمقارنة مسودّتين لك — لا مكافئ لمستوى دراسي مستورد من الإنجليزية.",
      },
    ],
    faq: [
      { q: "هل النتيجة الأعلى أفضل دائماً؟", a: "لا. فوق ٨٠ تقريباً تُقرأ الكتابة غالباً مبتورة ومبسّطة لجمهور بالغ، والمواضيع المتخصّصة تقع أدنى بحقّ. استهدف النطاق الذي يتوقّعه قرّاؤك لا أعلى رقم تبلغه." },
      { q: "هل تؤثّر سهولة القراءة في ترتيب البحث؟", a: "ليست عامل ترتيب مباشراً. لكنها تؤثّر في بقاء الناس وإكمالهم القراءة، وهذا يهمّ فعلاً. اكتب للفهم لا للمؤشّر." },
      { q: "لماذا انخفضت نتيجتي بعد إضافة عنوان؟", a: "الشذرات القصيرة كالعناوين تُحسب جملاً في معظم المعادلات، فتُزيح المتوسّطات. احكم على النتيجة من متن النص، وأعد الفحص بعد أي تغيير هيكلي." },
      { q: "هل يعمل فاحص سهولة القراءة بالعربية؟", a: "نعم. كاشف الجمل يفهم علامات الترقيم العربية، ويُقدَّر ثقل الكلمة من حروف العلة العربية، فيحصل النص العربي على درجة ذات معنى لا درجة مكسورة." },
      { q: "هل يُرفع نصّي إلى أي مكان؟", a: "لا. كل الحساب يجري داخل متصفحك بجافاسكربت — ولا شيء يُرسل لأي خادم." },
      { q: "ما الدرجة التي أستهدفها؟", a: "للمدوّنات والتسويق والكتابة العامة على الويب استهدف ٥٠–٧٠. الكتابة الأكاديمية تسجّل أقل بطبيعتها وهذا مناسب لجمهورها." },
    ],
    ctaTitle: "تريد أكثر من سهولة القراءة؟",
    ctaBody: "افحص إن كان نصّك يبدو مكتوباً بالذكاء الاصطناعي، ثم أعد صياغته بصوت بشري طبيعي.",
  },
};

export default async function ReadabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const c = C[locale];
  const ar = locale === "ar";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: c.h1,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: `${SITE_URL}/readability-checker`,
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
        { "@type": "ListItem", position: 1, name: "Sahihly", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: c.h1, item: `${SITE_URL}/readability-checker` },
      ],
    },
  ];

  return (
    <div className="py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x">
        <Reveal>
          <h1 className="text-center text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">{c.h1}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">{c.sub}</p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mx-auto mt-10 max-w-4xl">
            <ReadabilityTool labels={c.labels} />
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-16 max-w-3xl">
        <div className="grid gap-4">
          {c.sections.map((s, i) => (
            <Reveal key={s.h} delay={i} as="div">
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold">{s.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] p-7 text-center">
            <h2 className="text-lg font-semibold">{c.ctaTitle}</h2>
            <p className="mt-2 text-sm text-white/60">{c.ctaBody}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/ai-detector" className="btn-primary rounded-full px-5 py-2.5 text-sm">
                {ar ? "جرّب الكاشف" : "Try the AI Detector"}
              </Link>
              <Link href="/word-counter" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
                {ar ? "عدّاد الكلمات" : "Word Counter"}
              </Link>
            </div>
          </div>
        </Reveal>

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
