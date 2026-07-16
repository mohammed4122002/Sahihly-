import { createHmac, randomBytes } from "crypto";
import type {
  CreateOrderInput,
  CreateOrderResult,
  PaymentProvider,
  WebhookResult,
  WebhookVerifyInput,
} from "./types";

const BASE =
  process.env.BINANCE_PAY_BASE || "https://bpay.binanceapi.com";

function nonce(): string {
  return randomBytes(16).toString("hex");
}

function sign(payload: string, secret: string): string {
  return createHmac("sha512", secret).update(payload).digest("hex").toUpperCase();
}

/**
 * Binance Pay provider.
 * Docs: Create Order v3 + certificate/webhook verification.
 * Requires an *Entity Merchant* account (individual merchant accounts are
 * discontinued). Set BINANCE_PAY_KEY / BINANCE_PAY_SECRET in env.
 */
export const binanceProvider: PaymentProvider = {
  id: "binance",

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const key = process.env.BINANCE_PAY_KEY;
    const secret = process.env.BINANCE_PAY_SECRET;
    if (!key || !secret) {
      throw new Error("binance_not_configured");
    }

    const bodyObj = {
      env: { terminalType: "WEB" },
      merchantTradeNo: input.merchantTradeNo,
      orderAmount: input.amount,
      currency: input.currency,
      description: input.description.slice(0, 128),
      goodsDetails: [
        {
          goodsType: "02", // virtual goods
          goodsCategory: "Z000",
          referenceGoodsId: `sahihly-${input.plan}`,
          goodsName: `Sahihly ${input.plan}`,
        },
      ],
      returnUrl: input.returnUrl,
      cancelUrl: input.cancelUrl,
    };

    const body = JSON.stringify(bodyObj);
    const ts = Date.now().toString();
    const nc = nonce();
    const payload = `${ts}\n${nc}\n${body}\n`;
    const signature = sign(payload, secret);

    const res = await fetch(`${BASE}/binancepay/openapi/v3/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": ts,
        "BinancePay-Nonce": nc,
        "BinancePay-Certificate-SN": key,
        "BinancePay-Signature": signature,
      },
      body,
    });

    const json = await res.json();
    if (json.status !== "SUCCESS" || !json.data) {
      throw new Error(`binance_error: ${json.code || res.status} ${json.errorMessage || ""}`);
    }

    return {
      checkoutUrl: json.data.checkoutUrl,
      prepayId: json.data.prepayId,
      raw: json,
    };
  },

  async verifyWebhook(input: WebhookVerifyInput): Promise<WebhookResult> {
    const secret = process.env.BINANCE_PAY_SECRET;
    if (!secret) return { ok: false, event: "unknown" };

    const ts = input.headers["binancepay-timestamp"];
    const nc = input.headers["binancepay-nonce"];
    const sig = input.headers["binancepay-signature"];
    if (!ts || !nc || !sig) return { ok: false, event: "unknown" };

    const payload = `${ts}\n${nc}\n${input.rawBody}\n`;
    const expected = sign(payload, secret);
    if (expected !== sig.toUpperCase()) {
      return { ok: false, event: "unknown" };
    }

    let parsed: { bizType?: string; bizStatus?: string; data?: string };
    try {
      parsed = JSON.parse(input.rawBody);
    } catch {
      return { ok: false, event: "unknown" };
    }

    const status = parsed.bizStatus;
    let event: WebhookResult["event"] = "unknown";
    if (status === "PAY_SUCCESS") event = "paid";
    else if (status === "PAY_CLOSED") event = "expired";
    else if (status === "PAY_FAIL") event = "failed";

    let merchantTradeNo: string | undefined;
    try {
      const data = parsed.data ? JSON.parse(parsed.data) : null;
      merchantTradeNo = data?.merchantTradeNo;
    } catch {
      /* ignore */
    }

    return { ok: true, event, merchantTradeNo, raw: parsed };
  },
};
