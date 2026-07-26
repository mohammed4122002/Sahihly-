"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

type LevelKey = "veryEasy" | "easy" | "medium" | "hard" | "veryHard";

type Labels = {
  placeholder: string;
  clear: string;
  score: string;
  level: string;
  words: string;
  sentences: string;
  avgWords: string;
  longSentences: string;
  hint: string;
  levels: { veryEasy: string; easy: string; medium: string; hard: string; veryHard: string };
  audience: { veryEasy: string; easy: string; medium: string; hard: string; veryHard: string };
};

/** Syllable estimate for English; Arabic uses a vowel-letter proxy. */
function syllables(word: string, isArabic: boolean): number {
  if (isArabic) {
    const vowels = (word.match(/[اويىآأإئؤ]/g) || []).length;
    return Math.max(1, vowels);
  }
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const groups = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

export default function ReadabilityTool({ labels }: { labels: Labels }) {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { score: 0, words: 0, sentences: 0, avg: 0, longCount: 0, key: "medium" as LevelKey };
    }
    const isArabic = /[؀-ۿ]/.test(trimmed);
    const wordList = trimmed.split(/\s+/).filter(Boolean);
    const sentenceList = trimmed
      .split(/[.!?؟۔]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const words = wordList.length;
    const sentences = Math.max(sentenceList.length, 1);
    const syl = wordList.reduce((sum, w) => sum + syllables(w, isArabic), 0);
    const avg = words / sentences;

    // Flesch Reading Ease (works as a usable proxy for Arabic too)
    const raw = 206.835 - 1.015 * avg - 84.6 * (syl / Math.max(words, 1));
    const score = Math.round(Math.min(100, Math.max(0, raw)));

    const longCount = sentenceList.filter(
      (s) => s.split(/\s+/).filter(Boolean).length > 25
    ).length;

    const key: LevelKey =
      score >= 80 ? "veryEasy" : score >= 60 ? "easy" : score >= 45 ? "medium" : score >= 30 ? "hard" : "veryHard";

    return { score, words, sentences, avg: Math.round(avg * 10) / 10, longCount, key };
  }, [text]);

  const color =
    stats.score >= 60 ? "#34d399" : stats.score >= 45 ? "#fbbf24" : "#f87171";

  const tiles = [
    { label: labels.words, value: stats.words.toLocaleString() },
    { label: labels.sentences, value: stats.sentences.toLocaleString() },
    { label: labels.avgWords, value: String(stats.avg) },
    { label: labels.longSentences, value: String(stats.longCount) },
  ];

  return (
    <div className="glow-card glass-strong rounded-3xl p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={labels.placeholder}
            rows={12}
            className="min-h-64 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-violet-400/50"
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs text-white/50 hover:text-white"
            >
              <Trash2 size={13} /> {labels.clear}
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center">
            <p className="text-xs uppercase tracking-wider text-white/40">{labels.score}</p>
            <motion.p
              key={stats.score}
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display mt-1 text-4xl font-bold tabular-nums"
              style={{ color }}
            >
              {stats.score}
            </motion.p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${stats.score}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-white/85">
              {labels.levels[stats.key]}
            </p>
            <p className="mt-1 text-xs text-white/45">{labels.audience[stats.key]}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-xl border border-white/10 bg-black/15 p-3">
                <p className="font-display text-lg font-bold tabular-nums text-violet-200">
                  {t.value}
                </p>
                <p className="mt-0.5 text-[11px] text-white/45">{t.label}</p>
              </div>
            ))}
          </div>

          <p className="rounded-xl bg-white/[0.03] p-3 text-[11px] leading-relaxed text-white/45">
            {labels.hint}
          </p>
        </div>
      </div>
    </div>
  );
}
