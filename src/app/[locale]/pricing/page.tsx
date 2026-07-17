import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import PricingCards from "@/components/PricingCards";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return {
    title: dict.pricing.title,
    description: dict.pricing.subtitle,
    alternates: { canonical: "/pricing" },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <div className="container-x py-16">
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{dict.pricing.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
          {dict.pricing.subtitle}
        </p>
      </Reveal>

      <div className="mx-auto mt-12 max-w-5xl">
        <PricingCards locale={locale} dict={dict} />
      </div>

      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.faq.title}</h2>
        <div className="mt-8">
          <FAQ items={dict.faq.items} />
        </div>
      </div>
    </div>
  );
}
