import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Globe, Heart } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return {
    title: dict.nav.about,
    description: dict.ethics.body,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ar: "/ar/about" },
    },
  };
}

const content = {
  en: {
    heading: "About Sahihly",
    lead: "Sahihly is a bilingual writing-quality studio built on a simple belief: great tools should treat Arabic as a first language, not an afterthought.",
    story:
      "We started Sahihly because every serious AI detection and humanizing tool was English-only. Arabic writers — students, creators, professionals — were left with clumsy translations of English rules. Sahihly runs a single engine that reasons natively in both languages, so results feel right whether you write in Cairo, Riyadh, London, or New York.",
    values: [
      { icon: "globe", title: "Bilingual by design", body: "Arabic and English are equal citizens here — same engine, same quality." },
      { icon: "shield", title: "Honest about limits", body: "No detector is perfect. We show scores as guidance, never as accusations." },
      { icon: "heart", title: "Built with care", body: "Crafted from Gaza for the world, with an obsession for quality and fairness." },
    ],
    policyTitle: "Usage Policy",
    policyBody:
      "Sahihly is a style- and quality-review tool for improving your own writing. It is not designed, sold, or endorsed as a way to defeat academic-integrity systems such as Turnitin, or to misrepresent authorship. Detection scores are probabilistic estimates and must not be used as sole evidence of misconduct. By using Sahihly you agree to follow your institution's and employer's policies, and to use the tool responsibly and honestly. We may refuse service for misuse.",
  },
  ar: {
    heading: "عن صحيحلي",
    lead: "صحيحلي استوديو ثنائي اللغة لجودة الكتابة، مبني على قناعة بسيطة: الأدوات الرائعة يجب أن تعامل العربية كلغة أولى، لا كإضافة لاحقة.",
    story:
      "بدأنا صحيحلي لأن كل أداة جادّة للكشف والتنسين كانت إنجليزية فقط. تُرك الكتّاب العرب — طلاباً وصنّاع محتوى ومحترفين — أمام ترجمات ركيكة لقواعد إنجليزية. يعمل صحيحلي بمحرّك واحد يستدل بالعربية والإنجليزية بأصالة، لتبدو النتائج صحيحة سواء كتبت من القاهرة أو الرياض أو لندن أو نيويورك.",
    values: [
      { icon: "globe", title: "ثنائي اللغة بالتصميم", body: "العربية والإنجليزية متساويتان هنا — نفس المحرّك ونفس الجودة." },
      { icon: "shield", title: "صادقون حول الحدود", body: "لا كاشف مثالي. نعرض النتائج كإرشاد، لا كاتهامات." },
      { icon: "heart", title: "صُنع بعناية", body: "مصنوع من غزة للعالم، بشغفٍ للجودة والإنصاف." },
    ],
    policyTitle: "سياسة الاستخدام",
    policyBody:
      "صحيحلي أداة لمراجعة الأسلوب والجودة لتحسين كتابتك أنت. لم تُصمَّم ولا تُباع ولا تُروَّج كوسيلة لتجاوز أنظمة النزاهة الأكاديمية مثل Turnitin، أو للتضليل حول هوية الكاتب. نتائج الكشف تقديرات احتمالية ولا يجوز استخدامها كدليل وحيد على مخالفة. باستخدامك صحيحلي توافق على الالتزام بسياسات مؤسستك وجهة عملك، وعلى استخدام الأداة بمسؤولية وأمانة. قد نرفض الخدمة عند إساءة الاستخدام.",
  },
};

const icons = { globe: Globe, shield: ShieldCheck, heart: Heart };

export default async function AboutPage({
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
        <h1 className="text-4xl font-bold sm:text-5xl">{c.heading}</h1>
        <p className="mt-5 text-lg text-white/70">{c.lead}</p>
        <p className="mt-4 leading-relaxed text-white/55">{c.story}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {c.values.map((v, i) => {
          const Icon = icons[v.icon as keyof typeof icons];
          return (
            <Reveal key={v.title} delay={i} as="div">
              <div className="glass h-full rounded-2xl p-5">
                <Icon className="mb-3 text-violet-300" size={20} />
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{v.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div
          id="policy"
          className="glow-card mt-16 scroll-mt-24 rounded-3xl border border-violet-400/20 bg-violet-400/[0.05] p-8"
        >
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <ShieldCheck className="text-violet-300" /> {c.policyTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">{c.policyBody}</p>
        </div>
      </Reveal>
    </div>
  );
}
