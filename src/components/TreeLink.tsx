"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { treeBase } from "@/lib/seo";
import type { ComponentProps } from "react";

/**
 * A link that stays in the language tree it was clicked from.
 *
 * Server components cannot see the request path, so a plain `<Link href="/blog/x">`
 * inside the Arabic tree sends the reader — and any crawler — back out to the
 * English clean URL. That leaves the Arabic articles reachable only through the
 * sitemap. Rendering the link on the client lets it read the real path and keep
 * `/ar` where `/ar` was asked for.
 */
export default function TreeLink({
  href,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const base = treeBase(usePathname());
  // Only site-internal paths get a tree. Absolute URLs, mailto: and bare
  // fragments are left exactly as written.
  const target = href.startsWith("/") ? `${base}${href}` : href;
  return <Link href={target} {...rest} />;
}
