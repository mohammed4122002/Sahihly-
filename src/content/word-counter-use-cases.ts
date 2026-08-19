/**
 * Use-case landing pages for the word counter.
 *
 * A word count is only ever a means to clearing someone else's limit, and
 * whose limit it is changes everything that matters: what counts toward it,
 * how strictly it's enforced, and what happens if you miss it. A student
 * ignoring a footnote and a novelist targeting a genre convention are not
 * the same problem wearing a different noun — they have different numbers,
 * different sources of authority, and different failure modes. Five pages,
 * five sets of numbers that are actually true for that reader.
 */

import type { UseCase, UseCaseCopy } from "./use-cases";

export type { UseCase, UseCaseCopy };

export const wordCounterUseCases: UseCase[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "students",
    order: 1,
    related: [
      { href: "/blog/responsible-pre-submission-checklist", en: "A pre-submission checklist", ar: "قائمة تحقّق قبل التسليم" },
      { href: "/ai-detector/students", en: "Check your essay before you submit", ar: "افحص بحثك قبل التسليم" },
      { href: "/readability-checker/students", en: "Is your essay too dense to read?", ar: "هل بحثك كثيف أكثر من اللازم؟" },
    ],
    en: {
      h1: "Word Counter for Student Essays",
      metaTitle: "Word Counter for Essays — What Actually Counts Toward the Limit",
      metaDescription:
        "\"1,500 words\" means something different to your professor than it does to a generic counter. What's usually excluded, how much over or under is actually safe, and what to cut first.",
      lede:
        "The number your word processor shows and the number your assignment brief means by \"1,500 words\" are not automatically the same thing. Most academic word limits exclude the title, references, footnotes, and appendices — and whether yours does is written in your assignment brief, not decided by any counter, including this one.",
      sections: [
        {
          h: "What a word limit usually does and doesn't include",
          p: "Convention, not law: titles, reference lists, footnotes, and appendices are typically excluded from a stated limit, while in-text citations, headings, and figure captions usually count. \"Typically\" is doing real work in that sentence — some departments count everything, some exclude block quotes, and the only source that settles it for your assignment is the brief itself or a direct question to whoever set it.",
        },
        {
          h: "How much over or under is actually safe",
          p: "The unwritten convention at most universities is a 10% tolerance in either direction — a 2,000-word cap usually survives at 2,150, and a 1,800-word submission against the same cap usually doesn't trigger a penalty either. That is a convention, not a guarantee: some markers apply it strictly, some ignore it entirely and stop reading at the limit, which is worse than any word-count penalty. Ask if you're not sure, especially for anything long enough that overshooting matters.",
        },
        {
          h: "What to cut first when you're over",
          p: "Not your evidence — your throat-clearing. The paragraph that restates the question before answering it, the sentence that previews what you're about to argue instead of just arguing it, the transition that adds nothing: these are the highest-value cuts because removing them tightens the argument as a side effect. Cutting evidence or examples to hit a number makes the essay worse and shorter; cutting filler makes it better and shorter.",
        },
        {
          h: "What to add first when you're under",
          p: "Being under a limit is almost always a sign the argument needs another layer, not more words padded into the existing one. A counter-argument you haven't addressed, a specific example where you asserted something in general terms, one more source that complicates your point — these add real length because they add real content. Padding with adjectives and longer sentences is detectable to any marker who has read more than one essay.",
        },
        {
          h: "Why your count might not match your professor's",
          p: "Different tools count hyphenated words, numerals, and headers differently, and a PDF export can silently merge or split words depending on formatting. If a hard limit genuinely matters — a competitive scholarship essay, a journal submission — count in the exact format you're submitting, not in a draft document, and confirm against whatever tool your institution's submission portal itself uses if that's disclosed anywhere.",
        },
      ],
      rules: [
        { when: "Your brief doesn't say what's excluded", then: "Ask directly rather than assume. \"Does the word count include references and footnotes?\" is a normal, expected question." },
        { when: "You're up to 10% over a stated limit", then: "This is usually within tolerance, but check your specific department's policy — some enforce it strictly." },
        { when: "You need to cut words", then: "Remove throat-clearing and restated transitions first. Never cut evidence or examples to hit a number." },
        { when: "You're under the limit with time to spare", then: "Add a counter-argument or a specific example, not longer sentences. Padding is obvious to anyone who reads essays regularly." },
      ],
      faq: [
        { q: "Does the word count include my bibliography?", a: "Usually not, but this varies by institution and is stated in your assignment brief. If it isn't stated, ask — don't assume either way." },
        { q: "Will I be penalised for going 5% over?", a: "Most institutions have an informal tolerance around 10%, but enforcement varies by marker and department. Check your specific course handbook rather than relying on a general rule." },
        { q: "Does this counter match what my university's submission system shows?", a: "It should be very close, since both count on whitespace-separated words, but formatting differences (headers, hyphenation, footnotes) can shift the number slightly. For a hard limit, verify against your actual submission portal if possible." },
        { q: "Should I count in Arabic the same way as English?", a: "The word-splitting logic is the same, but Arabic typically needs noticeably fewer words to express the same idea — worth knowing if you're translating a brief written for an English-length target." },
        { q: "Is my essay private when I paste it here?", a: "Yes. Counting runs entirely in your browser — nothing is uploaded or stored, so pasting an unsubmitted draft is safe." },
      ],
    },
    ar: {
      h1: "عدّاد الكلمات لأبحاث الطلاب",
      metaTitle: "عدّاد الكلمات للأبحاث — ما الذي يُحسب فعلاً ضمن الحدّ",
      metaDescription:
        "«١٥٠٠ كلمة» تعني شيئاً مختلفاً عند أستاذك عمّا يعنيه عدّاد عام. ما يُستبعد عادةً، وكم الزيادة أو النقص الآمن فعلاً، وماذا تحذف أولاً.",
      lede:
        "الرقم الذي يعرضه معالج نصوصك والرقم الذي يعنيه توصيف واجبك بـ«١٥٠٠ كلمة» ليسا الشيء نفسه تلقائياً. فحدود الكلمات الأكاديمية عادةً تستبعد العنوان وقائمة المراجع والحواشي والملاحق — وهل حدّك كذلك مكتوب في توصيف واجبك، لا يقرّره أي عدّاد، بما فيه هذا.",
      sections: [
        {
          h: "ما يتضمّنه حدّ الكلمات عادةً وما لا يتضمّنه",
          p: "عرف لا قانون: العناوين وقوائم المراجع والحواشي والملاحق تُستبعد عادةً من الحدّ المذكور، بينما الاستشهادات داخل النص والعناوين الفرعية وتسميات الأشكال تُحسب عادةً. و«عادةً» تحمل ثقلاً حقيقياً في هذه الجملة — بعض الأقسام تحسب كل شيء، وبعضها يستبعد الاقتباسات الطويلة، والمصدر الوحيد الذي يحسم الأمر لواجبك هو التوصيف نفسه أو سؤال مباشر لمن وضعه.",
        },
        {
          h: "كم الزيادة أو النقص الآمن فعلاً",
          p: "العرف غير المكتوب في معظم الجامعات هامش ١٠٪ في أي اتجاه — حدّ ٢٠٠٠ كلمة عادةً ينجو عند ٢١٥٠، وتسليم ٢٠٠ ١ كلمة مقابل الحدّ نفسه عادةً لا يُثير عقوبة أيضاً. هذا عرف لا ضمان: بعض المُصحّحين يطبّقونه بصرامة، وبعضهم يتجاهله تماماً ويتوقّف عن القراءة عند الحدّ، وهذا أسوأ من أي عقوبة عدّ كلمات. اسأل إن لم تكن متأكداً، خصوصاً لأي شيء طويل بما يكفي ليهمّ فيه التجاوز.",
        },
        {
          h: "ماذا تحذف أولاً حين تكون فوق الحدّ",
          p: "ليس دليلك — بل تنحنحك. الفقرة التي تعيد صياغة السؤال قبل الإجابة، والجملة التي تُقدّم ما ستحتجّ به بدل الاحتجاج به مباشرة، والرابط الذي لا يضيف شيئاً — هذه أعلى الحذوفات قيمة لأن إزالتها تُحكِم الحجّة كأثر جانبي. حذف الدليل أو الأمثلة لبلوغ رقم يجعل البحث أسوأ وأقصر؛ وحذف الحشو يجعله أفضل وأقصر.",
        },
        {
          h: "ماذا تضيف أولاً حين تكون تحت الحدّ",
          p: "كونك تحت الحدّ علامة شبه أكيدة على أن الحجّة تحتاج طبقة أخرى، لا كلمات مُحشوّة في الطبقة الموجودة. حجّة مضادّة لم تعالجها، أو مثال محدد حيث ادّعيت شيئاً بعمومية، أو مصدر إضافي يعقّد نقطتك — هذه تضيف طولاً حقيقياً لأنها تضيف مضموناً حقيقياً. والحشو بالصفات والجمل الأطول يكتشفه أي مُصحّح قرأ أكثر من بحث واحد.",
        },
        {
          h: "لماذا قد لا يطابق عدّك عدّ أستاذك",
          p: "الأدوات المختلفة تتعامل مع الكلمات الموصولة بشَرطة والأرقام والعناوين بطرق مختلفة، وتصدير PDF قد يدمج أو يفصل كلمات بصمت حسب التنسيق. فإن كان الحدّ الصارم يهمّ فعلاً — مقال منحة تنافسية، تسليم مجلّة — فعُدّ في الصيغة الدقيقة التي ستُسلِّمها لا في مسودّة، وتحقّق مقابل الأداة التي تستخدمها بوّابة التسليم في مؤسستك إن أُعلنت في أي مكان.",
        },
      ],
      rules: [
        { when: "توصيفك لا يذكر ما يُستبعد", then: "اسأل مباشرة بدل الافتراض. «هل يشمل عدد الكلمات المراجع والحواشي؟» سؤال عادي ومتوقّع." },
        { when: "أنت حتى ١٠٪ فوق الحدّ المذكور", then: "هذا عادةً ضمن الهامش المسموح، لكن راجع سياسة قسمك تحديداً — بعضها يطبّق بصرامة." },
        { when: "تحتاج حذف كلمات", then: "احذف التنحنح والروابط المُعادة الصياغة أولاً. لا تحذف الدليل أو الأمثلة أبداً لبلوغ رقم." },
        { when: "أنت تحت الحدّ ولديك وقت", then: "أضف حجّة مضادّة أو مثالاً محدداً، لا جملاً أطول. الحشو واضح لأي من يقرأ الأبحاث بانتظام." },
      ],
      faq: [
        { q: "هل يشمل عدد الكلمات قائمة مراجعي؟", a: "عادةً لا، لكن هذا يختلف بين المؤسسات ومذكور في توصيف واجبك. إن لم يُذكر، اسأل — لا تفترض في أي اتجاه." },
        { q: "هل سأُعاقب إن تجاوزت ٥٪؟", a: "معظم المؤسسات لديها هامش غير رسمي حول ١٠٪، لكن التطبيق يختلف حسب المُصحّح والقسم. راجع دليل مقرّرك تحديداً بدل الاعتماد على قاعدة عامة." },
        { q: "هل يطابق هذا العدّاد ما يعرضه نظام تسليم جامعتي؟", a: "ينبغي أن يكون قريباً جداً، لأن كليهما يعدّ بالفصل على المسافات، لكن فروق التنسيق (العناوين، الوصل بشَرطة، الحواشي) قد تُزيح الرقم قليلاً. للحدّ الصارم، تحقّق مقابل بوّابة تسليمك الفعلية إن أمكن." },
        { q: "هل أعدّ العربية بالطريقة نفسها للإنجليزية؟", a: "منطق تقسيم الكلمات نفسه، لكن العربية عادةً تحتاج كلمات أقل بوضوح للتعبير عن الفكرة نفسها — يستحق معرفته إن كنت تترجم توصيفاً كُتب بهدف طول إنجليزي." },
        { q: "هل بحثي خاص حين ألصقه هنا؟", a: "نعم. العدّ يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ، فلصق مسودّة غير مُسلَّمة آمن." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "thesis-and-journals",
    order: 2,
    related: [
      { href: "/blog/how-to-cite-ai-academic-work", en: "Citing and disclosing AI in academic work", ar: "توثيق الذكاء الاصطناعي في العمل الأكاديمي" },
      { href: "/ai-detector/research-papers", en: "Check a thesis chapter before submission", ar: "افحص فصل رسالتك قبل التسليم" },
      { href: "/readability-checker/technical-writers", en: "Readability for technical and academic prose", ar: "سهولة القراءة للنثر التقني والأكاديمي" },
    ],
    en: {
      h1: "Word Counter for Theses & Journal Submissions",
      metaTitle: "Word Counter for Abstracts & Theses — Where the Hard Limits Actually Are",
      metaDescription:
        "A journal abstract capped at 250 words is enforced by submission software, not discretion. Where the genuinely strict limits sit, and where a thesis has more room than students assume.",
      lede:
        "Graduate and journal word limits split into two very different categories: soft departmental conventions for a full thesis, and hard, software-enforced caps for anything going through a submission portal. Confusing the two is how an abstract gets silently truncated at word 251, or a chapter gets rewritten to hit a limit that was never actually strict.",
      sections: [
        {
          h: "Abstracts are the genuinely hard limit",
          p: "Most journals enforce an abstract cap — commonly 150 to 300 words depending on the publication — through the submission system itself, not through an editor's judgement. Go over, and the field either refuses to accept more text or the excess is silently cut at submission. Count your abstract specifically and separately from the rest of your document; it is the one place in academic writing where an exact number, not a convention, actually governs.",
        },
        {
          h: "A full thesis or dissertation is looser than it looks",
          p: "Word counts for a complete thesis exist mainly to stop scope creep, and department guidance (commonly 80,000–100,000 words for a doctoral thesis in many fields, far less for a master's) is usually a guideline enforced through supervisor judgement rather than automated rejection. What actually gets penalised is disproportion — a 40-page literature review supporting a 10-page findings chapter reads as a structural problem regardless of the total count.",
        },
        {
          h: "What's excluded, and why it matters more here than for an essay",
          p: "At thesis length, exclusions compound: references, appendices, footnotes, and often the abstract and acknowledgements sit outside the stated count in most institutional guidelines. Get this wrong on a 15,000-word chapter and you can be tracking a number that's off by a thousand words or more. Check your institution's own thesis-formatting guide, not a general convention — this is one of the few places worth reading the actual regulations document.",
        },
        {
          h: "Journal cover letters and structured abstracts have their own caps",
          p: "Beyond the abstract itself, cover letters to editors (commonly capped around 300–500 words) and structured abstracts with fixed subsections (Background, Methods, Results, Conclusion, each with its own implicit space) carry limits that are easy to miss because they're not the headline number anyone thinks to check. Read the specific journal's author guidelines for the submission you're targeting — these vary meaningfully between publishers.",
        },
        {
          h: "Counting a document with tables, equations, and citations",
          p: "None of these count as words in any consistent way across tools, which makes a pure word count a weak proxy for a data-heavy chapter's actual length. If your discipline sets page limits instead of word limits for exactly this reason, use the page count your institution specifies rather than converting it to an approximate word target — the conversion factor most people use (250 words per page) is a rough guess, not a rule anyone enforces.",
        },
      ],
      rules: [
        { when: "You're drafting an abstract for a specific journal", then: "Check that journal's exact cap and count only the abstract text — this is a hard, enforced limit, not a guideline." },
        { when: "Your thesis feels long relative to its guidance", then: "Check disproportion between chapters before cutting overall length. A bloated lit review is the more common real problem." },
        { when: "You're unsure what your institution excludes from the count", then: "Read your specific thesis-formatting regulations document. At this length, guessing wrong costs a thousand words or more." },
        { when: "Your discipline sets page limits, not word limits", then: "Use the page count directly. Converting to words with a rough 250-per-page estimate can mislead you either direction." },
      ],
      faq: [
        { q: "Will going over an abstract's word limit get my submission rejected outright?", a: "Often the submission system itself won't let you proceed, or it truncates the field automatically — treat this as a hard technical limit, not editorial discretion." },
        { q: "Is there a standard word count for a PhD thesis?", a: "No single standard — it varies enormously by discipline and country, commonly cited in the 80,000–100,000 range for many fields but far lower in others (some sciences) and higher in some humanities. Your institution's own regulations are the only number that actually governs you." },
        { q: "Does the word count include my references list?", a: "Almost never for a thesis, but confirm in your specific formatting guide — some institutions count differently than others, and getting this wrong at thesis length is a bigger error than at essay length." },
        { q: "How do I count a structured abstract with subsections?", a: "Count the abstract as one continuous block including the subsection labels if the journal's template includes them, then compare against the journal's stated total — most set one combined cap, not one per subsection." },
        { q: "Is this tool accurate enough for a hard submission limit?", a: "It counts words the same way most standard tools do, but for anything with real consequences — a journal system that will reject you at word 251 — always do a final check inside the actual submission form or the word processor's own counter before you submit." },
      ],
    },
    ar: {
      h1: "عدّاد الكلمات للرسائل وتسليمات المجلّات",
      metaTitle: "عدّاد الكلمات للملخّصات والرسائل — أين الحدود الصارمة فعلاً",
      metaDescription:
        "ملخّص مجلّة محدود بـ٢٥٠ كلمة يُفرَض ببرمجية التسليم لا بالتقدير. أين تقع الحدود الصارمة فعلاً، وأين تملك الرسالة مساحة أكبر ممّا يفترض الطلاب.",
      lede:
        "حدود الكلمات في الدراسات العليا والمجلّات تنقسم لفئتين مختلفتين تماماً: أعراف قسمية مرنة للرسالة الكاملة، وحدود صارمة تفرضها البرمجية لأي شيء يمرّ عبر بوّابة تسليم. الخلط بينهما هو كيف يُقتطع ملخّص بصمت عند الكلمة ٢٥١، أو يُعاد كتابة فصل ليبلغ حدّاً لم يكن صارماً فعلاً أصلاً.",
      sections: [
        {
          h: "الملخّصات هي الحدّ الصارم فعلاً",
          p: "معظم المجلّات تفرض حدّاً للملخّص — شائع بين ١٥٠ و٣٠٠ كلمة حسب المنشور — عبر نظام التسليم نفسه لا بحكم محرّر. تجاوز الحدّ، والحقل إمّا يرفض قبول نص إضافي أو يُقتطع الزائد بصمت عند التسليم. عُدّ ملخّصك تحديداً ومنفصلاً عن باقي مستندك؛ إنه الموضع الوحيد في الكتابة الأكاديمية حيث يحكم رقم دقيق فعلاً، لا عرف.",
        },
        {
          h: "الرسالة الكاملة أكثر مرونة ممّا تبدو",
          p: "حدود الكلمات لرسالة كاملة موجودة أساساً لمنع توسّع النطاق، وإرشاد القسم (شائع بين ٨٠ و١٠٠ ألف كلمة لرسالة دكتوراه في حقول كثيرة، وأقلّ بكثير للماجستير) عادةً توجيه يُفرَض بحكم المشرف لا رفضاً آلياً. وما يُعاقَب عليه فعلاً هو عدم التناسب — مراجعة أدبيات من ٤٠ صفحة تدعم فصل نتائج من ١٠ صفحات تُقرأ مشكلة بنيوية أياً كان العدد الإجمالي.",
        },
        {
          h: "ما يُستبعد، ولماذا يهمّ هنا أكثر من المقال",
          p: "عند طول الرسالة، تتراكم الاستبعادات: المراجع والملاحق والحواشي وغالباً الملخّص والشكر تقع خارج العدد المذكور في معظم الإرشادات المؤسسية. أخطئ في هذا على فصل من ١٥ ألف كلمة وقد تتابع رقماً منحرفاً بألف كلمة أو أكثر. راجع دليل تنسيق رسالتك في مؤسستك تحديداً لا عرفاً عاماً — هذا من المواضع القليلة التي تستحق قراءة وثيقة اللوائح الفعلية.",
        },
        {
          h: "خطابات تقديم المجلّات والملخّصات المُهيكَلة لها حدودها الخاصة",
          p: "بعيداً عن الملخّص نفسه، خطابات التقديم للمحرّرين (شائع بين ٣٠٠ و٥٠٠ كلمة) والملخّصات المُهيكَلة بأقسام ثابتة (الخلفية، المنهجية، النتائج، الخلاصة، لكل منها مساحته الضمنية) تحمل حدوداً يسهل إغفالها لأنها ليست الرقم الرئيسي الذي يفكّر أحد بفحصه. اقرأ إرشادات المؤلّف الخاصة بالمجلّة المستهدَفة تحديداً — تتفاوت هذه بشكل حقيقي بين الناشرين.",
        },
        {
          h: "عدّ مستند فيه جداول ومعادلات واستشهادات",
          p: "لا شيء من هذا يُحسب كلمات بطريقة متّسقة عبر الأدوات، ما يجعل العدّ الصرف مؤشّراً ضعيفاً لطول فصل ثقيل بالبيانات فعلياً. فإن كان تخصّصك يضع حدود صفحات بدل حدود كلمات لهذا السبب بالضبط، استخدم عدد الصفحات الذي تحدّده مؤسستك بدل تحويله لهدف كلمات تقريبي — معامل التحويل الذي يستخدمه معظم الناس (٢٥٠ كلمة للصفحة) تخمين تقريبي لا قاعدة يفرضها أحد.",
        },
      ],
      rules: [
        { when: "تصوغ ملخّصاً لمجلّة محددة", then: "تحقّق من حدّها الدقيق واعدّ نص الملخّص فقط — هذا حدّ صارم مفروض، لا إرشاد." },
        { when: "رسالتك تبدو طويلة نسبةً لإرشادها", then: "تحقّق من عدم التناسب بين الفصول قبل تقليص الطول الإجمالي. مراجعة الأدبيات المتضخّمة هي المشكلة الحقيقية الأشيع." },
        { when: "لست متأكداً ما تستبعده مؤسستك من العدّ", then: "اقرأ وثيقة لوائح تنسيق رسالتك تحديداً. عند هذا الطول، التخمين الخاطئ يكلّف ألف كلمة أو أكثر." },
        { when: "تخصّصك يضع حدود صفحات لا كلمات", then: "استخدم عدد الصفحات مباشرة. تحويله لكلمات بتقدير ٢٥٠ للصفحة قد يضلّلك في أي اتجاه." },
      ],
      faq: [
        { q: "هل يرفض تسليمي فوراً لو تجاوزت حدّ كلمات الملخّص؟", a: "غالباً نظام التسليم نفسه لن يسمح لك بالمتابعة، أو يقتطع الحقل تلقائياً — عامله كحدّ تقني صارم لا تقدير تحريري." },
        { q: "هل يوجد عدد كلمات معياري لرسالة دكتوراه؟", a: "لا معيار واحد — يتفاوت هائلاً بالتخصّص والبلد، شائع الذكر بين ٨٠ و١٠٠ ألف في حقول كثيرة وأقلّ بكثير في أخرى (بعض العلوم) وأعلى في بعض العلوم الإنسانية. لوائح مؤسستك أنت هي الرقم الوحيد الذي يحكمك فعلاً." },
        { q: "هل يشمل عدد الكلمات قائمة مراجعي؟", a: "شبه أبداً للرسالة، لكن تأكّد في دليل تنسيقك تحديداً — بعض المؤسسات تعدّ بشكل مختلف عن غيرها، والخطأ هنا عند طول الرسالة أكبر منه عند طول المقال." },
        { q: "كيف أعدّ ملخّصاً مُهيكَلاً بأقسام فرعية؟", a: "عُدّ الملخّص كتلة متصلة واحدة شاملة تسميات الأقسام إن كان قالب المجلّة يتضمّنها، ثم قارن بالمجموع الذي تذكره المجلّة — معظمها يضع حدّاً مجمّعاً واحداً لا حدّاً لكل قسم فرعي." },
        { q: "هل هذه الأداة دقيقة كفاية لحدّ تسليم صارم؟", a: "تعدّ الكلمات بالطريقة نفسها التي تعدّ بها معظم الأدوات القياسية، لكن لأي شيء بعواقب حقيقية — نظام مجلّة سيرفضك عند الكلمة ٢٥١ — افحص أخيراً دائماً داخل نموذج التسليم الفعلي أو عدّاد معالج النصوص نفسه قبل التسليم." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "authors",
    order: 3,
    related: [
      { href: "/readability-checker", en: "Check your manuscript's readability", ar: "افحص سهولة قراءة مخطوطتك" },
      { href: "/ai-humanizer", en: "Fix a passage that reads stiff", ar: "أصلح مقطعاً يُقرأ متصلّباً" },
      { href: "/ai-detector", en: "Check a chapter before you send it out", ar: "افحص فصلاً قبل إرساله" },
    ],
    en: {
      h1: "Word Counter for Authors & Manuscripts",
      metaTitle: "Word Counter for Novelists — Genre Length Norms Agents Actually Expect",
      metaDescription:
        "A manuscript that's the wrong length for its genre gets a form rejection before anyone reads a sentence. The ranges agents and editors actually work with, by category.",
      lede:
        "Literary agents and acquiring editors work against genre length conventions closely enough that a manuscript far outside the expected range can be rejected on word count alone, before the writing itself is judged at all. The number isn't arbitrary gatekeeping — it reflects what a publisher can price and print economically for that category, and knowing your target before you draft shapes the book you write.",
      sections: [
        {
          h: "Genre ranges worth knowing before you draft",
          p: "Adult literary and commercial fiction commonly runs 80,000–100,000 words; a debut significantly over that range is a harder sell regardless of quality. Fantasy and science fiction tolerate more, often 90,000–120,000, because genre readers expect more world to cover. Young adult typically sits lower, 50,000–80,000 depending on subgenre. These are norms drawn from what typically gets acquired, not hard rules — but a debut manuscript at 180,000 words competes against the convention as much as against other books.",
        },
        {
          h: "Nonfiction runs by a different logic entirely",
          p: "A nonfiction word count is driven by the argument's actual length, not a genre convention, and proposals typically estimate a final count rather than deliver one — 60,000–90,000 is a common range for a trade nonfiction book, but a tightly argued book can be shorter and a research-heavy one longer without either being unusual. What agents actually query on for nonfiction is the proposal's argument and platform, with word count as a secondary practical detail.",
        },
        {
          h: "Daily and session word count goals",
          p: "A consistent daily target — commonly cited ranges are 500–1,000 words for a sustainable working pace, 1,500–2,000 for an ambitious one — matters less than consistency itself; a lower daily count kept every day for a year outproduces a high count abandoned after a week. Track your count over weeks, not single sessions, and expect it to vary substantially by scene and by how much revision-thinking a day's writing required.",
        },
        {
          h: "Chapter length consistency, and why it's not actually a hard rule",
          p: "Wide variation in chapter length within one manuscript reads as intentional when it serves pacing — a short chapter for tension, a long one for immersion — and reads as inconsistent when it doesn't. Track your chapter lengths as you draft rather than only at the end; a chapter that's triple the length of its neighbours for no narrative reason is worth a structural look before submission, not necessarily a cut.",
        },
        {
          h: "Counting a manuscript correctly for submission",
          p: "Industry convention typically counts on the manuscript's actual word count rather than an estimated page-count conversion, unlike the older 250-words-per-manuscript-page rule some style guides still cite. Front matter, chapter titles, and scene-break markers are usually included in a straightforward word count; check the specific submission guidelines for any agent or publisher you're querying, since a small number do ask for an estimated count instead.",
        },
      ],
      rules: [
        { when: "You're drafting a debut novel in a specific genre", then: "Check that genre's typical range before you're deep into the manuscript — restructuring at 150,000 words is expensive." },
        { when: "You're well outside your genre's typical range", then: "This alone can trigger a form rejection regardless of quality. Know the convention even if you plan to break it deliberately." },
        { when: "Your daily word count varies wildly", then: "Track it over weeks, not single sessions. A modest, sustained daily count beats an ambitious one you abandon." },
        { when: "One chapter is much longer than its neighbours", then: "Check whether that serves the pacing intentionally. If not, it's worth a structural look, not automatically a cut." },
      ],
      faq: [
        { q: "Will an agent reject my manuscript just for being long?", a: "A debut manuscript far outside genre convention (say, 180,000 words for commercial fiction) faces real resistance because of production costs, independent of the writing's quality — it's worth knowing this before you query widely." },
        { q: "Does this count match what publishing software uses?", a: "Standard word counters, including this one, count on whitespace-separated words the same way most manuscript-formatting software does. For a specific submission, check whether the agent or publisher wants an estimated count instead of a literal one — a minority still do." },
        { q: "What's a reasonable daily word count goal for a first draft?", a: "500–1,000 words a day is a commonly cited sustainable pace for most working writers; 1,500–2,000 is ambitious but not unusual. Consistency across weeks matters more than any single day's number." },
        { q: "Should I count front matter and chapter titles?", a: "Most manuscript word counts include them by default since they're part of the file; if a specific submission's guidelines ask for a manuscript-only count excluding front matter, follow that guideline exactly." },
        { q: "Is my manuscript private if I paste it here to check?", a: "Yes. Counting runs entirely in your browser — nothing is uploaded, stored, or logged, which matters for an unpublished, unagented manuscript." },
      ],
    },
    ar: {
      h1: "عدّاد الكلمات للمؤلّفين والمخطوطات",
      metaTitle: "عدّاد الكلمات للروائيين — معايير طول التصنيف التي تتوقّعها الوكالات فعلاً",
      metaDescription:
        "مخطوطة بطول خاطئ لتصنيفها تُرفض شكلياً قبل أن يقرأ أحد جملة واحدة. النطاقات التي تعمل بها الوكالات ودور النشر فعلاً، حسب الفئة.",
      lede:
        "وكلاء الأدب ومحرّرو الاقتناء يعملون وفق أعراف طول التصنيف بدقّة كافية لأن مخطوطة بعيدة جداً عن النطاق المتوقّع قد تُرفض بناءً على عدد الكلمات وحده، قبل أن تُقيَّم الكتابة نفسها إطلاقاً. الرقم ليس بوّابة اعتباطية — يعكس ما يستطيع ناشر تسعيره وطباعته اقتصادياً لتلك الفئة، ومعرفة هدفك قبل الصياغة تُشكّل الكتاب الذي تكتبه.",
      sections: [
        {
          h: "نطاقات التصنيف التي تستحق معرفتها قبل الصياغة",
          p: "الرواية الأدبية والتجارية للبالغين تتراوح شائعاً بين ٨٠ و١٠٠ ألف كلمة؛ وعمل أول أبعد بكثير عن ذلك النطاق أصعب تسويقاً أياً كانت جودته. والفانتازيا والخيال العلمي يتحمّلان أكثر، غالباً ٩٠–١٢٠ ألفاً، لأن قرّاء التصنيف يتوقّعون عالماً أوسع للتغطية. وأدب اليافعين يقع أدنى عادةً، ٥٠–٨٠ ألفاً حسب التصنيف الفرعي. هذه أعراف مستمَدّة ممّا يُقتنى عادةً، لا قواعد صارمة — لكن مخطوطة أولى بـ١٨٠ ألف كلمة تنافس العرف بقدر ما تنافس كتباً أخرى.",
        },
        {
          h: "الكتب غير الروائية تعمل بمنطق مختلف تماماً",
          p: "عدد كلمات الكتاب غير الروائي يقوده طول الحجّة الفعلي لا عرف تصنيف، والمقترحات عادةً تقدّر عدداً نهائياً بدل تسليمه — ٦٠–٩٠ ألفاً نطاق شائع لكتاب تجاري غير روائي، لكن كتاباً محكم الحجّة قد يكون أقصر وكتاباً بحثياً ثقيلاً أطول دون أن يكون أيّ منهما غير معتاد. وما تسأل عنه الوكالات فعلاً في غير الروائي هو حجّة المقترح وقاعدة الكاتب، وعدد الكلمات تفصيل عملي ثانوي.",
        },
        {
          h: "أهداف عدد الكلمات اليومية وللجلسة",
          p: "هدف يومي ثابت — نطاقات شائعة الذكر ٥٠٠–١٠٠٠ كلمة لوتيرة عمل مستدامة، و١٥٠٠–٢٠٠٠ لوتيرة طموحة — يهمّ أقلّ من الثبات نفسه؛ عدد يومي أقلّ محفوظ كل يوم لسنة يفوق إنتاجاً عدداً عالياً يُهجَر بعد أسبوع. تتبّع عددك عبر أسابيع لا جلسات فردية، وتوقّع تفاوتاً كبيراً حسب المشهد وحسب مقدار تفكير المراجعة الذي تطلّبته كتابة اليوم.",
        },
        {
          h: "ثبات طول الفصل، ولماذا ليس قاعدة صارمة فعلاً",
          p: "التفاوت الواسع في طول الفصل داخل مخطوطة واحدة يُقرأ مقصوداً حين يخدم الإيقاع — فصل قصير للتوتّر، وطويل للانغماس — ويُقرأ غير متّسق حين لا يخدمه. تتبّع أطوال فصولك أثناء الصياغة لا في النهاية فقط؛ وفصل بثلاثة أضعاف طول جيرانه بلا سبب سردي يستحق نظرة بنيوية قبل التسليم، لا حذفاً بالضرورة.",
        },
        {
          h: "عدّ مخطوطة بصحة للتسليم",
          p: "العرف الصناعي عادةً يعدّ بعدد الكلمات الفعلي للمخطوطة لا بتحويل تقديري من عدد الصفحات، خلافاً لقاعدة ٢٥٠ كلمة لصفحة المخطوطة الأقدم التي ما زالت بعض أدلّة الأسلوب تذكرها. المقدّمات وعناوين الفصول وعلامات فواصل المشاهد تُشمَل عادةً في عدّ كلمات مباشر؛ تحقّق من إرشادات التسليم المحدّدة لأي وكيل أو ناشر تراسله، إذ يطلب عدد قليل منهم عدداً تقديرياً بدلاً من ذلك.",
        },
      ],
      rules: [
        { when: "تصوغ رواية أولى في تصنيف محدد", then: "تحقّق من النطاق المعتاد لذلك التصنيف قبل أن تتعمّق في المخطوطة — إعادة الهيكلة عند ١٥٠ ألف كلمة مكلفة." },
        { when: "أنت بعيد جداً عن نطاق تصنيفك المعتاد", then: "هذا وحده قد يُثير رفضاً شكلياً أياً كانت الجودة. اعرف العرف حتى لو خطّطت لكسره عمداً." },
        { when: "عددك اليومي متفاوت جداً", then: "تتبّعه عبر أسابيع لا جلسات فردية. عدد يومي متواضع ومستمرّ يفوق طموحاً تهجره." },
        { when: "فصل أطول بكثير من جيرانه", then: "تحقّق هل يخدم الإيقاع عمداً. إن لا، يستحق نظرة بنيوية، لا حذفاً تلقائياً." },
      ],
      faq: [
        { q: "هل يرفض وكيل مخطوطتي لمجرّد طولها؟", a: "مخطوطة أولى بعيدة جداً عن عرف التصنيف (كـ١٨٠ ألف كلمة للرواية التجارية) تواجه مقاومة حقيقية بسبب كلفة الإنتاج، بمعزل عن جودة الكتابة — يستحق معرفة هذا قبل مراسلة واسعة." },
        { q: "هل يطابق هذا العدّ ما تستخدمه برمجيات النشر؟", a: "العدّادات القياسية، بما فيها هذه، تعدّ بالفصل على المسافات بالطريقة نفسها التي تعدّ بها معظم برمجيات تنسيق المخطوطات. لتسليم محدد، تحقّق هل يريد الوكيل أو الناشر عدداً تقديرياً بدل عدد حرفي — أقلّية ما زالت تفعل." },
        { q: "ما هدف عدد كلمات يومي معقول لمسودّة أولى؟", a: "٥٠٠–١٠٠٠ كلمة يومياً وتيرة مستدامة شائعة الذكر لمعظم الكتّاب العاملين؛ و١٥٠٠–٢٠٠٠ طموحة لكن غير نادرة. الثبات عبر الأسابيع يهمّ أكثر من رقم أي يوم فردي." },
        { q: "هل أعدّ المقدّمات وعناوين الفصول؟", a: "معظم عدّات المخطوطات تشملها افتراضياً لأنها جزء من الملف؛ وإن طلبت إرشادات تسليم محددة عدداً للمخطوطة فقط مستبعداً المقدّمات، فاتّبع ذلك الإرشاد بدقّة." },
        { q: "هل مخطوطتي خاصة إن لصقتها هنا للفحص؟", a: "نعم. العدّ يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ أو يُسجَّل، وهذا يهمّ لمخطوطة غير منشورة وبلا وكيل بعد." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "job-applications",
    order: 4,
    related: [
      { href: "/ai-humanizer/cover-letters", en: "Make a draft cover letter sound like you", ar: "اجعل مسودّة خطاب التوظيف تبدو بصوتك" },
      { href: "/ai-detector/cover-letters", en: "Why a generated letter gets noticed", ar: "لماذا يُلاحَظ خطاب مولّد" },
      { href: "/readability-checker", en: "Check how your resume reads", ar: "افحص كيف تُقرأ سيرتك الذاتية" },
    ],
    en: {
      h1: "Word Counter for Resumes & Cover Letters",
      metaTitle: "Word Counter for Job Applications — Portal Limits, Resume Bullets & LinkedIn Caps",
      metaDescription:
        "An application portal that truncates your text at its character limit doesn't warn you first. The specific caps worth checking before you paste anything in.",
      lede:
        "The word and character limits in a job application are enforced by software far more often than in academic writing — an application portal field with a hard character cap will truncate or reject your paste silently, with no editorial judgement involved at all. Knowing where those hard limits actually sit saves you from finding out mid-application.",
      sections: [
        {
          h: "Cover letters: shorter than most drafts run",
          p: "A cover letter that runs to 500–650 words is at the long end of what gets fully read; hiring managers reading dozens of applications commonly report skimming past 400 words. This isn't a portal-enforced limit like an abstract cap — it's a practical one, and the cost of ignoring it is a letter that gets skimmed rather than read, which defeats the point of writing it at all.",
        },
        {
          h: "Resume bullet points have their own unwritten convention",
          p: "A single resume bullet is commonly recommended at one to two lines, roughly 15–25 words — long enough for a specific result, short enough to scan in the few seconds a recruiter actually spends per resume in an initial pass. A bullet that runs to 40 words reads as unedited, regardless of how good the underlying achievement is.",
        },
        {
          h: "LinkedIn's specific character caps",
          p: "LinkedIn enforces its own hard character limits per field — the headline, the About section, and each experience description all have platform-set caps that a resume document doesn't share, and pasting resume text directly often means it gets silently truncated at the platform's limit rather than yours. Check each field's specific cap on the platform itself before drafting, since these numbers change with platform updates.",
        },
        {
          h: "Application portal fields: check before you paste",
          p: "Many applicant tracking systems set an exact character cap on free-text fields like \"Why do you want this role?\" — commonly somewhere in the 500–1,000 character range, not word range, which is a meaningfully different budget than a word limit implies. If the field doesn't show a live counter, draft in a separate document with a character count first, since a silent truncation mid-sentence is a worse outcome than a slightly shorter answer.",
        },
        {
          h: "Why shorter usually wins in this specific context",
          p: "Unlike an academic essay where more content on-topic is generally rewarded, application materials are read under time pressure by someone screening volume, not depth — the norm here inverts: a tighter answer that hits the specific thing being asked reads as more competent than a longer one that's technically more complete. If you're unsure whether to cut, cut.",
        },
      ],
      rules: [
        { when: "Your cover letter is over 500 words", then: "Cut toward 400. Longer reads as unfiltered even when every sentence is individually good." },
        { when: "A resume bullet runs past two lines", then: "Split the achievement from the context, or cut the context. One idea per bullet, one line if possible." },
        { when: "You're pasting resume text into LinkedIn", then: "Check that field's specific character cap on the platform first — resume-length text often gets silently truncated there." },
        { when: "An application field has no visible counter", then: "Draft it elsewhere with a character count before pasting. A silent truncation mid-sentence looks worse than a short answer." },
      ],
      faq: [
        { q: "Is there a real word limit for cover letters, or is it just convention?", a: "It's convention, not a system-enforced cap — but the practical effect is similar, because letters over roughly 400-500 words are reported to get skimmed rather than read in full by people screening volume." },
        { q: "Why did my LinkedIn About section get cut off?", a: "LinkedIn enforces its own character cap on that field, separate from any resume document's length. Check the platform's current limit and count against that specifically, not your resume's word count." },
        { q: "Should I count words or characters for application portals?", a: "Check the specific field — many applicant tracking systems cap by character, not word, which is a different and usually tighter budget than a word limit implies." },
        { q: "Is a one-page resume a hard rule?", a: "It's a strong convention for most early- and mid-career applications rather than a hard rule everywhere, though some fields and seniority levels tolerate two pages. When in doubt for a first application, one page is the safer default." },
        { q: "Is my resume text private when I check it here?", a: "Yes. Counting runs entirely in your browser — nothing is uploaded or logged, so pasting an unfinished draft is safe." },
      ],
    },
    ar: {
      h1: "عدّاد الكلمات للسير الذاتية وخطابات التوظيف",
      metaTitle: "عدّاد الكلمات لطلبات التوظيف — حدود البوّابات ونقاط السيرة الذاتية وسقوف LinkedIn",
      metaDescription:
        "بوّابة طلب توظيف تقتطع نصّك عند حدّها لا تحذّرك أولاً. الحدود المحدّدة التي تستحق الفحص قبل أن تلصق أي شيء.",
      lede:
        "حدود الكلمات والأحرف في طلب التوظيف تُفرَض بالبرمجية أكثر بكثير من الكتابة الأكاديمية — حقل بوّابة طلب بحدّ أحرف صارم يقتطع لصقك أو يرفضه بصمت، بلا أي تقدير تحريري إطلاقاً. معرفة أين تقع تلك الحدود الصارمة فعلاً يوفّر عليك اكتشافها في منتصف الطلب.",
      sections: [
        {
          h: "خطابات التوظيف: أقصر ممّا تبلغه معظم المسودّات",
          p: "خطاب توظيف يبلغ ٥٠٠–٦٥٠ كلمة يقع في الطرف الأطول ممّا يُقرأ كاملاً؛ ومديرو التوظيف الذين يقرؤون عشرات الطلبات يذكرون شائعاً أنهم يمرّرون بعد ٤٠٠ كلمة. هذا ليس حدّاً تفرضه بوّابة كحدّ الملخّص — إنه حدّ عملي، وكلفة تجاهله خطاب يُمرَّر لا يُقرأ، ما يُفوّت غرض كتابته أصلاً.",
        },
        {
          h: "نقاط السيرة الذاتية لها عرفها غير المكتوب الخاص",
          p: "نقطة سيرة ذاتية واحدة يُنصَح بها شائعاً بسطر إلى سطرين، نحو ١٥–٢٥ كلمة — طويلة بما يكفي لنتيجة محددة، وقصيرة بما يكفي لتُمسح في الثواني القليلة التي يقضيها المُوظِّف فعلاً لكل سيرة في المرور الأول. ونقطة تبلغ ٤٠ كلمة تُقرأ غير محرَّرة، أياً كان جودة الإنجاز الأساسي.",
        },
        {
          h: "حدود أحرف LinkedIn المحدّدة",
          p: "يفرض LinkedIn حدود أحرف صارمة خاصة به لكل حقل — العنوان، وقسم «نبذة»، ووصف كل خبرة لها سقوف تحدّدها المنصّة لا يشاركها مستند السيرة الذاتية، ولصق نص السيرة مباشرة غالباً يعني اقتطاعه بصمت عند حدّ المنصّة لا حدّك أنت. تحقّق من حدّ كل حقل تحديداً على المنصّة نفسها قبل الصياغة، لأن هذه الأرقام تتغيّر مع تحديثات المنصّة.",
        },
        {
          h: "حقول بوّابات الطلب: تحقّق قبل اللصق",
          p: "كثير من أنظمة تتبّع المتقدّمين تضع حدّ أحرف دقيقاً لحقول النص الحرّ مثل «لماذا تريد هذا الدور؟» — شائع في نطاق ٥٠٠–١٠٠٠ حرف لا كلمة، وهذه ميزانية مختلفة عمّا يُوحيه حدّ الكلمات فعلياً. فإن لم يُظهر الحقل عدّاداً حياً، صُغ في مستند منفصل بعدّ أحرف أولاً، لأن الاقتطاع الصامت في منتصف جملة نتيجة أسوأ من إجابة أقصر قليلاً.",
        },
        {
          h: "لماذا يفوز الأقصر عادةً في هذا السياق تحديداً",
          p: "خلافاً للمقال الأكاديمي حيث يُكافأ المحتوى الإضافي ذو الصلة عموماً، تُقرأ مواد الطلب تحت ضغط وقت من شخص يفرز الكمّ لا العمق — والعرف هنا ينعكس: إجابة أضيق تصيب ما يُسأل عنه تحديداً تُقرأ أكفأ من أطول وأكمل تقنياً. إن لم تكن متأكداً هل تحذف، احذف.",
        },
      ],
      rules: [
        { when: "خطاب توظيفك فوق ٥٠٠ كلمة", then: "احذف نحو ٤٠٠. الأطول يُقرأ غير مُصفّى حتى لو كانت كل جملة جيدة فردياً." },
        { when: "نقطة سيرة ذاتية تتجاوز سطرين", then: "افصل الإنجاز عن السياق، أو احذف السياق. فكرة واحدة لكل نقطة، سطر واحد إن أمكن." },
        { when: "تلصق نص سيرتك في LinkedIn", then: "تحقّق من حدّ أحرف ذلك الحقل تحديداً على المنصّة أولاً — نص بطول السيرة غالباً يُقتطع هناك بصمت." },
        { when: "حقل طلب بلا عدّاد ظاهر", then: "صُغه في مكان آخر بعدّ أحرف قبل اللصق. الاقتطاع الصامت في منتصف جملة يبدو أسوأ من إجابة قصيرة." },
      ],
      faq: [
        { q: "هل يوجد حدّ كلمات حقيقي لخطابات التوظيف، أم هو عرف فقط؟", a: "إنه عرف لا حدّ يفرضه نظام — لكن الأثر العملي مشابه، لأن الخطابات فوق ٤٠٠–٥٠٠ كلمة تقريباً يُذكَر أنها تُمرَّر لا تُقرأ كاملة من قِبل من يفرز الكمّ." },
        { q: "لماذا اقتُطع قسم «نبذة» في LinkedIn؟", a: "يفرض LinkedIn حدّ أحرف خاصاً به لذلك الحقل، منفصلاً عن طول أي مستند سيرة ذاتية. تحقّق من حدّ المنصّة الحالي واعدّ مقابله تحديداً، لا مقابل عدد كلمات سيرتك." },
        { q: "هل أعدّ كلمات أم أحرفاً لبوّابات الطلب؟", a: "تحقّق من الحقل تحديداً؛ كثير من أنظمة تتبّع المتقدّمين تحدّ بالأحرف لا الكلمات، وهذه ميزانية مختلفة وأضيق عادةً ممّا يُوحيه حدّ الكلمات." },
        { q: "هل السيرة الذاتية بصفحة واحدة قاعدة صارمة؟", a: "عرف قوي لمعظم طلبات بداية ومنتصف المسيرة لا قاعدة صارمة في كل مكان، رغم أن بعض المجالات ومستويات الأقدمية تتحمّل صفحتين. عند الشكّ في طلب أول، صفحة واحدة الخيار الأسلم." },
        { q: "هل نص سيرتي خاص حين أفحصه هنا؟", a: "نعم. العدّ يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُسجَّل، فلصق مسودّة غير مكتملة آمن." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "social-media-ads",
    order: 5,
    related: [
      { href: "/ai-humanizer/social-media", en: "Fix a post that reads AI-shaped", ar: "أصلح منشوراً يبدو آلي الشكل" },
      { href: "/blog/ai-content-seo-google", en: "Does Google penalise AI content?", ar: "هل يعاقب Google المحتوى الآلي؟" },
      { href: "/readability-checker", en: "Check how scannable your copy is", ar: "افحص مدى قابلية نصّك للمسح السريع" },
    ],
    en: {
      h1: "Word Counter for Social Media & Ad Copy",
      metaTitle: "Character Counter for Social Posts & Ads — The Limits That Actually Cut You Off",
      metaDescription:
        "X truncates at 280 characters mid-word if you're over. Meta ads reflow when you exceed recommended lengths. The specific caps for each platform and field.",
      lede:
        "Social and ad copy limits are almost always character limits, not word limits, and several of them are enforced by the platform itself rather than by good practice — write past X's cap and the post is rejected outright, not gently suggested shorter. Knowing the hard limits from the soft recommendations changes how you draft.",
      sections: [
        {
          h: "Hard platform limits vs. soft best-practice lengths",
          p: "X's 280-character cap is enforced — the platform will not let you post over it. LinkedIn's post limit is far higher (around 3,000 characters) but engagement data commonly cited by social teams suggests posts around 150–300 characters perform best before a \"see more\" cutoff hides the rest — that's a soft recommendation, not a platform rule, and worth treating differently from a hard cap.",
        },
        {
          h: "Where the actual cutoff hides",
          p: "Most platforms truncate visible text before a \"see more\" or \"read more\" link at a length shorter than the platform's absolute maximum — Instagram captions can run to 2,200 characters, but only the first two to three lines show before truncation, meaning your actual hook has to work in far less space than the character limit implies. Write your first line as if it's the entire post, because for most readers scrolling past, it functionally is.",
        },
        {
          h: "Ad copy has its own, often stricter caps",
          p: "Ad platforms frequently cap headline and body text more tightly than organic post limits, and text that exceeds a platform's recommended length in an image ad can reduce delivery or reach, which is a cost organic posts don't carry. Check the specific ad format's current limits before finalising copy — these numbers are updated by platforms more often than most people re-check them.",
        },
        {
          h: "Email subject lines: a different kind of limit",
          p: "Subject lines aren't capped by the email platform the way a tweet is, but mobile inboxes commonly truncate visible subject text around 30–40 characters — write past that and your carefully chosen ending is simply invisible to a majority of recipients checking on a phone. Front-load the specific, concrete part of the subject line rather than the generic part.",
        },
        {
          h: "Why counting before you draft beats counting after",
          p: "Ad and social copy that's cut to fit after the fact reads choppier than copy planned for the limit from the first sentence, because trimming after tends to remove connecting words rather than restructuring the idea. Know your target length before you write the first draft, not after — it's the same principle as a student writing to 800 words rather than cutting 1,400 down.",
        },
      ],
      rules: [
        { when: "You're writing for X specifically", then: "280 characters is a hard cap, not a target — the platform enforces it, so count before you try to post." },
        { when: "Your post relies on a punchline after the fold", then: "Rewrite so the first two lines work alone. Most readers never tap \"see more.\"" },
        { when: "You're finalising an image ad's text", then: "Check that format's current recommended character length — exceeding it can reduce delivery, not just look cluttered." },
        { when: "You're writing an email subject line", then: "Front-load the specific detail within about 35 characters. Mobile inboxes truncate past that regardless of the platform's own limit." },
      ],
      faq: [
        { q: "Does X count a link as part of the 280 characters?", a: "Links are counted as a fixed short length (historically 23 characters) regardless of the actual URL's length, which is worth knowing since it changes your effective budget for the rest of the post." },
        { q: "Why does my Instagram caption get cut off even though I'm under 2,200 characters?", a: "The character limit and the visible-before-truncation length are different numbers — only the first two to three lines show before a \"more\" link, so your caption's opening does the real work regardless of its total length." },
        { q: "Is there a real character limit for email subject lines?", a: "Not a platform-enforced one in most email tools, but mobile inboxes visually truncate around 30–40 characters, which functions as a real limit for how much of your subject most recipients actually see." },
        { q: "Do longer or shorter social posts perform better?", a: "This varies by platform and audience, and any single number cited as universal should be treated skeptically — what's consistent across platforms is that a strong, self-contained opening matters more than total length." },
        { q: "Is this counter accurate for character limits, not just words?", a: "Yes — it reports characters with and without spaces alongside the word count, which is the number that matters for platform caps like X's 280." },
      ],
    },
    ar: {
      h1: "عدّاد الكلمات لمنشورات التواصل والإعلانات",
      metaTitle: "عدّاد الأحرف للمنشورات والإعلانات — الحدود التي تقطعك فعلاً",
      metaDescription:
        "منصّة X تقتطع عند ٢٨٠ حرفاً في منتصف الكلمة إن تجاوزت. إعلانات Meta تُعاد صياغة تخطيطها حين تتجاوز الأطوال المُوصى بها. الحدود المحدّدة لكل منصّة وحقل.",
      lede:
        "حدود منشورات التواصل والإعلانات تكاد تكون دوماً حدود أحرف لا كلمات، وعدد منها تفرضه المنصّة نفسها لا الممارسة الجيدة — اكتب فوق حدّ X ويُرفض المنشور تماماً، لا يُقترح تقصيره بلطف. معرفة الحدود الصارمة من التوصيات المرنة يغيّر طريقة صياغتك.",
      sections: [
        {
          h: "حدود المنصّة الصارمة مقابل الأطوال المُوصى بها المرنة",
          p: "حدّ X البالغ ٢٨٠ حرفاً مفروض — المنصّة لن تسمح لك بالنشر فوقه. وحدّ منشور LinkedIn أعلى بكثير (نحو ٣٠٠٠ حرف) لكن بيانات التفاعل التي تذكرها فرق التواصل شائعاً تُشير إلى أن المنشورات حول ١٥٠–٣٠٠ حرف تؤدّي أفضل قبل أن يُخفي اقتطاع «شاهد المزيد» الباقي — هذه توصية مرنة لا قاعدة منصّة، وتستحق معاملة مختلفة عن حدّ صارم.",
        },
        {
          h: "أين يختبئ الاقتطاع الفعلي",
          p: "معظم المنصّات تقتطع النص الظاهر قبل رابط «شاهد المزيد» عند طول أقصر من الحدّ الأقصى المطلق للمنصّة — تعليقات إنستغرام قد تبلغ ٢٢٠٠ حرف، لكن سطرين إلى ثلاثة أسطر فقط تظهر قبل الاقتطاع، ما يعني أن جملة الجذب لديك يجب أن تعمل في مساحة أقلّ بكثير ممّا يُوحيه حدّ الأحرف. اكتب سطرك الأول كأنه المنشور كاملاً، لأنه فعلياً كذلك لمعظم من يمرّرون.",
        },
        {
          h: "نصّ الإعلانات له حدوده الخاصة، الأضيق غالباً",
          p: "منصّات الإعلانات كثيراً ما تحدّ نص العنوان والمتن أضيق من حدود المنشورات العضوية، ونصّ يتجاوز الطول المُوصى به لمنصّة في إعلان صورة قد يخفّض التوزيع أو الوصول، وهذه كلفة لا تحملها المنشورات العضوية. تحقّق من حدود صيغة الإعلان المحددة الحالية قبل تثبيت النصّ — هذه الأرقام تُحدَّثها المنصّات أكثر ممّا يعيد معظم الناس فحصها.",
        },
        {
          h: "عناوين رسائل البريد: نوع مختلف من الحدّ",
          p: "عناوين الرسائل لا تحدّها منصّة البريد كما تفعل تغريدة، لكن صناديق البريد على الجوال تقتطع النص الظاهر شائعاً حول ٣٠–٤٠ حرفاً — اكتب فوق ذلك وستكون خاتمتك المختارة بعناية غير مرئية ببساطة لأغلبية المستلمين الذين يفحصون على الهاتف. قدّم الجزء المحدد الملموس من العنوان لا الجزء العام.",
        },
        {
          h: "لماذا يفوق العدّ قبل الصياغة العدّ بعدها",
          p: "نصّ إعلان أو تواصل يُقصَّ ليناسب الحدّ بعد كتابته يُقرأ أكثر تقطّعاً من نصّ خُطِّط للحدّ من الجملة الأولى، لأن التشذيب اللاحق يميل لحذف كلمات الربط لا إعادة هيكلة الفكرة. اعرف طولك المستهدف قبل كتابة المسودّة الأولى لا بعدها — المبدأ نفسه لطالب يكتب إلى ٨٠٠ كلمة بدل تقليص ١٤٠٠ إليها.",
        },
      ],
      rules: [
        { when: "تكتب لمنصّة X تحديداً", then: "٢٨٠ حرفاً حدّ صارم لا هدف — المنصّة تفرضه، فاعدّ قبل محاولة النشر." },
        { when: "منشورك يعتمد على نكتة بعد النقطة المخفية", then: "أعد صياغته ليعمل السطران الأولان وحدهما. معظم القرّاء لا يضغطون «المزيد» أبداً." },
        { when: "تُثبّت نصّ إعلان صورة", then: "تحقّق من طول الأحرف المُوصى به الحالي لتلك الصيغة — تجاوزه قد يخفّض التوزيع لا يبدو مزدحماً فقط." },
        { when: "تكتب عنوان رسالة بريد إلكتروني", then: "قدّم التفصيل المحدد ضمن نحو ٣٥ حرفاً. صناديق الجوال تقتطع بعد ذلك أياً كان حدّ المنصّة نفسه." },
      ],
      faq: [
        { q: "هل تحسب X الرابط ضمن ٢٨٠ حرفاً؟", a: "تُحسب الروابط بطول قصير ثابت (تاريخياً ٢٣ حرفاً) أياً كان طول الرابط الفعلي، ويستحق معرفة هذا لأنه يغيّر ميزانيتك الفعلية لباقي المنشور." },
        { q: "لماذا يُقتطع تعليقي على إنستغرام رغم أني تحت ٢٢٠٠ حرف؟", a: "حدّ الأحرف وطول الظهور قبل الاقتطاع رقمان مختلفان — سطران إلى ثلاثة فقط تظهر قبل رابط «المزيد»، فافتتاح تعليقك يؤدّي العمل الحقيقي أياً كان طوله الكلي." },
        { q: "هل يوجد حدّ أحرف حقيقي لعناوين رسائل البريد؟", a: "ليس حدّاً تفرضه المنصّة في معظم أدوات البريد، لكن صناديق الجوال تقتطع بصرياً حول ٣٠–٤٠ حرفاً، وهذا يعمل كحدّ حقيقي لما يراه معظم المستلمين فعلياً من عنوانك." },
        { q: "هل تؤدّي المنشورات الأطول أم الأقصر أفضل؟", a: "يتفاوت هذا بالمنصّة والجمهور، وأي رقم واحد يُذكَر كعالمي يستحق شكّاً. الثابت عبر المنصّات أن افتتاحاً قوياً مكتفياً بذاته يهمّ أكثر من الطول الإجمالي." },
        { q: "هل هذا العدّاد دقيق للأحرف لا الكلمات فقط؟", a: "نعم — يعرض الأحرف بمسافات وبدونها إلى جانب عدد الكلمات، وهذا هو الرقم الذي يهمّ لحدود المنصّات كحدّ X البالغ ٢٨٠." },
      ],
    },
  },
];

export function getWordCounterUseCase(slug: string): UseCase | undefined {
  return wordCounterUseCases.find((u) => u.slug === slug);
}

export const wordCounterUseCaseSlugs = wordCounterUseCases.map((u) => u.slug);
