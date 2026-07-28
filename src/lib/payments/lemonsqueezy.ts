import { createHmac, timingSafeEqual } from "crypto";
import type {
  CreateOrderInput,
  CreateOrderResult,
  PaymentProvider,
  WebhookResult,
  WebhookVerifyInput,
} from "./types";

const API_BASE = "https://api.lemonsqueezy.com/v1";

function variantIdFor(plan: string, cycle: string): string | undefined {
  const key = `LEMONSQUEEZY_VARIANT_${plan.toUpperCase()}_${cycle.toUpperCase()}`;
  return process.env[key];
}

/**
 * LemonSqueezy provider — a Merchant of Record, so it collects/remits VAT
 * itself and accepts cards, PayPal, Apple Pay and Google Pay through one
 * hosted checkout. Unlike Binance Pay it has native recurring billing:
 * renewals fire automatically as new "order_created" webhook events on the
 * same subscription, which is why the webhook (not this file) does the
 * period-extension work.
 *
 * Requires LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID,
 * LEMONSQUEEZY_WEBHOOK_SECRET and one LEMONSQUEEZY_VARIANT_<PLAN>_<CYCLE>
 * per plan/cycle (e.g. LEMONSQUEEZY_VARIANT_PRO_MONTHLY).
 */
export const lemonsqueezyProvider: PaymentProvider = {
  id: "lemonsqueezy",

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = variantIdFor(input.plan, input.cycle);
    if (!apiKey || !storeId || !variantId) {
      throw new Error("lemonsqueezy_not_configured");
    }

    const res = await fetch(`${API_BASE}/checkouts`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: input.email || undefined,
              custom: {
                merchant_trade_no: input.merchantTradeNo,
                user_id: input.userId || "",
                plan: input.plan,
                cycle: input.cycle,
              },
            },
            product_options: {
              name: input.description,
              redirect_url: input.returnUrl,
            },
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      }),
    });

    const json = await res.json();
    if (!res.ok || !json?.data?.attributes?.url) {
      throw new Error(
        `lemonsqueezy_error: ${res.status} ${json?.errors?.[0]?.detail || ""}`
      );
    }

    return {
      checkoutUrl: json.data.attributes.url,
      prepayId: json.data.id,
      raw: json,
    };
  },

  async verifyWebhook(input: WebhookVerifyInput): Promise<WebhookResult> {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    const signature = input.headers["x-signature"];
    if (!secret || !signature) return { ok: false, event: "unknown" };

    const expected = createHmac("sha256", secret).update(input.rawBody).digest("hex");
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(signature, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, event: "unknown" };
    }

    let parsed: {
      meta?: { event_name?: string; custom_data?: Record<string, string> };
      data?: { id?: string; type?: string; attributes?: { status?: string } };
    };
    try {
      parsed = JSON.parse(input.rawBody);
    } catch {
      return { ok: false, event: "unknown" };
    }

    const eventName = parsed.meta?.event_name;
    const status = parsed.data?.attributes?.status;

    let event: WebhookResult["event"] = "unknown";
    if (eventName === "order_created") {
      event = status === "paid" ? "paid" : "failed";
    } else if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
      event = "expired";
    }

    return {
      ok: true,
      event,
      merchantTradeNo: parsed.meta?.custom_data?.merchant_trade_no,
      raw: parsed,
    };
  },
};
