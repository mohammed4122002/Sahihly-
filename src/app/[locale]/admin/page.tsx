import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Activity,
  Mail,
  Wallet,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { AreaChart, StackedBars } from "@/components/admin/Charts";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const T = {
  en: {
    title: "Admin Console",
    eyebrow: "Owner only",
    updated: "Live data · refreshed on load",
    kpis: {
      users: "Total users",
      activeSubs: "Active subscriptions",
      revenue: "Revenue (USDT)",
      analyses: "Analyses run",
      subscribers: "Newsletter subscribers",
      paidOrders: "Paid orders",
    },
    charts: {
      signups: "Signups — last 14 days",
      signupsSeries: "Signups",
      analyses: "Analyses — last 14 days",
      detect: "Detect",
      humanize: "Humanize",
    },
    tables: {
      recentOrders: "Recent orders",
      recentUsers: "Recent users",
      orderCols: ["Order", "Plan", "Amount", "Status", "Date"],
      userCols: ["Email", "Plan", "Joined"],
      empty: "Nothing here yet.",
    },
    status: { paid: "Paid", created: "Pending", failed: "Failed", expired: "Expired", refunded: "Refunded" },
    setup: {
      title: "Connect full data access",
      body: "Set SUPABASE_SERVICE_ROLE_KEY in your environment so the console can read across all users (RLS-safe, server-only). Until then, totals show 0.",
    },
    backToDashboard: "Your dashboard",
  },
  ar: {
    title: "لوحة الإدارة",
    eyebrow: "للمالك فقط",
    updated: "بيانات حيّة · تُحدَّث عند الفتح",
    kpis: {
      users: "إجمالي المستخدمين",
      activeSubs: "اشتراكات نشطة",
      revenue: "الإيرادات (USDT)",
      analyses: "تحليلات منفَّذة",
      subscribers: "مشتركو النشرة",
      paidOrders: "طلبات مدفوعة",
    },
    charts: {
      signups: "التسجيلات — آخر ١٤ يوماً",
      signupsSeries: "تسجيلات",
      analyses: "التحليلات — آخر ١٤ يوماً",
      detect: "كشف",
      humanize: "تنسين",
    },
    tables: {
      recentOrders: "أحدث الطلبات",
      recentUsers: "أحدث المستخدمين",
      orderCols: ["الطلب", "الخطة", "المبلغ", "الحالة", "التاريخ"],
      userCols: ["البريد", "الخطة", "الانضمام"],
      empty: "لا شيء بعد.",
    },
    status: { paid: "مدفوع", created: "معلّق", failed: "فشل", expired: "منتهٍ", refunded: "مسترد" },
    setup: {
      title: "فعّل الوصول الكامل للبيانات",
      body: "اضبط SUPABASE_SERVICE_ROLE_KEY في بيئة التشغيل لتقرأ اللوحة بيانات كل المستخدمين (آمن على السيرفر فقط). حتى ذلك الحين تظهر الإجماليات صفراً.",
    },
    backToDashboard: "لوحتك الشخصية",
  },
};

type OrderRow = {
  merchant_trade_no: string;
  plan: string;
  amount: number;
  status: string;
  created_at: string;
};
type UserRow = { email: string | null; plan: string; created_at: string };

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

