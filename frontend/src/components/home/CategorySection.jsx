import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function CategorySection({ categories = [] }) {
  const navigate = useNavigate();
  const { t } = useAppTranslation("home");
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <RevealSection
      id="special-events"
      className="ds-page-shell relative overflow-hidden py-6 sm:py-10 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_20%_50%,rgba(216,165,199,0.1),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(232,217,241,0.18),transparent_35%)]" />
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.categories.eyebrow"
            defaultText={t("categories.eyebrow")}
          />
        }
        title={
          <EditableText
            copyKey="home.categories.title"
            defaultText={t("categories.title")}
          />
        }
        description={
          <EditableText
            copyKey="home.categories.subtitle"
            defaultText={t("categories.subtitle")}
            multiline
          />
        }
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((c, index) => {
          const isHovered = canHover && hovered === index;
          const isOther = canHover && hovered !== null && hovered !== index;
          const isClicked = clickedIndex === index;

          let translate = "";
          if (hovered !== null) {
            if (index < hovered) translate = "-translate-x-6";
            if (index > hovered) translate = "translate-x-6";
          }

          const handleClick = () => {
            if (clickedIndex !== null) return;
            setClickedIndex(index);
            setTimeout(() => {
              navigate(`/gallery?category=${c.slug}`);
            }, 300);
          };

          return (
            <RevealSection
              key={c.id ?? c.slug}
              onMouseEnter={canHover ? () => setHovered(index) : undefined}
              onMouseLeave={canHover ? () => setHovered(null) : undefined}
              onClick={handleClick}
              className={`
                relative cursor-pointer transition-all duration-500 ease-soft
                ${translate}
                ${isHovered ? "scale-[1.03] z-20" : ""}
                ${isOther ? "scale-[0.985] opacity-90" : ""}
                ${isClicked ? "scale-125 opacity-0" : ""}
              `}
              delay={index * 80}
            >
              <SurfaceCard className="group h-full overflow-hidden border-white/75 bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/55 p-3 text-left transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-accent/60 hover:shadow-float sm:p-4">
                <div className="relative mb-4 overflow-hidden rounded-[1.55rem] border border-white/75 bg-gradient-to-br from-softBg to-lavender">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="aspect-[4/4.8] h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex aspect-[4/4.8] h-full w-full items-center justify-center text-sm text-muted">
                      {t("categories.noImage")}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-plum/25 via-transparent to-transparent" />
                </div>

                <div className="space-y-2 px-1 pb-1">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    {t("categories.collection")}
                  </p>
                  <p className="font-serif text-xl text-ink transition-colors duration-300 sm:text-2xl">
                    {c.name}
                  </p>
                  <p className="text-sm leading-6 text-text-secondary">
                    {t("categories.description", {
                      name: c.name.toLowerCase(),
                    })}
                  </p>
                </div>
              </SurfaceCard>
            </RevealSection>
          );
        })}
      </div>
    </RevealSection>
  );
}
