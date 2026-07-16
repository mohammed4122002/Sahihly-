import { Suspense } from "react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import AuthForm from "@/components/AuthForm";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-16">
      <Suspense>
        <AuthForm mode="signup" locale={locale} dict={dict} />
      </Suspense>
    </div>
  );
}
