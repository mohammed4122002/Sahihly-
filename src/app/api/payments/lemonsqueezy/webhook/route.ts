import { NextRequest, NextResponse } from "next/server";
import { getProvider, planAmount, type PlanId, type BillingCycle } from "@/lib/payments";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type LemonWebhookBody = {
  meta?: { custom_data?: { user_id?: string; plan?: string; cycle?: string } };
  data?: { id?: string };
};

/**
 * LemonSqueezy webhook — the single source of truth for payment status.
 * LemonSqueezy has native recurring billing, so a renewal fires a fresh
 * "order_created" event (with a new LS order id) on the same subscription;
 * we record each one as its own payment_orders row rather than trying to
 * reuse the checkout's original row, which is why idempotency below keys
 * off the LS order id, not the original merchant_trade_no.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));

  const provider = getProvider("lemonsqueezy");
  const result = await provider.verifyWebhook({ headers, rawBody });

  if (!result.ok) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }
  if (result.event !== "paid") {
    return NextResponse.json({ ok: true });
  }

  const raw = result.raw as LemonWebhookBody;
  const lsOrderId = raw.data?.id;
  const custom = raw.meta?.custom_data;
  const userId = custom?.user_id;
  const plan = custom?.plan;
  const cycle: BillingCycle = custom?.cycle === "yearly" ? "yearly" : "monthly";

  if (!lsOrderId || !userId || !plan || !["pro", "ultimate"].includes(plan)) {
    return NextResponse.json({ ok: true });
  }
  const amount = planAmount(plan as PlanId, cycle);

  try {
    const svc = createServiceClient();

    // Idempotency: this LS order id (unique per checkout AND per renewal
    // invoice) must not have been recorded already.
    const { data: existing } = await svc
      .from("payment_orders")
      .select("id")
      .eq("merchant_trade_no", lsOrderId)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    // The original row created at checkout time is keyed by our own
    // merchant_trade_no; try to update it for the *first* payment, otherwise
    // insert a new audit row for this renewal.
    const originalTradeNo = result.merchantTradeNo;
    const { data: original } = originalTradeNo
      ? await svc
          .from("payment_orders")
          .select("id, status")
          .eq("merchant_trade_no", originalTradeNo)
          .maybeSingle()
      : { data: null };

    if (original && original.status !== "paid") {
      await svc
        .from("payment_orders")
        .update({
          merchant_trade_no: lsOrderId,
          status: "paid",
          raw,
          updated_at: new Date().toISOString(),
        })
        .eq("id", original.id);
    } else {
      await svc.from("payment_orders").insert({
        user_id: userId,
        provider: "lemonsqueezy",
        merchant_trade_no: lsOrderId,
        plan,
        amount,
        currency: "USD",
        status: "paid",
        raw,
      });
    }

    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + (cycle === "yearly" ? 12 : 1));

    await svc.from("subscriptions").insert({
      user_id: userId,
      plan,
      status: "active",
      provider: "lemonsqueezy",
      current_period_start: now.toISOString(),
      current_period_end: end.toISOString(),
    });

    await svc.from("profiles").update({ plan }).eq("id", userId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lemonsqueezy webhook processing failed", err);
    // Non-2xx asks LemonSqueezy to retry — safe because we're idempotent.
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }
}