async function loadData() {
  const configured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const empty = {
    configured,
    users: 0,
    activeSubs: 0,
    revenue: 0,
    analysesCount: 0,
    subscribers: 0,
    paidOrders: 0,
    signupsByDay: [] as number[],
    detectByDay: [] as number[],
    humanizeByDay: [] as number[],
    days: lastNDays(14),
    recentOrders: [] as OrderRow[],
    recentUsers: [] as UserRow[],
  };
  if (!configured) return empty;

  try {
    const svc = createServiceClient();
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 13);
    const sinceIso = since.toISOString().slice(0, 10);

    const [
      usersQ,
      subsQ,
      paidQ,
      analysesQ,
      subscribersQ,
      signupsQ,
      analysesSeriesQ,
      ordersQ,
      usersRecentQ,
    ] = await Promise.all([
      svc.from("profiles").select("*", { count: "exact", head: true }),
      svc.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
      svc.from("payment_orders").select("amount").eq("status", "paid"),
      svc.from("analyses").select("*", { count: "exact", head: true }),
      svc.from("subscribers").select("*", { count: "exact", head: true }),
      svc.from("profiles").select("created_at").gte("created_at", sinceIso),
      svc.from("analyses").select("created_at, kind").gte("created_at", sinceIso),
      svc
        .from("payment_orders")
        .select("merchant_trade_no, plan, amount, status, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      svc
        .from("profiles")
        .select("email, plan, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    const days = lastNDays(14);
    const idx = new Map(days.map((d, i) => [d, i]));
    const signupsByDay = Array(14).fill(0);
    for (const r of signupsQ.data ?? []) {
      const i = idx.get(String(r.created_at).slice(0, 10));
      if (i !== undefined) signupsByDay[i]++;
    }
    const detectByDay = Array(14).fill(0);
    const humanizeByDay = Array(14).fill(0);
    for (const r of analysesSeriesQ.data ?? []) {
      const i = idx.get(String(r.created_at).slice(0, 10));
      if (i === undefined) continue;
      if (r.kind === "humanize") humanizeByDay[i]++;
      else detectByDay[i]++;
    }

    return {
      configured,
      users: usersQ.count ?? 0,
      activeSubs: subsQ.count ?? 0,
      revenue: (paidQ.data ?? []).reduce((s: number, o: { amount: number }) => s + Number(o.amount || 0), 0),
      analysesCount: analysesQ.count ?? 0,
      subscribers: subscribersQ.count ?? 0,
      paidOrders: (paidQ.data ?? []).length,
      signupsByDay,
      detectByDay,
      humanizeByDay,
      days,
      recentOrders: (ordersQ.data ?? []) as OrderRow[],
      recentUsers: (usersRecentQ.data ?? []) as UserRow[],
    };
  } catch {
    return empty;
  }
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  created: "bg-white/10 text-white/60 border-white/20",
  failed: "bg-red-500/15 text-red-300 border-red-500/30",
  expired: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  refunded: "bg-sky-500/15 text-sky-300 border-sky-500/30",
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = T[locale];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin");
  if (!isAdminEmail(user.email)) notFound();

  const d = await loadData();
  const dayLabels = d.days.map((day) => day.slice(5)); // MM-DD

  const kpis = [
    { icon: Users, label: t.kpis.users, value: d.users },
    { icon: ShieldCheck, label: t.kpis.activeSubs, value: d.activeSubs },
    { icon: Wallet, label: t.kpis.revenue, value: `$${d.revenue.toFixed(0)}` },
    { icon: Activity, label: t.kpis.analyses, value: d.analysesCount },
    { icon: CreditCard, label: t.kpis.paidOrders, value: d.paidOrders },
    { icon: Mail, label: t.kpis.subscribers, value: d.subscribers },
  ];

  return (
    <div className="container-x py-12">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t.title}</h1>
          <p className="mt-1 text-sm text-white/40">{t.updated}</p>
        </div>
        <Link href="/dashboard" className="btn-ghost rounded-full px-4 py-2 text-sm">
          {t.backToDashboard}
        </Link>
      </div>

      {!d.configured && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={18} />
          <div>
            <p className="font-semibold text-amber-200">{t.setup.title}</p>
            <p className="mt-1 text-sm text-amber-100/70">{t.setup.body}</p>
          </div>
        </div>
      )}

      {/* KPI tiles */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="glass glow-card rounded-2xl p-4">
            <k.icon size={16} className="text-violet-300" />
            <p className="font-display mt-3 text-2xl font-bold tabular-nums">{k.value}</p>
            <p className="mt-1 text-xs text-white/50">{k.label}</p>
          </div>
        ))}
      </div>

      {/* charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass glow-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white/80">{t.charts.signups}</h2>
          <div className="mt-4">
            <AreaChart labels={dayLabels} values={d.signupsByDay} seriesName={t.charts.signupsSeries} />
          </div>
        </div>
        <div className="glass glow-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white/80">{t.charts.analyses}</h2>
          <div className="mt-4">
            <StackedBars
              labels={dayLabels}
              a={d.detectByDay}
              b={d.humanizeByDay}
              aName={t.charts.detect}
              bName={t.charts.humanize}
            />
          </div>
        </div>
      </div>

      {/* tables */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass glow-card overflow-hidden rounded-2xl">
          <h2 className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-white/80">
            {t.tables.recentOrders}
          </h2>
          {d.recentOrders.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-white/40">{t.tables.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-start text-xs text-white/40">
                    {t.tables.orderCols.map((c) => (
                      <th key={c} className="px-5 py-2.5 text-start font-medium">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.recentOrders.map((o) => (
                    <tr key={o.merchant_trade_no} className="border-t border-white/5">
                      <td className="px-5 py-3 font-mono text-xs text-white/60">
                        {o.merchant_trade_no.slice(0, 12)}…
                      </td>
                      <td className="px-5 py-3 capitalize">{o.plan}</td>
                      <td className="px-5 py-3 tabular-nums">${Number(o.amount).toFixed(0)}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${STATUS_STYLES[o.status] ?? STATUS_STYLES.created}`}
                        >
                          {t.status[o.status as keyof typeof t.status] ?? o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-white/50">
                        {formatDate(o.created_at, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="glass glow-card overflow-hidden rounded-2xl">
          <h2 className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-white/80">
            {t.tables.recentUsers}
          </h2>
          {d.recentUsers.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-white/40">{t.tables.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-white/40">
                    {t.tables.userCols.map((c) => (
                      <th key={c} className="px-5 py-2.5 text-start font-medium">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.recentUsers.map((u) => (
                    <tr key={u.email ?? u.created_at} className="border-t border-white/5">
                      <td className="px-5 py-3 text-white/80">{u.email}</td>
                      <td className="px-5 py-3 capitalize">{u.plan}</td>
                      <td className="px-5 py-3 text-xs text-white/50">
                        {formatDate(u.created_at, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
