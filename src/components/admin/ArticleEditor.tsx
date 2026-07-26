"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import {
  Loader2, Save, Trash2, Plus, Pencil, X, Eye, Heading2, Bold, List, Link2, CheckCircle2,
} from "lucide-react";
import { savePost, deletePost, type PostInput } from "@/app/[locale]/admin/actions";

export type DbPost = PostInput & { id: string; created_at: string };

const emptyBase: PostInput = {
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
  author_name: "",
};

const CATEGORIES = ["Guides", "Writing", "Arabic", "SEO", "News"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function readingMinutes(...texts: string[]) {
  const words = texts.join(" ").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Small formatting toolbar that wraps the selection in the textarea. */
function Toolbar({
  targetRef,
  onChange,
  ar,
}: {
  targetRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (v: string) => void;
  ar: boolean;
}) {
  function wrap(before: string, after: string, placeholder: string) {
    const el = targetRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.slice(start, end) || placeholder;
    const next = el.value.slice(0, start) + before + selected + after + el.value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  }

  const buttons = [
    { icon: Heading2, title: ar ? "عنوان فرعي" : "Heading", run: () => wrap("<h2>", "</h2>\n", ar ? "عنوان" : "Heading") },
    { icon: Bold, title: ar ? "عريض" : "Bold", run: () => wrap("<strong>", "</strong>", ar ? "نص" : "text") },
    { icon: List, title: ar ? "قائمة" : "List", run: () => wrap("<ul>\n  <li>", "</li>\n</ul>\n", ar ? "عنصر" : "item") },
    { icon: Link2, title: ar ? "رابط" : "Link", run: () => wrap('<a href="https://">', "</a>", ar ? "نص الرابط" : "link text") },
  ];

  return (
    <div className="mb-1 flex gap-1">
      {buttons.map((b) => (
        <button
          key={b.title}
          type="button"
          title={b.title}
          onClick={b.run}
          className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-colors hover:text-violet-300"
        >
          <b.icon size={13} />
        </button>
      ))}
      <span className="ms-1 self-center text-[10px] text-white/30">
        {ar ? "اكتب فقرة عادية وسنلفّها تلقائياً" : "Plain lines become paragraphs automatically"}
      </span>
    </div>
  );
}

/** Turns bare lines into <p> so writers never have to think about HTML. */
function normalizeHtml(input: string): string {
  return input
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (/^<(h[1-6]|ul|ol|p|blockquote|figure|div|table)/i.test(b)) return b;
      return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export default function ArticleEditor({
  posts,
  ar,
  defaultAuthor,
}: {
  posts: DbPost[];
  ar: boolean;
  defaultAuthor: string;
}) {
  const empty: PostInput = { ...emptyBase, author_name: defaultAuthor };
  const [form, setForm] = useState<PostInput>(empty);
  const [editId, setEditId] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"en" | "ar">(ar ? "ar" : "en");
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const autoSlug = useMemo(() => slugify(form.title_en || form.title_ar), [form.title_en, form.title_ar]);
  const autoMinutes = useMemo(
    () => readingMinutes(form.body_en, form.body_ar),
    [form.body_en, form.body_ar]
  );

  function set<K extends keyof PostInput>(k: K, v: PostInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function newPost() {
    setForm(empty);
    setEditId(undefined);
    setMsg(null);
    setPreview(false);
    setOpen(true);
  }

  function edit(p: DbPost) {
    const { id, created_at, ...rest } = p;
    void id;
    void created_at;
    setForm(rest);
    setEditId(p.id);
    setMsg(null);
    setPreview(false);
    setOpen(true);
  }

  const missing: string[] = [];
  if (!form.title_en.trim()) missing.push(ar ? "العنوان الإنجليزي" : "English title");
  if (!form.title_ar.trim()) missing.push(ar ? "العنوان العربي" : "Arabic title");
  if (!form.body_en.trim() && !form.body_ar.trim()) missing.push(ar ? "المحتوى" : "Body");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (missing.length > 0) {
      setMsg({ ok: false, text: (ar ? "أكمل: " : "Missing: ") + missing.join("، ") });
      return;
    }
    setMsg(null);
    const payload: PostInput = {
      ...form,
      slug: form.slug || autoSlug,
      reading_time: form.reading_time || autoMinutes,
      body_en: normalizeHtml(form.body_en),
      body_ar: normalizeHtml(form.body_ar),
    };
    start(async () => {
      const res = await savePost(payload, editId);
      if (res.ok) {
        setMsg({ ok: true, text: ar ? "تم النشر ✓ ظهر في المدونة الآن" : "Published ✓ live on the blog now" });
        setOpen(false);
      } else {
        setMsg({
          ok: false,
          text:
            res.message === "duplicate_slug"
              ? ar
                ? "الرابط مستخدم — غيّره."
                : "That slug is taken — change it."
              : ar
                ? "تعذّر الحفظ."
                : "Couldn't save.",
        });
      }
    });
  }

  const bodyValue = tab === "en" ? form.body_en : form.body_ar;
  const setBody = (v: string) => set(tab === "en" ? "body_en" : "body_ar", v);

  return (
    <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
      {/* list */}
      <div className="glass glow-card h-fit overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-white/80">
            {ar ? "المقالات" : "Articles"} ({posts.length})
          </h2>
          <button onClick={newPost} className="btn-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs">
            <Plus size={13} /> {ar ? "جديد" : "New"}
          </button>
        </div>
        {posts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            {ar ? "لا مقالات بعد — ابدأ بمقال جديد." : "No articles yet — start a new one."}
          </p>
        ) : (
          <div className="max-h-[520px] overflow-y-auto">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-2 border-t border-white/5 px-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-white/85">{p.title_ar || p.title_en}</p>
                  <p className="truncate text-xs text-white/40">
                    /{p.slug} ·{" "}
                    <span className={p.published ? "text-emerald-300/80" : "text-amber-300/80"}>
                      {p.published ? (ar ? "منشور" : "published") : ar ? "مسودّة" : "draft"}
                    </span>
                  </p>
                </div>
                <button onClick={() => edit(p)} className="rounded-lg p-1.5 text-white/40 hover:text-violet-300">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => start(() => deletePost(p.id))}
                  className="rounded-lg p-1.5 text-white/40 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* editor */}
      <div className="glass glow-card rounded-2xl p-5">
        {msg && !open && (
          <p
            className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
              msg.ok
                ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                : "border border-red-500/25 bg-red-500/10 text-red-300"
            }`}
          >
            {msg.ok && <CheckCircle2 size={15} />}
            {msg.text}
          </p>
        )}

        {!open ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Pencil size={24} className="text-violet-300/70" />
            <p className="mt-3 max-w-xs text-sm text-white/50">
              {ar
                ? "اختر مقالاً من القائمة للتعديل، أو أنشئ مقالاً جديداً — الحقول بسيطة ولا تحتاج خبرة تقنية."
                : "Pick an article to edit, or create a new one — the fields are simple and need no technical skill."}
            </p>
            <button onClick={newPost} className="btn-primary mt-5 rounded-full px-6 py-2.5 text-sm">
              {ar ? "مقال جديد" : "New article"}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {editId ? (ar ? "تعديل مقال" : "Edit article") : ar ? "مقال جديد" : "New article"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* language tabs */}
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setTab(l)}
                  className={`rounded-full px-4 py-1.5 transition-colors ${
                    tab === l ? "bg-violet-400 text-ocean-900" : "text-white/55"
                  }`}
                >
                  {l === "ar" ? "العربية" : "English"}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {tab === "ar" ? (ar ? "العنوان بالعربية" : "Arabic title") : ar ? "العنوان بالإنجليزية" : "English title"}
              </span>
              <input
                dir={tab === "ar" ? "rtl" : "ltr"}
                value={tab === "ar" ? form.title_ar : form.title_en}
                onChange={(e) => set(tab === "ar" ? "title_ar" : "title_en", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-violet-400/50"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {tab === "ar" ? (ar ? "المقتطف بالعربية" : "Arabic excerpt") : ar ? "المقتطف بالإنجليزية" : "English excerpt"}
              </span>
              <textarea
                dir={tab === "ar" ? "rtl" : "ltr"}
                rows={2}
                value={tab === "ar" ? form.excerpt_ar : form.excerpt_en}
                onChange={(e) => set(tab === "ar" ? "excerpt_ar" : "excerpt_en", e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-violet-400/50"
              />
            </label>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-white/50">{ar ? "المحتوى" : "Body"}</span>
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="inline-flex items-center gap-1 text-[11px] text-violet-300 hover:text-violet-200"
                >
                  <Eye size={12} /> {preview ? (ar ? "تحرير" : "Edit") : ar ? "معاينة" : "Preview"}
                </button>
              </div>
              {preview ? (
                <div
                  dir={tab === "ar" ? "rtl" : "ltr"}
                  className="prose-sahihly max-h-72 min-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: normalizeHtml(bodyValue) }}
                />
              ) : (
                <>
                  <Toolbar targetRef={bodyRef} onChange={setBody} ar={ar} />
                  <textarea
                    ref={bodyRef}
                    dir={tab === "ar" ? "rtl" : "ltr"}
                    rows={12}
                    value={bodyValue}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={
                      ar
                        ? "اكتب مقالك هنا. اترك سطراً فارغاً بين الفقرات، واستخدم الأزرار بالأعلى للعناوين والقوائم."
                        : "Write your article here. Leave a blank line between paragraphs; use the buttons above for headings and lists."
                    }
                    className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-violet-400/50"
                  />
                </>
              )}
            </div>

            <label className="block">
              <span className="mb-1 block text-xs text-white/50">
                {ar ? "اسم الكاتب (يظهر في المقال)" : "Author name (shown on the article)"}
              </span>
              <input
                dir="ltr"
                value={form.author_name ?? ""}
                onChange={(e) => set("author_name", e.target.value)}
                placeholder={defaultAuthor || (ar ? "اسمك" : "Your name")}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm outline-none focus:border-violet-400/50"
              />
              <span className="mt-1 block text-[11px] text-white/35">
                {ar
                  ? "يظهر هذا الاسم بدلاً من «فريق صحيحلي» — اتركه فارغاً ليُستخدم اسمك تلقائياً."
                  : "This name replaces \"The Sahihly Team\" on the byline — leave blank to use your own name automatically."}
              </span>
            </label>

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-xs text-white/50">{ar ? "التصنيف" : "Category"}</span>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-violet-400/50"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs text-white/50">
                  {ar ? "الرابط (يُملأ تلقائياً)" : "Slug (auto-filled)"}
                </span>
                <input
                  dir="ltr"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder={autoSlug || "my-article"}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs outline-none focus:border-violet-400/50"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="inline-flex items-center gap-2 text-white/70">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => set("published", e.target.checked)}
                  className="accent-violet-400"
                />
                {ar ? "منشور" : "Published"}
              </label>
              <span className="text-xs text-white/40">
                {ar ? "وقت القراءة التقديري" : "Est. reading time"}: {autoMinutes} {ar ? "د" : "min"}
              </span>
            </div>

            {msg && (
              <p
                className={`rounded-lg px-3 py-2 text-xs ${
                  msg.ok
                    ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                    : "border border-red-500/25 bg-red-500/10 text-red-300"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="flex gap-2">
              <button
                disabled={pending}
                className="btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm"
              >
                {pending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {ar ? "حفظ ونشر" : "Save & publish"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-ghost rounded-full px-5 py-2.5 text-sm"
              >
                {ar ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
