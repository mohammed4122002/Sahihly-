"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Loader2, ShieldCheck, Wallet, CircleCheckBig, MessageCircle, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  locale: Locale;
  plan: "pro" | "ultimate";
  cycle: "monthly" | "yearly";
  amount: number;
  loggedIn: boolean;
  wallets: { usdtTrc20?: string; usdtBep20?: string; binanceId?: string };
};

export default function ManualCheckout({
  locale,
  plan,
  cycle,
  amount,
  loggedIn,
  wallets,
}: Props) {
  const ar = locale === "ar";
  const [method, setMethod] = useState<"usdt" | "binance_id" | "other">(
    wallets.usdtTrc20 ? "usdt" : wallets.binanceId ? "binance_id" : "other"
  );
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/payments/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, cycle, method, reference, note }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="glass-strong glow-card rounded-3xl p-10 text-center">
        <CircleCheckBig size={40} className="mx-auto text-emerald-300" />
        <h2 className="mt-4 text-2xl font-bold">
          {ar ? "وصلنا طلبك ✓" : "We got your request ✓"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          {ar
            ? "سنتحقق من الدفعة ونفعّل اشتراكك عادةً خلال ساعات قليلة. ستجد الخطة محدّثة في لوحتك فور التفعيل."
            : "We'll verify the payment and activate your plan, usually within a few hours. Your dashboard will show the new plan once it's live."}
        </p>
        <Link href="/dashboard" className="btn-primary mt-6 inline-flex rounded-full px-6 py-2.5 text-sm">
          {ar ? "اذهب للوحتي" : "Go to my dashboard"}
        </Link>
        <SupportContact ar={ar} />
      </div>
    );
  }

  const options: { id: typeof method; label: string; value?: string; hint: string }[] = [];
  if (wallets.usdtTrc20)
    options.push({
      id: "usdt",
      label: "USDT (TRC20)",
      value: wallets.usdtTrc20,
      hint: ar ? "أرخص شبكة وأسرعها" : "Cheapest, fastest network",
    });
  if (wallets.usdtBep20)
    options.push({
      id: "usdt",
      label: "USDT (BEP20)",
      value: wallets.usdtBep20,
      hint: ar ? "شبكة BNB" : "BNB Smart Chain",
    });
  if (wallets.binanceId)
    options.push({
      id: "binance_id",
      label: ar ? "Binance Pay ID" : "Binance Pay ID",
      value: wallets.binanceId,
      hint: ar ? "تحويل داخلي فوري وبلا رسوم" : "Instant, fee-free internal transfer",
    });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Step 1: pay */}
      <div className="glass-strong glow-card rounded-3xl p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-400/15 text-xs font-semibold text-violet-300">
            1
          </span>
          <h2 className="font-semibold">{ar ? "حوّل المبلغ" : "Send the payment"}</h2>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
          <span className="text-sm text-white/60">
            {ar ? "الخطة" : "Plan"}:{" "}
            <span className="font-semibold capitalize text-white">{plan}</span>
            <span className="text-white/40">
              {" "}
              · {cycle === "yearly" ? (ar ? "سنوي" : "yearly") : ar ? "شهري" : "monthly"}
            </span>
          </span>
          <span className="font-display text-xl font-bold text-violet-200">${amount}</span>
        </div>

        {options.length === 0 ? (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            {ar
              ? "لم تُضبط بيانات الاستلام بعد. اضبط PAYMENT_USDT_TRC20 أو PAYMENT_BINANCE_ID في إعدادات البيئة."
              : "Receiving details aren't set yet. Configure PAYMENT_USDT_TRC20 or PAYMENT_BINANCE_ID in your environment."}
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {options.map((o) => (
              <div key={o.label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white/85">{o.label}</span>
                  <button
                    onClick={() => copy(o.value!, o.label)}
                    className="btn-ghost inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
                  >
                    {copied === o.label ? <Check size={11} /> : <Copy size={11} />}
                    {copied === o.label ? (ar ? "نُسخ" : "Copied") : ar ? "نسخ" : "Copy"}
                  </button>
                </div>
                <p dir="ltr" className="mt-1.5 break-all font-mono text-xs text-violet-200/90">
                  {o.value}
                </p>
                <p className="mt-1 text-[11px] text-white/35">{o.hint}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 flex items-start gap-2 text-xs text-white/45">
          <Wallet size={13} className="mt-0.5 shrink-0 text-violet-300" />
          {ar
            ? "حوّل المبلغ بالضبط بعملة USDT، ثم انسخ رقم العملية (Transaction ID / TxID) للخطوة الثانية."
            : "Send exactly this amount in USDT, then copy the transaction ID (TxID) for step two."}
        </p>
      </div>

      {/* Step 2: confirm */}
      <div className="glass-strong glow-card rounded-3xl p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-400/15 text-xs font-semibold text-violet-300">
            2
          </span>
          <h2 className="font-semibold">{ar ? "أرسل إثبات التحويل" : "Send your proof"}</h2>
        </div>

        {!loggedIn ? (
          <div className="mt-5 rounded-xl border border-violet-400/25 bg-violet-400/[0.07] p-5 text-center">
            <p className="text-sm text-white/70">
              {ar
                ? "سجّل الدخول أولاً حتى نربط الاشتراك بحسابك."
                : "Log in first so we can attach the subscription to your account."}
            </p>
            <Link
              href={`/login?next=/checkout?plan=${plan}%26cycle=${cycle}`}
              className="btn-primary mt-4 inline-flex rounded-full px-5 py-2 text-sm"
            >
              {ar ? "تسجيل الدخول" : "Log in"}
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {ar ? "طريقة الدفع" : "Payment method"}
              </span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as typeof method)}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-violet-400/50"
              >
                <option value="usdt">USDT</option>
                <option value="binance_id">Binance Pay ID</option>
                <option value="other">{ar ? "أخرى" : "Other"}</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {ar ? "رقم العملية (TxID) أو مرجع التحويل" : "Transaction ID (TxID) or reference"}
              </span>
              <input
                dir="ltr"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="0x… / 88123456"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 font-mono text-sm outline-none focus:border-violet-400/50"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {ar ? "ملاحظة (اختياري)" : "Note (optional)"}
              </span>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-violet-400/50"
              />
            </label>

            {state === "error" && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {ar ? "تعذّر الإرسال. حاول مجدداً." : "Couldn't submit. Please try again."}
              </p>
            )}

            <button
              disabled={state === "sending"}
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm"
            >
              {state === "sending" && <Loader2 size={15} className="animate-spin" />}
              {ar ? "أرسل للمراجعة" : "Submit for review"}
            </button>

            <p className="flex items-start gap-2 text-[11px] text-white/40">
              <ShieldCheck size={12} className="mt-0.5 shrink-0 text-violet-300" />
              {ar
                ? "نراجع كل طلب يدوياً ونفعّل الاشتراك عادةً خلال ساعات قليلة."
                : "Every request is reviewed manually; activation usually takes a few hours."}
            </p>
            <SupportContact ar={ar} />
          </form>
        )}
      </div>
    </div>
  );
}

function SupportContact({ ar }: { ar: boolean }) {
  return (
    <div className="mt-4 flex flex-col items-center gap-1.5 text-xs text-white/45">
      <p>{ar ? "تواجه مشكلة في تفعيل اشتراكك؟ راسل الدعم مباشرة:" : "Having trouble activating your plan? Reach support directly:"}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        <a
          href="https://wa.me/970594848203"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200"
        >
          <MessageCircle size={13} />
          <span dir="ltr">+970 59 484 8203</span>
        </a>
        <a
          href="mailto:mohammedsaadaang@gmail.com"
          className="inline-flex items-center gap-1.5 text-violet-300 hover:text-violet-200"
        >
          <Mail size={13} />
          mohammedsaadaang@gmail.com
        </a>
      </div>
    </div>
  );
}
