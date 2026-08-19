/**
 * UI labels for the word counter and readability checker, shared between the
 * tool's own hub page and every use-case page under it.
 *
 * These used to live inline in each hub page's copy object, which was fine
 * while there was one page per tool. Once a use-case page needed to render
 * the same tool with different surrounding copy, inlining would have meant
 * five more copies of the same button labels to keep in sync by hand.
 */
import type { Locale } from "@/lib/i18n/config";
import type { Labels as WordCounterLabels } from "@/components/WordCounterTool";
import type { Labels as ReadabilityLabels } from "@/components/ReadabilityTool";

export const wordCounterLabels: Record<Locale, WordCounterLabels> = {
  en: {
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
  ar: {
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
};

export const readabilityLabels: Record<Locale, ReadabilityLabels> = {
  en: {
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
  ar: {
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
};
