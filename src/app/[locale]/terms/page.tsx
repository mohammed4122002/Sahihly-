import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor } from "@/lib/seo";
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
    alternates: alternatesFor(loc, "/terms"),
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
        h: "Free tier, fair use, and rate limits",
        p: "The free tier exists so you can judge the quality before paying, and it is subject to daily run and word limits enforced against a hashed request fingerprint. Circumventing those limits through automation, rotating identifiers, or scripted access is not permitted, and we may throttle or block traffic that behaves that way. If you need higher volume, a paid plan or a conversation with us is the right route and we would rather have it than play cat and mouse.",
      },
      {
        h: "Your content stays yours",
        p: "You keep all rights to the text you submit and to whatever the tool returns for it. We claim no ownership and no licence to publish, resell, or train on your text. We process it to produce your result, store it in your history only if you are signed in, and delete it when you tell us to.",
      },
      {
        h: "What the results are, and are not",
        p: "Detection scores are probabilistic estimates derived from statistical properties of writing. They are not proof of authorship, not evidence of misconduct, and not suitable as the sole basis for any academic, disciplinary, or employment decision. Using them that way is a misuse of the service, and we accept no liability for decisions taken about a person on the strength of a score.",
      },
      {
        h: "Payments, renewals, and refunds",
        p: "Paid plans are billed for the period you select and continue until you cancel, which you can do yourself from the dashboard at any time with effect from the end of the current period. Payment processing happens entirely on the provider's hosted checkout. If you were charged in error, charged after cancelling, or the service materially failed to do what the pricing page described, contact us and we will refund it.",
      },
      {
        h: "Availability and third-party dependencies",
        p: "We rely on external providers for analysis, authentication, and payments, and the service can be interrupted by their outages as well as our own maintenance. We do not promise uninterrupted availability, and we do not guarantee that any particular result, score, or rewrite will be produced for a given input.",
      },
      {
        h: "Suspension and termination",
        p: "We may suspend or close an account that abuses the service, attempts to break its limits, uses it to harass or deceive, or breaches these terms. Where circumstances allow we will tell you why and give you a chance to respond. You can close your own account at any time, and doing so deletes your profile and history.",
      },
      {
        h: "Limitation of liability",
        p: "To the extent the law allows, our total liability arising from your use of the service is limited to the amount you paid us in the twelve months before the claim, and we are not liable for indirect or consequential loss. Nothing here limits liability that cannot lawfully be limited.",
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
        h: "الخطة المجانية والاستخدام العادل والحدود",
        p: "الخطة المجانية موجودة لتحكم على الجودة قبل الدفع، وتخضع لحدود يومية للمحاولات والكلمات تُطبَّق عبر بصمة طلب مُشفَّرة. والالتفاف على تلك الحدود بالأتمتة أو تدوير المعرّفات أو الوصول البرمجي غير مسموح، وقد نُبطئ أو نحجب حركة تتصرّف هكذا. وإن احتجت حجماً أعلى، فالخطة المدفوعة أو محادثة معنا هي الطريق الصحيح ونفضّلها على لعبة القط والفأر.",
      },
      {
        h: "محتواك يبقى لك",
        p: "تحتفظ بكل الحقوق في النص الذي ترسله وفيما تُعيده الأداة عنه. ولا ندّعي ملكية ولا ترخيصاً للنشر أو إعادة البيع أو التدريب على نصّك. نعالجه لإنتاج نتيجتك، ونحفظه في سجلّك فقط إن كنت مسجّلاً، ونحذفه حين تطلب.",
      },
      {
        h: "ما هي النتائج وما ليست",
        p: "نتائج الكشف تقديرات احتمالية مشتقة من خصائص إحصائية للكتابة. وهي ليست إثباتاً للتأليف، ولا دليلاً على مخالفة، ولا تصلح أساساً وحيداً لأي قرار أكاديمي أو تأديبي أو وظيفي. واستخدامها كذلك إساءة استخدام للخدمة، ولا نتحمّل أي مسؤولية عن قرارات تُتَّخذ بحقّ شخص بناءً على نتيجة.",
      },
      {
        h: "المدفوعات والتجديد والاسترداد",
        p: "تُفوتَر الخطط المدفوعة للمدة التي تختارها وتستمر حتى تُلغيها، وتستطيع ذلك بنفسك من اللوحة متى شئت ليسري بنهاية المدة الحالية. ومعالجة الدفع تجري كلياً على صفحة المزوّد المستضافة. وإن خُصِم منك بالخطأ أو بعد الإلغاء أو أخفقت الخدمة جوهرياً فيما وصفته صفحة الأسعار، فتواصل معنا وسنُعيد المبلغ.",
      },
      {
        h: "التوافر والاعتماد على أطراف ثالثة",
        p: "نعتمد على مزوّدين خارجيين للتحليل والمصادقة والمدفوعات، وقد تنقطع الخدمة بأعطالهم كما بصيانتنا. ولا نَعِد بتوافر دون انقطاع، ولا نضمن إنتاج نتيجة أو درجة أو إعادة صياغة بعينها لأي مُدخل.",
      },
      {
        h: "الإيقاف وإنهاء الحساب",
        p: "قد نوقف أو نُغلق حساباً يُسيء استخدام الخدمة، أو يحاول كسر حدودها، أو يستخدمها للمضايقة أو التضليل، أو يخالف هذه الشروط. وحيثما سمحت الظروف سنخبرك بالسبب ونمنحك فرصة للردّ. وتستطيع إغلاق حسابك متى شئت، ويحذف ذلك ملفك وسجلّك.",
      },
      {
        h: "حدود المسؤولية",
        p: "بالقدر الذي يسمح به القانون، تقتصر مسؤوليتنا الإجمالية الناشئة عن استخدامك للخدمة على ما دفعته لنا في الاثني عشر شهراً السابقة للمطالبة، ولا نتحمّل الخسائر غير المباشرة أو التبعية. ولا شيء هنا يحدّ من مسؤولية لا يجوز قانوناً الحدّ منها.",
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
