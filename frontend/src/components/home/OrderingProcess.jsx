import EditableText from "../common/EditableText";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";

const steps = [
  {
    number: "01",
    title: "Share your inspiration",
    body: "Tell us your celebration, palette, mood, and references so we can shape a cake that feels truly personal.",
  },
  {
    number: "02",
    title: "Refine the sweet details",
    body: "We align on size, flavor, styling direction, and finishing touches to create a design that feels polished and thoughtful.",
  },
  {
    number: "03",
    title: "Celebrate beautifully",
    body: "Your cake arrives ready to anchor the table and elevate the whole celebration with a premium boutique feel.",
  },
];

export default function OrderingProcess({ onOrderClick }) {
  return (
    <RevealSection className="ds-page-shell relative py-8 sm:py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[2.15rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,250,245,0.98),rgba(251,242,250,0.96))] p-6 shadow-soft sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-brandPink/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-lavender/18 blur-3xl" />
        </div>

        <div className="relative z-10">
          <SectionHeading
            eyebrow={(
              <EditableText
                copyKey="home.process.eyebrow"
                defaultText="How It Works"
              />
            )}
            title={(
              <EditableText
                copyKey="home.process.title"
                defaultText="A Custom Cake Process That Feels Easy, Personal, and Premium"
              />
            )}
            description={(
              <EditableText
                copyKey="home.process.subtitle"
                defaultText="From your first inspiration to the final reveal, every step is designed to make ordering feel calm, collaborative, and beautifully tailored."
                multiline
              />
            )}
            actions={(
              <PrimaryButton
                type="button"
                onClick={onOrderClick}
                className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
              >
                Start your order
              </PrimaryButton>
            )}
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <RevealSection key={step.number} delay={index * 90}>
                <SurfaceCard className="h-full border-white/70 bg-white/72 p-5 backdrop-blur">
                  <div className="space-y-4">
                    <div className="font-serif text-4xl text-plum/55">
                      {step.number}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold tracking-tight text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-6 text-text-secondary">
                      {step.body}
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
