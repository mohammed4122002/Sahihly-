"use client";

import { useState } from "react";
import { Loader2, Save, CheckCircle2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Toast from "@/components/Toast";
import type { Locale } from "@/lib/i18n/config";

export type AuthorFields = {
  username: string;
  title_ar: string;
  title_en: string;
  bio_ar: string;
  bio_en: string;
  website_url: string;
  x_url: string;
  linkedin_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  whatsapp: string;
};

const EMPTY: AuthorFields = {
  username: "", title_ar: "", title_en: "", bio_ar: "", bio_en: "",
  website_url: "", x_url: "", linkedin_url: "", facebook_url: "",
  instagram_url: "", youtube_url: "", whatsapp: "",
};

/** Usernames end up in a URL, so keep them to characters that survive one. */
function cleanUsername(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

/**
 * The public half of a writer's profile. Only rendered for staff accounts —
 * an ordinary user has no author page for any of this to appear on.
 */
export default function AuthorProfileForm({
  locale,
  userId,
  initial,
}: {
  locale: Locale;
  userId: string;
  initial: Partial<AuthorFields>;
}) {
  const ar = locale === "ar";
  const [form, setForm] = useState<AuthorFields>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);

  function set<K extends keyof AuthorFields>(key: K, value: AuthorFields[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const username = cleanUsername(form.username);
      const supabase = createClient();
      const { error: err } = await supabase
        .from("profiles")
        .update({
          ...form,
          username: username || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
      if (err) throw err;
      setForm((f) => ({ ...f, username }));
      setSaved(true);
      setToast({
        ok: true,
        text: ar
          ? username
            ? `تم الحفظ ✓ صفحتك العامة: /author/${username}`
            : "تم الحفظ ✓"
          : username
            ? `Saved ✓ your public page: /author/${username}`
            : "Saved ✓",
      });
      window.dispatchEvent(new Event("sahihly:profile-updated"));
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      const text =
        message.includes("duplicate") || message.includes("unique")
          ? ar
            ? "اسم المستخدم محجوز — اختر غيره."
            : "That username is taken — pick another."
          : ar
            ? "تعذّر الحفظ."
            : "Couldn't save.";
      setError(text);
      setToast({ ok: false, text });
    } finally {
      setSaving(false);
    }
  }

  const socials: { key: keyof AuthorFields; label: string; placeholder: string }[] = [
    { key: "website_url", label: ar ? "الموقع الشخصي" : "Website", placeholder: "example.com" },
    { key: "x_url", label: "X (Twitter)", placeholder: "x.com/username" },
    { key: "linkedin_url", label: "LinkedIn", placeholder: "linkedin.com/in/username" },
    { key: "facebook_url", label: "Facebook", placeholder: "facebook.com/username" },
    { key: "instagram_url", label: "Instagram", placeholder: "instagram.com/username" },
    { key: "youtube_url", label: "YouTube", placeholder: "youtube.com/@channel" },
  ];

  return (
    <form onSubmit={save} className="glass-strong glow-card mt-6 rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">
          {ar ? "ملفك كـكاتب" : "Your writer profile"}
        </h2>
        {form.username && (
          <a
            href={`/author/${form.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-violet-300 hover:text-violet-200"
          >
            {ar ? "اعرض صفحتك" : "View your page"} <ExternalLink size={12} />
          </a>
        )}
      </div>
      <p className="mt-1.5 text-sm text-white/50">
        {ar
          ? "يظهر هذا للجميع في صفحتك العامة وأسفل كل مقال تكتبه."
          : "This is public — it appears on your author page and under every article you write."}
      </p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-xs text-white/50">
          {ar ? "اسم المستخدم (رابط صفحتك)" : "Username (your page address)"}
        </span>
        <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-3.5 transition-colors focus-within:border-violet-400/50">
          <span className="shrink-0 text-sm text-white/30" dir="ltr">/author/</span>
          <input
            dir="ltr"
            value={form.username}
            onChange={(e) => set("username", e.target.value)}
            placeholder="your-name"
            className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
      </label>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label={ar ? "المسمّى بالعربية" : "Title (Arabic)"}
          value={form.title_ar}
          onChange={(v) => set("title_ar", v)}
          placeholder={ar ? "كاتب محتوى" : "كاتب محتوى"}
        />
        <Field
          label={ar ? "المسمّى بالإنجليزية" : "Title (English)"}
          value={form.title_en}
          onChange={(v) => set("title_en", v)}
          placeholder="Content Writer"
          dir="ltr"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Area
          label={ar ? "نبذة بالعربية" : "Bio (Arabic)"}
          value={form.bio_ar}
          onChange={(v) => set("bio_ar", v)}
        />
        <Area
          label={ar ? "نبذة بالإنجليزية" : "Bio (English)"}
          value={form.bio_en}
          onChange={(v) => set("bio_en", v)}
          dir="ltr"
        />
      </div>

      <h3 className="mt-7 text-sm font-semibold text-white/70">
        {ar ? "روابط التواصل" : "Links"}
      </h3>
      <p className="mt-1 text-xs text-white/40">
        {ar ? "اترك أي حقل فارغاً ولن يظهر." : "Leave any field empty and it won't be shown."}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {socials.map((sfield) => (
          <Field
            key={sfield.key}
            label={sfield.label}
            value={form[sfield.key]}
            onChange={(v) => set(sfield.key, v)}
            placeholder={sfield.placeholder}
            dir="ltr"
          />
        ))}
        <Field
          label={ar ? "رقم واتساب (بمفتاح الدولة)" : "WhatsApp (with country code)"}
          value={form.whatsapp}
          onChange={(v) => set("whatsapp", v)}
          placeholder="970590000000"
          dir="ltr"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
      >
        {saving ? (
          <Loader2 size={15} className="animate-spin" />
        ) : saved ? (
          <CheckCircle2 size={15} />
        ) : (
          <Save size={15} />
        )}
        {saved ? (ar ? "تم الحفظ" : "Saved") : ar ? "حفظ الملف" : "Save profile"}
      </button>

      <Toast
        show={Boolean(toast)}
        ok={toast?.ok ?? true}
        text={toast?.text ?? ""}
        onClose={() => setToast(null)}
        closeLabel={ar ? "إغلاق" : "Dismiss"}
      />
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/50">{label}</span>
      <input
        dir={dir}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-white/20 focus:border-violet-400/50"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "ltr";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/50">{label}</span>
      <textarea
        dir={dir}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm leading-relaxed outline-none transition-colors focus:border-violet-400/50"
      />
    </label>
  );
}
