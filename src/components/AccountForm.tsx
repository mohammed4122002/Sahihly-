"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, Save, Trash2, CheckCircle2, Mail, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n/config";

const MAX_BYTES = 4 * 1024 * 1024; // 4MB

function notifyHeader() {
  window.dispatchEvent(new Event("sahihly:profile-updated"));
}

export default function AccountForm({
  locale,
  userId,
  email,
  initialFullName,
  initialAvatarUrl,
}: {
  locale: Locale;
  userId: string;
  email: string;
  initialFullName: string;
  initialAvatarUrl: string | null;
}) {
  const ar = locale === "ar";
  const fileRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [fullName, setFullName] = useState(initialFullName);
  const [uploading, setUploading] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedName, setSavedName] = useState(false);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again later
    if (!file) return;

    setError(null);
    if (!file.type.startsWith("image/")) {
      setError(ar ? "الرجاء اختيار ملف صورة." : "Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(ar ? "الحد الأقصى ٤ ميغابايت." : "Maximum size is 4MB.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setAvatarUrl(localPreview);
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${userId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { cacheControl: "3600", contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: pub.publicUrl, updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (updateError) throw updateError;

      setAvatarUrl(pub.publicUrl);
      notifyHeader();
    } catch (err) {
      setAvatarUrl(initialAvatarUrl);
      const message = err instanceof Error ? err.message : "";
      setError(
        message.includes("Bucket not found")
          ? ar
            ? "لم يُهيَّأ تخزين الصور بعد — راجع الإعداد."
            : "Avatar storage isn't set up yet — check configuration."
          : ar
            ? "تعذّر رفع الصورة."
            : "Couldn't upload the photo."
      );
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  }

  async function removePhoto() {
    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null, updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (updateError) throw updateError;
      setAvatarUrl(null);
      notifyHeader();
    } catch {
      setError(ar ? "تعذّر الحذف." : "Couldn't remove the photo.");
    } finally {
      setUploading(false);
    }
  }

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    setSavingName(true);
    setSavedName(false);
    setError(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (updateError) throw updateError;
      setSavedName(true);
      notifyHeader();
      setTimeout(() => setSavedName(false), 2500);
    } catch {
      setError(ar ? "تعذّر حفظ الاسم." : "Couldn't save the name.");
    } finally {
      setSavingName(false);
    }
  }

  const initial = (fullName || email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="glass-strong glow-card rounded-3xl p-7">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-violet-400/15 text-3xl font-bold text-violet-200">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            aria-label={ar ? "تغيير الصورة" : "Change photo"}
            className="btn-primary absolute -bottom-1 -end-1 flex h-9 w-9 items-center justify-center rounded-full p-0"
          >
            {uploading ? <Loader2 size={15} className="animate-spin" /> : <Camera size={15} />}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>

        {avatarUrl && (
          <button
            type="button"
            onClick={removePhoto}
            disabled={uploading}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-red-300"
          >
            <Trash2 size={12} /> {ar ? "إزالة الصورة" : "Remove photo"}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-xs text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={saveName} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">{ar ? "البريد الإلكتروني" : "Email"}</span>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-3.5">
            <Mail size={15} className="shrink-0 text-white/30" />
            <input
              dir="ltr"
              value={email}
              disabled
              className="w-full min-w-0 bg-transparent py-2.5 text-sm text-white/50 outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs text-white/50">{ar ? "الاسم الكامل" : "Full name"}</span>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3.5 transition-colors focus-within:border-violet-400/50">
            <User size={15} className="shrink-0 text-white/35" />
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={savingName}
          className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
        >
          {savingName ? (
            <Loader2 size={15} className="animate-spin" />
          ) : savedName ? (
            <CheckCircle2 size={15} />
          ) : (
            <Save size={15} />
          )}
          {savedName ? (ar ? "تم الحفظ" : "Saved") : ar ? "حفظ التغييرات" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
