import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getProvider, planAmount, type PlanId, type BillingCycle } from "@/lib/payments";
import { SITE_URL } from "@/lib/i18n/config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { plan, cycle, locale } = (await req.json()) as {
    plan: PlanId;
    cycle: BillingCycle;
    locale?: string;
  };

  if (!["pro", "ultimate"].includes(plan) || !["monthly", "yearly"].includes(cycle)) {
    return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  }

  // Require an authenticated user to attach the subscription to.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const amount = planAmount(plan, cycle);
  const merchantTradeNo = `SH${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const lang = locale === "ar" ? "ar" : "en";

  // Record the pending order (service client bypasses RLS for server writes).
  try {
    const svc = createServiceClient();
    await svc.from("payment_orders").insert({
      user_id: user.id,
      provider: "binance",
      merchant_trade_no: merchantTradeNo,
      plan,
      amount,
      currency: "USDT",
      status: "created",
    });
  } catch {
    // If service client isn't configured yet, continue — order still creatable.
  }

  try {
    const provider = getProvider("binance");
    const result = await provider.createOrder({
      plan,
      cycle,
      amount,
      currency: "USDT",
      userId: user.id,
      merchantTradeNo,
      description: `Sahihly ${plan} (${cycle})`,
      returnUrl: `${SITE_URL}/${lang}/dashboard?paid=1`,
      cancelUrl: `${SITE_URL}/${lang}/pricing`,
    });

    try {
      const svc = createServiceClient();
      await svc
        .from("payment_orders")
        .update({ prepay_id: result.prepayId, checkout_url: result.checkoutUrl })
        .eq("merchant_trade_no", merchantTradeNo);
    } catch {
      /* ignore */
    }

    return NextResponse.json({ checkoutUrl: result.checkoutUrl, merchantTradeNo });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    if (message === "binance_not_configured") {
      return NextResponse.json({ error: "gateway_unconfigured" }, { status: 503 });
    }
    console.error("create order failed", message);
    return NextResponse.json({ error: "gateway_error", detail: message }, { status: 502 });
  }
}
