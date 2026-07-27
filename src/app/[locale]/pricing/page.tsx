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
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent("Simple Pricing")}&sub=${encodeURIComponent("Free forever tier · Pro $12/mo · Ultimate $29/mo — start without a card")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
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
  const ar = locale === "ar";

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

      <Reveal>
        <section className="mx-auto mt-20 max-w-3xl space-y-8">
          {(ar
            ? [
                {
                  h: "ما الذي تدفع مقابله فعلاً",
                  p: "الفرق بين الخطط هو الحجم لا الجودة. فمحرّك الكشف نفسه، وتقرير الأسلوب نفسه، وتقييم الثقة نفسه، يعمل في الخطة المجانية كما في أغلاها — لا نحجب دقة أفضل خلف جدار دفع. وما ترفعه الخطط المدفوعة هو عدد الكلمات في المحاولة الواحدة، وعدد المحاولات يومياً، والوصول للمُنسّن وحفظ السجلّ. فإن كان فحص فقرة من حين لآخر كل ما تحتاجه، فالخطة المجانية كافية ولا نريدك أن تدفع مقابل ما لن تستخدمه.",
                },
                {
                  h: "لماذا خطة مجانية بلا حساب أصلاً",
                  p: "لأن جودة العربية هي السؤال الوحيد المهمّ لمعظم زوّارنا، ولا يمكن الإجابة عنه بصفحة تسويق. مرّر فقرة من كتابتك أنت واحكم على المخرجات قبل أن تعطينا بريدك، فضلاً عن بطاقتك. ونفضّل أن تكتشف أن الأداة لا تناسبك مجاناً على أن تكتشف ذلك بعد الاشتراك.",
                },
                {
                  h: "الفوترة والإلغاء والاسترداد",
                  p: "تُفوتَر الخطط للمدة التي تختارها وتستمر حتى تُلغيها بنفسك من لوحتك، ويسري الإلغاء بنهاية المدة المدفوعة فتحتفظ بما دفعت مقابله. ومعالجة الدفع تجري كلياً على صفحة المزوّد المستضافة — لا نرى بيانات بطاقتك أو محفظتك ولا نخزّنها. وإن خُصِم منك بالخطأ أو بعد الإلغاء أو لم تفعل الأداة ما وصفته هذه الصفحة، فراسلنا وسنُعيد المبلغ دون جدال.",
                },
                {
                  h: "ما لا نبيعه",
                  p: "لا نبيع ضماناً بتجاوز أي كاشف، ولا أدوات مراقبة صفّية، ولا بياناتك. ولا نأخذ عمولات مقابل ترشيح أدوات أخرى في صفحات المقارنة. ودخلنا من الاشتراكات وإعلانات على بعض الصفحات، وهذه القائمة كاملة.",
                },
              ]
            : [
                {
                  h: "What you are actually paying for",
                  p: "The difference between plans is volume, not quality. The same detection engine, the same style report, and the same confidence rating run on the free tier as on the most expensive one — we do not hold better accuracy behind a paywall. What the paid plans raise is words per run, runs per day, and access to the humanizer and saved history. If checking the occasional paragraph is all you need, the free tier is enough and we would rather you did not pay for what you will not use.",
                },
                {
                  h: "Why there is a free tier with no account at all",
                  p: "Because Arabic quality is the only question that matters to most of our visitors, and no marketing page can answer it. Run a paragraph of your own writing through and judge the output before giving us your email, let alone your card. We would rather you discovered the tool does not suit you for free than discovered it after subscribing.",
                },
                {
                  h: "Billing, cancellation, and refunds",
                  p: "Plans are billed for the period you choose and continue until you cancel yourself from the dashboard, with cancellation taking effect at the end of the paid period so you keep what you paid for. Payment processing happens entirely on the provider's hosted checkout — we never see or store your card or wallet details. If you were charged in error, charged after cancelling, or the tool did not do what this page described, email us and we will refund it without an argument.",
                },
                {
                  h: "What we do not sell",
                  p: "We do not sell a guarantee of beating any detector, classroom surveillance tooling, or your data. We take no commission for recommending other tools on our comparison pages. Our revenue is subscriptions and advertising on some pages, and that is the complete list.",
                },
              ]
          ).map((sec) => (
            <div key={sec.h}>
              <h2 className="text-xl font-bold">{sec.h}</h2>
              <p className="mt-3 leading-relaxed text-white/65">{sec.p}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.faq.title}</h2>
        <div className="mt-8">
          <FAQ items={dict.faq.items} />
        </div>
      </div>
    </div>
  );
}
