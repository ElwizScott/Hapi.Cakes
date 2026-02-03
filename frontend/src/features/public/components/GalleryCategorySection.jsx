import CakeCard from "./CakeCard";

export default function GalleryCategorySection({
  category,
  cakes = [],
  showAdminEdit = false,
  onEdit,
  onAdd,
  onSelect,
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">{category.name}</h2>
        <span className="text-xs text-muted">{cakes.length} cakes</span>
      </div>

      {/* IMPORTANT: single-row flex, no wrapping */}
      <div className="flex items-stretch gap-4 overflow-x-visible">
        {showAdminEdit && (
          <button
            onClick={onAdd}
            className="flex-[0_0_120px] rounded-2xl border border-dashed border-lavender
                       bg-white/80 text-xs text-muted hover:border-brandPink"
          >
            + Add
          </button>
        )}

        {cakes.map((cake) => (
          <CakeCard
            key={cake.id ?? cake.name}
            imageUrl={cake.imageUrls?.[0]}
            name={cake.name}
            description={cake.description}
            feedbackImageUrl={cake.feedbackImages?.[0]}
            showAdminEdit={showAdminEdit}
            onEdit={() => onEdit?.(cake)}
            onClick={() => onSelect?.(cake, category)}
          />
        ))}
      </div>
    </section>
  );
}
