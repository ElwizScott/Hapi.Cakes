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
    <section className="space-y-4 sm:space-y-5">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
            {category.name}
          </h2>
          <PillBadge className="border-white/75 bg-surface-elevated/90 px-2.5 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
            {cakes.length} cakes
          </PillBadge>
        </div>
        <div
          className="h-px flex-1 bg-gradient-to-r from-lavender/45 via-brandPink/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pr-1 sm:gap-5 sm:pb-4">
        {showAdminEdit && (
          <button
            onClick={onAdd}
            className="flex min-h-12 flex-none w-[19rem] items-center justify-center rounded-card border border-dashed border-border-soft bg-surface-elevated/75 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary shadow-soft transition duration-300 ease-soft hover:-translate-y-1 hover:border-accent hover:text-plum hover:shadow-float sm:w-[20.5rem] md:w-[22rem] lg:w-[22.5rem]"
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
