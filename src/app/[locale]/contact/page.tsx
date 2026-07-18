import type { Metadata } from "next";
import { Mail } from "lucide-react";
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
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
          <Mail size={15} className="text-violet-300" />
          {c.email}{" "}
          <a href="mailto:hello@sahihly.com" className="text-violet-300 hover:text-violet-200">
            hello@sahihly.com
          </a>
        </p>
      </Reveal>
    </div>
  );
}
