import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";

export default function CategorySection({
  categories = [],
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <RevealSection
      id="special-events"
      className="ds-page-shell relative overflow-hidden py-8 sm:py-10 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_20%_50%,rgba(216,165,199,0.1),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(232,217,241,0.18),transparent_35%)]" />
      <SectionHeading
        align="center"
        eyebrow={(
          <EditableText
            copyKey="home.categories.eyebrow"
            defaultText="Celebration Showcase"
          />
        )}
        title={(
          <EditableText
            copyKey="home.categories.title"
            defaultText="Special Events & Occasions"
          />
        )}
        description={(
          <EditableText
            copyKey="home.categories.subtitle"
            defaultText="Browse our signature styles by occasion and discover the visual mood that fits your sweetest celebration."
            multiline
          />
        )}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((c, index) => {
          const isHovered = hovered === index;
          const isOther = hovered !== null && hovered !== index;
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
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={handleClick}
              className={`
                relative transition-all duration-500 ease-soft
                ${translate}
                ${isHovered ? "scale-[1.03] z-20" : ""}
                ${isOther ? "scale-[0.985] opacity-90" : ""}
                ${isClicked ? "scale-125 opacity-0" : ""}
              `}
              delay={index * 80}
            >
              <SurfaceCard
                className="
                  group h-full overflow-hidden border-white/75 bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/55 p-4 text-left
                  transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-accent/60 hover:shadow-float
                "
              >
                <div className="relative mb-4 overflow-hidden rounded-[1.55rem] border border-white/75 bg-gradient-to-br from-softBg to-lavender">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="aspect-[4/4.8] h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex aspect-[4/4.8] h-full w-full items-center justify-center text-sm text-muted">
                      No image yet
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-plum/25 via-transparent to-transparent" />
                </div>

                <div className="space-y-2 px-1 pb-1">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    Curated Collection
                  </p>
                  <p className="font-serif text-2xl text-ink transition-colors duration-300">
                    {c.name}
                  </p>
                  <p className="text-sm leading-6 text-text-secondary">
                    Explore cakes styled for {c.name.toLowerCase()} with soft palettes, romantic details, and boutique presentation.
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
