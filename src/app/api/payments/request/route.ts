import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { planAmount, type PlanId, type BillingCycle } from "@/lib/payments";

export const runtime = "nodejs";

/**
 * Manual subscription request: the visitor pays by any method (USDT wallet,
 * Binance Pay ID, local transfer) and submits proof. An admin approves it in
 * the console, which activates the plan. Works with no merchant account.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    plan?: PlanId;
    cycle?: BillingCycle;
    method?: string;
    reference?: string;
    note?: string;
  };

  const plan = body.plan;
  const cycle = body.cycle === "yearly" ? "yearly" : "monthly";
  if (!plan || !["pro", "ultimate"].includes(plan)) {
    return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  }
  if (!body.reference || body.reference.trim().length < 4) {
    return NextResponse.json({ error: "missing_reference" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  const { error } = await supabase.from("payment_requests").insert({
    user_id: user.id,
    email: user.email,
    plan,
    cycle,
    amount: planAmount(plan, cycle),
    currency: "USDT",
    method: ["usdt", "binance_id", "other"].includes(body.method || "") ? body.method : "usdt",
    reference: body.reference.trim().slice(0, 300),
    note: (body.note || "").slice(0, 500),
  });

  if (error) {
    console.error("payment request failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
