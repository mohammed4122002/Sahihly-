"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const CONSENT_COOKIE = "sahihly_consent";

function getConsent(): string | null {
  const m = document.cookie.match(/(?:^|; )sahihly_consent=([^;]*)/);
  return m ? m[1] : null;
}

function setConsent(value: "accepted" | "declined") {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function loadAdsense(client: string) {
  if (document.querySelector('script[src*="adsbygoogle"]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

/**
 * GDPR-friendly consent banner. AdSense only loads after explicit consent,
 * which is what Google expects for EEA traffic and what reviewers like to see.
 */
export default function ConsentBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ar = locale === "ar";

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted" && client) {
      loadAdsense(client);
    } else if (consent === null) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, [client]);

  function accept() {
    setConsent("accepted");
    setVisible(false);
    if (client) loadAdsense(client);
  }

  function decline() {
    setConsent("declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong glow-card fixed bottom-4 start-4 end-4 z-[75] mx-auto max-w-lg rounded-2xl p-5 sm:start-auto sm:end-6"
          role="dialog"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <Cookie size={18} className="mt-0.5 shrink-0 text-violet-300" />
            <p className="text-sm leading-relaxed text-white/75">
              {ar
                ? "نستخدم كوكيز أساسية لتشغيل الموقع، وكوكيز إعلانات (Google AdSense) فقط بموافقتك. "
                : "We use essential cookies to run the site, and advertising cookies (Google AdSense) only with your consent. "}
              <a href="/privacy" className="text-violet-300 underline hover:text-violet-200">
                {ar ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={accept} className="btn-primary flex-1 rounded-full px-4 py-2 text-sm">
              {ar ? "موافق" : "Accept"}
            </button>
            <button onClick={decline} className="btn-ghost flex-1 rounded-full px-4 py-2 text-sm">
              {ar ? "الأساسية فقط" : "Essential only"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
