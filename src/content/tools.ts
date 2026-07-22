import type { Locale } from "@/lib/i18n/config";

export type ToolEntry = {
  name: string;
  rating: number; // 0..5
  url?: string;
  isSahihly?: boolean;
  bestFor: Record<Locale, string>;
  pros: Record<Locale, string[]>;
  cons: Record<Locale, string[]>;
  price: Record<Locale, string>;
};

export type Roundup = {
  slug: string;
  updated: string;
  title: Record<Locale, string>;
  h1: Record<Locale, string>;
  intro: Record<Locale, string>;
  tools: ToolEntry[];
  faq: { q: Record<Locale, string>; a: Record<Locale, string> }[];
};

const sahihlyDetector: ToolEntry = {
  name: "Sahihly",
  rating: 4.9,
  url: "/ai-detector",
  isSahihly: true,
  bestFor: { en: "Bilingual (Arabic + English) detection with a full style report", ar: "الكشف ثنائي اللغة (عربي + إنجليزي) مع تقرير أسلوب كامل" },
  pros: {
    en: ["Native Arabic + English on one hybrid engine", "Sentence-level highlights and a 4-metric style report", "Honest confidence rating; free with no signup", "Auto verify-after-rewrite loop"],
    ar: ["عربي + إنجليزي بأصالة على محرّك هجين واحد", "تمييز على مستوى الجملة وتقرير أسلوب من ٤ مقاييس", "درجة ثقة صادقة؛ مجاني بلا تسجيل", "حلقة تحقّق تلقائي بعد إعادة الصياغة"],
  },
  cons: {
    en: ["Newer brand than the US incumbents", "Advanced features need a paid plan"],
    ar: ["علامة أحدث من الكبار الأمريكيين", "الميزات المتقدمة تحتاج خطة مدفوعة"],
  },
  price: { en: "Free · Pro $12/mo", ar: "مجاني · برو $12/شهر" },
};

const sahihlyHumanizer: ToolEntry = {
  ...sahihlyDetector,
  url: "/ai-humanizer",
  bestFor: { en: "Meaning-safe humanizing in Arabic and English with rewrite styles", ar: "تنسين يحفظ المعنى بالعربية والإنجليزية مع أنماط صياغة" },
  pros: {
    en: ["Natural / Academic / Casual styles, Arabic-aware", "Preserves meaning; before/after view", "Auto re-checks the result", "Free tier, no signup"],
    ar: ["أنماط طبيعي / أكاديمي / مبسّط واعية بالعربية", "يحفظ المعنى؛ عرض قبل/بعد", "يعيد فحص النتيجة تلقائياً", "خطة مجانية بلا تسجيل"],
  },
};

function competitor(
  name: string,
  rating: number,
  url: string,
  bestForEn: string,
  bestForAr: string,
  prosEn: string[],
  prosAr: string[],
  consEn: string[],
  consAr: string[],
  priceEn: string,
  priceAr: string
): ToolEntry {
  return {
    name,
    rating,
    url,
    bestFor: { en: bestForEn, ar: bestForAr },
    pros: { en: prosEn, ar: prosAr },
    cons: { en: consEn, ar: consAr },
    price: { en: priceEn, ar: priceAr },
  };
}

