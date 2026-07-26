import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireAdmin } from "@/lib/admin";
import { createServiceClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import PaymentRow, { type PayReq } from "@/components/admin/PaymentRow";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const admin = await requireAdmin();
  if (!admin) notFound();

  let rows: PayReq[] = [];
  let configured = true;
  try {
    const svc = createServiceClient();
    const { data } = await svc
      .from("payment_requests")
      .select("id, email, plan, cycle, amount, method, reference, note, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    rows = (data ?? []) as PayReq[];
  } catch {
    configured = false;
  }

  const pending = rows.filter((r) => r.status === "pending");
  const handled = rows.filter((r) => r.status !== "pending");

  return (
    <div className="container-x max-w-4xl py-8 sm:py-12">
      <div>
        <span className="eyebrow">{ar ? "الاشتراكات" : "Subscriptions"}</span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {ar ? "طلبات الدفع" : "Payment requests"}
        </h1>
        <p className="mt-1 text-sm text-white/40">
          {ar
            ? "راجع رقم العملية في محفظتك، ثم فعّل الاشتراك بضغطة."
            : "Verify the transaction in your wallet, then activate with one click."}
        </p>
      </div>
      <AdminNav ar={ar} />

      {!configured && (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          {ar
            ? "اضبط SUPABASE_SERVICE_ROLE_KEY لعرض الطلبات."
            : "Set SUPABASE_SERVICE_ROLE_KEY to load requests."}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div className="glass glow-card overflow-hidden rounded-2xl">
          <h2 className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-white/80">
            {ar ? "بانتظار المراجعة" : "Awaiting review"} ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-white/40">
              {ar ? "لا طلبات معلّقة." : "No pending requests."}
            </p>
          ) : (
            pending.map((r) => <PaymentRow key={r.id} req={r} ar={ar} />)
          )}
        </div>

        {handled.length > 0 && (
          <div className="glass overflow-hidden rounded-2xl">
            <h2 className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-white/60">
              {ar ? "تمت معالجتها" : "Handled"} ({handled.length})
            </h2>
            {handled.map((r) => (
              <PaymentRow key={r.id} req={r} ar={ar} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
