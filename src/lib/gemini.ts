/**
 * Google Gemini, called over plain HTTP.
 *
 * No SDK: the surface used here is one POST, and a dependency that ships a
 * whole client library to build one request body is a dependency that has to
 * be kept current for no benefit.
 *
 * This provider exists because it has a genuinely free tier. The detector's
 * statistical engine is a floor, not a ceiling — separating careful human
 * prose from unfilled machine prose needs a language model reading the words,
 * and requiring a paid key to get that meant most deployments never did.
 */

/** Overridable: model names in this family are renamed and retired often. */
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/**
 * Overridable base URL. Exists so the request shape can be exercised against a
 * local stub without a real key, and so a deployment behind an egress proxy has
 * somewhere to point.
 */
const BASE =
  process.env.GEMINI_BASE || "https://generativelanguage.googleapis.com/v1beta";

/** Google's own docs use GOOGLE_API_KEY; AI Studio hands out a "Gemini API key". */
function apiKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
}

export function hasGemini(): boolean {
  return Boolean(apiKey());
}

/**
 * Thinking is on by default in the 2.5 family, and thinking tokens are spent
 * out of maxOutputTokens.
 *
 * This is why a working key still produced "statistical engine only": the
 * detector asks for JSON covering every sentence, the model spent the budget
 * reasoning first, and the reply came back with finishReason MAX_TOKENS and no
 * text at all. Detection wants a scored list, not deliberation, so the budget
 * goes to the answer. GEMINI_THINKING_BUDGET overrides it — a negative value
 * leaves the decision to the model, which is the only option on the Pro models,
 * where asking for zero is rejected outright.
 */
function thinkingConfig(): { thinkingBudget: number } | undefined {
  const raw = (process.env.GEMINI_THINKING_BUDGET || "").trim();
  if (raw) {
    const n = Number(raw);
    if (Number.isFinite(n)) return n < 0 ? undefined : { thinkingBudget: n };
  }
  if (/pro/i.test(GEMINI_MODEL)) return undefined;
  return { thinkingBudget: 0 };
}

export async function geminiChat(
  system: string,
  user: string,
  jsonMode: boolean,
  maxTokens: number
): Promise<string> {
  const key = apiKey();
  if (!key) throw new Error("gemini_not_configured");
  const thinking = thinkingConfig();

  const res = await fetch(
    `${BASE}/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          // Detection should be reproducible: the same passage pasted twice
          // must not come back with two different verdicts.
          temperature: jsonMode ? 0 : 0.7,
          ...(jsonMode ? { responseMimeType: "application/json" } : {}),
          ...(thinking ? { thinkingConfig: thinking } : {}),
        },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    // 429 is the ordinary state of a free key, not an outage. Callers fall
    // back to the statistical engine, so the tool answers either way.
    throw new Error(`gemini_error ${res.status}: ${detail.slice(0, 200)}`);
  }

  const json = await res.json();
  const candidate = json?.candidates?.[0];
  const parts = candidate?.content?.parts;
  const out = Array.isArray(parts)
    ? parts
        .map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim()
    : "";

  // A 200 with no text is the failure that used to be invisible: the caller
  // got "", JSON.parse threw somewhere else, and the log blamed the parser.
  // Gemini says why in finishReason, so pass that on verbatim.
  if (!out) {
    const finish = candidate?.finishReason ?? "none";
    const blocked = json?.promptFeedback?.blockReason;
    const hint =
      finish === "MAX_TOKENS"
        ? " (the token budget was spent before any text was produced — thinking is on, or maxOutputTokens is too low for this passage)"
        : "";
    throw new Error(
      `gemini_empty finishReason=${finish}` +
        (blocked ? ` blockReason=${blocked}` : "") +
        hint
    );
  }

  return out;
}
