import { formatVND } from "../../../utils/formatPrice";
import { HeartIcon, SparkleIcon } from "../../../components/common/BakeryIcons";
import PillBadge from "../../../components/common/PillBadge";
import { cx } from "../../../components/common/designSystem";
import useAppTranslation from "../../../i18n/useAppTranslation";

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
  const { t } = useAppTranslation("common");

  return (
    <div
      onClick={onClick}
      className={cx(
        "group relative flex w-[19rem] max-w-[82vw] cursor-pointer flex-none flex-col overflow-hidden rounded-card border border-border-soft bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/55 shadow-soft",
        "transition-[transform,box-shadow,border-color] duration-300 ease-soft",
        "sm:w-[20.5rem] md:w-[22rem] lg:w-[22.5rem]",
        "hover:border-accent/50 hover:shadow-float",
      )}
    >
      {showAdminEdit && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
          aria-label={`Edit ${name}`}
          className="absolute right-3 top-3 z-30 rounded-pill border border-border-soft bg-surface-elevated/95 px-3 py-1.5 text-xs font-semibold text-plum opacity-0 shadow-soft transition duration-300 ease-soft group-hover:opacity-100"
        >
          ✎
        </button>
      )}

      <div className="flex h-full flex-col p-3 sm:p-4">
        <div className="relative aspect-[4/3.15] w-full overflow-hidden rounded-card border border-border-soft/80 bg-surface shadow-soft">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
          {categoryName ? (
            <div className="absolute left-3 top-3 z-20">
              <PillBadge className="border-white/75 bg-white/84 px-3 py-1 text-[0.6rem] tracking-[0.16em] text-plum shadow-soft">
                {categoryName}
              </PillBadge>
            </div>
          ) : null}
        </div>

        <div
          className={cx(
            "mt-3 min-w-0 flex-1 rounded-card border border-border-soft bg-surface/82 p-3 shadow-soft backdrop-blur-sm sm:mt-4 sm:p-4",
            "transition-all duration-300 ease-soft",
          )}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <p className="font-serif text-xl font-semibold tracking-tight text-text-primary sm:text-[1.35rem]">
                {name}
              </p>
              {Number.isFinite(price) ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum sm:text-[0.8rem]">
                  {formatVND(price)}
                </p>
              ) : null}
            </div>

            {description ? (
              <p className="line-clamp-3 text-sm leading-6 text-text-secondary">
                {description}
              </p>
            ) : (
              <p className="text-sm leading-6 text-text-secondary">
                {t("cakeCard.defaultDescription")}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <PillBadge className="gap-1 border-white/75 bg-surface-elevated/92 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                <HeartIcon className="h-3 w-3 text-candy" />
                {t("cakeCard.customMade")}
              </PillBadge>
              <PillBadge className="gap-1 border-white/75 bg-surface-elevated/92 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                <SparkleIcon className="h-3 w-3 text-accentStrong" />
                {t("cakeCard.pastelFinish")}
              </PillBadge>
            </div>
          </div>

          {Number.isFinite(price) ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-border-soft/70 pt-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                    {t("cakeCard.startingAt")}
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-plum sm:text-[1.4rem]">
                    {formatVND(price)}
                  </p>
                </div>
                <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-plum sm:text-[0.68rem] sm:tracking-[0.18em]">
                  {t("cakeCard.viewDetails")}
                </div>
              </div>
              {feedbackImageUrl ? (
                <div className="flex items-center gap-2 rounded-[1.1rem] border border-border-soft bg-surface-elevated/75 p-2">
                  <img
                    src={feedbackImageUrl}
                    alt={t("feedback.imageAlt")}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                    {t("cakeCard.fromCustomers")}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-4 border-t border-border-soft/70 pt-4">
              <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-plum sm:text-[0.68rem] sm:tracking-[0.18em]">
                {t("cakeCard.viewDetails")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
