const categories = [
  "Wedding Cakes",
  "Birthday Cakes",
  "Event Cakes",
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="font-serif text-3xl text-center mb-12 text-slate-800">
        Special Events & Occasions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {categories.map((c) => (
          <div
            key={c}
            className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6 text-center"
          >
            <div className="h-40 rounded-xl bg-gradient-to-br from-hapi-light to-hapi-pink/40 mb-4" />
            <p className="font-serif text-slate-800">{c}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
