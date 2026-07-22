"use client";

import { useState, useTransition } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { promoteByEmail } from "@/app/[locale]/admin/actions";

export default function PromoteBox({ ar }: { ar: boolean }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const res = await promoteByEmail(email);
      if (res.ok) {
        setMsg(ar ? "تمت الترقية إلى أدمن ✓" : "Promoted to admin ✓");
        setEmail("");
      } else if (res.message === "not_found") {
        setMsg(ar ? "لا يوجد مستخدم بهذا البريد (لازم يسجّل أولاً)." : "No user with that email (they must sign up first).");
      } else {
        setMsg(ar ? "أدخل بريداً صحيحاً." : "Enter a valid email.");
      }
    });
  }

  return (
    <form onSubmit={submit} className="glass glow-card rounded-2xl p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <UserPlus size={16} className="text-violet-300" />
        {ar ? "إضافة أدمن جديد بالبريد" : "Add a new admin by email"}
      </h2>
      <p className="mt-1 text-xs text-white/45">
        {ar
          ? "المستخدم يجب أن يكون سجّل حساباً أولاً. الترقية فورية بلا تعديل إعدادات."
          : "The user must have signed up first. Promotion is instant, no config edit needed."}
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="new-admin@email.com"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm outline-none focus:border-violet-400/50"
        />
        <button
          disabled={pending}
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {ar ? "ترقية" : "Promote"}
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-violet-200">{msg}</p>}
    </form>
  );
}
