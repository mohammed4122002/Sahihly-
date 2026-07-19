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
  Share2,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { countWords } from "@/lib/utils";

type Sentence = { text: string; score: number };
type Metrics = {
  burstiness: number;
  diversity: number;
  avgSentenceLen: number;
  aiTells: number;
};
type DetectResp = {
  kind: "detect";
  score: number;
  verdict: "human" | "mixed" | "ai";
  sentences: Sentence[];
  metrics?: Metrics;
  engine: string;
  words: number;
};
type HumanizeResp = {
  kind: "humanize";
  text: string;
  engine: string;
  words: number;
  verify?: { before: number; after: number };
};
type HumanizeStyle = "natural" | "academic" | "casual";

const SAMPLE: Record<Locale, string> = {
  en: "In today's world, artificial intelligence plays a crucial role in transforming industries. Furthermore, it is important to note that businesses must leverage these robust tools to remain competitive. Moreover, the seamless integration of AI delivers a holistic solution that underscores the tapestry of modern innovation.",
  ar: "في عالم اليوم، يلعب الذكاء الاصطناعي دوراً محورياً في تحويل الصناعات. علاوة على ذلك، من الجدير بالذكر أنه يجب على الشركات الاستفادة من هذه الأدوات القوية لتبقى منافسة. بالإضافة إلى ذلك، فإن التكامل السلس للذكاء الاصطناعي يقدّم حلاً شاملاً في نهاية المطاف.",
};

function scoreColor(score: number) {
  if (score >= 65) return "#f87171";
  if (score >= 35) return "#fbbf24";
  return "#4ade80";
}

function MetricBar({
  label,
  value,
  suffix = "%",
  invert = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  invert?: boolean; // true when lower is better (shown neutral)
}) {
  const width = Math.min(Math.max(value, 0), 100);
  const color = invert ? "#97a3bd" : scoreColor(100 - value); // human-like green when high
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>{label}</span>
        <span className="tabular-nums text-white/75">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${suffix === "%" ? width : Math.min(width * 4, 100)}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
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
  initialTab = "detect",
}: {
  locale: Locale;
  dict: Dictionary;
  initialTab?: "detect" | "humanize";
}) {
  const [tab, setTab] = useState<"detect" | "humanize">(initialTab);
  const [style, setStyle] = useState<HumanizeStyle>("natural");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [detect, setDetect] = useState<DetectResp | null>(null);
  const [human, setHuman] = useState<HumanizeResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const inputLang = useMemo(
    () => (text.trim() ? (/[؀-ۿ]/.test(text) ? "AR" : "EN") : null),
    [text]
  );
  const t = dict.tool;

  async function run() {
    setError(null);
    if (!text.trim()) {
      setError(t.empty);
      return;
    }
    setLoading(true);
    setDetect(null);
    setHuman(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, kind: tab, locale, style }),
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

  const [shared, setShared] = useState(false);
  async function shareResult(score: number) {
    const text =
      locale === "ar"
        ? `فحصت نصي على صحيحلي وطلع ${score}٪ ذكاء اصطناعي 🔍 — كاشف مجاني يدعم العربية:`
        : `My text scored ${score}% AI-likelihood on Sahihly 🔍 — free bilingual AI detector:`;
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShared(true);
        setTimeout(() => setShared(false), 1600);
      }
    } catch {
      /* user dismissed the share sheet */
    }
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

      {/* Humanizer style presets */}
      {tab === "humanize" && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/45">{t.styleLabel}:</span>
          {(["natural", "academic", "casual"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              aria-pressed={style === s}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                style === s
                  ? "border-violet-400/60 bg-violet-400/15 text-violet-200"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
              }`}
            >
              {t.styles[s]}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !loading) {
                e.preventDefault();
                run();
              }
            }}
            placeholder={t.placeholder}
            rows={9}
            className="min-h-52 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-violet-400/50"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs text-white/50">
              {inputLang && (
                <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 font-medium text-violet-300">
                  {inputLang}
                </span>
              )}
              <span className={words > 250 ? "text-amber-300" : ""}>
                {words} {t.words}
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
                <div className="relative flex flex-col items-center">
                  <span className="mb-1 text-xs uppercase tracking-wider text-white/40">
                    {t.resultTitle}
                  </span>
                  <button
                    onClick={() => shareResult(detect.score)}
                    className="btn-ghost absolute end-0 top-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                    aria-label="Share result"
                  >
                    {shared ? <Check size={13} /> : <Share2 size={13} />}
                    {shared ? t.copied : locale === "ar" ? "شارك" : "Share"}
                  </button>
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

                {detect.metrics && (
                  <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                        {t.metricsTitle}
                      </span>
                      <span className="text-[10px] text-white/30">{t.metricHumanHint}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <MetricBar label={t.metricBurstiness} value={detect.metrics.burstiness} />
                      <MetricBar label={t.metricDiversity} value={detect.metrics.diversity} />
                      <MetricBar
                        label={t.metricAvgLen}
                        value={detect.metrics.avgSentenceLen}
                        suffix=""
                        invert
                      />
                      <MetricBar
                        label={t.metricTells}
                        value={detect.metrics.aiTells}
                        suffix=""
                        invert
                      />
                    </div>
                  </div>
                )}

                {detect.verdict !== "human" && (
                  <button
                    onClick={() => setTab("humanize")}
                    className="btn-primary mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs"
                  >
                    <Sparkles size={13} /> {t.tabHumanize}
                  </button>
                )}
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
                {human.verify && (
                  <div
                    className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2 ${
                      human.verify.after < human.verify.before
                        ? "border-emerald-500/25 bg-emerald-500/10"
                        : "border-white/15 bg-white/5"
                    }`}
                  >
                    <span
                      className={`text-xs font-medium ${
                        human.verify.after < human.verify.before
                          ? "text-emerald-300"
                          : "text-white/60"
                      }`}
                    >
                      {human.verify.after < human.verify.before ? "✓ " : ""}
                      {t.verifyTitle}
                    </span>
                    <span className="text-xs text-white/70">
                      {t.verifyNote}:{" "}
                      <span className="tabular-nums" style={{ color: scoreColor(human.verify.before) }}>
                        {human.verify.before}%
                      </span>
                      <span className="mx-1.5 inline-block text-white/40 flip-x">→</span>
                      <span className="tabular-nums font-semibold" style={{ color: scoreColor(human.verify.after) }}>
                        {human.verify.after}%
                      </span>
                    </span>
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className="mb-1 block text-[10px] uppercase tracking-wider text-white/35">
                      {t.before}
                    </span>
                    <div className="max-h-44 overflow-y-auto rounded-xl bg-black/20 p-3 text-xs leading-relaxed text-white/50">
                      {text}
                    </div>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] uppercase tracking-wider text-violet-300/80">
                      {t.after}
                    </span>
                    <div className="max-h-44 overflow-y-auto rounded-xl border border-violet-400/20 bg-violet-400/[0.06] p-3 text-xs leading-relaxed">
                      {human.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
