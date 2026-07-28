"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

/**
 * Fixed confirmation strip.
 *
 * Forms here are long enough that on a phone you finish at the bottom of the
 * page, so feedback rendered inline — a button label that changes for two
 * seconds, or a message near the top — happens somewhere you are not looking.
 * Pinning it to the viewport means the answer is where your eyes already are,
 * whatever the scroll position.
 */
export default function Toast({
  show,
  ok,
  text,
  onClose,
  closeLabel,
}: {
  show: boolean;
  ok: boolean;
  text: string;
  onClose: () => void;
  closeLabel: string;
}) {
  // Errors stay until dismissed — they usually need the reader to do something.
  useEffect(() => {
    if (!show || !ok) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [show, ok, onClose]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4"
    >
      <div
        className={`flex max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${
          ok
            ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-100"
            : "border-red-500/30 bg-red-500/15 text-red-100"
        }`}
      >
        {ok ? (
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
        ) : (
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
        )}
        <p className="text-sm leading-relaxed">{text}</p>
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="-me-1 shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
