"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
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
  const pathname = usePathname();
  const base = "";

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
          </div>
        </div>
      )}
    </header>
  );
}
