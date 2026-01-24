import AdminImageEditOverlay from "../../features/admin/components/AdminImageEditOverlay";

const categories = [
  { label: "Wedding Cakes", type: "wedding" },
  { label: "Birthday Cakes", type: "birthday" },
  { label: "Event Cakes", type: "event" },
];

export default function CategorySection({
  categoryImages,
  isAdmin,
  onCategoryImageUploaded,
}) {
  return (
    <section className="max-w-7xl mx-auto bg-softBg px-8 py-16">
      <h2 className="font-script text-5xl text-center mb-12 text-plum">
        Special Events & Occasions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {categories.map((c) => (
          <div
            key={c.type}
            className="rounded-2xl bg-white shadow-sm transition p-6 text-center border border-transparent hover:border-brandPink"
          >
            <div className="relative group h-40 rounded-xl mb-4 overflow-hidden border border-lavender bg-gradient-to-br from-softBg to-lavender">
              {categoryImages?.[c.type] ? (
                <img
                  src={categoryImages[c.type]}
                  alt={c.label}
                  className="h-full w-full object-cover"
                />
              ) : null}
              {isAdmin ? (
                <AdminImageEditOverlay
                  label={`Update ${c.label}`}
                  uploadEndpoint={`/api/admin/upload/category/${c.type}`}
                  currentImageUrl={categoryImages?.[c.type]}
                  onUploaded={(url) => onCategoryImageUploaded?.(c.type, url)}
                />
              ) : null}
            </div>
            <p className="font-serif text-ink">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
