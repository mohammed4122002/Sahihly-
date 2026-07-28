import { createServiceClient } from "@/lib/supabase/server";
import { getAdminEmails } from "@/lib/admin";
import type { Locale } from "@/lib/i18n/config";

/**
 * Public author records.
 *
 * Everything here is read with the service client on purpose: `profiles` is
 * restricted to each user's own row, so a visitor's session cannot read an
 * author's record, and widening that policy would expose the email address
 * that sits in the same row. These helpers select only the fields meant for a
 * public byline and never return the email.
 *
 * Who counts as an author matches the app's own staff rule: anyone with the
 * editor or admin role, plus the env-configured owner, whose profile row may
 * still say "user".
 */

export type Author = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string | null;
  title: Record<Locale, string>;
  bio: Record<Locale, string>;
  links: {
    website?: string;
    x?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
};

type Row = {
  id: string;
  email: string | null;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  title_ar: string | null;
  title_en: string | null;
  bio_ar: string | null;
  bio_en: string | null;
  website_url: string | null;
  x_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  whatsapp: string | null;
};

const FIELDS =
  "id, email, full_name, username, avatar_url, role, title_ar, title_en, bio_ar, bio_en, website_url, x_url, linkedin_url, facebook_url, instagram_url, youtube_url, whatsapp";

/** Only keep a link that is actually a link, so a half-filled field cannot
 *  render an anchor pointing at nothing. */
function url(value: string | null): string | undefined {
  const v = (value || "").trim();
  if (!v) return undefined;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

/** WhatsApp wants digits only; people type spaces, dashes and brackets. */
function whatsapp(value: string | null): string | undefined {
  const digits = (value || "").replace(/[^\d]/g, "");
  return digits.length >= 8 ? `https://wa.me/${digits}` : undefined;
}

function toAuthor(r: Row): Author {
  return {
    id: r.id,
    username: r.username || r.id,
    fullName: (r.full_name || "").trim() || (r.email || "").split("@")[0],
    avatarUrl: r.avatar_url,
    title: { ar: (r.title_ar || "").trim(), en: (r.title_en || "").trim() },
    bio: { ar: (r.bio_ar || "").trim(), en: (r.bio_en || "").trim() },
    links: {
      website: url(r.website_url),
      x: url(r.x_url),
      linkedin: url(r.linkedin_url),
      facebook: url(r.facebook_url),
      instagram: url(r.instagram_url),
      youtube: url(r.youtube_url),
      whatsapp: whatsapp(r.whatsapp),
    },
  };
}

function isStaffRow(r: Row): boolean {
  if (r.role === "admin" || r.role === "editor") return true;
  const email = (r.email || "").toLowerCase();
  return email !== "" && getAdminEmails().includes(email);
}

/** Everyone who should appear as a writer on the site, admins first. */
export async function getAuthors(): Promise<Author[]> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const svc = createServiceClient();
    const { data } = await svc.from("profiles").select(FIELDS);
    const rows = ((data ?? []) as unknown as Row[]).filter(isStaffRow);
    return rows
      .sort((a, b) => {
        const rank = (x: Row) =>
          x.role === "admin" || getAdminEmails().includes((x.email || "").toLowerCase()) ? 0 : 1;
        return rank(a) - rank(b) || (a.full_name || "").localeCompare(b.full_name || "");
      })
      .map(toAuthor);
  } catch {
    return [];
  }
}

export async function getAuthorByUsername(username: string): Promise<Author | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    const svc = createServiceClient();
    const { data } = await svc.from("profiles").select(FIELDS);
    const rows = ((data ?? []) as unknown as Row[]).filter(isStaffRow);
    const wanted = username.toLowerCase();
    const hit = rows.find(
      (r) => (r.username || "").toLowerCase() === wanted || r.id === username
    );
    return hit ? toAuthor(hit) : null;
  } catch {
    return null;
  }
}

/** Username for a given account id, so a byline can link to the right page. */
export async function getAuthorUsernames(ids: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids)];
  if (unique.length === 0 || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new Map();
  try {
    const svc = createServiceClient();
    const { data } = await svc.from("profiles").select("id, username").in("id", unique);
    return new Map(
      ((data ?? []) as { id: string; username: string | null }[])
        .filter((r) => r.username)
        .map((r) => [r.id, r.username as string])
    );
  } catch {
    return new Map();
  }
}
