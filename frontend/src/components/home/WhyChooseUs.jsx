import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";

const reasons = [
  {
    title: "Refined custom styling",
    body: "Every cake is designed with a boutique editorial eye, from color harmony to finishing details.",
  },
  {
    title: "Celebration-first approach",
    body: "We create pieces that don’t just taste lovely, but elevate the table and the memory around it.",
  },
  {
    title: "Soft premium aesthetic",
    body: "Pastel palettes, floral details, and polished textures inspired by modern Korean and Japanese cafe culture.",
  },
  {
    title: "Warm, personal service",
    body: "The process stays collaborative and thoughtful, so your order feels special from inquiry to delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[2.15rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(250,242,250,0.94))] p-4 shadow-soft sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-brandPink/10 blur-3xl" />
          <div className="absolute right-8 bottom-0 h-36 w-36 rounded-full bg-lavender/18 blur-3xl" />
        </div>

        <div className="relative z-10">
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
                defaultText="Designed for Celebrations That Deserve More Than a Standard Cake"
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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <RevealSection key={reason.title} delay={index * 80}>
                <SurfaceCard className="h-full border-white/70 bg-white/72 p-5 backdrop-blur">
                  <div className="space-y-3">
                    <div className="h-2.5 w-12 rounded-full bg-gradient-to-r from-brandPink to-accent" />
                    <h3 className="font-serif text-2xl font-semibold tracking-tight text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-6 text-text-secondary">
                      {reason.body}
                    </p>
                  </div>
                </SurfaceCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
