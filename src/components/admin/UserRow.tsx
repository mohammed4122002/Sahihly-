"use client";

import { useState, useTransition } from "react";
import { Loader2, Ban, CircleCheck, Trash2, AlertTriangle } from "lucide-react";
import { setUserPlan, setUserRole, setUserStatus, deleteUser } from "@/app/[locale]/admin/actions";

const ROLE_STYLES: Record<string, string> = {
  admin: "border-violet-400/40 bg-violet-400/15 text-violet-200",
  editor: "border-sky-400/40 bg-sky-400/15 text-sky-200",
  user: "border-white/15 text-white/50",
};

export type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  plan: string;
  role: string;
  status: string;
  created_at: string;
};

export default function UserRow({
  user,
  ar,
  isOwnerEmail,
}: {
  user: AdminUser;
  ar: boolean;
  isOwnerEmail: boolean;
}) {
  const [pending, start] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const suspended = user.status === "suspended";
  // Mirrors the <th> headings so each cell can label itself once the
  // table collapses into stacked cards on phones (see .stack-table).
  const L = {
    email: ar ? "البريد" : "Email",
    plan: ar ? "الخطة" : "Plan",
    role: ar ? "الدور" : "Role",
    status: ar ? "الحالة" : "Status",
    actions: ar ? "إجراءات" : "Actions",
  };

  return (
    <tr className="border-t border-white/5">
      <td data-label={L.email} className="px-4 py-3">
        <div className="text-white/85">{user.email}</div>
        {user.full_name && <div className="text-xs text-white/40">{user.full_name}</div>}
      </td>
      <td data-label={L.plan} className="px-4 py-3">
        <select
          defaultValue={user.plan}
          disabled={pending}
          onChange={(e) => start(() => setUserPlan(user.id, e.target.value))}
          className="h-10 rounded-lg border border-white/10 bg-black/30 px-2 text-xs outline-none focus:border-violet-400/50 sm:h-8"
        >
          <option value="free">free</option>
          <option value="pro">pro</option>
          <option value="ultimate">ultimate</option>
        </select>
      </td>
      <td data-label={L.role} className="px-4 py-3">
        <select
          defaultValue={user.role}
          disabled={pending || isOwnerEmail}
          onChange={(e) => start(() => setUserRole(user.id, e.target.value))}
          className={`h-10 rounded-full border bg-black/30 px-2 text-[11px] outline-none sm:h-8 ${
            ROLE_STYLES[user.role] ?? ROLE_STYLES.user
          }`}
        >
          <option value="user">{ar ? "مستخدم" : "user"}</option>
          <option value="editor">{ar ? "محرّر" : "editor"}</option>
          <option value="admin">{ar ? "أدمن" : "admin"}</option>
        </select>
      </td>
      <td data-label={L.status} className="px-4 py-3">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] ${
            suspended
              ? "border-red-500/30 bg-red-500/10 text-red-300"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {suspended ? (ar ? "موقوف" : "suspended") : ar ? "نشط" : "active"}
        </span>
      </td>
      <td data-label={L.actions} className="px-4 py-3">
        {/*
         * Delete used to turn into a one-word "confirm" button sitting in the
         * exact spot the delete button just was — so the same tap location that
         * asked for confirmation was the tap that granted it. On a touchscreen,
         * a lagging UI or an eager second tap is ordinary, and this account
         * deletion is real and irreversible, unlike a draft article. The
         * confirmation now names the person and sits in its own row with an
         * explicit, equally-sized Cancel next to it.
         */}
        {confirmDelete ? (
          <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-red-200">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              {ar
                ? `حذف حساب ${user.email} نهائياً؟ يُحذف حساب الدخول ولا يمكن التراجع.`
                : `Delete ${user.email}'s account permanently? This removes their login and cannot be undone.`}
            </p>
            <div className="mt-2.5 flex gap-2">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  start(() => deleteUser(user.id));
                }}
                className="h-10 flex-1 rounded-full border border-red-500/40 bg-red-500/20 text-xs font-medium text-red-100"
              >
                {ar ? "نعم، احذف" : "Yes, delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn-ghost h-10 flex-1 rounded-full text-xs"
              >
                {ar ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1">
            {pending && <Loader2 size={14} className="animate-spin text-white/40" />}
            {isOwnerEmail ? (
              <span className="text-[11px] text-white/30">{ar ? "المالك" : "owner"}</span>
            ) : (
              <>
                <button
                  title={suspended ? "Reactivate" : "Suspend"}
                  onClick={() => start(() => setUserStatus(user.id, suspended ? "active" : "suspended"))}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/40 hover:bg-white/5 hover:text-amber-300 sm:h-9 sm:w-9"
                >
                  {suspended ? <CircleCheck size={16} /> : <Ban size={16} />}
                </button>
                <button
                  title="Delete"
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-300 sm:h-9 sm:w-9"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
