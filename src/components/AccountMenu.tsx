"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, ShieldCheck, FileText, LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { HeaderUser } from "@/lib/auth-user";

function initials(user: HeaderUser): string {
  const src = user.fullName || user.email || "?";
  return src.trim().charAt(0).toUpperCase();
}

export default function AccountMenu({
  user,
  labels,
}: {
  user: HeaderUser;
  labels: {
    dashboard: string;
    account: string;
    admin: string;
    articles: string;
    signOut: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-violet-400/15 text-sm font-semibold text-violet-200 transition-colors hover:border-violet-400/40"
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initials(user)
        )}
      </button>

      {open && (
        <div className="glass-strong absolute end-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-white/10 py-2 shadow-xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm font-medium text-white/90">
              {user.fullName || user.email}
            </p>
            <p className="truncate text-xs text-white/45">{user.email}</p>
          </div>

          <div className="py-1.5">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <LayoutDashboard size={15} /> {labels.dashboard}
            </Link>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <Settings size={15} /> {labels.account}
            </Link>
            {user.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                <ShieldCheck size={15} /> {labels.admin}
              </Link>
            )}
            {!user.isAdmin && user.isStaff && (
              <Link
                href="/admin/articles"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                <FileText size={15} /> {labels.articles}
              </Link>
            )}
          </div>

          <div className="border-t border-white/10 py-1.5">
            <button
              onClick={signOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-start text-sm text-red-300/90 hover:bg-red-500/10"
            >
              {signingOut ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
              {labels.signOut}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
