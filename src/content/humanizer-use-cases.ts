/**
 * Use-case landing pages for the humanizer.
 *
 * These are not the detector's six pages with "detect" swapped for
 * "humanize" — that would be exactly the no-value-add template content the
 * site's own editorial rules forbid, and it would rank for nothing. The
 * humanizer solves a different problem for each reader: a content writer
 * needs a draft that clears a quality bar, a second-language writer needs
 * their real fluency to read as theirs, a job applicant needs a letter that
 * sounds like them and not like the other forty applicants. Six different
 * problems, six pages.
 *
 * The one constraint every page inherits from /ai-humanizer itself: this
 * tool is never framed as a way to defeat an academic-integrity check.
 * Where a case touches school or research work at all, the page says
 * plainly what is and is not legitimate, the same way the parent page does.
 */

import type { UseCase, UseCaseCopy } from "./use-cases";

export type { UseCase, UseCaseCopy };

export const humanizerUseCases: UseCase[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "content-writers",
    order: 1,
    related: [
      { href: "/blog/ai-content-seo-google", en: "Does Google penalise AI content?", ar: "هل يعاقب Google المحتوى الآلي؟" },
      { href: "/blog/eeat-ai-assisted-content", en: "E-E-A-T for AI-assisted content", ar: "معايير E-E-A-T للمحتوى المدعوم بالذكاء" },
      { href: "/ai-detector/seo-content", en: "Check a draft before you publish it", ar: "افحص المسودّة قبل النشر" },
    ],
    en: {
      h1: "AI Humanizer for Content Writers",
      metaTitle: "AI Humanizer for Content Writers — Fix Flat Drafts, Not Just Flag Them",
      metaDescription:
        "A generated draft's problem usually isn't detectability, it's flatness — the same rhythm that makes it forgettable to readers. Rewrite for readers first; the score drops as a side effect.",
      lede:
        "Publishers who worry about AI content usually aim at the wrong target. Google has said repeatedly that origin is not the ranking signal — helpfulness is, and a flat, generic draft is unhelpful whether a person or a model wrote every word of it. Fixing the flatness is the actual job; a lower detector score is just what that looks like from outside.",
      sections: [
        {
          h: "The score and the reader complaint are the same complaint",
          p: "A detector reads uniform sentence length, safe vocabulary, and hedged claims as machine-like. A reader experiences that exact same pattern as a piece that says nothing memorable, and leaves without finishing it. These are not two problems that happen to correlate — they are one problem measured two ways. Humanizing a draft properly means the bounce rate improves for the same reason the score does.",
        },
        {
          h: "What the humanizer actually fixes, and what it can't",
          p: "It varies sentence rhythm, strips stock connectives like \"furthermore\" and \"it is important to note,\" and breaks up the paragraph-opens-the-same-way pattern that flags a piece as templated. What it cannot do is invent the thing your draft is missing: a specific number you checked yourself, an opinion a competitor's page won't take, a detail only someone who actually did the thing would know. Run the humanizer after you've added those, not instead of adding them.",
        },
        {
          h: "Why editing for rhythm beats editing for vocabulary",
          p: "The instinct with a flat paragraph is to reach for fancier synonyms — \"utilize\" for \"use,\" \"robust\" for \"solid.\" That makes the flatness worse, because the underlying structure, the thing actually producing the generic read, is untouched. Vary how long your sentences are instead. A six-word sentence next to a twenty-five-word one does more for how human a paragraph reads than any thesaurus pass.",
        },
        {
          h: "A workflow that survives an editorial review",
          p: "Draft the structure and the argument yourself, so the position is actually yours. Let a model expand sections where the facts are already settled. Then humanize for rhythm, and do one more pass by hand: read it aloud and fix anywhere you stumble. A reviewer — human or algorithmic — is checking for the same thing at every stage: does this read like someone who knows the subject, or like a summary of what already ranks.",
        },
        {
          h: "What this does not fix",
          p: "A humanized version of a thin argument is still a thin argument, just in nicer sentences. If the underlying draft has no sourced claim, no stance a competitor disagrees with, and no first-hand detail, rewriting the rhythm will lower a detector score and do nothing for rankings or for a reader's attention. Substance has to come first; style is the only thing a humanizer can add.",
        },
      ],
      rules: [
        { when: "The draft scores high and has no sourced specifics", then: "Add the specifics first. Humanizing a thin draft just makes a thin draft harder to spot, not better." },
        { when: "The draft is dense with real detail but reads flat", then: "This is exactly what a humanizer is for — run it, then read the result aloud once." },
        { when: "You're publishing at any real volume", then: "Draft structure and argument yourself; let AI expand only where the facts are already settled." },
        { when: "You want AI search engines to cite you", then: "Keep each section self-contained after humanizing — engines extract passages, not flowing prose, so a rewrite that improves flow but removes standalone clarity can cost you citations." },
      ],
      faq: [
        { q: "Will humanizing my content stop Google from penalising it?", a: "There's no AI-content penalty to stop — Google has said publicly it ranks on quality, not on how a page was produced. What humanizing helps with is the actual quality problem: flat, generic prose that a detector and a bored reader both notice for the same reason." },
        { q: "Does this replace editing?", a: "No. It fixes rhythm and cuts filler; it does not add the sourced fact, the informed opinion, or the concrete detail a thin draft is missing. Add those first." },
        { q: "Will it change the meaning of my content?", a: "It's built not to. Sentence rhythm and connective phrasing change; facts, claims, and terminology don't. Check numbers and technical terms in the output regardless — that is where any rewriting tool's drift shows up first." },
        { q: "Does it work for Arabic content?", a: "Yes, with Arabic-tuned rewriting rather than a translated English pipeline. Arabic SEO is one of the least contested spaces on the web right now, and the quality bar to rank there is currently far lower than in English." },
        { q: "How much can I run at once?", a: "Free tier covers 250 words per run. Paid plans raise that substantially for full articles in one pass." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي لكتّاب المحتوى",
      metaTitle: "مُنسّن الذكاء الاصطناعي لكتّاب المحتوى — أصلح المسودّة المسطّحة لا أن تخفيها فقط",
      metaDescription:
        "مشكلة المسودّة المولّدة غالباً ليست قابلية الكشف بل التسطّح — الإيقاع نفسه الذي يجعلها منسيّة عند القارئ. أصلح للقارئ أولاً؛ تنخفض النتيجة كأثر جانبي.",
      lede:
        "الناشرون القلقون من محتوى الذكاء الاصطناعي يصوّبون غالباً نحو الهدف الخطأ. قالت Google مراراً إن المصدر ليس إشارة الترتيب — الفائدة هي الإشارة، والمسودّة المسطّحة العامة غير مفيدة سواء كتب كل كلمة فيها إنسان أو نموذج. إصلاح التسطّح هو المهمّة الحقيقية؛ وانخفاض نتيجة الكاشف مجرّد أثر خارجي لذلك.",
      sections: [
        {
          h: "النتيجة وشكوى القارئ شكوى واحدة",
          p: "الكاشف يقرأ أطوال جمل منتظمة ومفردات آمنة وادعاءات متحوّطة كعلامة آلية. والقارئ يعيش النمط نفسه بالضبط كقطعة لا تقول شيئاً يُذكَر، فيغادر قبل أن ينهيها. هاتان ليستا مشكلتين ترتبطان صدفة — هي مشكلة واحدة تُقاس بطريقتين. وتنسين مسودّة بشكل صحيح يعني أن معدّل المغادرة يتحسّن للسبب نفسه الذي تتحسّن به النتيجة.",
        },
        {
          h: "ما يصلحه المُنسّن فعلاً وما لا يستطيعه",
          p: "ينوّع إيقاع الجمل، ويحذف الروابط النمطية مثل «علاوة على ذلك» و«من الجدير بالذكر»، ويكسر نمط افتتاح كل فقرة بالتركيب نفسه الذي يفضح القالب. وما لا يستطيعه هو اختراع ما تفتقده مسودّتك: رقم محدد تحقّقت منه بنفسك، أو رأي لا تجرؤ صفحة منافسة على تبنّيه، أو تفصيل لا يعرفه إلا من فعل الشيء فعلاً. شغّل المُنسّن بعد أن تضيف هذه لا بدلاً من إضافتها.",
        },
        {
          h: "لماذا التحرير للإيقاع يفوق التحرير للمفردات",
          p: "الغريزة أمام فقرة مسطّحة أن تلجأ لمرادفات أفخم. وهذا يزيد التسطّح سوءاً، لأن البنية الأساسية — المسبّب الحقيقي للقراءة العامة — تبقى بلا مساس. نوّع أطوال جملك بدلاً من ذلك. جملة من ست كلمات بجانب أخرى من خمس وعشرين تفعل لإحساس الفقرة بالبشرية أكثر من أي مرور بقاموس مرادفات.",
        },
        {
          h: "سير عمل يصمد أمام مراجعة تحريرية",
          p: "اكتب البنية والحجّة بنفسك حتى يكون الموقف موقفك أنت فعلاً. ودع النموذج يوسّع الأقسام التي استقرّت وقائعها. ثم نسّن للإيقاع، ومرّ مرة أخيرة يدوياً: اقرأ بصوت عالٍ وأصلح كل موضع تتعثّر فيه. والمراجع — بشرياً كان أو خوارزمياً — يفحص الشيء نفسه في كل مرحلة: هل يُقرأ هذا كمن يعرف الموضوع، أم كتلخيص لما هو مرتَّب أصلاً.",
        },
        {
          h: "ما لا يُصلحه هذا",
          p: "النسخة المُنسَّنة من حجّة رقيقة تبقى حجّة رقيقة، بجمل أجمل فقط. فإن كانت المسودّة الأساسية بلا ادعاء مُسنَد ولا موقف يخالفه منافس ولا تفصيل من تجربة مباشرة، فإعادة صياغة الإيقاع تخفض نتيجة الكاشف ولا تفعل شيئاً للترتيب ولا لانتباه القارئ. الجوهر يجب أن يأتي أولاً؛ الأسلوب هو الشيء الوحيد الذي يستطيع المُنسّن إضافته.",
        },
      ],
      rules: [
        { when: "المسودّة بنتيجة عالية وبلا تفاصيل مُسنَدة", then: "أضف التفاصيل أولاً. تنسين مسودّة رقيقة يجعلها أصعب اكتشافاً فقط، لا أفضل." },
        { when: "المسودّة مكتظّة بتفاصيل حقيقية لكنها تُقرأ مسطّحة", then: "هذا بالضبط ما صُنع له المُنسّن — شغّله، ثم اقرأ النتيجة بصوت عالٍ مرة." },
        { when: "تنشر بحجم حقيقي", then: "اكتب البنية والحجّة بنفسك؛ ودع الذكاء الاصطناعي يوسّع فقط حيث استقرّت الوقائع." },
        { when: "تريد أن تستشهد بك محرّكات البحث الذكية", then: "أبقِ كل قسم مكتفياً بذاته بعد التنسين — فالمحرّكات تستخرج مقاطع لا نثراً متدفّقاً، وإعادة صياغة تحسّن التدفّق وتُفقد الوضوح المستقل قد تكلّفك الاستشهادات." },
      ],
      faq: [
        { q: "هل يوقف تنسين المحتوى عقوبة Google؟", a: "لا توجد عقوبة على المحتوى الآلي لتوقفها أصلاً — قالت Google علناً إنها تُرتّب حسب الجودة لا حسب طريقة الإنتاج. وما يساعد فيه التنسين هو مشكلة الجودة الحقيقية: نثر عام مسطّح يلاحظه الكاشف والقارئ الملول للسبب نفسه." },
        { q: "هل يُغني هذا عن التحرير؟", a: "لا. يصلح الإيقاع ويحذف الحشو؛ ولا يضيف الحقيقة المُسنَدة ولا الرأي المطّلع ولا التفصيل الملموس الذي تفتقده مسودّة رقيقة. أضف هذه أولاً." },
        { q: "هل يغيّر معنى محتواي؟", a: "مُصمَّم ألا يفعل. يتغيّر إيقاع الجمل وصياغة الروابط؛ ولا تتغيّر الحقائق والادعاءات والمصطلحات. راجع الأرقام والمصطلحات التقنية في المخرجات رغم ذلك — فهناك يظهر أي انزياح في أي أداة إعادة صياغة أولاً." },
        { q: "هل يعمل مع المحتوى العربي؟", a: "نعم، بإعادة صياغة مضبوطة للعربية لا بخط إنجليزي مترجَم. والسيو العربي من أقلّ المساحات تنافساً على الويب الآن، وسقف الجودة المطلوب للترتيب فيه أدنى بكثير من الإنجليزية حالياً." },
        { q: "كم أستطيع تشغيله دفعة واحدة؟", a: "الخطة المجانية تغطّي ٢٥٠ كلمة لكل محاولة. والخطط المدفوعة ترفع ذلك كثيراً لمقال كامل بمرور واحد." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "non-native-writers",
    order: 2,
    related: [
      { href: "/blog/ai-detector-false-positives", en: "Why honest writing gets flagged", ar: "لماذا تُتَّهم الكتابة النزيهة" },
      { href: "/blog/arabic-writing-in-the-ai-era", en: "Arabic writing in the AI era", ar: "الكتابة العربية في عصر الذكاء الاصطناعي" },
      { href: "/arabic-ai-detector", en: "Check how your Arabic reads", ar: "افحص كيف يبدو نصّك العربي" },
    ],
    en: {
      h1: "AI Humanizer for Non-Native Writers",
      metaTitle: "AI Humanizer for Non-Native Writers — Fix Rhythm, Not Your English",
      metaDescription:
        "Correct grammar and a controlled vocabulary are what second-language fluency actually looks like — and exactly what makes detectors misfire on it. Here's what a humanizer can and cannot do about that.",
      lede:
        "If you learned English as a second language, the writing habits that make you fluent — reliable sentence patterns, a vocabulary you have full control over, careful grammar — are the same habits a detector reads as machine-like. That is not a flaw in your writing. It is a known, documented blind spot in how these tools work, and it is worth understanding before you reach for any rewriting tool to fix it.",
      sections: [
        {
          h: "Why your correct English can read as generated",
          p: "A detector measures statistical predictability: how even your sentence lengths are, how often you repeat safe, reliable vocabulary, how few irregularities show up. A native speaker's fluency includes fragments, asides, and grammar bent on purpose for effect — the very unevenness a detector reads as human. Second-language fluency is precise and controlled instead, and precision reads as machine-like to a tool that was never calibrated on writers like you.",
        },
        {
          h: "What actually needs fixing here — and what doesn't",
          p: "Nothing about your English needs fixing. What a humanizer can genuinely help with is rhythm: breaking the pattern of similarly-sized sentences that both a detector and, honestly, a tired reader notice. It should never be used to make your writing sound less correct on purpose — deliberately inserting errors to seem \"more human\" fools nobody who matters and actively damages the writing.",
        },
        {
          h: "The specific pattern to watch for: translated structure",
          p: "If you draft in your first language and translate, or think in it while writing English, the result often carries your first language's sentence order and connective habits — this is one of the most reliable causes of an inflated detector score, and it has nothing to do with AI. A humanizer can smooth some of this, but reading your own draft aloud and noticing where it sounds translated rather than composed catches more of it than any tool will.",
        },
        {
          h: "When a high score is not actually a problem",
          p: "If you wrote every word yourself, a high detector score is a data point about your writing style, not a verdict on your honesty. The useful response is not panic and not necessarily a rewrite — it's context. In an academic or professional setting, saying plainly that you write in a second language and that detectors are documented to misread that is a stronger response than trying to disguise your own fluency.",
        },
        {
          h: "Arabic speakers writing in English, and the reverse",
          p: "The same effect runs in both directions. Arabic prose translated into English carries Arabic sentence rhythm; English drafted then rendered into Arabic carries English rhythm dressed in Arabic words — both read as unusually even to a detector calibrated on native prose in either language. A humanizer tuned separately for each language, rather than one pipeline translated for both, handles this correctly instead of amplifying the mismatch.",
        },
      ],
      rules: [
        { when: "You wrote every word yourself and score high", then: "Don't panic and don't disguise your fluency. Rewrite the flattest few sentences for rhythm and move on." },
        { when: "You drafted in your first language and translated", then: "Read the English aloud. Rhythm that sounds translated rather than composed is the actual issue — fix that specifically." },
        { when: "You're asked to explain a high score", then: "State plainly that you write in a second language. This is a documented, known cause of false positives, not an excuse you're inventing." },
        { when: "You're tempted to add errors to seem more human", then: "Don't. It damages real writing and convinces no reader or reviewer who actually looks at the text." },
      ],
      faq: [
        { q: "Is it dishonest to use a humanizer on my own writing?", a: "No — if you wrote it, adjusting its rhythm is no different from any other editing pass. What would be dishonest is using it to disguise text a model generated as your own original work." },
        { q: "Will it make my English sound less like me?", a: "It shouldn't, if used correctly — it targets sentence rhythm and connective phrasing, not your vocabulary or voice. If a rewrite reads like someone else, don't use that draft; try a shorter passage or adjust the style setting." },
        { q: "Does this fix grammar mistakes?", a: "No, and that's not its job. If you want grammar checked, use a grammar tool for that specifically — a humanizer changes rhythm in text that's already grammatically sound." },
        { q: "Why do detectors flag second-language writers more?", a: "Because they measure statistical uniformity, and controlled, careful language use — exactly what second-language fluency looks like — produces more of it than a native speaker's looser, more irregular prose." },
        { q: "Does the Arabic version actually work differently from the English one?", a: "Yes. It's tuned on Arabic sentence structure and connective conventions specifically, rather than running Arabic text through logic built for English." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي للكاتبين بلغة ثانية",
      metaTitle: "مُنسّن الذكاء الاصطناعي للكاتبين بلغة ثانية — أصلح الإيقاع لا لغتك",
      metaDescription:
        "القواعد السليمة والمفردات المضبوطة هي شكل الطلاقة بلغة ثانية فعلاً — وهي بالضبط ما يجعل الكواشف تُخطئ في قراءتها. إليك ما يستطيع المُنسّن فعله وما لا يستطيعه حيال ذلك.",
      lede:
        "إن كتبت بالإنجليزية كلغة ثانية، فعادات الكتابة التي تجعلك طليقاً — أنماط جمل موثوقة، ومفردات تتحكّم بها كاملاً، وقواعد متحرّية — هي العادات نفسها التي يقرؤها الكاشف كآلية. هذا ليس عيباً في كتابتك. إنه نقطة عمياء معروفة وموثّقة في طريقة عمل هذه الأدوات، وتستحق أن تفهمها قبل أن تلجأ لأي أداة إعادة صياغة لإصلاحها.",
      sections: [
        {
          h: "لماذا تُقرأ إنجليزيتك السليمة كمولّدة",
          p: "الكاشف يقيس قابلية التوقّع الإحصائية: مدى تساوي أطوال جملك، ومدى تكرارك مفردات آمنة موثوقة، وقلّة الشذوذ الظاهر. طلاقة الناطق الأصلي تتضمّن جملاً ناقصة وملاحظات جانبية وقواعد مثنيّة عمداً للتأثير — وهذا التفاوت نفسه ما يقرؤه الكاشف كبشري. أما طلاقة اللغة الثانية فدقيقة ومضبوطة بدلاً من ذلك، والدقّة تُقرأ كآلية عند أداة لم تُعايَر أصلاً على كاتبين مثلك.",
        },
        {
          h: "ما يحتاج إصلاحاً فعلاً هنا — وما لا يحتاجه",
          p: "لا شيء في إنجليزيتك يحتاج إصلاحاً. وما يستطيع المُنسّن المساعدة فيه فعلاً هو الإيقاع: كسر نمط الجمل المتشابهة الطول الذي يلاحظه الكاشف، وبصراحة، القارئ المتعب أيضاً. ولا ينبغي استخدامه أبداً لجعل كتابتك تبدو أقلّ صحّة عمداً — إدخال أخطاء عمداً لتبدو «أكثر بشرية» لا يخدع أحداً يهمّه الأمر ويضرّ الكتابة فعلياً.",
        },
        {
          h: "النمط المحدَّد الذي يستحق الانتباه: البنية المترجَمة",
          p: "إن كتبت مسودّتك بلغتك الأولى ثم ترجمتها، أو فكّرت بها بينما تكتب الإنجليزية، فالنتيجة غالباً تحمل ترتيب جملة لغتك الأولى وعادات ربطها — وهذا أحد أكثر أسباب ارتفاع نتيجة الكاشف موثوقية، ولا علاقة له بالذكاء الاصطناعي إطلاقاً. المُنسّن قد يُسوّي بعض هذا، لكن قراءة مسودّتك بصوت عالٍ وملاحظة أين تبدو مترجمة لا مؤلَّفة يمسك أكثر ممّا تمسكه أي أداة.",
        },
        {
          h: "متى لا تكون النتيجة العالية مشكلة فعلاً",
          p: "إن كتبت كل كلمة بنفسك، فالنتيجة العالية بيانة عن أسلوب كتابتك، لا حكماً على نزاهتك. والاستجابة المفيدة ليست الذعر ولا بالضرورة إعادة الصياغة — بل السياق. وفي إطار أكاديمي أو مهني، قول صريح إنك تكتب بلغة ثانية وأن الكواشف موثَّق أنها تُسيء قراءة ذلك أقوى بكثير من محاولة تمويه طلاقتك أنت.",
        },
        {
          h: "الناطقون بالعربية الذين يكتبون بالإنجليزية، والعكس",
          p: "الأثر نفسه يجري في الاتجاهين. النثر العربي المترجَم للإنجليزية يحمل إيقاع الجملة العربية؛ والإنجليزية المصاغة ثم المُترجَمة للعربية تحمل إيقاعاً إنجليزياً بثوب عربي — وكلاهما يُقرأ منتظماً بشكل غير معتاد عند كاشف مُعايَر على نثر أصلي بأي من اللغتين. والمُنسّن المضبوط لكل لغة على حدة — لا خطّاً واحداً مُترجَماً للاثنتين — يتعامل مع هذا بصحة بدل تضخيم التنافر.",
        },
      ],
      rules: [
        { when: "كتبت كل كلمة بنفسك والنتيجة عالية", then: "لا تذعر ولا تموّه طلاقتك. أعد صياغة أكثر الجمل تسطّحاً للإيقاع وامضِ قدماً." },
        { when: "صغت مسودّتك بلغتك الأولى وترجمتها", then: "اقرأ الإنجليزية بصوت عالٍ. الإيقاع الذي يبدو مترجَماً لا مؤلَّفاً هو المشكلة الحقيقية — أصلح ذلك تحديداً." },
        { when: "طُلب منك تفسير نتيجة عالية", then: "قل صراحةً إنك تكتب بلغة ثانية. هذا سبب موثّق ومعروف للإنذارات الخاطئة، لا عذراً تخترعه." },
        { when: "أُغريت بإضافة أخطاء لتبدو أكثر بشرية", then: "لا تفعل. يضرّ الكتابة الحقيقية ولا يقنع أي قارئ أو مراجع ينظر في النص فعلاً." },
      ],
      faq: [
        { q: "هل استخدام المُنسّن على كتابتي أنا غير نزيه؟", a: "لا — إن كتبتها أنت، فتعديل إيقاعها لا يختلف عن أي مرور تحريري آخر. غير النزيه هو استخدامه لتمويه نص ولّده نموذج كأنه عملك الأصلي." },
        { q: "هل سيجعل إنجليزيتي أقلّ شبهاً بي؟", a: "لا ينبغي، إن استُخدم بصحّة — فهو يستهدف إيقاع الجملة وصياغة الروابط لا مفرداتك أو صوتك. وإن بدت إعادة الصياغة كشخص آخر فلا تستخدم تلك النسخة؛ جرّب مقطعاً أقصر أو عدّل إعداد الأسلوب." },
        { q: "هل يصلح هذا أخطاء القواعد؟", a: "لا، وليست هذه وظيفته. إن أردت مراجعة قواعدية استخدم أداة قواعد مخصّصة لذلك — المُنسّن يغيّر الإيقاع في نص سليم قواعدياً أصلاً." },
        { q: "لماذا تُنذر الكواشف الكاتبين بلغة ثانية أكثر؟", a: "لأنها تقيس الانتظام الإحصائي، والاستخدام اللغوي المضبوط المتحرّي — وهو بالضبط شكل الطلاقة بلغة ثانية — يُنتج منه أكثر من نثر الناطق الأصلي الأكثر تسيّباً وشذوذاً." },
        { q: "هل تعمل النسخة العربية فعلاً بشكل مختلف عن الإنجليزية؟", a: "نعم. مضبوطة على بنية الجملة العربية وأعراف الربط تحديداً، بدل تمرير النص العربي على منطق مبني للإنجليزية." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "cover-letters",
    order: 3,
    related: [
      { href: "/ai-detector/cover-letters", en: "Why a generated cover letter gets noticed", ar: "لماذا يُلاحَظ خطاب التوظيف المولّد" },
      { href: "/blog/chatgpt-writing-tells", en: "The tells that give AI text away", ar: "العلامات التي تفضح النص الآلي" },
      { href: "/blog/humanize-without-changing-meaning", en: "Humanizing without changing meaning", ar: "التنسين دون تغيير المعنى" },
    ],
    en: {
      h1: "AI Humanizer for Cover Letters",
      metaTitle: "AI Humanizer for Cover Letters — Make a Draft Sound Like You",
      metaDescription:
        "A recruiter reading forty applications recognises the fortieth version of the same AI-shaped letter instantly. Rewriting it for rhythm helps, but the fix that actually matters is more specific than that.",
      lede:
        "The risk with a generated cover letter was never really a detector — it's a recruiter reading forty applications who recognises the shape of the fortieth AI-drafted one on sight. A humanizer helps with the surface of that problem. The paragraph that actually saves the letter is one no rewriting tool can write for you.",
      sections: [
        {
          h: "What a recruiter actually notices",
          p: "Not vocabulary — shape. A generated letter opens by naming the role, restates the job description back for a paragraph, offers three balanced competencies, and closes by welcoming a chance to discuss further. After a handful of applications that shape reads as an absence of effort, not as machine authorship specifically. Fixing the shape is exactly what a humanizer is built to do: it varies the rhythm and removes the template feel a recruiter's eye catches instantly.",
        },
        {
          h: "The paragraph a humanizer cannot write for you",
          p: "One specific thing about this employer you could not have written about any other — a product decision you noticed, a change in their approach, something a person there published. Two sentences on why it interested you is worth more than every rewritten competency claim in the letter, because it is the one part of a cover letter that is genuinely irreplaceable. Write that yourself, then humanize everything around it.",
        },
        {
          h: "A workflow that produces a letter worth sending",
          p: "Use AI to structure your thinking, not to produce your final sentences: ask what a job description is implicitly asking for, or which of your experiences map onto it. Draft the letter yourself using that structure. Run the humanizer on the result to fix any remaining stiffness, especially if you drafted quickly or under pressure. The order matters — humanizing a template produces a smoother template; humanizing your own draft produces your own voice, cleaned up.",
        },
        {
          h: "Second-language applicants and an unfair disadvantage",
          p: "If you're applying in English as a second language, your careful, grammatically precise letter can read as generated for the same reason your other writing does — controlled vocabulary and reliable structure. Don't fix this by making the letter sound less correct. Fix it with specificity: a named project, a real number, one genuine observation about the employer. Specificity reads as human in a way grammar never will, in either direction.",
        },
        {
          h: "What to check before you send it",
          p: "Read the letter and ask whether any sentence in it could appear, unchanged, in an application to a different company. Delete every sentence where the answer is yes — usually most of the middle. What survives is typically short, and it's the only part actually doing work. Humanize what remains for rhythm, then send it. A shorter, specific letter beats a longer, smoother one that says nothing only this employer would notice.",
        },
      ],
      rules: [
        { when: "A sentence would fit any employer unchanged", then: "Cut it before you humanize anything. Rhythm can't fix a sentence that has no content." },
        { when: "You have no specific observation about the company", then: "Stop and find one before sending. It's worth more than a full humanizer pass on the rest." },
        { when: "You wrote it yourself but it reads stiff", then: "This is exactly the humanizer's job — run it, focused on rhythm, not content." },
        { when: "You're applying in a second language", then: "Add specificity, not imperfection. A named project beats a deliberately imperfect sentence every time." },
      ],
      faq: [
        { q: "Is it dishonest to use a humanizer on a cover letter?", a: "Using it on your own writing to fix stiffness is ordinary editing. Using AI to generate the letter's substance and then humanizing it to sound like you wrote it is different — the specific observation about the employer has to actually be yours." },
        { q: "Will this guarantee a recruiter won't notice AI involvement?", a: "No tool can guarantee that, and one that claims to is overselling. What genuinely works is specificity a template can't produce, not a smoother version of a generic letter." },
        { q: "Does it work for personal statements too?", a: "Be more careful there — personal statements and admissions essays are read specifically for voice, and many institutions state that generated statements are rejected outright. Use it only on your own drafted prose in that context, never on AI-generated content you're presenting as personal reflection." },
        { q: "Will it change facts in my letter — dates, titles, numbers?", a: "It's built not to; only rhythm and phrasing change. Double-check any figures or job titles in the output regardless before sending." },
        { q: "Does it work in Arabic for regional job applications?", a: "Yes, with native Arabic rewriting — useful for applications to Gulf and regional employers, where formal application Arabic tends to read especially uniform." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي لخطابات التوظيف",
      metaTitle: "مُنسّن الذكاء الاصطناعي لخطابات التوظيف — اجعل المسودّة تبدو بصوتك",
      metaDescription:
        "مسؤول التوظيف الذي يقرأ أربعين طلباً يتعرّف على النسخة الأربعين من الخطاب الآلي فوراً. إعادة الصياغة للإيقاع تساعد، لكن الإصلاح الحقيقي أدقّ من ذلك.",
      lede:
        "الخطر في خطاب توظيف مولّد لم يكن كاشفاً حقيقياً أبداً — بل مسؤول توظيف يقرأ أربعين طلباً يتعرّف على شكل الخطاب الأربعين المصوغ آلياً بمجرد النظر. والمُنسّن يساعد في سطح هذه المشكلة. أما الفقرة التي تُنقذ الخطاب فعلاً فلا تستطيع أداة إعادة صياغة كتابتها لك.",
      sections: [
        {
          h: "ما يلاحظه مسؤول التوظيف فعلاً",
          p: "ليست المفردات — بل الشكل. الخطاب المولّد يفتتح بذكر المسمّى الوظيفي، ويقضي فقرة في إعادة سرد الوصف الوظيفي، ويعرض ثلاث كفاءات متوازنة، ويختم بالترحيب بفرصة النقاش. وبعد حفنة طلبات يُقرأ هذا الشكل كغياب جهد لا كتأليف آلي تحديداً. وإصلاح الشكل هو بالضبط ما صُنع له المُنسّن: ينوّع الإيقاع ويحذف إحساس القالب الذي تلتقطه عين المُوظِّف فوراً.",
        },
        {
          h: "الفقرة التي لا يستطيع المُنسّن كتابتها لك",
          p: "شيء واحد محدد عن جهة العمل هذه ما كنت لتكتبه عن غيرها — قرار منتج لاحظته، أو تغيّر في نهجها، أو شيء نشره أحدهم هناك. جملتان عن سبب اهتمامك بهذا أثمن من كل ادعاءات الكفاءة المُعاد صياغتها في الخطاب، لأنها الجزء الوحيد في خطاب التوظيف الذي لا بديل عنه فعلاً. اكتب هذه بنفسك، ثم نسّن كل ما حولها.",
        },
        {
          h: "سير عمل يُنتج خطاباً يستحق الإرسال",
          p: "استخدم الذكاء الاصطناعي لترتيب تفكيرك لا لإنتاج جملك النهائية: اسأل ما الذي يطلبه الوصف الوظيفي ضمناً، أو أي خبراتك تقابله. اكتب الخطاب بنفسك مستخدماً تلك البنية. وشغّل المُنسّن على النتيجة لإصلاح أي تصلّب متبقٍّ، خصوصاً إن كتبتها بسرعة أو تحت ضغط. والترتيب مهمّ — تنسين قالب يُنتج قالباً أنعم؛ وتنسين مسودّتك أنت يُنتج صوتك أنت، منقّحاً.",
        },
        {
          h: "المتقدّمون بلغة ثانية وحرمان غير منصف",
          p: "إن كنت تتقدّم بالإنجليزية كلغة ثانية، فخطابك المتحرّي الصحيح نحوياً قد يُقرأ كمولّد للسبب نفسه الذي تُقرأ به كتابتك الأخرى — مفردات مضبوطة وبنية موثوقة. لا تُصلح هذا بجعل الخطاب يبدو أقلّ صحّة. أصلحه بالتحديد: مشروع باسمه، ورقم حقيقي، وملاحظة صادقة واحدة عن جهة العمل. فالتحديد يُقرأ كبشري بطريقة لا تفعلها القواعد أبداً، في أي اتجاه.",
        },
        {
          h: "ما تفحصه قبل الإرسال",
          p: "اقرأ الخطاب واسأل: هل توجد فيه جملة تصلح كما هي لطلب في شركة أخرى؟ احذف كل جملة جوابها نعم — عادةً معظم الوسط. وما يتبقّى قصير غالباً، وهو الجزء الوحيد الذي يعمل فعلاً. نسّن ما تبقّى للإيقاع، ثم أرسله. خطاب أقصر ومحدد يفوق خطاباً أطول وأنعم لا يقول شيئاً تلاحظه هذه الجهة تحديداً.",
        },
      ],
      rules: [
        { when: "جملة تصلح لأي جهة عمل بلا تغيير", then: "احذفها قبل أن تنسّن أي شيء. الإيقاع لا يستطيع إصلاح جملة بلا مضمون." },
        { when: "ليس لديك ملاحظة محددة عن الشركة", then: "توقّف وابحث عن واحدة قبل الإرسال. أثمن من مرور كامل بالمُنسّن على الباقي." },
        { when: "كتبته بنفسك لكنه يُقرأ متصلّباً", then: "هذا بالضبط عمل المُنسّن — شغّله مركّزاً على الإيقاع لا المضمون." },
        { when: "تتقدّم بلغة ثانية", then: "أضف تحديداً لا نقصاً. مشروع باسمه يفوق جملة ناقصة عمداً دائماً." },
      ],
      faq: [
        { q: "هل استخدام المُنسّن على خطاب توظيف غير نزيه؟", a: "استخدامه على كتابتك أنت لإصلاح التصلّب تحرير عادي. أما استخدام الذكاء الاصطناعي لإنتاج جوهر الخطاب ثم تنسينه ليبدو أنك كتبته فأمر مختلف — الملاحظة المحددة عن جهة العمل يجب أن تكون ملاحظتك أنت فعلاً." },
        { q: "هل يضمن هذا ألّا يلاحظ المُوظِّف تدخّل الذكاء الاصطناعي؟", a: "لا تستطيع أي أداة ضمان ذلك، ومن يدّعيه يبالغ في البيع. ما ينجح فعلاً هو التحديد الذي لا يستطيع قالب إنتاجه، لا نسخة أنعم من خطاب عام." },
        { q: "هل يعمل مع البيانات الشخصية أيضاً؟", a: "كن أكثر حذراً هناك — البيانات الشخصية ومقالات القبول تُقرأ خصيصاً بحثاً عن الصوت، وكثير من المؤسسات تنصّ على رفض البيانات المولّدة تماماً. استخدمه فقط على نثرك أنت المصاغ في هذا السياق، لا على محتوى مولّد تُقدّمه كتأمّل شخصي." },
        { q: "هل سيغيّر وقائع في خطابي — تواريخ ومسمّيات وأرقام؟", a: "مُصمَّم ألّا يفعل؛ يتغيّر الإيقاع والصياغة فقط. تحقّق من أي أرقام أو مسمّيات وظيفية في المخرجات رغم ذلك قبل الإرسال." },
        { q: "هل يعمل بالعربية للطلبات الإقليمية؟", a: "نعم، بإعادة صياغة عربية أصيلة — مفيد للطلبات لجهات عمل خليجية وإقليمية، حيث تميل عربية الطلبات الرسمية لأن تُقرأ منتظمة بوجه خاص." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "business-writing",
    order: 4,
    related: [
      { href: "/blog/ai-writing-policy-for-teams", en: "Writing an AI policy people follow", ar: "كتابة سياسة ذكاء اصطناعي يلتزم بها الناس" },
      { href: "/blog/humanizer-styles-when-to-use", en: "Which humanizer style to use, and when", ar: "أي أسلوب تنسين تختار، ومتى" },
      { href: "/blog/chatgpt-writing-tells", en: "The tells that give AI text away", ar: "العلامات التي تفضح النص الآلي" },
    ],
    en: {
      h1: "AI Humanizer for Business Writing",
      metaTitle: "AI Humanizer for Emails, Memos & Reports — Sound Like Your Team, Not a Template",
      metaDescription:
        "AI-drafted business writing tends to arrive at the same generic, over-hedged voice regardless of who's sending it. Humanizing it for a specific reader and specific stakes fixes what a template can't.",
      lede:
        "AI-assisted business writing has a specific failure mode: it converges. A model asked to draft a client email, a status report, and an internal memo tends to reach for the same balanced, hedge-everything, offend-no-one register for all three — even though a client, your manager, and your own team are reading for completely different things. Humanizing the draft for who's actually reading it fixes what a generic rewrite can't.",
      sections: [
        {
          h: "Why AI drafts read the same regardless of audience",
          p: "A model has no stake in the outcome of your email, so it defaults to language that covers every possibility and commits to none — \"we are exploring several options\" instead of \"we're going with the second approach.\" That hedging is efficient to generate and safe for the model, but it reads as evasive or junior to a reader expecting a decision. Humanizing a draft should mean cutting the hedges your actual position doesn't need, not just varying sentence length.",
        },
        {
          h: "Match the rewrite to who's actually reading it",
          p: "A client email and an internal Slack message that both went through the same generic AI draft often end up sounding identical, which is itself the tell. Use the humanizer's style setting deliberately: more formal and measured for a client or a report going upward, more direct and plain for an internal note. The tool adjusts register; you still have to decide what register this specific reader expects.",
        },
        {
          h: "The pattern that gives a memo away",
          p: "Bullet points that all restate the same idea in slightly different words, a closing paragraph that summarizes what the email already said, and a subject line more formal than anything in the body — these read as generated because they're what a model produces when asked to sound thorough without anything specific to say. If your draft has this shape, the fix is adding one concrete number or decision, not just rewriting the bullets.",
        },
        {
          h: "Where teams actually use this without ever thinking about detection",
          p: "Most business use of a humanizer has nothing to do with anyone checking for AI — it's simply that a first draft from a model reads generic, and the person sending it wants it to sound like they actually wrote it, because it's going out under their name to someone who knows how they normally write. That's a completely ordinary editing motive, no different from proofreading before you hit send.",
        },
        {
          h: "What to keep doing by hand regardless",
          p: "Names, numbers, dates, and anything client- or deal-specific need a human check every time, because a model drafting from a template has no way to know if it silently generalized a number that should have been exact. Humanize for tone and rhythm; verify the specifics yourself before it goes out. This is the same discipline as any other editing pass, just applied to AI-assisted drafts specifically.",
        },
      ],
      rules: [
        { when: "The draft hedges instead of committing to a position", then: "Cut the hedge if you actually have a position. Rhythm alone won't fix evasive language." },
        { when: "A client email and an internal note read identically", then: "That sameness is the tell. Set the humanizer's style deliberately for each audience." },
        { when: "Bullets restate the same point in different words", then: "Add one concrete number or decision instead of rewriting the bullets — that's what's actually missing." },
        { when: "The draft has names, dates, or figures", then: "Verify those by hand regardless of how the rest was produced. Humanizing changes rhythm, not facts, but check anyway." },
      ],
      faq: [
        { q: "Is using this on work emails a problem for my company?", a: "Check your organisation's AI policy if it has one — most treat this the same as any editing tool. The concern in most workplace policies is confidentiality of what you paste in, not the act of style-editing your own drafts." },
        { q: "Will it make my writing sound less professional?", a: "It shouldn't — it's built to preserve register while fixing generic phrasing. If a result reads too casual for the context, use the academic or formal style setting instead of the default." },
        { q: "Can I use it on a client-facing document?", a: "Yes, with the same caution as any client document: verify every number, name, and commitment by hand before sending, regardless of what tool touched the drafting." },
        { q: "Does it work for Arabic business correspondence?", a: "Yes, with native Arabic phrasing — useful specifically because formal Arabic business writing has its own register that a translated English pipeline handles poorly." },
        { q: "Is there a faster way to fix this than running every email through it?", a: "For anything short and routine, the fastest fix is usually just cutting one or two hedge phrases yourself. Save the humanizer for longer documents — reports, proposals, anything with real stakes attached." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي للكتابة المهنية",
      metaTitle: "مُنسّن الذكاء الاصطناعي للإيميلات والتقارير — اجعلها تبدو بصوت فريقك لا بصوت قالب",
      metaDescription:
        "الكتابة المهنية بمساعدة الذكاء الاصطناعي تميل للوصول لصوت عام متحوّط واحد أياً كان المُرسِل. تنسينها لقارئ محدد ومخاطر محددة يصلح ما لا تصلحه إعادة صياغة عامة.",
      lede:
        "للكتابة المهنية بمساعدة الذكاء الاصطناعي عطل محدد: التقارب. النموذج المطلوب منه صياغة إيميل عميل وتقرير حالة ومذكّرة داخلية يميل لاختيار السجلّ الآمن المتوازن المتحوّط نفسه للثلاثة — رغم أن العميل ومديرك وفريقك يقرؤون بحثاً عن أشياء مختلفة تماماً. وتنسين المسودّة لمن يقرؤها فعلاً يصلح ما لا تصلحه إعادة صياغة عامة.",
      sections: [
        {
          h: "لماذا تُقرأ مسودّات الذكاء الاصطناعي متشابهة أياً كان الجمهور",
          p: "النموذج لا مصلحة له في نتيجة إيميلك، فيلجأ افتراضياً للغة تغطّي كل احتمال ولا تلتزم بشيء — «نستكشف عدّة خيارات» بدل «سنعتمد النهج الثاني». وهذا التحوّط سهل التوليد وآمن للنموذج، لكنه يُقرأ متهرّباً أو مبتدئاً عند قارئ يتوقّع قراراً. وتنسين المسودّة ينبغي أن يعني حذف التحوّطات التي لا يحتاجها موقفك الفعلي، لا مجرّد تنويع طول الجمل.",
        },
        {
          h: "طابق إعادة الصياغة مع من يقرؤها فعلاً",
          p: "إيميل عميل ورسالة Slack داخلية مرّا كلاهما عبر مسودّة الذكاء الاصطناعي العامة نفسها غالباً ينتهيان متطابقين، وهذا التطابق نفسه هو العلامة الفاضحة. استخدم إعداد الأسلوب في المُنسّن عمداً: أرسمي ومتزن أكثر لعميل أو تقرير صاعد، ومباشر وبسيط أكثر لملاحظة داخلية. الأداة تضبط السجلّ؛ وعليك أنت أن تقرّر أي سجلّ يتوقّعه هذا القارئ تحديداً.",
        },
        {
          h: "النمط الذي يفضح المذكّرة",
          p: "نقاط تُعيد صياغة الفكرة نفسها بكلمات مختلفة قليلاً، وفقرة ختامية تلخّص ما قاله الإيميل أصلاً، وعنوان أكثر رسمية من أي شيء في المتن — هذه تُقرأ كمولّدة لأنها ما ينتجه النموذج حين يُطلب منه أن يبدو شاملاً دون شيء محدد ليقوله. إن كانت مسودّتك بهذا الشكل، فالإصلاح إضافة رقم أو قرار ملموس واحد، لا مجرّد إعادة صياغة النقاط.",
        },
        {
          h: "أين تستخدم الفرق هذا فعلاً دون تفكير في الكشف إطلاقاً",
          p: "معظم الاستخدام المهني للمُنسّن لا علاقة له بأن يفحص أحد وجود ذكاء اصطناعي — الأمر ببساطة أن المسودّة الأولى من النموذج تُقرأ عامة، ومن سيرسلها يريدها أن تبدو أنه كتبها فعلاً، لأنها ستخرج باسمه لشخص يعرف كيف يكتب عادةً. هذا دافع تحريري عادي تماماً، لا يختلف عن التدقيق قبل الضغط على إرسال.",
        },
        {
          h: "ما تستمرّ في فعله يدوياً رغم كل ذلك",
          p: "الأسماء والأرقام والتواريخ وأي شيء خاص بعميل أو صفقة تحتاج فحصاً بشرياً في كل مرة، لأن نموذجاً يصوغ من قالب لا وسيلة له ليعرف هل عمّم رقماً بصمت كان يجب أن يكون دقيقاً. نسّن للنبرة والإيقاع؛ وتحقّق من التفاصيل بنفسك قبل أن تخرج. هذا الانضباط نفسه في أي مرور تحريري آخر، مُطبَّق هنا على المسودّات المدعومة بالذكاء الاصطناعي تحديداً.",
        },
      ],
      rules: [
        { when: "المسودّة تتحوّط بدل الالتزام بموقف", then: "احذف التحوّط إن كان لديك موقف فعلاً. الإيقاع وحده لن يصلح لغة متهرّبة." },
        { when: "إيميل عميل وملاحظة داخلية يُقرآن متطابقين", then: "هذا التطابق هو العلامة الفاضحة. اضبط أسلوب المُنسّن عمداً لكل جمهور." },
        { when: "النقاط تُعيد الفكرة نفسها بكلمات مختلفة", then: "أضف رقماً أو قراراً ملموساً واحداً بدل إعادة صياغة النقاط — هذا ما ينقص فعلاً." },
        { when: "المسودّة فيها أسماء أو تواريخ أو أرقام", then: "تحقّق منها يدوياً أياً كانت طريقة إنتاج الباقي. التنسين يغيّر الإيقاع لا الحقائق، لكن تحقّق رغم ذلك." },
      ],
      faq: [
        { q: "هل استخدام هذا في إيميلات العمل مشكلة لشركتي؟", a: "راجع سياسة شركتك تجاه الذكاء الاصطناعي إن وُجدت — معظمها يعامل هذا كأي أداة تحرير. القلق في معظم سياسات العمل هو سرّية ما تلصقه لا فعل تحرير أسلوب مسودّاتك أنت." },
        { q: "هل سيجعل كتابتي أقلّ احترافية؟", a: "لا ينبغي — مُصمَّم للحفاظ على السجلّ مع إصلاح الصياغة العامة. وإن بدت النتيجة عامية أكثر من اللازم للسياق، استخدم إعداد الأسلوب الأكاديمي أو الرسمي بدل الافتراضي." },
        { q: "هل أستخدمه على مستند يواجه عميلاً؟", a: "نعم، بالحذر نفسه لأي مستند عميل: تحقّق من كل رقم واسم والتزام يدوياً قبل الإرسال، أياً كانت الأداة التي لمست الصياغة." },
        { q: "هل يعمل مع المراسلات المهنية العربية؟", a: "نعم، بصياغة عربية أصيلة — مفيد تحديداً لأن الكتابة المهنية العربية الرسمية لها سجلّها الخاص الذي يتعامل معه خطّ إنجليزي مترجَم بضعف." },
        { q: "هل توجد طريقة أسرع من تشغيل كل إيميل عبره؟", a: "لأي شيء قصير وروتيني، الإصلاح الأسرع عادةً هو حذف عبارة تحوّط أو اثنتين بنفسك. احتفظ بالمُنسّن للمستندات الأطول — التقارير والعروض وأي شيء بمخاطر حقيقية." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "social-media",
    order: 5,
    related: [
      { href: "/blog/linkedin-ai-slop-button", en: "LinkedIn's \"looks like AI slop\" button", ar: "زرّ «يبدو AI slop» على LinkedIn" },
      { href: "/blog/chatgpt-writing-tells", en: "The tells that give AI text away", ar: "العلامات التي تفضح النص الآلي" },
      { href: "/blog/humanizer-styles-when-to-use", en: "Which humanizer style to use, and when", ar: "أي أسلوب تنسين تختار، ومتى" },
    ],
    en: {
      h1: "AI Humanizer for Social Media & LinkedIn",
      metaTitle: "AI Humanizer for LinkedIn & Social Posts — Before Readers Call It Out Themselves",
      metaDescription:
        "Readers now have their own tools for flagging AI-shaped posts publicly, and the emoji-bullet, humble-brag structure is instantly recognisable. Here's what actually needs to change.",
      lede:
        "The bar for AI-sounding social posts moved recently: readers now have public, one-click ways to flag a post as AI-shaped, and the specific structure that gets caught — the emoji bullet list, the humble-brag opener, the \"here's what I learned\" close — is recognisable at a glance, not just to an algorithm but to anyone who scrolls the platform daily.",
      sections: [
        {
          h: "The structure that gets called out, specifically",
          p: "It's rarely the sentences themselves — it's the shape of the post. A hook line designed to stop scrolling, three to five points each starting with an emoji, and a closing line asking readers to share their own experience: this template is so common that platform readers now recognise it faster than any detection tool does. Humanizing individual sentences inside that structure doesn't fix the structure itself.",
        },
        {
          h: "What a humanizer fixes here, and what you have to fix yourself",
          p: "It varies sentence rhythm and removes the stacked-transition feel — \"Moreover,\" \"Additionally,\" \"In today's fast-paced world\" — that reads as generated even in a short post. What it can't do is remove an emoji-bullet structure or invent the specific story a post is missing. If the underlying post is a generic list of tips anyone could have written, a rhythm pass produces a smoother generic list of tips.",
        },
        {
          h: "The fix that actually works: one specific detail",
          p: "A post built around something that happened to you specifically — a number from your own project, a mistake you made, a client's exact words — reads as human regardless of how it's phrased, because a model has nothing equivalent to draw from. This is the same principle as the cover letter case: specificity beats smoothness. Write that detail yourself; use the humanizer only on the connective tissue around it.",
        },
        {
          h: "Brand and company accounts have a harder version of this problem",
          p: "A single person's occasional generic post is forgettable. A brand account posting in the same AI-shaped pattern daily builds a recognisable, negative signature over time — followers start anticipating the structure before they read the content. If you manage a brand account, vary structure deliberately post to post, not just sentence rhythm within each one, or the pattern will out you regardless of how any individual post reads.",
        },
        {
          h: "What this is not for",
          p: "Making a fabricated story or a borrowed insight sound like it happened to you is not a style problem a humanizer solves — it's a different problem, and it's the kind of thing that damages your credibility far worse than an obviously AI-written post does when it's eventually discovered. Use this on writing that's actually yours in substance and needs help sounding like it.",
        },
      ],
      rules: [
        { when: "The post follows the emoji-bullet, hook-then-list template", then: "Restructure it before humanizing. Rhythm can't fix a recognisable template." },
        { when: "The post is a generic list of tips with no personal detail", then: "Add one specific thing that happened to you. That single change does more than any rewrite." },
        { when: "You manage a brand account posting often", then: "Vary structure between posts deliberately, not just wording within each one." },
        { when: "The story or insight isn't actually yours", then: "Don't use a humanizer to make it sound like it is. That's a credibility problem, not a style one." },
      ],
      faq: [
        { q: "Can platforms actually detect AI-written posts now?", a: "Some now offer readers a way to flag posts as AI-shaped, based on writing pattern rather than a certified detection of authorship — which means the same false-positive issues that affect any detector apply here too, including for careful non-native writers." },
        { q: "Will humanizing guarantee my post isn't flagged?", a: "No tool can guarantee that, and treat any claim that it can with suspicion. What reliably helps is removing the recognisable template structure and adding something specific — that addresses the actual reason posts get flagged by readers, not just by algorithms." },
        { q: "Is it OK to use AI to draft social posts at all?", a: "Using it to structure your thinking or produce a first pass is ordinary. The credibility risk is specifically in presenting a fabricated personal story or borrowed insight as your own lived experience — that's a different problem from AI assistance itself." },
        { q: "Does this work for Arabic social content?", a: "Yes, with native Arabic phrasing rather than a translated pipeline — useful given how much LinkedIn and social discussion in Arabic-speaking markets is starting to face the same scrutiny English content already does." },
        { q: "How long should I run through it at once?", a: "Social posts are typically well within the free tier's 250-word limit per run, so most single posts fit in one pass." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي لمنشورات LinkedIn ومواقع التواصل",
      metaTitle: "مُنسّن الذكاء الاصطناعي لمنشورات LinkedIn — قبل أن يكتشفها القرّاء بأنفسهم",
      metaDescription:
        "صار للقرّاء الآن أدواتهم الخاصة للإبلاغ العلني عن منشور يبدو آلي الشكل، وبنية النقاط الرمزية والافتتاحية المتفاخرة معروفة بمجرد النظر. إليك ما يحتاج تغييراً فعلاً.",
      lede:
        "تحرّك سقف المنشورات التي تبدو آلية مؤخراً: صار للقرّاء طرق عامة بضغطة واحدة للإبلاغ عن منشور يبدو آلي الشكل، والبنية المحددة التي تُكتَشف — قائمة النقاط بالإيموجي، والافتتاحية المتفاخرة بتواضع، والختام بـ«هذا ما تعلّمته» — معروفة بلمحة، لا لخوارزمية فقط بل لأي شخص يمرّر المنصة يومياً.",
      sections: [
        {
          h: "البنية التي تُكتَشف تحديداً",
          p: "نادراً ما تكون الجمل نفسها — بل شكل المنشور. جملة استهلال مصمَّمة لوقف التمرير، وثلاث إلى خمس نقاط تبدأ كل واحدة بإيموجي، وجملة ختامية تطلب من القرّاء مشاركة تجربتهم — هذا القالب شائع لدرجة أن قرّاء المنصة يتعرّفون عليه الآن أسرع من أي أداة كشف. وتنسين الجمل الفردية داخل تلك البنية لا يصلح البنية نفسها.",
        },
        {
          h: "ما يصلحه المُنسّن هنا وما عليك إصلاحه بنفسك",
          p: "ينوّع إيقاع الجمل ويحذف إحساس الروابط المتراكمة — «علاوة على ذلك»، و«بالإضافة إلى ذلك»، و«في عالم اليوم سريع الوتيرة» — التي تُقرأ مولّدة حتى في منشور قصير. وما لا يستطيعه هو إزالة بنية النقاط بالإيموجي أو اختراع القصة المحددة التي يفتقدها المنشور. فإن كان المنشور الأساسي قائمة نصائح عامة يستطيع أي أحد كتابتها، فمرور الإيقاع يُنتج قائمة نصائح عامة أنعم فقط.",
        },
        {
          h: "الإصلاح الذي ينجح فعلاً: تفصيل محدد واحد",
          p: "منشور مبني حول شيء حدث لك تحديداً — رقم من مشروعك أنت، أو خطأ ارتكبته، أو كلمات عميل بالضبط — يُقرأ بشرياً أياً كانت صياغته، لأن النموذج لا يملك ما يعادله ليستمدّ منه. هذا المبدأ نفسه في حالة خطاب التوظيف: التحديد يفوق النعومة. اكتب ذلك التفصيل بنفسك؛ واستخدم المُنسّن فقط على النسيج الرابط حوله.",
        },
        {
          h: "حسابات العلامات التجارية تواجه نسخة أصعب من هذه المشكلة",
          p: "منشور عام عرضي من شخص واحد يُنسى. أما حساب علامة تجارية ينشر بالنمط الآلي الشكل نفسه يومياً فيبني بصمة سلبية معروفة مع الوقت — يبدأ المتابعون بتوقّع البنية قبل أن يقرؤوا المحتوى. إن كنت تدير حساب علامة تجارية، نوّع البنية عمداً بين منشور وآخر، لا إيقاع الجملة داخل كل واحد فقط، وإلا فضحك النمط أياً كانت قراءة أي منشور فردي.",
        },
        {
          h: "ما لا يصلح له هذا",
          p: "جعل قصة مختلَقة أو فكرة مستعارة تبدو أنها حدثت لك ليست مشكلة أسلوب يحلّها مُنسّن — إنها مشكلة مختلفة، ومن النوع الذي يضرّ مصداقيتك أسوأ بكثير من منشور آلي الكتابة واضح عند اكتشافه لاحقاً. استخدم هذا على كتابة هي جوهرياً لك فعلاً وتحتاج مساعدة لتبدو كذلك.",
        },
      ],
      rules: [
        { when: "المنشور يتبع قالب النقاط بالإيموجي والاستهلال-ثم-القائمة", then: "أعد بناءه قبل التنسين. الإيقاع لا يستطيع إصلاح قالب معروف." },
        { when: "المنشور قائمة نصائح عامة بلا تفصيل شخصي", then: "أضف شيئاً محدداً حدث لك. هذا التغيير الواحد يفعل أكثر من أي إعادة صياغة." },
        { when: "تدير حساب علامة تجارية ينشر بكثرة", then: "نوّع البنية بين المنشورات عمداً، لا الصياغة داخل كل واحد فقط." },
        { when: "القصة أو الفكرة ليست لك فعلاً", then: "لا تستخدم مُنسّناً لجعلها تبدو كذلك. هذه مشكلة مصداقية لا أسلوب." },
      ],
      faq: [
        { q: "هل تستطيع المنصّات كشف المنشورات المكتوبة بالذكاء الاصطناعي فعلاً الآن؟", a: "بعضها يعرض للقرّاء طريقة للإبلاغ عن منشور يبدو آلي الشكل، بناءً على نمط الكتابة لا كشف مُعتمَد لهوية الكاتب — ما يعني أن مشاكل الإنذار الخاطئ نفسها التي تصيب أي كاشف تنطبق هنا أيضاً، بما فيها على الكاتبين بلغة ثانية المتحرّين." },
        { q: "هل يضمن التنسين ألّا يُبلَّغ عن منشوري؟", a: "لا تستطيع أي أداة ضمان ذلك، وعامِل أي ادعاء بذلك بريبة. ما ينفع فعلاً هو إزالة بنية القالب المعروفة وإضافة شيء محدد — وهذا يعالج السبب الحقيقي لإبلاغ القرّاء لا الخوارزميات فقط." },
        { q: "هل من المقبول استخدام الذكاء الاصطناعي في صياغة منشورات التواصل أصلاً؟", a: "استخدامه لترتيب تفكيرك أو إنتاج مسودّة أولى عادي. مخاطر المصداقية تحديداً في تقديم قصة شخصية مختلَقة أو فكرة مستعارة كتجربة معيشة لك — وهذه مشكلة مختلفة عن الاستعانة بالذكاء الاصطناعي نفسها." },
        { q: "هل يعمل مع المحتوى العربي على مواقع التواصل؟", a: "نعم، بصياغة عربية أصيلة بدل خطّ مترجَم — مفيد نظراً لأن نقاش LinkedIn والتواصل بالعربية بدأ يواجه التدقيق نفسه الذي يواجهه المحتوى الإنجليزي أصلاً." },
        { q: "كم يجب أن أشغّله دفعة واحدة؟", a: "منشورات التواصل عادةً ضمن حدّ الخطة المجانية البالغ ٢٥٠ كلمة لكل محاولة، فمعظم المنشورات الفردية تُغطّى بمرور واحد." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "assisted-academic-writing",
    order: 6,
    related: [
      { href: "/blog/how-to-cite-ai-academic-work", en: "How to cite and disclose AI use", ar: "كيف تُوثّق استخدام الذكاء الاصطناعي" },
      { href: "/blog/ai-writing-policy-for-teams", en: "Reading your own institution's AI policy", ar: "قراءة سياسة مؤسستك تجاه الذكاء الاصطناعي" },
      { href: "/ai-detector/students", en: "Check your own writing before you submit", ar: "افحص كتابتك قبل التسليم" },
    ],
    en: {
      h1: "AI Humanizer for Permitted Academic Assistance",
      metaTitle: "AI Humanizer for Academic Writing — Only Where Assistance Is Actually Permitted",
      metaDescription:
        "This page is not about passing a detection check. It's about turning AI-assisted brainstorming or a language-editing pass, in a context where that's allowed, into prose that is authentically yours.",
      lede:
        "Read the line first, because it governs everything else on this page: this tool is not a way to disguise AI-authored text from an academic integrity check, and using it that way is misconduct at most institutions regardless of what produced the words. What follows is for the narrower, legitimate case — assistance your syllabus actually permits, turned into writing that is genuinely your own.",
      sections: [
        {
          h: "Where AI assistance is commonly permitted, and where it isn't",
          p: "Most policies distinguish between using AI to brainstorm, to summarize a source for your own understanding, or to check grammar — usually permitted, often with disclosure — and submitting generated prose as your own analysis, which is misconduct almost everywhere. If a model helped you outline an argument or think through a structure, the final sentences still need to be yours. A humanizer's legitimate job here is polishing writing that is substantively yours, not disguising writing that isn't.",
        },
        {
          h: "What this looks like in practice",
          p: "You used AI to summarize three sources and see how they relate. You wrote your own analysis based on that summary, in your own words, reflecting your own understanding. The draft reads a little stiff because you were focused on getting the argument right, not the rhythm. That's the exact case a humanizer is for — the substance and the understanding are already yours; what's missing is polish.",
        },
        {
          h: "Disclosure protects you; a humanizer doesn't need to hide anything",
          p: "If your institution requires disclosing AI assistance, disclosing that you used it to brainstorm or check grammar — then humanized your own resulting prose for rhythm — is a complete and honest account of your process. There's nothing here that needs to be hidden, because nothing here crosses into someone else's writing being presented as yours. Vague disclosure invites suspicion; a specific one closes the question.",
        },
        {
          h: "Why a detector might still flag your work, and why that's not this tool's failure",
          p: "Academic writing runs formulaic by disciplinary convention — a methods section is supposed to read a certain way regardless of who wrote it, and that alone can trigger a detector. Humanizing genuinely your own writing may lower a score by reducing accidental uniformity, but it is not a fix for a score driven by discipline convention, and it should never be run with that specific goal in mind. If you're worried about a flag, the actual defence is your edit history and your ability to explain your argument, not a rewriting pass.",
        },
        {
          h: "If you're not sure your use case is permitted",
          p: "Ask your instructor before you submit, not after you're flagged. \"I used AI to summarize sources and check my grammar — is that within policy, and how should I disclose it?\" is a two-line email that resolves genuine uncertainty. Assuming permission and being wrong costs far more than the minor awkwardness of asking.",
        },
      ],
      rules: [
        { when: "AI helped you brainstorm or outline only", then: "Write the final prose yourself. Humanize that — never AI-generated analysis presented as your own." },
        { when: "Your policy requires disclosure", then: "Be specific about what AI did (brainstorming, grammar check) rather than vague. Specificity closes questions; vagueness invites them." },
        { when: "You're worried about a detector flag on genuinely your own work", then: "Your edit history and your ability to explain the argument are the actual defence — not running everything through a humanizer." },
        { when: "You're unsure if your use case is permitted at all", then: "Ask your instructor before submitting. A two-line email beats a wrong assumption." },
      ],
      faq: [
        { q: "Can I use this to make an AI-written essay pass as my own?", a: "No — that's academic misconduct at most institutions regardless of what tool touches the text afterward, and this page explicitly isn't for that. It's for polishing writing that is substantively your own analysis." },
        { q: "Will humanizing lower my detector score enough to avoid a flag?", a: "It might, if the original cause was accidental uniformity in your own honest writing. It won't fix a score driven by discipline convention (methods sections read formulaic by design) or by writing in a second language — those need context, not rewriting." },
        { q: "What should I disclose if I use both AI assistance and a humanizer?", a: "Whatever your institution's policy asks for, stated specifically: what AI helped with (e.g., summarizing sources, checking grammar) and that you used a style tool on your own resulting prose. Vague disclosure reads worse than specific disclosure." },
        { q: "Does this work for Arabic academic writing?", a: "Yes, with native Arabic phrasing tuned for academic register rather than a translated pipeline — useful given how much Arabic academic writing already reads as unusually uniform to English-calibrated detectors, independent of any AI involvement." },
        { q: "My professor says no AI assistance at all. Can I still use this?", a: "No. If your policy prohibits AI assistance entirely, that includes using a humanizer on AI-assisted drafts. Read your own institution's policy — it governs this, not what any tool is technically capable of." },
      ],
    },
    ar: {
      h1: "مُنسّن الذكاء الاصطناعي للاستعانة الأكاديمية المسموحة",
      metaTitle: "مُنسّن الذكاء الاصطناعي للكتابة الأكاديمية — فقط حيث الاستعانة مسموحة فعلاً",
      metaDescription:
        "هذه الصفحة ليست عن اجتياز فحص كشف. إنها عن تحويل عصف ذهني أو مراجعة لغوية بمساعدة الذكاء الاصطناعي، في سياق مسموح به، إلى نثر هو أصيل لك فعلاً.",
      lede:
        "اقرأ هذا السطر أولاً، لأنه يحكم كل ما تبقّى في هذه الصفحة: هذه الأداة ليست وسيلة لتمويه نص ألّفه الذكاء الاصطناعي أمام فحص نزاهة أكاديمية، واستخدامها بهذا الشكل مخالفة في معظم المؤسسات أياً كان ما أنتج الكلمات. وما يلي هو للحالة الأضيق المشروعة — استعانة تسمح بها لائحتك فعلاً، تتحوّل إلى كتابة هي لك أنت أصالةً.",
      sections: [
        {
          h: "أين تُسمح الاستعانة بالذكاء الاصطناعي عادةً وأين لا تُسمح",
          p: "معظم السياسات تفرّق بين استخدام الذكاء الاصطناعي للعصف الذهني، أو تلخيص مصدر لفهمك أنت، أو مراجعة القواعد — مسموح عادةً وغالباً بالإفصاح — وبين تسليم نثر مولّد كتحليلك أنت، وهو مخالفة في كل مكان تقريباً. فإن ساعدك نموذج في تخطيط حجّة أو التفكير في بنية، فالجمل النهائية ما زالت يجب أن تكون لك. ووظيفة المُنسّن المشروعة هنا صقل كتابة هي لك جوهرياً، لا تمويه كتابة ليست كذلك.",
        },
        {
          h: "كيف يبدو هذا عملياً",
          p: "استخدمت الذكاء الاصطناعي لتلخيص ثلاثة مصادر ورؤية كيف تترابط. وكتبت تحليلك أنت بناءً على ذلك الملخّص، بكلماتك أنت، عاكساً فهمك أنت. المسودّة تُقرأ متصلّبة قليلاً لأنك ركّزت على ضبط الحجّة لا الإيقاع. هذه بالضبط الحالة التي صُنع لها المُنسّن — الجوهر والفهم لك أصلاً؛ والناقص هو الصقل.",
        },
        {
          h: "الإفصاح يحميك؛ والمُنسّن لا يحتاج إخفاء شيء",
          p: "إن كانت مؤسستك تشترط الإفصاح عن الاستعانة بالذكاء الاصطناعي، فالإفصاح أنك استخدمته للعصف الذهني أو مراجعة القواعد — ثم نسّنت نثرك أنت الناتج للإيقاع — سرد كامل وصادق لعمليتك. لا شيء هنا يحتاج إخفاءً، لأن لا شيء هنا يعبر إلى كتابة شخص آخر تُقدَّم كأنها لك. الإفصاح الغامض يدعو للريبة؛ والمحدد يُغلق السؤال.",
        },
        {
          h: "لماذا قد يُنذر كاشف عملك رغم ذلك — ولماذا ليس هذا فشل الأداة",
          p: "الكتابة الأكاديمية قوالبية بحكم عرف التخصّص — قسم المنهجية يُفترض أن يُقرأ بطريقة معيّنة أياً كان كاتبه، وهذا وحده قد يُثير كاشفاً. وتنسين كتابتك الأصيلة فعلاً قد يخفض النتيجة بتقليل الانتظام العرضي، لكنه ليس إصلاحاً لنتيجة يقودها عرف التخصّص، وينبغي ألّا يُشغَّل بهذا الهدف تحديداً أبداً. إن كنت قلقاً من إنذار، فالدفاع الحقيقي سجلّ تعديلاتك وقدرتك على شرح حجّتك، لا مرور بإعادة صياغة.",
        },
        {
          h: "إن لم تكن متأكداً أن حالتك مسموحة",
          p: "اسأل أستاذك قبل التسليم لا بعد الإنذار. «استخدمت الذكاء الاصطناعي لتلخيص مصادر ومراجعة قواعدي — هل هذا ضمن اللائحة، وكيف أُفصح عنه؟» بريد من سطرين يحسم شكّاً حقيقياً. وافتراض السماح والخطأ فيه يكلّف أكثر بكثير من إحراج السؤال البسيط.",
        },
      ],
      rules: [
        { when: "ساعدك الذكاء الاصطناعي في العصف الذهني أو التخطيط فقط", then: "اكتب النثر النهائي بنفسك. نسّن ذلك — لا تحليلاً مولّداً يُقدَّم كأنه لك." },
        { when: "لائحتك تشترط الإفصاح", then: "كن محدداً بما فعله الذكاء الاصطناعي (عصف ذهني، مراجعة قواعد) لا غامضاً. التحديد يُغلق الأسئلة؛ والغموض يدعوها." },
        { when: "تقلق من إنذار كاشف على عمل هو لك فعلاً", then: "سجلّ تعديلاتك وقدرتك على شرح الحجّة هما الدفاع الحقيقي — لا تمرير كل شيء عبر مُنسّن." },
        { when: "لست متأكداً أن حالتك مسموحة أصلاً", then: "اسأل أستاذك قبل التسليم. بريد من سطرين يفوق افتراضاً خاطئاً." },
      ],
      faq: [
        { q: "هل أستخدم هذا لجعل مقال كتبه الذكاء الاصطناعي يمرّ كأنه لي؟", a: "لا — هذه مخالفة أكاديمية في معظم المؤسسات أياً كانت الأداة التي لمست النص بعد ذلك، وهذه الصفحة ليست لذلك صراحةً. إنها لصقل كتابة هي تحليلك أنت جوهرياً." },
        { q: "هل يخفض التنسين نتيجة الكاشف بما يكفي لتجنّب إنذار؟", a: "ربما، إن كان السبب الأصلي انتظاماً عرضياً في كتابتك النزيهة أنت. لكنه لن يصلح نتيجة يقودها عرف التخصّص (أقسام المنهجية قوالبية بالتصميم) أو الكتابة بلغة ثانية — هذه تحتاج سياقاً لا إعادة صياغة." },
        { q: "ماذا أُفصح عنه إن استخدمت استعانة بالذكاء الاصطناعي ومُنسّناً معاً؟", a: "أياً كانت تطلبه سياسة مؤسستك، مذكوراً بتحديد: بماذا ساعد الذكاء الاصطناعي (تلخيص مصادر، مراجعة قواعد مثلاً) وأنك استخدمت أداة أسلوب على نثرك أنت الناتج. الإفصاح الغامض يُقرأ أسوأ من المحدد." },
        { q: "هل يعمل مع الكتابة الأكاديمية العربية؟", a: "نعم، بصياغة عربية أصيلة مضبوطة للسجلّ الأكاديمي بدل خطّ مترجَم — مفيد نظراً لأن الكتابة الأكاديمية العربية تُقرأ أصلاً منتظمة بشكل غير معتاد عند كواشف معايَرة على الإنجليزية، بمعزل عن أي استعانة بالذكاء الاصطناعي." },
        { q: "أستاذي يقول لا استعانة بالذكاء الاصطناعي إطلاقاً. هل أستخدم هذا رغم ذلك؟", a: "لا. إن كانت لائحتك تمنع الاستعانة بالذكاء الاصطناعي كلياً، فهذا يشمل استخدام مُنسّن على مسودّات مدعومة بالذكاء الاصطناعي. اقرأ لائحة مؤسستك أنت — هي التي تحكم هذا، لا ما تقدر عليه أي أداة تقنياً." },
      ],
    },
  },
];

export function getHumanizerUseCase(slug: string): UseCase | undefined {
  return humanizerUseCases.find((u) => u.slug === slug);
}

export const humanizerUseCaseSlugs = humanizerUseCases.map((u) => u.slug);
