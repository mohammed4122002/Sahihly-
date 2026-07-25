import { createClient } from "@/lib/supabase/server";

export type Role = "user" | "editor" | "admin";

/** Env-based owner bootstrap — comma-separated emails in ADMIN_EMAILS. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "pombut777@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

/** Effective admin = env owner OR profiles.role = 'admin'. */
export function resolveAdmin(email?: string | null, role?: string | null): boolean {
  return isAdminEmail(email) || role === "admin";
}

/** Editors can manage articles only; admins can do everything. */
export function resolveStaff(email?: string | null, role?: string | null): boolean {
  return resolveAdmin(email, role) || role === "editor";
}

async function currentUserWithRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null as Role | null };

  if (isAdminEmail(user.email)) return { user, role: "admin" as Role };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return { user, role: (profile?.role ?? "user") as Role };
}

/** Full admin guard — users, payments, everything. */
export async function requireAdmin() {
  const { user, role } = await currentUserWithRole();
  if (!user) return null;
  return role === "admin" ? user : null;
}

/** Staff guard — admins and editors (article management). */
export async function requireStaff() {
  const { user, role } = await currentUserWithRole();
  if (!user) return null;
  return role === "admin" || role === "editor" ? { user, role } : null;
}
