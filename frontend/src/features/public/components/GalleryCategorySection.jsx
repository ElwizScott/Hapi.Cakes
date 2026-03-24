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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-ink">{category.name}</h2>
          <span className="rounded-full border border-lavender/60 bg-white px-2.5 py-1 text-xs font-semibold text-plum">
            {cakes.length} cakes
          </span>
        </div>
        <div className="h-px flex-1 bg-lavender/40" aria-hidden="true" />
      </div>

      {/* IMPORTANT: single-row flex, no wrapping */}
      <div className="flex items-stretch gap-4 overflow-x-auto pb-2">
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
            price={cake.price}
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
