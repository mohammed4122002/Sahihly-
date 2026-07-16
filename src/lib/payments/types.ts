export type PlanId = "pro" | "ultimate";
export type BillingCycle = "monthly" | "yearly";

export interface CreateOrderInput {
  plan: PlanId;
  cycle: BillingCycle;
  amount: number; // in currency units
  currency: string; // USDT
  userId?: string | null;
  merchantTradeNo: string;
  description: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface CreateOrderResult {
  checkoutUrl: string;
  prepayId: string;
  raw: unknown;
}

export interface WebhookVerifyInput {
  headers: Record<string, string>;
  rawBody: string;
}

export interface WebhookResult {
  ok: boolean;
  event: "paid" | "failed" | "expired" | "unknown";
  merchantTradeNo?: string;
  raw?: unknown;
}

export interface PaymentProvider {
  id: string;
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
  verifyWebhook(input: WebhookVerifyInput): Promise<WebhookResult>;
}
