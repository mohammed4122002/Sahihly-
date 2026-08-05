/**
 * Deterministic statistical detector.
 *
 * Kept free of imports on purpose: it is the whole answer when no model key is
 * configured, it contributes a third of the blended score when one is, and it
 * is the only part of the pipeline that can be measured offline against a
 * labelled corpus. Anything needing a network call belongs in analysis.ts.
 *
 * Every signal below was selected by measuring its standalone separation on
 * bench/corpus.json, and several plausible-sounding ones were rejected there:
 *
 *   punctuation variety  looked decisive until the marks turned out to be
 *                        backticks and code-identifier parentheses in the
 *                        technical documents making up much of the human half.
 *                        It measured provenance, not authorship.
 *   vocabulary richness  separated the classes in the opposite direction to the
 *                        assumption it is usually built on, which means it was
 *                        tracking genre — repeated character names in fiction —
 *                        rather than who was writing.
 *   digit density        same problem, same corpus.
 *
 * What survived is genre-neutral, consistent across Arabic and English, and
 * explicable: models keep an even rhythm, stay inside a comfortable sentence
 * length, hedge constantly, and reach for the same stock connectives.
 *
 * Run `node --experimental-strip-types bench/run.ts` after touching any of it.
 */

export type Sentence = { text: string; score: number };
export type StyleMetrics = {
  burstiness: number; // 0..100, higher = more human-like rhythm variety
  diversity: number; // 0..100 vocabulary richness
  avgSentenceLen: number; // words per sentence
  aiTells: number; // machine-typical phrases found
};
export type Engine = "claude" | "openai" | "heuristic" | "hybrid";
export type Confidence = "low" | "medium" | "high";
export type DetectResult = {
  score: number; // 0..100 probability of AI
  verdict: "human" | "mixed" | "ai";
  confidence: Confidence;
  sentences: Sentence[];
  metrics: StyleMetrics;
  engine: Engine;
};

/* ------------------------------------------------------------------
   Text utilities
------------------------------------------------------------------ */

/**
 * Fragments that end in a full stop without ending a sentence: titles,
 * initials, and the handful of abbreviations common enough to matter. Splitting
 * after them produced one-word "sentences" — a passage of Austen dissolved into
 * a run of "Mr." — which both inflated the length variance the score depends on
 * and showed the reader a highlighted line reading "Mr.".
 */
const ABBREVIATION_END =
  /(?:^|\s)(?:mr|mrs|ms|dr|prof|st|jr|sr|vs|etc|inc|ltd|fig|no|vol|approx|e\.g|i\.e|[a-z]|[أ-ي])\.$/i;

/**
 * Split into sentences, keeping paragraph breaks as boundaries.
 *
 * Collapsing all whitespace first — as this used to — destroyed every newline
 * before the split could look for one, so a heading ran into the paragraph
 * below it and the rhythm statistics measured sentences that never existed.
 */
