import { getAnthropic, hasAnthropic, MODEL } from "./anthropic";

export type Sentence = { text: string; score: number };
export type StyleMetrics = {
  burstiness: number; // 0..100, higher = more human-like rhythm variety
  diversity: number; // 0..100 vocabulary richness (type-token ratio)
  avgSentenceLen: number; // words per sentence
  aiTells: number; // count of machine-typical phrases found
};
export type DetectResult = {
  score: number; // 0..100 probability of AI
  verdict: "human" | "mixed" | "ai";
  sentences: Sentence[];
  metrics: StyleMetrics;
  engine: "claude" | "heuristic";
};
export type HumanizeStyle = "natural" | "academic" | "casual";
export type HumanizeResult = {
  text: string;
  engine: "claude" | "heuristic";
};

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?؟।])\s+|(?<=\n)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function verdictFromScore(score: number): DetectResult["verdict"] {
  if (score >= 65) return "ai";
  if (score >= 35) return "mixed";
  return "human";
}

/* ------------------------------------------------------------------
   Heuristic detector (fallback when no ANTHROPIC_API_KEY).
   Uses lexical & structural signals: repetition, low burstiness,
   uniform sentence length, and common "AI tell" phrases.
   Works for both English and Arabic.
------------------------------------------------------------------ */
const AI_TELLS_EN = [
  "in conclusion", "furthermore", "moreover", "it is important to note",
  "in today's world", "delve into", "in the realm of", "a testament to",
  "navigating the", "it is worth noting", "in summary", "on the other hand",
  "plays a crucial role", "in the ever-evolving", "tapestry", "underscores",
  "seamless", "leverage", "robust", "holistic",
];
const AI_TELLS_AR = [
  "في الختام", "علاوة على ذلك", "من الجدير بالذكر", "بالإضافة إلى ذلك",
  "في عالم اليوم", "من ناحية أخرى", "يلعب دوراً", "في نهاية المطاف",
  "تجدر الإشارة", "بشكل عام", "في هذا السياق", "لا يمكن إنكار",
];

/** Deterministic style metrics — engine-agnostic, works for AR & EN. */
export function computeMetrics(text: string): StyleMetrics {
  const sentences = splitSentences(text);
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const isArabic = /[؀-ۿ]/.test(text);
  const tells = isArabic ? AI_TELLS_AR : AI_TELLS_EN;

  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
  // cv 0 => perfectly uniform (machine-like); cv >= 0.6 => very bursty (human-like)
  const burstiness = Math.round(Math.min(cv / 0.6, 1) * 100);

  const unique = new Set(words).size;
  const ttr = words.length ? unique / words.length : 1;
  const diversity = Math.round(Math.min(ttr / 0.8, 1) * 100);

  const lower = text.toLowerCase();
  let aiTells = 0;
  for (const t of tells) if (lower.includes(t)) aiTells++;

  return {
    burstiness,
    diversity,
    avgSentenceLen: Math.round(mean * 10) / 10,
    aiTells,
  };
}

/** Cheap deterministic AI-style score, used for the humanize verify loop. */
export function styleSignalScore(text: string): number {
  return heuristicDetect(text).score;
}

function heuristicDetect(text: string): DetectResult {
  const sentences = splitSentences(text);
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const isArabic = /[؀-ۿ]/.test(text);
  const tells = isArabic ? AI_TELLS_AR : AI_TELLS_EN;

  // 1) sentence-length uniformity (AI tends to be uniform -> low variance)
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 1; // coefficient of variation
  const uniformity = Math.max(0, 1 - Math.min(cv, 1)); // 0..1, higher = more uniform

  // 2) lexical repetition (type-token ratio); AI often lower diversity in long text
  const unique = new Set(words).size;
  const ttr = words.length ? unique / words.length : 1;
  const repetition = Math.max(0, 0.75 - ttr) / 0.75; // 0..1

  // 3) AI tell phrases density
  const lower = text.toLowerCase();
  let tellHits = 0;
  for (const t of tells) if (lower.includes(t)) tellHits++;
  const tellSignal = Math.min(tellHits / 3, 1);

  // 4) punctuation regularity — very even comma usage
  const commaRatio =
    (text.match(/[,،]/g)?.length || 0) / Math.max(sentences.length, 1);
  const commaSignal = commaRatio > 1.5 ? Math.min((commaRatio - 1.5) / 2, 1) : 0;

  const raw =
    uniformity * 0.4 + repetition * 0.25 + tellSignal * 0.25 + commaSignal * 0.1;
  const score = Math.round(Math.min(96, Math.max(4, raw * 100)));

  // per-sentence scoring
  const scored: Sentence[] = sentences.map((s) => {
    const sl = s.split(/\s+/).length;
    const near = mean > 0 ? 1 - Math.min(Math.abs(sl - mean) / mean, 1) : 0.5;
    let sTell = 0;
    for (const t of tells) if (s.toLowerCase().includes(t)) sTell = 1;
    const sScore = Math.round(
      Math.min(96, Math.max(4, (near * 0.55 + sTell * 0.45) * 100 * (score / 60)))
    );
    return { text: s, score: sScore };
  });

  return {
    score,
    verdict: verdictFromScore(score),
    sentences: scored,
    metrics: computeMetrics(text),
    engine: "heuristic",
  };
}

