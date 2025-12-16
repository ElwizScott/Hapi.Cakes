const categories = [
  {
    title: "Wedding Cakes",
    image: "https://via.placeholder.com/300x200?text=Wedding",
  },
  {
    title: "Birthday Cakes",
    image: "https://via.placeholder.com/300x200?text=Birthday",
  },
  {
    title: "Event Cakes",
    image: "https://via.placeholder.com/300x200?text=Event",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-pink-50">
      <h2 className="text-center font-serif text-3xl md:text-4xl text-gray-800 mb-12">
        Special Events & Occasions
      </h2>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 text-center">
              <p className="font-medium text-gray-700">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
