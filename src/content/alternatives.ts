import type { Locale } from "@/lib/i18n/config";

/**
 * "Best alternatives to X" pages — high-intent searches from people already
 * looking to leave a competitor. Deliberately different from /vs/[x]:
 * those compare us head-to-head, these rank several alternatives to X.
 */
export type AltOption = {
  name: string;
  isSahihly?: boolean;
  url?: string;
  why: Record<Locale, string>;
  price: Record<Locale, string>;
};

export type AlternativePage = {
  slug: string;
  target: string;
  reasons: Record<Locale, string[]>;
  options: AltOption[];
};

const sahihly = (whyEn: string, whyAr: string): AltOption => ({
  name: "Sahihly",
  isSahihly: true,
  url: "/ai-detector",
  why: { en: whyEn, ar: whyAr },
  price: { en: "Free · Pro $12/mo", ar: "مجاني · برو $12/شهر" },
});

const opt = (
  name: string,
  url: string,
  whyEn: string,
  whyAr: string,
  priceEn: string,
  priceAr: string
): AltOption => ({
  name,
  url,
  why: { en: whyEn, ar: whyAr },
  price: { en: priceEn, ar: priceAr },
});

export const alternatives: AlternativePage[] = [
  {
    slug: "undetectable-ai",
    target: "Undetectable.ai",
    reasons: {
      en: [
        "No genuine Arabic support — Arabic output reads translated",
        "No free tier you can actually work with; every run costs credits",
        "Rewrites aren't re-checked, so you never see whether they worked",
      ],
      ar: [
        "لا دعم عربي حقيقي — المخرجات العربية تُقرأ كترجمة",
        "لا خطة مجانية عملية؛ كل محاولة تستهلك رصيداً",
        "إعادة الصياغة لا تُفحص من جديد، فلا ترى هل نجحت فعلاً",
      ],
    },
    options: [
      sahihly(
        "Bilingual by design: native Arabic and English on one hybrid engine, a free tier with no signup, and every rewrite is automatically re-checked so you see the before/after signal drop.",
        "ثنائي اللغة بالتصميم: عربية وإنجليزية أصيلتان على محرّك هجين واحد، خطة مجانية بلا تسجيل، وكل إعادة صياغة تُفحص تلقائياً لترى انخفاض الإشارات قبل/بعد."
      ),
      opt("QuillBot", "https://quillbot.com", "A familiar paraphraser with browser extensions, but it's a rewriting tool rather than a detector, and Arabic is weak.", "أداة إعادة صياغة مألوفة بإضافات متصفح، لكنها للصياغة لا للكشف، والعربية ضعيفة.", "Free · $9.95/mo", "مجاني · $9.95/شهر"),
      opt("HIX Bypass", "https://bypass.hix.ai", "Handles bulk English rewriting quickly, though aggressive modes can drift from your original meaning.", "يعالج إعادة الصياغة الإنجليزية بالجملة بسرعة، لكن الأنماط الحادة قد تنحرف عن معناك الأصلي.", "From $9.99/mo", "من $9.99/شهر"),
    ],
  },
  {
    slug: "quillbot",
    target: "QuillBot",
    reasons: {
      en: [
        "It paraphrases but doesn't tell you how AI-like your text reads",
        "Arabic support is thin compared to its English quality",
        "No style report, so you don't learn what to fix",
      ],
      ar: [
        "يعيد الصياغة لكنه لا يخبرك كم يبدو نصّك آلياً",
        "دعم العربية ضعيف مقارنةً بجودته الإنجليزية",
        "لا تقرير أسلوب، فلا تتعلّم ماذا تصلح",
      ],
    },
    options: [
      sahihly(
        "Detection and humanizing in one place, with a four-metric style report that shows exactly which sentences to rework — and real Modern Standard Arabic, not a translation layer.",
        "الكشف والتنسين في مكان واحد، مع تقرير أسلوب من أربعة مقاييس يُظهر أي الجمل تحتاج إعادة صياغة — وفصحى حديثة حقيقية لا طبقة ترجمة."
      ),
      opt("Grammarly", "https://grammarly.com", "Excellent for English grammar and clarity, and integrates everywhere — but English only and no AI detection.", "ممتاز لقواعد الإنجليزية ووضوحها ويتكامل في كل مكان — لكنه إنجليزي فقط وبلا كشف ذكاء اصطناعي.", "Free · $12/mo", "مجاني · $12/شهر"),
      opt("Undetectable.ai", "https://undetectable.ai", "Strong English humanizing at scale if that's all you need, with several rewriting modes.", "تنسين إنجليزي قوي بالجملة إن كان هذا كل ما تحتاجه، بأنماط صياغة متعددة.", "From $9.99/mo", "من $9.99/شهر"),
    ],
  },
  {
    slug: "gptzero",
    target: "GPTZero",
    reasons: {
      en: [
        "Built for English essays; Arabic results are close to noise",
        "Detects but doesn't help you improve the flagged passages",
        "Presents scores without an honest confidence signal",
      ],
      ar: [
        "مبني لمقالات إنجليزية؛ نتائج العربية أقرب للضجيج",
        "يكشف لكنه لا يساعدك على تحسين الفقرات الموسومة",
        "يعرض النتائج بلا إشارة ثقة صادقة",
      ],
    },
    options: [
      sahihly(
        "A hybrid engine that blends statistical signals with AI reasoning, publishes an honest confidence rating on every score, and lets you fix flagged passages with one click.",
        "محرّك هجين يمزج الإشارات الإحصائية باستدلال الذكاء الاصطناعي، وينشر درجة ثقة صادقة مع كل نتيجة، ويتيح إصلاح الفقرات الموسومة بنقرة."
      ),
      opt("Originality.ai", "https://originality.ai", "Made for publishing teams, pairing AI detection with plagiarism checks — credit-based and English-first.", "مصنوع لفرق النشر، يجمع كشف الذكاء الاصطناعي مع فحص الانتحال — بنظام رصيد وإنجليزية أولاً.", "From $12.95/mo", "من $12.95/شهر"),
      opt("Copyleaks", "https://copyleaks.com", "Enterprise-grade with LMS integrations; heavier than most individuals need.", "بمستوى المؤسسات مع تكامل أنظمة التعلّم؛ أثقل مما يحتاجه معظم الأفراد.", "Paid plans", "خطط مدفوعة"),
    ],
  },
  {
    slug: "zerogpt",
    target: "ZeroGPT",
    reasons: {
      en: [
        "Accuracy swings widely between runs on similar text",
        "A bare number with no explanation of what triggered it",
        "No humanizer, so a high score leaves you stuck",
      ],
      ar: [
        "الدقة تتذبذب كثيراً بين المحاولات على نصوص متشابهة",
        "رقم مجرّد بلا شرح لما رفعه",
        "بلا مُنسّن، فالنتيجة العالية تتركك عالقاً",
      ],
    },
    options: [
      sahihly(
        "Sentence-level highlights and a reproducible style report explain every score, and the built-in humanizer turns a high result into a fixed draft in seconds.",
        "تمييز على مستوى الجملة وتقرير أسلوب قابل للتكرار يشرحان كل نتيجة، والمُنسّن المدمج يحوّل النتيجة العالية إلى مسودّة مُصلَحة خلال ثوانٍ."
      ),
      opt("GPTZero", "https://gptzero.me", "The best-known detector among educators, with sentence highlighting for English.", "أشهر كاشف بين المعلّمين، مع تمييز الجمل للإنجليزية.", "Free · from $10/mo", "مجاني · من $10/شهر"),
      opt("Copyleaks", "https://copyleaks.com", "A broader suite if you also need plagiarism checking across an organization.", "حزمة أوسع إن كنت تحتاج فحص الانتحال على مستوى مؤسسة.", "Paid plans", "خطط مدفوعة"),
    ],
  },
  {
    slug: "copyleaks",
    target: "Copyleaks",
    reasons: {
      en: [
        "Priced and built for institutions, not individual writers",
        "Arabic quality is inconsistent despite the language count",
        "No humanizing — detection is where it stops",
      ],
      ar: [
        "مُسعّر ومبني للمؤسسات لا للكتّاب الأفراد",
        "جودة العربية متذبذبة رغم عدد اللغات المُعلن",
        "بلا تنسين — يتوقف عند الكشف",
      ],
    },
    options: [
      sahihly(
        "Built for the individual writer: a free tier with no signup, detection and humanizing together, and Arabic treated as a first language rather than one entry on a list.",
        "مبني للكاتب الفرد: خطة مجانية بلا تسجيل، كشف وتنسين معاً، وعربية معامَلة كلغة أولى لا كبند في قائمة."
      ),
      opt("Originality.ai", "https://originality.ai", "The closest match if you specifically need publisher workflows and plagiarism scanning.", "الأقرب إن كنت تحتاج تحديداً تدفّقات عمل الناشرين وفحص الانتحال.", "From $12.95/mo", "من $12.95/شهر"),
      opt("GPTZero", "https://gptzero.me", "Simpler and cheaper for individual English checks.", "أبسط وأرخص للفحوصات الإنجليزية الفردية.", "Free · from $10/mo", "مجاني · من $10/شهر"),
    ],
  },
];

export function getAlternative(slug: string): AlternativePage | undefined {
  return alternatives.find((a) => a.slug === slug);
}
