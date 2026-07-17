import type { Locale } from "@/lib/i18n/config";

export type BlogPost = {
  slug: string;
  date: string;
  readingTime: number;
  category: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>; // simple HTML
};

export const posts: BlogPost[] = [
  {
    slug: "how-ai-detectors-work",
    date: "2026-06-02",
    readingTime: 7,
    category: "Guides",
    title: {
      en: "How AI Detectors Actually Work (and Their Limits)",
      ar: "كيف تعمل كواشف الذكاء الاصطناعي فعلاً (وحدودها)",
    },
    excerpt: {
      en: "A plain-English tour of perplexity, burstiness, and why no detector is ever 100% sure.",
      ar: "جولة مبسّطة حول الحيرة والتباين، ولماذا لا يوجد كاشف متأكد ١٠٠٪ أبداً.",
    },
    body: {
      en: `<h2>The core idea</h2><p>AI detectors estimate how "predictable" a passage is to a language model. Two signals dominate: <strong>perplexity</strong> (how surprised a model is by each next word) and <strong>burstiness</strong> (how much sentence length and complexity vary).</p><h2>Why humans look different</h2><p>Human writing tends to be bursty — a short punchy line, then a long winding one. Machine text is often smooth and uniform. Detectors lean on this.</p><h2>The honest limitation</h2><p>These are probabilities, not proof. Edited AI text, or naturally uniform human writing, can flip the result. That's why Sahihly frames scores as guidance for improving style — never as evidence for accusations.</p><h2>Using scores well</h2><ul><li>Treat a high score as "worth a second look," not a verdict.</li><li>Read the highlighted sentences — they show <em>why</em>.</li><li>Combine detection with your own judgment.</li></ul>`,
      ar: `<h2>الفكرة الأساسية</h2><p>تقدّر الكواشف مدى «قابلية توقّع» النص من نموذج لغوي. تسيطر إشارتان: <strong>الحيرة</strong> (مدى مفاجأة النموذج بكل كلمة تالية) و<strong>التباين</strong> (مدى تنوّع طول الجمل وتعقيدها).</p><h2>لماذا يبدو البشر مختلفين</h2><p>تميل الكتابة البشرية للتباين — جملة قصيرة حادّة ثم أخرى طويلة متعرّجة. أما نص الآلة فغالباً سلس ومنتظم، والكواشف تعتمد على ذلك.</p><h2>الحد الصادق</h2><p>هذه احتمالات لا أدلّة. النص المُحرَّر أو الكتابة البشرية المنتظمة قد تقلب النتيجة. لذلك يعرض صحيحلي النتائج كإرشاد لتحسين الأسلوب — لا كدليل للاتهام.</p><h2>الاستخدام الجيّد للنتائج</h2><ul><li>اعتبر النتيجة العالية «تستحق نظرة ثانية» لا حُكماً.</li><li>اقرأ الجمل المميّزة — تُظهر <em>السبب</em>.</li><li>ادمج الكشف مع حكمك الشخصي.</li></ul>`,
    },
  },
  {
    slug: "humanize-without-changing-meaning",
    date: "2026-06-14",
    readingTime: 6,
    category: "Writing",
    title: {
      en: "Humanizing AI Text Without Losing Your Meaning",
      ar: "تنسين نص الذكاء الاصطناعي دون فقدان معناك",
    },
    excerpt: {
      en: "Practical edits that make robotic drafts sound like you — while keeping every fact intact.",
      ar: "تعديلات عملية تجعل المسودّات الآلية تبدو بصوتك — مع الحفاظ على كل معلومة.",
    },
    body: {
      en: `<h2>Vary your rhythm</h2><p>The fastest fix is sentence-length variety. Break one long sentence into two; merge two short ones. Your text instantly feels more human.</p><h2>Kill the filler transitions</h2><p>"Furthermore," "Moreover," and "In conclusion" are AI tells. Replace them with natural connectors — or just start the sentence.</p><h2>Keep the facts</h2><p>Humanizing is a style pass, not a rewrite of substance. Sahihly's humanizer is tuned to preserve meaning while loosening the rhythm.</p>`,
      ar: `<h2>نوّع إيقاعك</h2><p>أسرع إصلاح هو تنويع طول الجمل. قسّم جملة طويلة إلى جملتين، وادمج قصيرتين. سيبدو نصّك أكثر بشرية فوراً.</p><h2>تخلّص من روابط الحشو</h2><p>«علاوة على ذلك» و«بالإضافة إلى ذلك» و«في الختام» علامات آلية. استبدلها بروابط طبيعية — أو ابدأ الجملة مباشرة.</p><h2>احتفظ بالحقائق</h2><p>التنسين تمريرة أسلوبية لا إعادة كتابة للمضمون. مُنسّن صحيحلي مضبوط ليحفظ المعنى مع تليين الإيقاع.</p>`,
    },
  },
  {
    slug: "arabic-ai-detection-challenge",
    date: "2026-06-28",
    readingTime: 8,
    category: "Arabic",
    title: {
      en: "Why Arabic AI Detection Is Hard — and How We Approach It",
      ar: "لماذا كشف الذكاء الاصطناعي بالعربية صعب — وكيف نتعامل معه",
    },
    excerpt: {
      en: "Morphology, diacritics, and dialects break English-only tools. Here's the Arabic-first approach.",
      ar: "الصرف والتشكيل واللهجات تكسر الأدوات الإنجليزية. إليك المنهج العربي أولاً.",
    },
    body: {
      en: `<h2>Arabic is not English with different letters</h2><p>Rich morphology means one root spawns dozens of forms. Optional diacritics change meaning. Most detectors trained on English simply don't model this.</p><h2>Our approach</h2><p>Sahihly reasons about Arabic structure directly — register, morphology, and natural phrasing — rather than translating English heuristics. That's the difference you feel in the results.</p>`,
      ar: `<h2>العربية ليست إنجليزية بحروف مختلفة</h2><p>الصرف الغني يعني أن جذراً واحداً يولّد عشرات الصيغ، والتشكيل الاختياري يغيّر المعنى. معظم الكواشف المدرّبة على الإنجليزية لا تنمذج هذا.</p><h2>منهجنا</h2><p>يستدل صحيحلي على بنية العربية مباشرة — المستوى اللغوي والصرف والصياغة الطبيعية — بدل ترجمة استدلالات إنجليزية. هذا هو الفرق الذي تلمسه في النتائج.</p>`,
    },
  },
];

