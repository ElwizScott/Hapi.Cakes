import { useNavigate } from "react-router-dom";
import EditableText from "../common/EditableText";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";

export default function SocialGallery({ images = [] }) {
  const navigate = useNavigate();
  const galleryImages = images.slice(0, 6);

  if (!galleryImages.length) return null;

  return (
    <RevealSection className="ds-page-shell relative py-8 sm:py-10 lg:py-14">
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.social.eyebrow"
            defaultText="Social Gallery"
          />
        }
        title={
          <EditableText
            copyKey="home.social.title"
            defaultText="A Peek Into the Hapi.Cakes World"
          />
        }
        description={
          <EditableText
            copyKey="home.social.subtitle"
            defaultText="Pastel cake finishes, celebration tables, and sweet details that make the brand feel like a boutique dessert studio."
            multiline
          />
        }
        actions={
          <PrimaryButton
            type="button"
            onClick={() => navigate("/gallery-social")}
            className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
          >
            See customer gallery
          </PrimaryButton>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {galleryImages.map((image, index) => {
          const url = image?.url ?? image;
          const spanClass =
            index === 0
              ? "lg:col-span-5 lg:row-span-2"
              : index === 1 || index === 2
                ? "lg:col-span-3"
                : "lg:col-span-4";

          return (
            <RevealSection
              key={`${url}-${index}`}
              delay={index * 70}
              className={spanClass}
            >
              <SurfaceCard className="group h-full overflow-hidden border-white/70 bg-white/70 p-2 backdrop-blur">
                <div className="relative h-full min-h-[14rem] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-surface via-accent-soft/20 to-lavender/30">
                  <img
                    src={url}
                    alt="Hapi.Cakes social gallery"
                    className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/20 via-transparent to-transparent opacity-70" />
                </div>
              </SurfaceCard>
            </RevealSection>
          );
        })}
      </div>
    </RevealSection>
  );
}
