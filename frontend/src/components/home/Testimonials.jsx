import EditableText from "../common/EditableText";
import PillBadge from "../common/PillBadge";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";

const fallbackTestimonials = [
  {
    quote:
      "The cake looked even softer and prettier in person. It felt like it belonged in a boutique cafe window.",
    name: "Birthday Celebration",
  },
  {
    quote:
      "The design was elegant, the details were thoughtful, and it instantly made the whole table feel more special.",
    name: "Wedding Client",
  },
  {
    quote:
      "Beautiful styling, lovely textures, and a premium finish that made our celebration feel complete.",
    name: "Private Event",
  },
];

export default function Testimonials({ images = [] }) {
  const cards = fallbackTestimonials.map((item, index) => ({
    ...item,
    image: images[index]?.url ?? images[index] ?? "",
  }));

  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(232,217,241,0.16),rgba(255,255,255,0))]" />
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.testimonials.eyebrow"
            defaultText="Customer Love"
          />
        }
        title={
          <EditableText
            copyKey="home.testimonials.title"
            defaultText="Testimonials That Feel as Sweet as the Cakes"
          />
        }
        description={
          <EditableText
            copyKey="home.testimonials.subtitle"
            defaultText="Real celebrations, soft details, and memorable moments shared by customers who wanted their cake to feel extra special."
            multiline
          />
        }
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {cards.map((item, index) => (
          <RevealSection key={item.name} delay={index * 100}>
            <SurfaceCard className="h-full border-white/70 bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(250,243,250,0.92))] p-4 sm:p-5">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <PillBadge className="border-white/70 bg-white/80 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Featured Review
                  </PillBadge>
                  <span className="font-serif text-3xl leading-none text-plum/35">
                    “
                  </span>
                </div>

                <p className="font-serif text-lg leading-7 text-text-primary sm:text-xl sm:leading-8">
                  {item.quote}
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-border-soft/70 pt-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-white/80 bg-gradient-to-br from-surface to-accent-soft/40">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum sm:text-sm sm:tracking-[0.18em]">
                      {item.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Loved for the details and finish
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </RevealSection>
        ))}
      </div>
    </RevealSection>
  );
}
