import type { Metadata } from "next";
import TreeLink from "@/components/TreeLink";
import { ArrowLeft } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";
import AccountForm from "@/components/AccountForm";
import AuthorProfileForm from "@/components/AuthorProfileForm";
import { resolveStaff } from "@/lib/admin";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">{ar ? "الملف الشخصي" : "Account"}</h1>
        <p className="mt-2 text-white/55">
          {ar ? "سجّل دخولك لعرض ملفك الشخصي." : "Log in to view your account."}
        </p>
        <TreeLink href="/login?next=/account" className="btn-primary mt-6 rounded-full px-6 py-2.5 text-sm">
          {ar ? "تسجيل الدخول" : "Log in"}
        </TreeLink>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, avatar_url, role, username, title_ar, title_en, bio_ar, bio_en, website_url, x_url, linkedin_url, facebook_url, instagram_url, youtube_url, whatsapp"
    )
    .eq("id", user.id)
    .maybeSingle();

  // The writer fields only mean something for staff — an ordinary user has no
  // author page for a bio or a set of social links to appear on.
  const isStaff = resolveStaff(user.email, profile?.role);

  return (
    <div className="container-x max-w-2xl py-10 sm:py-16">
      <Reveal>
        <TreeLink
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft size={15} className="flip-x" />
          {ar ? "لوحتي" : "Dashboard"}
        </TreeLink>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {ar ? "الملف الشخصي" : "Account"}
        </h1>
        <p className="mt-2 max-w-sm text-sm text-white/55">
          {ar
            ? "غيّر صورتك واسمك الظاهر لحسابك."
            : "Update your photo and display name."}
        </p>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-8">
          <AccountForm
            locale={locale}
            userId={user.id}
            email={user.email ?? ""}
            initialFullName={profile?.full_name ?? ""}
            initialAvatarUrl={profile?.avatar_url ?? null}
          />
        </div>
      </Reveal>

      {isStaff && (
        <Reveal delay={2}>
          <AuthorProfileForm
            locale={locale}
            userId={user.id}
            initial={{
              username: profile?.username ?? "",
              title_ar: profile?.title_ar ?? "",
              title_en: profile?.title_en ?? "",
              bio_ar: profile?.bio_ar ?? "",
              bio_en: profile?.bio_en ?? "",
              website_url: profile?.website_url ?? "",
              x_url: profile?.x_url ?? "",
              linkedin_url: profile?.linkedin_url ?? "",
              facebook_url: profile?.facebook_url ?? "",
              instagram_url: profile?.instagram_url ?? "",
              youtube_url: profile?.youtube_url ?? "",
              whatsapp: profile?.whatsapp ?? "",
            }}
          />
        </Reveal>
      )}
    </div>
  );
}
