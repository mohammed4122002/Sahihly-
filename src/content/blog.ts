import type { Locale } from "@/lib/i18n/config";

export type BlogPost = {
  slug: string;
  date: string;
  readingTime: number;
  category: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>; // simple HTML
};

export const posts: BlogPost[] = [
  {
    slug: "how-ai-detectors-work",
    date: "2026-06-02",
    readingTime: 7,
    category: "Guides",
    title: {
      en: "How AI Detectors Actually Work (and Their Limits)",
      ar: "كيف تعمل كواشف الذكاء الاصطناعي فعلاً (وحدودها)",
    },
    excerpt: {
      en: "A plain-English tour of perplexity, burstiness, and why no detector is ever 100% sure.",
      ar: "جولة مبسّطة حول الحيرة والتباين، ولماذا لا يوجد كاشف متأكد ١٠٠٪ أبداً.",
    },
    body: {
      en: `<h2>The core idea</h2><p>AI detectors estimate how "predictable" a passage is to a language model. Two signals dominate: <strong>perplexity</strong> (how surprised a model is by each next word) and <strong>burstiness</strong> (how much sentence length and complexity vary).</p><h2>Why humans look different</h2><p>Human writing tends to be bursty — a short punchy line, then a long winding one. Machine text is often smooth and uniform. Detectors lean on this.</p><h2>The honest limitation</h2><p>These are probabilities, not proof. Edited AI text, or naturally uniform human writing, can flip the result. That's why Sahihly frames scores as guidance for improving style — never as evidence for accusations.</p><h2>Using scores well</h2><ul><li>Treat a high score as "worth a second look," not a verdict.</li><li>Read the highlighted sentences — they show <em>why</em>.</li><li>Combine detection with your own judgment.</li></ul>`,
      ar: `<h2>الفكرة الأساسية</h2><p>تقدّر الكواشف مدى «قابلية توقّع» النص من نموذج لغوي. تسيطر إشارتان: <strong>الحيرة</strong> (مدى مفاجأة النموذج بكل كلمة تالية) و<strong>التباين</strong> (مدى تنوّع طول الجمل وتعقيدها).</p><h2>لماذا يبدو البشر مختلفين</h2><p>تميل الكتابة البشرية للتباين — جملة قصيرة حادّة ثم أخرى طويلة متعرّجة. أما نص الآلة فغالباً سلس ومنتظم، والكواشف تعتمد على ذلك.</p><h2>الحد الصادق</h2><p>هذه احتمالات لا أدلّة. النص المُحرَّر أو الكتابة البشرية المنتظمة قد تقلب النتيجة. لذلك يعرض صحيحلي النتائج كإرشاد لتحسين الأسلوب — لا كدليل للاتهام.</p><h2>الاستخدام الجيّد للنتائج</h2><ul><li>اعتبر النتيجة العالية «تستحق نظرة ثانية» لا حُكماً.</li><li>اقرأ الجمل المميّزة — تُظهر <em>السبب</em>.</li><li>ادمج الكشف مع حكمك الشخصي.</li></ul>`,
    },
  },
  {
    slug: "humanize-without-changing-meaning",
    date: "2026-06-14",
    readingTime: 6,
    category: "Writing",
    title: {
      en: "Humanizing AI Text Without Losing Your Meaning",
      ar: "تنسين نص الذكاء الاصطناعي دون فقدان معناك",
    },
    excerpt: {
      en: "Practical edits that make robotic drafts sound like you — while keeping every fact intact.",
      ar: "تعديلات عملية تجعل المسودّات الآلية تبدو بصوتك — مع الحفاظ على كل معلومة.",
    },
    body: {
      en: `<h2>Vary your rhythm</h2><p>The fastest fix is sentence-length variety. Break one long sentence into two; merge two short ones. Your text instantly feels more human.</p><h2>Kill the filler transitions</h2><p>"Furthermore," "Moreover," and "In conclusion" are AI tells. Replace them with natural connectors — or just start the sentence.</p><h2>Keep the facts</h2><p>Humanizing is a style pass, not a rewrite of substance. Sahihly's humanizer is tuned to preserve meaning while loosening the rhythm.</p>`,
      ar: `<h2>نوّع إيقاعك</h2><p>أسرع إصلاح هو تنويع طول الجمل. قسّم جملة طويلة إلى جملتين، وادمج قصيرتين. سيبدو نصّك أكثر بشرية فوراً.</p><h2>تخلّص من روابط الحشو</h2><p>«علاوة على ذلك» و«بالإضافة إلى ذلك» و«في الختام» علامات آلية. استبدلها بروابط طبيعية — أو ابدأ الجملة مباشرة.</p><h2>احتفظ بالحقائق</h2><p>التنسين تمريرة أسلوبية لا إعادة كتابة للمضمون. مُنسّن صحيحلي مضبوط ليحفظ المعنى مع تليين الإيقاع.</p>`,
    },
  },
  {
    slug: "arabic-ai-detection-challenge",
    date: "2026-06-28",
    readingTime: 8,
    category: "Arabic",
    title: {
      en: "Why Arabic AI Detection Is Hard — and How We Approach It",
      ar: "لماذا كشف الذكاء الاصطناعي بالعربية صعب — وكيف نتعامل معه",
    },
    excerpt: {
      en: "Morphology, diacritics, and dialects break English-only tools. Here's the Arabic-first approach.",
      ar: "الصرف والتشكيل واللهجات تكسر الأدوات الإنجليزية. إليك المنهج العربي أولاً.",
    },
    body: {
      en: `<h2>Arabic is not English with different letters</h2><p>Rich morphology means one root spawns dozens of forms. Optional diacritics change meaning. Most detectors trained on English simply don't model this.</p><h2>Our approach</h2><p>Sahihly reasons about Arabic structure directly — register, morphology, and natural phrasing — rather than translating English heuristics. That's the difference you feel in the results.</p>`,
      ar: `<h2>العربية ليست إنجليزية بحروف مختلفة</h2><p>الصرف الغني يعني أن جذراً واحداً يولّد عشرات الصيغ، والتشكيل الاختياري يغيّر المعنى. معظم الكواشف المدرّبة على الإنجليزية لا تنمذج هذا.</p><h2>منهجنا</h2><p>يستدل صحيحلي على بنية العربية مباشرة — المستوى اللغوي والصرف والصياغة الطبيعية — بدل ترجمة استدلالات إنجليزية. هذا هو الفرق الذي تلمسه في النتائج.</p>`,
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
