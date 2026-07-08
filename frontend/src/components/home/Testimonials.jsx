import { HeartIcon } from "../common/BakeryIcons";
import EditableText from "../common/EditableText";
import PillBadge from "../common/PillBadge";
import SectionHeading from "../common/SectionHeading";
import SurfaceCard from "../common/SurfaceCard";
import RevealSection from "./RevealSection";
import useAppTranslation from "../../i18n/useAppTranslation";

function Avatar({ image, name }) {
  return (
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-surface to-accent-soft/40 shadow-soft">
      {image ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : null}
    </div>
  );
}

export default function Testimonials({ images = [] }) {
  const { t } = useAppTranslation("home");
  const cards = [
    {
      quote: t("testimonials.items.birthday.quote"),
      name: t("testimonials.items.birthday.name"),
    },
    {
      quote: t("testimonials.items.wedding.quote"),
      name: t("testimonials.items.wedding.name"),
    },
    {
      quote: t("testimonials.items.private.quote"),
      name: t("testimonials.items.private.name"),
    },
  ].map((item, index) => ({
    ...item,
    image: images[index]?.url ?? images[index] ?? "",
  }));
  const [featured, ...rest] = cards;

  return (
    <RevealSection className="ds-page-shell relative py-4 sm:py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(232,217,241,0.16),rgba(255,255,255,0))]" />
      <SectionHeading
        eyebrow={
          <EditableText
            copyKey="home.testimonials.eyebrow"
            defaultText={t("testimonials.eyebrow")}
          />
        }
        title={
          <EditableText
            copyKey="home.testimonials.title"
            defaultText={t("testimonials.title")}
          />
        }
        description={
          <EditableText
            copyKey="home.testimonials.subtitle"
            defaultText={t("testimonials.subtitle")}
            multiline
          />
        }
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <RevealSection>
          <SurfaceCard className="relative flex h-full flex-col justify-between gap-6 overflow-hidden border-white/70 bg-[linear-gradient(150deg,rgba(255,252,248,0.98),rgba(250,241,249,0.94))] p-6 sm:p-8">
            <HeartIcon className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-brandPink/15" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <PillBadge className="border-white/70 bg-white/85 px-3 py-1 text-[0.62rem] tracking-[0.18em] shadow-soft">
                  {t("testimonials.featuredReview")}
                </PillBadge>
                <span className="font-serif text-5xl leading-none text-plum/30">
                  “
                </span>
              </div>
              <p className="font-serif text-2xl leading-9 text-text-primary sm:text-3xl sm:leading-[2.6rem]">
                {featured.quote}
              </p>
            </div>
            <div className="relative flex items-center gap-3 border-t border-border-soft/70 pt-5">
              <Avatar image={featured.image} name={featured.name} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-plum">
                  {featured.name}
                </p>
                <p className="text-sm text-text-secondary">
                  {t("testimonials.tagline")}
                </p>
              </div>
            </div>
          </SurfaceCard>
        </RevealSection>

        <div className="flex flex-col gap-4">
          {rest.map((item, index) => (
            <RevealSection key={item.name} delay={(index + 1) * 110} className="flex-1">
              <SurfaceCard className="flex h-full flex-col gap-4 border-white/70 bg-white/68 p-5">
                <p className="font-serif text-base leading-7 text-text-primary">
                  {item.quote}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border-soft/70 pt-4">
                  <Avatar image={item.image} name={item.name} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {t("testimonials.tagline")}
                    </p>
                  </div>
                </div>
              </SurfaceCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
