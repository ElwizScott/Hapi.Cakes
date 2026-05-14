import { formatVND } from "../../../utils/formatPrice";
import PillBadge from "../../../components/common/PillBadge";
import { cx } from "../../../components/common/designSystem";

export default function CakeCard({
  imageUrl,
  name,
  description,
  price,
  categoryName,
  feedbackImageUrl,
  showAdminEdit = false,
  onEdit,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={cx(
        "group relative w-full cursor-pointer overflow-hidden rounded-card border border-border-soft bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/65 shadow-soft",
        "transition-[transform,flex-basis,box-shadow,border-color] duration-500 ease-soft",
        "flex-[0_0_84%] sm:flex-[0_0_72%] md:w-auto md:flex-[0_0_296px] md:hover:flex-[0_0_620px]",
        "hover:-translate-y-1 hover:border-accent/60 hover:shadow-float",
      )}
    >
      {showAdminEdit && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
          className="absolute right-3 top-3 z-30 rounded-pill border border-white/70 bg-white/88 px-3 py-1.5 text-xs font-semibold text-plum opacity-0 shadow-soft transition duration-300 ease-soft group-hover:opacity-100"
        >
          ✎
        </button>
      )}

      <div className="flex flex-col gap-3 p-3 sm:p-4 md:flex-row md:items-stretch md:gap-5 md:p-5">
        <div className="relative aspect-[4/4.25] w-full overflow-hidden rounded-[1.5rem] border border-white/75 bg-gradient-to-br from-surface via-accent-soft/35 to-lavender/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:w-[248px] md:flex-shrink-0">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.45),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(110,85,117,0.12))]" />
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-plum/28 via-plum/6 to-transparent" />
          {categoryName ? (
            <div className="absolute left-3 top-3 z-20">
              <PillBadge className="border-white/70 bg-white/82 px-3 py-1 text-[0.6rem] tracking-[0.16em] text-plum shadow-soft">
                {categoryName}
              </PillBadge>
            </div>
          ) : null}
        </div>

        <div
          className={cx(
            "min-w-0 flex-1 rounded-[1.5rem] border border-white/70 bg-white/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm sm:p-4",
            "transition-all duration-500 ease-soft md:translate-x-6 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100",
          )}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <p className="font-serif text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                {name}
              </p>
              {Number.isFinite(price) ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum sm:text-sm">
                  {formatVND(price)}
                </p>
              ) : null}
            </div>

            {description ? (
              <p className="line-clamp-4 text-sm leading-6 text-text-secondary">
                {description}
              </p>
            ) : (
              <p className="text-sm leading-6 text-text-secondary">
                Delicately styled and made to order for celebrations that feel
                personal and beautifully polished.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <PillBadge className="border-white/70 bg-surface-elevated/90 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                Custom made
              </PillBadge>
              <PillBadge className="border-white/70 bg-surface-elevated/90 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                Pastel finish
              </PillBadge>
            </div>
          </div>

          {Number.isFinite(price) ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-border-soft/70 pt-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                  Starting at
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-plum sm:text-2xl">
                  {formatVND(price)}
                </p>
              </div>
              <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-plum sm:text-[0.68rem] sm:tracking-[0.18em]">
                View details
              </div>
            </div>
          ) : (
            <div className="mt-4 border-t border-border-soft/70 pt-4">
              <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-plum sm:text-[0.68rem] sm:tracking-[0.18em]">
                View details
              </div>
            </div>
          )}
        </div>

        {feedbackImageUrl ? (
          <div className="absolute bottom-4 left-4 z-20 rounded-[1.1rem] border border-white/80 bg-white/80 p-1.5 shadow-soft backdrop-blur">
            <img
              src={feedbackImageUrl}
              alt="Feedback"
              className="h-12 w-12 rounded-xl object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
