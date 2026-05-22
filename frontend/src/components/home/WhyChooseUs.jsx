import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function WhyChooseUs() {
  const { t } = useAppTranslation("home");
  const reasons = [
    {
      title: t("why.items.refined.title"),
      body: t("why.items.refined.body"),
    },
    {
      title: t("why.items.celebration.title"),
      body: t("why.items.celebration.body"),
    },
    {
      title: t("why.items.aesthetic.title"),
      body: t("why.items.aesthetic.body"),
    },
    {
      title: t("why.items.service.title"),
      body: t("why.items.service.body"),
    },
  ];

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
                defaultText={t("why.eyebrow")}
              />
            }
            title={
              <EditableText
                copyKey="home.why.title"
                defaultText={t("why.title")}
              />
            }
            description={
              <EditableText
                copyKey="home.why.subtitle"
                defaultText={t("why.subtitle")}
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
