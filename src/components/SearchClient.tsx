"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, FileText, Wrench, BookMarked, Scale } from "lucide-react";

export type SearchItem = {
  title: string;
  desc: string;
  href: string;
  type: "tool" | "article" | "term" | "compare";
};

const typeIcons = {
  tool: Wrench,
  article: FileText,
  term: BookMarked,
  compare: Scale,
};

export default function SearchClient({
  items,
  labels,
}: {
  items: SearchItem[];
  labels: { placeholder: string; empty: string; types: Record<SearchItem["type"], string> };
}) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query)
    );
  }, [q, items]);

  return (
    <div>
      <div className="relative">
        <Search
          size={18}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.placeholder}
          className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 ps-12 pe-4 text-base outline-none transition-colors focus:border-violet-400/50"
        />
      </div>

      <div className="mt-6 space-y-3">
        {results.length === 0 ? (
          <p className="py-12 text-center text-sm text-white/40">{labels.empty}</p>
        ) : (
          results.map((r) => {
            const Icon = typeIcons[r.type];
            return (
              <Link
                key={r.href + r.title}
                href={r.href}
                className="glass group flex items-start gap-4 rounded-2xl p-5 transition-colors hover:border-violet-400/30"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/12 text-violet-300">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold transition-colors group-hover:text-violet-200">
                      {r.title}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                      {labels.types[r.type]}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-white/50">{r.desc}</span>
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
