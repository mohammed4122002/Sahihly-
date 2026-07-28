"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Language switch as real links, not buttons.
 *
 * The preference still rides on a cookie so the clean URL keeps negotiating,
 * but the Arabic side now has its own addressable pages — and an `<a href>` is
 * the only version of this control a crawler can follow. Rendering it as a
 * button hid the entire Arabic tree behind JavaScript.
 */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  // Strip any /ar prefix so the current page can be expressed in either tree.
  const clean = pathname === "/ar" ? "/" : pathname.replace(/^\/ar(?=\/)/, "");

  function remember(target: Locale) {
    document.cookie = `sahihly_locale=${target}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, clean)}
          hrefLang={l}
          onClick={() => remember(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-3 py-1 font-medium transition-colors",
            l === locale
              ? "bg-violet-400 text-ocean-900"
              : "text-white/60 hover:text-white"
          )}
        >
          {l === "ar" ? "ع" : "EN"}
        </Link>
      ))}
    </div>
  );
}
