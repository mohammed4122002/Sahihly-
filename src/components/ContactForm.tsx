"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

type Labels = {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
};

export default function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="glass-strong glow-card flex flex-col items-center rounded-3xl p-10 text-center">
        <CheckCircle2 size={36} className="text-emerald-300" />
        <p className="mt-4 text-lg font-semibold">{labels.sent}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-strong glow-card rounded-3xl p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">{labels.name}</span>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-violet-400/50"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">{labels.email}</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-violet-400/50"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs text-white/50">{labels.subject}</span>
        <input
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-violet-400/50"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs text-white/50">{labels.message}</span>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm outline-none focus:border-violet-400/50"
        />
      </label>

      {state === "error" && (
        <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <Loader2 size={15} className="animate-spin" /> {labels.sending}
          </>
        ) : (
          <>
            <Send size={15} className="flip-x" /> {labels.send}
          </>
        )}
      </button>
    </form>
  );
}