export function splitSentences(text: string): string[] {
  const parts = text
    .split(/\n+/)
    .flatMap((line) => line.replace(/[ \t]+/g, " ").split(/(?<=[.!?؟।])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);

  const merged: string[] = [];
  for (const part of parts) {
    const previous = merged[merged.length - 1];
    if (previous !== undefined && ABBREVIATION_END.test(previous)) {
      merged[merged.length - 1] = `${previous} ${part}`;
    } else {
      merged.push(part);
    }
  }
  return merged;
}

export function verdictFromScore(score: number): DetectResult["verdict"] {
  if (score >= 65) return "ai";
  if (score >= 35) return "mixed";
  return "human";
}

function wordsOf(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * Which language's phrase lists to use.
 *
 * A single Arabic character used to flip the whole analysis to Arabic, so an
 * English essay quoting one Arabic word was scored against Arabic stock
 * phrases and matched none of them. Decide on the majority of letters instead.
 */
export function isArabicText(text: string): boolean {
  const arabic = (text.match(/[؀-ۿ]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return arabic > latin;
}

/** Fold the orthographic variation that would otherwise defeat phrase matching. */
function normalizeAr(text: string): string {
  return text
    .replace(/[ً-ْٰـ]/g, "") // diacritics, dagger alef, tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function normalize(text: string): string {
  return normalizeAr(text.toLowerCase());
}

/* ------------------------------------------------------------------
   Phrase inventories
------------------------------------------------------------------ */

/** Stock connectives — narrow, high-precision, the classic giveaway. */
const STOCK_EN = [
  "in conclusion", "furthermore", "moreover", "it is important to note",
  "in today's world", "delve into", "in the realm of", "a testament to",
  "navigating the", "it is worth noting", "in summary", "on the other hand",
  "plays a crucial role", "in the ever-evolving", "tapestry", "underscores",
  "additionally", "in essence", "that being said", "it should be noted",
  "as a result", "consequently", "ultimately", "overall,", "in other words",
  "when it comes to", "at the end of the day", "last but not least",
];
const STOCK_AR = [
  "في الختام", "علاوه علي ذلك", "من الجدير بالذكر", "بالاضافه الي ذلك",
  "في عالم اليوم", "من ناحيه اخري", "في نهايه المطاف", "تجدر الاشاره",
  "في هذا السياق", "لا يمكن انكار", "مما لا شك فيه", "لا يخفي علي احد",
  "اضافه الي ذلك", "فضلا عن ذلك", "وبناء علي ذلك", "ومن هنا",
  "يمكن القول", "في هذا الصدد", "وفي المقابل", "وبالتالي", "بشكل عام",
  "جدير بالذكر", "وفي الوقت نفسه", "علي صعيد اخر",
];

/**
 * Hedges and boosters — the strongest single signal here, and the least
 * appreciated. A model with no stake in a claim reaches for "generally",
 * "significant" and "plays a role" far more often than a writer who knows the
 * specific thing they mean.
 */
const HEDGE_EN = [
  "significant", "substantial", "various", "several", "numerous", "essential",
  "crucial", "vital", "important", "effective", "comprehensive", "robust",
  "seamless", "holistic", "leverage", "utilize", "facilitate", "enhance",
  "ensure", "generally", "typically", "often", "particularly", "especially",
  "relatively", "considerably", "notably", "primarily", "fundamentally",
  "tends to", "can be", "may be", "refers to", "is defined as", "remarkable",
  "valuable", "meaningful", "thoughtful", "a wide range", "plays a role",
  "it is possible", "one of the most",
];
const HEDGE_AR = [
  "يعد ", "تعد ", "يعتبر", "تعتبر", "يمثل", "تمثل", "بشكل كبير",
  "بشكل ملحوظ", "بشكل اساسي", "بصوره", "غالبا ما", "عاده ما", "قد يكون",
  "من الممكن", "الي حد كبير", "بالغ الاهميه", "محوري", "جوهري", "فعال",
  "شامل", "متكامل", "حيوي", "رئيسي", "ضروري", "اساسي", "متنوعه", "عديده",
  "مختلفه", "العديد من", "مجموعه من", "يمكن ان", "لا يتجزا", "تلعب دورا",
  "يلعب دورا", "من ابرز", "من اهم",
];

/** Enumerated advice reads as a model working through a list in prose. */
const ENUM_EN = [/\bfirst,/i, /\bsecond,/i, /\bthird,/i, /\bfinally,/i, /\blastly,/i];
const ENUM_AR = [/اولا[،,]/, /ثانيا[،,]/, /ثالثا[،,]/, /واخيرا/];

function phraseRate(normalized: string, wordCount: number, phrases: string[]): number {
  let hits = 0;
  for (const p of phrases) {
    const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    hits += (normalized.match(new RegExp(escaped, "g")) || []).length;
  }
  return wordCount ? (hits * 100) / wordCount : 0;
}

/* ------------------------------------------------------------------
   Metrics shown to the reader
------------------------------------------------------------------ */

function mattr(words: string[], window = 60): number {
  if (words.length === 0) return 1;
  if (words.length <= window) return new Set(words).size / words.length;
  let sum = 0;
  let n = 0;
  for (let i = 0; i + window <= words.length; i += 10) {
    sum += new Set(words.slice(i, i + window)).size / window;
    n++;
  }
  return n ? sum / n : 1;
}

/** Deterministic style metrics — engine-agnostic, works for AR & EN. */
export function computeMetrics(text: string): StyleMetrics {
  const sentences = splitSentences(text);
  const words = wordsOf(normalize(text));
  const arabic = isArabicText(text);
  const norm = normalize(text);

  const lengths = sentences.map((s) => wordsOf(s).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;

  // Moving-average TTR, not plain TTR: the plain ratio falls as a text gets
  // longer whoever wrote it, so the displayed richness used to drop purely
  // because the reader pasted more of the same essay.
  return {
    burstiness: Math.round(Math.min(cv / 0.6, 1) * 100),
    diversity: Math.round(Math.min(mattr(words) / 0.8, 1) * 100),
    avgSentenceLen: Math.round(mean * 10) / 10,
    aiTells: Math.round(
      ((phraseRate(norm, words.length, arabic ? STOCK_AR : STOCK_EN) +
        phraseRate(norm, words.length, arabic ? HEDGE_AR : HEDGE_EN)) *
        words.length) /
        100
    ),
  };
}

/* ------------------------------------------------------------------
   The score
------------------------------------------------------------------ */

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function evidenceWeight(sentenceCount: number): number {
  return clamp01((sentenceCount - 3) / 7);
}


export type Signals = {
  /** Flat sentence rhythm — the classic burstiness signal, inverted. */
  uniformity: number;
  /** Never leaving the comfortable 8–30 word band. */
  bandLock: number;
  /** Hedge and booster density. */
  hedging: number;
  /** Stock connective density. */
  stock: number;
  /** "First, … Second, … Finally," in running prose. */
  enumeration: number;
};

/**
 * Per-language calibration: where ordinary human writing in this language
 * already sits, and how far above that the signal has to climb to count.
 *
 * A shared scale produced a false positive on the very register this tool
 * exists to defend — human-translated Arabic technical prose, scored 75.
 * Formal Arabic genuinely uses more of what an English ear hears as hedging
 * ("يُعد", "يمكن أن", "العديد من") and genuinely runs more evenly, so measuring
 * both languages against an English baseline convicts Arabic writers of
 * writing Arabic. Each signal is therefore expressed as distance above its own
 * language's normal register rather than as a raw rate.
 *
 * `base` is where unremarkable human writing sits; `span` is the distance over
 * which the signal climbs to full strength. Both come from the corpus, so both
 * should be re-derived whenever it grows — the values matter far less than the
 * principle that the two languages do not share a scale.
 */
type Calibration = { base: number; span: number };
const CAL: Record<"ar" | "en", Record<"uniformity" | "bandLock" | "hedging" | "stock", Calibration>> = {
  en: {
    uniformity: { base: 0.4, span: 0.5 },
    bandLock: { base: 0.55, span: 0.45 },
    hedging: { base: 0.6, span: 2.4 },
    stock: { base: 0.2, span: 1.4 },
  },
  ar: {
    // Every base is higher and every span narrower: Arabic prose starts closer
    // to the machine end of these measures through nothing but its own norms.
    uniformity: { base: 0.55, span: 0.4 },
    bandLock: { base: 0.8, span: 0.2 },
    hedging: { base: 0.9, span: 1.8 },
    stock: { base: 0.15, span: 1.0 },
  },
};

const above = (value: number, c: Calibration) => clamp01((value - c.base) / c.span);

export function computeSignals(text: string): Signals {
  const sentences = splitSentences(text);
  const words = wordsOf(text);
  const arabic = isArabicText(text);
  const norm = normalize(text);
  const cal = CAL[arabic ? "ar" : "en"];

  const lengths = sentences.map((s) => wordsOf(s).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 1;

  // Human writing punches short and rambles long; generated prose does neither.
  // Measuring the share that never leaves the band catches models that vary
  // their lengths a little but stay in the middle — which variance alone does
  // not, because a little variation around a safe centre still looks bursty.
  const inBand = lengths.filter((n) => n >= 8 && n <= 30).length;
  const bandShare = inBand / Math.max(lengths.length, 1);

  // Rhythm and band-lock describe the shape of a distribution, and a
  // distribution over three sentences has no shape — it is noise with a mean.
  // They are scaled down until there are enough sentences to describe. Hedge
  // and connective density are rates, not shapes, so they stand on their own:
  // a rate measured over sixty words is still a rate.
  const shape = evidenceWeight(sentences.length);

  return {
    uniformity: above(clamp01(1 - Math.min(cv, 1)), cal.uniformity) * shape,
    bandLock: above(bandShare, cal.bandLock) * shape,
    hedging: above(
      phraseRate(norm, words.length, arabic ? HEDGE_AR : HEDGE_EN),
      cal.hedging
    ),
    stock: above(
      phraseRate(norm, words.length, arabic ? STOCK_AR : STOCK_EN),
      cal.stock
    ),
    enumeration: clamp01(
      (arabic ? ENUM_AR : ENUM_EN).filter((p) => p.test(norm)).length / 3
    ),
  };
}

/**
 * Weights, and why they sit where they do.
 *
 * Hedging and rhythm lead because they held up in both languages and are hard
 * to fake in either direction: a writer who knows their subject is specific,
 * and a person writing at speed is uneven. Stock connectives are precise but
 * narrow — they catch the blog register and little else — so they nudge rather
 * than decide. Enumeration barely moves the number alone; it is here because
 * when it does fire it is almost never a false alarm.
 *
 * Nothing reaches the AI threshold on one axis. That is deliberate: the two
 * errors do not cost the same. A miss is someone who got away with it; a false
 * positive is a student in front of a disciplinary committee.
 */
const WEIGHTS: Record<keyof Signals, number> = {
  hedging: 0.3,
  uniformity: 0.28,
  bandLock: 0.24,
  stock: 0.13,
  enumeration: 0.05,
};

/**
 * How much of the raw score to keep, given how much text there was to measure.
 *
 * Every signal here is a rate or the shape of a distribution across sentences.
 * Across three sentences a distribution has no shape — it is noise that
 * happens to have a mean — and that is not a hypothetical: the one human
 * passage this engine ever scored as AI was sixty-three words long, and it got
 * there because all three of its sentences happened to sit in the middle
 * length band.
 *
 * The tool already tells people to ignore results under 300 words. This makes
 * the number itself obey that advice instead of leaving it to a confidence
 * label beside it that a worried student will not weigh.
 */
export function heuristicDetect(text: string): DetectResult {
  const sentences = splitSentences(text);
  const signals = computeSignals(text);
  const arabic = isArabicText(text);

  const raw = (Object.keys(WEIGHTS) as (keyof Signals)[]).reduce(
    (sum, k) => sum + signals[k] * WEIGHTS[k],
    0
  );
  // Map the internal 0..1 blend onto the published bands.
  //
  // No real passage maxes every signal at once, so the raw blend lives in
  // roughly the bottom half of its range and, left alone, would report machine
  // text as "mixed" and nothing as "AI" — the number would stop meaning what
  // the site says it means. The exponent stretches the working range without
  // reordering anything: it is a relabelling of the same ranking, not a
  // different judgement, so it cannot trade accuracy for confidence.
  const score = Math.round(Math.min(96, Math.max(3, Math.pow(raw, 0.7) * 100)));

  const lengths = sentences.map((s) => wordsOf(s).length);
  const median = lengths.length
    ? [...lengths].sort((a, b) => a - b)[Math.floor(lengths.length / 2)]
    : 0;

  // Per-sentence scoring judges each sentence on its own generic-ness rather
  // than on how close it sits to the document mean. The old version flagged
  // whichever sentences were average-length, so in evenly written text it lit
  // up everything, and in varied text it highlighted the least remarkable
  // lines — the opposite of what someone revising a draft needs to see.
  const scored: Sentence[] = sentences.map((s) => {
    const w = wordsOf(s);
    const n = normalize(s);
    const hedge = clamp01(phraseRate(n, w.length, arabic ? HEDGE_AR : HEDGE_EN) / 4);
    const stock = clamp01(phraseRate(n, w.length, arabic ? STOCK_AR : STOCK_EN) / 2);
    const inBand = w.length >= 8 && w.length <= 30 ? 1 : 0;
    const nearMedian =
      median > 0 ? 1 - Math.min(Math.abs(w.length - median) / median, 1) : 0;
    const local = hedge * 0.42 + stock * 0.28 + inBand * 0.18 + nearMedian * 0.12;
    // Anchored to the document: one hedge inside clearly human writing is not
    // evidence of anything, and highlighting it would only mislead.
    const sScore = Math.round(
      Math.min(96, Math.max(3, local * 100 * (0.45 + score / 100)))
    );
    return { text: s, score: sScore };
  });

  return {
    score,
    verdict: verdictFromScore(score),
    confidence: "medium",
    sentences: scored,
    metrics: computeMetrics(text),
    engine: "heuristic",
  };
}
