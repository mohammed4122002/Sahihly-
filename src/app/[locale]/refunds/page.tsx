import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, localePath } from "@/lib/seo";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "سياسة الاسترداد" : "Refund Policy",
    description:
      loc === "ar"
        ? "معلومات عن طلبات الاسترداد وإلغاء اشتراكات صحيحلي."
        : "How to request a Sahihly refund and how cancellations work.",
    alternates: alternatesFor(loc, "/refunds"),
  };
}

const content = {
  en: {
    title: "Refund Policy",
    intro:
      "This policy explains how to ask Sahihly about a payment or refund. It applies together with the terms shown at checkout and any rights you have under applicable consumer law.",
    updated: "Last updated: October 24, 2026",
    contents: "On this page",
    contact: "Contact support",
    sections: [
      {
        h: "When to contact us about a refund",
        p: "Contact us if you believe you were charged in error, charged more than once for the same purchase, charged after a cancellation took effect, or paid for a feature that materially failed to work as described on our pricing page. We will review the details and, where the charge was made in error or the service materially failed as described, refund the affected payment. Your mandatory rights under applicable law are not limited by this policy.",
      },
      {
        h: "How to request a refund",
        p: "Email hello@sahihly.com from the address associated with your account where possible. Include your account email, plan, approximate payment date and amount, payment method, and transaction or order reference. Explain what happened. Do not send passwords, full card numbers, wallet recovery phrases, or other payment credentials. We may ask for reasonable information needed to locate and verify the transaction.",
      },
      {
        h: "Review and payment processing",
        p: "We will review the request and may contact you if we need more information. If a refund is approved, it will be issued through the original payment provider or another method agreed with you where the original route is unavailable. The provider and payment method determine when the funds appear; we do not promise a fixed processing time.",
      },
      {
        h: "Cancellation is not a refund",
        p: "Cancelling a subscription or stopping a future renewal prevents a later charge where the payment arrangement supports that change; it does not by itself refund an earlier payment. The effect of cancellation on access to the paid plan depends on the payment provider and subscription status shown in your account. Manual USDT payments do not automatically renew. For a Lemon Squeezy recurring subscription, use provider cancellation controls where available or contact us for help.",
      },
      {
        h: "Unused time and digital services",
        p: "Unused time or a decision not to continue using a digital service does not by itself qualify a payment for a refund under this policy. This does not remove any refund, withdrawal, or other right that cannot legally be excluded in your location. If you think a legal exception applies, mention it in your request so we can review it.",
      },
      {
        h: "Billing disputes",
        p: "Please contact us before opening a payment dispute if you can; we will investigate the transaction and try to resolve billing errors directly. You remain free to contact your payment provider or card issuer and to exercise any rights available under applicable law.",
      },
      {
        h: "Contact",
        p: "For refund requests, billing corrections, or cancellation help, email hello@sahihly.com. For privacy requests, email privacy@sahihly.com.",
      },
    ],
  },
  ar: {
    title: "سياسة الاسترداد",
    intro:
      "توضح هذه السياسة كيفية التواصل مع صحيحلي بشأن دفعة أو استرداد. وتسري مع الشروط المعروضة عند الدفع وأي حقوق لك بموجب قوانين حماية المستهلك المنطبقة.",
    updated: "آخر تحديث: ٢٤ أكتوبر ٢٠٢٦",
    contents: "في هذه الصفحة",
    contact: "تواصل مع الدعم",
    sections: [
      {
        h: "متى تتواصل معنا بشأن الاسترداد",
        p: "تواصل معنا إذا اعتقدت أن المبلغ خُصم بالخطأ، أو خُصم أكثر من مرة للشراء نفسه، أو خُصم بعد سريان الإلغاء، أو دفعت مقابل ميزة أخفقت إخفاقاً جوهرياً في العمل كما وصفتها صفحة الأسعار. سنراجع التفاصيل، وعندما يكون الخصم بالخطأ أو تكون الخدمة قد أخفقت إخفاقاً جوهرياً كما وُصفت، سنعيد المبلغ المتأثر. ولا تحدّ هذه السياسة من حقوقك الإلزامية بموجب القانون المنطبق.",
      },
      {
        h: "كيفية طلب الاسترداد",
        p: "راسل hello@sahihly.com، ويفضل من البريد المرتبط بحسابك. أرفق بريد الحساب والخطة وتاريخ الدفع التقريبي ومبلغه وطريقته ومرجع العملية أو الطلب، واشرح ما حدث. لا ترسل كلمات المرور أو أرقام البطاقات كاملة أو عبارات استعادة المحافظ أو بيانات اعتماد الدفع الأخرى. وقد نطلب معلومات معقولة لازمة للعثور على العملية والتحقق منها.",
      },
      {
        h: "المراجعة ومعالجة الدفع",
        p: "سنراجع الطلب وقد نتواصل معك إذا احتجنا إلى معلومات إضافية. وإذا تمت الموافقة على الاسترداد، فسيُعاد عبر مزوّد الدفع الأصلي أو بطريقة أخرى نتفق عليها إذا تعذر المسار الأصلي. ويتحكم المزوّد وطريقة الدفع في موعد ظهور المبلغ؛ ولا نعد بمدة معالجة محددة.",
      },
      {
        h: "الإلغاء ليس استرداداً",
        p: "يمنع إلغاء الاشتراك أو إيقاف التجديد خصماً لاحقاً عندما تسمح آلية الدفع بذلك، لكنه لا يعيد تلقائياً مبلغاً سبق دفعه. ويعتمد أثر الإلغاء على الوصول إلى الخطة المدفوعة على مزوّد الدفع وحالة الاشتراك الظاهرة في حسابك. لا تتجدد دفعات USDT اليدوية تلقائياً. أما اشتراك Lemon Squeezy المتكرر، فاستخدم أدوات الإلغاء لدى المزوّد حيثما توفرت أو راسلنا للمساعدة.",
      },
      {
        h: "الوقت غير المستخدم والخدمات الرقمية",
        p: "لا يكفي عدم استخدام الوقت المتبقي أو قرار التوقف عن استخدام خدمة رقمية وحده لاستحقاق الاسترداد بموجب هذه السياسة. ولا يلغي ذلك أي حق في الاسترداد أو العدول أو غيره لا يجوز استبعاده قانوناً في بلدك. إذا اعتقدت أن استثناءً قانونياً ينطبق، فاذكره في طلبك لنراجعه.",
      },
      {
        h: "منازعات الفوترة",
        p: "يرجى التواصل معنا قبل فتح نزاع دفع إن أمكن؛ سنحقق في العملية ونحاول حل أخطاء الفوترة مباشرة. ويظل لك حق التواصل مع مزوّد الدفع أو جهة إصدار البطاقة وممارسة أي حقوق يتيحها القانون المنطبق.",
      },
      {
        h: "التواصل",
        p: "لطلب استرداد أو تصحيح فوترة أو المساعدة في الإلغاء، راسل hello@sahihly.com. ولطلبات الخصوصية، راسل privacy@sahihly.com.",
      },
    ],
  },
};

export default async function RefundsPage({
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
        <p className="mt-3 leading-relaxed text-white/60">{c.intro}</p>
        <p className="mt-2 text-sm text-white/40">{c.updated}</p>
        <nav aria-label={c.contents} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-semibold">{c.contents}</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {c.sections.map((section, index) => (
              <li key={section.h}>
                <a className="text-sm text-violet-200 hover:text-white" href={`#section-${index + 1}`}>
                  {section.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="prose-sahihly mt-8">
          {c.sections.map((section, index) => (
            <section key={section.h} id={`section-${index + 1}`}>
              <h2>{section.h}</h2>
              <p>{section.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href={localePath(locale, "/contact")} className="text-violet-200 underline hover:text-white">
            {c.contact}
          </Link>
          <Link href={localePath(locale, "/terms")} className="text-violet-200 underline hover:text-white">
            {locale === "ar" ? "شروط الاستخدام" : "Terms of Service"}
          </Link>
          <Link href={localePath(locale, "/privacy")} className="text-violet-200 underline hover:text-white">
            {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
