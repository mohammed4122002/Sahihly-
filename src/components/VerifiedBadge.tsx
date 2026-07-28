/**
 * Verified mark shown beside a writer's name.
 *
 * It means "this is a real Sahihly writer, not an anonymous byline" — the
 * same claim the author page backs up with a bio and contact links. It is
 * rendered only for staff accounts, never for ordinary users.
 */
export default function VerifiedBadge({
  size = 15,
  label,
  className = "",
}: {
  size?: number;
  label: string;
  className?: string;
}) {
  return (
    <span
      title={label}
      aria-label={label}
      role="img"
      className={`inline-flex shrink-0 align-middle ${className}`}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
        {/* Scalloped disc, then the tick knocked out in the page background */}
        <path
          fill="#3b9df8"
          d="M12 1.6l2.35 1.9 3.02-.2.86 2.9 2.6 1.56-1.06 2.84 1.06 2.84-2.6 1.56-.86 2.9-3.02-.2L12 22.4l-2.35-1.9-3.02.2-.86-2.9-2.6-1.56 1.06-2.84L3.17 8.56l2.6-1.56.86-2.9 3.02.2z"
        />
        <path
          fill="none"
          stroke="#0b1f3a"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.4 12.2l2.5 2.5 4.7-5"
        />
      </svg>
    </span>
  );
}
