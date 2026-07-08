import { BowIcon, HeartIcon, SparkleIcon, StarIcon } from "../common/BakeryIcons";
import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import Sprinkles from "../common/Sprinkles";
import RevealSection from "./RevealSection";

const reasons = [
  {
    title: "Refined custom styling",
    body: "Every cake is designed with a boutique editorial eye, from color harmony to finishing details.",
    icon: SparkleIcon,
    tint: "bg-brandPink/20 text-plum",
  },
  {
    title: "Celebration-first approach",
    body: "We create pieces that don’t just taste lovely, but elevate the table and the memory around it.",
    icon: HeartIcon,
    tint: "bg-candy/25 text-plum",
  },
  {
    title: "Soft premium aesthetic",
    body: "Pastel palettes, floral details, and polished textures inspired by modern Korean and Japanese cafe culture.",
    icon: BowIcon,
    tint: "bg-lavender/40 text-plum",
  },
  {
    title: "Warm, personal service",
    body: "The process stays collaborative and thoughtful, so your order feels special from inquiry to delivery.",
    icon: StarIcon,
    tint: "bg-accent-soft text-accentStrong",
  },
];

export default function WhyChooseUs() {
  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <Sprinkles variant="section" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={
              <EditableText
                copyKey="home.why.eyebrow"
                defaultText="Why Choose Us"
              />
            }
            title={
              <EditableText
                copyKey="home.why.title"
                defaultText="Designed for celebrations that deserve more than a standard cake"
              />
            }
            description={
              <EditableText
                copyKey="home.why.subtitle"
                defaultText="Hapi.Cakes combines premium styling, cozy romance, and custom details so each celebration feels polished, personal, and camera-ready."
                multiline
              />
            }
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <RevealSection key={reason.title} delay={index * 80}>
                <div className="group flex h-full gap-4 rounded-[1.75rem] border border-border-soft/70 bg-white/55 p-5 transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-accent/50 hover:bg-white hover:shadow-float">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-soft group-hover:scale-110 group-hover:rotate-6 ${reason.tint}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold tracking-tight text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-6 text-text-secondary">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
