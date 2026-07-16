import type { PaymentProvider, PlanId, BillingCycle } from "./types";
import { binanceProvider } from "./binance";

const providers: Record<string, PaymentProvider> = {
  binance: binanceProvider,
};

export function getProvider(id = "binance"): PaymentProvider {
  const p = providers[id];
  if (!p) throw new Error(`unknown_provider:${id}`);
  return p;
}

// Pricing catalogue (USDT). Yearly = 10x monthly (2 months free).
export const PLAN_PRICING: Record<
  PlanId,
  Record<BillingCycle, number>
> = {
  pro: { monthly: 12, yearly: 115 },
  ultimate: { monthly: 29, yearly: 278 },
};

export function planAmount(plan: PlanId, cycle: BillingCycle): number {
  return PLAN_PRICING[plan][cycle];
}

export type { PlanId, BillingCycle };
