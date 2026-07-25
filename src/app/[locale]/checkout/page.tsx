import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";
import { planAmount, type PlanId, type BillingCycle } from "@/lib/payments";
import ManualCheckout from "@/components/ManualCheckout";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string; cycle?: string }>;
}) {
  const { locale: raw } = await params;
  const { plan: planRaw, cycle: cycleRaw } = await searchParams;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const plan: PlanId = planRaw === "ultimate" ? "ultimate" : "pro";
  const cycle: BillingCycle = cycleRaw === "yearly" ? "yearly" : "monthly";
  const amount = planAmount(plan, cycle);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container-x max-w-4xl py-16">
      <Reveal>
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          {ar ? "أكمل اشتراكك" : "Complete your subscription"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
          {ar
            ? "خطوتان فقط: حوّل المبلغ، ثم أرسل رقم العملية — ونفعّل خطتك يدوياً."
            : "Just two steps: send the payment, then submit the transaction ID — we activate your plan manually."}
        </p>
      </Reveal>

      <div className="mt-10">
        <ManualCheckout
          locale={locale}
          plan={plan}
          cycle={cycle}
          amount={amount}
          loggedIn={Boolean(user)}
          wallets={{
            usdtTrc20: process.env.PAYMENT_USDT_TRC20,
            usdtBep20: process.env.PAYMENT_USDT_BEP20,
            binanceId: process.env.PAYMENT_BINANCE_ID,
          }}
        />
      </div>
    </div>
  );
}