posts.push(
  {
    slug: "what-ai-detector-accuracy-means",
    date: "2026-07-05",
    readingTime: 9,
    category: "Guides",
    title: {
      en: "What \"99% Accurate\" Really Means in AI Detectors",
      ar: "ماذا تعني «دقة ٩٩٪» فعلاً في كواشف الذكاء الاصطناعي",
    },
    excerpt: {
      en: "Accuracy claims hide two very different error types. Understanding them will change how you read every score.",
      ar: "ادعاءات الدقة تخفي نوعين مختلفين من الأخطاء. فهمهما سيغيّر طريقة قراءتك لكل نتيجة.",
    },
    body: {
      en: `<h2>Two errors, one number</h2><p>A detector can fail in two ways: flagging human writing as AI (<strong>false positive</strong>) or missing AI text entirely (<strong>false negative</strong>). A single "accuracy" number blends both — and the blend depends entirely on what texts were tested.</p><h2>Why false positives matter most</h2><p>For students and professionals, a false positive is the costly error: your own honest writing gets flagged. Non-native phrasing, formal registers, and heavily edited text all raise false-positive risk. This is exactly why scores should inform revision, never verdicts.</p><h2>Questions to ask any detector</h2><ul><li>What languages was it validated on? English-only validation says nothing about Arabic.</li><li>Does it show <em>which</em> sentences drove the score?</li><li>Does it express uncertainty, or pretend to be binary?</li></ul><p>Sahihly shows sentence-level highlights and treats every score as an estimate — because that's what it honestly is.</p>`,
      ar: `<h2>خطآن، رقم واحد</h2><p>يفشل الكاشف بطريقتين: وسم كتابة بشرية بأنها آلية (<strong>إيجابي كاذب</strong>) أو تفويت نص آلي بالكامل (<strong>سلبي كاذب</strong>). رقم «الدقة» الواحد يخلط الاثنين — والخليط يعتمد كلياً على النصوص المُختبَرة.</p><h2>لماذا الإيجابي الكاذب هو الأهم</h2><p>للطلاب والمحترفين، الإيجابي الكاذب هو الخطأ المكلف: كتابتك الصادقة تُوسم آلية. الصياغة غير الأصلية والسجل الرسمي والنص المحرَّر بكثافة كلها ترفع الخطر. ولهذا بالضبط يجب أن توجّه النتائج المراجعة، لا الأحكام.</p><h2>أسئلة اسألها لأي كاشف</h2><ul><li>على أي لغات جرى التحقق؟ التحقق الإنجليزي لا يقول شيئاً عن العربية.</li><li>هل يُظهر <em>أي</em> الجمل رفعت النتيجة؟</li><li>هل يعبّر عن اللايقين أم يتظاهر بالقطعية؟</li></ul><p>يعرض صحيحلي تمييزاً على مستوى الجملة ويعامل كل نتيجة كتقدير — لأن هذا ما هي عليه بصدق.</p>`,
    },
  },
  {
    slug: "responsible-pre-submission-checklist",
    date: "2026-07-10",
    readingTime: 6,
    category: "Writing",
    title: {
      en: "A Responsible Pre-Submission Checklist for the AI Era",
      ar: "قائمة مراجعة مسؤولة قبل التسليم في عصر الذكاء الاصطناعي",
    },
    excerpt: {
      en: "Five honest steps to review your work before you hit submit — without crossing any integrity lines.",
      ar: "خمس خطوات صادقة لمراجعة عملك قبل التسليم — دون تجاوز أي خطوط للنزاهة.",
    },
    body: {
      en: `<h2>1. Know your institution's policy</h2><p>Some courses allow AI assistance with disclosure; others prohibit it entirely. Nothing in this checklist overrides your policy.</p><h2>2. Own every claim</h2><p>If a draft passed through any tool, verify each fact and citation yourself. You are the author of record.</p><h2>3. Check the style honestly</h2><p>Run a detector <em>on your own work</em> to see which passages read as machine-written — then revise them in your voice, don't just shuffle words.</p><h2>4. Read it aloud</h2><p>The oldest trick still works: robotic rhythm is easier to hear than to see.</p><h2>5. Disclose when required</h2><p>If your course requires disclosing AI assistance, disclose it. A style pass is not a substitute for honesty.</p>`,
      ar: `<h2>١. اعرف سياسة مؤسستك</h2><p>بعض المساقات تسمح بمساعدة الذكاء الاصطناعي مع الإفصاح؛ وأخرى تمنعها كلياً. لا شيء في هذه القائمة يتجاوز سياستك.</p><h2>٢. تحمّل مسؤولية كل ادعاء</h2><p>إن مرّت مسودّتك بأي أداة، تحقّق بنفسك من كل معلومة واستشهاد. أنت المؤلف المسؤول.</p><h2>٣. افحص الأسلوب بصدق</h2><p>شغّل الكاشف <em>على عملك أنت</em> لترى أي الفقرات تبدو آلية — ثم أعد صياغتها بصوتك، لا تكتفِ بتبديل الكلمات.</p><h2>٤. اقرأه بصوت عالٍ</h2><p>أقدم حيلة ما زالت تعمل: الإيقاع الآلي يُسمع أسهل مما يُرى.</p><h2>٥. أفصح حين يُطلب</h2><p>إن اشترط مساقك الإفصاح عن مساعدة الذكاء الاصطناعي، فأفصح. تمريرة الأسلوب ليست بديلاً عن الأمانة.</p>`,
    },
  },
  {
    slug: "arabic-writing-in-the-ai-era",
    date: "2026-07-14",
    readingTime: 7,
    category: "Arabic",
    title: {
      en: "Writing Great Arabic in the AI Era: A Practical Guide",
      ar: "كتابة عربية رائعة في عصر الذكاء الاصطناعي: دليل عملي",
    },
    excerpt: {
      en: "AI drafts Arabic with telltale habits. Here's how to spot them — and restore the music of the language.",
      ar: "يسوّد الذكاء الاصطناعي العربية بعادات فاضحة. إليك كيف تكشفها — وتعيد للغة موسيقاها.",
    },
    body: {
      en: `<h2>The telltale habits</h2><p>Machine Arabic leans on a small set of connectors — علاوة على ذلك, بالإضافة إلى ذلك, في الختام — and produces suspiciously uniform sentence lengths. It also under-uses the rich verbal morphology that gives Arabic its rhythm.</p><h2>Restore the music</h2><ul><li>Alternate long, flowing sentences with short, decisive ones.</li><li>Prefer strong verbs over noun-heavy constructions.</li><li>Cut filler connectors; Arabic's grammar often links clauses without them.</li></ul><h2>Where Sahihly helps</h2><p>Because our engine reasons about Arabic structure directly, its highlights point to genuinely robotic passages — not just translated English patterns.</p>`,
      ar: `<h2>العادات الفاضحة</h2><p>تتّكئ العربية الآلية على مجموعة صغيرة من الروابط — علاوة على ذلك، بالإضافة إلى ذلك، في الختام — وتنتج أطوال جمل منتظمة بشكل مريب. كما تُقلّل استخدام الصرف الفعلي الغني الذي يمنح العربية إيقاعها.</p><h2>أعد الموسيقى</h2><ul><li>ناوب بين جمل طويلة منسابة وأخرى قصيرة حاسمة.</li><li>فضّل الأفعال القوية على التراكيب المثقلة بالمصادر.</li><li>احذف روابط الحشو؛ فنحو العربية كثيراً ما يربط الجمل دونها.</li></ul><h2>أين يساعد صحيحلي</h2><p>لأن محرّكنا يستدل على بنية العربية مباشرة، يشير تمييزه إلى الفقرات الآلية فعلاً — لا إلى أنماط إنجليزية مترجمة.</p>`,
    },
  }
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
