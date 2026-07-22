import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { locales, isLocale, localeDirection, SITE_URL, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { inter, spaceGrotesk, plexArabic } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Backgrounds from "@/components/Backgrounds";
import ScrollProgress from "@/components/ScrollProgress";
import ConsentBanner from "@/components/ConsentBanner";
import CursorGlow from "@/components/CursorGlow";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

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
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      locale: loc === "ar" ? "ar_AR" : "en_US",
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
    alternates: {
      types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
    },
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Sahihly",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      description: dict.meta.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: locale === "ar" ? "ar" : "en",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sahihly",
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image`,
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sahihly",
      url: SITE_URL,
      inLanguage: ["en", "ar"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Sahihly Blog"
          href={`${SITE_URL}/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* AdSense loads client-side only after cookie consent (ConsentBanner) */}
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-violet-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ocean-900"
        >
          {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>
        <Backgrounds />
        <CursorGlow />
        <ScrollProgress />
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <ConsentBanner locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
