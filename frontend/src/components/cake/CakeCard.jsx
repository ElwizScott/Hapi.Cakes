import CakeImage from "./CakeImage";

export default function CakeCard({ cake, variant = "elegant" }) {
  const containerClass =
    variant === "social"
      ? "bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
      : "bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden";

  return (
    <div className={containerClass}>
      <CakeImage
        src={cake.imageUrls?.[0]}
        alt={cake.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{cake.name}</h3>
        <p className="text-sm text-gray-500 capitalize mt-1">{cake.category}</p>
        {cake.description ? (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {cake.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