export const roundups: Roundup[] = [
  {
    slug: "best-ai-detectors",
    updated: "2026-07",
    title: { en: "Best AI Detectors in 2026 (Free & Paid, Ranked)", ar: "أفضل كواشف الذكاء الاصطناعي ٢٠٢٦ (مجانية ومدفوعة، مرتّبة)" },
    h1: { en: "Best AI Detectors of 2026", ar: "أفضل كواشف الذكاء الاصطناعي لعام ٢٠٢٦" },
    intro: {
      en: "We compared the leading AI-detection tools on accuracy, transparency, language support, and price. Every detector here is an estimate engine — none is infallible — so we weighted honesty and sentence-level explanations, not just a headline number.",
      ar: "قارنّا أبرز أدوات كشف الذكاء الاصطناعي في الدقة والشفافية ودعم اللغات والسعر. كل كاشف هنا محرّك تقدير — لا معصوم — لذلك وزّنّا الصدق والشرح على مستوى الجملة، لا مجرد رقم عريض.",
    },
    tools: [
      sahihlyDetector,
      competitor("GPTZero", 4.4, "https://gptzero.me", "Educators checking English essays", "المعلّمون يفحصون مقالات إنجليزية", ["Popular with schools", "Sentence highlighting"], ["رائج في المدارس", "تمييز الجمل"], ["English-focused; weak on Arabic", "Paid tiers for volume"], ["يركّز على الإنجليزية؛ ضعيف بالعربية", "خطط مدفوعة للحجم الكبير"], "Free · from $10/mo", "مجاني · من $10/شهر"),
      competitor("Originality.ai", 4.3, "https://originality.ai", "Publishers and SEO agencies", "الناشرون ووكالات السيو", ["Built for content teams", "Plagiarism + AI in one"], ["مبني لفرق المحتوى", "انتحال + ذكاء اصطناعي معاً"], ["Pay-per-credit, no real free tier", "English-first"], ["الدفع بالرصيد، بلا خطة مجانية حقيقية", "الإنجليزية أولاً"], "From $12.95/mo", "من $12.95/شهر"),
      competitor("Copyleaks", 4.1, "https://copyleaks.com", "Enterprise and LMS integration", "المؤسسات وتكامل أنظمة التعلّم", ["Enterprise features", "Many languages claimed"], ["ميزات مؤسسية", "لغات كثيرة مُدّعاة"], ["Heavy for individuals", "Arabic quality inconsistent"], ["ثقيل للأفراد", "جودة العربية متذبذبة"], "Free trial · paid plans", "تجربة مجانية · خطط مدفوعة"),
      competitor("ZeroGPT", 3.7, "https://zerogpt.com", "Quick free checks", "فحوصات مجانية سريعة", ["Fast and free", "No signup"], ["سريع ومجاني", "بلا تسجيل"], ["Limited depth; no style report", "Accuracy varies widely"], ["عمق محدود؛ بلا تقرير أسلوب", "دقة متفاوتة جداً"], "Free · Pro upsell", "مجاني · ترقية مدفوعة"),
    ],
    faq: [
      { q: { en: "What is the most accurate AI detector?", ar: "ما أدق كاشف ذكاء اصطناعي؟" }, a: { en: "No detector is 100% accurate. The best ones show their reasoning (sentence highlights, confidence) so you can judge. Sahihly's hybrid engine blends statistical signals with AI reasoning and is uniquely strong on Arabic.", ar: "لا كاشف دقيق ١٠٠٪. الأفضل يُظهر منطقه (تمييز الجمل، الثقة) لتحكم بنفسك. محرّك صحيحلي الهجين يمزج الإشارات الإحصائية باستدلال الذكاء الاصطناعي وقوي فريداً بالعربية." } },
      { q: { en: "Is there a free AI detector?", ar: "هل يوجد كاشف مجاني؟" }, a: { en: "Yes — Sahihly and ZeroGPT offer free checks. Sahihly's free tier adds sentence highlights and a style report with no signup.", ar: "نعم — صحيحلي وZeroGPT يقدّمان فحوصات مجانية. خطة صحيحلي المجانية تضيف تمييز الجمل وتقرير أسلوب بلا تسجيل." } },
    ],
  },
  {
    slug: "best-ai-humanizers",
    updated: "2026-07",
    title: { en: "Best AI Humanizers in 2026 (Ranked & Reviewed)", ar: "أفضل مُنسّنات الذكاء الاصطناعي ٢٠٢٦ (مرتّبة ومراجَعة)" },
    h1: { en: "Best AI Humanizers of 2026", ar: "أفضل مُنسّنات النصوص لعام ٢٠٢٦" },
    intro: {
      en: "A good humanizer improves rhythm and removes robotic patterns without changing your meaning. We ranked the top tools on meaning preservation, naturalness, language support, and whether they verify their own output.",
      ar: "المُنسّن الجيد يحسّن الإيقاع ويزيل الأنماط الآلية دون تغيير معناك. رتّبنا أبرز الأدوات على حفظ المعنى والطبيعية ودعم اللغات، وهل تتحقق من ناتجها.",
    },
    tools: [
      sahihlyHumanizer,
      competitor("Undetectable.ai", 4.4, "https://undetectable.ai", "English humanizing at scale", "التنسين الإنجليزي بالجملة", ["Strong English output", "Multiple modes"], ["ناتج إنجليزي قوي", "أنماط متعددة"], ["No genuine Arabic support", "No free unlimited tier"], ["بلا دعم عربي حقيقي", "بلا خطة مجانية غير محدودة"], "From $9.99/mo", "من $9.99/شهر"),
      competitor("QuillBot", 4.2, "https://quillbot.com", "Paraphrasing for students", "إعادة الصياغة للطلاب", ["Well-known paraphraser", "Browser extensions"], ["أداة إعادة صياغة شهيرة", "إضافات متصفح"], ["Not a dedicated humanizer", "Weak Arabic"], ["ليست مُنسّناً مخصصاً", "عربية ضعيفة"], "Free · Premium $9.95/mo", "مجاني · بريميوم $9.95/شهر"),
      competitor("HIX Bypass", 3.9, "https://bypass.hix.ai", "Bulk English rewriting", "إعادة صياغة إنجليزية بالجملة", ["Fast bulk processing"], ["معالجة سريعة بالجملة"], ["English only", "Meaning drift on aggressive modes"], ["إنجليزي فقط", "انزياح المعنى بالأنماط الحادة"], "From $9.99/mo", "من $9.99/شهر"),
    ],
    faq: [
      { q: { en: "Do AI humanizers change the meaning?", ar: "هل تغيّر المُنسّنات المعنى؟" }, a: { en: "A well-built one shouldn't. Sahihly is engineered as a style-only pass and shows a before/after view so you can verify meaning is preserved.", ar: "الجيد لا يفعل. صحيحلي مصمَّم كتمريرة أسلوب فقط ويعرض قبل/بعد للتحقق من حفظ المعنى." } },
      { q: { en: "Is it ethical to humanize AI text?", ar: "هل تنسين نص الذكاء الاصطناعي أخلاقي؟" }, a: { en: "As a style tool for your own writing, yes — within your institution's rules. It should not be used to misrepresent authorship where disclosure is required.", ar: "كأداة أسلوب لكتابتك أنت، نعم — ضمن قواعد مؤسستك. ولا يجوز استخدامها للتضليل حول هوية الكاتب حيث يُشترط الإفصاح." } },
    ],
  },
  {
    slug: "best-ai-writing-tools",
    updated: "2026-07",
    title: { en: "Best AI Writing Tools in 2026 for Students & Creators", ar: "أفضل أدوات الكتابة بالذكاء الاصطناعي ٢٠٢٦ للطلاب وصنّاع المحتوى" },
    h1: { en: "Best AI Writing Tools of 2026", ar: "أفضل أدوات الكتابة بالذكاء الاصطناعي ٢٠٢٦" },
    intro: {
      en: "From drafting to polishing to checking, these are the tools we recommend for real writing work in English and Arabic — with an honest note on where each one fits.",
      ar: "من التسويد إلى التنقيح إلى الفحص، هذه الأدوات التي نوصي بها لعمل كتابة حقيقي بالعربية والإنجليزية — مع ملاحظة صادقة عن موضع كل منها.",
    },
    tools: [
      { ...sahihlyDetector, url: "/", bestFor: { en: "Checking and refining writing quality, bilingual", ar: "فحص وتحسين جودة الكتابة، ثنائي اللغة" } },
      competitor("ChatGPT", 4.6, "https://chat.openai.com", "Drafting and brainstorming", "التسويد والعصف الذهني", ["Versatile drafting", "Strong reasoning"], ["تسويد متعدد الاستخدامات", "استدلال قوي"], ["Can sound generic; needs editing", "No built-in detector"], ["قد يبدو عاماً؛ يحتاج تحريراً", "بلا كاشف مدمج"], "Free · Plus $20/mo", "مجاني · بلس $20/شهر"),
      competitor("Grammarly", 4.5, "https://grammarly.com", "Grammar and clarity in English", "القواعد والوضوح بالإنجليزية", ["Excellent grammar engine", "Everywhere integrations"], ["محرّك قواعد ممتاز", "تكامل في كل مكان"], ["English only", "Style suggestions can flatten voice"], ["إنجليزي فقط", "اقتراحات الأسلوب قد تُسطّح الصوت"], "Free · Premium $12/mo", "مجاني · بريميوم $12/شهر"),
      competitor("Jasper", 4.1, "https://jasper.ai", "Marketing copy at scale", "نصوص تسويقية بالجملة", ["Templates for marketers", "Brand voice"], ["قوالب للمسوّقين", "صوت العلامة"], ["Pricey for individuals", "English-centric"], ["مكلف للأفراد", "يتمحور حول الإنجليزية"], "From $39/mo", "من $39/شهر"),
    ],
    faq: [
      { q: { en: "What is the best AI writing tool for Arabic?", ar: "ما أفضل أداة كتابة بالذكاء الاصطناعي للعربية؟" }, a: { en: "Most mainstream tools are English-first. For Arabic writing quality — detection and humanizing — Sahihly is purpose-built with real morphological understanding.", ar: "معظم الأدوات المشهورة إنجليزية أولاً. لجودة الكتابة العربية — كشفاً وتنسيناً — صحيحلي مبني لهذا الغرض بفهم صرفي حقيقي." } },
    ],
  },
  {
    slug: "best-ai-tools-for-reports",
    updated: "2026-07",
    title: { en: "Best AI Tools for Reports & Documents in 2026", ar: "أفضل أدوات الذكاء الاصطناعي للتقارير والمستندات ٢٠٢٦" },
    h1: { en: "Best AI Tools for Reports of 2026", ar: "أفضل أدوات الذكاء الاصطناعي لإعداد التقارير ٢٠٢٦" },
    intro: {
      en: "Writing reports means drafting, structuring, checking quality, and making sure the final document reads like a person wrote it. Here's the stack we recommend — English and Arabic.",
      ar: "كتابة التقارير تعني التسويد والهيكلة وفحص الجودة والتأكد أن المستند النهائي يُقرأ كأن إنساناً كتبه. إليك الحزمة التي نوصي بها — عربي وإنجليزي.",
    },
    tools: [
      { ...sahihlyHumanizer, url: "/ai-humanizer", bestFor: { en: "Final quality + humanizing pass on report drafts", ar: "تمريرة الجودة والتنسين الأخيرة على مسودّات التقارير" } },
      competitor("Microsoft Copilot", 4.4, "https://copilot.microsoft.com", "Drafting inside Word & Office", "التسويد داخل Word وأوفيس", ["Native Office integration", "Summarizes long docs"], ["تكامل أوفيس أصيل", "يلخّص المستندات الطويلة"], ["Subscription-bound", "Generic tone needs editing"], ["مرتبط بالاشتراك", "نبرة عامة تحتاج تحريراً"], "Included with M365", "ضمن M365"),
      competitor("Notion AI", 4.2, "https://notion.so", "Structuring notes into reports", "تحويل الملاحظات إلى تقارير", ["Great for outlines", "Inside your workspace"], ["ممتاز للمخططات", "داخل مساحة عملك"], ["Not a quality checker", "English-first"], ["ليس فاحص جودة", "الإنجليزية أولاً"], "Add-on from $8/mo", "إضافة من $8/شهر"),
      competitor("Gemini", 4.3, "https://gemini.google.com", "Research-heavy drafting", "التسويد كثيف البحث", ["Strong at synthesis", "Google integration"], ["قوي في التركيب", "تكامل جوجل"], ["Output needs a human pass", "No detector"], ["الناتج يحتاج تمريرة بشرية", "بلا كاشف"], "Free · paid tiers", "مجاني · خطط مدفوعة"),
    ],
    faq: [
      { q: { en: "Can I use AI to write a report?", ar: "هل أستخدم الذكاء الاصطناعي لكتابة تقرير؟" }, a: { en: "You can draft with AI, but own every claim and follow your organization's disclosure rules. Run a quality and humanizing pass, and verify facts before submitting.", ar: "يمكنك التسويد بالذكاء الاصطناعي، لكن تحمّل كل ادعاء والتزم بقواعد الإفصاح في جهتك. مرّر تمريرة جودة وتنسين، ودقّق الحقائق قبل التسليم." } },
    ],
  },
];

export function getRoundup(slug: string): Roundup | undefined {
  return roundups.find((r) => r.slug === slug);
}
