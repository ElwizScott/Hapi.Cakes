import CakeImage from "./CakeImage";
import { formatVND } from "../../utils/formatPrice";
import { cx, surfaceCardClass } from "../common/designSystem";

export default function CakeCard({ cake, variant = "elegant" }) {
  const containerClass =
    variant === "social"
      ? "group relative overflow-hidden rounded-card border border-border-soft bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/70 shadow-soft transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-float"
      : cx(surfaceCardClass, "overflow-hidden rounded-ui transition duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-float");

  return (
    <div className={containerClass}>
      <CakeImage
        src={cake.imageUrls?.[0]}
        alt={cake.name}
        className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      <div className="p-4">
        <h3
          className={`text-lg font-semibold ${
            variant === "social"
              ? "font-serif text-text-primary tracking-tight"
              : "text-text-primary"
          }`}
        >
          {cake.name}
        </h3>
        {Number.isFinite(cake.price) ? (
          <p className="mt-1 text-sm font-semibold text-plum">
            {formatVND(cake.price)}
          </p>
        ) : null}
        {cake.category ? (
          <p className="mt-1 text-sm capitalize text-text-secondary">
            {cake.category}
          </p>
        ) : null}
        {cake.description ? (
          <p className="mt-2 text-sm text-text-secondary line-clamp-2">
            {cake.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
