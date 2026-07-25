"use client";

import { useTransition } from "react";
import { Check, Loader2, X } from "lucide-react";
import { approvePayment, rejectPayment } from "@/app/[locale]/admin/actions";

export type PayReq = {
  id: string;
  email: string | null;
  plan: string;
  cycle: string;
  amount: number;
  method: string;
  reference: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

export default function PaymentRow({ req, ar }: { req: PayReq; ar: boolean }) {
  const [pending, start] = useTransition();
  const isPending = req.status === "pending";

  return (
    <div className="border-t border-white/5 px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-white/85">{req.email}</p>
          <p className="mt-0.5 text-xs text-white/45">
            <span className="capitalize text-violet-300">{req.plan}</span> ·{" "}
            {req.cycle === "yearly" ? (ar ? "سنوي" : "yearly") : ar ? "شهري" : "monthly"} · $
            {Number(req.amount).toFixed(0)} · {req.method}
          </p>
          {req.reference && (
            <p dir="ltr" className="mt-1 break-all font-mono text-[11px] text-white/50">
              {req.reference}
            </p>
          )}
          {req.note && <p className="mt-1 text-xs text-white/40">{req.note}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {pending && <Loader2 size={15} className="animate-spin text-white/40" />}
          {isPending ? (
            <>
              <button
                onClick={() => start(() => approvePayment(req.id))}
                className="btn-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
              >
                <Check size={13} /> {ar ? "تفعيل" : "Approve"}
              </button>
              <button
                onClick={() => start(() => rejectPayment(req.id))}
                className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
              >
                <X size={13} /> {ar ? "رفض" : "Reject"}
              </button>
            </>
          ) : (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                req.status === "approved"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-white/15 text-white/45"
              }`}
            >
              {req.status === "approved"
                ? ar
                  ? "مُفعّل"
                  : "approved"
                : ar
                  ? "مرفوض"
                  : "rejected"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
