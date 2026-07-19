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

posts.push(
  {
    slug: "chatgpt-writing-tells",
    date: "2026-07-16",
    readingTime: 8,
    category: "Guides",
    title: {
      en: "10 Tells That Text Came From ChatGPT (With Fixes)",
      ar: "١٠ علامات تكشف أن النص من ChatGPT (مع الإصلاحات)",
    },
    excerpt: {
      en: "From \"furthermore\" chains to suspiciously balanced paragraphs — the patterns to spot, and how to rewrite each one.",
      ar: "من سلاسل «علاوة على ذلك» إلى الفقرات المتوازنة بشكل مريب — الأنماط التي تلتقطها وكيف تعيد صياغة كل منها.",
    },
    body: {
      en: `<h2>The big ten</h2><ul><li><strong>Transition chains</strong> — furthermore, moreover, additionally stacked across paragraphs. Fix: delete most; let ideas connect themselves.</li><li><strong>Uniform sentences</strong> — every sentence 15–20 words. Fix: cut one to five words; let another run long.</li><li><strong>The rule of three</strong> — endless triplets ("clear, concise, and compelling"). Fix: keep one triplet per page, break the rest.</li><li><strong>Hedged everything</strong> — "can potentially help to". Fix: commit — "helps".</li><li><strong>Empty openers</strong> — "In today's fast-paced world". Fix: start with the actual point.</li><li><strong>Corporate glosses</strong> — seamless, robust, holistic, leverage. Fix: plain words.</li><li><strong>Symmetrical paragraphs</strong> — each exactly 3–4 sentences. Fix: one-sentence paragraph somewhere.</li><li><strong>Restating the question</strong> before answering it. Fix: answer first.</li><li><strong>Zero specifics</strong> — no numbers, names, or examples. Fix: add one concrete detail per claim.</li><li><strong>The tidy summary</strong> — "In conclusion" repeating everything. Fix: end on your strongest point instead.</li></ul><h2>Check your work</h2><p>Run your revised draft through a detector with sentence-level highlights — if the flags cluster on lines you didn't rewrite, you know where to go next.</p>`,
      ar: `<h2>العلامات العشر</h2><ul><li><strong>سلاسل الروابط</strong> — علاوة على ذلك، بالإضافة إلى ذلك، متراصة عبر الفقرات. الإصلاح: احذف معظمها ودع الأفكار تترابط بنفسها.</li><li><strong>جمل متساوية</strong> — كل جملة ١٥–٢٠ كلمة. الإصلاح: اقطع واحدة لخمس كلمات ودع أخرى تمتد.</li><li><strong>قاعدة الثلاثيات</strong> — ثلاثيات لا تنتهي («واضح وموجز ومقنع»). الإصلاح: أبقِ ثلاثية واحدة بالصفحة واكسر الباقي.</li><li><strong>التحوّط الدائم</strong> — «يمكن أن يساعد جزئياً في». الإصلاح: احسمها — «يساعد».</li><li><strong>افتتاحيات فارغة</strong> — «في عالمنا سريع الخطى». الإصلاح: ابدأ بالفكرة نفسها.</li><li><strong>كلمات الشركات</strong> — سلس، شامل, قوي. الإصلاح: كلمات بسيطة.</li><li><strong>فقرات متناظرة</strong> — كل فقرة ٣–٤ جمل بالضبط. الإصلاح: فقرة من جملة واحدة في مكان ما.</li><li><strong>إعادة صياغة السؤال</strong> قبل إجابته. الإصلاح: أجب أولاً.</li><li><strong>صفر تفاصيل</strong> — لا أرقام ولا أسماء ولا أمثلة. الإصلاح: تفصيلة ملموسة لكل ادعاء.</li><li><strong>الخاتمة المرتّبة</strong> — «في الختام» تكرر كل شيء. الإصلاح: اختم بأقوى نقطة لديك.</li></ul><h2>افحص عملك</h2><p>مرّر مسودتك المنقّحة عبر كاشف يميّز الجمل — إن تجمّعت الإشارات على سطور لم تُعد صياغتها، عرفت وجهتك التالية.</p>`,
    },
  },
  {
    slug: "students-guide-ai-writing-tools",
    date: "2026-07-17",
    readingTime: 7,
    category: "Guides",
    title: {
      en: "A Student's Honest Guide to AI Writing Tools in 2026",
      ar: "دليل الطالب الصادق لأدوات الكتابة الذكية في ٢٠٢٦",
    },
    excerpt: {
      en: "What's allowed, what's risky, and how to use AI to become a better writer instead of a dependent one.",
      ar: "ما المسموح، وما الخطر، وكيف تستخدم الذكاء الاصطناعي لتصبح كاتباً أفضل لا كاتباً تابعاً.",
    },
    body: {
      en: `<h2>Start with your syllabus</h2><p>Policies now range from "AI banned entirely" to "AI encouraged with disclosure". Nothing in any tool overrides what your course allows — read the policy before you paste a single word.</p><h2>The three safe uses almost everyone allows</h2><ul><li><strong>Brainstorming</strong> — generating angles you then research yourself.</li><li><strong>Feedback</strong> — asking what's unclear in a draft you wrote.</li><li><strong>Style review</strong> — running your own writing through a detector to catch accidental machine-flavored patterns before your professor does.</li></ul><h2>The line you shouldn't cross</h2><p>Submitting generated work as yours where disclosure is required. Beyond the integrity risk, you lose the skill the assignment exists to build — and interviews have no AI assist.</p><h2>Grow from it</h2><p>Compare your original with a humanized version and study the differences: rhythm, transitions, specificity. That gap is your personal writing curriculum.</p>`,
      ar: `<h2>ابدأ من خطة المساق</h2><p>تتراوح السياسات اليوم بين «الذكاء الاصطناعي ممنوع كلياً» و«مشجَّع مع الإفصاح». لا شيء في أي أداة يتجاوز ما يسمح به مساقك — اقرأ السياسة قبل لصق كلمة واحدة.</p><h2>الاستخدامات الآمنة الثلاثة المسموحة غالباً</h2><ul><li><strong>العصف الذهني</strong> — توليد زوايا تبحثها أنت بنفسك.</li><li><strong>الملاحظات</strong> — سؤاله عمّا هو غامض في مسودة كتبتها أنت.</li><li><strong>مراجعة الأسلوب</strong> — تمرير كتابتك أنت عبر كاشف لالتقاط الأنماط الآلية العَرَضية قبل أن يلتقطها أستاذك.</li></ul><h2>الخط الذي لا تتجاوزه</h2><p>تقديم عمل مولَّد باسمك حيث يُشترط الإفصاح. وراء خطر النزاهة، تخسر المهارة التي وُجد الواجب لبنائها — والمقابلات لا مساعد ذكي فيها.</p><h2>انمُ منه</h2><p>قارن أصلك بنسخة منسَّنة وادرس الفروق: الإيقاع، الروابط، التفاصيل. تلك الفجوة هي منهجك الشخصي في الكتابة.</p>`,
    },
  },
  {
    slug: "ai-content-seo-google",
    date: "2026-07-18",
    readingTime: 8,
    category: "Writing",
    title: {
      en: "Does Google Penalize AI Content? What Actually Matters for SEO",
      ar: "هل يعاقب جوجل محتوى الذكاء الاصطناعي؟ ما المهم فعلاً للـ SEO",
    },
    excerpt: {
      en: "Google's official position, what the helpful-content system really measures, and a workflow that keeps AI-assisted articles ranking.",
      ar: "موقف جوجل الرسمي، وما يقيسه نظام المحتوى المفيد حقاً، وسير عمل يُبقي المقالات المدعومة بالذكاء الاصطناعي في الصدارة.",
    },
    body: {
      en: `<h2>Google's actual position</h2><p>Google has said plainly: it rewards helpful content "however it is produced". There is no AI-detection penalty. What gets demoted is <em>unhelpful</em> content — thin, generic, made for rankings instead of readers — which mass-produced AI text tends to be.</p><h2>Why raw AI articles still underperform</h2><ul><li>No first-hand experience or original information — the core of E-E-A-T.</li><li>Interchangeable phrasing readers bounce from, and engagement signals follow.</li><li>Occasional confident errors that damage trust and earn corrections, not links.</li></ul><h2>A workflow that works</h2><p>Draft with AI if you like — then add what only you can: real examples, data, opinions, local knowledge. Run a style pass so it reads like a person (rhythm variety matters for readers, and readers matter for rankings). Fact-check every claim. Publish under a real identity with a real about page.</p><h2>The takeaway</h2><p>Optimize for the reader's problem, not for "undetectability". Detection scores are a style diagnostic — Google's systems measure usefulness.</p>`,
      ar: `<h2>موقف جوجل الفعلي</h2><p>قالها جوجل صراحة: يكافئ المحتوى المفيد «كيفما أُنتج». لا توجد عقوبة لكشف الذكاء الاصطناعي. ما يُخفَّض هو المحتوى <em>غير المفيد</em> — الرقيق العام المصنوع للترتيب لا للقارئ — وهو ما يميل إليه النص الآلي المنتَج بالجملة.</p><h2>لماذا تتعثر المقالات الآلية الخام</h2><ul><li>لا خبرة مباشرة ولا معلومات أصلية — جوهر E-E-A-T.</li><li>صياغة متشابهة يهجرها القرّاء، وإشارات التفاعل تتبعهم.</li><li>أخطاء واثقة متفرقة تهدم الثقة وتجلب تصحيحات لا روابط.</li></ul><h2>سير عمل ينجح</h2><p>سوّد بالذكاء الاصطناعي إن شئت — ثم أضف ما لا يستطيعه غيرك: أمثلة حقيقية، بيانات، آراء، معرفة محلية. مرّر تمريرة أسلوب ليُقرأ كإنسان (تنوّع الإيقاع مهم للقارئ، والقارئ مهم للترتيب). دقّق كل معلومة. وانشر بهوية حقيقية وصفحة تعريف حقيقية.</p><h2>الخلاصة</h2><p>حسّن لمشكلة القارئ لا لـ«عدم الانكشاف». نتائج الكشف تشخيص أسلوبي — وأنظمة جوجل تقيس الفائدة.</p>`,
    },
  },
  {
    slug: "humanizer-styles-when-to-use",
    date: "2026-07-19",
    readingTime: 6,
    category: "Writing",
    title: {
      en: "Natural, Academic, or Casual? Choosing the Right Rewrite Style",
      ar: "طبيعي أم أكاديمي أم مبسّط؟ اختيار نمط إعادة الصياغة الصحيح",
    },
    excerpt: {
      en: "The same paragraph lands differently in each register. Here's how to pick — with Arabic register notes included.",
      ar: "الفقرة نفسها تصل مختلفة بكل مستوى. إليك كيف تختار — مع ملاحظات المستوى العربي.",
    },
    body: {
      en: `<h2>Natural</h2><p>Your default. It aims for the voice of a competent writer addressing peers: varied rhythm, plain words, no performance. Use it for blogs, reports, emails — anything without a dress code.</p><h2>Academic</h2><p>Measured and precise, but still human — real academic prose varies its rhythm too, which is exactly what separates it from AI's fake formality. Use it for papers, proposals, and formal reviews. In Arabic this maps to فصحى رصينة: full grammatical agreement, careful connectors, no colloquial drift.</p><h2>Casual</h2><p>Relaxed and direct, contractions welcome. Use it for social posts, newsletters, and landing pages that need warmth. The Arabic equivalent is الفصحى المبسّطة — friendly and modern without slipping into slang that would undercut credibility.</p><h2>The test</h2><p>Read the result aloud imagining your actual reader across the table. If you'd be embarrassed to say it to them, switch styles and run it again.</p>`,
      ar: `<h2>طبيعي</h2><p>خيارك الافتراضي. يستهدف صوت كاتب متمكّن يخاطب أقرانه: إيقاع متنوع وكلمات بسيطة بلا استعراض. استخدمه للمدونات والتقارير والرسائل — كل ما لا يفرض زياً رسمياً.</p><h2>أكاديمي</h2><p>متزن ودقيق لكنه بشري — فالنثر الأكاديمي الحقيقي ينوّع إيقاعه أيضاً، وهذا بالضبط ما يفصله عن الرسمية الزائفة للذكاء الاصطناعي. استخدمه للأبحاث والمقترحات والمراجعات الرسمية. وفي العربية يقابله الفصحى الرصينة: مطابقة نحوية تامة وروابط محسوبة بلا انزلاق عامي.</p><h2>مبسّط</h2><p>مسترخٍ ومباشر. استخدمه لمنشورات التواصل والنشرات وصفحات الهبوط التي تحتاج دفئاً. مقابله العربي الفصحى المبسّطة — ودودة عصرية دون انزلاق لعامية تهدم المصداقية.</p><h2>الاختبار</h2><p>اقرأ النتيجة بصوت عالٍ متخيلاً قارئك الفعلي أمامك. إن كنت ستخجل من قولها له، بدّل النمط وأعد التشغيل.</p>`,
    },
  }
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
