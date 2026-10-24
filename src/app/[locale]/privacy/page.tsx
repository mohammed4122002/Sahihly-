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
    title: loc === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    description:
      loc === "ar"
        ? "كيف يجمع صحيحلي بياناتك ويستخدمها ويشاركها."
        : "How Sahihly collects, uses, and shares personal information.",
    alternates: alternatesFor(loc, "/privacy"),
  };
}

const content = {
  en: {
    title: "Privacy Policy",
    intro:
      "This policy describes personal information processed when you use Sahihly. The tools and payment methods available can depend on your account and the current site configuration. This policy is a service-information draft, not legal advice.",
    updated: "Last updated: October 24, 2026",
    contents: "On this page",
    sections: [
      {
        h: "Information we process",
        p: "Depending on how you use the site, information may include your account email and sign-in details; profile name and optional avatar image (served from profile storage); plan and subscription status; text and settings submitted to a tool; analysis history; usage-limit identifiers; payment amount, plan, status, payment method, transaction reference, and any note you provide; newsletter email and language preference; and the name, email, subject, and message you send through the contact form. For anonymous requests, the client IP address may be converted to a truncated hash for daily usage limits; signed-in limits are associated with the account.",
      },
      {
        h: "Text and AI services",
        p: "When you request detection or rewriting, the text and relevant request settings are sent to the AI provider configured for the site to generate a result. Depending on configuration and availability, this can include Google Gemini, OpenAI, or Anthropic; the service may use another configured provider if an earlier provider fails, or a built-in statistical method. Signed-in requests may also save up to 2,000 characters of the submitted text, together with limited result information, in your account analysis history. We do not make a claim here about an AI provider's retention or model-training practices; review the relevant provider's terms and privacy information for its processing.",
      },
      {
        h: "Why we use information",
        p: "We use information to operate and secure the service, authenticate accounts, provide requested results, apply usage limits, maintain account history, process or verify payments, respond to support requests, send newsletters when you subscribe, understand site performance, and show advertising where enabled and consented to. The applicable legal basis depends on your location and the particular use; it may include providing a requested service, consent, legitimate interests, or legal obligations.",
      },
      {
        h: "Service providers and sharing",
        p: "Sahihly uses Supabase for authentication, database, and file storage; configured AI providers to process tool requests; Vercel Analytics and Speed Insights for site metrics; Google AdSense where advertising is enabled and accepted; and payment providers that may include Lemon Squeezy and Binance Pay. A payment provider receives information needed to handle the payment through its checkout. Sahihly's payment records may include transaction and payment-request details, but the site does not request or store card numbers or wallet credentials. Providers process information under their own terms and privacy notices. We do not sell submitted text or personal information.",
      },
      {
        h: "Cookies and similar technologies",
        p: "The site uses cookies for language preference, consent choice, and sign-in sessions. Vercel Analytics and Speed Insights are included in the site. If Google AdSense is configured, its advertising script is loaded only after you accept advertising cookies through the consent banner; choosing essential-only prevents that script from being loaded by the banner. Third-party services may use their own technologies under their policies. Clearing this site's cookies removes the saved consent choice and lets you make a new selection when the banner appears.",
      },
      {
        h: "Retention and deletion",
        p: "We keep information for as long as needed to provide the service, administer accounts and payments, respond to requests, meet applicable obligations, and protect the service. Specific retention periods depend on the type of record and system configuration; we do not publish a fixed retention schedule here. Signed-in users can remove individual analysis-history entries from the dashboard. To request access, correction, or deletion of other information, email privacy@sahihly.com. Some records may need to be retained where required by law or to resolve disputes.",
      },
      {
        h: "Security",
        p: "We use technical and organizational measures designed to protect information, including encrypted connections and access controls provided by our infrastructure. No online service or transmission can be guaranteed completely secure. If you believe your account or information has been compromised, contact us promptly.",
      },
      {
        h: "International processing",
        p: "Sahihly and its service providers may process information in countries other than the one where you live. The countries and transfer arrangements can depend on which providers are configured and where they operate. Contact us if you need more information about a particular transfer.",
      },
      {
        h: "Your privacy rights",
        p: "Depending on the law that applies to you, you may have rights to access, correct, delete, restrict, object to, or receive a copy of certain personal information, or to withdraw consent where processing relies on consent. To make a request, contact privacy@sahihly.com. You may also have the right to complain to your local privacy regulator. We may need to verify your request before acting on it.",
      },
      {
        h: "Children",
        p: "Sahihly is not designed for children and we do not knowingly seek to collect personal information from children. If you believe a child has provided personal information, contact us so we can review the request and take appropriate steps.",
      },
      {
        h: "Changes and contact",
        p: "We may update this policy as the service changes and will revise the date above. For privacy questions or data requests, email privacy@sahihly.com. For general support, including billing, email hello@sahihly.com.",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    intro:
      "توضح هذه السياسة المعلومات الشخصية التي تُعالَج عند استخدام صحيحلي. وقد تختلف الأدوات وطرق الدفع المتاحة بحسب الحساب وإعداد الموقع الحالي. هذه مسودة معلومات عن الخدمة وليست مشورة قانونية.",
    updated: "آخر تحديث: ٢٤ أكتوبر ٢٠٢٦",
    contents: "في هذه الصفحة",
    sections: [
      {
        h: "المعلومات التي نعالجها",
        p: "بحسب طريقة استخدامك للموقع، قد تشمل المعلومات بريد الحساب وبيانات تسجيل الدخول؛ واسم الملف الشخصي والصورة الاختيارية (المقدمة من تخزين الملف الشخصي)؛ والخطة وحالة الاشتراك؛ والنص والإعدادات المرسلة للأداة؛ وسجل التحليلات؛ ومعرّفات حدود الاستخدام؛ ومبلغ الدفع والخطة وحالته وطريقته ومرجع العملية وأي ملاحظة ترسلها؛ وبريد النشرة ولغته؛ والاسم والبريد والموضوع والرسالة المرسلة عبر نموذج التواصل. وقد يُحوّل عنوان IP للطلبات المجهولة إلى بصمة مختصرة لاستخدامها في الحدود اليومية؛ أما حدود المستخدم المسجل فترتبط بالحساب.",
      },
      {
        h: "النص وخدمات الذكاء الاصطناعي",
        p: "عند طلب الكشف أو إعادة الصياغة، يُرسل النص وإعدادات الطلب ذات الصلة إلى مزوّد الذكاء الاصطناعي المهيأ للموقع لإنتاج النتيجة. وقد يشمل ذلك Google Gemini أو OpenAI أو Anthropic بحسب الإعداد والتوافر؛ وقد تستخدم الخدمة مزوّداً آخر مهيأ إذا تعذّر المزوّد الأول، أو طريقة إحصائية مدمجة. وقد تُحفظ للمستخدم المسجل في سجل الحساب حتى ٢٠٠٠ حرف من النص المرسل مع معلومات محدودة عن النتيجة. لا نقدّم هنا ادعاءً بشأن احتفاظ مزوّد الذكاء الاصطناعي ببياناتك أو استخدامها لتدريب النماذج؛ راجع شروط المزوّد المعني ومعلومات الخصوصية لديه.",
      },
      {
        h: "أسباب استخدام المعلومات",
        p: "نستخدم المعلومات لتشغيل الخدمة وحمايتها، وتسجيل الدخول، وتقديم النتائج المطلوبة، وتطبيق حدود الاستخدام، وحفظ سجل الحساب، ومعالجة المدفوعات أو التحقق منها، والرد على طلبات الدعم، وإرسال النشرة عند الاشتراك فيها، وفهم أداء الموقع، وعرض الإعلانات حيثما كانت مفعّلة ومقبولة. ويعتمد الأساس القانوني المنطبق على موقعك والاستخدام المعني؛ وقد يشمل تقديم خدمة مطلوبة أو الموافقة أو المصالح المشروعة أو الالتزامات القانونية.",
      },
      {
        h: "مزوّدو الخدمات ومشاركة البيانات",
        p: "يستخدم صحيحلي Supabase للمصادقة وقاعدة البيانات وتخزين الملفات؛ ومزوّدي الذكاء الاصطناعي المهيئين لمعالجة طلبات الأدوات؛ وVercel Analytics وSpeed Insights لقياس الموقع؛ وGoogle AdSense عند تفعيل الإعلانات وقبولها؛ ومزوّدي الدفع الذين قد يشملون Lemon Squeezy وBinance Pay. ويتلقى مزوّد الدفع المعلومات اللازمة لمعالجة الدفع عبر صفحة الدفع الخاصة به. وقد تتضمن سجلات الدفع في صحيحلي تفاصيل العملية وطلب الدفع، لكن الموقع لا يطلب أرقام البطاقات أو بيانات اعتماد المحافظ ولا يخزنها. يعالج المزوّدون المعلومات وفق شروطهم وإشعارات الخصوصية لديهم. لا نبيع النصوص المرسلة أو المعلومات الشخصية.",
      },
      {
        h: "ملفات تعريف الارتباط والتقنيات المشابهة",
        p: "يستخدم الموقع ملفات تعريف الارتباط لتفضيل اللغة وخيار الموافقة وجلسات تسجيل الدخول. كما يتضمن Vercel Analytics وSpeed Insights. وإذا كان Google AdSense مهيأً، فلا يُحمّل نص الإعلانات إلا بعد قبول ملفات الإعلانات عبر شريط الموافقة؛ واختيار «الأساسية فقط» يمنع الشريط من تحميل ذلك النص. وقد تستخدم خدمات الأطراف الثالثة تقنياتها الخاصة وفق سياساتها. يؤدي مسح ملفات الموقع إلى حذف خيار الموافقة المحفوظ وإتاحة الاختيار مجدداً عند ظهور الشريط.",
      },
      {
        h: "الاحتفاظ والحذف",
        p: "نحتفظ بالمعلومات للمدة اللازمة لتقديم الخدمة وإدارة الحسابات والمدفوعات والرد على الطلبات والوفاء بالالتزامات المنطبقة وحماية الخدمة. وتعتمد الفترات المحددة على نوع السجل وإعداد النظام؛ ولا ننشر هنا جدولاً ثابتاً للاحتفاظ. يستطيع المستخدم المسجل حذف عناصر سجل التحليلات منفردة من لوحة التحكم. لطلب الوصول إلى معلومات أخرى أو تصحيحها أو حذفها، راسل privacy@sahihly.com. وقد يلزم الاحتفاظ ببعض السجلات إذا أوجب القانون ذلك أو لحل النزاعات.",
      },
      {
        h: "الأمان",
        p: "نستخدم تدابير تقنية وتنظيمية تهدف إلى حماية المعلومات، ومنها الاتصالات المشفّرة وضوابط الوصول التي توفرها بنيتنا التحتية. لا يمكن ضمان أمان أي خدمة أو إرسال عبر الإنترنت بالكامل. إذا اعتقدت أن حسابك أو معلوماتك تعرضت للاختراق، فاتصل بنا سريعاً.",
      },
      {
        h: "المعالجة الدولية",
        p: "قد يعالج صحيحلي ومزوّدو خدماته المعلومات في دول غير الدولة التي تقيم فيها. وتعتمد الدول وترتيبات النقل على المزوّدين المهيئين ومواقع عملهم. اتصل بنا إن احتجت إلى معلومات عن عملية نقل معينة.",
      },
      {
        h: "حقوق الخصوصية",
        p: "بحسب القانون المنطبق عليك، قد يكون لك حق الوصول إلى بعض المعلومات الشخصية أو تصحيحها أو حذفها أو تقييدها أو الاعتراض على معالجتها أو الحصول على نسخة منها، أو سحب الموافقة حين تعتمد المعالجة عليها. لتقديم طلب، راسل privacy@sahihly.com. وقد يحق لك أيضاً تقديم شكوى إلى جهة الخصوصية المحلية. وقد نحتاج إلى التحقق من طلبك قبل تنفيذه.",
      },
      {
        h: "الأطفال",
        p: "لم يُصمم صحيحلي للأطفال ولا نسعى عن علم إلى جمع معلومات شخصية منهم. إذا اعتقدت أن طفلاً قدّم معلومات شخصية، فاتصل بنا لنراجع الطلب ونتخذ الخطوات المناسبة.",
      },
      {
        h: "التغييرات والتواصل",
        p: "قد نحدّث هذه السياسة مع تغيّر الخدمة وسنعدّل التاريخ أعلاه. لأسئلة الخصوصية أو طلبات البيانات، راسل privacy@sahihly.com. وللدعم العام، بما فيه الفوترة، راسل hello@sahihly.com.",
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
          <Link href={localePath(locale, "/terms")} className="text-violet-200 underline hover:text-white">
            {locale === "ar" ? "شروط الاستخدام" : "Terms of Service"}
          </Link>
          <Link href={localePath(locale, "/refunds")} className="text-violet-200 underline hover:text-white">
            {locale === "ar" ? "سياسة الاسترداد" : "Refund Policy"}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
