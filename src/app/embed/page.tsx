import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import ToolStudio from "@/components/ToolStudio";
import { LogoMark } from "@/components/Logo";

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale: Locale = lang && isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={locale}>
      <div className="mb-3 flex items-center justify-between">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2"
        >
          <LogoMark className="h-6 w-6" />
          <span className="font-display text-sm font-bold">sahihly</span>
        </a>
        <span className="text-[11px] text-white/40">{dict.hero.trust}</span>
      </div>

      <ToolStudio locale={locale} dict={dict} />

      {/* the backlink */}
      <p className="mt-3 text-center text-[11px] text-white/40">
        <a
          href={`${SITE_URL}/ai-detector`}
          target="_blank"
          rel="noopener"
          className="text-violet-300 hover:text-violet-200"
        >
          {locale === "ar"
            ? "مدعوم من صحيحلي — كاشف الذكاء الاصطناعي المجاني"
            : "Powered by Sahihly — Free AI Detector"}
        </a>
      </p>
    </div>
  );
}
