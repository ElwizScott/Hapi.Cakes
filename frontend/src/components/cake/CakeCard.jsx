import CakeImage from "./CakeImage";
import { formatVND } from "../../utils/formatPrice";
import { cx, surfaceCardClass } from "../common/designSystem";
import PillBadge from "../common/PillBadge";

export default function CakeCard({ cake, variant = "elegant" }) {
  const containerClass =
    variant === "social"
      ? "group relative overflow-hidden rounded-card border border-border-soft bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/70 shadow-soft transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-float"
      : cx(
          surfaceCardClass,
          "group overflow-hidden rounded-card bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/45 transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-float",
        );

  return (
    <div className={containerClass}>
      <div className="relative aspect-[4/3.9] overflow-hidden border-b border-border-soft/70 bg-gradient-to-br from-surface via-accent-soft/30 to-lavender/30">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.4),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(110,85,117,0.12))]" />
        <CakeImage
          src={cake.imageUrls?.[0]}
          alt={cake.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
        />
        {cake.category ? (
          <div className="absolute left-3 top-3 z-20">
            <PillBadge className="border-white/70 bg-white/82 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
              {cake.category}
            </PillBadge>
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-5">
        <h3
          className={`text-lg font-semibold ${
            variant === "social"
              ? "font-serif text-text-primary tracking-tight"
              : "font-serif text-text-primary tracking-tight"
          }`}
        >
          {cake.name}
        </h3>
        {Number.isFinite(cake.price) ? (
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-plum">
            {formatVND(cake.price)}
          </p>
        ) : null}
        {cake.description ? (
          <p className="text-sm leading-6 text-text-secondary line-clamp-3">
            {cake.description}
          </p>
        ) : null}
        {Number.isFinite(cake.price) ? (
          <div className="flex items-end justify-between gap-3 border-t border-border-soft/70 pt-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
                Starting at
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold text-plum">
                {formatVND(cake.price)}
              </p>
            </div>
            <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum">
              Explore
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
