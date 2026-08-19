/**
 * Use-case landing pages for the readability checker.
 *
 * The score means something different depending on who's reading the
 * result: a blog writer wants 50–70, a technical writer's correct target
 * is deliberately lower, a plain-language writer is chasing a compliance
 * threshold that isn't optional, and a teacher isn't checking their own
 * writing at all but a student's or a textbook's. One generic "what your
 * score means" page cannot serve all of those without being wrong for
 * most of them.
 */

import type { UseCase, UseCaseCopy } from "./use-cases";

export type { UseCase, UseCaseCopy };

export const readabilityUseCases: UseCase[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "content-writers",
    order: 1,
    related: [
      { href: "/blog/ai-content-seo-google", en: "Does Google penalise AI content?", ar: "هل يعاقب Google المحتوى الآلي؟" },
      { href: "/ai-humanizer/content-writers", en: "Fix a flat draft, not just its score", ar: "أصلح مسودّة مسطّحة لا نتيجتها فقط" },
      { href: "/word-counter/social-media-ads", en: "Check your headline and caption limits", ar: "افحص حدود عنوانك وتعليقك" },
    ],
    en: {
      h1: "Readability Checker for Blog & Web Content",
      metaTitle: "Readability Checker for Content Writers — Hitting the 50–70 Band on Purpose",
      metaDescription:
        "Most web writing performs best between 50 and 70 on a readability score — not because simpler is smarter, but because readers decide to keep reading in the first few seconds. How to hit that band without dumbing anything down.",
      lede:
        "Web readers decide whether to keep reading within the first few seconds, and dense, long-sentence prose loses that decision regardless of how good the argument underneath it is. A readability score in the 50–70 band isn't a simplicity requirement — it's a proxy for how much friction stands between your reader and your point.",
      sections: [
        {
          h: "Why 50–70 specifically, and not higher",
          p: "Above roughly 80, writing starts to read as choppy and simplistic for an adult audience — every sentence short, every word plain, no room for a qualified or complex idea. The 50–70 band leaves room for genuine complexity expressed clearly, which is different from writing simply. Aim for the band, not the ceiling.",
        },
        {
          h: "The single highest-leverage fix",
          p: "Long sentences drag the score down faster than heavy vocabulary does, so the tool's long-sentence count is the first thing worth acting on, not the last. Splitting one 35-word sentence into two typically moves the score more than swapping five words for simpler synonyms — fix structure before you fix word choice.",
        },
        {
          h: "Where a low score is actually a symptom of something else",
          p: "A paragraph that scores poorly because every sentence hedges, qualifies, and covers every angle at once is often a content problem wearing a readability problem's symptoms — the underlying issue is a paragraph trying to say three things instead of committing to one. Fix the argument first; the score often follows.",
        },
        {
          h: "Readability and how AI-generated drafts score",
          p: "Generated text often scores in a narrow middle band because it defaults to uniformly medium-length sentences — technically readable, but flat in a way the score alone won't show you. If your readability number is fine but the paragraph still feels robotic, that's a rhythm problem a readability score doesn't measure, which is what a humanizer pass is actually for.",
        },
        {
          h: "Why this matters for how AI search engines use your content",
          p: "Generative engines extract self-contained passages rather than reading a whole page's flow, and a passage that's both readable and structurally complete on its own — answering its heading fully in the first sentence or two — gets pulled into an AI answer far more reliably than one that depends on the paragraph before it. Readability and extractability reward the same habit: say the complete thing plainly, early.",
        },
      ],
      rules: [
        { when: "Your score is under 40", then: "Check the long-sentence count first. Split the worst two or three before touching vocabulary." },
        { when: "Your score is over 80", then: "You may be over-simplifying for your actual audience. Some complexity is fine if it's expressed clearly." },
        { when: "The score is fine but the paragraph reads robotic", then: "That's a rhythm issue, not a readability one — readability doesn't measure sentence-length variety the way a detector does." },
        { when: "You want AI engines to cite the passage", then: "Make the first sentence under each heading answer it completely and plainly — extractable beats merely readable for this specific goal." },
      ],
      faq: [
        { q: "Does a high readability score help SEO rankings directly?", a: "Not as a direct ranking factor, but it affects whether readers stay and finish — which does correlate with rankings indirectly through engagement signals." },
        { q: "Is 50–70 right for every kind of web content?", a: "It's right for general blog and marketing content. A technical explainer or a piece for an expert audience can legitimately sit lower without being a problem — match the band to the actual reader." },
        { q: "Why does splitting one sentence move my score more than changing words?", a: "Sentence length is weighted heavily in most readability formulas because it's the strongest available proxy for how much a reader has to hold in mind before reaching a full stop." },
        { q: "Does this work for Arabic content?", a: "Yes, with word weight estimated from Arabic letter structure rather than English syllable-counting, which doesn't transfer to Arabic's root-and-pattern morphology." },
        { q: "Should I optimise for the score or for the reader?", a: "The reader — the score is a proxy that usually points the same direction, but a technically high score on content that says nothing useful is worse than a slightly lower score on content that actually helps someone." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة لمحتوى المدوّنات والويب",
      metaTitle: "فاحص سهولة القراءة لكتّاب المحتوى — بلوغ نطاق ٥٠–٧٠ عمداً",
      metaDescription:
        "معظم كتابة الويب تؤدّي أفضل بين ٥٠ و٧٠ في درجة سهولة القراءة — ليس لأن الأبسط أذكى، بل لأن القارئ يقرّر إكمال القراءة خلال الثواني الأولى. كيف تبلغ ذلك النطاق دون تسطيح شيء.",
      lede:
        "قارئ الويب يقرّر هل يكمل القراءة خلال الثواني القليلة الأولى، والنثر الكثيف طويل الجمل يخسر ذلك القرار أياً كانت جودة الحجّة تحته. درجة سهولة القراءة بين ٥٠ و٧٠ ليست شرط بساطة — إنها مؤشّر بديل لمقدار الاحتكاك بين قارئك ونقطتك.",
      sections: [
        {
          h: "لماذا ٥٠–٧٠ تحديداً لا أعلى",
          p: "فوق ٨٠ تقريباً، تبدأ الكتابة بالقراءة كمقتضبة ومبسّطة لجمهور بالغ — كل جملة قصيرة، وكل كلمة بسيطة، بلا مساحة لفكرة مقيّدة أو معقّدة. نطاق ٥٠–٧٠ يترك مساحة لتعقيد حقيقي مُعبَّر عنه بوضوح، وهذا يختلف عن الكتابة ببساطة. استهدف النطاق لا السقف.",
        },
        {
          h: "الإصلاح الأعلى قيمة على الإطلاق",
          p: "الجمل الطويلة تسحب الدرجة للأسفل أسرع من المفردات الثقيلة، فعدد الجمل الطويلة الذي تحسبه الأداة هو أول ما يستحق العمل عليه لا آخره. تقسيم جملة من ٣٥ كلمة إلى جملتين عادةً يحرّك الدرجة أكثر من استبدال خمس كلمات بمرادفات أبسط — أصلح البنية قبل اختيار الكلمات.",
        },
        {
          h: "أين تكون الدرجة المنخفضة فعلاً عرضاً لشيء آخر",
          p: "فقرة تحصل على درجة ضعيفة لأن كل جملة فيها تتحوّط وتقيّد وتغطّي كل زاوية دفعة واحدة غالباً مشكلة مضمون ترتدي أعراض مشكلة سهولة قراءة — والمشكلة الأساسية فقرة تحاول قول ثلاثة أشياء بدل الالتزام بواحد. أصلح الحجّة أولاً؛ الدرجة غالباً تتبع.",
        },
        {
          h: "سهولة القراءة وكيف تُقيَّم المسودّات المولّدة",
          p: "النص المولّد غالباً يقع في نطاق أوسط ضيّق لأنه يلجأ افتراضياً لجمل متوسطة الطول بانتظام — قابلة للقراءة تقنياً لكن مسطّحة بطريقة لا تُظهرها الدرجة وحدها. فإن كانت درجة سهولة قراءتك جيدة لكن الفقرة ما زالت تبدو روبوتية، فهذه مشكلة إيقاع لا تقيسها سهولة القراءة، وهذا ما يصلحه مرور بالمُنسّن فعلاً.",
        },
        {
          h: "لماذا يهمّ هذا لكيفية استخدام محرّكات البحث الذكية محتواك",
          p: "محرّكات التوليد تستخرج مقاطع مكتفية بذاتها بدل قراءة تدفّق صفحة كاملة، والمقطع القابل للقراءة والمكتمل بنيوياً وحده — يجيب عن عنوانه كاملاً في الجملة الأولى أو الثانية — يُسحَب داخل إجابة ذكاء اصطناعي بموثوقية أكبر بكثير من مقطع يعتمد على الفقرة التي قبله. سهولة القراءة والقابلية للاستخراج تكافئان العادة نفسها: قل الشيء الكامل بوضوح وباكراً.",
        },
      ],
      rules: [
        { when: "درجتك تحت ٤٠", then: "افحص عدد الجمل الطويلة أولاً. قسّم أسوأ جملتين أو ثلاث قبل لمس المفردات." },
        { when: "درجتك فوق ٨٠", then: "ربما تُبسّط أكثر من اللازم لجمهورك الفعلي. بعض التعقيد مقبول إن عُبِّر عنه بوضوح." },
        { when: "الدرجة جيدة لكن الفقرة تُقرأ روبوتية", then: "هذه مشكلة إيقاع لا سهولة قراءة — فسهولة القراءة لا تقيس تنوّع طول الجملة كما يفعل الكاشف." },
        { when: "تريد أن تستشهد بك محرّكات الذكاء", then: "اجعل الجملة الأولى تحت كل عنوان تجيب عنه كاملاً وبوضوح — القابلية للاستخراج تفوق مجرّد سهولة القراءة لهذا الهدف تحديداً." },
      ],
      faq: [
        { q: "هل تساعد درجة سهولة القراءة العالية في ترتيب السيو مباشرة؟", a: "ليست عامل ترتيب مباشراً، لكنها تؤثّر في بقاء القرّاء وإكمالهم — وهذا يرتبط بالترتيب بشكل غير مباشر عبر إشارات التفاعل." },
        { q: "هل ٥٠–٧٠ صحيح لكل أنواع محتوى الويب؟", a: "صحيح للمحتوى العام والتسويقي. أما الشرح التقني أو القطعة لجمهور خبير فقد تقع أدنى بحقّ دون أن تكون مشكلة — طابق النطاق مع القارئ الفعلي." },
        { q: "لماذا يحرّك تقسيم جملة واحدة درجتي أكثر من تغيير الكلمات؟", a: "طول الجملة له وزن كبير في معظم معادلات سهولة القراءة لأنه أقوى مؤشّر بديل متاح لمقدار ما يجب أن يحمله القارئ في ذهنه قبل بلوغ نقطة كاملة." },
        { q: "هل يعمل هذا مع المحتوى العربي؟", a: "نعم، بتقدير ثقل الكلمة من بنية الحروف العربية بدل عدّ المقاطع الإنجليزي الذي لا ينتقل لصرف الجذر والوزن العربي." },
        { q: "هل أُحسّن للدرجة أم للقارئ؟", a: "للقارئ — الدرجة مؤشّر بديل يشير عادةً للاتجاه نفسه، لكن درجة عالية تقنياً لمحتوى لا يقول شيئاً مفيداً أسوأ من درجة أدنى قليلاً لمحتوى يساعد أحداً فعلاً." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "students",
    order: 2,
    related: [
      { href: "/word-counter/students", en: "Check your essay against the word limit too", ar: "افحص بحثك مقابل حدّ الكلمات أيضاً" },
      { href: "/blog/students-guide-ai-writing-tools", en: "A student's guide to AI writing tools", ar: "دليل الطالب لأدوات الكتابة بالذكاء الاصطناعي" },
      { href: "/ai-detector/students", en: "Check your writing style before you submit", ar: "افحص أسلوب كتابتك قبل التسليم" },
    ],
    en: {
      h1: "Readability Checker for Student Essays",
      metaTitle: "Readability Checker for Students — Why a Low Score Isn't Always a Problem",
      metaDescription:
        "Academic writing legitimately scores lower than a blog post, and pushing it up to 70 can strip out the precision your assignment is actually asking for. When to fix the score, and when to leave it alone.",
      lede:
        "A readability tool built for web content will score careful academic prose lower than a blog post, and that is often correct rather than a problem to fix — precise, qualified academic argument requires longer, more structured sentences than a general web audience needs. Knowing when a low score is doing its job matters as much as knowing how to raise one.",
      sections: [
        {
          h: "Why your essay scores lower than a typical webpage, correctly",
          p: "Academic writing is expected to qualify claims, cite sources inline, and use field-specific terminology — all of which lower a formula built around sentence length and word weight. A methods section or a literature review that scored 70 would likely have stripped out the precision your marker is actually assessing. Don't chase a web-content number on an assignment that isn't web content.",
        },
        {
          h: "The genuine problem this tool does catch: run-on academic sentences",
          p: "There's a real difference between a sentence that's long because the idea is genuinely complex and one that's long because three separate ideas got joined with commas instead of being split into three sentences. The tool's long-sentence count is useful specifically for finding the second kind — read each flagged sentence and ask whether it's actually one idea or several stitched together.",
        },
        {
          h: "Where clarity genuinely helps your grade",
          p: "Markers reading dozens of similar essays reward an argument they can follow without re-reading a sentence, even within a discipline that tolerates complex prose generally. A sentence so dense the marker has to parse it twice is not demonstrating sophistication — it's costing you the moment where your point should have landed clearly. Split the load-bearing sentence in your thesis statement and your topic sentences specifically, even if you leave supporting detail sentences more complex.",
        },
        {
          h: "What the score cannot tell you about your essay",
          p: "It measures two things only: sentence length and word weight. It cannot see whether your argument holds together, whether your evidence actually supports your claim, or whether your structure makes sense. A technically readable essay that argues nothing coherent will score well and still earn a poor grade — use this as one editing tool among several, not a proxy for essay quality.",
        },
        {
          h: "Reading level and honest second-language writing",
          p: "If you write in English or Arabic as a second language, your prose may score differently than a native speaker's for reasons that have nothing to do with argument quality — careful, controlled sentence construction reads as more complex or more simple than intended depending on the formula. Use the score as one data point among several, and trust a human reader's feedback over the number when they disagree.",
        },
      ],
      rules: [
        { when: "Your essay scores under 30", then: "Check whether that's appropriate for your discipline before treating it as a problem — academic prose legitimately sits low." },
        { when: "A flagged long sentence contains three separate ideas", then: "Split it into three sentences. This is the one case a low score reliably catches worth fixing." },
        { when: "Your thesis statement or topic sentences are dense", then: "Simplify those specifically, even if you leave supporting detail more complex. The load-bearing sentences matter most." },
        { when: "The score is fine but your argument feels unclear", then: "The tool can't see that — get a human reader's feedback. Readability and coherence are different problems." },
      ],
      faq: [
        { q: "Should I aim for the same 50–70 score as blog writing?", a: "No — academic prose legitimately scores lower because it requires qualified, precise sentences a web-content target would strip out. Match the expectation to your discipline and assignment type." },
        { q: "Will a low readability score lower my grade?", a: "Not directly — no standard marking rubric grades on this score. What actually costs marks is an argument the marker can't follow, which sometimes but not always correlates with a low score." },
        { q: "Does this replace a proofread?", a: "No. It measures sentence length and word weight only — it can't check your argument, evidence, citations, or grammar. Use it alongside a full read-through, not instead of one." },
        { q: "Why does my essay score differently in Arabic than in English?", a: "Arabic's word weight is estimated from letter structure rather than English syllable-counting, since Arabic packs meaning into root-and-pattern morphology differently — the two scores aren't directly comparable to each other." },
        { q: "Is my essay private when I paste it here?", a: "Yes. The check runs entirely in your browser — nothing is uploaded or stored, so pasting an unsubmitted draft is safe." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة لأبحاث الطلاب",
      metaTitle: "فاحص سهولة القراءة للطلاب — لماذا لا تكون الدرجة المنخفضة مشكلة دائماً",
      metaDescription:
        "الكتابة الأكاديمية تحصل بحقّ على درجة أدنى من منشور مدوّنة، ورفعها إلى ٧٠ قد ينزع الدقّة التي يطلبها واجبك فعلاً. متى تُصلح الدرجة ومتى تتركها.",
      lede:
        "أداة سهولة قراءة مبنية لمحتوى الويب ستمنح نثراً أكاديمياً متحرّياً درجة أدنى من منشور مدوّنة، وهذا صحيح غالباً لا مشكلة تحتاج إصلاحاً — الحجّة الأكاديمية الدقيقة المقيّدة تتطلّب جملاً أطول وأكثر بنية ممّا يحتاجه جمهور ويب عام. معرفة متى تؤدّي الدرجة المنخفضة عملها تهمّ بقدر معرفة كيف ترفعها.",
      sections: [
        {
          h: "لماذا تحصل بحثك على درجة أدنى من صفحة ويب نمطية، وبصحّة",
          p: "يُتوقَّع من الكتابة الأكاديمية تقييد الادعاءات والاستشهاد داخل النص واستخدام مصطلحات مخصّصة بالحقل — كل ذلك يخفض معادلة مبنية حول طول الجملة وثقل الكلمة. وقسم منهجية أو مراجعة أدبيات سجّل ٧٠ ربما كان قد نزع الدقّة التي يقيّمها مُصحّحك فعلاً. لا تُطارد رقم محتوى الويب في واجب ليس محتوى ويب.",
        },
        {
          h: "المشكلة الحقيقية التي تمسكها هذه الأداة فعلاً: الجملة الأكاديمية المُتراكِبة",
          p: "يوجد فرق حقيقي بين جملة طويلة لأن الفكرة معقّدة فعلاً وجملة طويلة لأن ثلاث أفكار منفصلة رُبطت بفواصل بدل تقسيمها لثلاث جمل. عدّ الجمل الطويلة في الأداة مفيد تحديداً لإيجاد النوع الثاني — اقرأ كل جملة مُميَّزة واسأل هل هي فكرة واحدة فعلاً أم عدّة أفكار مخيَّطة معاً.",
        },
        {
          h: "أين يساعد الوضوح درجتك فعلاً",
          p: "المُصحّحون الذين يقرؤون عشرات الأبحاث المتشابهة يكافئون حجّة يستطيعون متابعتها دون إعادة قراءة جملة، حتى داخل تخصّص يتحمّل نثراً معقّداً عموماً. وجملة كثيفة لدرجة أن المُصحّح يحلّلها مرتين لا تُظهر تطوّراً — إنها تكلّفك اللحظة التي كان يجب أن تصل فيها نقطتك بوضوح. قسّم الجملة الحاملة في أطروحتك وجمل موضوع فقراتك تحديداً، حتى لو تركت جمل التفاصيل الداعمة أكثر تعقيداً.",
        },
        {
          h: "ما لا تستطيع الدرجة إخبارك به عن بحثك",
          p: "تقيس شيئين فقط: طول الجملة وثقل الكلمة. لا تستطيع رؤية هل تتماسك حجّتك، ولا هل يدعم دليلك ادعاءك فعلاً، ولا هل تُنظّم بنيتك منطقياً. بحث سهل القراءة تقنياً يحتجّ بلا تماسك سيحصل على درجة جيدة ويحصل رغم ذلك على تقدير ضعيف — استخدم هذا كأداة تحرير واحدة من عدّة، لا مؤشّراً بديلاً لجودة البحث.",
        },
        {
          h: "مستوى القراءة والكتابة النزيهة بلغة ثانية",
          p: "إن كتبت بالإنجليزية أو العربية كلغة ثانية، فقد يُسجَّل نثرك بشكل مختلف عن نثر ناطق أصلي لأسباب لا علاقة لها بجودة الحجّة — البناء الجملي المتحرّي المضبوط يُقرأ أكثر تعقيداً أو أكثر بساطة ممّا قُصد حسب المعادلة. استخدم الدرجة كنقطة بيانات واحدة من عدّة، وثق بتعليقات قارئ بشري على الرقم حين يختلفان.",
        },
      ],
      rules: [
        { when: "بحثك يسجّل تحت ٣٠", then: "تحقّق هل هذا مناسب لتخصّصك قبل معاملته كمشكلة — النثر الأكاديمي يقع منخفضاً بحقّ." },
        { when: "جملة طويلة مُميَّزة تحتوي ثلاث أفكار منفصلة", then: "قسّمها لثلاث جمل. هذه الحالة الوحيدة التي تمسكها الدرجة المنخفضة بموثوقية وتستحق الإصلاح." },
        { when: "أطروحتك أو جمل موضوع فقراتك كثيفة", then: "بسّط هذه تحديداً، حتى لو تركت التفاصيل الداعمة أكثر تعقيداً. الجمل الحاملة هي الأهمّ." },
        { when: "الدرجة جيدة لكن حجّتك تبدو غير واضحة", then: "الأداة لا ترى ذلك — احصل على تعليق قارئ بشري. سهولة القراءة والتماسك مشكلتان مختلفتان." },
      ],
      faq: [
        { q: "هل أستهدف الدرجة نفسها ٥٠–٧٠ ككتابة المدوّنات؟", a: "لا — النثر الأكاديمي يسجّل أدنى بحقّ لأنه يتطلّب جملاً مقيّدة دقيقة سينزعها هدف محتوى الويب. طابق التوقّع مع تخصّصك ونوع واجبك." },
        { q: "هل ستخفض درجة سهولة القراءة المنخفضة تقديري؟", a: "ليس مباشرة — لا معيار تصحيح قياسي يقيّم على هذه الدرجة. ما يكلّف الدرجات فعلاً حجّة لا يستطيع المُصحّح متابعتها، وهذا يرتبط أحياناً لا دائماً بدرجة منخفضة." },
        { q: "هل يُغني هذا عن التدقيق؟", a: "لا. يقيس طول الجملة وثقل الكلمة فقط — لا يستطيع فحص حجّتك أو دليلك أو استشهاداتك أو قواعدك. استخدمه مع قراءة كاملة لا بدلاً منها." },
        { q: "لماذا يسجّل بحثي بشكل مختلف بالعربية عن الإنجليزية؟", a: "ثقل الكلمة العربية يُقدَّر من بنية الحروف بدل عدّ المقاطع الإنجليزي، لأن العربية تحزم المعنى بصرف الجذر والوزن بشكل مختلف — الدرجتان غير قابلتين للمقارنة المباشرة." },
        { q: "هل بحثي خاص حين ألصقه هنا؟", a: "نعم. الفحص يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ، فلصق مسودّة غير مُسلَّمة آمن." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "teachers",
    order: 3,
    related: [
      { href: "/blog/ai-writing-policy-for-teams", en: "Writing a policy people actually follow", ar: "كتابة سياسة يلتزم بها الناس فعلاً" },
      { href: "/ai-detector/teachers", en: "Read a detector score without misusing it", ar: "اقرأ نتيجة الكاشف دون سوء استخدامها" },
      { href: "/readability-checker/students", en: "What students should know about their own score", ar: "ما ينبغي أن يعرفه الطلاب عن درجتهم" },
    ],
    en: {
      h1: "Readability Checker for Teachers & Educators",
      metaTitle: "Readability Checker for Teachers — Matching Materials to Reading Level",
      metaDescription:
        "Checking whether a handout, a worksheet, or a set of instructions actually matches the reading level of the students receiving it — not grading a student's essay against an adult writing target.",
      lede:
        "The readability question a teacher usually has is different from the one a content writer has: not \"does this read well for a general adult audience\" but \"does this specific handout match the reading level of the specific students receiving it.\" A worksheet pitched two grade levels above your class doesn't fail because it's badly written — it fails because it's aimed at the wrong reader entirely.",
      sections: [
        {
          h: "What this tool can and can't tell you about grade level",
          p: "This checker reports a general readability score and an audience band (from \"suits any reader\" down to \"academic or technical readers only\"), not a precise grade-level number the way specialised education formulas do. Use it as a relative signal — is this handout noticeably denser than the one that worked well last term — rather than a definitive grade-level match.",
        },
        {
          h: "Checking your own instructional materials before you use them",
          p: "Worksheets, handouts, and assignment instructions benefit from the same check as any other writing, and instructions specifically suffer when they're dense — a student who has to reread a three-clause instruction sentence twice is spending attention on parsing the instruction rather than doing the task it describes. Split compound instructions into numbered steps rather than one dense sentence covering all of them.",
        },
        {
          h: "Reading level and a text you didn't write yourself",
          p: "Checking a textbook excerpt, a news article, or another source you're assigning tells you whether the source material itself is likely to be a barrier independent of the content's difficulty — a scientifically accurate article written at a dense reading level may need scaffolding (vocabulary support, a guided read-aloud) even for capable students, purely because of its sentence structure rather than its ideas.",
        },
        {
          h: "Where a low score on student writing is not the problem to flag",
          p: "A student essay that scores low because the student writes in a second language, or because the assignment genuinely called for complex, qualified argument, is not automatically a writing-quality problem — this is the same distinction that matters for students checking their own work, and it's worth applying the same way when you're the one reading it. Use the score to catch genuinely tangled run-on sentences, not to penalise complexity that's doing real work.",
        },
        {
          h: "Building a reading-level check into materials review, not just individual pieces",
          p: "If you're reviewing a full unit's worth of handouts, checking each one takes a few seconds and catches drift that's easy to miss piece by piece — a unit that starts accessible and gradually gets denser as you wrote later sections under time pressure is common and worth catching before students hit the density wall midway through.",
        },
      ],
      rules: [
        { when: "You're checking a handout or worksheet", then: "Compare it against materials that worked well previously, not against an absolute number — this is a relative check, not a certified grade-level match." },
        { when: "Instructions have compound, multi-clause sentences", then: "Split them into numbered steps. Dense instructions cost attention on parsing rather than doing the task." },
        { when: "A student's essay scores low", then: "Check whether that's second-language writing or genuinely complex argument before treating it as a quality issue." },
        { when: "You're reviewing a full unit's materials", then: "Check each piece — density often drifts upward across a unit written over time, and it's easy to miss without checking individually." },
      ],
      faq: [
        { q: "Does this give me a precise grade-level number like Flesch-Kincaid?", a: "It gives a general score and audience band rather than a specific grade-level figure. For formal grade-level matching (textbook adoption, standardised assessment materials), a specialised education-specific tool is more appropriate." },
        { q: "Should I grade a student's essay based on this score?", a: "No — it isn't a quality measure, and a low score can reflect appropriate academic complexity or second-language writing rather than a problem. Use it to spot genuinely tangled sentences, not to grade." },
        { q: "Can I check a textbook excerpt I'm assigning?", a: "Yes — this is one of the more useful applications, since it tells you whether the source material itself may need scaffolding for your students independent of how they write." },
        { q: "Does it work for Arabic teaching materials?", a: "Yes, with word weight estimated from Arabic letter structure rather than English syllable-counting, which is necessary since Arabic's morphology doesn't map onto English readability formulas." },
        { q: "Is the material I paste in private?", a: "Yes. The check runs entirely in your browser — nothing is uploaded or stored, so pasting unpublished materials or student work is safe." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة للمعلّمين والمربّين",
      metaTitle: "فاحص سهولة القراءة للمعلّمين — مطابقة المواد لمستوى القراءة",
      metaDescription:
        "فحص هل تطابق ورقة عمل أو نشرة أو مجموعة تعليمات مستوى قراءة الطلاب المستهدَفين فعلاً — لا تقييم بحث طالب مقابل هدف كتابة بالغين.",
      lede:
        "سؤال سهولة القراءة الذي يطرحه المعلّم عادةً يختلف عن سؤال كاتب المحتوى: ليس «هل تُقرأ هذه جيداً لجمهور بالغ عام» بل «هل تطابق هذه النشرة تحديداً مستوى قراءة طلابي المحدَّدين». وورقة عمل مصمَّمة لمستويين دراسيين أعلى من صفّك لا تفشل لأنها مكتوبة بسوء — بل لأنها تستهدف قارئاً خاطئاً تماماً.",
      sections: [
        {
          h: "ما تستطيع هذه الأداة إخبارك به عن المستوى الدراسي وما لا تستطيعه",
          p: "يعرض هذا الفاحص درجة سهولة قراءة عامة ونطاق جمهور (من «يناسب أي قارئ» إلى «للقارئ الأكاديمي أو التقني فقط»)، لا رقماً دراسياً دقيقاً كما تفعل معادلات تعليمية متخصّصة. استخدمه كإشارة نسبية — هل هذه النشرة أكثف بوضوح من التي نجحت الفصل الماضي — لا مطابقة دراسية نهائية.",
        },
        {
          h: "فحص موادك التعليمية بنفسك قبل استخدامها",
          p: "أوراق العمل والنشرات وتعليمات الواجبات تستفيد من الفحص نفسه كأي كتابة أخرى، والتعليمات تحديداً تعاني حين تكون كثيفة — والطالب الذي يعيد قراءة جملة تعليمات ذات ثلاث فقرات مرتين ينفق انتباهه على فهم التعليمة لا على أداء المهمّة التي تصفها. قسّم التعليمات المركّبة لخطوات مرقّمة بدل جملة كثيفة واحدة تغطّيها كلها.",
        },
        {
          h: "مستوى القراءة ونصّ لم تكتبه أنت",
          p: "فحص مقتطف من كتاب مدرسي أو مقال إخباري أو مصدر آخر تُكلّف به يخبرك هل المادة المصدرية نفسها قد تكون عائقاً بمعزل عن صعوبة المضمون — مقال دقيق علمياً مكتوب بمستوى قراءة كثيف قد يحتاج دعامة (دعم مفردات، قراءة موجَّهة بصوت عالٍ) حتى لطلاب أكفاء، لمجرّد بنية جمله لا أفكاره.",
        },
        {
          h: "أين لا تكون الدرجة المنخفضة في كتابة الطالب المشكلة التي تُميَّز",
          p: "بحث طالب يسجّل منخفضاً لأن الطالب يكتب بلغة ثانية، أو لأن الواجب يستدعي حجّة معقّدة مقيّدة فعلاً، ليس تلقائياً مشكلة جودة كتابة — هذا التمييز نفسه المهمّ للطلاب الذين يفحصون عملهم، ويستحق تطبيقه بالطريقة نفسها حين تكون أنت من يقرأ. استخدم الدرجة لالتقاط جمل متراكِبة متشابكة فعلاً، لا لمعاقبة تعقيد يؤدّي عملاً حقيقياً.",
        },
        {
          h: "بناء فحص مستوى القراءة في مراجعة المواد لا القطع الفردية فقط",
          p: "إن كنت تراجع نشرات وحدة كاملة، فحص كل واحدة يأخذ ثوانٍ قليلة ويمسك انحرافاً يسهل تفويته قطعة قطعة — وحدة تبدأ سهلة الوصول وتزداد كثافة تدريجياً لأنك كتبت أقسامها اللاحقة تحت ضغط وقت أمر شائع ويستحق التقاطه قبل أن يصطدم الطلاب بجدار الكثافة في المنتصف.",
        },
      ],
      rules: [
        { when: "تفحص نشرة أو ورقة عمل", then: "قارنها بمواد نجحت سابقاً، لا برقم مطلق — هذا فحص نسبي لا مطابقة دراسية معتمَدة." },
        { when: "التعليمات جمل مركّبة متعدّدة الفقرات", then: "قسّمها لخطوات مرقّمة. التعليمات الكثيفة تكلّف انتباهاً في الفهم لا في أداء المهمّة." },
        { when: "بحث طالب يسجّل منخفضاً", then: "تحقّق هل هي كتابة بلغة ثانية أو حجّة معقّدة فعلاً قبل معاملتها كمشكلة جودة." },
        { when: "تراجع مواد وحدة كاملة", then: "افحص كل قطعة — الكثافة غالباً تنحرف صعوداً عبر وحدة كُتبت بمرور الوقت، ويسهل تفويتها دون فحص فردي." },
      ],
      faq: [
        { q: "هل يعطيني هذا رقماً دراسياً دقيقاً مثل Flesch-Kincaid؟", a: "يعطي درجة عامة ونطاق جمهور لا رقماً دراسياً محدداً. للمطابقة الدراسية الرسمية (اعتماد كتاب مدرسي، مواد تقييم موحّدة)، أداة تعليمية متخصّصة أنسب." },
        { q: "هل أُقيّم بحث طالب بناءً على هذه الدرجة؟", a: "لا — ليست مقياس جودة، والدرجة المنخفضة قد تعكس تعقيداً أكاديمياً مناسباً أو كتابة بلغة ثانية لا مشكلة. استخدمها لرصد جمل متشابكة فعلاً، لا للتقييم." },
        { q: "هل أستطيع فحص مقتطف كتاب مدرسي أُكلّف به؟", a: "نعم — هذا من أكثر الاستخدامات فائدة، لأنه يخبرك هل المادة المصدرية نفسها قد تحتاج دعامة لطلابك بمعزل عن كيفية كتابتهم هم." },
        { q: "هل يعمل مع المواد التعليمية العربية؟", a: "نعم، بتقدير ثقل الكلمة من بنية الحروف العربية بدل عدّ المقاطع الإنجليزي، وهذا ضروري لأن صرف العربية لا ينطبق على معادلات سهولة القراءة الإنجليزية." },
        { q: "هل المادة التي ألصقها خاصة؟", a: "نعم. الفحص يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ، فلصق مواد غير منشورة أو عمل طالب آمن." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "technical-writers",
    order: 4,
    related: [
      { href: "/word-counter/thesis-and-journals", en: "Word limits for technical and academic documents", ar: "حدود الكلمات للمستندات التقنية والأكاديمية" },
      { href: "/ai-humanizer", en: "Fix documentation that reads stiff", ar: "أصلح توثيقاً يُقرأ متصلّباً" },
      { href: "/ai-detector/research-papers", en: "Why technical sections score differently", ar: "لماذا تسجّل الأقسام التقنية بشكل مختلف" },
    ],
    en: {
      h1: "Readability Checker for Technical Writers",
      metaTitle: "Readability Checker for Documentation — Why the 50–70 Target Is Wrong Here",
      metaDescription:
        "Technical documentation that scores 70 has often lost the precision that makes it correct. What band actually serves a developer or engineer reader, and where clarity still genuinely matters.",
      lede:
        "The 50–70 readability band recommended for general web content is frequently the wrong target for technical documentation, because precision in technical writing depends on specific terminology and qualified statements a general-audience formula penalises. The right question for documentation isn't \"is this simple\" but \"does this reader, with their specific background, get through this without confusion.\"",
      sections: [
        {
          h: "Why documentation legitimately scores lower, and that's often fine",
          p: "API references, technical specifications, and engineering documentation use precise terminology and conditional statements (\"if X, then Y, unless Z\") that a general readability formula reads as complexity to penalise. A reference doc rewritten to hit 70 has often had its precision quietly removed along with its density — check whether a lower score reflects necessary precision before treating it as a problem.",
        },
        {
          h: "Where the score still catches a real problem: accidental complexity",
          p: "There's a meaningful difference between complexity the subject requires and complexity that crept in because a sentence tried to cover a main case, an edge case, and a caveat all in one breath. The tool's long-sentence flag is genuinely useful here — check each flagged sentence for whether it's doing one necessary job or three separate ones that should be split, possibly into a list.",
        },
        {
          h: "Structure matters more than sentence-level score for this content type",
          p: "Numbered steps, code blocks, and short declarative sentences in a procedure (\"Click Save. The dialog closes.\") often score as choppy on a formula built for prose, while actually being the clearest possible format for a task-oriented reader. Don't let the score push you toward combining short procedural steps into flowing prose — that makes documentation worse specifically for the reader trying to follow along while doing the task.",
        },
        {
          h: "Writing for a reader with domain knowledge you can assume",
          p: "Documentation aimed at developers who already know the language, or engineers who already know the domain, can and should use domain terminology without redefining it every time — that's accurate writing for the actual audience, not inaccessible writing. The readability formula can't tell the difference between jargon that's appropriate for your reader and jargon that isn't; only knowing your actual audience can.",
        },
        {
          h: "When to actually simplify: onboarding and first-run content",
          p: "The genuine exception is documentation aimed at someone new to the product or the domain — a quickstart guide or first-time setup page benefits from the same clarity push general web content does, because that reader hasn't yet earned the background your reference docs can assume. Match the target band to where in the reader's journey this specific document sits, not to a single house-wide standard.",
        },
      ],
      rules: [
        { when: "A reference doc scores under 40", then: "Check whether that reflects necessary precision before rewriting — technical accuracy and a low score often go together legitimately." },
        { when: "A flagged sentence covers a main case, an edge case, and a caveat at once", then: "Split it, potentially into a list. This is genuine accidental complexity worth fixing." },
        { when: "Procedural steps score as choppy", then: "Leave them short. Short declarative steps are correct for task-following, not a readability problem to smooth over." },
        { when: "You're writing a quickstart or onboarding guide", then: "Push for a higher score here specifically — this reader hasn't earned the background your other docs can assume." },
      ],
      faq: [
        { q: "Should technical documentation target the same 50–70 as blog content?", a: "No — precise technical writing often scores lower legitimately, because the formula penalises the specific terminology and conditional statements that make the documentation accurate." },
        { q: "Does a low score mean my documentation is badly written?", a: "Not necessarily. Check whether the complexity is doing real work (precise conditional logic, correct terminology) or is accidental (three ideas crammed into one sentence) — only the second is worth fixing." },
        { q: "Why do my numbered steps score as hard to read?", a: "Formulas built for prose don't account for structural formatting like numbered lists well. Short, clear procedural steps are usually correct as written despite what the score suggests." },
        { q: "Is there a better tool for grading documentation specifically?", a: "Specialised documentation style guides (many organisations publish their own) address structure, terminology consistency, and voice more directly than a general readability formula can — use this tool for the sentence-level check, and a style guide for everything else." },
        { q: "Does it work for Arabic technical documentation?", a: "Yes, with word weight estimated from Arabic letter structure — useful given how little Arabic-language technical documentation tooling exists compared to English." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة للكتّاب التقنيين",
      metaTitle: "فاحص سهولة القراءة للتوثيق — لماذا هدف ٥٠–٧٠ خاطئ هنا",
      metaDescription:
        "توثيق تقني يسجّل ٧٠ غالباً فقد الدقّة التي تجعله صحيحاً. أي نطاق يخدم فعلاً قارئاً مطوّراً أو مهندساً، وأين ما زال الوضوح يهمّ فعلاً.",
      lede:
        "نطاق سهولة القراءة ٥٠–٧٠ المُوصى به لمحتوى الويب العام غالباً هدف خاطئ للتوثيق التقني، لأن الدقّة في الكتابة التقنية تعتمد على مصطلحات محددة وعبارات مقيّدة تعاقبها معادلة مبنية لجمهور عام. السؤال الصحيح للتوثيق ليس «هل هذا بسيط» بل «هل يمرّ هذا القارئ، بخلفيته المحددة، دون التباس».",
      sections: [
        {
          h: "لماذا يسجّل التوثيق أدنى بحقّ، وهذا غالباً مقبول",
          p: "مراجع API والمواصفات التقنية والتوثيق الهندسي تستخدم مصطلحات دقيقة وعبارات شرطية («إن كان س فـص، إلا إذا كان ع») تقرؤها معادلة سهولة القراءة العامة كتعقيد يستحق العقاب. ومستند مرجعي أُعيدت صياغته ليبلغ ٧٠ غالباً فقد دقّته بصمت مع كثافته. تحقّق هل تعكس الدرجة المنخفضة دقّة ضرورية قبل معاملتها كمشكلة.",
        },
        {
          h: "أين تمسك الدرجة فعلاً مشكلة حقيقية: التعقيد العرضي",
          p: "يوجد فرق ذو معنى بين تعقيد يستلزمه الموضوع وتعقيد تسلّل لأن جملة حاولت تغطية حالة رئيسية وحالة حدّية وتحفّظ في نفس واحد. علامة الجملة الطويلة في الأداة مفيدة فعلاً هنا — افحص كل جملة مُميَّزة هل تؤدّي عملاً واحداً ضرورياً أم ثلاثة أعمال منفصلة يجب تقسيمها، ربما لقائمة.",
        },
        {
          h: "البنية تهمّ أكثر من درجة مستوى الجملة لهذا النوع من المحتوى",
          p: "الخطوات المرقّمة وكتل الشيفرة والجمل التقريرية القصيرة في إجراء («اضغط حفظ. يُغلق مربّع الحوار.») غالباً تسجّل كمقتضبة في معادلة مبنية للنثر، بينما هي فعلياً أوضح صيغة ممكنة لقارئ موجَّه لمهمّة. لا تدع الدرجة تدفعك لدمج خطوات إجرائية قصيرة في نثر متدفّق — هذا يجعل التوثيق أسوأ تحديداً للقارئ الذي يتّبعه أثناء أداء المهمّة.",
        },
        {
          h: "الكتابة لقارئ يمكنك افتراض معرفته بالمجال",
          p: "توثيق موجَّه لمطوّرين يعرفون اللغة أصلاً، أو مهندسين يعرفون المجال أصلاً، يستطيع بل ينبغي أن يستخدم مصطلحات المجال دون إعادة تعريفها كل مرة — هذه كتابة دقيقة للجمهور الفعلي، لا كتابة غير قابلة للوصول. معادلة سهولة القراءة لا تستطيع التمييز بين مصطلح تقني مناسب لقارئك وآخر غير مناسب؛ معرفة جمهورك الفعلي وحدها تستطيع.",
        },
        {
          h: "متى تُبسّط فعلاً: محتوى التهيئة والاستخدام الأول",
          p: "الاستثناء الحقيقي توثيق موجَّه لشخص جديد على المنتج أو المجال — دليل بدء سريع أو صفحة إعداد أول تستفيد من دفعة الوضوح نفسها التي يستفيدها محتوى الويب العام، لأن ذلك القارئ لم يكتسب بعد الخلفية التي يستطيع توثيقك المرجعي افتراضها. طابق النطاق المستهدف مع موضع هذا المستند تحديداً في رحلة القارئ، لا بمعيار موحّد للمؤسسة كلها.",
        },
      ],
      rules: [
        { when: "مستند مرجعي يسجّل تحت ٤٠", then: "تحقّق هل يعكس دقّة ضرورية قبل إعادة الصياغة — الدقّة التقنية والدرجة المنخفضة تجتمعان بحقّ كثيراً." },
        { when: "جملة مُميَّزة تغطّي حالة رئيسية وحدّية وتحفّظاً دفعة واحدة", then: "قسّمها، ربما لقائمة. هذا تعقيد عرضي حقيقي يستحق الإصلاح." },
        { when: "خطوات إجرائية تسجّل كمقتضبة", then: "أبقها قصيرة. الخطوات التقريرية القصيرة صحيحة لمتابعة المهمّة، لا مشكلة سهولة قراءة تحتاج تنعيماً." },
        { when: "تكتب دليل بدء سريع أو تهيئة", then: "ادفع لدرجة أعلى هنا تحديداً — هذا القارئ لم يكتسب الخلفية التي تستطيع مستنداتك الأخرى افتراضها." },
      ],
      faq: [
        { q: "هل يستهدف التوثيق التقني النطاق نفسه ٥٠–٧٠ لمحتوى المدوّنات؟", a: "لا — الكتابة التقنية الدقيقة غالباً تسجّل أدنى بحقّ، لأن المعادلة تعاقب المصطلحات المحددة والعبارات الشرطية التي تجعل التوثيق دقيقاً." },
        { q: "هل تعني الدرجة المنخفضة أن توثيقي مكتوب بسوء؟", a: "ليس بالضرورة. تحقّق هل التعقيد يؤدّي عملاً حقيقياً (منطق شرطي دقيق، مصطلحات صحيحة) أم عرضي (ثلاث أفكار محشورة في جملة واحدة) — الثاني فقط يستحق الإصلاح." },
        { q: "لماذا تسجّل خطواتي المرقّمة كصعبة القراءة؟", a: "المعادلات المبنية للنثر لا تحسب التنسيق البنيوي كالقوائم المرقّمة جيداً. الخطوات الإجرائية القصيرة الواضحة عادةً صحيحة كما كُتبت رغم ما تُوحيه الدرجة." },
        { q: "هل توجد أداة أفضل لتقييم التوثيق تحديداً؟", a: "أدلّة أسلوب التوثيق المتخصّصة (كثير من المؤسسات تنشر أدلّتها الخاصة) تعالج البنية واتّساق المصطلحات والصوت بشكل مباشر أكثر ممّا تستطيعه معادلة سهولة قراءة عامة — استخدم هذه الأداة للفحص على مستوى الجملة، ودليل الأسلوب لكل شيء آخر." },
        { q: "هل يعمل مع التوثيق التقني العربي؟", a: "نعم، بتقدير ثقل الكلمة من بنية الحروف العربية — مفيد نظراً لقلّة أدوات التوثيق التقني العربي مقارنةً بالإنجليزية." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "plain-language-comms",
    order: 5,
    related: [
      { href: "/word-counter", en: "Check length limits for public notices", ar: "افحص حدود الطول للإشعارات العامة" },
      { href: "/ai-humanizer", en: "Rewrite a stiff notice into plain language", ar: "أعد صياغة إشعار متصلّب بلغة بسيطة" },
      { href: "/blog/arabic-writing-in-the-ai-era", en: "Arabic writing in the AI era", ar: "الكتابة العربية في عصر الذكاء الاصطناعي" },
    ],
    en: {
      h1: "Readability Checker for Plain-Language Communications",
      metaTitle: "Readability Checker for Plain Language — Government, Health & Legal Comms",
      metaDescription:
        "Plain-language writing for public notices, health information, and government communication isn't a style preference — many jurisdictions and organisations treat it as a compliance requirement with a specific target band.",
      lede:
        "Plain-language writing exists as a distinct professional discipline because the audience for a public notice, a health instruction, or a benefits form cannot be assumed to have any particular reading level, education, or first language — and getting it wrong has real consequences, from a missed medical instruction to a form nobody completes correctly. This is the one use case on this site where a readability score is closest to a compliance number rather than a stylistic guideline.",
      sections: [
        {
          h: "Why this differs from general web writing",
          p: "General web content aims for 50–70 because that suits a broad but self-selected online audience. Plain-language communication — a hospital discharge instruction, a tax form's explanatory text, a public safety notice — often targets higher still, because the audience didn't choose to read this and can't be assumed to have the patience or background a blog reader brings. Several government plain-language standards specifically reference a lower grade-level target than general web writing.",
        },
        {
          h: "The stakes are different, so the standard should be too",
          p: "A confusing blog post costs a reader's attention. A confusing set of medication instructions, evacuation directions, or benefits eligibility criteria costs something more serious — a missed dose, a wrong decision, a form rejected for an error the writer's phrasing caused. Treat the readability target here as a floor to clear, not a suggestion to consider.",
        },
        {
          h: "Sentence length matters even more here than elsewhere",
          p: "One instruction per sentence is the single most important discipline in plain-language writing: \"Take one tablet in the morning. Take one tablet at night. Do not take more than two tablets in one day\" outperforms a single compound sentence covering all three points, even though the compound version is grammatically correct and would score acceptably on a general web-content target.",
        },
        {
          h: "Plain language is not the same as vague language",
          p: "Simplifying sentence structure should never mean simplifying the actual information — a plain-language rewrite that removes a specific dosage, a specific deadline, or a specific eligibility condition to sound friendlier has made the document worse, not better. The goal is the same precise information delivered with less structural friction, not less information.",
        },
        {
          h: "Arabic plain-language writing has its own conventions",
          p: "Plain-language Arabic communication faces a specific tension between formal register (expected for official notices) and genuine accessibility (short sentences, common vocabulary, minimal subordinate clauses) — the two pulls don't resolve the same way they do in English, where formality and plainness aren't as directly in tension. Check with native-speaker review specifically for tone alongside the structural readability check.",
        },
      ],
      rules: [
        { when: "You're writing a public notice, form, or health instruction", then: "Target a higher score than general web content — the audience didn't opt in and can't be assumed to have reading patience to spare." },
        { when: "A sentence covers more than one instruction", then: "Split it. One instruction per sentence is the single highest-value habit in plain-language writing." },
        { when: "A plain-language rewrite feels like it lost specific information", then: "Check it against the original. Simpler structure should never mean less precise content." },
        { when: "You're writing formal Arabic public communication", then: "Get native-speaker tone review alongside the structural score — formality and plainness pull against each other differently than in English." },
      ],
      faq: [
        { q: "Is plain language the same as a low reading level?", a: "Related but not identical — plain language is about removing unnecessary structural and vocabulary barriers while keeping all the actual information, not about reducing the content's substance or sounding condescending." },
        { q: "Is there a legal requirement for plain language in some contexts?", a: "In several jurisdictions, yes, for specific document types like government forms and consumer contracts — check your specific jurisdiction's requirements, since this tool checks readability structure but doesn't verify legal compliance." },
        { q: "Why does my confusing sentence still score acceptably?", a: "The formula measures sentence length and word weight, not clarity of instruction. A grammatically simple but ambiguously worded sentence can score fine while still confusing a reader — read for clarity in addition to checking the score." },
        { q: "Does plain language mean removing all technical terms?", a: "No — where a technical term is the correct, necessary word (a specific medication name, a specific legal term), define it briefly on first use rather than avoiding it, which can introduce its own confusion or inaccuracy." },
        { q: "Is the text I check here private?", a: "Yes. The check runs entirely in your browser — nothing is uploaded or stored, so pasting a draft notice or form is safe before it's finalised." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة للتواصل باللغة البسيطة",
      metaTitle: "فاحص سهولة القراءة للغة البسيطة — تواصل حكومي وصحي وقانوني",
      metaDescription:
        "الكتابة باللغة البسيطة للإشعارات العامة والمعلومات الصحية والتواصل الحكومي ليست تفضيلاً أسلوبياً — كثير من الجهات والمؤسسات تعاملها كمتطلّب امتثال بنطاق مستهدف محدد.",
      lede:
        "الكتابة باللغة البسيطة قائمة كتخصّص مهني مستقلّ لأن جمهور إشعار عام أو تعليمة صحية أو نموذج مزايا لا يمكن افتراض مستوى قراءته أو تعليمه أو لغته الأولى — وأخطاؤها لها عواقب حقيقية، من تعليمة طبية فائتة إلى نموذج لا يكمله أحد بصحة. هذه الحالة الوحيدة على هذا الموقع حيث تقترب درجة سهولة القراءة من رقم امتثال لا إرشاد أسلوبي.",
      sections: [
        {
          h: "لماذا يختلف هذا عن كتابة الويب العامة",
          p: "محتوى الويب العام يستهدف ٥٠–٧٠ لأن ذلك يناسب جمهوراً واسعاً لكنه اختار نفسه بنفسه على الإنترنت. أما التواصل باللغة البسيطة — تعليمة خروج من مستشفى، ونصّ توضيحي لنموذج ضريبي، وإشعار سلامة عامة — فغالباً يستهدف أعلى من ذلك، لأن الجمهور لم يختر قراءة هذا ولا يمكن افتراض صبره أو خلفيته التي يجلبها قارئ مدوّنة. عدّة معايير حكومية للغة البسيطة تُشير تحديداً إلى هدف مستوى دراسي أدنى من كتابة الويب العامة.",
        },
        {
          h: "المخاطر مختلفة، لذا ينبغي أن يكون المعيار كذلك",
          p: "منشور مدوّنة مُلتبس يكلّف انتباه القارئ. ومجموعة تعليمات دوائية أو توجيهات إخلاء أو معايير أهلية مزايا مُلتبسة تكلّف شيئاً أخطر — جرعة فائتة، أو قراراً خاطئاً، أو نموذجاً يُرفض بسبب خطأ سبّبته صياغة الكاتب. عامل هدف سهولة القراءة هنا كحدّ أدنى يجب بلوغه لا اقتراحاً للنظر فيه.",
        },
        {
          h: "طول الجملة يهمّ هنا أكثر من أي مكان آخر",
          p: "تعليمة واحدة لكل جملة هي الانضباط الأهمّ في الكتابة باللغة البسيطة: «تناول قرصاً واحداً صباحاً. تناول قرصاً واحداً مساءً. لا تتجاوز قرصين في اليوم» يفوق أداءً جملة مركّبة واحدة تغطّي النقاط الثلاث، حتى لو كانت النسخة المركّبة سليمة نحوياً وستسجّل مقبولة بهدف محتوى ويب عام.",
        },
        {
          h: "اللغة البسيطة ليست اللغة الغامضة",
          p: "تبسيط بنية الجملة يجب ألّا يعني تبسيط المعلومة نفسها — إعادة صياغة بلغة بسيطة تحذف جرعة محددة أو موعداً نهائياً محدداً أو شرط أهلية محدداً لتبدو أودّ جعلت المستند أسوأ لا أفضل. الهدف المعلومة الدقيقة نفسها مُقدَّمة باحتكاك بنيوي أقلّ، لا معلومات أقلّ.",
        },
        {
          h: "الكتابة العربية باللغة البسيطة لها أعرافها الخاصة",
          p: "التواصل العربي باللغة البسيطة يواجه توتّراً محدداً بين السجلّ الرسمي (المتوقّع للإشعارات الرسمية) والوصول الحقيقي (جمل قصيرة، مفردات شائعة، جمل فرعية قليلة) — والاتجاهان لا يُحلّان بالطريقة نفسها كما في الإنجليزية، حيث الرسمية والبساطة ليستا في توتّر مباشر بالقدر نفسه. احصل على مراجعة نبرة من ناطق أصلي تحديداً إلى جانب فحص سهولة القراءة البنيوي.",
        },
      ],
      rules: [
        { when: "تكتب إشعاراً عاماً أو نموذجاً أو تعليمة صحية", then: "استهدف درجة أعلى من محتوى الويب العام — الجمهور لم يختر ولا يمكن افتراض صبر قراءة لديه." },
        { when: "جملة تغطّي أكثر من تعليمة واحدة", then: "قسّمها. تعليمة واحدة لكل جملة هي العادة الأعلى قيمة في الكتابة باللغة البسيطة." },
        { when: "إعادة صياغة بلغة بسيطة تبدو فقدت معلومة محددة", then: "قارنها بالأصل. البنية الأبسط يجب ألّا تعني محتوى أقلّ دقّة أبداً." },
        { when: "تكتب تواصلاً عربياً رسمياً عاماً", then: "احصل على مراجعة نبرة من ناطق أصلي إلى جانب الدرجة البنيوية — الرسمية والبساطة تتجاذبان بشكل مختلف عن الإنجليزية." },
      ],
      faq: [
        { q: "هل اللغة البسيطة هي نفسها مستوى قراءة منخفض؟", a: "مرتبطتان لكن غير متطابقتين — اللغة البسيطة تتعلّق بإزالة عوائق بنيوية ومفرداتية غير ضرورية مع الحفاظ على كل المعلومة الفعلية، لا بتقليل جوهر المحتوى أو الظهور بشكل متعالٍ." },
        { q: "هل يوجد متطلّب قانوني للغة البسيطة في بعض السياقات؟", a: "في عدّة جهات، نعم، لأنواع مستندات محددة كالنماذج الحكومية وعقود المستهلكين — تحقّق من متطلّبات جهتك تحديداً، إذ تفحص هذه الأداة بنية سهولة القراءة لا تتحقّق من الامتثال القانوني." },
        { q: "لماذا تسجّل جملتي المُلتبسة درجة مقبولة رغم ذلك؟", a: "المعادلة تقيس طول الجملة وثقل الكلمة لا وضوح التعليمة. جملة بسيطة نحوياً لكن غامضة الصياغة قد تسجّل جيداً وتظلّ تُربك القارئ — اقرأ للوضوح إضافةً لفحص الدرجة." },
        { q: "هل تعني اللغة البسيطة حذف كل المصطلحات التقنية؟", a: "لا — حيث يكون المصطلح التقني الكلمة الصحيحة الضرورية (اسم دواء محدد، مصطلح قانوني محدد)، عرّفه بإيجاز عند أول استخدام بدل تجنّبه، وهذا قد يُدخل التباساً أو عدم دقّة خاصاً به." },
        { q: "هل النص الذي أفحصه هنا خاص؟", a: "نعم. الفحص يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ، فلصق مسودّة إشعار أو نموذج آمن قبل تثبيته النهائي." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "email-marketing",
    order: 6,
    related: [
      { href: "/word-counter/social-media-ads", en: "Character limits for subject lines and ads", ar: "حدود الأحرف لعناوين الرسائل والإعلانات" },
      { href: "/ai-humanizer/business-writing", en: "Fix an email that reads like a template", ar: "أصلح إيميلاً يُقرأ كقالب" },
      { href: "/blog/humanizer-styles-when-to-use", en: "Which humanizer style to use, and when", ar: "أي أسلوب تنسين تختار، ومتى" },
    ],
    en: {
      h1: "Readability Checker for Email & Marketing Copy",
      metaTitle: "Readability Checker for Marketing Copy — Scannable Beats Simple",
      metaDescription:
        "A marketing email is read in seconds by someone deciding whether to keep reading at all. The readability target that actually correlates with opens turning into clicks, not just a generic simplicity goal.",
      lede:
        "Marketing and email copy is read under conditions closer to skimming than to reading — a subscriber deciding in a few seconds whether this email is worth their attention, scrolling a phone screen rather than sitting with a document. The readability target here is less about comprehension difficulty and more about how much friction stands between a scan and a click.",
      sections: [
        {
          h: "Why marketing copy should score higher than a typical blog post",
          p: "General web content aims for 50–70; marketing and email copy usually benefits from pushing toward the top of that range or slightly above, because the reader's attention budget is shorter than a blog reader's. A subject line, a preview text, and the email's opening line carry disproportionate weight — check those specifically, not just the body as a whole.",
        },
        {
          h: "Scannable structure matters as much as sentence-level score",
          p: "Short paragraphs, one idea per sentence, and a clear visual break between ideas serve a skimming reader better than technically well-formed longer prose, even when the longer version would score similarly on a per-sentence basis. Check whether your copy is structured to be skimmed, not only whether individual sentences are readable.",
        },
        {
          h: "Where over-simplification actually hurts conversion",
          p: "Copy simplified to the point of sounding generic — every sentence short, every claim vague enough to apply to any product — reads as templated to a subscriber who's seen a hundred similar emails, and a templated feel hurts trust more than moderate complexity does. A specific number, a specific named benefit, or a specific detail beats a shorter but vaguer sentence almost every time.",
        },
        {
          h: "The subject line is a different readability problem entirely",
          p: "A subject line succeeds or fails in the fraction of a second before a reader even opens the email, and mobile inboxes truncate visible text around 30–40 characters regardless of the readability score — a subject line can score perfectly readable and still fail because the specific, compelling part landed after the truncation point. Check the character count alongside the readability score for subject lines specifically.",
        },
        {
          h: "AI-drafted marketing copy has a specific readability signature",
          p: "Generated marketing copy often lands in a deceptively acceptable readability range while still reading as generic, because the formula can't detect vague, hedge-everything phrasing the way it detects sentence length. If your readability score looks fine but the copy still feels like it could be selling anything to anyone, that's a substance problem the score won't catch — add the specific detail a template can't produce.",
        },
      ],
      rules: [
        { when: "You're writing marketing or email copy generally", then: "Target the top of the 50–70 band or slightly above — skimming readers have a shorter attention budget than blog readers." },
        { when: "Copy reads simple but generic", then: "Add a specific number, name, or detail. Vagueness reads as templated, which hurts trust more than moderate complexity does." },
        { when: "You're finalising a subject line", then: "Check the character count, not just readability — mobile inboxes truncate around 30–40 characters regardless of how readable the full line scores." },
        { when: "The readability score looks fine but the copy feels generic", then: "That's a substance problem, not a readability one. Add the specific detail a template draft is missing." },
      ],
      faq: [
        { q: "Should marketing copy score higher than a blog post?", a: "Generally yes — skimming readers have a shorter attention budget, so pushing toward the top of the 50–70 band or slightly above tends to serve email and ad copy better than a mid-range blog target." },
        { q: "Does this check subject line length too?", a: "It reports character and word counts alongside the readability score, but the practical subject-line limit (around 30–40 characters before mobile truncation) is a separate check worth doing specifically, not just a byproduct of the readability number." },
        { q: "Why does AI-generated marketing copy often read as generic even with a good score?", a: "Readability formulas measure sentence length and word weight, not specificity or vagueness — generated copy can be technically easy to read while saying nothing concrete, which the score alone won't reveal." },
        { q: "Is simpler always better for conversion?", a: "Not past a point — copy simplified until it sounds like it could sell anything to anyone loses the specific, trust-building detail that makes an offer credible. Match complexity to conveying real specifics, not to hitting the lowest possible score." },
        { q: "Is my draft copy private when I check it here?", a: "Yes. The check runs entirely in your browser — nothing is uploaded or stored, so pasting an unsent campaign draft is safe." },
      ],
    },
    ar: {
      h1: "فاحص سهولة القراءة لنصوص البريد والتسويق",
      metaTitle: "فاحص سهولة القراءة للنصوص التسويقية — القابل للمسح يفوق البسيط",
      metaDescription:
        "رسالة تسويقية تُقرأ خلال ثوانٍ من شخص يقرّر هل يكمل القراءة أصلاً. الهدف الذي يرتبط فعلاً بتحويل الفتحات إلى نقرات، لا هدف بساطة عام.",
      lede:
        "نصوص التسويق والبريد تُقرأ في ظروف أقرب للمسح السريع منها للقراءة المتأنّية — مشترك يقرّر خلال ثوانٍ قليلة هل تستحق هذه الرسالة انتباهه، يمرّر شاشة هاتف لا يجلس مع مستند. الهدف هنا يتعلّق أقلّ بصعوبة الفهم وأكثر بمقدار الاحتكاك بين المسح والنقرة.",
      sections: [
        {
          h: "لماذا ينبغي أن يسجّل النصّ التسويقي أعلى من منشور مدوّنة نمطي",
          p: "محتوى الويب العام يستهدف ٥٠–٧٠؛ والنصّ التسويقي والبريدي عادةً يستفيد من الدفع نحو أعلى ذلك النطاق أو أعلى قليلاً، لأن ميزانية انتباه القارئ أقصر من قارئ مدوّنة. عنوان الرسالة ونصّ المعاينة وجملة الافتتاح تحمل ثقلاً غير متناسب — افحص هذه تحديداً لا المتن ككلّ فقط.",
        },
        {
          h: "البنية القابلة للمسح تهمّ بقدر درجة مستوى الجملة",
          p: "الفقرات القصيرة، وفكرة واحدة لكل جملة، وفاصل بصري واضح بين الأفكار تخدم قارئاً يمسح بسرعة أفضل من نثر أطول سليم البناء تقنياً، حتى لو سجّلت النسخة الأطول مشابهاً على مستوى الجملة. افحص هل نصّك مبنيّ للمسح، لا فقط هل جمله الفردية سهلة القراءة.",
        },
        {
          h: "أين يضرّ التبسيط الزائد التحويل فعلاً",
          p: "نصّ بُسِّط لدرجة أنه يبدو عاماً — كل جملة قصيرة، وكل ادعاء غامض بما يكفي لينطبق على أي منتج — يُقرأ قالبياً عند مشترك رأى مئة رسالة مشابهة، والإحساس القالبي يضرّ الثقة أكثر من تعقيد معتدل. رقم محدد، أو ميزة مسمّاة محددة، أو تفصيل محدد يفوق جملة أقصر لكن أغمض في كل مرة تقريباً.",
        },
        {
          h: "عنوان الرسالة مشكلة سهولة قراءة مختلفة تماماً",
          p: "عنوان الرسالة ينجح أو يفشل في جزء من الثانية قبل أن يفتح القارئ الرسالة أصلاً، وصناديق الجوال تقتطع النص الظاهر حول ٣٠–٤٠ حرفاً أياً كانت درجة سهولة القراءة — قد يسجّل عنوان سهل القراءة تماماً ويفشل رغم ذلك لأن الجزء المحدد المُقنع وقع بعد نقطة الاقتطاع. افحص عدد الأحرف إلى جانب درجة سهولة القراءة للعناوين تحديداً.",
        },
        {
          h: "للنصوص التسويقية المولّدة بالذكاء الاصطناعي بصمة سهولة قراءة محددة",
          p: "النصّ التسويقي المولّد غالباً يقع في نطاق سهولة قراءة مقبول خادع بينما يُقرأ عاماً رغم ذلك، لأن المعادلة لا تستطيع كشف الصياغة الغامضة المتحوّطة لكل شيء بالطريقة التي تكشف بها طول الجملة. فإن بدت درجة سهولة قراءتك جيدة لكن النصّ ما زال يبدو قادراً على بيع أي شيء لأي أحد، فهذه مشكلة جوهر لن تلتقطها الدرجة — أضف التفصيل المحدد الذي لا يستطيع قالب إنتاجه.",
        },
      ],
      rules: [
        { when: "تكتب نصّاً تسويقياً أو بريدياً عموماً", then: "استهدف أعلى نطاق ٥٠–٧٠ أو أعلى قليلاً — القارئ الممسِّح ميزانية انتباهه أقصر من قارئ المدوّنة." },
        { when: "النصّ يُقرأ بسيطاً لكن عاماً", then: "أضف رقماً أو اسماً أو تفصيلاً محدداً. الغموض يُقرأ قالبياً، ويضرّ الثقة أكثر من تعقيد معتدل." },
        { when: "تُثبّت عنوان رسالة", then: "افحص عدد الأحرف لا سهولة القراءة فقط — صناديق الجوال تقتطع حول ٣٠–٤٠ حرفاً أياً كانت درجة السطر الكامل." },
        { when: "درجة سهولة القراءة تبدو جيدة لكن النصّ يبدو عاماً", then: "هذه مشكلة جوهر لا سهولة قراءة. أضف التفصيل المحدد الذي تفتقده مسودّة القالب." },
      ],
      faq: [
        { q: "هل ينبغي أن يسجّل النصّ التسويقي أعلى من منشور مدوّنة؟", a: "عموماً نعم — القارئ الممسِّح ميزانية انتباهه أقصر، فالدفع نحو أعلى نطاق ٥٠–٧٠ أو أعلى قليلاً يخدم نصّ البريد والإعلانات أفضل من هدف مدوّنة متوسط." },
        { q: "هل يفحص هذا طول عنوان الرسالة أيضاً؟", a: "يعرض عدد الأحرف والكلمات إلى جانب درجة سهولة القراءة، لكن حدّ العنوان العملي (نحو ٣٠–٤٠ حرفاً قبل اقتطاع الجوال) فحص منفصل يستحق القيام به تحديداً، لا أثراً جانبياً لرقم سهولة القراءة فقط." },
        { q: "لماذا يُقرأ النصّ التسويقي المولّد غالباً عاماً حتى بدرجة جيدة؟", a: "معادلات سهولة القراءة تقيس طول الجملة وثقل الكلمة لا التحديد أو الغموض — النصّ المولّد قد يكون سهل القراءة تقنياً بينما لا يقول شيئاً ملموساً، وهذا ما لن تكشفه الدرجة وحدها." },
        { q: "هل الأبسط دائماً أفضل للتحويل؟", a: "ليس بعد نقطة معيّنة — نصّ بُسِّط حتى يبدو قادراً على بيع أي شيء لأي أحد يخسر التفصيل المحدد الباني للثقة الذي يجعل العرض موثوقاً. طابق التعقيد مع نقل تفاصيل حقيقية، لا مع بلوغ أدنى درجة ممكنة." },
        { q: "هل نصّي التسويقي خاص حين أفحصه هنا؟", a: "نعم. الفحص يجري بالكامل داخل متصفّحك — لا شيء يُرفع أو يُحفظ، فلصق مسودّة حملة لم تُرسَل بعد آمن." },
      ],
    },
  },
];

export function getReadabilityUseCase(slug: string): UseCase | undefined {
  return readabilityUseCases.find((u) => u.slug === slug);
}

export const readabilityUseCaseSlugs = readabilityUseCases.map((u) => u.slug);
