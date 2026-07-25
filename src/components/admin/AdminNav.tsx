"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Wallet } from "lucide-react";

export default function AdminNav({ ar, role = "admin" }: { ar: boolean; role?: string }) {
  const pathname = usePathname();
  const isAdmin = role === "admin";

  const tabs = [
    ...(isAdmin
      ? [{ href: "/admin", label: ar ? "نظرة عامة" : "Overview", icon: LayoutDashboard }]
      : []),
    { href: "/admin/articles", label: ar ? "المقالات" : "Articles", icon: FileText },
    ...(isAdmin
      ? [
          { href: "/admin/payments", label: ar ? "الاشتراكات" : "Payments", icon: Wallet },
          { href: "/admin/users", label: ar ? "المستخدمون" : "Users", icon: Users },
        ]
      : []),
  ];

  return (
    <div className="mt-6 inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              active ? "bg-violet-400 text-ocean-900" : "text-white/60 hover:text-white"
            }`}
          >
            <t.icon size={15} />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
