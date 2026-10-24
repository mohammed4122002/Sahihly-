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
    title: loc === "ar" ? "شروط الاستخدام" : "Terms of Service",
    description:
      loc === "ar"
        ? "الشروط التي تحكم استخدامك لخدمة صحيحلي."
        : "The terms governing your use of Sahihly.",
    alternates: alternatesFor(loc, "/terms"),
  };
}

const content = {
  en: {
    title: "Terms of Service",
    intro:
      "These terms apply when you access or use Sahihly. Please read them together with our Privacy Policy and Refund Policy. These terms are a service-policy draft and do not replace advice about the laws that apply to you.",
    updated: "Last updated: October 24, 2026",
    contents: "On this page",
    pricing: "View plans and pricing",
    sections: [
      {
        h: "Using Sahihly",
        p: "Sahihly provides writing tools, including AI-likelihood detection and text rewriting. You may use the service only in ways that comply with applicable law and any rules that apply to you, including academic or workplace rules. You are responsible for deciding whether a tool is appropriate for your purpose.",
      },
      {
        h: "Accounts and security",
        p: "Some features require an account. You are responsible for keeping your sign-in credentials secure and for activity on your account. Keep your account information accurate and contact us promptly if you suspect unauthorized access.",
      },
      {
        h: "Plans, billing, and cancellation",
        p: "Paid plans, prices, and billing periods are shown on the pricing and checkout pages before you pay. Payment may be made through the method offered at checkout, including a hosted Lemon Squeezy checkout or the manual USDT payment flow. A hosted provider may process payments and renewals under its checkout terms; manual USDT payments do not automatically charge you for a later period. To request cancellation or help with a provider-managed renewal, contact us or use any cancellation controls made available by the payment provider. We will confirm when a cancellation takes effect. See our Refund Policy for refund eligibility.",
      },
      {
        h: "AI results and limitations",
        p: "Detection scores are estimates, not proof of authorship or misconduct. Results may be incomplete or inaccurate and must not be the sole basis for academic, employment, disciplinary, or other consequential decisions. Rewrites may alter meaning or style, so review every result before relying on it.",
      },
      {
        h: "Your content",
        p: "You retain rights you have in text you submit. You confirm that you have the rights and permissions needed to submit it. We process submitted text to provide the feature you request; for signed-in users, a limited portion of submitted text and result information may also be saved in account history as described in the Privacy Policy. You are responsible for reviewing outputs and ensuring your use of them is lawful.",
      },
      {
        h: "Prohibited use and fair use",
        p: "Do not use Sahihly unlawfully, interfere with the service, bypass usage limits, probe or disrupt its systems, or use it to harass, deceive, or infringe another person's rights. We may limit or suspend access when reasonably necessary to protect users, the service, or third parties, subject to applicable law.",
      },
      {
        h: "Intellectual property",
        p: "Sahihly and its software, branding, design, and other site materials are owned by Sahihly or its licensors and are protected by applicable intellectual-property laws. These terms grant you a limited, personal, non-exclusive right to use the service; they do not transfer ownership of the service or its branding.",
      },
      {
        h: "Availability and changes",
        p: "We may update, suspend, or discontinue parts of the service and may rely on third-party services to operate it. We do not promise uninterrupted availability or that every feature will always be available. We will make reasonable efforts to communicate material changes where appropriate.",
      },
      {
        h: "Suspension and termination",
        p: "You may stop using Sahihly at any time. We may restrict or end access for a breach of these terms, misuse, security concerns, or where required by law. Where appropriate, we will provide notice and an opportunity to resolve the issue. Ending access does not remove rights or obligations that accrued before termination.",
      },
      {
        h: "Disclaimers and liability",
        p: "To the extent permitted by law, Sahihly is provided without warranties beyond those that cannot lawfully be excluded. To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of the service. Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law, or affects consumer rights that cannot be waived.",
      },
      {
        h: "Changes to these terms",
        p: "We may revise these terms as the service changes. The updated date will appear above. If a change is material, we will take reasonable steps to bring it to users' attention. The revised terms apply from the date they are posted, subject to any notice or consent required by law.",
      },
      {
        h: "Contact",
        p: "For questions about these terms, billing, or cancellation, contact hello@sahihly.com. For personal-data questions, contact privacy@sahihly.com.",
      },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    intro:
      "تسري هذه الشروط عند دخولك إلى صحيحلي أو استخدامه. يُرجى قراءتها مع سياسة الخصوصية وسياسة الاسترداد. هذه الشروط مسودة لسياسة الخدمة ولا تغني عن المشورة بشأن القوانين المنطبقة عليك.",
    updated: "آخر تحديث: ٢٤ أكتوبر ٢٠٢٦",
    contents: "في هذه الصفحة",
    pricing: "عرض الخطط والأسعار",
    sections: [
      {
        h: "استخدام صحيحلي",
        p: "يقدّم صحيحلي أدوات للكتابة، منها تقدير احتمال الكتابة بالذكاء الاصطناعي وإعادة صياغة النصوص. لا يجوز استخدام الخدمة إلا بما يتوافق مع القانون والقواعد المنطبقة عليك، بما فيها القواعد الأكاديمية أو المهنية. وتقع عليك مسؤولية تقرير مدى ملاءمة الأداة لغرضك.",
      },
      {
        h: "الحسابات والأمان",
        p: "تتطلب بعض الميزات حساباً. أنت مسؤول عن حماية بيانات تسجيل الدخول وعن النشاط الذي يجري عبر حسابك. حافظ على دقة بياناتك واتصل بنا سريعاً إن اشتبهت في وصول غير مصرّح به.",
      },
      {
        h: "الخطط والفوترة والإلغاء",
        p: "تُعرض الخطط المدفوعة والأسعار وفترات الفوترة في صفحتي الأسعار والدفع قبل إتمام الدفع. قد تتم المدفوعات عبر الطريقة المعروضة عند الدفع، ومنها صفحة Lemon Squeezy المستضافة أو مسار الدفع اليدوي بعملة USDT. قد يعالج المزوّد المستضاف المدفوعات والتجديدات وفق شروط صفحة الدفع؛ أما الدفع اليدوي بعملة USDT فلا يخصم تلقائياً لمدّة لاحقة. لطلب الإلغاء أو المساعدة بشأن تجديد يديره مزوّد، راسلنا أو استخدم أدوات الإلغاء التي يوفّرها المزوّد. سنؤكد لك موعد سريان الإلغاء. راجع سياسة الاسترداد لمعرفة شروط الاسترداد.",
      },
      {
        h: "نتائج الذكاء الاصطناعي وحدودها",
        p: "نتائج الكشف تقديرات وليست إثباتاً لهوية الكاتب أو للمخالفة. قد تكون النتائج ناقصة أو غير دقيقة، ولا يجوز اعتمادها وحدها في قرارات أكاديمية أو مهنية أو تأديبية أو غيرها من القرارات المهمة. وقد تغيّر إعادة الصياغة المعنى أو الأسلوب، لذا راجع كل نتيجة قبل الاعتماد عليها.",
      },
      {
        h: "محتواك",
        p: "تحتفظ بالحقوق التي تملكها في النص الذي ترسله. وتؤكد امتلاكك الحقوق والأذونات اللازمة لإرساله. نعالج النص لتقديم الميزة التي طلبتها؛ وقد يُحفظ جزء محدود من النص ومعلومات النتيجة في سجل الحساب للمستخدمين المسجلين، كما هو موضح في سياسة الخصوصية. وتقع عليك مسؤولية مراجعة النتائج والتأكد من قانونية استخدامها.",
      },
      {
        h: "الاستخدام المحظور والعادل",
        p: "لا تستخدم صحيحلي بطريقة غير قانونية، أو للتدخل في الخدمة، أو لتجاوز حدود الاستخدام، أو لفحص الأنظمة أو تعطيلها، أو لمضايقة الآخرين أو تضليلهم أو انتهاك حقوقهم. ويجوز لنا تقييد الوصول أو تعليقه عند الحاجة المعقولة لحماية المستخدمين أو الخدمة أو الغير، مع مراعاة القانون.",
      },
      {
        h: "الملكية الفكرية",
        p: "يملك صحيحلي أو مرخّصوه الخدمة وبرمجياتها وعلامتها التجارية وتصميمها ومواد الموقع الأخرى، وهي محمية بقوانين الملكية الفكرية المنطبقة. تمنحك هذه الشروط حقاً محدوداً وشخصياً وغير حصري لاستخدام الخدمة، ولا تنقل إليك ملكية الخدمة أو علامتها.",
      },
      {
        h: "التوافر والتغييرات",
        p: "قد نحدّث أجزاء من الخدمة أو نعلّقها أو نوقفها، وقد نعتمد على خدمات أطراف ثالثة لتشغيلها. لا نضمن التوافر دون انقطاع أو استمرار كل ميزة. وسنبذل جهداً معقولاً لإبلاغ المستخدمين بالتغييرات الجوهرية عند الاقتضاء.",
      },
      {
        h: "التعليق وإنهاء الاستخدام",
        p: "يمكنك التوقف عن استخدام صحيحلي في أي وقت. ويجوز لنا تقييد الوصول أو إنهاؤه عند مخالفة الشروط أو إساءة الاستخدام أو وجود مخاوف أمنية أو إذا أوجب القانون ذلك. وحيثما كان مناسباً، سنرسل إشعاراً ونمنح فرصة لمعالجة المشكلة. ولا يؤدي إنهاء الوصول إلى إسقاط الحقوق أو الالتزامات التي نشأت قبله.",
      },
      {
        h: "إخلاء الضمان وحدود المسؤولية",
        p: "بالقدر الذي يسمح به القانون، تُقدّم الخدمة دون ضمانات تتجاوز ما لا يجوز استبعاده قانوناً. وبالقدر الذي يسمح به القانون، لا نتحمل مسؤولية الخسائر غير المباشرة أو التبعية الناتجة عن استخدام الخدمة. ولا تستبعد هذه الشروط أو تحدّ من مسؤولية لا يجوز استبعادها أو الحدّ منها، ولا تمس حقوق المستهلك التي لا يجوز التنازل عنها.",
      },
      {
        h: "تغييرات الشروط",
        p: "قد نراجع هذه الشروط مع تطور الخدمة، وسنحدّث تاريخ المراجعة أعلاه. وإذا كان التغيير جوهرياً، سنتخذ خطوات معقولة لإبلاغ المستخدمين به. وتسري الشروط المعدلة من تاريخ نشرها، مع مراعاة أي إشعار أو موافقة يوجبها القانون.",
      },
      {
        h: "التواصل",
        p: "للاستفسار عن هذه الشروط أو الفوترة أو الإلغاء، راسل hello@sahihly.com. وللاستفسارات المتعلقة بالبيانات الشخصية، راسل privacy@sahihly.com.",
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
              {index === 2 && (
                <p>
                  <Link href={localePath(locale, "/refunds")} className="text-violet-200 underline hover:text-white">
                    {locale === "ar" ? "اقرأ سياسة الاسترداد" : "Read the Refund Policy"}
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
        <Link href={localePath(locale, "/pricing")} className="mt-8 inline-flex text-sm text-violet-200 underline hover:text-white">
          {c.pricing}
        </Link>
      </Reveal>
    </div>
  );
}
