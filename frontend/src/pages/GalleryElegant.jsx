import { useEffect, useState } from "react";
import { fetchCakes } from "../api/cakeApi";

export default function GalleryElegant() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCakes()
      .then((data) => {
        console.log("API RESPONSE:", data);
        setCakes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading cakes...</p>;
  }

  return (
    <div className="px-6">
      <p className="text-sm text-gray-500 mb-4">Cakes loaded: {cakes.length}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cakes.map((cake) => (
          <div
            key={cake.id}
            className="rounded-xl shadow-md overflow-hidden bg-white"
          >
            <img
              src={cake.imageUrls?.[0] || "https://via.placeholder.com/400"}
              alt={cake.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif text-lg">{cake.name}</h3>
              <p className="text-sm text-gray-500">{cake.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
