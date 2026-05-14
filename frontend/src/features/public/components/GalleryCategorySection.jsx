import CakeCard from "./CakeCard";
import PillBadge from "../../../components/common/PillBadge";

export default function GalleryCategorySection({
  category,
  cakes = [],
  showAdminEdit = false,
  onEdit,
  onAdd,
  onSelect,
}) {
  const orderedCakes = [...cakes].reverse();

  return (
    <section className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">
            {category.name}
          </h2>
          <PillBadge className="border-white/70 bg-white/80 px-2.5 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
            {cakes.length} cakes
          </PillBadge>
        </div>
        <div className="h-px flex-1 bg-lavender/40" aria-hidden="true" />
      </div>

      {/* IMPORTANT: single-row flex, no wrapping */}
      <div className="flex items-stretch gap-3 overflow-x-auto pb-2 sm:gap-4">
        {showAdminEdit && (
          <button
            onClick={onAdd}
            className="flex min-h-11 flex-[0_0_120px] items-center justify-center rounded-2xl border border-dashed border-lavender bg-white/80 px-4 text-xs text-muted hover:border-brandPink"
          >
            + Add
          </button>
        )}

        {orderedCakes.map((cake) => (
          <CakeCard
            key={cake.id ?? cake.name}
            imageUrl={cake.imageUrls?.[0]}
            name={cake.name}
            description={cake.description}
            price={cake.price}
            categoryName={category.name}
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
