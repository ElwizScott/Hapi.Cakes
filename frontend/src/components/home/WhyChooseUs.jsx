import { BowIcon, HeartIcon, SparkleIcon, StarIcon } from "../common/BakeryIcons";
import EditableText from "../common/EditableText";
import SectionHeading from "../common/SectionHeading";
import Sprinkles from "../common/Sprinkles";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function WhyChooseUs() {
  const { t } = useAppTranslation("home");
  const reasons = [
    {
      title: t("why.items.refined.title"),
      body: t("why.items.refined.body"),
      icon: SparkleIcon,
      tint: "bg-brandPink/20 text-plum",
    },
    {
      title: t("why.items.celebration.title"),
      body: t("why.items.celebration.body"),
      icon: HeartIcon,
      tint: "bg-candy/25 text-plum",
    },
    {
      title: t("why.items.aesthetic.title"),
      body: t("why.items.aesthetic.body"),
      icon: BowIcon,
      tint: "bg-lavender/40 text-plum",
    },
    {
      title: t("why.items.service.title"),
      body: t("why.items.service.body"),
      icon: StarIcon,
      tint: "bg-accent-soft text-accentStrong",
    },
  ];

  return (
    <RevealSection className="ds-page-shell relative py-6 sm:py-10 lg:py-14">
      <Sprinkles variant="section" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div>
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
