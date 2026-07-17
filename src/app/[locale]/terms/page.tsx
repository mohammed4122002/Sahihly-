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
    title: loc === "ar" ? "شروط الاستخدام" : "Terms of Use",
    description:
      loc === "ar"
        ? "الشروط التي تحكم استخدامك لخدمة صحيحلي."
        : "The terms governing your use of Sahihly.",
    alternates: { canonical: "/terms" },
  };
}

const content = {
  en: {
    title: "Terms of Use",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "The service",
        p: "Sahihly provides writing-quality tools: an AI-likelihood detector and a style humanizer. Detection scores are probabilistic estimates, provided as guidance only — they are not proof of authorship and must not be used as sole evidence in any accusation or disciplinary process.",
      },
      {
        h: "Acceptable use",
        p: "You agree to use Sahihly to review and improve writing you have the right to work on, and in compliance with the policies of your school, university, or employer. You may not use the service to misrepresent authorship where disclosure is required, to violate academic-integrity rules, or to process unlawful content. We may suspend accounts that abuse the service.",
      },
      {
        h: "Accounts & subscriptions",
        p: "Paid plans are billed via Binance Pay in USDT for the period purchased. Binance Pay does not support automatic recurring charges, so renewal requires a new payment before each period ends; we notify you ahead of expiry and apply a short grace period. Fees for a started period are non-refundable except where required by law.",
      },
      {
        h: "No warranty",
        p: "The service is provided \"as is\". We do not warrant that detection results are accurate for every text, and we are not liable for decisions made by third parties based on any score.",
      },
      {
        h: "Changes",
        p: "We may update these terms as the product evolves; material changes will be announced on this page. Continued use after changes take effect constitutes acceptance.",
      },
      {
        h: "Contact",
        p: "Questions? Reach us at legal@sahihly.com.",
      },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    updated: "آخر تحديث: يوليو ٢٠٢٦",
    sections: [
      {
        h: "الخدمة",
        p: "يقدّم صحيحلي أدوات لجودة الكتابة: كاشف احتمال الذكاء الاصطناعي ومُنسّن أسلوب. نتائج الكشف تقديرات احتمالية تُقدَّم للاسترشاد فقط — ليست دليلاً على هوية الكاتب ولا يجوز اعتمادها دليلاً وحيداً في أي اتهام أو إجراء تأديبي.",
      },
      {
        h: "الاستخدام المقبول",
        p: "توافق على استخدام صحيحلي لمراجعة وتحسين كتابةٍ تملك حق العمل عليها، وبما يتوافق مع سياسات مدرستك أو جامعتك أو جهة عملك. لا يجوز استخدام الخدمة للتضليل حول هوية الكاتب حيث يُشترط الإفصاح، أو لمخالفة قواعد النزاهة الأكاديمية، أو لمعالجة محتوى غير قانوني. قد نعلّق الحسابات المسيئة.",
      },
      {
        h: "الحسابات والاشتراكات",
        p: "تُدفع الخطط عبر Binance Pay بعملة USDT عن المدة المشتراة. لا يدعم Binance Pay الخصم التلقائي المتكرر، لذا يتطلب التجديد دفعة جديدة قبل نهاية كل دورة؛ نُذكّرك قبل الانتهاء ونمنح فترة سماح قصيرة. رسوم الدورة التي بدأت غير قابلة للاسترداد إلا حيث يُلزم القانون.",
      },
      {
        h: "إخلاء الضمان",
        p: "تُقدَّم الخدمة «كما هي». لا نضمن دقة نتائج الكشف لكل نص، ولسنا مسؤولين عن قرارات تتخذها أطراف ثالثة بناءً على أي نتيجة.",
      },
      {
        h: "التغييرات",
        p: "قد نحدّث هذه الشروط مع تطوّر المنتج؛ وتُعلن التغييرات الجوهرية في هذه الصفحة. استمرارك بالاستخدام بعد سريان التغييرات يعني قبولها.",
      },
      {
        h: "التواصل",
        p: "لأي سؤال راسلنا على legal@sahihly.com.",
      },
    ],
  },
};

export default async function TermsPage({
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
