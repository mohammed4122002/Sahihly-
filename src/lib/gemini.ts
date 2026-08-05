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

export async function geminiChat(
  system: string,
  user: string,
  jsonMode: boolean,
  maxTokens: number
): Promise<string> {
  const key = apiKey();
  if (!key) throw new Error("gemini_not_configured");

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
  const parts = json?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p: { text?: string }) => p.text ?? "")
    .join("")
    .trim();
}
