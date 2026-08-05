/**
 * Detector benchmark.
 *
 *   node --experimental-strip-types bench/run.ts
 *
 * Measures the statistical engine against a labelled corpus. This is the
 * engine that runs when no API key is configured, and it is also 35% of the
 * blended score when one is — so its behaviour sets the floor for the product.
 *
 * What the numbers mean, and why the false-positive rate leads:
 *
 *   FPR   share of genuinely human passages scored as AI. Every one of these
 *         is a person accused of something they did not do, which is the
 *         failure this tool exists to argue against. It is the metric that
 *         matters most and the one competitors report least.
 *   FNR   share of machine passages that slipped through. Costly, but a miss
 *         is a smaller harm than a false accusation.
 *   gap   mean(machine) - mean(human). Separation between the two classes; a
 *         detector with no separation is a random number generator with a
 *         confident user interface.
 *   AUC   probability that a random machine passage outranks a random human
 *         one. Threshold-independent, so it does not flatter a lucky cutoff.
 *
 * The corpus is small and its provenance is stated per item in corpus.json.
 * Human samples are pre-LLM literature, human-maintained technical docs, and
 * the official human Arabic translation of the React docs — that last one is
 * the register most likely to be wrongly flagged, which is why it is here.
 */
import { readFileSync } from "node:fs";
import { heuristicDetect } from "../src/lib/detector-stats.ts";

type Item = {
  id: string;
  lang: "ar" | "en";
  label: "human" | "machine";
  register: string;
  source: string;
  text: string;
};

const AI_THRESHOLD = 65; // matches verdictFromScore
const corpus: Item[] = JSON.parse(readFileSync("bench/corpus.json", "utf8"));

const scored = corpus.map((it) => ({
  ...it,
  score: heuristicDetect(it.text).score,
}));

function stats(items: typeof scored) {
  const human = items.filter((i) => i.label === "human");
  const machine = items.filter((i) => i.label === "machine");
  const mean = (a: number[]) =>
    a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN;
  const hm = mean(human.map((i) => i.score));
  const mm = mean(machine.map((i) => i.score));

  // AUC by pairwise comparison; ties count as half a win.
  let wins = 0;
  let pairs = 0;
  for (const m of machine)
    for (const h of human) {
      pairs++;
      if (m.score > h.score) wins++;
      else if (m.score === h.score) wins += 0.5;
    }

  return {
    n: items.length,
    fpr: human.length
      ? human.filter((i) => i.score >= AI_THRESHOLD).length / human.length
      : NaN,
    fnr: machine.length
      ? machine.filter((i) => i.score < AI_THRESHOLD).length / machine.length
      : NaN,
    humanMean: hm,
    machineMean: mm,
    gap: mm - hm,
    auc: pairs ? wins / pairs : NaN,
  };
}

const pct = (x: number) => (Number.isNaN(x) ? "  n/a" : `${(x * 100).toFixed(0)}%`.padStart(5));
const num = (x: number) => (Number.isNaN(x) ? " n/a" : x.toFixed(1).padStart(5));

function row(label: string, s: ReturnType<typeof stats>) {
  console.log(
    `${label.padEnd(10)} n=${String(s.n).padStart(2)}  FPR ${pct(s.fpr)}  FNR ${pct(s.fnr)}  ` +
      `human ${num(s.humanMean)}  machine ${num(s.machineMean)}  gap ${num(s.gap)}  AUC ${s.auc.toFixed(2)}`
  );
}

console.log("\n=== statistical engine vs labelled corpus ===\n");
row("overall", stats(scored));
row("english", stats(scored.filter((i) => i.lang === "en")));
row("arabic", stats(scored.filter((i) => i.lang === "ar")));

console.log("\n--- misses (human scored as AI, or machine scored as human) ---");
const misses = scored.filter(
  (i) =>
    (i.label === "human" && i.score >= AI_THRESHOLD) ||
    (i.label === "machine" && i.score < AI_THRESHOLD)
);
if (misses.length === 0) console.log("none");
for (const m of misses)
  console.log(
    `  ${m.id.padEnd(16)} ${m.label.padEnd(8)} ${String(m.score).padStart(3)}  ${m.register}`
  );

console.log("\n--- by register ---");
const registers = [...new Set(scored.map((i) => i.register))].sort();
for (const r of registers) {
  const g = scored.filter((i) => i.register === r);
  const avg = g.reduce((s, i) => s + i.score, 0) / g.length;
  console.log(
    `  ${r.padEnd(22)} ${g[0].label.padEnd(8)} n=${String(g.length).padStart(2)}  mean ${avg.toFixed(1)}`
  );
}
console.log();
