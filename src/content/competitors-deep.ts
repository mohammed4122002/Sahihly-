import type { Locale } from "@/lib/i18n/config";

/**
 * The substantive half of each comparison page. Kept beside the feature table
 * rather than inside it because a checklist alone tells a reader almost
 * nothing: it cannot say what a tool is for, where it genuinely beats us, or
 * which of the two a given person should actually pick.
 *
 * Every entry states the competitor's real strengths. That is deliberate. A
 * comparison written by one of the two parties is only worth reading if it
 * concedes the points it should, and a page that never does is correctly
 * treated as marketing by both readers and search engines.
 *
 * Prices are described in shape, never in numbers — vendors change them
 * without notice and a stale figure is worse than none.
 */
export type DeepFields = {
  whatItIs: Record<Locale, string[]>;
  theirStrengths: { title: Record<Locale, string>; body: Record<Locale, string> }[];
  ourDifference: { title: Record<Locale, string>; body: Record<Locale, string> }[];
  pricingNote: Record<Locale, string>;
  chooseThem: Record<Locale, string>;
  chooseUs: Record<Locale, string>;
  faq: { q: Record<Locale, string>; a: Record<Locale, string> }[];
};

export const deepContent: Record<string, DeepFields> = {
  "undetectable-ai": {
    whatItIs: {
      en: [
        "Undetectable.ai is one of the best-known rewriting services in the English market. You paste text that a language model produced, choose a readability level and a purpose, and it returns a version written in a looser, less uniform register. Its stated goal is that the output no longer reads as machine-generated to statistical detectors.",
        "The product is built almost entirely around that single transformation. It bundles a detector so you can check text before and after rewriting, but the rewrite is the centre of gravity, and the tuning, the presets, and the marketing all assume English source text.",
      ],
      ar: [
        "‏Undetectable.ai من أشهر خدمات إعادة الكتابة في السوق الإنجليزية. تلصق نصاً أنتجه نموذج لغوي، وتختار مستوى قراءة وغرضاً، فيعيد لك نسخة بأسلوب أكثر تحرراً وأقل انتظاماً. وهدفه المعلن ألا تُقرأ المخرجات كنصّ آلي أمام الكواشف الإحصائية.",
        "والمنتج مبني كلياً تقريباً حول هذا التحويل الواحد. يرفق كاشفاً لتفحص النص قبل وبعد، لكن إعادة الكتابة هي مركز الثقل، والضبط والقوالب والتسويق كلها تفترض نصاً مصدره الإنجليزية.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "A long track record on English prose", ar: "سجلّ طويل مع النثر الإنجليزي" },
        body: {
          en: "It has been iterated on for years against English text specifically, and that shows. On ordinary English marketing and blog copy the rewrite is fluent and rarely mangles a sentence.",
          ar: "طُوِّر لسنوات على النص الإنجليزي تحديداً، وهذا واضح. ففي نصوص التسويق والمدوّنات الإنجليزية الاعتيادية تأتي إعادة الكتابة سلسة ونادراً ما تُفسد جملة.",
        },
      },
      {
        title: { en: "Presets that map to real situations", ar: "قوالب مرتبطة بحالات واقعية" },
        body: {
          en: "Choosing a readability band and a purpose is a genuinely useful interface. It gives you a coarse but honest handle on register without asking you to describe the tone in words.",
          ar: "اختيار نطاق للقراءة وغرض للنص واجهة مفيدة فعلاً. تمنحك مقبضاً تقريبياً لكنه صادق على المستوى اللغوي دون أن تضطر لوصف النبرة بالكلمات.",
        },
      },
      {
        title: { en: "Bulk throughput", ar: "معالجة بالجملة" },
        body: {
          en: "If your job is to move a large volume of English drafts through a rewriting step, its paid tiers are built for that workload in a way a lighter tool is not.",
          ar: "إن كانت مهمتك تمرير حجم كبير من المسودّات الإنجليزية عبر خطوة إعادة كتابة، فخططه المدفوعة مبنية لهذا العبء بشكل لا توفّره أداة أخف.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "Arabic is a first language here, not a translation layer", ar: "العربية لغة أصيلة هنا لا طبقة ترجمة" },
        body: {
          en: "Our Arabic path is tuned on Arabic morphology and connective conventions rather than English heuristics applied to Arabic text. That difference is not cosmetic: Arabic rhythm, agreement, and the way clauses are joined behave differently enough that a model calibrated on English regularly misjudges perfectly natural Arabic.",
          ar: "مسارنا العربي مضبوط على صرف العربية وأعراف الربط فيها، لا على قواعد إنجليزية مطبَّقة على نص عربي. وهذا فرق جوهري لا شكلي: إيقاع العربية ومطابقتها وطريقة وصل جملها تختلف بما يكفي لأن يُخطئ نموذجٌ مُعايَر على الإنجليزية في حكمه على عربية سليمة تماماً.",
        },
      },
      {
        title: { en: "The score explains itself", ar: "النتيجة تشرح نفسها" },
        body: {
          en: "We return sentence-level highlights and a style report — rhythm variance, vocabulary range, and the specific filler phrases that read as machine-written — alongside a confidence rating. The point is that you can act on the result yourself instead of running the text through a black box again.",
          ar: "نُعيد تمييزاً على مستوى الجملة وتقرير أسلوب — تباين الإيقاع ومدى المفردات وعبارات الحشو المحدّدة التي تُقرأ كآلية — إلى جانب تقييم للثقة. والغاية أن تتصرّف بالنتيجة بنفسك بدل تمرير النص في صندوق مغلق مرة أخرى.",
        },
      },
      {
        title: { en: "You can try it without an account", ar: "تجربة بلا حساب" },
        body: {
          en: "The free tier runs in the browser without a signup. We would rather you find out whether the Arabic output is good enough for your work before you hand over an email address.",
          ar: "الخطة المجانية تعمل في المتصفح بلا تسجيل. نفضّل أن تكتشف بنفسك ما إذا كانت المخرجات العربية كافية لعملك قبل أن تعطينا بريدك.",
        },
      },
      {
        title: { en: "A stated position on what this is for", ar: "موقف معلن من الغرض" },
        body: {
          en: "We publish, on the tool itself, that scores are guidance for improving writing and not evidence of misconduct, and we do not market the humanizer as a way to defeat an academic integrity check. That is a real product difference, not a disclaimer.",
          ar: "ننشر داخل الأداة نفسها أن النتائج إرشاد لتحسين الكتابة لا دليل على مخالفة، ولا نسوّق المُنسّن كوسيلة لهزيمة فحص النزاهة الأكاديمية. وهذا فرق حقيقي في المنتج لا مجرد إخلاء مسؤولية.",
        },
      },
    ],
    pricingNote: {
      en: "Both tools sell monthly plans scaled by word volume, and both offer annual terms at a discount. The practical difference is the floor rather than the ceiling: we run a free tier that needs no account, so evaluating the Arabic output costs nothing. Check current figures on each site before deciding — published prices move.",
      ar: "كلتا الأداتين تبيع خططاً شهرية متدرّجة بحجم الكلمات، وكلتاهما تعرض اشتراكاً سنوياً بخصم. والفارق العملي في الحدّ الأدنى لا الأعلى: لدينا خطة مجانية بلا حساب، فتقييم المخرجات العربية لا يكلّفك شيئاً. راجع الأرقام الحالية على كل موقع قبل القرار — الأسعار المعلنة تتغيّر.",
    },
    chooseThem: {
      en: "Choose Undetectable.ai if you work only in English, your volume is high, and rewriting throughput is the single thing you are buying.",
      ar: "اختر Undetectable.ai إن كنت تعمل بالإنجليزية فقط، وحجمك كبير، وإعادة الكتابة بكميات هي الشيء الوحيد الذي تشتريه.",
    },
    chooseUs: {
      en: "Choose Sahihly if any part of your work is in Arabic, if you want to understand why a passage reads as machine-written rather than only change it, or if you want to test the quality before paying anything.",
      ar: "اختر صحيحلي إن كان أي جزء من عملك بالعربية، أو أردت أن تفهم لماذا يُقرأ مقطع كنصّ آلي بدل تغييره فقط، أو أردت اختبار الجودة قبل أن تدفع شيئاً.",
    },
    faq: [
      {
        q: { en: "Does either tool guarantee text will pass a detector?", ar: "هل تضمن أي منهما تجاوز النص للكواشف؟" },
        a: {
          en: "No, and treat any such guarantee as a warning sign. Detection is probabilistic and detectors change their models continuously. We do not make that claim, and we would not recommend relying on one from anybody.",
          ar: "لا، وتعامل مع أي ضمان من هذا النوع كإشارة تحذير. فالكشف احتمالي والكواشف تُحدّث نماذجها باستمرار. نحن لا ندّعي ذلك، ولا ننصح بالاعتماد على ادعاء كهذا من أي جهة.",
        },
      },
      {
        q: { en: "Will rewriting change my meaning?", ar: "هل تغيّر إعادة الكتابة معناي؟" },
        a: {
          en: "Any rewrite carries that risk, which is why our humanizer is tuned to alter rhythm rather than vocabulary, and why we verify the result after rewriting. Whichever tool you use, read technical terms and figures afterwards — that is where meaning drift shows up first.",
          ar: "أي إعادة كتابة تحمل هذا الخطر، ولهذا ضُبط مُنسّننا على تغيير الإيقاع لا المفردات، ولهذا نتحقّق من النتيجة بعد الصياغة. وأياً كانت الأداة، راجع المصطلحات التقنية والأرقام بعدها — فهناك يظهر انزياح المعنى أولاً.",
        },
      },
      {
        q: { en: "Which is better for Arabic?", ar: "أيّهما أفضل للعربية؟" },
        a: {
          en: "We built for Arabic deliberately and Undetectable.ai did not target it, so we would say ours — but do not take our word for it. Run a paragraph of your own Arabic through both and judge the output yourself; the free tier exists for exactly that.",
          ar: "بنينا للعربية عن قصد ولم يستهدفها Undetectable.ai، فسنقول أداتنا — لكن لا تأخذ كلامنا مسلّماً. مرّر فقرة من عربيتك أنت على الاثنتين واحكم على المخرجات بنفسك؛ الخطة المجانية موجودة لهذا بالضبط.",
        },
      },
    ],
  },

  turnitin: {
    whatItIs: {
      en: [
        "Turnitin is the plagiarism-checking system most universities already run, and in 2023 it added an indicator that estimates how much of a submission reads as AI-generated. Students almost never use it directly: work is submitted through a course page, and the report goes to the instructor.",
        "That single fact shapes everything about it. It is bought by institutions, its reports are written for assessors rather than writers, and its AI indicator exists to flag work for review — not to help anyone improve a draft.",
      ],
      ar: [
        "‏Turnitin هو نظام فحص الانتحال الذي تشغّله معظم الجامعات أصلاً، وأضاف عام ٢٠٢٣ مؤشراً يقدّر كم من التسليم يُقرأ كمولّد آلياً. ونادراً ما يستخدمه الطالب مباشرة: فالعمل يُسلَّم عبر صفحة المقرّر، والتقرير يذهب للمدرّس.",
        "وهذه الحقيقة وحدها تشكّل كل شيء فيه. تشتريه المؤسسات، وتقاريره مكتوبة للمُقيّم لا للكاتب، ومؤشّر الذكاء الاصطناعي فيه موجود ليُشير إلى عمل للمراجعة — لا ليساعد أحداً على تحسين مسودّة.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "Plagiarism matching we do not attempt", ar: "مطابقة انتحال لا نحاولها" },
        body: {
          en: "Its real strength is comparing submissions against an enormous archive of published work and previously submitted papers. That is a completely different capability from measuring statistical predictability, and we do not offer it at all.",
          ar: "قوّته الحقيقية مقارنة التسليمات بأرشيف هائل من الأعمال المنشورة والأوراق المُسلَّمة سابقاً. وهذه قدرة مختلفة كلياً عن قياس القابلية الإحصائية للتوقّع، ونحن لا نقدّمها إطلاقاً.",
        },
      },
      {
        title: { en: "It is where the decision actually happens", ar: "هو حيث يُتَّخذ القرار فعلاً" },
        body: {
          en: "If your university uses Turnitin, its report is the one that matters institutionally. No third-party score changes that, ours included, and any tool implying otherwise is misleading you.",
          ar: "إن كانت جامعتك تستخدم Turnitin فتقريره هو المعتبَر مؤسسياً. ولا نتيجة من طرف ثالث تغيّر ذلك، ونتيجتنا منها، وأي أداة توحي بغير ذلك تضلّلك.",
        },
      },
      {
        title: { en: "Public about the error rate", ar: "معلن بشأن معدل الخطأ" },
        body: {
          en: "It has published guidance that its indicator should not be the sole basis for an accusation, and several universities disabled the feature over reliability concerns. Both facts are to its credit for being visible.",
          ar: "نشر إرشادات بألا يكون مؤشّره الأساس الوحيد لاتهام، وعطّلت عدة جامعات الميزة بسبب مخاوف الموثوقية. وكلا الأمرين يُحسب له لأنه لم يُخفهما.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "You can run it before you submit", ar: "تستطيع تشغيله قبل التسليم" },
        body: {
          en: "This is the entire practical difference. Turnitin runs after submission and reports to someone else; you can check a draft here beforehand, see which sentences read as flat, and fix them while it still matters. Nobody is notified and nothing is filed.",
          ar: "هذا هو الفارق العملي كله. يعمل Turnitin بعد التسليم ويُبلّغ شخصاً آخر؛ بينما تفحص مسودّتك هنا قبلها، وترى أي الجمل يبدو مسطّحاً، وتصلحها وهي ما تزال قابلة للإصلاح. لا يُبلَّغ أحد ولا يُحفَظ شيء.",
        },
      },
      {
        title: { en: "Arabic is calibrated, not accepted", ar: "العربية مُعايَرة لا مقبولة فقط" },
        body: {
          en: "Detection tuned on English misjudges Arabic, and misjudges second-language writers hardest of all — the group most likely to be sitting in front of a Turnitin report they cannot argue with. We calibrate Arabic separately and report confidence honestly.",
          ar: "الكشف المضبوط على الإنجليزية يُخطئ في العربية، ويُخطئ أشدّ ما يكون في حقّ الكاتبين بلغة ثانية — وهم الأكثر عرضةً للجلوس أمام تقرير Turnitin دون قدرة على مجادلته. نحن نُعايِر العربية على حدة ونُبلّغ عن الثقة بصدق.",
        },
      },
      {
        title: { en: "It explains itself", ar: "يشرح نفسه" },
        body: {
          en: "We return the sentences driving the score and a style breakdown you can act on, rather than a percentage in a report you never see. Knowing which paragraph reads as mechanical is the part that improves writing.",
          ar: "نُعيد الجمل التي قادت للنتيجة وتفصيلاً للأسلوب تستطيع التصرّف به، بدل نسبة في تقرير لا تراه. ومعرفة أي فقرة تُقرأ آلياً هي الجزء الذي يحسّن الكتابة.",
        },
      },
    ],
    pricingNote: {
      en: "Turnitin is not sold to individuals — it reaches you through an institutional licence, so there is no personal plan to compare against. We are self-serve with a free tier that needs no account. If your university already runs Turnitin, using us costs you nothing extra and does not replace it.",
      ar: "لا يُباع Turnitin للأفراد — بل يصلك عبر ترخيص مؤسسي، فلا توجد خطة شخصية لمقارنتها. ونحن خدمة ذاتية بخطة مجانية بلا حساب. فإن كانت جامعتك تشغّل Turnitin أصلاً، فاستخدامنا لا يكلّفك شيئاً إضافياً ولا يحلّ محلّه.",
    },
    chooseThem: {
      en: "You do not choose Turnitin — your institution does. If plagiarism matching against published sources is what you need, that is its job and not ours.",
      ar: "أنت لا تختار Turnitin — مؤسستك تختاره. وإن كانت حاجتك مطابقة الانتحال مع مصادر منشورة، فتلك وظيفته لا وظيفتنا.",
    },
    chooseUs: {
      en: "Use Sahihly before you submit: to see how your own writing reads, understand which lines are flat, and improve them — especially if you write in Arabic or in a second language.",
      ar: "استخدم صحيحلي قبل التسليم: لترى كيف تُقرأ كتابتك، وتفهم أي السطور مسطّح، وتحسّنها — خاصة إن كنت تكتب بالعربية أو بلغة ثانية.",
    },
    faq: [
      {
        q: { en: "Does Turnitin detect ChatGPT?", ar: "هل يكشف Turnitin نصوص ChatGPT؟" },
        a: {
          en: "It reports an estimate of how much of a text reads as AI-generated. It does not identify a specific model, because no detector can — there is no watermark to read. Treat the number as a probability, not a finding.",
          ar: "يعرض تقديراً لكم من النص يُقرأ كمولّد آلياً. ولا يحدّد نموذجاً بعينه، لأن ذلك متعذّر على أي كاشف — فلا علامة مائية تُقرأ. تعامل مع الرقم كاحتمال لا كنتيجة قاطعة.",
        },
      },
      {
        q: { en: "Will checking here change my Turnitin result?", ar: "هل يغيّر الفحص هنا نتيجتي في Turnitin؟" },
        a: {
          en: "No, and we would not claim otherwise. Different tools use different models and thresholds, so the scores will not match. What checking here does is show you which passages read as mechanical so you can genuinely improve them before submitting.",
          ar: "لا، ولن ندّعي غير ذلك. فالأدوات المختلفة تستخدم نماذج وعتبات مختلفة، ولن تتطابق النتائج. وما يفعله الفحص هنا أن يُريك أي المقاطع يُقرأ آلياً لتحسّنه فعلياً قبل التسليم.",
        },
      },
      {
        q: { en: "I was accused based on a Turnitin score. What now?", ar: "اتُّهمت بناءً على نتيجة Turnitin. ماذا أفعل؟" },
        a: {
          en: "Do not rewrite the document — its version history is your evidence. Gather your drafts and notes, ask what the specific figure was and on how many words, and offer to discuss the argument in person. Our guide on false positives walks through this in detail.",
          ar: "لا تُعِد كتابة المستند — فسجلّ نسخه هو دليلك. اجمع مسودّاتك وملاحظاتك، واسأل عن الرقم المحدّد وعلى كم كلمة، واعرض مناقشة حجّتك شفهياً. ودليلنا عن النتائج الخاطئة يشرح ذلك بالتفصيل.",
        },
      },
    ],
  },

  "originality-ai": {
    whatItIs: {
      en: [
        "Originality.ai is aimed squarely at people who buy content: agencies, publishers, and site owners checking work delivered by freelance writers. It combines AI detection with plagiarism scanning and a readability check, and keeps a team-visible history of every scan.",
        "Its whole design assumes someone is verifying somebody else's work rather than improving their own, and it sells credits by the scan rather than a writing subscription.",
      ],
      ar: [
        "‏Originality.ai موجّه مباشرةً لمن يشترون المحتوى: الوكالات والناشرون وأصحاب المواقع الذين يفحصون أعمالاً سلّمها كتّاب مستقلّون. ويجمع بين كشف الذكاء الاصطناعي وفحص الانتحال وقياس سهولة القراءة، ويحتفظ بسجلّ فحوصات مرئي للفريق.",
        "وتصميمه كله يفترض أن أحداً يتحقّق من عمل غيره لا أنه يحسّن عمله هو، ويبيع أرصدة بالفحص لا اشتراك كتابة.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "Built for verifying delivered work", ar: "مبني للتحقّق من عمل مُسلَّم" },
        body: {
          en: "Team seats, a shared scan history, and per-writer tracking are genuinely useful if you commission content at volume. We do not build for that workflow and are not trying to.",
          ar: "مقاعد الفريق وسجلّ الفحوصات المشترك وتتبّع كل كاتب أمور مفيدة فعلاً إن كنت تطلب محتوى بكميات. ونحن لا نبني لسير العمل هذا ولا نسعى إليه.",
        },
      },
      {
        title: { en: "Plagiarism scanning in the same pass", ar: "فحص انتحال في التمريرة نفسها" },
        body: {
          en: "Checking both AI likelihood and copied text at once is a real convenience for a publisher, and it is a capability we do not offer.",
          ar: "فحص احتمال الذكاء الاصطناعي والنص المنسوخ معاً راحة حقيقية لناشر، وهي قدرة لا نقدّمها.",
        },
      },
      {
        title: { en: "Published accuracy testing", ar: "اختبارات دقة منشورة" },
        body: {
          en: "It publishes its own benchmark results openly. Vendor-run benchmarks always deserve scepticism, but publishing them at all is better than the silence most of this category offers.",
          ar: "ينشر نتائج قياساته علناً. واختبارات الشركة لنفسها تستحق الشكّ دائماً، لكن نشرها أصلاً أفضل من صمت معظم هذا المجال.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "We are on the writer's side of the table", ar: "نحن في جهة الكاتب" },
        body: {
          en: "Originality.ai exists to judge submitted work. We exist to help someone improve their own draft, which changes what we return: the sentences responsible, a style breakdown, and a rewrite that fixes rhythm without touching your terminology.",
          ar: "‏Originality.ai موجود للحكم على عمل مُسلَّم. ونحن موجودون لمساعدة أحدهم على تحسين مسودّته، وهذا يغيّر ما نُعيده: الجمل المسؤولة، وتفصيل الأسلوب، وإعادة صياغة تصلح الإيقاع دون المساس بمصطلحاتك.",
        },
      },
      {
        title: { en: "Arabic, properly", ar: "العربية كما ينبغي" },
        body: {
          en: "It targets English content operations. If your writers deliver Arabic, a detector calibrated on English will misjudge them — and a false accusation against a freelancer costs someone their work.",
          ar: "هو موجّه لعمليات المحتوى الإنجليزي. فإن كان كتّابك يسلّمون بالعربية، فكاشف مُعايَر على الإنجليزية سيُخطئ في حقّهم — واتهام خاطئ لمستقلّ يكلّفه عمله.",
        },
      },
      {
        title: { en: "No credits to buy before you can judge it", ar: "لا أرصدة تشتريها قبل الحكم عليه" },
        body: {
          en: "Ours runs free with no account, so you can test the quality on your own text before paying anything. Credit-based tools require a purchase before you know whether they work for your language.",
          ar: "أداتنا تعمل مجاناً بلا حساب، فتختبر الجودة على نصّك قبل أن تدفع شيئاً. أما الأدوات القائمة على الأرصدة فتتطلّب شراءً قبل أن تعرف هل تعمل مع لغتك.",
        },
      },
    ],
    pricingNote: {
      en: "Originality.ai sells credits consumed per scan, which suits an agency checking many deliveries and is poor value for someone checking their own drafts repeatedly. We sell a subscription with a free tier and no per-check cost. Match the model to how often you check, not to the headline number.",
      ar: "يبيع Originality.ai أرصدة تُستهلَك بكل فحص، وهو مناسب لوكالة تفحص تسليمات كثيرة وضعيف القيمة لمن يفحص مسودّاته مراراً. ونحن نبيع اشتراكاً بخطة مجانية وبلا تكلفة لكل فحص. طابق النموذج مع عدد مرات فحصك لا مع الرقم المعلن.",
    },
    chooseThem: {
      en: "Choose Originality.ai if you commission English content and need plagiarism scanning, team seats, and a per-writer audit trail.",
      ar: "اختر Originality.ai إن كنت تطلب محتوى إنجليزياً وتحتاج فحص انتحال ومقاعد فريق وسجلّ تدقيق لكل كاتب.",
    },
    chooseUs: {
      en: "Choose Sahihly if you are improving your own writing, if any of it is Arabic, or if you want to test the quality before buying credits.",
      ar: "اختر صحيحلي إن كنت تحسّن كتابتك أنت، أو كان أي منها بالعربية، أو أردت اختبار الجودة قبل شراء أرصدة.",
    },
    faq: [
      {
        q: { en: "Can I use a detector to reject a freelancer's work?", ar: "هل أستخدم كاشفاً لرفض عمل مستقلّ؟" },
        a: {
          en: "Be very careful. Scores are probabilistic and flag second-language writers at higher rates, so rejecting work on a percentage alone will eventually cost you a good writer unfairly. Use it to start a conversation about specific passages instead.",
          ar: "كن شديد الحذر. فالنتائج احتمالية وتصنّف الكاتبين بلغة ثانية بمعدلات أعلى، ورفض عمل بناءً على نسبة وحدها سيكلّفك كاتباً جيداً ظلماً في النهاية. استخدمها لبدء نقاش حول مقاطع محدّدة بدلاً من ذلك.",
        },
      },
      {
        q: { en: "Why do the two tools disagree on the same text?", ar: "لماذا تختلف الأداتان على النص نفسه؟" },
        a: {
          en: "Different models, different training, different thresholds — all estimating the same fuzzy property. A wide gap means the text sits in an ambiguous zone, which is exactly when a confident-looking number misleads most.",
          ar: "نماذج مختلفة وتدريب مختلف وعتبات مختلفة — كلها تقدّر الخاصية الغامضة نفسها. والفجوة الواسعة تعني أن النص في منطقة ملتبسة، وهي تحديداً حين يضلّل الرقم الواثق أكثر ما يضلّل.",
        },
      },
    ],
  },

  grammarly: {
    whatItIs: {
      en: [
        "Grammarly is a writing assistant that most people already have installed: grammar and spelling correction, tone suggestions, and rewriting help, delivered inside the browser and word processors rather than on a separate site. It has since added generative writing features and an AI-detection indicator.",
        "Its centre of gravity is correctness and clarity as you type. Detection is a recent addition to a product built around helping you write, not around judging what was written.",
      ],
      ar: [
        "‏Grammarly مساعد كتابة يملكه معظم الناس أصلاً: تصحيح نحوي وإملائي، واقتراحات للنبرة، ومساعدة في إعادة الصياغة، يعمل داخل المتصفح ومعالجات النصوص لا على موقع منفصل. وأضاف لاحقاً ميزات كتابة توليدية ومؤشراً لكشف الذكاء الاصطناعي.",
        "ومركز ثقله الصواب والوضوح أثناء الكتابة. والكشف إضافة حديثة لمنتج بُني حول مساعدتك على الكتابة لا حول الحكم على ما كُتب.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "It is already where you write", ar: "هو حيث تكتب أصلاً" },
        body: {
          en: "Browser extensions and document integrations mean it corrects you in the place you actually work. That convenience beats any feature comparison for day-to-day writing, and we do not compete with it.",
          ar: "إضافات المتصفح والتكامل مع المستندات تجعله يصحّح لك في المكان الذي تعمل فيه فعلاً. وهذه الراحة تتفوّق على أي مقارنة ميزات في الكتابة اليومية، ونحن لا ننافسها.",
        },
      },
      {
        title: { en: "Genuinely good at correctness", ar: "جيّد فعلاً في الصواب" },
        body: {
          en: "Years of refinement on grammar, punctuation, and clarity suggestions. If English is not your first language, it will catch things no detector ever looks at.",
          ar: "سنوات من الصقل في النحو والترقيم واقتراحات الوضوح. وإن لم تكن الإنجليزية لغتك الأولى فسيلتقط أموراً لا ينظر إليها أي كاشف.",
        },
      },
      {
        title: { en: "One tool for a whole team", ar: "أداة واحدة لفريق كامل" },
        body: {
          en: "Style guides, shared terminology, and brand-tone enforcement across an organisation are things we do not offer at all.",
          ar: "أدلة الأسلوب والمصطلحات المشتركة وفرض نبرة العلامة عبر مؤسسة أمور لا نقدّمها إطلاقاً.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "Correct and human-sounding are different problems", ar: "الصواب والبشرية مشكلتان مختلفتان" },
        body: {
          en: "Grammarly makes writing correct. Correct is not the same as human-sounding — in fact polishing every sentence to the same clean standard is one of the things that makes prose read as machine-written. We measure and fix rhythm, which is the signal detectors actually respond to.",
          ar: "‏Grammarly يجعل الكتابة صحيحة. والصواب ليس البشرية — بل إن صقل كل جملة إلى المعيار النظيف نفسه من أكثر ما يجعل النثر يُقرأ كآلي. ونحن نقيس الإيقاع ونصلحه، وهو الإشارة التي تستجيب لها الكواشف فعلاً.",
        },
      },
      {
        title: { en: "Arabic is a first language here", ar: "العربية لغة أولى هنا" },
        body: {
          en: "Grammarly is an English product. Detection and rewriting in Arabic run here on Arabic-tuned analysis rather than English rules applied to Arabic text, which is the difference between a usable judgement and noise.",
          ar: "‏Grammarly منتج إنجليزي. أما الكشف وإعادة الصياغة بالعربية فيجريان هنا على تحليل مضبوط للعربية لا على قواعد إنجليزية مطبَّقة على نص عربي، وهذا الفرق بين حكم صالح وضجيج.",
        },
      },
      {
        title: { en: "The score explains itself", ar: "النتيجة تشرح نفسها" },
        body: {
          en: "We return a confidence rating, the sentences driving the result, and a style report covering rhythm variance and filler density — the things you can act on rather than a single indicator.",
          ar: "نُعيد تقييماً للثقة، والجمل التي قادت للنتيجة، وتقرير أسلوب يغطي تباين الإيقاع وكثافة الحشو — أموراً تستطيع التصرّف بها بدل مؤشّر واحد.",
        },
      },
    ],
    pricingNote: {
      en: "Grammarly's free tier covers basic correction and its paid plans cover the rest, priced as an everyday writing subscription. We price a narrower product and include a free tier with no account. They are complementary rather than competing purchases — plenty of people reasonably pay for both.",
      ar: "خطة Grammarly المجانية تغطي التصحيح الأساسي وخططه المدفوعة تغطي الباقي، بسعر اشتراك كتابة يومي. ونحن نسعّر منتجاً أضيق مع خطة مجانية بلا حساب. وهما شراءان متكاملان لا متنافسان — وكثيرون يدفعون للاثنين بحقّ.",
    },
    chooseThem: {
      en: "Choose Grammarly for everyday correctness, clarity, and tone in English, inside the tools you already write in.",
      ar: "اختر Grammarly للصواب اليومي والوضوح والنبرة بالإنجليزية، داخل الأدوات التي تكتب فيها أصلاً.",
    },
    chooseUs: {
      en: "Use Sahihly when the question is how machine-written a passage reads and how to loosen it — particularly in Arabic. Most people use both.",
      ar: "استخدم صحيحلي حين يكون السؤال كم يبدو المقطع آلياً وكيف تليّنه — خاصة بالعربية. ومعظم الناس يستخدمون الاثنين.",
    },
    faq: [
      {
        q: { en: "Does fixing grammar lower an AI score?", ar: "هل يخفض تصحيح النحو نتيجة الذكاء الاصطناعي؟" },
        a: {
          en: "Often it raises it. Correction pushes every sentence toward the same clean, conventional form, and that uniformity is precisely what detectors read as machine-written. Vary sentence length after correcting, not before.",
          ar: "غالباً يرفعها. فالتصحيح يدفع كل جملة نحو الصيغة النظيفة التقليدية نفسها، وهذا الانتظام تحديداً ما تقرأه الكواشف كنصّ آلي. نوّع أطوال الجمل بعد التصحيح لا قبله.",
        },
      },
      {
        q: { en: "Can I use both together?", ar: "هل أستخدمهما معاً؟" },
        a: {
          en: "Yes, and it is the sensible order: correct first, then check how the corrected text reads and restore some rhythm. They solve different problems and neither replaces the other.",
          ar: "نعم، وهذا الترتيب المنطقي: صحّح أولاً، ثم افحص كيف يُقرأ النص المصحَّح وأعد بعض الإيقاع. فهما يحلّان مشكلتين مختلفتين ولا يغني أحدهما عن الآخر.",
        },
      },
    ],
  },

  quillbot: {
    whatItIs: {
      en: [
        "QuillBot is a paraphrasing and writing-assistance suite that predates the current wave of AI detection entirely. Its core feature rewrites a sentence into alternative phrasings across several modes — standard, fluent, formal, and others — and it has become a fixture in student and academic workflows for restating sources.",
        "Around that core it has accumulated a grammar checker, a summariser, a citation generator, and a plagiarism check. It is a general writing toolkit, and paraphrasing rather than AI detection is what it is actually built to do.",
      ],
      ar: [
        "‏QuillBot حزمة إعادة صياغة ومساعدة كتابية تسبق موجة كشف الذكاء الاصطناعي الحالية بالكامل. ميزتها الأساسية إعادة صياغة الجملة بصيغ بديلة عبر عدة أنماط — قياسي وسلس ورسمي وغيرها — وصارت ركناً في سير عمل الطلاب والأكاديميين لإعادة صياغة المصادر.",
        "وحول هذا النواة تراكمت مدقّق نحوي وملخّص ومولّد استشهادات وفحص انتحال. إنها حقيبة كتابة عامة، وإعادة الصياغة لا كشف الذكاء الاصطناعي هي ما بُنيت له فعلاً.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "The paraphrasing modes are mature", ar: "أنماط إعادة الصياغة ناضجة" },
        body: {
          en: "Years of refinement show. Switching between fluent and formal produces meaningfully different output rather than cosmetic variation, and the sentence-level control is finer than most competitors offer.",
          ar: "سنوات الصقل ظاهرة. فالتبديل بين السلس والرسمي يُنتج مخرجات مختلفة فعلياً لا تنويعاً شكلياً، والتحكّم على مستوى الجملة أدقّ مما تقدّمه معظم البدائل.",
        },
      },
      {
        title: { en: "It is a whole workbench", ar: "إنها طاولة عمل كاملة" },
        body: {
          en: "Grammar, summarising, and citations in one place is genuinely convenient for a student writing a paper. We do not offer that breadth and are not trying to.",
          ar: "النحو والتلخيص والاستشهادات في مكان واحد ميزة عملية حقيقية لطالب يكتب بحثاً. نحن لا نقدّم هذا الاتساع ولا نسعى إليه.",
        },
      },
      {
        title: { en: "Deep integrations", ar: "تكاملات عميقة" },
        body: {
          en: "Browser extensions and word-processor add-ins mean it sits inside the tools people already write in, which matters more day to day than most feature comparisons admit.",
          ar: "إضافات المتصفح ومعالجات النصوص تجعلها داخل الأدوات التي يكتب فيها الناس أصلاً، وهذا يهمّ يومياً أكثر مما تعترف به معظم المقارنات.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "Different problem entirely", ar: "مشكلة مختلفة تماماً" },
        body: {
          en: "A paraphraser swaps words; we work on the structural signature of machine text — sentence-length variance, filler transitions, rhythmic monotony — while leaving your terminology alone. Synonym substitution is the very thing that breaks technical writing, and it is what we deliberately avoid.",
          ar: "أداة إعادة الصياغة تستبدل الكلمات؛ ونحن نعمل على البصمة البنيوية للنص الآلي — تباين أطوال الجمل وروابط الحشو ورتابة الإيقاع — مع ترك مصطلحاتك كما هي. فاستبدال المرادفات هو تحديداً ما يُفسد الكتابة التقنية، وهو ما نتجنّبه عمداً.",
        },
      },
      {
        title: { en: "Detection is the product, not an add-on", ar: "الكشف هو المنتج لا إضافة" },
        body: {
          en: "We return a probability with a confidence rating, the sentences driving it, and a style breakdown. That is the primary output rather than a secondary feature bolted onto a writing suite.",
          ar: "نُعيد احتمالاً مع تقييم للثقة، والجمل التي قادت إليه، وتفصيلاً للأسلوب. وهذه المخرجات الأساسية لا ميزة ثانوية مركّبة على حزمة كتابة.",
        },
      },
      {
        title: { en: "Arabic that was designed for, not added", ar: "عربية مصمَّمة لا مضافة" },
        body: {
          en: "Arabic detection and rewriting run on Arabic-tuned analysis rather than a translated English pipeline, which is the difference between a tool that works in Arabic and one that merely accepts it.",
          ar: "الكشف وإعادة الصياغة بالعربية يجريان على تحليل مضبوط للعربية لا على خط إنجليزي مترجَم، وهذا الفرق بين أداة تعمل بالعربية وأخرى تقبلها فحسب.",
        },
      },
    ],
    pricingNote: {
      en: "QuillBot sells a broad premium subscription covering its whole toolkit, which is reasonable value if you use the grammar, summarising, and citation features too. We sell a narrower product and price it accordingly, with a free tier that needs no account. If you want the full writing workbench, their bundle is the better buy; if you want detection and meaning-safe rewriting, you are paying for features you will not open.",
      ar: "يبيع QuillBot اشتراكاً واسعاً يغطي حقيبته كاملة، وهو قيمة معقولة إن كنت تستخدم النحو والتلخيص والاستشهادات أيضاً. ونحن نبيع منتجاً أضيق ونسعّره وفق ذلك، مع خطة مجانية بلا حساب. فإن أردت طاولة الكتابة الكاملة فحزمتهم الشراء الأفضل؛ وإن أردت الكشف وإعادة صياغة تحفظ المعنى فستدفع مقابل ميزات لن تفتحها.",
    },
    chooseThem: {
      en: "Choose QuillBot if you want one subscription covering grammar, summarising, citations, and paraphrasing, and you work in English.",
      ar: "اختر QuillBot إن أردت اشتراكاً واحداً يغطي النحو والتلخيص والاستشهادات وإعادة الصياغة، وكنت تعمل بالإنجليزية.",
    },
    chooseUs: {
      en: "Choose Sahihly if the specific job is measuring how machine-written a draft reads and loosening its rhythm without touching the terminology — particularly in Arabic.",
      ar: "اختر صحيحلي إن كانت المهمة تحديداً قياس مدى آلية المسودّة وتليين إيقاعها دون المساس بالمصطلحات — خاصة بالعربية.",
    },
    faq: [
      {
        q: { en: "Is paraphrasing a source the same as citing it?", ar: "هل إعادة صياغة مصدر تُغني عن الاستشهاد به؟" },
        a: {
          en: "No. Rewording someone else's idea still requires a citation. This trips up a lot of students: a paraphrasing tool changes the words, not the obligation.",
          ar: "لا. إعادة صياغة فكرة غيرك تستوجب الاستشهاد أيضاً. وهذا ما يُوقع كثيراً من الطلاب: أداة إعادة الصياغة تغيّر الكلمات لا الواجب.",
        },
      },
      {
        q: { en: "Can I use both together?", ar: "هل أستخدمهما معاً؟" },
        a: {
          en: "Plenty of people do, and it is a sensible combination — draft and tidy in one, then check how the result reads and adjust the rhythm in the other. They are not really substitutes for each other.",
          ar: "كثيرون يفعلون، وهو مزيج منطقي — تصوغ وتنقّح في إحداهما، ثم تفحص كيف تُقرأ النتيجة وتضبط الإيقاع في الأخرى. فهما ليستا بديلين حقيقيين لبعضهما.",
        },
      },
      {
        q: { en: "Why not just use a paraphraser to sound human?", ar: "لماذا لا أستخدم إعادة الصياغة لأبدو بشرياً؟" },
        a: {
          en: "Because uniformity, not vocabulary, is what reads as machine-written. Swapping synonyms across an evenly paced paragraph leaves it just as evenly paced — and risks changing a term you needed exactly as it was.",
          ar: "لأن الانتظام لا المفردات هو ما يُقرأ كنصّ آلي. فاستبدال المرادفات في فقرة منتظمة الإيقاع يتركها منتظمة كما هي — ويخاطر بتغيير مصطلح كنت تحتاجه كما هو تماماً.",
        },
      },
    ],
  },

  gptzero: {
    whatItIs: {
      en: [
        "GPTZero is the tool that put AI detection in front of teachers. Built in early 2023, it reports how likely a passage is to be machine-generated and highlights the sentences contributing most to that judgement, with an interface aimed squarely at educators reviewing student submissions.",
        "It has since added institutional features — classroom workflows, integrations, and writing-process replay that shows how a document was typed. It remains a detection product: it tells you what it thinks a text is, and stops there by design.",
      ],
      ar: [
        "‏GPTZero هو الأداة التي وضعت كشف الذكاء الاصطناعي أمام المعلّمين. بُني مطلع ٢٠٢٣، ويعرض احتمال أن يكون المقطع مولّداً آلياً ويميّز الجمل الأكثر إسهاماً في هذا الحكم، بواجهة موجّهة صراحةً للمعلّمين الذين يراجعون تسليمات الطلاب.",
        "وأضاف لاحقاً ميزات مؤسسية — سير عمل صفّي وتكاملات وإعادة عرض لعملية الكتابة تُظهر كيف كُتب المستند. ويبقى منتج كشف: يخبرك بما يظنّه عن النص، ويتوقّف عند ذلك بحكم التصميم.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "Built for the classroom", ar: "مبني للصف الدراسي" },
        body: {
          en: "The institutional tooling is real and we do not compete with it. If you are an administrator rolling detection out across departments, that infrastructure matters more than any single-score accuracy claim.",
          ar: "الأدوات المؤسسية حقيقية ولا ننافسها. فإن كنت إدارياً تنشر الكشف عبر الأقسام، فتلك البنية أهمّ من أي ادعاء دقة لنتيجة مفردة.",
        },
      },
      {
        title: { en: "Writing-process evidence", ar: "أدلة على عملية الكتابة" },
        body: {
          en: "Replaying how a document was actually typed is a genuinely stronger signal than any statistical score, and it is the most defensible thing in this category. We think it is a better idea than detection itself.",
          ar: "إعادة عرض كيف كُتب المستند فعلاً إشارة أقوى بكثير من أي نتيجة إحصائية، وهي الأكثر قابلية للدفاع في هذا المجال. ونرى أنها فكرة أفضل من الكشف نفسه.",
        },
      },
      {
        title: { en: "Public about its limits", ar: "صريح بشأن حدوده" },
        body: {
          en: "It has published guidance against using scores as sole evidence of misconduct. That is the correct position and worth crediting.",
          ar: "نشر إرشادات ضد استخدام النتائج دليلاً وحيداً على المخالفة. وهذا الموقف الصحيح ويستحق الإنصاف.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "We do the part that comes after the score", ar: "نفعل ما يأتي بعد النتيجة" },
        body: {
          en: "Detection tells a writer their paragraph reads as machine-written; it does not help them fix it. We pair the diagnosis with a humanizer that loosens rhythm while preserving meaning, then re-checks the result. For a writer rather than an assessor, that second half is the useful half.",
          ar: "الكشف يخبر الكاتب أن فقرته تُقرأ كنصّ آلي؛ ولا يساعده على إصلاحها. ونحن نقرن التشخيص بمُنسّن يليّن الإيقاع مع حفظ المعنى، ثم يعيد فحص النتيجة. وللكاتب لا للمُقيّم، فالنصف الثاني هو النصف المفيد.",
        },
      },
      {
        title: { en: "Arabic is targeted, not incidental", ar: "العربية مستهدَفة لا عارضة" },
        body: {
          en: "GPTZero does not position itself as an Arabic tool. We calibrate on Arabic directly, which matters because detectors tuned on English systematically misjudge Arabic — and misjudge second-language writers hardest of all.",
          ar: "لا يقدّم GPTZero نفسه كأداة عربية. ونحن نُعايِر على العربية مباشرة، وهذا مهم لأن الكواشف المضبوطة على الإنجليزية تُخطئ في العربية منهجياً — وتُخطئ في حق الكاتبين بلغة ثانية أشدّ الخطأ.",
        },
      },
      {
        title: { en: "Written for the writer's side of the table", ar: "مكتوب من جهة الكاتب" },
        body: {
          en: "Our interface is built for someone improving their own draft, not for someone assessing another person's. That shapes everything from the wording of results to the decision not to sell classroom surveillance features.",
          ar: "واجهتنا مبنية لمن يحسّن مسودّته هو، لا لمن يُقيّم عمل غيره. وهذا يشكّل كل شيء من صياغة النتائج إلى قرار عدم بيع أدوات مراقبة صفّية.",
        },
      },
    ],
    pricingNote: {
      en: "GPTZero prices around scanned volume with institutional tiers for schools. We price for individual writers and small teams and include a free tier with no account. They are aimed at different buyers, so the per-word comparison is less meaningful than it looks — a department licence and a writer's subscription are not the same purchase.",
      ar: "يسعّر GPTZero حسب حجم الفحص مع خطط مؤسسية للمدارس. ونحن نسعّر للكاتب الفرد والفرق الصغيرة مع خطة مجانية بلا حساب. والاثنان موجّهان لمشترٍ مختلف، فمقارنة سعر الكلمة أقل دلالةً مما تبدو — فترخيص قسم واشتراك كاتب ليسا الشراء نفسه.",
    },
    chooseThem: {
      en: "Choose GPTZero if you are an educator or institution and you need classroom workflows, integrations, and writing-process evidence at scale.",
      ar: "اختر GPTZero إن كنت معلّماً أو مؤسسة وتحتاج سير عمل صفّياً وتكاملات وأدلة على عملية الكتابة على نطاق واسع.",
    },
    chooseUs: {
      en: "Choose Sahihly if you are the one writing — especially in Arabic — and you want to know why a passage reads as flat and have help fixing it.",
      ar: "اختر صحيحلي إن كنت أنت من يكتب — خاصة بالعربية — وأردت أن تعرف لماذا يبدو مقطعٌ مسطّحاً وأن تُعان على إصلاحه.",
    },
    faq: [
      {
        q: { en: "Can a detector prove someone used AI?", ar: "هل يستطيع كاشف إثبات استخدام الذكاء الاصطناعي؟" },
        a: {
          en: "No. Every detector, ours included, returns a probability derived from how predictable the text is. It is a reason to ask a question, never a finding on its own. Honest writing gets flagged, and second-language writers get flagged disproportionately.",
          ar: "لا. كل كاشف، وكاشفنا منها، يُعيد احتمالاً مشتقاً من مدى قابلية توقّع النص. وهو سبب لطرح سؤال، لا نتيجة قائمة بذاتها أبداً. فالكتابة النزيهة تُصنَّف خطأً، والكاتبون بلغة ثانية يُصنَّفون خطأً بنسب أعلى.",
        },
      },
      {
        q: { en: "Why does my honest writing get flagged?", ar: "لماذا تُصنَّف كتابتي النزيهة كآلية؟" },
        a: {
          en: "Because detectors measure uniformity, not authorship. Careful editing, rigid academic formats, and writing in a second language all produce the even, conventional prose that scores as machine-like.",
          ar: "لأن الكواشف تقيس الانتظام لا التأليف. فالتحرير الدقيق والقوالب الأكاديمية الصارمة والكتابة بلغة ثانية كلها تُنتج النثر المستوي التقليدي الذي يُصنَّف كآلي.",
        },
      },
      {
        q: { en: "Do you sell tools for accusing students?", ar: "هل تبيعون أدوات لاتهام الطلاب؟" },
        a: {
          en: "No. We build for writers improving their own text, and we state inside the product that scores are guidance rather than evidence. If you need institutional invigilation, a classroom-focused product will serve you better than ours.",
          ar: "لا. نبني للكاتب الذي يحسّن نصّه، ونصرّح داخل المنتج بأن النتائج إرشاد لا دليل. وإن احتجت مراقبة مؤسسية فمنتج موجّه للصفوف سيخدمك أفضل منّا.",
        },
      },
    ],
  },

  copyleaks: {
    whatItIs: {
      en: [
        "Copyleaks is an enterprise content-integrity platform. Its origin is plagiarism detection — comparing submitted text against a large index of published material — and AI detection was layered on as that became the pressing question for its customers.",
        "It sells primarily to institutions and businesses: LMS integrations, an API, multi-seat administration, compliance reporting, and support arrangements. The buyer is usually a department rather than a person.",
      ],
      ar: [
        "‏Copyleaks منصّة مؤسسية لنزاهة المحتوى. أصلها كشف الانتحال — بمقارنة النص المُسلَّم بفهرس واسع من المواد المنشورة — ثم أُضيف كشف الذكاء الاصطناعي حين صار السؤال الملحّ لعملائها.",
        "وتبيع أساساً للمؤسسات والشركات: تكاملات مع أنظمة التعلّم، وواجهة برمجية، وإدارة متعدّدة المقاعد، وتقارير امتثال، وترتيبات دعم. والمشتري عادةً قسم لا شخص.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "Plagiarism detection we do not attempt", ar: "كشف انتحال لا نحاوله" },
        body: {
          en: "Matching text against a corpus of published sources is a completely different capability from measuring statistical predictability, and it is one we do not offer at all. If you need to know whether a passage was copied from somewhere, we are the wrong tool.",
          ar: "مطابقة النص مع مدوّنة مصادر منشورة قدرة مختلفة كلياً عن قياس القابلية الإحصائية للتوقّع، ونحن لا نقدّمها إطلاقاً. فإن احتجت معرفة ما إذا كان مقطع منسوخاً من مكان، فنحن الأداة الخاطئة.",
        },
      },
      {
        title: { en: "Institutional plumbing", ar: "بنية مؤسسية" },
        body: {
          en: "LMS integrations, SSO, role management, and audit trails are unglamorous and genuinely hard. For an organisation, that infrastructure often decides the purchase.",
          ar: "التكامل مع أنظمة التعلّم وتسجيل الدخول الموحّد وإدارة الأدوار وسجلّات التدقيق أمور غير براقة وصعبة فعلاً. وللمؤسسة، غالباً ما تحسم هذه البنية قرار الشراء.",
        },
      },
      {
        title: { en: "Broad language coverage", ar: "تغطية لغوية واسعة" },
        body: {
          en: "It advertises detection across many languages, which is more than most competitors attempt and more breadth than we offer — we cover two languages and try to cover them properly.",
          ar: "يُعلن كشفاً عبر لغات كثيرة، وهو أكثر مما تحاوله معظم البدائل وأوسع مما نقدّمه — نحن نغطي لغتين ونحاول تغطيتهما كما ينبغي.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "Depth in two languages instead of breadth in thirty", ar: "عمق في لغتين بدل اتساع في ثلاثين" },
        body: {
          en: "Supporting many languages usually means one model generalised across all of them. We tune Arabic and English separately, and for Arabic specifically that is the difference between a usable judgement and a coin flip.",
          ar: "دعم لغات كثيرة يعني عادةً نموذجاً واحداً معمّماً عليها جميعاً. ونحن نضبط العربية والإنجليزية كلاً على حدة، وللعربية تحديداً هذا هو الفرق بين حكم صالح للاستخدام ورمي عملة.",
        },
      },
      {
        title: { en: "No procurement to get started", ar: "لا مشتريات للبدء" },
        body: {
          en: "You can check a paragraph right now without an account, a demo call, or a contract. Enterprise tools are not built for that and are not trying to be.",
          ar: "تستطيع فحص فقرة الآن بلا حساب ولا مكالمة عرض ولا عقد. والأدوات المؤسسية غير مبنية لهذا ولا تسعى إليه.",
        },
      },
      {
        title: { en: "Detection paired with repair", ar: "كشف مقرون بالإصلاح" },
        body: {
          en: "Compliance platforms flag; they do not help the writer improve the draft. We return the specific sentences and a humanizer that fixes the rhythm without disturbing the content.",
          ar: "منصّات الامتثال تُشير؛ ولا تساعد الكاتب على تحسين المسودّة. ونحن نُعيد الجمل المحدّدة ومُنسّناً يصلح الإيقاع دون المساس بالمضمون.",
        },
      },
    ],
    pricingNote: {
      en: "Copyleaks is sold on annual credit bundles and institutional agreements, often with a minimum commitment and a sales conversation. We are self-serve with a free tier. If you are buying for an organisation the enterprise model probably suits you; if you are one writer, the minimums will not.",
      ar: "يُباع Copyleaks بحزم أرصدة سنوية واتفاقيات مؤسسية، وغالباً بحدّ أدنى للالتزام ومحادثة مبيعات. ونحن خدمة ذاتية بخطة مجانية. فإن كنت تشتري لمؤسسة فالنموذج المؤسسي يناسبك غالباً؛ وإن كنت كاتباً واحداً فالحدود الدنيا لن تناسبك.",
    },
    chooseThem: {
      en: "Choose Copyleaks if you need plagiarism matching, institutional integrations, and compliance reporting across an organisation.",
      ar: "اختر Copyleaks إن احتجت مطابقة انتحال وتكاملات مؤسسية وتقارير امتثال عبر منظّمة.",
    },
    chooseUs: {
      en: "Choose Sahihly if you are an individual or small team working in Arabic or English who wants an immediate answer and help acting on it.",
      ar: "اختر صحيحلي إن كنت فرداً أو فريقاً صغيراً يعمل بالعربية أو الإنجليزية ويريد إجابة فورية وعوناً على التصرّف بها.",
    },
    faq: [
      {
        q: { en: "Is AI detection the same as plagiarism detection?", ar: "هل كشف الذكاء الاصطناعي هو كشف الانتحال؟" },
        a: {
          en: "No, and conflating them causes real confusion. Plagiarism detection matches your text against existing published sources. AI detection estimates how predictable your text is to a language model. A passage can be entirely original and still score as machine-written.",
          ar: "لا، والخلط بينهما يسبب التباساً حقيقياً. فكشف الانتحال يطابق نصّك مع مصادر منشورة قائمة. وكشف الذكاء الاصطناعي يقدّر مدى قابلية نصّك للتوقّع من نموذج لغوي. وقد يكون مقطع أصيلاً تماماً ويُصنَّف مع ذلك كآلي.",
        },
      },
      {
        q: { en: "Do you offer an API?", ar: "هل تقدّمون واجهة برمجية؟" },
        a: {
          en: "We offer an embeddable widget and are pragmatic about integration requests, but we do not pretend to match an enterprise platform's integration surface. If API breadth and formal support terms are decisive for you, that is an honest reason to choose them.",
          ar: "نقدّم أداة قابلة للتضمين ونتعامل بمرونة مع طلبات التكامل، لكننا لا ندّعي مضاهاة سطح التكامل في منصّة مؤسسية. فإن كان اتساع الواجهة البرمجية وشروط الدعم الرسمية حاسمة لك، فهذا سبب صادق لاختيارهم.",
        },
      },
      {
        q: { en: "Which handles Arabic better?", ar: "أيّهما أفضل مع العربية؟" },
        a: {
          en: "We calibrate Arabic as its own language rather than as one entry in a long list, so we would expect better Arabic judgement from ours. The way to settle it is to run your own Arabic text through both — ours costs nothing to try.",
          ar: "نحن نُعايِر العربية كلغة قائمة بذاتها لا كمُدخل في قائمة طويلة، فنتوقّع حكماً عربياً أفضل من أداتنا. والسبيل للحسم أن تمرّر نصّك العربي على الاثنتين — وتجربة أداتنا لا تكلّف شيئاً.",
        },
      },
    ],
  },

  zerogpt: {
    whatItIs: {
      en: [
        "ZeroGPT is a free, browser-based AI checker. You paste text, it returns a percentage describing how much of the passage reads as machine-generated, and it highlights the parts driving that number. There is no account requirement for basic use and the interface is deliberately minimal.",
        "Its appeal is speed and zero friction. It answers one question quickly and does not attempt to be a writing platform.",
      ],
      ar: [
        "‏ZeroGPT فاحص مجاني يعمل في المتصفح. تلصق نصاً فيُعيد نسبة تصف كم من المقطع يُقرأ كمولّد آلياً، ويميّز الأجزاء التي قادت لذلك الرقم. ولا يشترط حساباً للاستخدام الأساسي، وواجهته بسيطة عن قصد.",
        "وجاذبيته في السرعة وانعدام العوائق. يجيب عن سؤال واحد بسرعة ولا يحاول أن يكون منصّة كتابة.",
      ],
    },
    theirStrengths: [
      {
        title: { en: "Genuinely frictionless", ar: "بلا عوائق فعلاً" },
        body: {
          en: "No signup, no paywall for a basic check, no onboarding. For a quick sanity check on a paragraph that is a real advantage, and we deliberately match it rather than compete with it.",
          ar: "لا تسجيل ولا جدار دفع لفحص أساسي ولا تهيئة. ولفحص سريع لفقرة فهذه ميزة حقيقية، ونحن نجاريها عمداً بدل منافستها.",
        },
      },
      {
        title: { en: "Fast and light", ar: "سريع وخفيف" },
        body: {
          en: "It loads and answers quickly, which is most of what people want from a free checker.",
          ar: "يُحمَّل ويجيب بسرعة، وهذا معظم ما يريده الناس من فاحص مجاني.",
        },
      },
      {
        title: { en: "Understandable output", ar: "مخرجات مفهومة" },
        body: {
          en: "A single percentage with highlighted passages is easy to read, even if a single percentage is also the format most likely to be over-trusted.",
          ar: "نسبة واحدة مع مقاطع مميّزة سهلة القراءة، وإن كانت النسبة المفردة هي أيضاً الصيغة الأكثر عرضةً للثقة المفرطة.",
        },
      },
    ],
    ourDifference: [
      {
        title: { en: "A confidence rating alongside the number", ar: "تقييم للثقة إلى جانب الرقم" },
        body: {
          en: "A bare percentage hides how much the tool actually knows. Under roughly three hundred words there is not enough rhythm to measure reliably, so we say so instead of returning a confident-looking figure we cannot stand behind.",
          ar: "النسبة المجرّدة تُخفي كم تعرف الأداة فعلاً. فتحت ثلاثمئة كلمة تقريباً لا يوجد إيقاع كافٍ للقياس الموثوق، ولذلك نقول ذلك بدل إعادة رقم يبدو واثقاً لا نستطيع الوقوف خلفه.",
        },
      },
      {
        title: { en: "A style report, not just a verdict", ar: "تقرير أسلوب لا حُكم فقط" },
        body: {
          en: "We break out rhythm variance, vocabulary range, average sentence length, and the specific filler phrases that read as machine-written. Those are things you can actually act on; a percentage is not.",
          ar: "نفصّل تباين الإيقاع ومدى المفردات ومتوسّط طول الجملة وعبارات الحشو المحدّدة التي تُقرأ كآلية. وهذه أمور تستطيع التصرّف بها فعلاً؛ أما النسبة فلا.",
        },
      },
      {
        title: { en: "The rewrite is included", ar: "إعادة الصياغة مشمولة" },
        body: {
          en: "Knowing a paragraph reads as flat is only useful if you can fix it. Our humanizer loosens the rhythm without changing your meaning, then re-checks the output automatically.",
          ar: "معرفة أن فقرة تبدو مسطّحة لا تنفع إن لم تستطع إصلاحها. ومُنسّننا يليّن الإيقاع دون تغيير معناك، ثم يعيد فحص المخرجات تلقائياً.",
        },
      },
      {
        title: { en: "Arabic handled on its own terms", ar: "عربية بشروطها هي" },
        body: {
          en: "Free checkers overwhelmingly calibrate on English. Run natural Arabic through one and the result is frequently unreliable in a way the interface never signals. We tune Arabic separately and report confidence honestly.",
          ar: "الفاحصات المجانية تُعايَر على الإنجليزية في الغالب الأعمّ. مرّر عربية طبيعية على إحداها وستكون النتيجة غير موثوقة كثيراً بشكل لا تُشير إليه الواجهة أبداً. ونحن نضبط العربية على حدة ونُبلّغ عن الثقة بصدق.",
        },
      },
    ],
    pricingNote: {
      en: "Both tools let you check text for free without an account. Ours adds paid tiers for longer texts, saved history, and the humanizer; theirs monetises through advertising and higher limits. If a free percentage is all you need, you do not need to pay either of us.",
      ar: "كلتا الأداتين تتيح فحص النص مجاناً بلا حساب. وأداتنا تضيف خططاً مدفوعة للنصوص الأطول وحفظ السجلّ والمُنسّن؛ وهم يحقّقون الدخل عبر الإعلانات وحدود أعلى. فإن كانت نسبة مجانية كل ما تحتاجه، فلست بحاجة للدفع لأيٍّ منّا.",
    },
    chooseThem: {
      en: "Choose ZeroGPT if you want the fastest possible free percentage on an English paragraph and nothing more.",
      ar: "اختر ZeroGPT إن أردت أسرع نسبة مجانية ممكنة لفقرة إنجليزية ولا شيء غير ذلك.",
    },
    chooseUs: {
      en: "Choose Sahihly if you want to know how much to trust the number, understand which sentences produced it, and have a way to improve them — in Arabic as well as English.",
      ar: "اختر صحيحلي إن أردت أن تعرف كم تثق بالرقم، وتفهم أي الجمل أنتجته، وتملك سبيلاً لتحسينها — بالعربية كما بالإنجليزية.",
    },
    faq: [
      {
        q: { en: "Are free AI detectors accurate?", ar: "هل الكواشف المجانية دقيقة؟" },
        a: {
          en: "They vary, and the honest answer is that no detector is reliable enough to treat as proof. Accuracy drops sharply on short texts and on writing by non-native speakers. Use any score as a prompt to look closer, not as a conclusion.",
          ar: "تتفاوت، والجواب الصادق أن لا كاشف موثوق بما يكفي ليُعامَل كدليل. فالدقة تنهار على النصوص القصيرة وعلى كتابة غير الناطقين الأصليين. استخدم أي نتيجة دافعاً للنظر عن قرب، لا خلاصة.",
        },
      },
      {
        q: { en: "Why do two detectors disagree on the same text?", ar: "لماذا يختلف كاشفان على النص نفسه؟" },
        a: {
          en: "Because they are different models with different training and thresholds, all estimating the same fuzzy property. Wide disagreement is a signal that the text sits in an ambiguous zone — which is exactly when a confident-looking percentage misleads most.",
          ar: "لأنهما نموذجان مختلفان بتدريب وعتبات مختلفة، يقدّران الخاصية الغامضة نفسها. والاختلاف الواسع إشارة إلى أن النص يقع في منطقة ملتبسة — وهي تحديداً الحالة التي تضلّل فيها النسبة الواثقة أكثر ما تضلّل.",
        },
      },
      {
        q: { en: "Is it free to check Arabic text here?", ar: "هل فحص النص العربي مجاني هنا؟" },
        a: {
          en: "Yes. The free tier covers Arabic and English equally and needs no account. Paid plans exist for longer documents and the humanizer, but checking a paragraph costs nothing.",
          ar: "نعم. الخطة المجانية تغطي العربية والإنجليزية بالتساوي ولا تحتاج حساباً. وتوجد خطط مدفوعة للمستندات الأطول وللمُنسّن، لكن فحص فقرة لا يكلّف شيئاً.",
        },
      },
    ],
  },
};
