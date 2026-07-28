import TreeLink from "@/components/TreeLink";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { isLocale, type Locale, SITE_URL, ORG_ID } from "@/lib/i18n/config";
import { alternatesFor, pageUrl } from "@/lib/seo";
import { getAuthorByUsername, getAuthors } from "@/lib/authors";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import VerifiedBadge from "@/components/VerifiedBadge";
import AuthorLinks from "@/components/AuthorLinks";

// Author details and their article list both change on publish, so keep this
// on a short revalidate rather than baking it at build time.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; username: string }>;
}): Promise<Metadata> {
  const { locale, username } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const author = await getAuthorByUsername(username);
  if (!author) return {};

  const role = author.title[loc] || (loc === "ar" ? "كاتب في صحيحلي" : "Writer at Sahihly");
  const description =
    author.bio[loc] ||
    (loc === "ar"
      ? `مقالات ${author.fullName} في صحيحلي حول الكتابة وأدوات الذكاء الاصطناعي.`
      : `Articles by ${author.fullName} on writing and AI tooling at Sahihly.`);

  return {
    title: `${author.fullName} — ${role}`,
    description,
    alternates: alternatesFor(loc, `/author/${author.username}`),
    openGraph: {
      type: "profile",
      title: `${author.fullName} — ${role}`,
      description,
      images: author.avatarUrl ? [{ url: author.avatarUrl }] : undefined,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; username: string }>;
}) {
  const { locale: raw, username } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ar = locale === "ar";

  const author = await getAuthorByUsername(username);
  if (!author) notFound();

  const posts = (await getAllPosts()).filter((p) => p.authorId === author.id);
  const others = (await getAuthors()).filter((a) => a.id !== author.id);

  const role = author.title[locale] || (ar ? "كاتب في صحيحلي" : "Writer at Sahihly");
  const sameAs = Object.entries(author.links)
    .filter(([k, v]) => v && k !== "whatsapp")
    .map(([, v]) => v as string);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE_URL}/author/${author.username}#person`,
        name: author.fullName,
        url: pageUrl(locale, `/author/${author.username}`),
        jobTitle: role,
        ...(author.avatarUrl ? { image: author.avatarUrl } : {}),
        ...(author.bio[locale] ? { description: author.bio[locale] } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        worksFor: { "@id": ORG_ID },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sahihly", item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: ar ? "من نحن" : "About", item: pageUrl(locale, "/about") },
        {
          "@type": "ListItem",
          position: 3,
          name: author.fullName,
          item: pageUrl(locale, `/author/${author.username}`),
        },
      ],
    },
  ];

  return (
    <div className="container-x max-w-3xl py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label={ar ? "مسار التنقّل" : "Breadcrumb"}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/40">
          <li><TreeLink href="/" className="hover:text-white">{ar ? "الرئيسية" : "Home"}</TreeLink></li>
          <li aria-hidden><ChevronLeft size={13} className="flip-x opacity-50" /></li>
          <li><TreeLink href="/about" className="hover:text-white">{ar ? "من نحن" : "About"}</TreeLink></li>
          <li aria-hidden><ChevronLeft size={13} className="flip-x opacity-50" /></li>
          <li className="text-white/60" aria-current="page">{author.fullName}</li>
        </ol>
      </nav>

      <Reveal>
        <header className="glass-strong glow-card mt-6 rounded-3xl p-7 sm:p-9">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-start">
            {author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.avatarUrl}
                alt={author.fullName}
                className="h-24 w-24 shrink-0 rounded-full border border-white/15 object-cover"
              />
            ) : (
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-violet-400/15 font-display text-3xl font-bold text-violet-300">
                {author.fullName.charAt(0).toUpperCase()}
              </span>
            )}

            <div className="min-w-0">
              <h1 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold sm:justify-start sm:text-3xl">
                {author.fullName}
                <VerifiedBadge size={19} label={ar ? "كاتب موثّق في صحيحلي" : "Verified Sahihly writer"} />
              </h1>
              <p className="mt-1 text-sm text-violet-200/80">{role}</p>

              {author.bio[locale] && (
                <p className="mt-4 leading-relaxed text-white/65">{author.bio[locale]}</p>
              )}

              <div className="mt-5 flex justify-center sm:justify-start">
                <AuthorLinks author={author} ar={ar} />
              </div>
            </div>
          </div>
        </header>
      </Reveal>

      <section className="mt-12">
        <h2 className="text-xl font-bold">
          {ar ? `مقالات ${author.fullName}` : `Articles by ${author.fullName}`}
          <span className="ms-2 text-sm font-normal text-white/40">({posts.length})</span>
        </h2>

        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-white/45">
            {ar ? "لا مقالات منشورة بعد." : "No published articles yet."}
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 4)} as="div">
                <TreeLink
                  href={`/blog/${p.slug}`}
                  className="glass tilt group flex h-full flex-col rounded-2xl p-5"
                >
                  <span className="text-xs text-violet-300">{p.category}</span>
                  <h3 className="mt-1.5 font-semibold leading-snug transition-colors group-hover:text-violet-200">
                    {p.title[locale]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-white/50">{p.excerpt[locale]}</p>
                  <span className="mt-3 text-xs text-white/35">
                    {formatDate(p.date, locale)} · {p.readingTime} {ar ? "د قراءة" : "min read"}
                  </span>
                </TreeLink>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-white/80">
            {ar ? "كتّاب آخرون" : "Other writers"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((a) => (
              <TreeLink
                key={a.id}
                href={`/author/${a.username}`}
                className="glass flex items-center gap-2.5 rounded-full py-1.5 pe-4 ps-1.5 transition-colors hover:border-violet-400/40"
              >
                {a.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400/15 text-xs font-bold text-violet-300">
                    {a.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-white/75">
                  {a.fullName}
                  <VerifiedBadge size={13} label={ar ? "موثّق" : "Verified"} />
                </span>
              </TreeLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
