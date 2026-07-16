import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/payments";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Binance Pay webhook — the single source of truth for payment status.
 * Never trust browser-side success; only this verified event activates a plan.
 * Implements: signature verification + idempotency.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));

  const provider = getProvider("binance");
  const result = await provider.verifyWebhook({ headers, rawBody });

  if (!result.ok) {
    return NextResponse.json({ returnCode: "FAIL", returnMessage: "invalid_signature" }, { status: 400 });
  }

  // Acknowledge non-actionable events fast.
  if (result.event !== "paid" || !result.merchantTradeNo) {
    return NextResponse.json({ returnCode: "SUCCESS" });
  }

  try {
    const svc = createServiceClient();

    // Idempotency: skip if already marked paid.
    const { data: order } = await svc
      .from("payment_orders")
      .select("id, user_id, plan, status")
      .eq("merchant_trade_no", result.merchantTradeNo)
      .single();

    if (!order) {
      return NextResponse.json({ returnCode: "SUCCESS" });
    }
    if (order.status === "paid") {
      return NextResponse.json({ returnCode: "SUCCESS" });
    }

    await svc
      .from("payment_orders")
      .update({ status: "paid", raw: result.raw, updated_at: new Date().toISOString() })
      .eq("id", order.id);

    // Activate / extend subscription (manual-renewal model: 1 period from now).
    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + 1);

    await svc.from("subscriptions").insert({
      user_id: order.user_id,
      plan: order.plan,
      status: "active",
      provider: "binance",
      current_period_start: now.toISOString(),
      current_period_end: end.toISOString(),
    });

    await svc.from("profiles").update({ plan: order.plan }).eq("id", order.user_id);

    return NextResponse.json({ returnCode: "SUCCESS" });
  } catch (err) {
    console.error("webhook processing failed", err);
    // Returning FAIL asks Binance to retry — safe because we're idempotent.
    return NextResponse.json({ returnCode: "FAIL" }, { status: 500 });
  }
}
