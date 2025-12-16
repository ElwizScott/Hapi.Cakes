export default function CakeCard({ cake }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      {cake.imageUrls?.[0] ? (
        <img
          src={cake.imageUrls[0]}
          alt={cake.name}
          className="h-56 w-full object-cover"
        />
      ) : (
        <div className="h-56 w-full bg-pink-100 flex items-center justify-center text-pink-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {cake.name}
        </h3>

        <p className="text-sm text-gray-500 capitalize mt-1">
          {cake.category}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {cake.description}
        </p>
      </div>
    </div>
  );
}
