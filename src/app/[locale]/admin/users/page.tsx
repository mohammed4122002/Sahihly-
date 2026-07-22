import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { requireAdmin, getAdminEmails } from "@/lib/admin";
import { createServiceClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import UserRow, { type AdminUser } from "@/components/admin/UserRow";
import PromoteBox from "@/components/admin/PromoteBox";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const admin = await requireAdmin();
  if (!admin) notFound();

  let users: AdminUser[] = [];
  let configured = true;
  try {
    const svc = createServiceClient();
    const { data } = await svc
      .from("profiles")
      .select("id, email, full_name, plan, role, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    users = (data ?? []) as AdminUser[];
  } catch {
    configured = false;
  }

  const owners = getAdminEmails();

  return (
    <div className="container-x py-12">
      <div>
        <span className="eyebrow">{ar ? "الإدارة" : "Administration"}</span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {ar ? "إدارة المستخدمين" : "User management"}
        </h1>
      </div>
      <AdminNav ar={ar} />

      {!configured && (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          {ar
            ? "اضبط SUPABASE_SERVICE_ROLE_KEY لإدارة المستخدمين."
            : "Set SUPABASE_SERVICE_ROLE_KEY to manage users."}
        </p>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="glass glow-card overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <h2 className="text-sm font-semibold text-white/80">
              {ar ? "كل المستخدمين" : "All users"} ({users.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-white/40">
                  <th className="px-4 py-2.5 text-start font-medium">{ar ? "البريد" : "Email"}</th>
                  <th className="px-4 py-2.5 text-start font-medium">{ar ? "الخطة" : "Plan"}</th>
                  <th className="px-4 py-2.5 text-start font-medium">{ar ? "الدور" : "Role"}</th>
                  <th className="px-4 py-2.5 text-start font-medium">{ar ? "الحالة" : "Status"}</th>
                  <th className="px-4 py-2.5 text-end font-medium">{ar ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-sm text-white/40">
                      {ar ? "لا مستخدمون بعد." : "No users yet."}
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <UserRow
                      key={u.id}
                      user={u}
                      ar={ar}
                      isOwnerEmail={owners.includes((u.email ?? "").toLowerCase())}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <PromoteBox ar={ar} />
          <div className="glass rounded-2xl p-5 text-xs text-white/50">
            <p className="font-medium text-white/70">{ar ? "ملاحظات" : "Notes"}</p>
            <ul className="mt-2 space-y-1.5">
              <li>• {ar ? "الأدمن يحصل على استخدام غير محدود تلقائياً." : "Admins get unlimited usage automatically."}</li>
              <li>• {ar ? "الإيقاف يمنع الدخول الفعّال دون حذف البيانات." : "Suspending blocks effective access without deleting data."}</li>
              <li>• {ar ? "الحذف نهائي ويزيل حساب المصادقة." : "Delete is permanent and removes the auth account."}</li>
            </ul>
          </div>
          <Link href="/admin" className="btn-ghost block rounded-full px-4 py-2 text-center text-sm">
            {ar ? "العودة للنظرة العامة" : "Back to overview"}
          </Link>
        </div>
      </div>
    </div>
  );
}
