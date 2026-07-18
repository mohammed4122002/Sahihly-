import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import SignOutButton from "@/components/SignOutButton";
import HistoryList, { type HistoryRow } from "@/components/HistoryList";
import { AreaChart } from "@/components/admin/Charts";
import { isAdminEmail } from "@/lib/admin";
import {
  CreditCard,
  History,
  Sparkles,
  ShieldCheck,
  ScanLine,
  FileText,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

function lastNDays(n: number): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const base = "";
  const d = dict.dashboard;
  const ar = locale === "ar";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Sparkles className="mb-4 text-violet-300" />
        <h1 className="text-2xl font-bold">{d.title}</h1>
        <p className="mt-2 text-white/55">
          {ar ? "سجّل دخولك لعرض لوحتك." : "Log in to view your dashboard."}
        </p>
        <Link
          href={`${base}/login?next=/dashboard`}
          className="btn-primary mt-6 rounded-full px-6 py-2.5 text-sm"
        >
          {dict.nav.login}
        </Link>
      </div>
    );
  }

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 13);

  const [{ data: profile }, { data: sub }, { data: history }, { data: series }] =
    await Promise.all([
      supabase.from("profiles").select("plan, full_name").eq("id", user.id).maybeSingle(),
      supabase
        .from("subscriptions")
        .select("plan, status, current_period_end")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("current_period_end", { ascending: false })
        .maybeSingle(),
      supabase
        .from("analyses")
        .select("id, kind, word_count, created_at, result")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("analyses")
        .select("created_at, kind, word_count")
        .eq("user_id", user.id)
        .gte("created_at", since.toISOString().slice(0, 10)),
    ]);

  const plan = profile?.plan ?? "free";

  // aggregate stats + 14-day activity
  const all = series ?? [];
  const totalRuns = all.length;
  const totalWords = all.reduce((s, r) => s + (r.word_count || 0), 0);
  const detects = all.filter((r) => r.kind !== "humanize").length;
  const humanizes = totalRuns - detects;

  const days = lastNDays(14);
  const idx = new Map(days.map((day, i) => [day, i]));
  const activity = Array(14).fill(0);
  for (const r of all) {
    const i = idx.get(String(r.created_at).slice(0, 10));
    if (i !== undefined) activity[i]++;
  }
  const dayLabels = days.map((day) => day.slice(5));

  const stats = [
    { icon: Activity, label: ar ? "محاولات (١٤ يوماً)" : "Runs (14 days)", value: totalRuns },
    { icon: FileText, label: ar ? "كلمات معالَجة" : "Words processed", value: totalWords.toLocaleString() },
    { icon: ScanLine, label: ar ? "فحوصات" : "Detections", value: detects },
    { icon: Sparkles, label: ar ? "تنسينات" : "Humanizations", value: humanizes },
  ];

  return (
    <div className="container-x max-w-5xl py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">{d.welcome}</p>
          <h1 className="text-3xl font-bold">
            {profile?.full_name || user.email?.split("@")[0]}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isAdminEmail(user.email) && (
            <Link
              href="/admin"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
            >
              <ShieldCheck size={15} />
              {ar ? "لوحة الإدارة" : "Admin Console"}
            </Link>
          )}
          <SignOutButton locale={locale} label={d.signOut} />
        </div>
      </div>

      {/* stat tiles */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass glow-card rounded-2xl p-4">
            <s.icon size={16} className="text-violet-300" />
            <p className="font-display mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="mt-1 text-xs text-white/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* activity chart */}
        <div className="glass glow-card rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white/80">
            {ar ? "نشاطك — آخر ١٤ يوماً" : "Your activity — last 14 days"}
          </h2>
          <div className="mt-4">
            <AreaChart
              labels={dayLabels}
              values={activity}
              seriesName={ar ? "محاولات" : "Runs"}
              height={150}
            />
          </div>
        </div>

        {/* plan card */}
        <div className="glass glow-card flex flex-col rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <CreditCard size={16} /> {d.plan}
          </div>
          <p className="mt-2 text-2xl font-bold capitalize">{plan}</p>
          {sub?.current_period_end && (
            <p className="mt-1 text-xs text-white/40">
              {d.renews}: {formatDate(sub.current_period_end, locale)}
            </p>
          )}
          <div className="mt-auto pt-4">
            {plan === "free" ? (
              <Link
                href={`${base}/pricing`}
                className="btn-primary inline-flex rounded-full px-4 py-2 text-sm"
              >
                {d.upgrade}
              </Link>
            ) : (
              <Link
                href={`${base}/pricing`}
                className="btn-ghost inline-flex rounded-full px-4 py-2 text-sm"
              >
                {d.manage}
              </Link>
            )}
            <Link
              href="/ai-detector"
              className="btn-ghost ms-2 inline-flex rounded-full px-4 py-2 text-sm"
            >
              {dict.cta.button}
            </Link>
          </div>
        </div>
      </div>

      {/* history */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <History size={18} /> {d.history}
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <HistoryList
            rows={(history ?? []) as HistoryRow[]}
            locale={locale}
            labels={{
              words: dict.tool.words,
              empty: d.noHistory,
              deleted: ar ? "حذف" : "Delete",
            }}
          />
        </div>
      </div>
    </div>
  );
}
