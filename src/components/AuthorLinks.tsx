import { Globe, MessageCircle } from "lucide-react";
import type { Author } from "@/lib/authors";

/* Brand glyphs are drawn inline: lucide dropped its brand set, and a logo
   should be the real mark rather than a generic stand-in. */
type IconProps = { size?: number };
const brand = (path: string) =>
  function Brand({ size = 16 }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    );
  };

const XIcon = brand(
  "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.02 4.13H5.06z"
);
const LinkedinIcon = brand(
  "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.22 8.25h4.54V24H.22zM8.34 8.25h4.35v2.15h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.43 3.01 5.43 6.93V24h-4.53v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24H8.34z"
);
const FacebookIcon = brand(
  "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
);
const InstagramIcon = brand(
  "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
);
const YoutubeIcon = brand(
  "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12z"
);

/**
 * Social and contact links for an author. Only renders what was filled in —
 * an empty row of grey icons says less than no row at all.
 *
 * External profiles carry rel="me", which is the standard way to assert that
 * the same person owns both pages, and noopener for the usual tab-safety.
 */
export default function AuthorLinks({
  author,
  ar,
  size = "md",
}: {
  author: Author;
  ar: boolean;
  size?: "sm" | "md";
}) {
  const l = author.links;
  const items = [
    { href: l.website, icon: Globe, label: ar ? "الموقع" : "Website" },
    { href: l.x, icon: XIcon, label: "X" },
    { href: l.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: l.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: l.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: l.youtube, icon: YoutubeIcon, label: "YouTube" },
    { href: l.whatsapp, icon: MessageCircle, label: ar ? "واتساب" : "WhatsApp" },
  ].filter((i) => i.href);

  if (items.length === 0) return null;

  const box = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? 15 : 17;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((i) => {
        const Icon = i.icon;
        const isWhatsapp = i.href === l.whatsapp;
        return (
          <a
            key={i.label}
            href={i.href}
            target="_blank"
            rel={isWhatsapp ? "noopener noreferrer" : "me noopener noreferrer"}
            aria-label={`${author.fullName} — ${i.label}`}
            title={i.label}
            className={`${box} flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 transition-colors hover:border-violet-400/40 hover:text-violet-200`}
          >
            <Icon size={icon} />
          </a>
        );
      })}
    </div>
  );
}
