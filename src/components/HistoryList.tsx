"use client";

import { useState } from "react";
import { ScanLine, Sparkles, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export type HistoryRow = {
  id: string;
  kind: string;
  word_count: number;
  created_at: string;
  result: { score?: number; verdict?: string } | null;
};

function scoreColor(score: number) {
  if (score >= 65) return "text-red-300 bg-red-500/10 border-red-500/25";
  if (score >= 35) return "text-amber-300 bg-amber-500/10 border-amber-500/25";
  return "text-emerald-300 bg-emerald-500/10 border-emerald-500/25";
}

export default function HistoryList({
  rows: initial,
  locale,
  labels,
}: {
  rows: HistoryRow[];
  locale: Locale;
  labels: { words: string; empty: string; deleted: string };
}) {
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    setBusy(id);
    try {
      const supabase = createClient();
      await supabase.from("analyses").delete().eq("id", id);
      setRows((r) => r.filter((x) => x.id !== id));
    } finally {
      setBusy(null);
    }
  }

  if (rows.length === 0) {
    return <p className="px-5 py-10 text-center text-sm text-white/40">{labels.empty}</p>;
  }

  return (
    <div>
      {rows.map((h) => (
        <div
          key={h.id}
          className="flex items-center gap-3 border-b border-white/5 px-5 py-3 text-sm last:border-0"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/12 text-violet-300">
            {h.kind === "humanize" ? <Sparkles size={15} /> : <ScanLine size={15} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="capitalize text-white/85">{h.kind}</p>
            <p className="text-xs text-white/40">
              {h.word_count} {labels.words} · {formatDate(h.created_at, locale)}
            </p>
          </div>
          {typeof h.result?.score === "number" && (
            <span
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs tabular-nums ${scoreColor(h.result.score)}`}
            >
              {h.result.score}%
            </span>
          )}
          <button
            onClick={() => remove(h.id)}
            disabled={busy === h.id}
            aria-label={labels.deleted}
            className="shrink-0 rounded-lg p-1.5 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
