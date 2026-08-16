"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Toast from "@/components/Toast";
import {
  Loader2, Save, Trash2, Plus, Pencil, X, Eye, Heading2, Bold, List, Link2,
  CheckCircle2, AlertTriangle, RotateCcw, ChevronLeft,
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

/**
 * Where an in-progress article is parked between renders.
 *
 * The writing happens on a phone, and a phone browser discards background tabs
 * without warning — a call taken, a notification followed, another app needing
 * the memory. Losing an hour of typing to that is the worst thing this screen
 * can do to someone, and preventing it costs one localStorage write.
 */
const DRAFT_KEY = "sahihly:article-draft";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function readingMinutes(...texts: string[]) {
  const words = texts.join(" ").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Formatting toolbar that wraps the selection in the textarea.
 *
 * The buttons are 44px on a phone and carry their label. They used to be 26px
 * icon-only squares set a few pixels apart — under half the size a thumb hits
 * reliably — and every miss inserts a tag in the wrong place, which then has to
 * be hunted down and deleted on a small screen. Icons alone also asked the
 * writer to decode four glyphs; the words cost one line and no guessing.
 */
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
    { icon: Heading2, label: ar ? "عنوان" : "Heading", run: () => wrap("<h2>", "</h2>\n", ar ? "عنوان" : "Heading") },
    { icon: Bold, label: ar ? "عريض" : "Bold", run: () => wrap("<strong>", "</strong>", ar ? "نص" : "text") },
    { icon: List, label: ar ? "قائمة" : "List", run: () => wrap("<ul>\n  <li>", "</li>\n</ul>\n", ar ? "عنصر" : "item") },
    { icon: Link2, label: ar ? "رابط" : "Link", run: () => wrap('<a href="https://">', "</a>", ar ? "نص الرابط" : "link text") },
  ];

  return (
    <div className="mb-2 flex flex-wrap items-center gap-1.5">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          onClick={b.run}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-white/65 transition-colors hover:text-violet-300 active:bg-white/10 sm:h-9 sm:px-2.5"
        >
          <b.icon size={15} />
          <span className="text-xs">{b.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Inline markdown → HTML, applied only to text that is not already a tag. */
function inline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
}

/**
 * Accepts whatever the writer pastes — HTML, markdown, or plain text — and
 * returns HTML.
 *
 * Writers get articles from a chat interface, which renders markdown rather
 * than showing the source. Copying what is on screen therefore loses every
 * heading, and the previous version wrapped each block in <p> regardless, so
 * an article arrived with no <h2> at all: no contents list, no anchors, and
 * nothing for search to read as structure. Recognising markdown here means
 * that mistake cannot silently cost an article its outline.
 */
function normalizeHtml(input: string): string {
  const out: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    out.push(
      `<${list.type}>\n${list.items.map((i) => `  <li>${i}</li>`).join("\n")}\n</${list.type}>`
    );
    list = null;
  };

  for (const block of input.split(/\n{2,}/)) {
    const b = block.trim();
    if (!b) continue;

    // Already HTML — leave it exactly as written.
    if (/^<(h[1-6]|ul|ol|p|blockquote|figure|div|table|section)/i.test(b)) {
      flush();
      out.push(b);
      continue;
    }

    for (const rawLine of b.split("\n")) {
      const line = rawLine.trim();
      if (!line) continue;

      const heading = line.match(/^(#{2,4})\s+(.*)$/);
      if (heading) {
        flush();
        const level = Math.min(heading[1].length, 3); // h1 is the title field
        out.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
        continue;
      }

      const bullet = line.match(/^[-*+]\s+(.*)$/);
      if (bullet) {
        if (list?.type !== "ul") {
          flush();
          list = { type: "ul", items: [] };
        }
        list.items.push(inline(bullet[1]));
        continue;
      }

      const numbered = line.match(/^\d+[.)]\s+(.*)$/);
      if (numbered) {
        if (list?.type !== "ol") {
          flush();
          list = { type: "ol", items: [] };
        }
        list.items.push(inline(numbered[1]));
        continue;
      }

      flush();
      out.push(/^</.test(line) ? line : `<p>${inline(line)}</p>`);
    }
    flush();
  }

  flush();
  return out.join("\n");
}

const field =
  "w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-base outline-none focus:border-violet-400/50 sm:py-2.5 sm:text-sm";

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
  const [confirmDelete, setConfirmDelete] = useState<DbPost | null>(null);
  const [restorable, setRestorable] = useState<{ form: PostInput; editId?: string } | null>(null);
  const [pending, start] = useTransition();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const autoSlug = useMemo(() => slugify(form.title_en || form.title_ar), [form.title_en, form.title_ar]);
  const autoMinutes = useMemo(
    () => readingMinutes(form.body_en, form.body_ar),
    [form.body_en, form.body_ar]
  );

  // Offer back whatever was being written when the tab last went away. Offered,
  // not restored: silently replacing what is on screen is its own surprise.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { form: PostInput; editId?: string };
      const f = saved?.form;
      if (f && (f.title_ar || f.title_en || f.body_ar || f.body_en)) setRestorable(saved);
    } catch {
      /* a corrupt draft is not worth surfacing */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, editId }));
    } catch {
      /* private mode, quota — the write is best effort */
    }
  }, [form, editId, open]);

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* nothing to do */
    }
    setRestorable(null);
  }

  // A full-screen sheet with the page still scrolling behind it is disorienting:
  // you swipe the article you are writing and the list underneath moves instead.
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      document.body.style.overflow = mobile.matches ? "hidden" : "";
    };
    apply();
    mobile.addEventListener("change", apply);
    return () => {
      document.body.style.overflow = "";
      mobile.removeEventListener("change", apply);
    };
  }, [open]);

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

  function restore() {
    if (!restorable) return;
    setForm(restorable.form);
    setEditId(restorable.editId);
    setRestorable(null);
    setPreview(false);
    setOpen(true);
  }

  const missing: string[] = [];
  if (!form.title_en.trim()) missing.push(ar ? "العنوان الإنجليزي" : "English title");
  if (!form.title_ar.trim()) missing.push(ar ? "العنوان العربي" : "Arabic title");
  if (!form.body_en.trim() && !form.body_ar.trim()) missing.push(ar ? "المحتوى" : "Body");

  // Which language tab still needs something. Only one tab is visible at a time
  // on a phone, so without this the writer hits save and is told the English
  // title is missing with no hint that it lives behind the other tab.
  const incomplete = {
    ar: !form.title_ar.trim(),
    en: !form.title_en.trim(),
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (missing.length > 0) {
      setMsg({ ok: false, text: (ar ? "أكمل: " : "Missing: ") + missing.join("، ") });
      // Send them to the tab that is actually incomplete rather than leaving
      // them to work out where the missing field is.
      if (incomplete.ar) setTab("ar");
      else if (incomplete.en) setTab("en");
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
        clearDraft();
        setOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
  const dir = tab === "ar" ? "rtl" : "ltr";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
      <Toast
        show={Boolean(msg)}
        ok={msg?.ok ?? true}
        text={msg?.text ?? ""}
        onClose={() => setMsg(null)}
        closeLabel={ar ? "إغلاق" : "Dismiss"}
      />

      {/* list */}
      <div className="glass glow-card h-fit overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-white/80">
            {ar ? "المقالات" : "Articles"} ({posts.length})
          </h2>
          <button
            onClick={newPost}
            className="btn-primary inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm sm:h-9 sm:text-xs"
          >
            <Plus size={15} /> {ar ? "مقال جديد" : "New article"}
          </button>
        </div>

        {restorable && (
          <div className="border-t border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-200">
              <RotateCcw size={14} className="mt-0.5 shrink-0" />
              {ar
                ? "لديك مقال لم يُحفظ من جلسة سابقة."
                : "You have an unsaved article from an earlier session."}
            </p>
            <div className="mt-2.5 flex gap-2">
              <button
                onClick={restore}
                className="btn-primary h-10 rounded-full px-4 text-xs"
              >
                {ar ? "استرجعه" : "Restore it"}
              </button>
              <button onClick={clearDraft} className="btn-ghost h-10 rounded-full px-4 text-xs">
                {ar ? "تجاهل" : "Discard"}
              </button>
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-white/40">
            {ar ? "لا مقالات بعد — ابدأ بمقال جديد." : "No articles yet — start a new one."}
          </p>
        ) : (
          <div className="lg:max-h-[520px] lg:overflow-y-auto">
            {posts.map((p) => (
              <div key={p.id} className="border-t border-white/5 px-3 py-2">
                {confirmDelete?.id === p.id ? (
                  // Deleting used to be one mis-tap away from editing, with no
                  // confirmation and no undo. On a phone those two targets sit
                  // inside a thumb's width of each other.
                  <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3">
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-red-200">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                      {ar
                        ? `حذف «${p.title_ar || p.title_en}» نهائياً؟ لا يمكن التراجع.`
                        : `Delete "${p.title_en || p.title_ar}" permanently? This cannot be undone.`}
                    </p>
                    <div className="mt-2.5 flex gap-2">
                      <button
                        onClick={() => {
                          setConfirmDelete(null);
                          start(() => deletePost(p.id));
                        }}
                        className="h-10 flex-1 rounded-full border border-red-500/40 bg-red-500/20 text-xs font-medium text-red-100"
                      >
                        {ar ? "نعم، احذف" : "Yes, delete"}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="btn-ghost h-10 flex-1 rounded-full text-xs"
                      >
                        {ar ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => edit(p)}
                      className="min-w-0 flex-1 rounded-xl px-2 py-2.5 text-start transition-colors active:bg-white/5"
                    >
                      <span className="block truncate text-sm text-white/85">
                        {p.title_ar || p.title_en}
                      </span>
                      {/*
                       * The slug is Latin text inside an Arabic column, so a
                       * single truncated line clipped it from the wrong end and
                       * showed "...tudent-sues-university-ai-detector/". Giving
                       * it its own LTR box lets it lose its tail like a URL
                       * should, and puts the short status label where it cannot
                       * be eaten at all.
                       */}
                      <span className="mt-0.5 flex items-center gap-2 text-xs">
                        <span className={p.published ? "shrink-0 text-emerald-300/80" : "shrink-0 text-amber-300/80"}>
                          {p.published ? (ar ? "منشور" : "published") : ar ? "مسودّة" : "draft"}
                        </span>
                        <bdi dir="ltr" className="min-w-0 flex-1 truncate text-white/40">
                          /{p.slug}
                        </bdi>
                      </span>
                    </button>
                    <button
                      onClick={() => edit(p)}
                      aria-label={ar ? "تعديل" : "Edit"}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/45 hover:text-violet-300"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(p)}
                      aria-label={ar ? "حذف" : "Delete"}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/45 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* editor */}
      <div className={open ? "" : "glass glow-card rounded-2xl p-5"}>
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
            <button onClick={newPost} className="btn-primary mt-5 h-11 rounded-full px-6 text-sm">
              {ar ? "مقال جديد" : "New article"}
            </button>
          </div>
        ) : (
          /*
           * Below lg the form takes the whole screen.
           *
           * It used to render underneath a list that could be most of a phone
           * screen tall, so tapping "New" scrolled nothing and looked like it
           * had done nothing at all. Giving the form the screen also stops the
           * list competing for it, which is what made a 1,200-word article feel
           * like typing through a letterbox.
           */
          <form
            onSubmit={submit}
            className="max-lg:fixed max-lg:inset-0 max-lg:z-[70] max-lg:flex max-lg:flex-col max-lg:bg-ocean-950 lg:glass lg:glow-card lg:space-y-4 lg:rounded-2xl lg:p-5"
          >
            <div className="flex items-center justify-between gap-3 max-lg:sticky max-lg:top-0 max-lg:z-10 max-lg:border-b max-lg:border-white/10 max-lg:bg-ocean-950 max-lg:px-3 max-lg:py-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center gap-1 rounded-xl px-2 text-sm text-white/60 hover:text-white lg:hidden"
              >
                <ChevronLeft size={18} className="flip-x" />
                {ar ? "رجوع" : "Back"}
              </button>
              <h3 className="truncate font-semibold max-lg:text-sm">
                {editId ? (ar ? "تعديل مقال" : "Edit article") : ar ? "مقال جديد" : "New article"}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ar ? "إغلاق" : "Close"}
                className="hidden text-white/40 hover:text-white lg:inline"
              >
                <X size={16} />
              </button>
              {/* Keeps the heading centred on mobile against the back button. */}
              <span className="h-11 w-16 lg:hidden" aria-hidden />
            </div>

            <div className="space-y-4 max-lg:flex-1 max-lg:overflow-y-auto max-lg:px-3 max-lg:pb-4 max-lg:pt-3">
              {/* language tabs */}
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
                {(["ar", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setTab(l)}
                    className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 transition-colors sm:h-9 ${
                      tab === l ? "bg-violet-400 text-ocean-900" : "text-white/55"
                    }`}
                  >
                    {l === "ar" ? "العربية" : "English"}
                    {incomplete[l] && (
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          tab === l ? "bg-ocean-900/60" : "bg-amber-400"
                        }`}
                        title={ar ? "ناقص" : "incomplete"}
                      />
                    )}
                  </button>
                ))}
              </div>

              <label className="block">
                <span className="mb-1 block text-xs text-white/50">
                  {tab === "ar" ? (ar ? "العنوان بالعربية" : "Arabic title") : ar ? "العنوان بالإنجليزية" : "English title"}
                </span>
                <input
                  dir={dir}
                  value={tab === "ar" ? form.title_ar : form.title_en}
                  onChange={(e) => set(tab === "ar" ? "title_ar" : "title_en", e.target.value)}
                  className={field}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs text-white/50">
                  {tab === "ar" ? (ar ? "المقتطف بالعربية" : "Arabic excerpt") : ar ? "المقتطف بالإنجليزية" : "English excerpt"}
                </span>
                <textarea
                  dir={dir}
                  rows={2}
                  value={tab === "ar" ? form.excerpt_ar : form.excerpt_en}
                  onChange={(e) => set(tab === "ar" ? "excerpt_ar" : "excerpt_en", e.target.value)}
                  className={`${field} resize-none`}
                />
              </label>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-white/50">{ar ? "المحتوى" : "Body"}</span>
                  <button
                    type="button"
                    onClick={() => setPreview((p) => !p)}
                    className="inline-flex h-11 items-center gap-1 rounded-lg px-3 text-xs text-violet-300 hover:text-violet-200 sm:h-9 sm:px-2"
                  >
                    <Eye size={13} /> {preview ? (ar ? "تحرير" : "Edit") : ar ? "معاينة" : "Preview"}
                  </button>
                </div>
                {preview ? (
                  <div
                    dir={dir}
                    className="prose-sahihly min-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm max-lg:min-h-[50vh] lg:max-h-72"
                    dangerouslySetInnerHTML={{ __html: normalizeHtml(bodyValue) }}
                  />
                ) : (
                  <>
                    <Toolbar targetRef={bodyRef} onChange={setBody} ar={ar} />
                    <textarea
                      ref={bodyRef}
                      dir={dir}
                      rows={12}
                      value={bodyValue}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder={
                        ar
                          ? "اكتب مقالك هنا، أو الصقه. اترك سطراً فارغاً بين الفقرات."
                          : "Write or paste your article here. Leave a blank line between paragraphs."
                      }
                      // Tall enough to be a writing surface rather than a slot:
                      // twelve rows minus an on-screen keyboard left about four
                      // visible lines for a 1,200-word article.
                      className={`${field} resize-y leading-relaxed max-lg:min-h-[50vh]`}
                    />
                    <p className="mt-1.5 text-[11px] leading-relaxed text-white/35">
                      {ar
                        ? "السطر العادي يصير فقرة تلقائياً، و## يصير عنواناً، و- يصير قائمة."
                        : "A plain line becomes a paragraph, ## becomes a heading, - becomes a list."}
                    </p>
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
                  className={field}
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-white/50">{ar ? "التصنيف" : "Category"}</span>
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={field}
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
                    className={`${field} font-mono text-xs`}
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex h-11 items-center gap-2 text-white/70">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => set("published", e.target.checked)}
                    className="h-5 w-5 accent-violet-400"
                  />
                  {ar ? "منشور" : "Published"}
                </label>
                <span className="text-xs text-white/40">
                  {ar ? "وقت القراءة" : "Reading time"}: {autoMinutes} {ar ? "د" : "min"}
                </span>
              </div>
            </div>

            {/* Save stays reachable without scrolling back through the form. */}
            <div className="flex gap-2 max-lg:sticky max-lg:bottom-0 max-lg:border-t max-lg:border-white/10 max-lg:bg-ocean-950 max-lg:px-3 max-lg:py-3 max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                disabled={pending}
                className="btn-primary inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm disabled:opacity-60 sm:h-11"
              >
                {pending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {ar ? "حفظ ونشر" : "Save & publish"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-ghost h-12 rounded-full px-5 text-sm sm:h-11"
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
