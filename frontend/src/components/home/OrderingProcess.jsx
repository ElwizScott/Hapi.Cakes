import EditableText from "../common/EditableText";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";
import RevealSection from "./RevealSection";

const steps = [
  {
    title: "Share your inspiration",
    body: "Tell us your celebration, palette, mood, and references so we can shape a cake that feels truly personal.",
  },
  {
    title: "Refine the sweet details",
    body: "We align on size, flavor, styling direction, and finishing touches to create a design that feels polished and thoughtful.",
  },
  {
    title: "Celebrate beautifully",
    body: "Your cake arrives ready to anchor the table and elevate the whole celebration with a premium boutique feel.",
  },
];

export default function OrderingProcess({ onOrderClick }) {
  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.process.eyebrow"
            defaultText="How It Works"
          />
        }
        title={
          <EditableText
            copyKey="home.process.title"
            defaultText="A custom cake process that feels easy, personal, and premium"
          />
        }
        description={
          <EditableText
            copyKey="home.process.subtitle"
            defaultText="From your first inspiration to the final reveal, every step is designed to make ordering feel calm, collaborative, and beautifully tailored."
            multiline
          />
        }
        actions={
          <PrimaryButton
            type="button"
            onClick={onOrderClick}
            className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
          >
            Start your order
          </PrimaryButton>
        }
      />

      <div className="relative mt-12">
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-accent/40 lg:block" />

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <RevealSection key={step.title} delay={index * 90}>
              <div className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface font-serif text-lg font-bold text-accentStrong shadow-soft">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2 pt-0.5 lg:mt-5 lg:pt-0">
                  <h3 className="font-serif text-xl font-semibold tracking-tight text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-text-secondary lg:max-w-xs lg:mx-auto">
                    {step.body}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="ml-6 mt-3 h-8 w-px border-l-2 border-dashed border-accent/40 lg:hidden" />
              ) : null}
            </RevealSection>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
