import { SITE_URL, type Locale } from "@/lib/i18n/config";

/**
 * Language routing for crawlers.
 *
 * Visitors get one clean URL per page and the language is negotiated from
 * Accept-Language. That is pleasant for people and invisible to search
 * engines: Googlebot crawls with `en-US`, so it only ever saw the English
 * rendering, and every Arabic page on the site was unindexable — which is
 * exactly why the site surfaced for "ai detector arabic" with an English
 * snippet and no clicks.
 *
 * So Arabic gets its own addressable tree under `/ar`. The clean URL stays
 * the English canonical and keeps negotiating for humans; `/ar/...` is a
 * stable Arabic document a crawler can index and a reader can share. The two
 * are tied together with hreflang so Google treats them as one page in two
 * languages rather than as duplicates.
 */

/** The crawlable URL for `path` in `locale`. Paths are root-relative ("/blog"). */
export function localePath(locale: Locale, path: string): string {
  if (locale !== "ar") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/**
 * Absolute URL of `path` in `locale` — for structured data, where a URL naming
 * the English page inside an Arabic document tells a crawler the two are the
 * same document and undoes the canonical it was just given.
 *
 * This is for *page* URLs only. Entity identifiers (the organization, an
 * author) stay locale-independent on purpose: they name one thing that happens
 * to be described in two languages.
 */
export function pageUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;
}

/**
 * The prefix navigation should carry, given the URL currently in the address
 * bar. Inside `/ar` every link stays inside `/ar`, so a crawler that enters the
 * Arabic tree can walk all of it; on a clean URL links stay clean, so a reader
 * who never asked for `/ar` never sees it appear.
 */
export function treeBase(pathname: string | null | undefined): "" | "/ar" {
  if (!pathname) return "";
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "/ar" : "";
}

/**
 * `alternates` for a page's metadata: a self-referencing canonical plus the
 * hreflang set. The hreflang links are what let a crawler discover the Arabic
 * tree at all, since the site's own navigation uses clean URLs.
 */
export function alternatesFor(locale: Locale, path: string) {
  const en = path;
  const ar = localePath("ar", path);
  return {
    canonical: locale === "ar" ? ar : en,
    languages: {
      en,
      ar,
      // Nothing here is region-specific, so x-default points at the negotiating
      // URL — a visitor from anywhere lands on their own language.
      "x-default": en,
    },
  };
}
