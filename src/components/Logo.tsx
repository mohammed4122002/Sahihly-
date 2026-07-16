import { cn } from "@/lib/utils";

/**
 * The S-Check Fusion mark — the letter S sliced by a sweeping checkmark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="sahihly-g" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b3ee" />
          <stop offset="1" stopColor="#7c5fd3" />
        </linearGradient>
      </defs>
      {/* S curve */}
      <path
        d="M33 13.5c-2.4-2.6-6-4-9.7-4-5.6 0-9.8 3.1-9.8 7.6 0 4.2 3.3 6 8.7 7.2 5.9 1.3 9.9 3.2 9.9 8.1 0 4.8-4.4 8-10.4 8-4.3 0-8.2-1.7-10.7-4.6"
        stroke="url(#sahihly-g)"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Check sweep */}
      <path
        d="M15 25.5l7 7 14-16"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      {showText && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          sahihly
        </span>
      )}
    </span>
  );
}
