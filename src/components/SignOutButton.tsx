"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n/config";

export default function SignOutButton({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}`);
    router.refresh();
  }
  return (
    <button
      onClick={signOut}
      className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
    >
      <LogOut size={15} /> {label}
    </button>
  );
}