/* ------------------------------------------------------------------
   Claude-powered detector
------------------------------------------------------------------ */
async function claudeDetect(text: string, locale: string): Promise<DetectResult> {
  const anthropic = getAnthropic();
  const sys = `You are an expert writing-style analyst for the tool "Sahihly". You assess how likely a passage was AI-generated based on stylistic and structural signals (burstiness, perplexity proxies, uniformity, hedging phrases, generic transitions). You fully understand both Modern Standard Arabic and native English. Never claim certainty; you estimate. Respond with ONLY valid JSON.`;
  const prompt = `Analyze the following text (language: ${locale}). Return JSON:
{"score": <int 0-100 probability AI-generated>, "sentences": [{"text": "<sentence>", "score": <int 0-100>}]}
Split the passage into its sentences and score each. Keep sentence text verbatim.

TEXT:
"""${text}"""`;

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: sys,
    messages: [{ role: "user", content: prompt }],
  });
  const raw = msg.content.find((c) => c.type === "text");
  const jsonText = raw && "text" in raw ? raw.text : "{}";
  const parsed = JSON.parse(jsonText.replace(/```json|```/g, "").trim());
  const score = Math.min(100, Math.max(0, Math.round(parsed.score ?? 50)));
  const sentences: Sentence[] = Array.isArray(parsed.sentences)
    ? parsed.sentences.map((s: { text: string; score: number }) => ({
        text: String(s.text),
        score: Math.min(100, Math.max(0, Math.round(s.score ?? score))),
      }))
    : splitSentences(text).map((t) => ({ text: t, score }));
  return {
    score,
    verdict: verdictFromScore(score),
    sentences,
    metrics: computeMetrics(text),
    engine: "claude",
  };
}

export async function detectAI(text: string, locale: string): Promise<DetectResult> {
  if (hasAnthropic()) {
    try {
      return await claudeDetect(text, locale);
    } catch {
      return heuristicDetect(text);
    }
  }
  return heuristicDetect(text);
}

