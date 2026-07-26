import { createClient } from "@/lib/supabase/server";
import { resolveAdmin, resolveStaff } from "@/lib/admin";

export type HeaderUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
  isStaff: boolean;
};

/**
 * Resolves the signed-in user for chrome that must reflect real auth state
 * (header, avatar). Returns null when signed out. Never throws — a profile
 * read failure (e.g. avatar_url column not migrated yet) degrades to a
 * user with no avatar rather than breaking the whole page.
 */
export async function getHeaderUser(): Promise<HeaderUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  let fullName: string | null = null;
  let avatarUrl: string | null = null;
  let role: string | null = null;
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, role")
      .eq("id", user.id)
      .maybeSingle();
    fullName = profile?.full_name ?? null;
    avatarUrl = profile?.avatar_url ?? null;
    role = profile?.role ?? null;
  } catch {
    /* profile table/column not ready — user is still authenticated */
  }

  return {
    id: user.id,
    email: user.email ?? "",
    fullName,
    avatarUrl,
    isAdmin: resolveAdmin(user.email, role),
    isStaff: resolveStaff(user.email, role),
  };
}
