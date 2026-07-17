"use client";

import { useRef, useState } from "react";

/* Validated on #0b1f3a dark surface (dataviz six checks: all pass) */
export const SERIES = {
  violet: "#8b76d9",
  teal: "#0d9488",
};

type Tip = { x: number; y: number; label: string; lines: string[] } | null;

function useTooltip() {
  const [tip, setTip] = useState<Tip>(null);
  return { tip, setTip };
}

function TooltipBox({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-white/15 bg-[#0b1f3a] px-3 py-2 text-xs shadow-xl"
      style={{ left: tip.x, top: Math.max(tip.y - 8, 0), transform: "translate(-50%, -100%)" }}
    >
      <div className="font-medium text-white">{tip.label}</div>
      {tip.lines.map((l) => (
        <div key={l} className="mt-0.5 text-white/70">{l}</div>
      ))}
    </div>
  );
}

/* ---------------- Area chart (single series) ---------------- */
export function AreaChart({
  labels,
  values,
  seriesName,
  height = 160,
}: {
  labels: string[];
  values: number[];
  seriesName: string;
  height?: number;
}) {
  const { tip, setTip } = useTooltip();
  const ref = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const W = 600;
  const H = height;
  const PAD = { t: 12, r: 8, b: 22, l: 8 };
  const max = Math.max(...values, 1);
  const n = values.length;
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(n - 1, 1);
  const y = (v: number) => H - PAD.b - (v / max) * (H - PAD.t - PAD.b);

  const line = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(n - 1)},${H - PAD.b} L${x(0)},${H - PAD.b} Z`;

  function onMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (n - 1));
    const idx = Math.min(Math.max(i, 0), n - 1);
    setHoverIdx(idx);
    setTip({
      x: (x(idx) / W) * rect.width,
      y: (y(values[idx]) / H) * rect.height,
      label: labels[idx],
      lines: [`${seriesName}: ${values[idx]}`],
    });
  }

  return (
    <div
      ref={ref}
      dir="ltr"
      className="relative"
      onMouseMove={onMove}
      onMouseLeave={() => {
        setTip(null);
        setHoverIdx(null);
      }}
    >
      <TooltipBox tip={tip} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES.violet} stopOpacity="0.35" />
            <stop offset="100%" stopColor={SERIES.violet} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* recessive baseline */}
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="rgba(255,255,255,0.12)" />
        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke={SERIES.violet} strokeWidth="2" strokeLinejoin="round" />
        {hoverIdx !== null && (
          <>
            <line
              x1={x(hoverIdx)}
              x2={x(hoverIdx)}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="3 3"
            />
            <circle cx={x(hoverIdx)} cy={y(values[hoverIdx])} r="4.5" fill={SERIES.violet} stroke="#0b1f3a" strokeWidth="2" />
          </>
        )}
        {/* sparse x labels: first, middle, last */}
        {[0, Math.floor((n - 1) / 2), n - 1].map((i) => (
          <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">
            {labels[i]}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ---------------- Stacked bars (two series) ---------------- */
export function StackedBars({
  labels,
  a,
  b,
  aName,
  bName,
  height = 160,
}: {
  labels: string[];
  a: number[];
  b: number[];
  aName: string;
  bName: string;
  height?: number;
}) {
  const { tip, setTip } = useTooltip();
  const ref = useRef<HTMLDivElement>(null);

  const W = 600;
  const H = height;
  const PAD = { t: 12, r: 8, b: 22, l: 8 };
  const n = labels.length;
  const max = Math.max(...labels.map((_, i) => a[i] + b[i]), 1);
  const slot = (W - PAD.l - PAD.r) / n;
  const barW = Math.min(slot * 0.62, 26);
  const x = (i: number) => PAD.l + i * slot + (slot - barW) / 2;
  const hOf = (v: number) => (v / max) * (H - PAD.t - PAD.b);

  function show(e: React.MouseEvent, i: number) {
    const rect = ref.current!.getBoundingClientRect();
    setTip({
      x: ((x(i) + barW / 2) / W) * rect.width,
      y: ((H - PAD.b - hOf(a[i] + b[i])) / H) * rect.height,
      label: labels[i],
      lines: [`${aName}: ${a[i]}`, `${bName}: ${b[i]}`],
    });
  }

  return (
    <div dir="ltr" className="relative" ref={ref} onMouseLeave={() => setTip(null)}>
      <TooltipBox tip={tip} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="rgba(255,255,255,0.12)" />
        {labels.map((_, i) => {
          const hA = hOf(a[i]);
          const hB = hOf(b[i]);
          const yA = H - PAD.b - hA;
          const yB = yA - 2 - hB; // 2px surface gap between segments
          return (
            <g key={i} onMouseMove={(e) => show(e, i)} style={{ cursor: "default" }}>
              {/* generous hit target */}
              <rect x={x(i) - (slot - barW) / 2} y={PAD.t} width={slot} height={H - PAD.t - PAD.b} fill="transparent" />
              {hA > 0 && <rect x={x(i)} y={yA} width={barW} height={hA} rx="3" fill={SERIES.violet} />}
              {hB > 0 && <rect x={x(i)} y={Math.max(yB, PAD.t)} width={barW} height={hB} rx="3" fill={SERIES.teal} />}
            </g>
          );
        })}
        {[0, Math.floor((n - 1) / 2), n - 1].map((i) => (
          <text
            key={i}
            x={x(i) + barW / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(255,255,255,0.4)"
          >
            {labels[i]}
          </text>
        ))}
      </svg>
      {/* legend — identity never by color alone */}
      <div className="mt-2 flex items-center gap-4 text-xs text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SERIES.violet }} />
          {aName}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SERIES.teal }} />
          {bName}
        </span>
      </div>
    </div>
  );
}
