"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import VerifiedBadge from "./VerifiedBadge";
import type { HeaderUser } from "@/lib/auth-user";
import type { Locale } from "@/lib/i18n/config";

const GREETED_KEY = "sahihly:greeted";

/**
 * Greets a signed-in visitor once per browser session.
 *
 * "Once per session" rather than once per page: the greeting should mark
 * arriving, and a toast that reappears on every navigation stops being a
 * welcome and becomes something to dismiss. sessionStorage clears when the
 * tab closes, so the next real sign-in greets again.
 */
export default function WelcomeToast({ locale }: { locale: Locale }) {
  const [user, setUser] = useState<HeaderUser | null>(null);
  const [show, setShow] = useState(false);
  const ar = locale === "ar";

  const greet = useCallback(async () => {
    try {
      if (sessionStorage.getItem(GREETED_KEY)) return;
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = await res.json();
      // Mark the session as handled either way. A signed-out visitor should
      // not re-ask on every page, and if they sign in later the SIGNED_IN
      // listener clears this and greets them properly.
      sessionStorage.setItem(GREETED_KEY, "1");
      if (!data.user) return;
      setUser(data.user);
      setShow(true);
    } catch {
      /* a greeting is never worth surfacing an error for */
    }
  }, []);

  useEffect(() => {
    greet();
    // A fresh sign-in in this tab should greet even if the session flag was
    // set earlier by a different account.
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        sessionStorage.removeItem(GREETED_KEY);
        greet();
      }
      if (event === "SIGNED_OUT") sessionStorage.removeItem(GREETED_KEY);
    });
    return () => data.subscription.unsubscribe();
  }, [greet]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show || !user) return null;

  const name = (user.fullName || user.email.split("@")[0] || "").trim();
  const first = name.split(/\s+/)[0];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-[85] flex justify-center px-4"
    >
      <div className="glass-strong flex w-full max-w-sm items-center gap-3 rounded-2xl border border-violet-400/25 p-3 shadow-lg">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full border border-white/15 object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-400/15 font-display text-base font-bold text-violet-300">
            {(first || "?").charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-white/90">
            {ar ? `أهلاً بعودتك، ${first}` : `Welcome back, ${first}`}
            {user.isStaff && (
              <VerifiedBadge size={13} label={ar ? "موثّق" : "Verified"} />
            )}
          </p>
          <Link
            href="/dashboard"
            onClick={() => setShow(false)}
            className="text-xs text-violet-300 hover:text-violet-200"
          >
            {ar ? "افتح لوحتك ←" : "Open your dashboard →"}
          </Link>
        </div>

        <button
          onClick={() => setShow(false)}
          aria-label={ar ? "إغلاق" : "Dismiss"}
          className="-me-0.5 shrink-0 rounded-lg p-1 text-white/40 transition-colors hover:text-white"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
