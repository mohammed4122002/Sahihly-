"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

type Labels = {
  placeholder: string;
  words: string;
  chars: string;
  charsNoSpaces: string;
  sentences: string;
  paragraphs: string;
  readingTime: string;
  speakingTime: string;
  minutes: string;
  clear: string;
};

export default function WordCounterTool({ labels }: { labels: Labels }) {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?؟۔]+/).map((s) => s.trim()).filter(Boolean).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n{2,}|\n/).map((p) => p.trim()).filter(Boolean).length
      : 0;
    const readingMin = Math.max(words / 200, 0);
    const speakingMin = Math.max(words / 130, 0);
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingMin, speakingMin };
  }, [text]);

  const fmt = (min: number) =>
    min < 1 ? `${Math.ceil(min * 60)}s` : `${Math.ceil(min)} ${labels.minutes}`;

  const tiles = [
    { label: labels.words, value: stats.words.toLocaleString() },
    { label: labels.chars, value: stats.chars.toLocaleString() },
    { label: labels.charsNoSpaces, value: stats.charsNoSpaces.toLocaleString() },
    { label: labels.sentences, value: stats.sentences.toLocaleString() },
    { label: labels.paragraphs, value: stats.paragraphs.toLocaleString() },
    { label: labels.readingTime, value: fmt(stats.readingMin) },
    { label: labels.speakingTime, value: fmt(stats.speakingMin) },
  ];

  return (
    <div className="glow-card glass-strong rounded-3xl p-4 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
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
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {tiles.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="font-display text-2xl font-bold tabular-nums text-violet-200">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
