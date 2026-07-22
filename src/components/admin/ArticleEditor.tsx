"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, Trash2, Plus, Pencil, X } from "lucide-react";
import { savePost, deletePost, type PostInput } from "@/app/[locale]/admin/actions";

export type DbPost = PostInput & { id: string; created_at: string };

const empty: PostInput = {
  slug: "",
  category: "Guides",
  title_en: "",
  title_ar: "",
  excerpt_en: "",
  excerpt_ar: "",
  body_en: "",
  body_ar: "",
  reading_time: 5,
  published: true,
};

function Field({
  label,
  value,
  onChange,
  dir,
  textarea,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "rtl" | "ltr";
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/50">{label}</span>
      {textarea ? (
        <textarea
          dir={dir}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-violet-400/50"
        />
      ) : (
        <input
          dir={dir}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-violet-400/50"
        />
      )}
    </label>
  );
}

export default function ArticleEditor({ posts, ar }: { posts: DbPost[]; ar: boolean }) {
  const [form, setForm] = useState<PostInput>(empty);
  const [editId, setEditId] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function set<K extends keyof PostInput>(k: K, v: PostInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function newPost() {
    setForm(empty);
    setEditId(undefined);
    setMsg(null);
    setOpen(true);
  }

  function edit(p: DbPost) {
    const { id, created_at, ...rest } = p;
    void id;
    void created_at;
    setForm(rest);
    setEditId(p.id);
    setMsg(null);
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const res = await savePost(form, editId);
      if (res.ok) {
        setMsg(ar ? "تم الحفظ ✓" : "Saved ✓");
        setOpen(false);
      }
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      {/* list */}
      <div className="glass glow-card overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <h2 className="text-sm font-semibold text-white/80">
            {ar ? "مقالاتك" : "Your articles"} ({posts.length})
          </h2>
          <button onClick={newPost} className="btn-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs">
            <Plus size={13} /> {ar ? "مقال جديد" : "New article"}
          </button>
        </div>
        {posts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            {ar ? "لا مقالات مضافة من اللوحة بعد." : "No articles added from the panel yet."}
          </p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border-t border-white/5 px-5 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate text-white/85">{p.title_en || p.title_ar}</p>
                <p className="text-xs text-white/40">
                  /{p.slug} · {p.category} · {p.published ? (ar ? "منشور" : "published") : ar ? "مسودّة" : "draft"}
                </p>
              </div>
              <button onClick={() => edit(p)} className="rounded-lg p-1.5 text-white/40 hover:text-violet-300">
                <Pencil size={15} />
              </button>
              <button
                onClick={() => start(() => deletePost(p.id))}
                className="rounded-lg p-1.5 text-white/40 hover:text-red-300"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* editor */}
      <div className="glass glow-card rounded-2xl p-5">
        {!open ? (
          <div className="flex flex-col items-center py-8 text-center">
            <Pencil size={22} className="text-violet-300/70" />
            <p className="mt-3 text-sm text-white/50">
              {ar ? "اختر مقالاً للتعديل أو أنشئ مقالاً جديداً." : "Pick an article to edit, or create a new one."}
            </p>
            <button onClick={newPost} className="btn-primary mt-4 rounded-full px-5 py-2 text-sm">
              {ar ? "مقال جديد" : "New article"}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                {editId ? (ar ? "تعديل مقال" : "Edit article") : ar ? "مقال جديد" : "New article"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <Field label={ar ? "العنوان (إنجليزي)" : "Title (EN)"} value={form.title_en} onChange={(v) => set("title_en", v)} dir="ltr" />
            <Field label={ar ? "العنوان (عربي)" : "Title (AR)"} value={form.title_ar} onChange={(v) => set("title_ar", v)} dir="rtl" />
            <div className="grid grid-cols-2 gap-2">
              <Field label={ar ? "الرابط (slug)" : "Slug"} value={form.slug} onChange={(v) => set("slug", v)} dir="ltr" placeholder="auto from title" />
              <Field label={ar ? "التصنيف" : "Category"} value={form.category} onChange={(v) => set("category", v)} dir="ltr" />
            </div>
            <Field label={ar ? "المقتطف (إنجليزي)" : "Excerpt (EN)"} value={form.excerpt_en} onChange={(v) => set("excerpt_en", v)} dir="ltr" textarea rows={2} />
            <Field label={ar ? "المقتطف (عربي)" : "Excerpt (AR)"} value={form.excerpt_ar} onChange={(v) => set("excerpt_ar", v)} dir="rtl" textarea rows={2} />
            <Field label={ar ? "المحتوى (إنجليزي) — HTML" : "Body (EN) — HTML"} value={form.body_en} onChange={(v) => set("body_en", v)} dir="ltr" textarea rows={5} placeholder="<h2>…</h2><p>…</p>" />
            <Field label={ar ? "المحتوى (عربي) — HTML" : "Body (AR) — HTML"} value={form.body_ar} onChange={(v) => set("body_ar", v)} dir="rtl" textarea rows={5} placeholder="<h2>…</h2><p>…</p>" />

            <div className="flex items-center gap-3">
              <Field label={ar ? "دقائق القراءة" : "Reading min"} value={String(form.reading_time)} onChange={(v) => set("reading_time", parseInt(v) || 5)} dir="ltr" />
              <label className="mt-5 inline-flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="accent-violet-400" />
                {ar ? "منشور" : "Published"}
              </label>
            </div>

            {msg && <p className="text-xs text-violet-200">{msg}</p>}

            <button disabled={pending} className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm">
              {pending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {ar ? "حفظ المقال" : "Save article"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
