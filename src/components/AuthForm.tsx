"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "./Logo";
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
  const urlError = search.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const ar = locale === "ar";

  function friendlyError(message: string): string {
    const m = message.toLowerCase();
    if (m.includes("invalid login credentials"))
      return ar ? "البريد أو كلمة المرور غير صحيحة." : "Incorrect email or password.";
    if (m.includes("email not confirmed"))
      return ar
        ? "بريدك غير مؤكَّد بعد — افتح رسالة التأكيد في بريدك (تفقد المزعج أيضاً)."
        : "Your email isn't confirmed yet — open the confirmation email (check spam too).";
    if (m.includes("already registered"))
      return ar ? "هذا البريد مسجَّل بالفعل — جرّب تسجيل الدخول." : "This email is already registered — try logging in.";
    if (m.includes("at least 6"))
      return ar ? "كلمة المرور يجب أن تكون ٦ أحرف على الأقل." : "Password must be at least 6 characters.";
    if (m.includes("rate limit") || m.includes("too many"))
      return ar ? "محاولات كثيرة — انتظر دقيقة ثم أعد المحاولة." : "Too many attempts — wait a minute and try again.";
    if (m.includes("provider is not enabled"))
      return ar
        ? "تسجيل Google غير مفعَّل بعد — استخدم البريد وكلمة المرور."
        : "Google sign-in isn't enabled yet — use email and password.";
    if (m.includes("fetch") || m.includes("network"))
      return ar ? "مشكلة اتصال — تحقق من الإنترنت وحاول مجدداً." : "Connection problem — check your internet and retry.";
    return message;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, locale },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
              "/dashboard"
            )}`,
          },
        });
        if (error) throw error;
        // If confirmations are disabled, a session exists — go straight in.
        if (data.session) {
          router.push(`${base}${next}`);
          router.refresh();
        } else {
          setInfo(a.checkEmail);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(`${base}${next}`);
        router.refresh();
      }
    } catch (err) {
      setError(friendlyError(err instanceof Error ? err.message : "Error"));
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            `${base}${next}`
          )}`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(friendlyError(err instanceof Error ? err.message : "Error"));
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="glass flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_0_40px_-8px_rgba(184,166,232,0.5)]">
          <LogoMark />
        </span>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          {mode === "login" ? a.loginTitle : a.signupTitle}
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          {mode === "login"
            ? ar
              ? "سجّل الدخول لمتابعة عملك"
              : "Log in to pick up where you left off"
            : ar
              ? "مجاناً خلال أقل من دقيقة"
              : "Free, and takes less than a minute"}
        </p>
      </div>

      <div className="glass-strong glow-card rounded-3xl p-6 sm:p-8">
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <Field
              label={a.name}
              type="text"
              value={name}
              onChange={setName}
              icon={User}
              required
            />
          )}
          <Field
            label={a.email}
            type="email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            dir="ltr"
            required
          />
          <Field
            label={a.password}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            icon={Lock}
            dir="ltr"
            required
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword
                    ? ar
                      ? "إخفاء كلمة المرور"
                      : "Hide password"
                    : ar
                      ? "إظهار كلمة المرور"
                      : "Show password"
                }
                className="text-white/40 transition-colors hover:text-white/80"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {(error || urlError) && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error ?? friendlyError(urlError!)}
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
          <GoogleIcon />
          {a.google}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-white/50">
        {mode === "login" ? a.noAccount : a.haveAccount}{" "}
        <Link
          href={`${base}/${mode === "login" ? "signup" : "login"}`}
          className="font-medium text-violet-300 hover:text-violet-200"
        >
          {mode === "login" ? a.signupBtn : a.loginBtn}
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7s4.2 9.3 9.3 9.3c5.4 0 9-3.8 9-9.1 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  icon: Icon,
  dir,
  required,
  endAdornment,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  dir?: "ltr" | "rtl";
  required?: boolean;
  endAdornment?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/50">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 transition-colors focus-within:border-violet-400/50">
        <Icon size={15} className="shrink-0 text-white/35" />
        <input
          type={type}
          value={value}
          required={required}
          dir={dir}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
        />
        {endAdornment}
      </div>
    </label>
  );
}
