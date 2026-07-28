/**
 * Builds a table of contents from an article's HTML and gives every heading a
 * stable id to link to.
 *
 * Worth doing for more than navigation: generative search engines pull answers
 * at the passage level, and headings that carry their own anchor are what let a
 * result link straight to the section that answered the question rather than to
 * the top of the page.
 *
 * The body is stored as trusted HTML written by staff, so a regex pass is
 * enough here — no untrusted markup reaches this function.
 */

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** Slug that survives Arabic: keep letters and digits from any script, and
 *  fall back to a positional id when a heading is only punctuation. */
function headingId(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-|-$/g, "");
  return base || `section-${index + 1}`;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Returns the body with ids injected into h2/h3, plus the entries for the
 *  contents list. Headings that already carry an id are left alone. */
export function withHeadingIds(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const seen = new Map<string, number>();
  let index = 0;

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (match, lvl: string, attrs: string, inner: string) => {
      const level = Number(lvl) as 2 | 3;
      const text = stripTags(inner);
      if (!text) return match;

      if (/\sid\s*=/.test(attrs)) {
        const existing = attrs.match(/\sid\s*=\s*["']([^"']+)["']/);
        if (existing) toc.push({ id: existing[1], text, level });
        index++;
        return match;
      }

      let id = headingId(text, index);
      // Two sections can legitimately share a heading; keep the anchors unique.
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;

      toc.push({ id, text, level });
      index++;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: out, toc };
}
