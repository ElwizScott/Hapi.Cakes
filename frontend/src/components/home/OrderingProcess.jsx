import EditableText from "../common/EditableText";
import PrimaryButton from "../common/PrimaryButton";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function OrderingProcess({ onOrderClick }) {
  const { t } = useAppTranslation("home");
  const steps = [
    {
      number: "01",
      title: t("process.steps.share.title"),
      body: t("process.steps.share.body"),
    },
    {
      number: "02",
      title: t("process.steps.refine.title"),
      body: t("process.steps.refine.body"),
    },
    {
      number: "03",
      title: t("process.steps.celebrate.title"),
      body: t("process.steps.celebrate.body"),
    },
  ];

  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[2.15rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,250,245,0.98),rgba(251,242,250,0.96))] p-4 shadow-soft sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-brandPink/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-lavender/18 blur-3xl" />
        </div>

        <div className="relative z-10">
          <SectionHeading
            eyebrow={
              <EditableText
                copyKey="home.process.eyebrow"
                defaultText={t("process.eyebrow")}
              />
            }
            title={
              <EditableText
                copyKey="home.process.title"
                defaultText={t("process.title")}
              />
            }
            description={
              <EditableText
                copyKey="home.process.subtitle"
                defaultText={t("process.subtitle")}
                multiline
              />
            }
            actions={
              <PrimaryButton
                type="button"
                onClick={onOrderClick}
                className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
              >
                {t("process.orderButton")}
              </PrimaryButton>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
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
