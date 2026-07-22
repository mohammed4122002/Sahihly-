"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createServiceClient } from "@/lib/supabase/server";

async function guard() {
  const admin = await requireAdmin();
  if (!admin) throw new Error("not_authorized");
  return createServiceClient();
}

/* ---------------- Users ---------------- */
export async function setUserPlan(userId: string, plan: string) {
  if (!["free", "pro", "ultimate"].includes(plan)) return;
  const svc = await guard();
  await svc.from("profiles").update({ plan, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function setUserRole(userId: string, role: string) {
  if (!["user", "admin"].includes(role)) return;
  const svc = await guard();
  await svc.from("profiles").update({ role, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function setUserStatus(userId: string, status: string) {
  if (!["active", "suspended"].includes(status)) return;
  const svc = await guard();
  await svc.from("profiles").update({ status, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const svc = await guard();
  // Removes the auth user; the profile cascades via FK.
  await svc.auth.admin.deleteUser(userId);
  revalidatePath("/admin/users");
}

/** Promote by email (add another admin without touching env). */
export async function promoteByEmail(email: string) {
  const svc = await guard();
  const clean = email.trim().toLowerCase();
  if (!clean) return { ok: false, message: "empty" };
  const { data } = await svc.from("profiles").select("id").eq("email", clean).maybeSingle();
  if (!data) return { ok: false, message: "not_found" };
  await svc.from("profiles").update({ role: "admin" }).eq("id", data.id);
  revalidatePath("/admin/users");
  return { ok: true, message: "promoted" };
}

/* ---------------- Articles ---------------- */
export type PostInput = {
  slug: string;
  category: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  body_en: string;
  body_ar: string;
  reading_time: number;
  published: boolean;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export async function savePost(input: PostInput, id?: string) {
  const svc = await guard();
  const slug = slugify(input.slug || input.title_en);
  const row = {
    slug,
    category: input.category || "Guides",
    title_en: input.title_en,
    title_ar: input.title_ar,
    excerpt_en: input.excerpt_en,
    excerpt_ar: input.excerpt_ar,
    body_en: input.body_en,
    body_ar: input.body_ar,
    reading_time: input.reading_time || 5,
    published: input.published,
    updated_at: new Date().toISOString(),
  };
  if (id) {
    await svc.from("blog_posts").update(row).eq("id", id);
  } else {
    await svc.from("blog_posts").insert(row);
  }
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  return { ok: true, slug };
}

export async function deletePost(id: string) {
  const svc = await guard();
  await svc.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}
