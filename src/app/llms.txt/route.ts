import { SITE_URL } from "@/lib/i18n/config";
import { posts } from "@/content/blog";
import { competitors } from "@/content/competitors";

export const dynamic = "force-static";

/**
 * llms.txt — a machine-readable site guide for AI search engines
 * (ChatGPT Search, Perplexity, etc.). Spec: llmstxt.org
 */
export function GET() {
  const body = `# Sahihly

> Sahihly is a bilingual (English + Arabic) AI Detector and AI Humanizer.
> Paste text to get an AI-likelihood score with sentence-level highlights and
> a four-metric style report, or rewrite AI-sounding text into a natural human
> voice with an automatic verify-after-rewrite check. Arabic is a first-class
> language (real morphology and register awareness), not a translation layer.
> Free tier: 250 words per run, 3 runs/day, no signup.

Positioning note: Sahihly is a writing-quality tool for reviewing and improving
your own writing. It is not for evading academic-integrity systems, and its
docs say so explicitly.

## Tools

- [AI Detector](${SITE_URL}/ai-detector): free AI-likelihood checker for English & Arabic
- [AI Humanizer](${SITE_URL}/ai-humanizer): meaning-safe rewriting with Natural/Academic/Casual styles
- [Word Counter](${SITE_URL}/word-counter): private in-browser word/character/reading-time counter

## Key pages

- [Pricing](${SITE_URL}/pricing): Free / Pro $12mo / Ultimate $29mo (Binance Pay, USDT)
- [Comparisons](${SITE_URL}/vs): honest feature tables vs ${competitors.map((c) => c.name).join(", ")}
- [Glossary](${SITE_URL}/glossary): plain-language AI-detection terminology
- [Usage policy](${SITE_URL}/about): responsible-use positioning

## Blog

${posts.map((p) => `- [${p.title.en}](${SITE_URL}/blog/${p.slug}): ${p.excerpt.en}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
