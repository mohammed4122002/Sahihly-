"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = "";
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, locale }),
    });
    setDone(true);
    setEmail("");
  }

  const cols = [
    {
      title: dict.footer.product,
      links: [
        { href: "/ai-detector", label: dict.nav.detector },
        { href: "/ai-humanizer", label: dict.nav.humanizer },
        { href: `${base}/pricing`, label: dict.nav.pricing },
      ],
    },
    {
      title: dict.footer.resources,
      links: [
        { href: `${base}/blog`, label: dict.nav.blog },
        { href: `${base}/vs`, label: dict.nav.compare },
        { href: `${base}/word-counter`, label: locale === "ar" ? "عدّاد الكلمات" : "Word Counter" },
        { href: `${base}/glossary`, label: locale === "ar" ? "قاموس المصطلحات" : "Glossary" },
        { href: `${base}/vs/undetectable-ai`, label: "vs Undetectable.ai" },
        { href: `${base}/vs/quillbot`, label: "vs QuillBot" },
        { href: `${base}/vs/gptzero`, label: "vs GPTZero" },
        { href: `${base}/vs/copyleaks`, label: "vs Copyleaks" },
        { href: `${base}/vs/zerogpt`, label: "vs ZeroGPT" },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: `${base}/about`, label: dict.nav.about },
        { href: `${base}/contact`, label: locale === "ar" ? "تواصل معنا" : "Contact" },
        { href: `${base}/about#policy`, label: dict.ethics.link },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: `${base}/privacy`, label: dict.footer.privacy },
        { href: `${base}/terms`, label: dict.footer.terms },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/50">
            {dict.footer.builtWith}
          </p>
          <form onSubmit={subscribe} className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.footer.emailPlaceholder}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none focus:border-violet-400/60"
            />
            <button className="btn-primary rounded-full px-4 py-2 text-sm">
              {dict.footer.subscribe}
            </button>
          </form>
          {done && (
            <p className="mt-2 text-sm text-violet-300">{dict.footer.subscribed}</p>
          )}
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {dict.meta.siteName}. {dict.footer.rights}
          </p>
          <p>{dict.tool.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
