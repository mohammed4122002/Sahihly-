import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: loc === "ar" ? "تواصل معنا" : "Contact Us",
    description:
      loc === "ar"
        ? "راسل فريق صحيحلي — أسئلة، ملاحظات، شراكات، أو دعم فني."
        : "Reach the Sahihly team — questions, feedback, partnerships, or support.",
    alternates: { canonical: "/contact" },
  };
}

const C = {
  en: {
    h1: "Contact us",
    sub: "Questions, feedback, partnership ideas, or a problem to report — we read everything and reply fast.",
    email: "Or email us directly:",
    routesTitle: "What to write to us about",
    routes: [
      {
        h: "Support and account problems",
        p: "Anything that stops you using the product — a run that fails, a payment that went through but did not upgrade your plan, a login you cannot recover. Include the email address on the account and roughly when it happened; that is usually enough for us to find it without a back-and-forth. We aim to reply within one business day and we do not use a ticket queue that swallows messages.",
      },
      {
        h: "Billing, refunds, and cancellation",
        p: "Write to us before disputing a charge and we will almost always sort it out faster than your bank will. If a subscription was activated in error, if you were charged after cancelling, or if the tool clearly did not do what the pricing page said it would, say so plainly and we will refund it. Cancelling is self-serve from your dashboard and takes effect at the end of the paid period.",
      },
      {
        h: "Reporting a wrong result",
        p: "This one genuinely helps us. If the detector flagged writing you know is your own — particularly if you write in Arabic or in a second language — send us the passage and tell us what it got wrong. Calibration improves from real examples of false positives far more than from anything else, and we would rather hear about them than not.",
      },
      {
        h: "Press, partnerships, and API access",
        p: "For interviews, research collaboration, integration requests, or bulk and institutional use, describe what you have in mind and the scale involved. We are a small team, so we answer honestly about what we can and cannot support rather than scheduling a call to find out.",
      },
      {
        h: "Privacy and data requests",
        p: "Requests to export or delete your data, questions about how something is processed, or anything else covered by our privacy policy should go to privacy@sahihly.com so they are handled on the right track. You do not need to explain why, and we respond within one month at the outside — usually far sooner.",
      },
    ],

    labels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Thanks — your message is in. We'll get back to you soon.",
      error: "Couldn't send right now. Please try again or email us directly.",
    },
  },
  ar: {
    h1: "تواصل معنا",
    sub: "أسئلة، ملاحظات، أفكار شراكة، أو مشكلة تبلّغ عنها — نقرأ كل شيء ونرد بسرعة.",
    email: "أو راسلنا مباشرة:",
    routesTitle: "بماذا تراسلنا",
    routes: [
      {
        h: "الدعم ومشاكل الحساب",
        p: "أي شيء يمنعك من استخدام المنتج — محاولة تفشل، أو دفعة تمّت ولم تُرقّ خطتك، أو تسجيل دخول لا تستطيع استعادته. أرفق البريد المرتبط بالحساب ووقت الحدوث تقريباً؛ فهذا يكفينا عادةً لإيجاده دون أخذ وردّ. ونهدف للردّ خلال يوم عمل واحد، ولا نستخدم طابور تذاكر يبتلع الرسائل.",
      },
      {
        h: "الفوترة والاسترداد والإلغاء",
        p: "راسلنا قبل الاعتراض على أي خصم وسنحلّها غالباً أسرع من بنكك. فإن فُعِّل اشتراك بالخطأ، أو خُصِم منك بعد الإلغاء، أو كانت الأداة بوضوح لم تفعل ما وعدت به صفحة الأسعار، فقل ذلك صراحةً وسنُعيد المبلغ. والإلغاء ذاتي من لوحتك ويسري بنهاية المدة المدفوعة.",
      },
      {
        h: "الإبلاغ عن نتيجة خاطئة",
        p: "هذه تساعدنا فعلاً. إن صنّف الكاشف كتابةً تعرف أنها لك — خاصة إن كنت تكتب بالعربية أو بلغة ثانية — فأرسل لنا المقطع وأخبرنا بما أخطأ فيه. فالمعايرة تتحسّن من أمثلة حقيقية للنتائج الخاطئة أكثر بكثير من أي شيء آخر، ونفضّل أن نسمع عنها على ألا نسمع.",
      },
      {
        h: "الصحافة والشراكات والوصول البرمجي",
        p: "للمقابلات أو التعاون البحثي أو طلبات التكامل أو الاستخدام المؤسسي وبالجملة، صِف ما تفكّر فيه والحجم المطلوب. نحن فريق صغير، فنجيب بصدق عمّا نستطيع دعمه وما لا نستطيع بدل جدولة مكالمة لنكتشف ذلك.",
      },
      {
        h: "الخصوصية وطلبات البيانات",
        p: "طلبات تصدير بياناتك أو حذفها، والأسئلة عن كيفية معالجة شيء ما، وكل ما تغطّيه سياسة الخصوصية، تُرسَل إلى privacy@sahihly.com لتُعالَج في المسار الصحيح. ولست مضطراً لشرح السبب، ونردّ خلال شهر كحدّ أقصى — وغالباً أسرع بكثير.",
      },
    ],

    labels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "أرسل الرسالة",
      sending: "جاري الإرسال…",
      sent: "شكراً — وصلتنا رسالتك وسنرد عليك قريباً.",
      error: "تعذّر الإرسال حالياً. حاول مجدداً أو راسلنا مباشرة.",
    },
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = C[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.h1,
    url: `${SITE_URL}/contact`,
  };

  return (
    <div className="container-x max-w-2xl py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">{c.h1}</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/60">{c.sub}</p>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-10">
          <ContactForm locale={locale} labels={c.labels} />
        </div>
      </Reveal>

      <Reveal delay={2}>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">{c.routesTitle}</h2>
          <div className="mt-6 space-y-6">
            {c.routes.map((r) => (
              <div key={r.h}>
                <h3 className="font-semibold text-white/90">{r.h}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{r.p}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-white/50">
          <p className="flex items-center justify-center gap-2">
            <Mail size={15} className="text-violet-300" />
            {c.email}{" "}
            <a href="mailto:hello@sahihly.com" className="text-violet-300 hover:text-violet-200">
              hello@sahihly.com
            </a>
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <MessageCircle size={15} className="text-emerald-300" />
            {locale === "ar"
              ? "أو واتساب الدعم الفني وتفعيل الاشتراكات:"
              : "Or WhatsApp support (billing & activation):"}{" "}
            <a
              href="https://wa.me/970594848203"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="text-emerald-300 hover:text-emerald-200"
            >
              +970 59 484 8203
            </a>
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <Mail size={15} className="text-emerald-300" />
            {locale === "ar" ? "أو الإيميل مباشرة:" : "Or email directly:"}{" "}
            <a
              href="mailto:mohammedsaadaang@gmail.com"
              className="text-emerald-300 hover:text-emerald-200"
            >
              mohammedsaadaang@gmail.com
            </a>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
