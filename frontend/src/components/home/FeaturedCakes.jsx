import { useNavigate } from "react-router-dom";
import EditableText from "../common/EditableText";
import PillBadge from "../common/PillBadge";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import { formatVND } from "../../utils/formatPrice";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function FeaturedCakes({ cakes = [], categoryById }) {
  const navigate = useNavigate();
  const { t } = useAppTranslation("home");

  if (!cakes.length) return null;

  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-40 bg-[radial-gradient(circle_at_18%_50%,rgba(216,165,199,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(232,217,241,0.22),transparent_32%)]" />
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.featured.eyebrow"
            defaultText={t("featured.eyebrow")}
          />
        }
        title={
          <EditableText
            copyKey="home.featured.title"
            defaultText={t("featured.title")}
          />
        }
        description={
          <EditableText
            copyKey="home.featured.subtitle"
            defaultText={t("featured.subtitle")}
            multiline
          />
        }
        actions={
          <PrimaryButton
            type="button"
            onClick={() => navigate("/gallery")}
            className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
          >
            <EditableText
              copyKey="home.featured.view_all"
              defaultText={t("featured.viewAll")}
            />
          </PrimaryButton>
        }
        className="relative z-10"
      />

      <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cakes.slice(0, 4).map((cake, index) => {
          const category = categoryById.get(String(cake.categoryId));

          return (
            <RevealSection key={cake.id} delay={index * 80}>
              <SurfaceCard className="group h-full overflow-hidden border-white/70 bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/60 p-2.5 transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-float sm:p-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/cakes/${cake.id}`, {
                      state: {
                        cake,
                        categoryName: category?.name ?? "",
                        scrollY: window.scrollY,
                      },
                    })
                  }
                  className="block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-gradient-to-br from-surface via-accent-soft/30 to-lavender/30">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.4),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(110,85,117,0.12))]" />
                    <div className="aspect-[4/4.15] sm:aspect-[4/4.25]">
                      <img
                        src={cake.imageUrls[0]}
                        alt={cake.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
                      />
                    </div>
                    {category?.name ? (
                      <div className="absolute left-3 top-3 z-20">
                        <PillBadge className="border-white/70 bg-white/80 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                          {category.name}
                        </PillBadge>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-3 px-2 pb-2 pt-4">
                    <div>
                      <h3 className="font-serif text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
                        {cake.name}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-text-secondary line-clamp-2 sm:text-sm sm:leading-6">
                        {cake.description || t("featured.cardDescription")}
                      </p>
                    </div>

                    {/* <div className="flex items-end justify-between gap-3 border-t border-border-soft/70 pt-3">
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
                          Starting at
                        </p>
                        <p className="mt-1 font-serif text-xl font-semibold text-plum sm:text-2xl">
                          {formatVND(cake.price)}
                        </p>
                      </div>
                      <div className="rounded-pill bg-accent-soft px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-plum transition duration-300 ease-soft group-hover:bg-white sm:text-[0.65rem] sm:tracking-[0.18em]">
                        Discover
                      </div>
                    </div> */}
                  </div>
                </button>
              </SurfaceCard>
            </RevealSection>
          );
        })}
      </div>
    </RevealSection>
  );
}