/* ------------------------------------------------------------------
   Humanizer
------------------------------------------------------------------ */
function heuristicHumanize(text: string, isArabic: boolean): string {
  let out = text;
  const swaps: [RegExp, string][] = isArabic
    ? [
        [/علاوة على ذلك/g, "كمان"],
        [/بالإضافة إلى ذلك/g, "وأيضاً"],
        [/من الجدير بالذكر أنه?/g, "المهم إنه"],
        [/في الختام/g, "بالنهاية"],
        [/في نهاية المطاف/g, "بالآخر"],
        [/يلعب دوراً/g, "له دور"],
      ]
    : [
        // compound phrases first so they don't get double-replaced
        [/\bFurthermore, it is important to note that\b/gi, "And worth noting:"],
        [/\bMoreover, it is important to\b/gi, "It also matters to"],
        [/\bFurthermore,?\b/gi, "Also,"],
        [/\bMoreover,?\b/gi, "On top of that,"],
        [/\bIn addition,?\b/gi, "Plus,"],
        [/\bIn conclusion,?\b/gi, "So, to wrap up,"],
        [/\bIt is important to note that\b/gi, "Worth mentioning:"],
        [/\bIt is important to consider\b/gi, "Take a moment to consider"],
        [/\bIt is important to\b/gi, "It matters to"],
        [/\bIn today'?s world,?\b/gi, "These days,"],
        [/\bin the ever-evolving\b/gi, "in the fast-moving"],
        [/\bplays a crucial role\b/gi, "really matters"],
        [/\bdelve into\b/gi, "dig into"],
        [/\bseamless\b/gi, "smooth"],
        [/\bholistic\b/gi, "well-rounded"],
        [/\brobust\b/gi, "solid"],
        [/\bleverage\b/gi, "use"],
        [/\butilize\b/gi, "use"],
      ];
  for (const [re, rep] of swaps) out = out.replace(re, rep);
  // soften semicolons
  out = out.replace(/;\s+/g, isArabic ? "، و" : ". ");
  // cleanup: collapse doubled punctuation/spaces left by swaps
  out = out
    .replace(/،\s*،/g, "،")
    .replace(/,\s*,/g, ",")
    .replace(/\s+([,.،])/g, "$1")
    .replace(/([,.])\s*([,.])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Rhythm surgery: raise burstiness by splitting long sentences at a
  // mid-comma and merging consecutive short ones. This is what actually
  // moves machine-uniform text toward human unevenness.
  const sentences = splitSentences(out);
  if (sentences.length >= 2) {
    const lens = sentences.map((s) => s.split(/\s+/).length);
    const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
    const variance =
      lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length;
    const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
    const veryUniform = cv < 0.35; // machine-flat rhythm: force alternation
    const comma = isArabic ? "،" : ",";
    const rebuilt: string[] = [];
    let i = 0;
    while (i < sentences.length) {
      const s = sentences[i];
      const len = lens[i];
      const next = sentences[i + 1];
      const nextLen = lens[i + 1] ?? 0;

      if (len > mean * 1.3 && s.includes(comma + " ")) {
        // split near the middle comma
        const parts = s.split(comma + " ");
        let acc = parts[0];
        let k = 1;
        while (k < parts.length - 1 && acc.length < s.length / 2) {
          acc += comma + " " + parts[k];
          k++;
        }
        const rest = parts.slice(k).join(comma + " ");
        if (rest.trim()) {
          const first = /[.!?؟]$/.test(acc) ? acc : acc + ".";
          const second = rest.charAt(0).toUpperCase() + rest.slice(1);
          rebuilt.push(first, isArabic ? rest : second);
          i++;
          continue;
        }
      }

      const mergeable =
        next !== undefined &&
        ((len < mean * 0.75 && nextLen < mean * 0.75) ||
          // flat machine rhythm: force a merge on alternating pairs
          (veryUniform && i % 3 === 1 && len + nextLen < mean * 2.6));
      if (mergeable) {
        const head = s.replace(/[.!?؟]$/, "");
        const tail = isArabic ? next : next.charAt(0).toLowerCase() + next.slice(1);
        rebuilt.push(`${head}${isArabic ? "، و" : ", and "}${tail}`);
        i += 2;
        continue;
      }

      rebuilt.push(s);
      i++;
    }
    out = rebuilt.join(" ");
  }

  return out.trim();
}

const STYLE_INSTRUCTIONS: Record<HumanizeStyle, string> = {
  natural:
    "Target register: the author's own natural voice — balanced, neither formal nor slangy.",
  academic:
    "Target register: polished academic prose — precise, measured, formal, but still with human rhythm variety. For Arabic: فصحى رصينة بأسلوب أكاديمي متزن.",
  casual:
    "Target register: relaxed, conversational, approachable — contractions and light phrasing welcome. For Arabic: فصحى مبسّطة قريبة من القارئ دون عامية مبتذلة.",
};

async function claudeHumanize(
  text: string,
  locale: string,
  style: HumanizeStyle
): Promise<string> {
  const anthropic = getAnthropic();
  const sys = `You are "Sahihly"'s humanizer. Rewrite AI-sounding text so it reads as natural human writing while preserving the EXACT original meaning, facts, and language (${locale}). Vary sentence length and rhythm, remove robotic transitions and repetition. ${STYLE_INSTRUCTIONS[style]} For Arabic, produce fluent, grammatically correct Modern Standard Arabic. Do NOT add facts, do NOT translate, do NOT add commentary. Output ONLY the rewritten text.`;
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4000,
    system: sys,
    messages: [{ role: "user", content: text }],
  });
  const raw = msg.content.find((c) => c.type === "text");
  return raw && "text" in raw ? raw.text.trim() : text;
}

export async function humanizeText(
  text: string,
  locale: string,
  style: HumanizeStyle = "natural"
): Promise<HumanizeResult> {
  const isArabic = /[؀-ۿ]/.test(text);
  if (hasAnthropic()) {
    try {
      return { text: await claudeHumanize(text, locale, style), engine: "claude" };
    } catch {
      return { text: heuristicHumanize(text, isArabic), engine: "heuristic" };
    }
  }
  return { text: heuristicHumanize(text, isArabic), engine: "heuristic" };
}
