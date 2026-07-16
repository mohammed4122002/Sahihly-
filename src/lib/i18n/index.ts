import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
