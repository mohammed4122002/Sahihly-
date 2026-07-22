import { Star, StarHalf } from "lucide-react";

export default function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const items = Array.from({ length: 5 });
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`${rating} / 5`}>
      <span className="inline-flex" dir="ltr">
        {items.map((_, i) => {
          if (i < full) return <Star key={i} size={15} className="fill-violet-400 text-violet-400" />;
          if (i === full && half)
            return <StarHalf key={i} size={15} className="fill-violet-400 text-violet-400" />;
          return <Star key={i} size={15} className="text-white/20" />;
        })}
      </span>
      <span className="text-sm font-semibold text-violet-200 tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}
