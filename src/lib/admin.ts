import { createClient } from "@/lib/supabase/server";

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

/**
 * Server-side guard: returns the authenticated admin user, or null.
 * Use at the top of every admin page and server action.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Env owners are always admin, even before a profile row exists.
  if (isAdminEmail(user.email)) return user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.role === "admin" ? user : null;
}
