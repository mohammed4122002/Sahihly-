"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, X, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

export default function PricingCards({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmPlan, setConfirmPlan] = useState<string | null>(null);
  const router = useRouter();
  const p = dict.pricing;
  const c = dict.checkout;
  const base = "";

  const yearlyPrice: Record<string, string> = { pro: "$115", ultimate: "$278" };

  function choose(planId: string) {
    if (planId === "free") {
      router.push("/");
      return;
    }
    // Pre-checkout explainer: Binance Pay is a hosted flow with its own
    // steps — set expectations before redirecting (spec §6).
    setNotice(null);
    setConfirmPlan(planId);
  }

  async function startCheckout(planId: string) {
    setNotice(null);
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, cycle, locale }),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push(`${base}/login?next=/pricing`);
        return;
      }
      if (res.status === 503) {
        setConfirmPlan(null);
        setNotice(
          locale === "ar"
            ? "بوابة الدفع قيد الإعداد. اترك بريدك وسنعلمك فور التفعيل."
            : "The payment gateway is being set up. Leave your email and we'll notify you."
        );
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setConfirmPlan(null);
      setNotice(locale === "ar" ? "تعذّر بدء الدفع. حاول لاحقاً." : "Couldn't start checkout. Try again.");
    } catch {
      setConfirmPlan(null);
      setNotice(locale === "ar" ? "خطأ في الشبكة." : "Network error.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div>
      {/* cycle toggle */}
      <div className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
        <button
          onClick={() => setCycle("monthly")}
          className={`rounded-full px-4 py-1.5 transition ${
            cycle === "monthly" ? "bg-violet-400 text-ocean-900" : "text-white/60"
          }`}
        >
          {p.monthly}
        </button>
        <button
          onClick={() => setCycle("yearly")}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition ${
            cycle === "yearly" ? "bg-violet-400 text-ocean-900" : "text-white/60"
          }`}
        >
          {p.yearly}
          <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] text-emerald-300">
            {p.save}
          </span>
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {p.plans.map((plan) => {
          const popular = plan.id === "pro";
          const price =
            plan.id === "free"
              ? "$0"
              : cycle === "yearly"
                ? yearlyPrice[plan.id]
                : plan.price;
          return (
            <div
              key={plan.id}
              className={`glow-card relative flex flex-col rounded-3xl p-7 ${
                popular ? "glass-strong border-violet-400/40" : "glass"
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-400 px-3 py-1 text-xs font-semibold text-ocean-900">
                  {p.mostPopular}
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">{price}</span>
                {plan.id !== "free" && (
                  <span className="mb-1 text-sm text-white/40">
                    {cycle === "yearly" ? p.perYear : p.perMonth}
                  </span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} className="mt-0.5 shrink-0 text-violet-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => choose(plan.id)}
                disabled={loadingPlan === plan.id}
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${
                  popular || plan.id !== "free" ? "btn-primary" : "btn-ghost"
                }`}
              >
                {loadingPlan === plan.id && <Loader2 size={16} className="animate-spin" />}
                {plan.id === "free" ? p.ctaFree : p.cta}
              </button>
            </div>
          );
        })}
      </div>

      {notice && (
        <p className="mt-6 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-center text-sm text-violet-200">
          {notice}
        </p>
      )}
      <p className="mt-6 text-center text-xs text-white/40">{p.payNote}</p>

      {/* Pre-checkout explainer modal (Binance Pay is a hosted 3-step flow) */}
      <AnimatePresence>
        {confirmPlan && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loadingPlan && setConfirmPlan(null)}
          >
            <motion.div
              className="glass-strong glow-card w-full max-w-md rounded-3xl p-7"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <button
                  onClick={() => !loadingPlan && setConfirmPlan(null)}
                  className="rounded-lg border border-white/10 p-1.5 text-white/60 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
                <span className="text-white/60">
                  {c.plan}:{" "}
                  <span className="font-semibold capitalize text-white">{confirmPlan}</span>
                  <span className="text-white/40"> · {cycle === "yearly" ? p.yearly : p.monthly}</span>
                </span>
                <span className="font-display text-lg font-bold text-violet-200">
                  {cycle === "yearly" ? yearlyPrice[confirmPlan] : p.plans.find((x) => x.id === confirmPlan)?.price}
                </span>
              </div>

              <ol className="mt-5 space-y-3">
                {c.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-xs font-semibold text-violet-300">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <p className="mt-4 flex items-start gap-2 text-xs text-white/45">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-violet-300" />
                {c.note}
              </p>

              <button
                onClick={() => startCheckout(confirmPlan)}
                disabled={Boolean(loadingPlan)}
                className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-70"
              >
                {loadingPlan ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {c.redirecting}
                  </>
                ) : (
                  c.payWithBinance
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
