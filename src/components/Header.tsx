"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import AccountMenu from "./AccountMenu";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import type { HeaderUser } from "@/lib/auth-user";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // undefined = "haven't checked yet" (renders a neutral skeleton, never a
  // wrong "Log in" flash); null = confirmed signed out.
  const [user, setUser] = useState<HeaderUser | null | undefined>(undefined);
  const pathname = usePathname();
  const base = "";
  const ar = locale === "ar";

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    // Authoritative server state drives the UI (refreshUser), this listener
    // only tells us WHEN to re-check it — on sign-in, sign-out, and token
    // refresh in this tab or any other tab sharing the session cookie.
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange(() => {
      refreshUser();
    });
    // Fired by the account page after an avatar/name change — same
    // session, but the cached profile fields need a re-fetch.
    window.addEventListener("sahihly:profile-updated", refreshUser);
    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener("sahihly:profile-updated", refreshUser);
    };
  }, [refreshUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/ai-detector", label: dict.nav.detector },
    { href: "/ai-humanizer", label: dict.nav.humanizer },
    { href: `${base}/best`, label: dict.nav.best },
    { href: `${base}/pricing`, label: dict.nav.pricing },
    { href: `${base}/blog`, label: dict.nav.blog },
  ];

  const accountLabels = {
    dashboard: dict.nav.dashboard,
    account: ar ? "الملف الشخصي" : "Account",
    admin: ar ? "لوحة الإدارة" : "Admin console",
    articles: ar ? "المقالات" : "Articles",
    signOut: dict.dashboard.signOut,
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-white/10" : "bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Sahihly home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => {
            const clean = l.href.split("#")[0] || "/";
            const active = clean !== "/" && pathname === clean;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm transition-colors hover:text-white ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 start-0 end-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:text-white"
          >
            <Search size={16} />
          </Link>
          <LanguageSwitcher locale={locale} />

          {user === undefined ? (
            <span className="h-9 w-9 animate-pulse rounded-full border border-white/10 bg-white/5" />
          ) : user ? (
            <AccountMenu user={user} labels={accountLabels} />
          ) : (
            <>
              <Link
                href={`${base}/login`}
                className="hidden rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:text-white sm:inline-flex"
              >
                {dict.nav.login}
              </Link>
              <Link
                href={`${base}/signup`}
                className="btn-primary hidden rounded-full px-4 py-2 text-sm sm:inline-flex"
              >
                {dict.nav.signup}
              </Link>
            </>
          )}

          <button
            className="rounded-lg border border-white/10 p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/10 lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/5"
                >
                  {accountLabels.dashboard}
                </Link>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/5"
                >
                  {accountLabels.account}
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/5"
                  >
                    {accountLabels.admin}
                  </Link>
                )}
              </>
            ) : user === null ? (
              <div className="mt-2 flex gap-2">
                <Link
                  href={`${base}/login`}
                  onClick={() => setOpen(false)}
                  className="btn-ghost flex-1 rounded-full px-4 py-2.5 text-center text-sm"
                >
                  {dict.nav.login}
                </Link>
                <Link
                  href={`${base}/signup`}
                  onClick={() => setOpen(false)}
                  className="btn-primary flex-1 rounded-full px-4 py-2.5 text-center text-sm"
                >
                  {dict.nav.signup}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
