/**
 * Use-case landing pages for the detector.
 *
 * These exist because "AI detector" is one query and "AI detector for research
 * papers" is a different one, with a different reader, a different worry, and
 * far less competition. What they are NOT is one page printed six times: a
 * template with the noun swapped is exactly the no-value-add content that gets
 * a site dropped from AdSense, and it earns nothing in search either. Every
 * case below answers a question the others do not — what a supervisor actually
 * does with a flagged chapter, why a rubric-trained essay reads as machine
 * text, what a client contract can and cannot ask of a freelance writer.
 */

export type UseCaseCopy = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** The thesis. Answers the query in the first two sentences, no preamble. */
  lede: string;
  sections: { h: string; p: string }[];
  /** Concrete decision rules — the part a reader can act on today. */
  rules: { when: string; then: string }[];
  faq: { q: string; a: string }[];
};

export type UseCase = {
  slug: string;
  /** Sorted into the hub page in this order. */
  order: number;
  en: UseCaseCopy;
  ar: UseCaseCopy;
  /** Internal links shown at the foot of the page. */
  related: { href: string; en: string; ar: string }[];
};

export const useCases: UseCase[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "students",
    order: 1,
    related: [
      { href: "/blog/ai-detector-false-positives", en: "Wrongly accused? A practical defence", ar: "اتُّهمت ظلماً؟ دليل عملي للدفاع" },
      { href: "/blog/how-to-cite-ai-academic-work", en: "How to cite and disclose AI use", ar: "كيف تُوثّق استخدام الذكاء الاصطناعي" },
      { href: "/blog/does-turnitin-detect-ai", en: "Does Turnitin detect AI writing?", ar: "هل يكشف Turnitin كتابة الذكاء الاصطناعي؟" },
    ],
    en: {
      h1: "AI Detector for Students",
      metaTitle: "AI Detector for Students — Check Your Essay Before You Submit",
      metaDescription:
        "Check your own writing before your university does. See which sentences read as machine-written, why honest work gets flagged, and what to do if you are accused — free, English and Arabic.",
      lede:
        "If you are here the night before a deadline, the useful thing to know is this: running your own essay through a detector will not tell you whether you are in trouble, because your university is not scoring the same text with the same tool. What it will tell you is which of your sentences are flat enough to look generated — and those are worth rewriting whether or not anyone ever checks.",
      sections: [
        {
          h: "Why does my own writing get flagged as AI?",
          p: "Because detectors measure predictability, not authorship. They have no record of what you typed; they estimate how closely your prose matches the statistical shape of generated text — even sentence lengths, conventional transitions, safe vocabulary. Essay training pushes students towards exactly that shape. If you were taught to open every paragraph with a topic sentence, keep clauses balanced, and avoid the first person, you were taught to write in the register a detector scores highest.",
        },
        {
          h: "Writing in a second language raises your score",
          p: "This is the single most under-discussed fact in the category, and it matters enormously for Arabic-speaking students writing in English. A smaller working vocabulary produces more repetition; learned sentence patterns produce more uniformity; careful grammar produces fewer of the irregularities that read as human. None of that is dishonesty and all of it moves the number up. If you write in English as a second language, treat a high score as weak evidence and say so plainly if you are ever asked about one.",
        },
        {
          h: "What to do with a high score on your own draft",
          p: "Read the highlighted sentences and ask what each one is actually claiming. The flagged ones are usually the ones doing the least work — the paragraph opener that restates the prompt, the transition that connects nothing, the summary sentence that repeats the point above it. Cutting them lowers the score as a side effect; the real gain is that the argument gets tighter. If a flagged sentence is genuinely load-bearing, leave it. A percentage is not a reason to delete something true.",
        },
        {
          h: "Keep evidence that you wrote it",
          p: "Version history is the defence that actually works, and it costs nothing to have. Draft in Google Docs or Word with autosave on, and the file itself records hours of incremental edits — false starts, restructured paragraphs, a thesis that changed in the middle. Nobody who did not write a piece has that trail. Keep your notes and your reading list too. An accusation is a conversation about process, and process is the one thing a detector score cannot fake or refute.",
        },
        {
          h: "Using AI without breaking your rules",
          p: "Most university policies distinguish between assistance and authorship, and the line sits in a different place at every institution — which is why 'is AI allowed' is the wrong question and 'what does my department count as authorship' is the right one. Asking a model to explain a concept, suggest counter-arguments, or check your grammar is assistance almost everywhere. Having it draft prose you submit is authorship almost everywhere. Where your course sits between those, only your handbook can say.",
        },
        {
          h: "What this tool will and will not do",
          p: "It gives you a likelihood with a confidence rating, highlights the specific sentences carrying the signal, and reports four measurable properties of your text so you can see why. It will not certify your work as human, because no tool can, and it will not match whatever your institution runs. Treat it as a mirror for revision, not a clearance certificate — and be suspicious of any product that offers you the second thing.",
        },
      ],
      rules: [
        { when: "Your essay is under 300 words", then: "Ignore the score entirely — there is not enough text for the statistics to mean anything." },
        { when: "You wrote it yourself and it scores high", then: "Rewrite the flattest flagged sentences, keep your version history, and stop worrying about the number." },
        { when: "You are told to prove authorship", then: "Show the document's edit history and your notes. That is evidence; a low detector score is not." },
        { when: "You used AI for structure or grammar", then: "Check your course policy on disclosure, and disclose it if there is any doubt. Disclosed assistance is rarely penalised; undisclosed assistance often is." },
      ],
      faq: [
        { q: "Will my university see that I used this tool?", a: "No. Checking your own draft is private and leaves no record with anyone. It is the same as reading it aloud to yourself before submitting." },
        { q: "If I score 0% here, am I safe with Turnitin?", a: "No, and treat any tool that implies otherwise as unreliable. Different detectors use different models and thresholds, so scores are not transferable between them." },
        { q: "Does rewording AI text until it passes count as cheating?", a: "Under most academic policies, yes — the question is who authored the ideas and the argument, not whose phrasing survived. Rewriting to disguise origin is usually treated more harshly than disclosed use." },
        { q: "Why did my score change when I resubmitted the same essay?", a: "Borderline texts sit near a decision boundary where small differences move the result. That instability is itself information: it means the text is genuinely ambiguous." },
        { q: "Does it work on Arabic assignments?", a: "Yes. Arabic is analysed natively with its own phrase lists and thresholds rather than being run through an English-trained model, which is why Arabic results here are more meaningful than in most tools." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي للطلاب",
      metaTitle: "كاشف الذكاء الاصطناعي للطلاب — افحص بحثك قبل التسليم",
      metaDescription:
        "افحص كتابتك قبل أن تفحصها جامعتك. اعرف أي جملة تبدو آلية، ولماذا تُتَّهم الكتابة النزيهة، وماذا تفعل إن اتُّهمت — مجاناً بالعربية والإنجليزية.",
      lede:
        "إن كنت هنا ليلة التسليم فالمفيد أن تعرف هذا: فحص بحثك بكاشف لن يخبرك هل أنت في مشكلة، لأن جامعتك لا تفحص النص نفسه بالأداة نفسها. لكنه سيخبرك أي جملك مسطّحة بما يكفي لتبدو مولّدة — وهذه تستحق إعادة الكتابة سواء فحصك أحد أم لا.",
      sections: [
        {
          h: "لماذا تُصنَّف كتابتي أنا كذكاء اصطناعي؟",
          p: "لأن الكواشف تقيس قابلية التوقّع لا هوية الكاتب. فهي لا تملك سجلاً بما كتبتَه، بل تقدّر مدى مطابقة نثرك للشكل الإحصائي للنص المولّد: أطوال جمل متساوية، وروابط تقليدية، ومفردات آمنة. والتدريب على كتابة المقال الأكاديمي يدفع الطلاب إلى هذا الشكل بالضبط. فإن عُلِّمت أن تفتتح كل فقرة بجملة موضوعية، وأن توازن الجمل، وأن تتجنّب ضمير المتكلم، فقد عُلِّمت الكتابة في المستوى الذي يمنحه الكاشف أعلى نتيجة.",
        },
        {
          h: "الكتابة بلغة ثانية ترفع نتيجتك",
          p: "هذه أكثر حقيقة مسكوت عنها في هذا المجال، وهي بالغة الأهمية للطالب العربي الذي يكتب بالإنجليزية. فالمفردات الأضيق تُنتج تكراراً أكثر، والأنماط المحفوظة تُنتج انتظاماً أكثر، والقواعد المتحرّية تُنتج شذوذاً أقل — وهو الشذوذ نفسه الذي يُقرأ كبشري. لا شيء من ذلك غش، وكله يرفع الرقم. فإن كنت تكتب بالإنجليزية كلغة ثانية فعامِل النتيجة العالية كدليل ضعيف، وقُل ذلك صراحةً إن سُئلت يوماً.",
        },
        {
          h: "ماذا تفعل بنتيجة عالية في مسودّتك",
          p: "اقرأ الجمل المميّزة واسأل عن كل واحدة: ما الذي تقوله فعلاً؟ الجمل المُنذَرة عادةً هي الأقل عملاً — مفتتح الفقرة الذي يعيد صياغة السؤال، والرابط الذي لا يربط شيئاً، وجملة التلخيص التي تكرّر ما فوقها. حذفها يخفض النتيجة كأثر جانبي، لكن المكسب الحقيقي أن الحجّة تصير أمتن. وإن كانت الجملة المُنذَرة حاملة لمعنى فعلاً فاتركها؛ النسبة المئوية ليست سبباً لحذف شيء صحيح.",
        },
        {
          h: "احتفظ بدليل أنك كتبته",
          p: "سجلّ النُّسخ هو الدفاع الذي ينجح فعلاً، ولا يكلّفك شيئاً. اكتب في Google Docs أو Word مع الحفظ التلقائي، فيسجّل الملف نفسه ساعات من التعديل التدريجي: بدايات فاشلة، وفقرات أُعيد ترتيبها، وأطروحة تغيّرت في المنتصف. ومن لم يكتب النص لا يملك هذا الأثر. واحتفظ بملاحظاتك وقائمة مراجعك أيضاً. فالاتهام محادثة عن العملية، والعملية هي الشيء الوحيد الذي لا تستطيع نتيجة الكاشف تزييفه ولا نفيه.",
        },
        {
          h: "استخدام الذكاء الاصطناعي دون مخالفة لائحتك",
          p: "معظم سياسات الجامعات تفرّق بين الاستعانة والتأليف، والخط يقع في موضع مختلف عند كل مؤسسة — ولهذا فسؤال «هل الذكاء الاصطناعي مسموح» هو السؤال الخطأ، والصحيح «ما الذي يعدّه قسمي تأليفاً». أن تطلب من نموذج شرح مفهوم، أو اقتراح حجج مضادّة، أو مراجعة قواعدك، فهذا استعانة في معظم المواضع. وأن يكتب لك نصاً تسلّمه فهذا تأليف في معظم المواضع. أما أين يقع مقرّرك بينهما فلا يجيب عنه إلا دليل جامعتك.",
        },
        {
          h: "ما تفعله هذه الأداة وما لا تفعله",
          p: "تعطيك احتمالاً مع تقييم ثقة، وتميّز الجمل التي تحمل الإشارة، وتعرض أربعة مقاييس لنصّك لترى السبب. ولن تشهد بأن عملك بشري لأن لا أداة تستطيع ذلك، ولن تطابق ما تشغّله مؤسستك. عامِلها كمرآة للمراجعة لا كشهادة براءة — وارتب في أي منتج يعرض عليك الشيء الثاني.",
        },
      ],
      rules: [
        { when: "بحثك أقل من ٣٠٠ كلمة", then: "تجاهل النتيجة تماماً — لا يوجد نص كافٍ لتعني الإحصاءات شيئاً." },
        { when: "كتبته بنفسك وجاءت النتيجة عالية", then: "أعد كتابة أكثر الجمل المُنذَرة تسطّحاً، واحتفظ بسجلّ نسخك، وتوقّف عن القلق من الرقم." },
        { when: "طُلب منك إثبات أنك الكاتب", then: "اعرض سجلّ تعديلات المستند وملاحظاتك. هذا دليل؛ أما نتيجة كاشف منخفضة فليست دليلاً." },
        { when: "استعنت بالذكاء الاصطناعي في الترتيب أو القواعد", then: "راجع سياسة مقرّرك في الإفصاح، وأفصح إن وُجد أدنى شك. فالاستعانة المُفصَح عنها نادراً ما تُعاقَب، وغير المُفصَح عنها كثيراً ما تُعاقَب." },
      ],
      faq: [
        { q: "هل ستعرف جامعتي أني استخدمت هذه الأداة؟", a: "لا. فحص مسودّتك خاص بك ولا يترك سجلاً عند أحد. هو كأن تقرأ بحثك بصوت عالٍ لنفسك قبل التسليم." },
        { q: "إن كانت نتيجتي هنا صفر، هل أنا آمن مع Turnitin؟", a: "لا، وعامِل أي أداة توحي بغير ذلك كأداة غير موثوقة. فالكواشف المختلفة تستخدم نماذج وعتبات مختلفة، والنتائج غير قابلة للنقل بينها." },
        { q: "هل إعادة صياغة نص آلي حتى يمرّ تُعدّ غشاً؟", a: "في معظم اللوائح الأكاديمية نعم — فالسؤال عمّن ألّف الأفكار والحجّة لا عمّن بقيت صياغته. وإعادة الصياغة لإخفاء المصدر تُعامَل عادةً بقسوة أكبر من الاستعانة المُفصَح عنها." },
        { q: "لماذا تغيّرت النتيجة عند إعادة فحص البحث نفسه؟", a: "النصوص الحدّية تقع قرب حدّ قرار تُحرّكه فروق صغيرة. وهذا التذبذب نفسه معلومة: يعني أن النص ملتبس فعلاً." },
        { q: "هل يعمل مع الواجبات العربية؟", a: "نعم. تُحلَّل العربية بأصالة بقوائم عباراتها وعتباتها الخاصة بدل تمريرها على نموذج مدرَّب على الإنجليزية، ولهذا فنتائج العربية هنا أكثر معنى منها في معظم الأدوات." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "teachers",
    order: 2,
    related: [
      { href: "/blog/ai-writing-policy-for-teams", en: "Writing an AI policy people follow", ar: "كتابة سياسة ذكاء اصطناعي يلتزم بها الناس" },
      { href: "/blog/ai-detector-false-positives", en: "What a false positive costs", ar: "ما يكلّفه الإنذار الخاطئ" },
      { href: "/methodology", en: "How our score is calculated", ar: "كيف تُحسب نتيجتنا" },
    ],
    en: {
      h1: "AI Detector for Teachers",
      metaTitle: "AI Detector for Teachers — Use Scores Without Wrecking Trust",
      metaDescription:
        "A detector score is evidence for a conversation, never proof of cheating. How to read a flagged submission, why some honest students score high, and what to do instead of accusing.",
      lede:
        "The hardest thing about AI detection in a classroom is not getting a number — it is that the number cannot carry the weight teachers need it to carry. A detector estimates how predictable a text is. It cannot distinguish a student who generated an essay from a student who writes in careful, conventional, second-language English, and treating it as if it can is how good teachers end up accusing honest students.",
      sections: [
        {
          h: "What the score actually measures",
          p: "Four things, all statistical: how much sentence lengths vary, how rich the vocabulary is, how often stock machine-typical phrases appear, and how repetitive the text is overall. None of these is a record of origin. A student who writes in short, varied, opinionated sentences will score low whether or not they used a model; a student trained to write formally will score high whether or not they did. The metric is style, and style correlates with generation imperfectly.",
        },
        {
          h: "Which of your students will be flagged unfairly",
          p: "Predictably: second-language writers, students on the autism spectrum who write in consistent registers, students who have internalised a rigid rubric, and the meticulous ones who edit until every sentence is clean. These are often your most conscientious students, and they are the ones most damaged by an accusation. Before you act on a score, ask whether the student belongs to any of those groups — not to excuse them, but because the base rate of false positives is genuinely higher there.",
        },
        {
          h: "The conversation that works better than the score",
          p: "Ask about the argument, not the text. Why did you structure it this way? What did you nearly argue instead? Which source changed your mind? A student who wrote the piece can answer immediately and specifically, often with a story about a paragraph they cut. A student who did not usually cannot, and the gap is obvious within two minutes without anyone being accused of anything. This is slower than reading a percentage, and it is the only method that survives an appeal.",
        },
        {
          h: "Design the assignment so detection matters less",
          p: "The most durable answer is not better detection, it is assessment that a model cannot do well: writing tied to a specific seminar discussion, to a dataset only your class has, to a local context, or to a draft-and-revise process you can see. Ask for the reasoning behind a choice rather than the choice. Require an annotated bibliography with one sentence on why each source was kept. None of this bans AI; it makes unassisted AI output visibly thin.",
        },
        {
          h: "Write the policy before you need it",
          p: "Most disputes are not about whether a student used AI — they are about whether the rule was clear. State what counts as assistance and what counts as authorship, in examples rather than principles: 'asking for counter-arguments is fine, submitting generated prose is not.' Say what disclosure looks like and where it goes. Say what happens on a flagged submission, so that students and colleagues know a percentage triggers a conversation and never a penalty on its own.",
        },
        {
          h: "Why we publish confidence alongside the score",
          p: "Because a bare percentage invites exactly the misuse described above. Short texts, mixed-language texts, and heavily edited texts all produce unstable results, and a tool that hides that instability is misleading its users. Our reports show the confidence rating, the sentences carrying the signal, and the four underlying metrics — so you can see whether the number rests on something or on nothing before deciding what to do with it.",
        },
      ],
      rules: [
        { when: "A submission scores high", then: "Do nothing to the grade. Open a conversation about the argument first." },
        { when: "The text is under 300 words", then: "Discard the result. The statistics are unreliable at that length." },
        { when: "The student writes in a second language", then: "Weight the score much lower. The false-positive rate is documented to be higher for this group." },
        { when: "You need a defensible finding", then: "Rely on process evidence — version history, drafts, an oral explanation — and use the score only as the reason you looked." },
      ],
      faq: [
        { q: "Can I fail a student based on a detector score?", a: "You should not, and most institutional policies now say so explicitly. A score is a probabilistic style estimate; academic misconduct findings require evidence about conduct." },
        { q: "What accuracy should I assume?", a: "Assume it is useful for triage and unreliable for individual judgement. Any vendor quoting a single accuracy figure without naming the text length, language, and threshold is quoting a number that does not transfer to your classroom." },
        { q: "Do students know how to defeat detectors?", a: "Some do, and the methods are widely shared. This is a real limit of the whole category and an argument for assessment design over surveillance." },
        { q: "Does it work for Arabic submissions?", a: "Yes, natively, with Arabic-specific phrase lists and thresholds rather than an English model applied to Arabic text." },
        { q: "Can I check a whole class at once?", a: "Paid plans raise the per-run word limit and keep a history of your checks. There is no bulk gradebook integration, by design — the tool is meant to inform your reading, not to grade for you." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي للمعلّمين",
      metaTitle: "كاشف الذكاء الاصطناعي للمعلّمين — كيف تقرأ النتيجة دون تدمير الثقة",
      metaDescription:
        "نتيجة الكاشف دليل لمحادثة لا إثبات غش. كيف تقرأ تسليماً مُنذَراً، ولماذا يحصل طلاب نزيهون على نتائج عالية، وماذا تفعل بدل الاتهام.",
      lede:
        "أصعب ما في كشف الذكاء الاصطناعي داخل الصف ليس الحصول على رقم — بل أن الرقم لا يحتمل الثقل الذي يحتاج المعلّم أن يحمّله إياه. فالكاشف يقدّر قابلية النص للتوقّع، ولا يستطيع التمييز بين طالب ولّد بحثه وطالب يكتب إنجليزية ثانية متحرّية تقليدية. ومعاملته كأنه يستطيع هي الطريق الذي ينتهي بمعلّم جيد يتّهم طالباً نزيهاً.",
      sections: [
        {
          h: "ما الذي تقيسه النتيجة فعلاً",
          p: "أربعة أشياء، كلها إحصائية: تباين أطوال الجمل، وثراء المفردات، وتكرار العبارات النمطية الآلية، ومدى تكرار النص إجمالاً. ولا واحد منها سجلٌّ للمصدر. فالطالب الذي يكتب جملاً قصيرة متنوّعة ذات رأي ستنخفض نتيجته سواء استعان بنموذج أم لا؛ والطالب المدرَّب على الكتابة الرسمية سترتفع نتيجته سواء استعان أم لا. المقياس أسلوب، والأسلوب يرتبط بالتوليد ارتباطاً ناقصاً.",
        },
        {
          h: "أي طلابك سيُنذَرون ظلماً",
          p: "على نحو متوقّع: الكاتبون بلغة ثانية، والطلاب الذين يكتبون بمستوى لغوي ثابت، والذين استبطنوا قالباً صارماً، والدقيقون الذين يحرّرون حتى تصير كل جملة نظيفة. وهؤلاء غالباً أكثر طلابك ضميراً، وهم الأشدّ تضرّراً من الاتهام. فقبل أن تتصرّف بناءً على نتيجة، اسأل هل ينتمي الطالب لأي من هذه الفئات — لا لتلتمس له عذراً، بل لأن معدّل الإنذارات الخاطئة أعلى فيها فعلاً.",
        },
        {
          h: "المحادثة التي تنجح أكثر من النتيجة",
          p: "اسأل عن الحجّة لا عن النص. لماذا رتّبته هكذا؟ وما الذي كِدتَ تقوله بدلاً منه؟ وأي مرجع غيّر رأيك؟ الطالب الذي كتب النص يجيب فوراً وبتحديد، وغالباً بقصة عن فقرة حذفها. والذي لم يكتبه لا يستطيع عادةً، والفجوة تظهر خلال دقيقتين دون أن يُتَّهم أحد بشيء. هذا أبطأ من قراءة نسبة مئوية، وهو الأسلوب الوحيد الذي يصمد أمام التظلّم.",
        },
        {
          h: "صمّم التكليف حتى يقلّ أثر الكشف",
          p: "الجواب الأمتن ليس كشفاً أفضل بل تقييماً لا يُجيده النموذج: كتابة مرتبطة بنقاش الحلقة الدراسية، أو ببيانات لا يملكها إلا صفّك، أو بسياق محلي، أو بعملية مسودّة ومراجعة تراها بعينك. اطلب التعليل خلف الاختيار لا الاختيار. اشترط ببليوغرافيا مشروحة بجملة واحدة عن سبب إبقاء كل مرجع. لا شيء من هذا يمنع الذكاء الاصطناعي؛ لكنه يجعل مخرجاته غير المُراجَعة تبدو رقيقة بوضوح.",
        },
        {
          h: "اكتب السياسة قبل أن تحتاجها",
          p: "معظم النزاعات ليست حول هل استخدم الطالب ذكاءً اصطناعياً — بل حول هل كانت القاعدة واضحة. فحدّد ما يُعدّ استعانة وما يُعدّ تأليفاً، بأمثلة لا بمبادئ: «طلب حجج مضادّة مقبول، وتسليم نثر مولّد غير مقبول». وحدّد شكل الإفصاح وأين يُكتب. وحدّد ما يحدث عند تسليم مُنذَر، حتى يعرف الطلاب والزملاء أن النسبة تستدعي محادثة ولا تستدعي عقوبة بذاتها أبداً.",
        },
        {
          h: "لماذا ننشر الثقة إلى جانب النتيجة",
          p: "لأن النسبة المجرّدة تدعو تحديداً لسوء الاستخدام الموصوف أعلاه. فالنصوص القصيرة والمختلطة اللغة والمحرَّرة بكثافة كلها تُنتج نتائج غير مستقرة، والأداة التي تُخفي هذا التذبذب تُضلّل مستخدميها. تقاريرنا تعرض تقييم الثقة، والجمل الحاملة للإشارة، والمقاييس الأربعة تحتها — لترى هل يستند الرقم إلى شيء أم إلى لا شيء قبل أن تقرّر ماذا تفعل به.",
        },
      ],
      rules: [
        { when: "جاء تسليمٌ بنتيجة عالية", then: "لا تمسّ الدرجة. افتح محادثة عن الحجّة أولاً." },
        { when: "النص أقل من ٣٠٠ كلمة", then: "أهمل النتيجة. الإحصاءات غير موثوقة عند هذا الطول." },
        { when: "الطالب يكتب بلغة ثانية", then: "خفّض وزن النتيجة كثيراً. فمعدّل الإنذار الخاطئ موثّق أنه أعلى لهذه الفئة." },
        { when: "تحتاج نتيجة قابلة للدفاع", then: "اعتمد على أدلّة العملية — سجلّ النسخ، والمسودّات، وشرح شفهي — واستخدم النتيجة فقط كسبب لنظرك في الأمر." },
      ],
      faq: [
        { q: "هل أستطيع ترسيب طالب بناءً على نتيجة كاشف؟", a: "لا ينبغي، ومعظم السياسات المؤسسية تنصّ على ذلك صراحةً الآن. فالنتيجة تقدير أسلوبي احتمالي، وقرارات سوء السلوك الأكاديمي تتطلّب أدلّة على السلوك." },
        { q: "أي دقّة أفترضها؟", a: "افترض أنها مفيدة للفرز وغير موثوقة للحكم الفردي. وأي مزوّد يذكر رقم دقّة واحداً دون تحديد طول النص ولغته وعتبته فهو يذكر رقماً لا ينتقل إلى صفّك." },
        { q: "هل يعرف الطلاب كيف يتجاوزون الكواشف؟", a: "بعضهم يعرف، والطرق متداولة على نطاق واسع. وهذا حدّ حقيقي للمجال كله، وحجّة لصالح تصميم التقييم على حساب المراقبة." },
        { q: "هل يعمل مع التسليمات العربية؟", a: "نعم بأصالة، بقوائم عبارات وعتبات عربية بدل تطبيق نموذج إنجليزي على نص عربي." },
        { q: "هل أستطيع فحص صفّ كامل دفعة واحدة؟", a: "الخطط المدفوعة ترفع حدّ الكلمات لكل محاولة وتحفظ سجلّ فحوصك. ولا يوجد تكامل مع سجلّ الدرجات عن قصد — فالأداة وُضعت لتُنير قراءتك لا لتضع الدرجة عنك." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "research-papers",
    order: 3,
    related: [
      { href: "/blog/how-to-cite-ai-academic-work", en: "Citing and disclosing AI in academic work", ar: "توثيق الذكاء الاصطناعي في العمل الأكاديمي" },
      { href: "/blog/eeat-ai-assisted-content", en: "What credibility signals actually look like", ar: "كيف تبدو إشارات المصداقية فعلاً" },
      { href: "/blog/does-turnitin-detect-ai", en: "Does Turnitin detect AI writing?", ar: "هل يكشف Turnitin كتابة الذكاء الاصطناعي؟" },
    ],
    en: {
      h1: "AI Detector for Research Papers & Theses",
      metaTitle: "AI Detector for Research Papers — Check a Thesis Before Submission",
      metaDescription:
        "Long academic writing behaves differently under detection. Why methods sections score highest, what supervisors actually do with a flag, and how to disclose AI assistance in a thesis.",
      lede:
        "Long-form academic writing produces a specific and misleading pattern under detection: the sections you had the least freedom in score the highest. Methods, related work, and boilerplate framing are formulaic by disciplinary convention, so they read as machine-generated no matter who typed them — while your genuinely original discussion chapter usually scores lowest.",
      sections: [
        {
          h: "Why your methods section scores worst",
          p: "Because a methods section is supposed to be predictable. The field has agreed on how to describe a sampling procedure, and deviating from that phrasing makes the work harder to evaluate, not more original. The same applies to related-work summaries, ethics statements, and limitations paragraphs. A detector reading uniform sentence lengths and conventional vocabulary cannot tell disciplinary convention from generation — which means a whole-document percentage on a thesis is close to meaningless.",
        },
        {
          h: "Check by section, not by document",
          p: "Run the discussion, the introduction, and the methods separately, and compare them to each other rather than to an absolute threshold. What you are looking for is a section that scores far higher than your own baseline — because that is where your voice went missing, whether a model was involved or because you wrote it exhausted at 3am. Either way it is the section a reader will find flat, and it is the one worth rewriting.",
        },
        {
          h: "What a supervisor actually does with a flag",
          p: "In practice, almost never what students fear. A flagged chapter usually prompts a question in the next meeting — walk me through this argument, why this method, what did you rule out. Supervisors have been reading student writing for years and can hear a voice change without any tool. The score's real function is to make someone look; the assessment is still made by a person who knows your work, and that is the assessment you should prepare for.",
        },
        {
          h: "Disclosing AI assistance in a thesis",
          p: "Most institutions now expect a statement, and most accept assistance far more readily than students assume — language editing, translation, code debugging, literature triage are commonly permitted with disclosure. What is almost universally prohibited is generated text presented as your own analysis, and generated citations, which remain the fastest way to fail a viva. Write the disclosure in the acknowledgements or a dedicated statement, name the tool and what it did, and keep it specific.",
        },
        {
          h: "The citation problem is worse than the detection problem",
          p: "Language models fabricate references fluently: real authors, plausible titles, journals that exist, volume numbers that do not. Reviewers check them, and a fabricated citation is misconduct in a way that a high detector score is not. If a model touched your bibliography at any point, verify every entry against the actual database record before submission. This single check protects you more than any amount of stylistic rewriting.",
        },
        {
          h: "Second-language researchers and the fairness gap",
          p: "The great majority of published research is written in English by people whose first language is not English, and the same properties that make that writing careful — controlled vocabulary, conventional structures, heavy editing — raise detector scores. If your institution uses detection on theses, this is worth raising formally rather than individually. A policy that applies one threshold to all submissions is not applying one standard; it is applying a harsher one to second-language writers.",
        },
      ],
      rules: [
        { when: "Your whole thesis scores high", then: "Ignore it and re-run section by section. A document-level score on long academic writing is not informative." },
        { when: "One section scores far above your own baseline", then: "Rewrite it for voice regardless of cause — it is the section a reader will find flat." },
        { when: "A model helped with your bibliography", then: "Verify every reference against the actual record. Fabricated citations are misconduct; a high score is not." },
        { when: "You used AI for language editing", then: "Disclose it specifically. Editing assistance is permitted almost everywhere when declared and penalised in some places when hidden." },
      ],
      faq: [
        { q: "Do journals run AI detection on submissions?", a: "Practice varies widely and is changing quickly. Many publishers now require a disclosure statement rather than relying on detection, because detection on academic prose is unreliable for exactly the reasons above." },
        { q: "Will using Grammarly or a translator show up as AI?", a: "It can. Heavy rewriting tools normalise sentence structure, which is the same signal a detector reads. If your institution permits language support, say that you used it." },
        { q: "Is a literature review supposed to score high?", a: "Usually yes, and that is not evidence of anything. Summarising other people's work in conventional academic register is close to the most predictable prose a researcher writes." },
        { q: "Does this handle Arabic theses?", a: "Yes. Arabic is analysed with its own metrics rather than through an English model, which matters more in academic Arabic than in almost any other register." },
        { q: "How long can a single run be?", a: "The free tier covers 250 words per run, which suits section-by-section checking. Paid plans raise this substantially for full chapters." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي للأبحاث والرسائل",
      metaTitle: "كاشف الذكاء الاصطناعي للأبحاث — افحص رسالتك قبل التسليم",
      metaDescription:
        "الكتابة الأكاديمية الطويلة تتصرّف بشكل مختلف تحت الكشف. لماذا تحصل المنهجية على أعلى نتيجة، وماذا يفعل المشرف فعلاً، وكيف تُفصح عن الاستعانة في رسالتك.",
      lede:
        "تُنتج الكتابة الأكاديمية الطويلة نمطاً محدداً ومُضلِّلاً تحت الكشف: الأقسام التي كانت حرّيتك فيها أقلّ تحصل على أعلى نتيجة. فالمنهجية والدراسات السابقة والتأطير النمطي كلها قوالب بحكم عرف التخصّص، فتُقرأ كمولّدة أياً كان من كتبها — بينما فصل المناقشة الأصيل فعلاً يحصل عادةً على أدنى نتيجة.",
      sections: [
        {
          h: "لماذا تحصل المنهجية على أسوأ نتيجة",
          p: "لأن قسم المنهجية يُفترض أن يكون متوقّعاً. فالحقل اتّفق على كيفية وصف إجراء المعاينة، والخروج عن تلك الصياغة يجعل تقييم العمل أصعب لا أكثر أصالة. والأمر نفسه ينطبق على ملخّصات الدراسات السابقة، وبيانات أخلاقيات البحث، وفقرات حدود الدراسة. والكاشف الذي يقرأ أطوال جمل منتظمة ومفردات تقليدية لا يستطيع تمييز عُرف التخصّص من التوليد — ما يعني أن نسبة على مستوى الرسالة كاملةً تكاد تكون بلا معنى.",
        },
        {
          h: "افحص بالأقسام لا بالمستند",
          p: "شغّل المناقشة والمقدّمة والمنهجية منفصلة، وقارنها ببعضها لا بعتبة مطلقة. فما تبحث عنه قسم يحصل على نتيجة أعلى بكثير من خطّ أساسك أنت — لأن هذا هو الموضع الذي غاب فيه صوتك، سواء تدخّل نموذج أم كتبته منهكاً في الثالثة فجراً. وفي الحالتين هو القسم الذي سيجده القارئ مسطّحاً، وهو الذي يستحق إعادة الكتابة.",
        },
        {
          h: "ماذا يفعل المشرف فعلاً بإنذار",
          p: "عملياً، شبه أبداً ما يخشاه الطلاب. فالفصل المُنذَر يستدعي عادةً سؤالاً في اللقاء التالي: اشرح لي هذه الحجّة، ولماذا هذه المنهجية، وما الذي استبعدته. فالمشرفون يقرأون كتابة الطلاب منذ سنوات ويسمعون تغيّر الصوت بلا أي أداة. ووظيفة النتيجة الحقيقية أن تجعل أحدهم ينظر؛ أما التقييم فيظلّ من شخص يعرف عملك، وهو التقييم الذي ينبغي أن تستعدّ له.",
        },
        {
          h: "الإفصاح عن الاستعانة في الرسالة",
          p: "معظم المؤسسات تتوقّع بياناً الآن، ومعظمها يقبل الاستعانة أكثر بكثير مما يظنّ الطلاب — تحرير اللغة، والترجمة، وتنقيح الشيفرة، وفرز الأدبيات كلها مسموحة عادةً مع الإفصاح. والممنوع شبه عالمياً هو نصّ مولّد يُقدَّم كتحليلك أنت، والاستشهادات المولّدة التي تظلّ أسرع طريق للرسوب في المناقشة. اكتب الإفصاح في الشكر أو في بيان مخصّص، وسمِّ الأداة وما فعلته، وكن محدداً.",
        },
        {
          h: "مشكلة الاستشهادات أخطر من مشكلة الكشف",
          p: "النماذج اللغوية تختلق المراجع بطلاقة: مؤلّفون حقيقيون، وعناوين معقولة، ودوريات موجودة، وأرقام مجلّدات غير موجودة. والمحكّمون يتحقّقون، والاستشهاد المختلَق سوء سلوك بطريقة لا تكونها نتيجة كاشف عالية. فإن لمس نموذج ببليوغرافيتك في أي مرحلة، فتحقّق من كل مدخل مقابل سجلّ قاعدة البيانات الفعلي قبل التسليم. هذا الفحص وحده يحميك أكثر من أي قدر من إعادة الصياغة الأسلوبية.",
        },
        {
          h: "الباحثون بلغة ثانية وفجوة الإنصاف",
          p: "الغالبية العظمى من البحث المنشور يكتبها بالإنجليزية من ليست الإنجليزية لغتهم الأولى، والخصائص نفسها التي تجعل تلك الكتابة متحرّية — مفردات مضبوطة، وتراكيب تقليدية، وتحرير كثيف — ترفع نتائج الكاشف. فإن كانت مؤسستك تستخدم الكشف على الرسائل فهذا يستحق الطرح رسمياً لا فردياً. فالسياسة التي تطبّق عتبة واحدة على كل التسليمات لا تطبّق معياراً واحداً؛ بل تطبّق معياراً أقسى على الكاتبين بلغة ثانية.",
        },
      ],
      rules: [
        { when: "رسالتك كلها بنتيجة عالية", then: "تجاهلها وأعد الفحص قسماً قسماً. فالنتيجة على مستوى المستند في الكتابة الأكاديمية الطويلة غير مُخبرة." },
        { when: "قسم واحد أعلى بكثير من خطّ أساسك", then: "أعد كتابته بحثاً عن الصوت أياً كان السبب — فهو القسم الذي سيجده القارئ مسطّحاً." },
        { when: "ساعدك نموذج في الببليوغرافيا", then: "تحقّق من كل مرجع مقابل السجلّ الفعلي. فالاستشهادات المختلَقة سوء سلوك، والنتيجة العالية ليست كذلك." },
        { when: "استعنت بالذكاء الاصطناعي في تحرير اللغة", then: "أفصح عن ذلك تحديداً. فمساعدة التحرير مسموحة في معظم المواضع عند الإعلان، ومُعاقَبة في بعضها عند الإخفاء." },
      ],
      faq: [
        { q: "هل تُشغّل الدوريات كشف الذكاء الاصطناعي على التسليمات؟", a: "الممارسة متباينة جداً وتتغيّر بسرعة. وكثير من الناشرين يشترطون الآن بيان إفصاح بدل الاعتماد على الكشف، لأن الكشف على النثر الأكاديمي غير موثوق للأسباب أعلاه بالضبط." },
        { q: "هل يظهر استخدام Grammarly أو مترجم كذكاء اصطناعي؟", a: "قد يظهر. فأدوات إعادة الكتابة الكثيفة تُنمّط بنية الجملة، وهي الإشارة نفسها التي يقرأها الكاشف. فإن كانت مؤسستك تسمح بدعم اللغة فصرّح باستخدامه." },
        { q: "هل يُفترض أن تحصل مراجعة الأدبيات على نتيجة عالية؟", a: "عادةً نعم، وهذا ليس دليلاً على شيء. فتلخيص أعمال الآخرين بمستوى أكاديمي تقليدي يكاد يكون أكثر النثر قابليةً للتوقّع مما يكتبه الباحث." },
        { q: "هل يتعامل مع الرسائل العربية؟", a: "نعم. تُحلَّل العربية بمقاييسها الخاصة لا عبر نموذج إنجليزي، وهذا يهمّ في العربية الأكاديمية أكثر من أي مستوى آخر تقريباً." },
        { q: "ما أقصى طول للفحص الواحد؟", a: "الخطة المجانية تغطّي ٢٥٠ كلمة لكل محاولة، وهو ما يناسب الفحص قسماً قسماً. والخطط المدفوعة ترفع ذلك كثيراً للفصول الكاملة." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "seo-content",
    order: 4,
    related: [
      { href: "/blog/ai-content-seo-google", en: "Does Google penalise AI content?", ar: "هل يعاقب Google المحتوى الآلي؟" },
      { href: "/blog/eeat-ai-assisted-content", en: "E-E-A-T for AI-assisted content", ar: "معايير E-E-A-T للمحتوى المدعوم بالذكاء" },
      { href: "/blog/generative-engine-optimization-guide", en: "Getting cited by ChatGPT and AI search", ar: "كيف يستشهد ChatGPT بمحتواك" },
    ],
    en: {
      h1: "AI Detector for SEO & Blog Content",
      metaTitle: "AI Detector for SEO Content — What Actually Costs You Rankings",
      metaDescription:
        "Google does not penalise AI content for being AI. It demotes unhelpful content, and generated drafts fail in specific, fixable ways. What to check before you publish.",
      lede:
        "Google's position has been consistent and is widely misread: using AI is not itself a ranking problem. What gets demoted is content with no reason to exist — and unedited generated drafts fail that test in specific, diagnosable ways. A detector is useful here not as a compliance check but as a proxy for the flatness that makes a page forgettable.",
      sections: [
        {
          h: "What Google actually penalises",
          p: "Scaled content produced primarily to manipulate rankings, regardless of how it was made. A human writing forty thin pages a week is in the same category as a model writing them. The distinguishing question in every helpful-content assessment is whether the page adds something a reader could not get from the results already ranking. Generated drafts fail that by default, because a model's output is a summary of what already ranks — which is the definition of adding nothing.",
        },
        {
          h: "Why a high detector score predicts poor performance",
          p: "Not because of a penalty, but because the two measure overlapping things. A detector scores uniformity: even sentence lengths, conventional transitions, safe generic vocabulary. Readers experience that same uniformity as content that says nothing memorable, and they leave. The score is a cheap early signal for a problem that would otherwise only show up weeks later in engagement data — so treat a high score as a content review trigger, not a compliance failure.",
        },
        {
          h: "The three things generated drafts always lack",
          p: "First, a specific number, name, or date you can source — models hedge because they are uncertain, and hedged prose is unrankable for informational queries. Second, an opinion that could be disagreed with; balanced coverage of every side reads as authority to nobody. Third, first-hand detail: what actually happened when you tried the thing. Adding those three to a generated draft usually drops the detector score as a side effect, because they are exactly the material a model cannot produce.",
        },
        {
          h: "AI search reads differently from Google",
          p: "Generative engines cite passages, not pages. That changes what a well-optimised section looks like: each heading should be a question, and the first paragraph under it should answer that question completely without depending on anything above it. Content written as a flowing argument with 'as mentioned above' running through it gets cited far less, because no single extractable chunk stands alone. This is a structural fix, and it is largely independent of who or what wrote the prose.",
        },
        {
          h: "Disclosure, editorial process, and ad eligibility",
          p: "Ad programmes including AdSense do not prohibit AI-assisted content; they prohibit content with no added value and content generated at scale without human oversight. The practical difference is a visible editorial process: a named author, factual claims that can be sourced, an honest treatment of limitations. If your site publishes assisted content, the safest posture is not to hide it but to make the human contribution obvious enough that no reviewer has to guess.",
        },
        {
          h: "A workflow that survives review",
          p: "Draft the structure yourself, so the argument is yours. Let a model expand sections where the facts are settled. Then do three passes: verify every number against a real source and delete what you cannot verify; add one concrete example per section that only you could supply; and vary the sentence rhythm by reading it aloud. Check the score at the end — if it is still high after those passes, the piece has a substance problem, not a style problem.",
        },
      ],
      rules: [
        { when: "A draft scores high and has no sourced numbers", then: "It is thin. Add verifiable specifics before touching the phrasing." },
        { when: "A draft scores high but is dense with first-hand detail", then: "Fix the rhythm only. The substance is there; the sentences are just too even." },
        { when: "You publish assisted content", then: "Name an author, source your claims, and state limits honestly. That is what separates permitted assistance from no-value-add content." },
        { when: "You want AI engines to cite you", then: "Make each section answer its heading completely on its own. Extractability beats flow for citation." },
      ],
      faq: [
        { q: "Will Google know my content was AI-written?", a: "Google has said it focuses on content quality rather than production method, and detection at web scale is unreliable for the same reasons it is unreliable on a single essay. Optimise for usefulness, not for beating a classifier." },
        { q: "Does AI content get indexed?", a: "Yes, routinely. Indexing is not the bottleneck; ranking is, and thin content ranks poorly whoever wrote it." },
        { q: "Is AI content against AdSense policy?", a: "Not in itself. The policies that bite are no-value-add content and scaled generation without human oversight — which is a description of process, not of tooling." },
        { q: "Should I disclose AI assistance to readers?", a: "There is no universal requirement, but disclosure costs little and builds the trust signals that both readers and reviewers look for. Sites that hide it have more to lose if it becomes obvious." },
        { q: "Does this work for Arabic content?", a: "Yes, with Arabic-specific analysis. Arabic SEO is one of the least contested spaces on the web, and the quality bar to rank there is currently much lower than in English." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي لمحتوى السيو والمدوّنات",
      metaTitle: "كاشف الذكاء الاصطناعي لمحتوى السيو — ما الذي يكلّفك الترتيب فعلاً",
      metaDescription:
        "Google لا يعاقب المحتوى لأنه آلي. بل يخفض المحتوى غير المفيد، والمسودّات المولّدة تفشل بطرق محدّدة قابلة للإصلاح. ما الذي تفحصه قبل النشر.",
      lede:
        "موقف Google ثابت ويُساء فهمه كثيراً: استخدام الذكاء الاصطناعي ليس بذاته مشكلة ترتيب. المُخفَّض هو المحتوى الذي لا سبب لوجوده — والمسودّات المولّدة بلا تحرير ترسب في هذا الاختبار بطرق محدّدة قابلة للتشخيص. والكاشف مفيد هنا لا كفحص امتثال بل كمؤشّر بديل عن التسطّح الذي يجعل الصفحة منسيّة.",
      sections: [
        {
          h: "ما الذي يعاقبه Google فعلاً",
          p: "المحتوى المُنتَج بكثافة أساساً للتلاعب بالترتيب، أياً كانت طريقة صنعه. فمن يكتب أربعين صفحة رقيقة أسبوعياً بيده يقع في الفئة نفسها مع نموذج يكتبها. والسؤال الفاصل في كل تقييم للمحتوى المفيد هو: هل تضيف الصفحة شيئاً لا يجده القارئ في النتائج المُرتَّبة أصلاً؟ والمسودّات المولّدة ترسب في هذا افتراضياً، لأن مخرجات النموذج تلخيص لما هو مُرتَّب أصلاً — وهذا تعريف ألّا تضيف شيئاً.",
        },
        {
          h: "لماذا تتنبّأ النتيجة العالية بأداء ضعيف",
          p: "لا بسبب عقوبة، بل لأن الاثنين يقيسان أشياء متداخلة. فالكاشف يقيس الانتظام: أطوال جمل متساوية، وروابط تقليدية، ومفردات عامة آمنة. والقارئ يعيش الانتظام نفسه كمحتوى لا يقول شيئاً يُذكَر، فيغادر. والنتيجة إشارة مبكّرة رخيصة لمشكلة ما كانت لتظهر إلا بعد أسابيع في بيانات التفاعل — فعامِل النتيجة العالية كمحفّز لمراجعة المحتوى لا كإخفاق امتثال.",
        },
        {
          h: "ثلاثة أشياء تفتقدها المسودّات المولّدة دائماً",
          p: "أولاً: رقم أو اسم أو تاريخ محدد تستطيع إسناده — فالنماذج تتحوّط لأنها غير متيقّنة، والنثر المتحوّط غير قابل للترتيب في استعلامات المعرفة. ثانياً: رأي يمكن الاعتراض عليه؛ فالتغطية المتوازنة لكل الأطراف لا تُقرأ كسلطة عند أحد. ثالثاً: تفصيل من تجربة مباشرة: ما الذي حدث فعلاً حين جرّبت الأمر. وإضافة هذه الثلاثة لمسودّة مولّدة تخفض نتيجة الكاشف عادةً كأثر جانبي، لأنها بالضبط المادة التي لا يستطيع النموذج إنتاجها.",
        },
        {
          h: "البحث بالذكاء الاصطناعي يقرأ بشكل مختلف",
          p: "محرّكات التوليد تستشهد بمقاطع لا بصفحات. وهذا يغيّر شكل القسم المُحسَّن جيداً: كل عنوان ينبغي أن يكون سؤالاً، وأول فقرة تحته تجيب عن السؤال كاملاً دون اعتماد على شيء فوقها. أما المحتوى المكتوب كحجّة متدفّقة تتخلّلها «كما ذكرنا أعلاه» فيُستشهد به أقل بكثير، لأن لا مقطع مستخرَج واحد يقف وحده. وهذا إصلاح بنيوي، وهو مستقلّ إلى حدّ بعيد عمّن كتب النثر أو ما كتبه.",
        },
        {
          h: "الإفصاح والعملية التحريرية وأهلية الإعلانات",
          p: "برامج الإعلانات ومنها AdSense لا تمنع المحتوى المدعوم بالذكاء الاصطناعي؛ بل تمنع المحتوى بلا قيمة مضافة والمحتوى المُولَّد بكثافة بلا إشراف بشري. والفارق العملي عملية تحريرية مرئية: كاتب باسمه، وادعاءات واقعية قابلة للإسناد، ومعالجة صادقة للحدود. فإن كان موقعك ينشر محتوى مدعوماً فأسلم موقف ليس الإخفاء بل جعل الإسهام البشري واضحاً بما يكفي ألّا يحتاج مراجع للتخمين.",
        },
        {
          h: "سير عمل يصمد أمام المراجعة",
          p: "اكتب البنية بنفسك حتى تكون الحجّة حجّتك. ودع النموذج يوسّع الأقسام التي استقرّت وقائعها. ثم مرّ ثلاث مرات: تحقّق من كل رقم مقابل مصدر حقيقي واحذف ما لا تستطيع التحقّق منه؛ وأضف مثالاً ملموساً واحداً لكل قسم لا يستطيع غيرك تقديمه؛ ونوّع إيقاع الجمل بقراءتها بصوت عالٍ. ثم افحص النتيجة أخيراً — فإن بقيت عالية بعد هذه المرّات فالمشكلة في الجوهر لا في الأسلوب.",
        },
      ],
      rules: [
        { when: "مسودّة بنتيجة عالية وبلا أرقام مُسنَدة", then: "هي رقيقة. أضف تفاصيل قابلة للتحقّق قبل أن تمسّ الصياغة." },
        { when: "مسودّة بنتيجة عالية لكنها مكتظّة بتجربة مباشرة", then: "أصلح الإيقاع فقط. الجوهر موجود، والجمل متساوية أكثر من اللازم." },
        { when: "تنشر محتوى مدعوماً بالذكاء الاصطناعي", then: "سمِّ كاتباً، وأسنِد ادعاءاتك، واذكر الحدود بصدق. هذا ما يفصل الاستعانة المسموحة عن المحتوى بلا قيمة مضافة." },
        { when: "تريد أن تستشهد بك محرّكات الذكاء", then: "اجعل كل قسم يجيب عن عنوانه كاملاً وحده. فالقابلية للاستخراج تسبق التدفّق في الاستشهاد." },
      ],
      faq: [
        { q: "هل سيعرف Google أن محتواي مكتوب بالذكاء الاصطناعي؟", a: "قالت Google إنها تركّز على جودة المحتوى لا على طريقة إنتاجه، والكشف على نطاق الويب غير موثوق للأسباب نفسها التي تجعله غير موثوق على مقال واحد. حسِّن للفائدة لا لهزيمة مصنِّف." },
        { q: "هل يُفهرَس المحتوى المولّد؟", a: "نعم وباستمرار. فالفهرسة ليست عنق الزجاجة، بل الترتيب — والمحتوى الرقيق يُرتَّب ضعيفاً أياً كان كاتبه." },
        { q: "هل المحتوى المولّد مخالف لسياسة AdSense؟", a: "ليس بذاته. فالسياسات التي تعضّ هي المحتوى بلا قيمة مضافة والتوليد بكثافة بلا إشراف بشري — وهذا وصف لعملية لا لأداة." },
        { q: "هل أُفصح للقرّاء عن الاستعانة بالذكاء الاصطناعي؟", a: "لا يوجد شرط عالمي، لكن الإفصاح يكلّف قليلاً ويبني إشارات الثقة التي يبحث عنها القرّاء والمراجعون معاً. والمواقع التي تُخفيه تخسر أكثر إن انكشف." },
        { q: "هل يعمل مع المحتوى العربي؟", a: "نعم بتحليل عربي مخصّص. والسيو العربي من أقلّ المساحات تنافساً على الويب، وسقف الجودة المطلوب للترتيب فيه اليوم أدنى بكثير منه بالإنجليزية." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "cover-letters",
    order: 5,
    related: [
      { href: "/ai-humanizer", en: "Rewrite a flat draft into your own voice", ar: "أعد صياغة مسودّة مسطّحة بصوتك" },
      { href: "/blog/humanize-without-changing-meaning", en: "Humanising without changing meaning", ar: "التنسين دون تغيير المعنى" },
      { href: "/blog/chatgpt-writing-tells", en: "The tells that give AI text away", ar: "العلامات التي تفضح النص الآلي" },
    ],
    en: {
      h1: "AI Detector for Cover Letters & Applications",
      metaTitle: "AI Detector for Cover Letters — Why Yours Reads Like Everyone Else's",
      metaDescription:
        "Recruiters are not running detectors on most applications — they are noticing the sameness. What makes a generated cover letter obvious to a human reader, and how to fix it.",
      lede:
        "The risk with a generated cover letter is rarely a detector. It is that a recruiter reading forty applications recognises the fortieth version of the same letter, and the recognition is instant and fatal. What flags your letter to a human is exactly what a detector measures — so the score is a useful stand-in for a reaction you will never get to hear.",
      sections: [
        {
          h: "What recruiters actually notice",
          p: "Not vocabulary, but shape. Generated letters open by naming the role and expressing enthusiasm, spend a paragraph restating the job description back, offer three balanced competencies, and close by welcoming the opportunity to discuss further. It is a recognisable silhouette, and after a handful of applications a recruiter reads it as an absence of effort rather than as machine authorship. The judgement is about care, and it lands before anyone considers running a tool.",
        },
        {
          h: "The paragraph that saves a letter",
          p: "One specific thing about this employer that you could not have written about any other. Not their mission statement — something you actually noticed: a product decision, a case study, a change in their pricing, a paper someone there published. Two sentences on why it interested you and what you would want to work on is worth more than every competency claim in the letter, and it is the paragraph a model cannot write for you because it does not know what caught your attention.",
        },
        {
          h: "Where AI genuinely helps with applications",
          p: "Structure and triage, not prose. Ask a model to list what a job description is implicitly asking for, to point out which of your experiences map onto it, or to tell you which paragraph of your draft is weakest and why. Then write the letter yourself. The advantage of this order is that the thinking is externalised where it helps and the voice stays yours where it matters — and the resulting letter does not read like the other thirty-nine.",
        },
        {
          h: "Personal statements are a harder case",
          p: "Admissions essays and personal statements are read specifically for voice, and many institutions now state that generated statements will be rejected. The trap is that these are also the documents applicants feel least confident writing, so the temptation is highest exactly where the cost is highest. If you use a model at all here, use it to interrogate your draft — what is unclear, what is unsupported — and never to produce sentences you then submit.",
        },
        {
          h: "Second-language applicants and unfair flags",
          p: "If you are applying in English as a second language, your careful, correct, conventionally structured letter will score higher than a native speaker's sloppier one, and that is a real unfairness in how these tools behave. The practical response is not to add errors on purpose. It is to add specificity: concrete projects, named tools, real numbers, one genuine observation about the employer. Specificity reads as human in a way that grammar never does.",
        },
        {
          h: "What to check before you send",
          p: "Read the letter and ask whether any sentence in it could appear, unchanged, in an application to a different company. Delete every sentence where the answer is yes. What remains is usually short, and it is the only part that was ever doing any work. Run the detector last: if the score is still high after that deletion, the remaining prose is generic in rhythm rather than in content, and reading it aloud will show you where.",
        },
      ],
      rules: [
        { when: "A sentence would fit any employer", then: "Delete it. It is costing you attention and adding nothing." },
        { when: "You have no specific observation about the company", then: "Do not send yet. Find one — it is the single highest-value paragraph in the letter." },
        { when: "You wrote it yourself but it scores high", then: "Check the rhythm, not the content. Formal application register is naturally uniform." },
        { when: "You are writing a personal statement", then: "Do not submit generated sentences at all. These are read for voice, and many institutions reject on that basis." },
      ],
      faq: [
        { q: "Do employers run AI detectors on cover letters?", a: "A minority do, and screening practices vary widely. The far more common outcome is a human noticing sameness, which no detector score protects you from." },
        { q: "Is it wrong to use AI for a job application?", a: "Using it to structure your thinking or check your draft is ordinary tool use. Submitting generated prose as your own account of yourself is a different thing, and it tends to be transparent to experienced readers." },
        { q: "My letter is honest but scores 80%. Should I worry?", a: "About a detector, no. About the writing, maybe — formal application register scores high naturally, but so does a letter with nothing specific in it. Check which one you have." },
        { q: "Does the humanizer help here?", a: "It fixes rhythm, not substance. It will make a flat letter read more naturally; it cannot add the specific observation that makes the letter worth reading." },
        { q: "Does it support Arabic applications?", a: "Yes, with native Arabic analysis — useful for applications to Gulf and regional employers, where formal Arabic registers are especially uniform." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي لخطابات التوظيف والطلبات",
      metaTitle: "كاشف الذكاء الاصطناعي لخطابات التوظيف — لماذا يشبه خطابك خطاب الجميع",
      metaDescription:
        "المُوظِّفون لا يشغّلون كواشف على معظم الطلبات — بل يلاحظون التشابه. ما الذي يفضح خطاباً مولّداً أمام قارئ بشري، وكيف تصلحه.",
      lede:
        "الخطر في خطاب توظيف مولّد نادراً ما يكون كاشفاً. بل أن مسؤول التوظيف الذي يقرأ أربعين طلباً يتعرّف على النسخة الأربعين من الخطاب نفسه، والتعرّف فوري وقاتل. وما يفضح خطابك أمام إنسان هو بالضبط ما يقيسه الكاشف — فالنتيجة بديل مفيد عن ردّ فعل لن تسمعه أبداً.",
      sections: [
        {
          h: "ما الذي يلاحظه مسؤولو التوظيف فعلاً",
          p: "ليست المفردات بل الشكل. فالخطابات المولّدة تفتتح بذكر المسمّى الوظيفي وإبداء الحماس، ثم تقضي فقرة في إعادة سرد الوصف الوظيفي، ثم تعرض ثلاث كفاءات متوازنة، ثم تختم بالترحيب بفرصة النقاش. إنه ظِلّ مألوف، وبعد حفنة طلبات يقرأه المُوظِّف كغياب جهد لا كتأليف آلي. فالحكم عن العناية، وهو يقع قبل أن يفكّر أحد في تشغيل أداة.",
        },
        {
          h: "الفقرة التي تُنقذ الخطاب",
          p: "شيء واحد محدد عن جهة العمل هذه ما كنت لتكتبه عن غيرها. لا بيان رسالتها — بل شيء لاحظته فعلاً: قرار في منتج، أو دراسة حالة، أو تغيّر في تسعيرها، أو ورقة نشرها أحدهم عندها. جملتان عن سبب اهتمامك وما تودّ العمل عليه أثمن من كل ادعاءات الكفاءة في الخطاب، وهي الفقرة التي لا يستطيع نموذج كتابتها لك لأنه لا يعرف ما الذي لفت انتباهك.",
        },
        {
          h: "أين يساعد الذكاء الاصطناعي فعلاً في الطلبات",
          p: "في البنية والفرز لا في النثر. اطلب من نموذج أن يعدّد ما يطلبه الوصف الوظيفي ضمناً، أو أن يشير إلى أي من خبراتك يقابله، أو أن يخبرك أي فقرة في مسودّتك أضعف ولماذا. ثم اكتب الخطاب بنفسك. وميزة هذا الترتيب أن التفكير يخرج للخارج حيث ينفع، ويبقى الصوت لك حيث يهمّ — والخطاب الناتج لا يشبه التسعة والثلاثين الآخرين.",
        },
        {
          h: "بيانات الالتحاق حالة أصعب",
          p: "مقالات القبول والبيانات الشخصية تُقرأ خصيصاً بحثاً عن الصوت، وكثير من المؤسسات تنصّ الآن على رفض البيانات المولّدة. والفخّ أن هذه أيضاً أكثر المستندات التي يشعر المتقدّم بضعف ثقته في كتابتها، فيكون الإغراء أعلى تحديداً حيث الكلفة أعلى. فإن استعنت بنموذج هنا أصلاً فاستعن به لاستجواب مسودّتك — ما الغامض، وما غير المدعوم — لا لإنتاج جمل تسلّمها.",
        },
        {
          h: "المتقدّمون بلغة ثانية والإنذارات الظالمة",
          p: "إن كنت تتقدّم بالإنجليزية كلغة ثانية فخطابك المتحرّي الصحيح المرتّب تقليدياً سيحصل على نتيجة أعلى من خطاب أقلّ إتقاناً لناطق أصلي، وهذا ظلم حقيقي في سلوك هذه الأدوات. والردّ العملي ليس إضافة أخطاء عمداً، بل إضافة تحديد: مشاريع ملموسة، وأدوات بأسمائها، وأرقام حقيقية، وملاحظة صادقة واحدة عن جهة العمل. فالتحديد يُقرأ كبشري بطريقة لا تفعلها القواعد أبداً.",
        },
        {
          h: "ما تفحصه قبل الإرسال",
          p: "اقرأ الخطاب واسأل: هل توجد فيه جملة تصلح كما هي لطلب في شركة أخرى؟ احذف كل جملة جوابها نعم. وما يتبقّى قصير عادةً، وهو الجزء الوحيد الذي كان يعمل أصلاً. وشغّل الكاشف أخيراً: فإن بقيت النتيجة عالية بعد الحذف فالنثر المتبقّي عام في إيقاعه لا في مضمونه، وقراءته بصوت عالٍ ستريك أين.",
        },
      ],
      rules: [
        { when: "جملة تصلح لأي جهة عمل", then: "احذفها. هي تكلّفك انتباهاً ولا تضيف شيئاً." },
        { when: "ليس لديك ملاحظة محددة عن الشركة", then: "لا ترسل بعد. اعثر على واحدة — هي أثمن فقرة في الخطاب." },
        { when: "كتبته بنفسك وجاءت النتيجة عالية", then: "افحص الإيقاع لا المضمون. فمستوى الخطابات الرسمية منتظم بطبعه." },
        { when: "تكتب بياناً شخصياً للقبول", then: "لا تسلّم جملاً مولّدة إطلاقاً. فهذه تُقرأ بحثاً عن الصوت، وكثير من المؤسسات ترفض على هذا الأساس." },
      ],
      faq: [
        { q: "هل يشغّل أصحاب العمل كواشف على خطابات التوظيف؟", a: "أقلّية تفعل، وممارسات الفرز متباينة جداً. والنتيجة الأشيع بكثير أن يلاحظ إنسان التشابه، وهذا ما لا تحميك منه أي نتيجة كاشف." },
        { q: "هل من الخطأ استخدام الذكاء الاصطناعي في طلب وظيفة؟", a: "استخدامه لترتيب تفكيرك أو مراجعة مسودّتك استعمال عادي لأداة. أما تسليم نثر مولّد كحديثك أنت عن نفسك فشيء آخر، ويميل لأن يكون شفّافاً أمام القرّاء المتمرّسين." },
        { q: "خطابي صادق لكن نتيجته ٨٠٪. هل أقلق؟", a: "من الكاشف لا. ومن الكتابة ربما — فمستوى الخطابات الرسمية يحصل على نتيجة عالية بطبعه، وكذلك الخطاب الخالي من أي تحديد. افحص أيّهما لديك." },
        { q: "هل يساعد المُنسّن هنا؟", a: "يصلح الإيقاع لا الجوهر. سيجعل خطاباً مسطّحاً يُقرأ أكثر طبيعية؛ لكنه لا يستطيع إضافة الملاحظة المحددة التي تجعل الخطاب يستحق القراءة." },
        { q: "هل يدعم الطلبات بالعربية؟", a: "نعم بتحليل عربي أصيل — ومفيد للطلبات لجهات العمل الخليجية والإقليمية، حيث المستويات العربية الرسمية منتظمة بوجه خاص." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "freelance-writers",
    order: 6,
    related: [
      { href: "/blog/humanizer-vs-paraphrasing-tool", en: "Humanizer vs paraphrasing tool", ar: "المُنسّن مقابل أداة إعادة الصياغة" },
      { href: "/blog/responsible-pre-submission-checklist", en: "A pre-delivery checklist", ar: "قائمة تحقّق قبل التسليم" },
      { href: "/blog/ai-writing-policy-for-teams", en: "Writing an AI policy for a team", ar: "كتابة سياسة ذكاء اصطناعي لفريق" },
    ],
    en: {
      h1: "AI Detector for Freelance Writers",
      metaTitle: "AI Detector for Freelancers — Deliver Work That Passes Client Checks",
      metaDescription:
        "Clients increasingly run detectors on delivered copy, and a false positive can cost you the contract. How to check before delivery, and what to put in the contract instead.",
      lede:
        "For a freelancer the detector problem is commercial, not academic: a client runs a tool on your delivery, gets a number, and asks for a refund. You cannot control which tool they use or where they set the threshold, so the defence is not a low score — it is checking before you deliver and agreeing in writing what a score is allowed to mean.",
      sections: [
        {
          h: "Why clients get results you did not",
          p: "Because there is no shared standard. Different tools use different models, different thresholds, and different minimum lengths, so the same article can read as 12% on one and 74% on another. Clients also often paste a fragment rather than the whole piece, and short excerpts produce the least stable results of all. When a client reports a number, the first useful question is which tool and how much text — the answer frequently resolves the dispute on its own.",
        },
        {
          h: "Put it in the contract before it happens",
          p: "One clause solves most of this: state that automated detection scores are not accepted as sole grounds for rejection, and name what is — factual errors, brief deviation, missed deadlines, plagiarism against a real source. Add that you will address specific flagged passages on request. Clients rarely object, because the clause is reasonable and because it signals you have thought about the problem. Raising it after a dispute starts is far weaker than having it there from the beginning.",
        },
        {
          h: "Check before delivery, not after",
          p: "Run the piece before it leaves your hands and read the highlighted sentences. If several sections are flat, that is worth fixing on its own merits — clients who cannot articulate why copy feels generic still feel it, and it costs you repeat work. If the score is high and the writing is genuinely dense with specifics, note that in your delivery message with a line about second-language or technical register, so the context arrives before the accusation does.",
        },
        {
          h: "Non-native writers carry a business cost here",
          p: "The higher false-positive rate for second-language writers is a documented technical problem, but for a freelancer it is an income problem. Careful, conventionally correct English scores higher than looser native writing, which means the market penalty falls hardest on exactly the writers already competing on price. The practical mitigations are the contract clause above, a delivery note that pre-empts the question, and building specificity into the copy so a human reader has something to point at.",
        },
        {
          h: "If you do use AI in your workflow",
          p: "Say so at the outset, in the terms you quote against. A large share of clients are fine with assisted drafting and specific about what they want reviewed by a human; a smaller share prohibit it outright. Finding out which kind of client you have before the first invoice costs one sentence in your proposal, and it converts the most common freelance dispute in this category into a non-event. Undisclosed assistance discovered later is what actually ends relationships.",
        },
        {
          h: "What to do when a client flags a delivery",
          p: "Ask for the tool, the threshold, and the exact text they ran. Then offer something a detector cannot: your outline, your notes, the sources you worked from, and a walkthrough of why the piece is structured the way it is. Offer to revise the specific passages they find weak. This reframes the conversation from an accusation you cannot disprove to a revision request you can satisfy — which is the outcome you want commercially, whoever was right.",
        },
      ],
      rules: [
        { when: "You are quoting a new client", then: "State your AI policy in the proposal. One sentence now prevents the most common dispute later." },
        { when: "A client reports a high score", then: "Ask which tool, which threshold, and how much text they ran. Fragments and short excerpts produce unreliable results." },
        { when: "Your own check comes back high", then: "Fix the flattest passages before delivery and mention the register in your delivery note." },
        { when: "You write in English as a second language", then: "Get the detection clause into the contract. The false-positive risk is higher for you and the cost is financial." },
      ],
      faq: [
        { q: "Can a client refuse payment over a detector score?", a: "It depends entirely on your contract. With no clause, you are arguing about an unfalsifiable number; with one, you are arguing about defined deliverables. This is why the clause matters more than the score." },
        { q: "Which detector do clients use?", a: "There is no standard, and results vary widely between tools. Assume a client may use one you have never checked against, which is why process evidence beats chasing a low score anywhere." },
        { q: "Should I tell clients I use AI?", a: "If you use it in the work, yes, upfront. Disclosed assistance is a negotiation; undisclosed assistance discovered later is a breach of trust, and that is what ends contracts." },
        { q: "Does the humanizer make delivered copy safe?", a: "No tool can promise that, and any that does is overselling. It reduces the mechanical rhythm that drives scores up; it cannot guarantee another vendor's threshold." },
        { q: "Does it work for Arabic copywriting?", a: "Yes, with native Arabic analysis — relevant if you write for regional clients who check Arabic copy with English-trained tools that misread it." },
      ],
    },
    ar: {
      h1: "كاشف الذكاء الاصطناعي للكتّاب المستقلّين",
      metaTitle: "كاشف الذكاء الاصطناعي للمستقلّين — سلّم عملاً يجتاز فحص العميل",
      metaDescription:
        "العملاء يشغّلون الكواشف على النصوص المسلَّمة أكثر فأكثر، والإنذار الخاطئ قد يكلّفك العقد. كيف تفحص قبل التسليم، وماذا تضع في العقد بدلاً من ذلك.",
      lede:
        "مشكلة الكاشف عند المستقلّ تجارية لا أكاديمية: يشغّل العميل أداة على تسليمك، فيحصل على رقم، فيطلب استرداداً. وأنت لا تتحكّم في الأداة التي يستخدمها ولا في العتبة التي يضعها، فالدفاع ليس نتيجة منخفضة — بل الفحص قبل التسليم والاتفاق كتابةً على ما يُسمح للنتيجة أن تعنيه.",
      sections: [
        {
          h: "لماذا يحصل العميل على نتيجة غير نتيجتك",
          p: "لأنه لا يوجد معيار مشترك. فالأدوات المختلفة تستخدم نماذج وعتبات وحدوداً دنيا للطول مختلفة، فالمقال نفسه قد يُقرأ ١٢٪ في واحدة و٧٤٪ في أخرى. والعملاء أيضاً كثيراً ما يلصقون مقتطفاً لا النص كاملاً، والمقتطفات القصيرة تُنتج أقلّ النتائج استقراراً على الإطلاق. فحين يبلّغك عميل برقم، فأول سؤال مفيد: أي أداة وكم نصاً — والجواب يحسم النزاع وحده كثيراً.",
        },
        {
          h: "ضعها في العقد قبل أن تقع",
          p: "بند واحد يحلّ معظم هذا: انصّ على أن نتائج الكشف الآلي لا تُقبل كسبب وحيد للرفض، وسمِّ ما يُقبل — أخطاء واقعية، وخروج عن الموجز، وتأخّر عن المواعيد، واستلال من مصدر حقيقي. وأضف أنك ستعالج المقاطع المُنذَرة تحديداً عند الطلب. ونادراً ما يعترض العملاء، لأن البند معقول ولأنه يشير إلى أنك فكّرت في المسألة. وطرحه بعد بدء النزاع أضعف بكثير من وجوده منذ البداية.",
        },
        {
          h: "افحص قبل التسليم لا بعده",
          p: "شغّل النص قبل أن يغادر يدك واقرأ الجمل المميّزة. فإن كانت عدّة أقسام مسطّحة فهذا يستحق الإصلاح لذاته — فالعميل الذي لا يستطيع صياغة سبب شعوره بعموميّة النص يظلّ يشعر به، وهذا يكلّفك تكرار العمل. وإن كانت النتيجة عالية والكتابة مكتظّة فعلاً بالتفاصيل، فاذكر ذلك في رسالة التسليم بسطر عن اللغة الثانية أو المستوى التقني، حتى يصل السياق قبل أن يصل الاتهام.",
        },
        {
          h: "الكاتبون غير الناطقين يدفعون كلفة تجارية هنا",
          p: "ارتفاع معدّل الإنذار الخاطئ للكاتبين بلغة ثانية مشكلة تقنية موثّقة، لكنه عند المستقلّ مشكلة دخل. فالإنجليزية المتحرّية الصحيحة تقليدياً تحصل على نتيجة أعلى من كتابة ناطق أصلي أكثر تسيّباً، ما يعني أن غرامة السوق تقع أثقل على الكتّاب الذين ينافسون على السعر أصلاً. والتخفيفات العملية هي بند العقد أعلاه، وملاحظة تسليم تستبق السؤال، وبناء التحديد داخل النص ليجد القارئ البشري شيئاً يشير إليه.",
        },
        {
          h: "إن كنت تستخدم الذكاء الاصطناعي في سير عملك",
          p: "قل ذلك من البداية، في الشروط التي تسعّر عليها. فحصّة كبيرة من العملاء لا يمانعون المسودّات المدعومة ويحدّدون ما يريدون مراجعته بشرياً؛ وحصّة أصغر تمنعه تماماً. ومعرفة أي نوع من العملاء لديك قبل الفاتورة الأولى تكلّف جملة واحدة في عرضك، وتحوّل أشيع نزاع للمستقلّين في هذا الباب إلى لا حدث. أما الاستعانة غير المُفصَح عنها التي تُكتشَف لاحقاً فهي ما يُنهي العلاقات فعلاً.",
        },
        {
          h: "ماذا تفعل حين يُنذر العميل تسليماً",
          p: "اطلب اسم الأداة والعتبة والنص الذي شغّله بالضبط. ثم اعرض ما لا يستطيع كاشف تقديمه: مخطّطك، وملاحظاتك، ومصادرك، وشرحاً لسبب بناء النص على هذا النحو. واعرض تعديل المقاطع التي يراها ضعيفة. هذا يعيد تأطير المحادثة من اتهام لا تستطيع دحضه إلى طلب تعديل تستطيع تلبيته — وهي النتيجة التي تريدها تجارياً، أياً كان المُحقّ.",
        },
      ],
      rules: [
        { when: "تسعّر لعميل جديد", then: "اذكر سياستك تجاه الذكاء الاصطناعي في العرض. جملة الآن تمنع أشيع نزاع لاحقاً." },
        { when: "أبلغك عميل بنتيجة عالية", then: "اسأل عن الأداة والعتبة وكمية النص المُشغَّل. فالمقتطفات القصيرة تُنتج نتائج غير موثوقة." },
        { when: "فحصك أنت جاء عالياً", then: "أصلح أكثر المقاطع تسطّحاً قبل التسليم، واذكر المستوى اللغوي في ملاحظة التسليم." },
        { when: "تكتب بالإنجليزية كلغة ثانية", then: "أدخل بند الكشف في العقد. فخطر الإنذار الخاطئ أعلى عندك والكلفة مالية." },
      ],
      faq: [
        { q: "هل يستطيع عميل رفض الدفع بسبب نتيجة كاشف؟", a: "يعتمد كلياً على عقدك. فبلا بند تكون تجادل حول رقم غير قابل للتكذيب؛ ومع بند تجادل حول مُخرجات محدّدة. ولهذا فالبند أهمّ من النتيجة." },
        { q: "أي كاشف يستخدم العملاء؟", a: "لا يوجد معيار، والنتائج متباينة جداً بين الأدوات. فافترض أن العميل قد يستخدم أداة لم تفحص عليها قط، ولهذا فأدلّة العملية تسبق مطاردة نتيجة منخفضة في أي مكان." },
        { q: "هل أخبر العملاء أني أستخدم الذكاء الاصطناعي؟", a: "إن كنت تستخدمه في العمل فنعم، ومقدّماً. فالاستعانة المُفصَح عنها تفاوض؛ وغير المُفصَح عنها إن اكتُشفت لاحقاً خيانة ثقة، وهي ما يُنهي العقود." },
        { q: "هل يجعل المُنسّن النص المسلَّم آمناً؟", a: "لا أداة تستطيع الوعد بذلك، ومن يعد به يبالغ في البيع. هو يخفّض الإيقاع الآلي الذي يرفع النتائج؛ ولا يضمن عتبة مزوّد آخر." },
        { q: "هل يعمل مع كتابة المحتوى العربي؟", a: "نعم بتحليل عربي أصيل — ويهمّ إن كنت تكتب لعملاء إقليميين يفحصون النص العربي بأدوات مدرَّبة على الإنجليزية تُسيء قراءته." },
      ],
    },
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export const useCaseSlugs = useCases.map((u) => u.slug);
