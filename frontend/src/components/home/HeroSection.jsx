import AdminImageEditOverlay from "../../features/admin/components/AdminImageEditOverlay";
import EditableText from "../common/EditableText";
import PillBadge from "../common/PillBadge";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import useAppTranslation from "../../i18n/useAppTranslation";

export default function HeroSection({
  featuredImageUrl,
  isAdmin,
  onFeaturedImageUploaded,
  onOrderClick,
  onGalleryClick,
  onContactClick,
}) {
  const { t } = useAppTranslation("home");

  return (
    <section className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="relative isolate overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,250,245,0.995)_0%,rgba(255,248,252,0.99)_38%,rgba(248,239,250,0.985)_100%)] p-4 shadow-[0_30px_80px_rgba(125,106,121,0.14)] sm:p-8 lg:p-12">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-12 top-10 h-32 w-32 animate-float-gentle rounded-full bg-brandPink/12 blur-3xl" />
          <div className="absolute right-12 top-8 h-28 w-28 animate-float-delayed rounded-full bg-lavender/28 blur-3xl" />
          <div className="absolute bottom-8 left-[42%] h-20 w-20 animate-soft-pulse rounded-full bg-accent-soft/70 blur-2xl" />
          <div className="absolute -bottom-8 right-8 h-40 w-40 rounded-full border border-white/35 bg-white/12 blur-2xl" />
          <div className="absolute left-8 top-8 h-14 w-14 rounded-[40%] border border-white/55 bg-white/24 rotate-12" />
          <div className="absolute right-[32%] top-[18%] h-10 w-10 rounded-full bg-brandPink/16" />
        </div>

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-12">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-pill border border-white/65 bg-white/60 px-4 py-2 shadow-soft backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-plum/75">
                {t("hero.eyebrow")}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <p
                className="text-3xl text-plum/80 sm:text-4xl"
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              >
                {t("hero.kicker")}
              </p>
              <h1 className="max-w-xl font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                <EditableText
                  copyKey="home.hero.title"
                  defaultText={t("hero.title")}
                />
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                <EditableText
                  copyKey="home.hero.subtitle"
                  defaultText={t("hero.subtitle")}
                  multiline
                />
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <PrimaryButton
                type="button"
                onClick={onOrderClick}
                className="w-full px-7 py-3.5 text-sm uppercase tracking-[0.18em] sm:w-auto sm:min-w-[10.5rem]"
              >
                <EditableText
                  copyKey="home.hero.cta_order"
                  defaultText={t("hero.ctaOrder")}
                />
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={onGalleryClick}
                className="w-full border-white/70 bg-white/72 px-7 py-3.5 text-sm uppercase tracking-[0.18em] sm:w-auto sm:min-w-[10.5rem]"
              >
                <EditableText
                  copyKey="home.hero.cta_gallery"
                  defaultText={t("hero.ctaGallery")}
                />
              </SecondaryButton>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill px-2 py-2 text-sm font-medium text-plum transition duration-300 ease-soft hover:translate-x-1 hover:text-text-primary"
              >
                <EditableText
                  copyKey="home.hero.cta_contact"
                  defaultText={t("hero.ctaContact")}
                />
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <PillBadge className="justify-center border-white/70 bg-white/72 px-4 py-3 text-[0.68rem] tracking-[0.2em] shadow-soft">
                <EditableText
                  copyKey="home.hero.proof_1"
                  defaultText={t("hero.proof1", {
                    defaultValue: "100+ happy customers",
                  })}
                />
              </PillBadge>
              <PillBadge className="justify-center border-white/70 bg-white/72 px-4 py-3 text-[0.68rem] tracking-[0.2em] shadow-soft">
                <EditableText
                  copyKey="home.hero.proof_2"
                  defaultText={t("hero.proof2", {
                    defaultValue: "Custom designs",
                  })}
                />
              </PillBadge>
              <PillBadge className="justify-center border-white/70 bg-white/72 px-4 py-3 text-[0.68rem] tracking-[0.2em] shadow-soft">
                <EditableText
                  copyKey="home.hero.proof_3"
                  defaultText={t("hero.proof3", {
                    defaultValue: "Made with love",
                  })}
                />
              </PillBadge>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="rounded-pill border border-white/65 bg-white/58 px-4 py-2 shadow-soft">
                {t("hero.note1", {
                  defaultValue: "Handcrafted in small batches",
                })}
              </div>
              <div className="rounded-pill border border-white/65 bg-white/58 px-4 py-2 shadow-soft">
                {t("hero.note2", { defaultValue: "Premium ingredients" })}
              </div>
              <div className="rounded-pill border border-white/65 bg-white/58 px-4 py-2 shadow-soft">
                {t("hero.note3", {
                  defaultValue: "Personalized celebration styling",
                })}
              </div>
            </div>
          </div>

          <div className="relative z-20 mx-auto w-full max-w-[32rem] lg:max-w-none">
            <div className="absolute -left-6 top-8 z-30 hidden w-40 rounded-[1.75rem] border border-white/80 bg-[rgba(255,252,249,0.94)] p-4 shadow-[0_20px_45px_rgba(125,106,121,0.14)] backdrop-blur md:block animate-[overlayIn_700ms_ease-out]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-plum/70">
                Best For
              </p>
              <p className="mt-2 font-serif text-lg text-text-primary">
                Birthdays, weddings, intimate parties
              </p>
            </div>

            <div className="absolute -right-3 bottom-8 z-30 hidden w-44 rounded-[1.75rem] border border-white/80 bg-[rgba(255,252,249,0.95)] p-4 shadow-[0_20px_45px_rgba(125,106,121,0.15)] backdrop-blur sm:block animate-[overlayIn_700ms_ease-out] [animation-delay:180ms]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-plum/70">
                Signature Style
              </p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Delicate florals, pastel palettes, and bakery-fresh elegance.
              </p>
            </div>

            <div className="relative isolate z-20">
              <div className="absolute inset-x-10 bottom-2 z-0 h-16 rounded-full bg-plum/8 blur-2xl" />
              <div className="absolute -inset-3 z-0 rounded-[2.25rem] bg-gradient-to-br from-white/38 via-white/8 to-brandPink/6 blur-xl" />
              <div className="relative z-10 overflow-hidden rounded-[2.15rem] border border-white/85 bg-[linear-gradient(180deg,rgba(255,253,250,0.985),rgba(255,250,246,0.975))] p-3 shadow-[0_28px_60px_rgba(110,85,117,0.18)]">
                <div className="relative isolate overflow-hidden rounded-[1.7rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,252,248,1),rgba(251,243,250,0.96))]">
                  <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.52),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(232,217,241,0.24),transparent_34%)]" />
                  <div className="relative z-10 h-[24rem] bg-[rgba(255,251,248,0.96)] sm:h-[28rem] lg:h-[34rem]">
                    {featuredImageUrl ? (
                      <img
                        src={featuredImageUrl}
                        alt="Featured cake"
                        className="h-full w-full object-cover transition-transform duration-700 ease-soft hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-8 text-center font-serif text-2xl text-plum">
                        Featured Cake
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-plum/18 via-plum/4 to-transparent" />
                  </div>
                </div>

                <div className="pointer-events-none absolute left-7 top-7 z-20 h-11 w-11 rounded-full border border-white/70 bg-white/32 backdrop-blur" />
                <div className="pointer-events-none absolute right-8 top-10 z-20 h-5 w-5 rounded-full bg-brandPink/28" />
              </div>
            </div>

            {isAdmin ? (
              <AdminImageEditOverlay
                label={t("hero.editFeatured", {
                  defaultValue: "Update featured cake",
                })}
                uploadEndpoint="/api/admin/upload/featured"
                currentImageUrl={featuredImageUrl}
                onUploaded={onFeaturedImageUploaded}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
