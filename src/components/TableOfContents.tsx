"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocEntry } from "@/lib/toc";

/**
 * Sticky contents list with the current section highlighted.
 *
 * Hidden below xl: on a narrow screen a long contents list pushes the article
 * itself off the first screen, which costs more than the navigation gains.
 */
export default function TableOfContents({
  entries,
  label,
}: {
  entries: TocEntry[];
  label: string;
}) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    // rootMargin pins the trigger line near the top of the viewport, so a
    // section counts as current once its heading reaches the reading area
    // rather than when it first peeks in from the bottom.
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    <nav aria-label={label} className="sticky top-24 max-h-[70vh] overflow-y-auto">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
        <List size={14} /> {label}
      </p>
      <ul className="mt-4 space-y-1 border-s border-white/10 ps-4">
        {entries.map((e) => (
          <li key={e.id} className={e.level === 3 ? "ps-3" : undefined}>
            <a
              href={`#${e.id}`}
              className={`block py-1 text-sm leading-snug transition-colors ${
                active === e.id
                  ? "font-medium text-violet-200"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
