import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    description:
      loc === "ar"
        ? "كيف يجمع صحيحلي بياناتك ويستخدمها ويحميها."
        : "How Sahihly collects, uses, and protects your data.",
    alternates: { canonical: "/privacy" },
  };
}

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "What we process",
        p: "Text you submit to the detector or humanizer is processed to produce your result and is not sold. Free, signed-out runs are not linked to an identity beyond a hashed request fingerprint used for daily rate limits. If you create an account, we store your email, name, plan, and — on paid plans — your analysis history, which you can delete anytime from your dashboard.",
      },
      {
        h: "Cookies",
        p: "We use a small number of cookies: a language-preference cookie (sahihly_locale), authentication session cookies if you log in, and — where advertising is enabled — Google AdSense cookies. Third-party vendors, including Google, use cookies to serve ads based on prior visits. You can opt out of personalized advertising by visiting Google's Ads Settings (adssettings.google.com).",
      },
      {
        h: "Third-party services",
        p: "We rely on carefully chosen processors: Supabase (authentication and database, with row-level security), Anthropic (text analysis via the Claude API), Binance Pay (payment processing on Binance's own hosted checkout — we never see your card or wallet credentials), and Google AdSense (advertising, where shown).",
      },
      {
        h: "Data retention & your rights",
        p: "Account data is kept while your account is active. You may request export or deletion of your data at any time by contacting us; deletion removes your profile, history, and subscription records except where law requires retention of payment records.",
      },
      {
        h: "Security",
        p: "All traffic is encrypted in transit (HTTPS). Database access is protected by row-level security so each user can only read their own records. Payment webhooks are cryptographically verified before any subscription change is applied.",
      },
      {
        h: "Contact",
        p: "Questions about this policy? Reach us at privacy@sahihly.com.",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: يوليو ٢٠٢٦",
    sections: [
      {
        h: "ما الذي نعالجه",
        p: "النص الذي ترسله للكاشف أو المُنسّن يُعالَج لإنتاج نتيجتك ولا يُباع. المحاولات المجانية بلا تسجيل لا تُربط بهوية سوى بصمة طلب مُشفَّرة تُستخدم للحدود اليومية. إذا أنشأت حساباً نخزّن بريدك واسمك وخطتك، وفي الخطط المدفوعة سجل تحليلاتك الذي يمكنك حذفه من لوحتك متى شئت.",
      },
      {
        h: "ملفات تعريف الارتباط (الكوكيز)",
        p: "نستخدم عدداً قليلاً من الكوكيز: كوكي تفضيل اللغة (sahihly_locale)، وكوكيز جلسة الدخول عند تسجيلك، وكوكيز Google AdSense حيثما تُعرض الإعلانات. يستخدم مزوّدون خارجيون، ومنهم Google، الكوكيز لعرض إعلانات بناءً على زيارات سابقة، ويمكنك إيقاف الإعلانات المخصّصة من إعدادات إعلانات Google (adssettings.google.com).",
      },
      {
        h: "خدمات الطرف الثالث",
        p: "نعتمد على مزوّدين مختارين بعناية: Supabase (المصادقة وقاعدة البيانات بحماية على مستوى الصف)، وAnthropic (تحليل النص عبر Claude API)، وBinance Pay (معالجة الدفع على صفحة بينانس المستضافة — لا نرى بيانات بطاقتك أو محفظتك إطلاقاً)، وGoogle AdSense (الإعلانات حيثما تُعرض).",
      },
      {
        h: "الاحتفاظ بالبيانات وحقوقك",
        p: "تُحفظ بيانات الحساب ما دام حسابك نشطاً. يمكنك طلب تصدير بياناتك أو حذفها في أي وقت بالتواصل معنا؛ يزيل الحذف ملفك وسجلّك واشتراكاتك باستثناء ما يُلزم القانون بالاحتفاظ به من سجلات دفع.",
      },
      {
        h: "الأمان",
        p: "كل الاتصالات مشفّرة أثناء النقل (HTTPS). الوصول لقاعدة البيانات محمي بأمان على مستوى الصف بحيث لا يقرأ كل مستخدم إلا سجلاته. وتُتحقق إشعارات الدفع تشفيرياً قبل تطبيق أي تغيير على الاشتراك.",
      },
      {
        h: "التواصل",
        p: "لأي سؤال حول هذه السياسة راسلنا على privacy@sahihly.com.",
      },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = content[locale];

  return (
    <div className="container-x max-w-3xl py-16">
      <Reveal>
        <h1 className="text-4xl font-bold">{c.title}</h1>
        <p className="mt-2 text-sm text-white/40">{c.updated}</p>
        <div className="prose-sahihly mt-8">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
