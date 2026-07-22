"use client";

import { useState, useTransition } from "react";
import { Loader2, ShieldCheck, ShieldOff, Ban, CircleCheck, Trash2 } from "lucide-react";
import { setUserPlan, setUserRole, setUserStatus, deleteUser } from "@/app/[locale]/admin/actions";

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
  const isAdmin = user.role === "admin";

  return (
    <tr className="border-t border-white/5">
      <td className="px-4 py-3">
        <div className="text-white/85">{user.email}</div>
        {user.full_name && <div className="text-xs text-white/40">{user.full_name}</div>}
      </td>
      <td className="px-4 py-3">
        <select
          defaultValue={user.plan}
          disabled={pending}
          onChange={(e) => start(() => setUserPlan(user.id, e.target.value))}
          className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs outline-none focus:border-violet-400/50"
        >
          <option value="free">free</option>
          <option value="pro">pro</option>
          <option value="ultimate">ultimate</option>
        </select>
      </td>
      <td className="px-4 py-3">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] ${
            isAdmin
              ? "border-violet-400/40 bg-violet-400/15 text-violet-200"
              : "border-white/15 text-white/50"
          }`}
        >
          {isAdmin ? (ar ? "أدمن" : "admin") : ar ? "مستخدم" : "user"}
        </span>
      </td>
      <td className="px-4 py-3">
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
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          {pending && <Loader2 size={14} className="animate-spin text-white/40" />}
          {isOwnerEmail ? (
            <span className="text-[11px] text-white/30">{ar ? "المالك" : "owner"}</span>
          ) : (
            <>
              <button
                title={isAdmin ? "Demote" : "Promote to admin"}
                onClick={() => start(() => setUserRole(user.id, isAdmin ? "user" : "admin"))}
                className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-violet-300"
              >
                {isAdmin ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
              </button>
              <button
                title={suspended ? "Reactivate" : "Suspend"}
                onClick={() => start(() => setUserStatus(user.id, suspended ? "active" : "suspended"))}
                className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-amber-300"
              >
                {suspended ? <CircleCheck size={15} /> : <Ban size={15} />}
              </button>
              {confirmDelete ? (
                <button
                  onClick={() => start(() => deleteUser(user.id))}
                  className="rounded-lg bg-red-500/15 px-2 py-1 text-[11px] text-red-300"
                >
                  {ar ? "تأكيد" : "confirm"}
                </button>
              ) : (
                <button
                  title="Delete"
                  onClick={() => setConfirmDelete(true)}
                  className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
