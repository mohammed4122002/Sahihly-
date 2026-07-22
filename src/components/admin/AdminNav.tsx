"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText } from "lucide-react";

export default function AdminNav({ ar }: { ar: boolean }) {
  const pathname = usePathname();
  const tabs = [
    { href: "/admin", label: ar ? "نظرة عامة" : "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: ar ? "المستخدمون" : "Users", icon: Users },
    { href: "/admin/articles", label: ar ? "المقالات" : "Articles", icon: FileText },
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
