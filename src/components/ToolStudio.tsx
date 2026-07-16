"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ScanLine,
  Sparkles,
  Copy,
  Check,
  Download,
  Trash2,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { countWords } from "@/lib/utils";

type Sentence = { text: string; score: number };
type DetectResp = {
  kind: "detect";
  score: number;
  verdict: "human" | "mixed" | "ai";
  sentences: Sentence[];
  engine: string;
  words: number;
};
type HumanizeResp = { kind: "humanize"; text: string; engine: string; words: number };

const SAMPLE: Record<Locale, string> = {
  en: "In today's world, artificial intelligence plays a crucial role in transforming industries. Furthermore, it is important to note that businesses must leverage these robust tools to remain competitive. Moreover, the seamless integration of AI delivers a holistic solution that underscores the tapestry of modern innovation.",
  ar: "في عالم اليوم، يلعب الذكاء الاصطناعي دوراً محورياً في تحويل الصناعات. علاوة على ذلك، من الجدير بالذكر أنه يجب على الشركات الاستفادة من هذه الأدوات القوية لتبقى منافسة. بالإضافة إلى ذلك، فإن التكامل السلس للذكاء الاصطناعي يقدّم حلاً شاملاً في نهاية المطاف.",
};

function scoreColor(score: number) {
  if (score >= 65) return "#f87171";
  if (score >= 35) return "#fbbf24";
  return "#4ade80";
}

function Gauge({ score, label }: { score: number; label: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const color = scoreColor(score);
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="font-display text-4xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {score}%
        </motion.span>
        <span className="mt-1 text-xs text-white/50">{label}</span>
      </div>
    </div>
  );
}

export default function ToolStudio({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [tab, setTab] = useState<"detect" | "humanize">("detect");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [detect, setDetect] = useState<DetectResp | null>(null);
  const [human, setHuman] = useState<HumanizeResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const t = dict.tool;

  async function run() {
    setError(null);
    if (!text.trim()) {
      setError(t.empty);
      return;
    }
    if (words > 250) {
      setError(t.tooLong);
      return;
    }
    setLoading(true);
    setDetect(null);
    setHuman(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, kind: tab, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "limit_reached") setError(t.limitReached);
        else if (data.error === "too_long") setError(t.tooLong);
        else setError(t.empty);
        return;
      }
      if (tab === "detect") setDetect(data);
      else setHuman(data);
    } catch {
      setError(t.empty);
    } finally {
      setLoading(false);
    }
  }

  function copy(value: string) {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function download(value: string) {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sahihly-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const verdictLabel =
    detect?.verdict === "ai"
      ? t.verdictAI
      : detect?.verdict === "mixed"
        ? t.verdictMixed
        : t.verdictHuman;

  return (
    <div className="glow-card glass-strong rounded-3xl p-4 sm:p-6">
      {/* Tabs */}
      <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
        {(["detect", "humanize"] as const).map((k) => (
          <button
            key={k}
            id={k === "detect" ? "detector" : "humanizer"}
            onClick={() => {
              setTab(k);
              setError(null);
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              tab === k ? "bg-violet-400 text-ocean-900" : "text-white/60 hover:text-white"
            }`}
          >
            {k === "detect" ? <ScanLine size={16} /> : <Sparkles size={16} />}
            {k === "detect" ? t.tabDetect : t.tabHumanize}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            rows={9}
            className="min-h-52 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-violet-400/50"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className={words > 250 ? "text-red-400" : ""}>
                {words} / 250 {t.words}
              </span>
              <button
                onClick={() => setText(SAMPLE[locale])}
                className="text-violet-300 hover:text-violet-200"
              >
                {t.sample}
              </button>
              {text && (
                <button
                  onClick={() => {
                    setText("");
                    setDetect(null);
                    setHuman(null);
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  <Trash2 size={13} /> {t.clear}
                </button>
              )}
            </div>
            <button
              onClick={run}
              disabled={loading}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {tab === "detect" ? t.analyzing : t.humanizing}
                </>
              ) : tab === "detect" ? (
                <>
                  <ScanLine size={16} /> {t.analyze}
                </>
              ) : (
                <>
                  <Sparkles size={16} /> {t.humanize}
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              <ShieldAlert size={14} /> {error}
            </p>
          )}
        </div>

        {/* Output */}
        <div className="min-h-52 rounded-2xl border border-white/10 bg-black/10 p-4">
          <AnimatePresence mode="wait">
            {!detect && !human && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-44 flex-col items-center justify-center text-center text-sm text-white/40"
              >
                <Sparkles className="mb-3 text-violet-400/60" />
                {t.disclaimer}
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-44 items-center justify-center"
              >
                <div className="h-24 w-24 rounded-full border-2 border-violet-400/20 border-t-violet-400 ring-spin" />
              </motion.div>
            )}

            {detect && tab === "detect" && (
              <motion.div
                key="detect"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-xs uppercase tracking-wider text-white/40">
                    {t.resultTitle}
                  </span>
                  <Gauge score={detect.score} label={verdictLabel} />
                </div>
                <div className="mt-4 max-h-40 overflow-y-auto rounded-xl bg-black/20 p-3 text-sm leading-relaxed">
                  {detect.sentences.map((s, i) => (
                    <span
                      key={i}
                      style={{
                        background:
                          s.score >= 50
                            ? `rgba(248,113,113,${0.12 + (s.score / 100) * 0.25})`
                            : "transparent",
                      }}
                      className="rounded px-0.5"
                    >
                      {s.text}{" "}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-white/40">{t.highlighted}</p>
              </motion.div>
            )}

            {human && tab === "humanize" && (
              <motion.div
                key="human"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {t.resultHumanTitle}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copy(human.text)}
                      className="btn-ghost inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? t.copied : t.copy}
                    </button>
                    <button
                      onClick={() => download(human.text)}
                      className="btn-ghost inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                    >
                      <Download size={12} /> {t.download}
                    </button>
                  </div>
                </div>
                <div className="max-h-52 overflow-y-auto rounded-xl bg-black/20 p-3 text-sm leading-relaxed">
                  {human.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
