import CakeImage from "./CakeImage";
import { formatVND } from "../../utils/formatPrice";

export default function CakeCard({ cake, variant = "elegant" }) {
  const containerClass =
    variant === "social"
      ? "group relative overflow-hidden rounded-3xl border border-lavender/50 bg-gradient-to-br from-white via-white to-lavender/20 shadow-[0_16px_32px_rgba(200,141,191,0.18)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(200,141,191,0.3)]"
      : "bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden";

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
            variant === "social" ? "font-serif text-ink tracking-tight" : "text-gray-800"
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
          <p className="text-sm text-gray-500 capitalize mt-1">
            {cake.category}
          </p>
        ) : null}
        {cake.description ? (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {cake.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
