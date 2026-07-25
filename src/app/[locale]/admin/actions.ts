"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, requireStaff } from "@/lib/admin";
import { createServiceClient } from "@/lib/supabase/server";

async function guardAdmin() {
  const admin = await requireAdmin();
  if (!admin) throw new Error("not_authorized");
  return { svc: createServiceClient(), admin };
}

async function guardStaff() {
  const staff = await requireStaff();
  if (!staff) throw new Error("not_authorized");
  return createServiceClient();
}

/* ---------------- Users ---------------- */
export async function setUserPlan(userId: string, plan: string) {
  if (!["free", "pro", "ultimate"].includes(plan)) return;
  const { svc } = await guardAdmin();
  await svc.from("profiles").update({ plan, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function setUserRole(userId: string, role: string) {
  if (!["user", "editor", "admin"].includes(role)) return;
  const { svc } = await guardAdmin();
  await svc.from("profiles").update({ role, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function setUserStatus(userId: string, status: string) {
  if (!["active", "suspended"].includes(status)) return;
  const { svc } = await guardAdmin();
  await svc.from("profiles").update({ status, updated_at: new Date().toISOString() }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const { svc } = await guardAdmin();
  await svc.auth.admin.deleteUser(userId);
  revalidatePath("/admin/users");
}

/** Grant a role by email (add an admin or an article editor without env edits). */
export async function grantRoleByEmail(email: string, role: string) {
  if (!["editor", "admin"].includes(role)) return { ok: false, message: "bad_role" };
  const { svc } = await guardAdmin();
  const clean = email.trim().toLowerCase();
  if (!clean) return { ok: false, message: "empty" };
  const { data } = await svc.from("profiles").select("id").eq("email", clean).maybeSingle();
  if (!data) return { ok: false, message: "not_found" };
  await svc.from("profiles").update({ role }).eq("id", data.id);
  revalidatePath("/admin/users");
  return { ok: true, message: "granted" };
}

/* ---------------- Subscriptions (manual approval) ---------------- */
export async function approvePayment(requestId: string) {
  const { svc, admin } = await guardAdmin();

  const { data: reqRow } = await svc
    .from("payment_requests")
    .select("id, user_id, plan, cycle, status")
    .eq("id", requestId)
    .single();
  if (!reqRow || reqRow.status === "approved") return;

  const now = new Date();
  const end = new Date(now);
  if (reqRow.cycle === "yearly") end.setFullYear(end.getFullYear() + 1);
  else end.setMonth(end.getMonth() + 1);

  await svc.from("subscriptions").insert({
    user_id: reqRow.user_id,
    plan: reqRow.plan,
    status: "active",
    provider: "manual",
    current_period_start: now.toISOString(),
    current_period_end: end.toISOString(),
  });

  await svc.from("profiles").update({ plan: reqRow.plan }).eq("id", reqRow.user_id);

  await svc
    .from("payment_requests")
    .update({
      status: "approved",
      reviewed_by: admin.id,
      reviewed_at: now.toISOString(),
    })
    .eq("id", requestId);

  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

export async function rejectPayment(requestId: string) {
  const { svc, admin } = await guardAdmin();
  await svc
    .from("payment_requests")
    .update({
      status: "rejected",
      reviewed_by: admin.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", requestId);
  revalidatePath("/admin/payments");
}

/* ---------------- Articles (admins AND editors) ---------------- */
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
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function savePost(input: PostInput, id?: string) {
  const svc = await guardStaff();
  const slug = slugify(input.slug || input.title_en || String(Date.now()));
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

  const { error } = id
    ? await svc.from("blog_posts").update(row).eq("id", id)
    : await svc.from("blog_posts").insert(row);

  if (error) {
    return { ok: false, message: error.message.includes("duplicate") ? "duplicate_slug" : "error" };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  return { ok: true, slug };
}

export async function deletePost(id: string) {
  const svc = await guardStaff();
  await svc.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath("/");
}
