import type { Locale } from "@/lib/i18n/config";

export type Competitor = {
  slug: string;
  name: string;
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  rows: {
    feature: Record<Locale, string>;
    us: boolean;
    them: boolean;
  }[];
  verdict: Record<Locale, string>;
};

const commonRows = (extra: Competitor["rows"] = []): Competitor["rows"] => [
  {
    feature: { en: "Native Arabic detection & humanizing", ar: "كشف وتنسين عربي أصيل" },
    us: true,
    them: false,
  },
  {
    feature: { en: "Native English quality", ar: "جودة إنجليزية أصيلة" },
    us: true,
    them: true,
  },
  {
    feature: { en: "Free tier, no signup", ar: "خطة مجانية بلا تسجيل" },
    us: true,
    them: false,
  },
  {
    feature: { en: "Sentence-level highlights", ar: "تمييز على مستوى الجملة" },
    us: true,
    them: true,
  },
  {
    feature: { en: "Responsible-use positioning", ar: "موقف استخدام مسؤول" },
    us: true,
    them: false,
  },
  ...extra,
];

export const competitors: Competitor[] = [
  {
    slug: "undetectable-ai",
    name: "Undetectable.ai",
    title: {
      en: "Sahihly vs Undetectable.ai",
      ar: "صحيحلي مقابل Undetectable.ai",
    },
    intro: {
      en: "Undetectable.ai is a well-known English humanizer. Sahihly matches it on English while adding genuine Arabic support and a free, no-signup tier.",
      ar: "Undetectable.ai مُنسّن إنجليزي معروف. يوازيه صحيحلي بالإنجليزية ويضيف دعماً عربياً حقيقياً وخطة مجانية بلا تسجيل.",
    },
    rows: commonRows(),
    verdict: {
      en: "If you write in Arabic — or in both languages — Sahihly is the more complete choice.",
      ar: "إن كنت تكتب بالعربية — أو باللغتين — فصحيحلي الخيار الأكمل.",
    },
  },
  {
    slug: "quillbot",
    name: "QuillBot",
    title: { en: "Sahihly vs QuillBot", ar: "صحيحلي مقابل QuillBot" },
    intro: {
      en: "QuillBot is a paraphrasing staple for English. Sahihly focuses on AI detection plus meaning-safe humanizing across Arabic and English.",
      ar: "QuillBot أداة إعادة صياغة شهيرة للإنجليزية. يركّز صحيحلي على الكشف والتنسين مع حفظ المعنى بالعربية والإنجليزية.",
    },
    rows: commonRows(),
    verdict: {
      en: "For bilingual detection and humanizing in one place, Sahihly is purpose-built.",
      ar: "للكشف والتنسين ثنائي اللغة في مكان واحد، صحيحلي مبني لهذا الغرض.",
    },
  },
  {
    slug: "gptzero",
    name: "GPTZero",
    title: { en: "Sahihly vs GPTZero", ar: "صحيحلي مقابل GPTZero" },
    intro: {
      en: "GPTZero popularized AI detection for educators. Sahihly offers detection plus humanizing, with first-class Arabic that GPTZero doesn't target.",
      ar: "شهّر GPTZero كشف الذكاء الاصطناعي للمعلّمين. يقدّم صحيحلي الكشف والتنسين معاً، بعربية أصيلة لا يستهدفها GPTZero.",
    },
    rows: commonRows(),
    verdict: {
      en: "Need Arabic, plus the ability to improve text — not just flag it? That's Sahihly.",
      ar: "تحتاج العربية مع القدرة على تحسين النص لا مجرد الإشارة إليه؟ هذا هو صحيحلي.",
    },
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
