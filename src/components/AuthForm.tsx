"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

export default function AuthForm({
  mode,
  locale,
  dict,
}: {
  mode: "login" | "signup";
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.auth;
  const base = "";
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, locale } },
        });
        if (error) throw error;
        setInfo(a.checkEmail);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(`${base}${next}`);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          `${base}${next}`
        )}`,
      },
    });
  }

  return (
    <div className="glass-strong glow-card w-full max-w-md rounded-3xl p-8">
      <h1 className="text-2xl font-bold">
        {mode === "login" ? a.loginTitle : a.signupTitle}
      </h1>

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <Field
            label={a.name}
            type="text"
            value={name}
            onChange={setName}
            required
          />
        )}
        <Field label={a.email} type="email" value={email} onChange={setEmail} required />
        <Field
          label={a.password}
          type="password"
          value={password}
          onChange={setPassword}
          required
        />

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {mode === "login" ? a.loginBtn : a.signupBtn}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-white/30">
        <span className="h-px flex-1 bg-white/10" />
        {a.orContinue}
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        onClick={google}
        className="btn-ghost flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm"
      >
        {a.google}
      </button>

      <p className="mt-6 text-center text-sm text-white/50">
        {mode === "login" ? a.noAccount : a.haveAccount}{" "}
        <Link
          href={`${base}/${mode === "login" ? "signup" : "login"}`}
          className="text-violet-300 hover:text-violet-200"
        >
          {mode === "login" ? a.signupBtn : a.loginBtn}
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/50">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none transition-colors focus:border-violet-400/50"
      />
    </label>
  );
}
