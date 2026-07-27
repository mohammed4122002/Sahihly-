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
        h: "Who is responsible for your data",
        p: "Sahihly operates this site and decides how the data described here is processed, which makes us the data controller for it. If you are in the European Economic Area, the United Kingdom, or another region with comparable rules, the rights described below apply to you regardless of where we operate from. Questions or requests go to privacy@sahihly.com and we answer them ourselves rather than routing you to a form.",
      },
      {
        h: "The specific data we hold",
        p: "Text you submit for analysis, which is processed to produce a result and — if you are signed in — stored in your history so you can revisit it. Account details: your email address, display name, chosen plan, role, and an avatar image if you upload one. Usage counters keyed to a hashed fingerprint, used only to enforce daily free-tier limits. Newsletter subscriptions if you opt in, and the contents of any message you send through the contact form. Payment records covering plan, amount, status, and reference, but never card numbers or wallet credentials — those are handled entirely on the payment provider's own checkout and never reach us.",
      },
      {
        h: "Why we are allowed to process it",
        p: "We rely on performing our contract with you for anything required to run your account and deliver results you asked for; on your consent for advertising cookies, newsletter email, and optional analytics; and on our legitimate interest in keeping the service working and free from abuse for security logging and rate limiting. Where consent is the basis, you can withdraw it at any time — declining or clearing the cookie banner, unsubscribing from any email, or deleting your account — and withdrawal does not affect processing that already happened.",
      },
      {
        h: "Advertising and how consent works here",
        p: "Where advertising is enabled, Google and its partners may use cookies or device identifiers to serve and measure ads, including personalised ads based on your prior visits to this and other sites. We do not load any advertising script until you have actively accepted it on the consent banner. Choosing essential-only means no advertising cookies are set at all. You can review or change that choice at any time by clearing this site's cookies, and you can control personalisation independently at Google's Ads Settings. We do not sell your personal information, and we do not share the text you analyse with advertisers under any circumstances.",
      },
      {
        h: "How long we keep things",
        p: "Analysis history stays until you delete it or close your account, and you can remove individual entries yourself from the dashboard. Account records are kept while the account is active and removed on deletion. Anonymous rate-limit counters expire on a rolling daily basis. Newsletter subscriptions persist until you unsubscribe. Payment records are retained for the period tax and accounting law requires, which is the one category we cannot delete on request.",
      },
      {
        h: "Your rights, and how to use them",
        p: "You can ask for a copy of your data, correct anything inaccurate, delete your account and its contents, restrict or object to particular processing, or ask us to transfer your data elsewhere. Email privacy@sahihly.com and we will respond within one month. You do not need to give a reason, and asking will never affect your access to the service. If you believe we have handled a request badly, you are entitled to complain to your local data protection authority.",
      },
      {
        h: "Where your data is processed",
        p: "Our infrastructure and the AI providers we use operate internationally, so your data may be processed outside your own country, including in the United States. Where that involves a transfer out of the EEA or UK, it takes place under the standard contractual clauses or an equivalent approved mechanism offered by the provider concerned.",
      },
      {
        h: "Children",
        p: "This service is not directed at children under 13, and we do not knowingly collect their personal information or knowingly serve personalised advertising to them. If you believe a child has provided us with data, contact us and we will delete it promptly.",
      },
      {
        h: "Changes to this policy",
        p: "When we change this policy we update the date at the top of the page. If a change materially affects how we handle your data, we will say so prominently rather than relying on you to notice a new date. Continuing to use the service after a change means the updated policy applies.",
      },
      {
        h: "Contact",
        p: "Questions about this policy, or a request about your data? Email privacy@sahihly.com. A real person reads it and you will get an answer.",
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
        h: "من المسؤول عن بياناتك",
        p: "يشغّل صحيحلي هذا الموقع ويقرّر كيفية معالجة البيانات الموصوفة هنا، ما يجعلنا المتحكّم بها. وإن كنت في المنطقة الاقتصادية الأوروبية أو المملكة المتحدة أو أي إقليم بقواعد مماثلة، فالحقوق الموضّحة أدناه تنطبق عليك بغضّ النظر عن مكان تشغيلنا. والأسئلة والطلبات تُرسَل إلى privacy@sahihly.com ونجيب عنها بأنفسنا لا بتحويلك إلى نموذج.",
      },
      {
        h: "البيانات المحدّدة التي نحتفظ بها",
        p: "النص الذي ترسله للتحليل، ويُعالَج لإنتاج نتيجة، ويُحفَظ في سجلّك إن كنت مسجّلاً لتعود إليه. وتفاصيل الحساب: بريدك الإلكتروني والاسم الظاهر والخطة المختارة والدور وصورة شخصية إن رفعتها. وعدّادات استخدام مرتبطة ببصمة مُشفَّرة تُستخدم فقط لتطبيق حدود الخطة المجانية اليومية. واشتراكات النشرة إن اخترتها، ومحتوى أي رسالة ترسلها عبر نموذج التواصل. وسجلّات الدفع التي تغطي الخطة والمبلغ والحالة والمرجع، دون أرقام بطاقات أو بيانات محافظ إطلاقاً — فتلك تُعالَج كلياً على صفحة مزوّد الدفع ولا تصل إلينا أبداً.",
      },
      {
        h: "لماذا يحقّ لنا معالجتها",
        p: "نعتمد على تنفيذ عقدنا معك في كل ما يلزم لتشغيل حسابك وتسليم النتائج التي طلبتها؛ وعلى موافقتك في كوكيز الإعلانات ورسائل النشرة والتحليلات الاختيارية؛ وعلى مصلحتنا المشروعة في إبقاء الخدمة عاملة وخالية من الإساءة في تسجيل الأمان وتحديد المعدّلات. وحيثما كانت الموافقة هي الأساس، تستطيع سحبها متى شئت — برفض شريط الموافقة أو مسحه، أو إلغاء الاشتراك من أي رسالة، أو حذف حسابك — ولا يؤثّر السحب على معالجة جرت سابقاً.",
      },
      {
        h: "الإعلانات وكيف تعمل الموافقة هنا",
        p: "حيثما كانت الإعلانات مفعّلة، قد تستخدم Google وشركاؤها كوكيز أو معرّفات أجهزة لعرض الإعلانات وقياسها، بما فيها إعلانات مخصّصة بناءً على زياراتك السابقة لهذا الموقع وغيره. ونحن لا نُحمّل أي نصّ إعلاني قبل أن تقبله فعلياً على شريط الموافقة. واختيار «الأساسية فقط» يعني ألا تُضبط أي كوكيز إعلانية إطلاقاً. وتستطيع مراجعة هذا الاختيار أو تغييره متى شئت بمسح كوكيز الموقع، كما تستطيع التحكّم بالتخصيص مستقلاً من إعدادات إعلانات Google. ونحن لا نبيع معلوماتك الشخصية، ولا نشارك النص الذي تحلّله مع المعلنين تحت أي ظرف.",
      },
      {
        h: "مدة الاحتفاظ",
        p: "سجلّ التحليلات يبقى حتى تحذفه أو تُغلق حسابك، وتستطيع إزالة أي مُدخل بنفسك من اللوحة. وسجلّات الحساب تُحفظ ما دام الحساب نشطاً وتُزال عند الحذف. وعدّادات الحدّ المجهولة تنتهي يومياً بالتدوير. واشتراكات النشرة تستمر حتى تُلغيها. وسجلّات الدفع تُحفَظ للمدة التي تفرضها قوانين الضريبة والمحاسبة، وهي الفئة الوحيدة التي لا نستطيع حذفها عند الطلب.",
      },
      {
        h: "حقوقك وكيف تستخدمها",
        p: "تستطيع طلب نسخة من بياناتك، أو تصحيح ما هو غير دقيق، أو حذف حسابك ومحتوياته، أو تقييد معالجة معيّنة أو الاعتراض عليها، أو أن تطلب نقل بياناتك إلى جهة أخرى. راسل privacy@sahihly.com وسنردّ خلال شهر. ولست مضطراً لذكر سبب، ولن يؤثّر الطلب أبداً على وصولك للخدمة. وإن رأيت أننا تعاملنا مع طلبك بشكل سيّئ، فمن حقّك تقديم شكوى لسلطة حماية البيانات في بلدك.",
      },
      {
        h: "أين تُعالَج بياناتك",
        p: "بنيتنا التحتية ومزوّدو الذكاء الاصطناعي الذين نستخدمهم يعملون دولياً، فقد تُعالَج بياناتك خارج بلدك، بما في ذلك في الولايات المتحدة. وحيثما تضمّن ذلك نقلاً خارج المنطقة الاقتصادية الأوروبية أو المملكة المتحدة، فإنه يجري وفق البنود التعاقدية القياسية أو آلية معتمدة مكافئة يوفّرها المزوّد المعني.",
      },
      {
        h: "الأطفال",
        p: "هذه الخدمة غير موجّهة للأطفال دون الثالثة عشرة، ولا نجمع معلوماتهم الشخصية عن علم ولا نعرض لهم إعلانات مخصّصة عن علم. وإن كنت تعتقد أن طفلاً زوّدنا ببيانات، فتواصل معنا وسنحذفها فوراً.",
      },
      {
        h: "تغييرات هذه السياسة",
        p: "حين نغيّر هذه السياسة نُحدّث التاريخ أعلى الصفحة. وإن أثّر تغيير جوهرياً في طريقة تعاملنا مع بياناتك، فسنذكر ذلك بوضوح بدل الاعتماد على ملاحظتك لتاريخ جديد. ومتابعة استخدام الخدمة بعد التغيير تعني سريان السياسة المحدّثة.",
      },
      {
        h: "التواصل",
        p: "لأي سؤال حول هذه السياسة أو طلب بشأن بياناتك، راسل privacy@sahihly.com. يقرأها شخص حقيقي وستصلك إجابة.",
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
