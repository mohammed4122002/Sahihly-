import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import SignOutButton from "@/components/SignOutButton";
import { isAdminEmail } from "@/lib/admin";
import { CreditCard, History, Sparkles, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

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
          {locale === "ar" ? "سجّل دخولك لعرض لوحتك." : "Log in to view your dashboard."}
        </p>
        <Link href={`${base}/login?next=/dashboard`} className="btn-primary mt-6 rounded-full px-6 py-2.5 text-sm">
          {dict.nav.login}
        </Link>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("current_period_end", { ascending: false })
    .maybeSingle();

  const { data: history } = await supabase
    .from("analyses")
    .select("id, kind, word_count, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const plan = profile?.plan ?? "free";

  return (
    <div className="container-x max-w-4xl py-16">
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
              {locale === "ar" ? "لوحة الإدارة" : "Admin Console"}
            </Link>
          )}
          <SignOutButton locale={locale} label={d.signOut} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="glass glow-card rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <CreditCard size={16} /> {d.plan}
          </div>
          <p className="mt-2 text-2xl font-bold capitalize">{plan}</p>
          {sub?.current_period_end && (
            <p className="mt-1 text-xs text-white/40">
              {d.renews}: {formatDate(sub.current_period_end, locale)}
            </p>
          )}
          {plan === "free" && (
            <Link href={`${base}/pricing`} className="btn-primary mt-4 inline-flex rounded-full px-4 py-2 text-sm">
              {d.upgrade}
            </Link>
          )}
        </div>

        <div className="glass glow-card rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Sparkles size={16} /> {dict.nav.detector}
          </div>
          <p className="mt-2 text-sm text-white/60">
            {locale === "ar"
              ? "توجّه للاستوديو لتحليل نص أو تنسينه."
              : "Head to the studio to detect or humanize."}
          </p>
          <Link href="/" className="btn-ghost mt-4 inline-flex rounded-full px-4 py-2 text-sm">
            {dict.cta.button}
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <History size={18} /> {d.history}
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          {history && history.length > 0 ? (
            history.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-sm last:border-0"
              >
                <span className="capitalize text-white/80">{h.kind}</span>
                <span className="text-white/40">
                  {h.word_count} {dict.tool.words}
                </span>
                <span className="text-white/40">{formatDate(h.created_at, locale)}</span>
              </div>
            ))
          ) : (
            <p className="px-5 py-8 text-center text-sm text-white/40">{d.noHistory}</p>
          )}
        </div>
      </div>
    </div>
  );
}
