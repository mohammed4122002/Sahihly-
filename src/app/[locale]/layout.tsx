import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, localeDirection, SITE_URL, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { inter, spaceGrotesk, plexArabic } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Backgrounds from "@/components/Backgrounds";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    applicationName: dict.meta.siteName,
    keywords: [
      "AI detector",
      "AI humanizer",
      "AI checker",
      "كاشف الذكاء الاصطناعي",
      "تنسين النص",
      "Arabic AI detector",
      "Sahihly",
    ],
    alternates: {
      canonical: `/${loc}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      locale: loc === "ar" ? "ar_AR" : "en_US",
      url: `${SITE_URL}/${loc}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dir = localeDirection[locale];
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sahihly",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description: dict.meta.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: locale === "ar" ? "ar" : "en",
    url: `${SITE_URL}/${locale}`,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <Backgrounds />
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
