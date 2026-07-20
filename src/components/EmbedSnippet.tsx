"use client";

import { useState } from "react";
import { Check, Code2, Copy } from "lucide-react";
import { SITE_URL } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

export default function EmbedSnippet({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const ar = locale === "ar";

  const code = `<iframe src="${SITE_URL}/embed${ar ? "?lang=ar" : ""}" width="100%" height="560" style="border:0;border-radius:16px" title="Sahihly AI Detector" loading="lazy"></iframe>`;

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="glass glow-card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Code2 size={18} className="text-violet-300" />
          {ar ? "ضمّن هذه الأداة في موقعك — مجاناً" : "Embed this tool on your site — free"}
        </h2>
        <button
          onClick={copy}
          className="btn-ghost inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? (ar ? "تم النسخ" : "Copied") : ar ? "انسخ الكود" : "Copy code"}
        </button>
      </div>
      <p className="mt-2 text-sm text-white/55">
        {ar
          ? "أضف كاشف الذكاء الاصطناعي لموقعك أو مدونتك بسطر واحد — يعمل فوراً ويقدّم قيمة حقيقية لقرّائك."
          : "Add the AI detector to your site or blog with one line — it works instantly and gives your readers real value."}
      </p>
      <pre dir="ltr" className="mt-4 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs leading-relaxed text-violet-200/90">
        {code}
      </pre>
    </div>
  );
}
