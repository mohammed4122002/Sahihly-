"use client";

import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Manual language override. The URL never changes — we store the preference
 * in a cookie and reload so the server re-negotiates the language.
 */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  function switchTo(target: Locale) {
    if (target === locale) return;
    document.cookie = `sahihly_locale=${target}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-sm">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={cn(
            "rounded-full px-3 py-1 font-medium transition-colors",
            l === locale
              ? "bg-violet-400 text-ocean-900"
              : "text-white/60 hover:text-white"
          )}
        >
          {l === "ar" ? "ع" : "EN"}
        </button>
      ))}
    </div>
  );
}
