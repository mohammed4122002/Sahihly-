import { revalidatePath } from "next/cache";

/**
 * Refresh the public pages that render account- or article-derived data.
 *
 * Every public route lives under the `[locale]` segment, so a plain
 * `revalidatePath("/blog")` matches nothing — the route Next knows about is
 * `/[locale]/blog`. Passing the route pattern with `"page"` clears both
 * language versions at once, which is what these callers always meant.
 */
export function revalidateArticlePages() {
  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]/blog/[slug]", "page");
  revalidatePath("/[locale]", "page");
}

/**
 * A profile edit changes how someone appears everywhere they are credited —
 * their own page, the team list on /about, and the byline and author box on
 * every article they wrote. Refreshing only the page being edited is what let
 * /about keep showing a stale name and photo long after both had changed.
 */
export function revalidateAuthorPages() {
  revalidatePath("/[locale]/author/[username]", "page");
  revalidatePath("/[locale]/about", "page");
  revalidateArticlePages();
}
