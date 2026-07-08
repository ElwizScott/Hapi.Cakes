import { useNavigate } from "react-router-dom";
import EditableText from "../../../components/common/EditableText";
import PageHero from "../../../components/common/PageHero";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SurfaceCard from "../../../components/common/SurfaceCard";
import useAppTranslation from "../../../i18n/useAppTranslation";

export default function Contact() {
  const navigate = useNavigate();
  const { t } = useAppTranslation("contact");
  const { t: tCommon } = useAppTranslation("common");

  const socials = [
    {
      name: "Instagram",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.instagram.com/hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.tiktok.com/@hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M15.5 3h2.2c.3 2.1 1.8 3.8 3.8 4.3v2.3c-1.8-.1-3.4-.7-4.7-1.8v6.6a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v2.4a3.4 3.4 0 1 0 2.4 3.3V3Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "Hapi.Cakes",
      href: "https://www.facebook.com/profile.php?id=61568773922797&locale=vi_VN",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Threads",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.threads.com/@hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3c5 0 8.8 2.9 9 8.3v.7c0 4.9-3.2 8-7.9 8-2.7 0-4.8-1.2-5.7-3.2l2.2-.9c.5 1.3 1.9 2.1 3.6 2.1 3 0 4.9-1.8 4.9-4.8v-.3c-1-.9-2.6-1.4-4.4-1.4-2.5 0-4.2 1-4.2 2.6 0 1.2 1 2 2.6 2 .7 0 1.4-.2 2-.5l.7 2.1c-.8.4-1.8.6-2.8.6-2.7 0-4.7-1.5-4.7-4.1 0-2.9 2.5-4.7 6.4-4.7 1.6 0 3.2.3 4.5.9-.6-3.1-3.2-4.8-6.5-4.8-3.9 0-6.5 2.4-6.5 6.8 0 4.4 2.6 6.9 6.8 6.9 1.6 0 3-.4 4.1-1.3l1.3 1.9c-1.4 1.1-3.2 1.7-5.4 1.7C6.1 20 3 16.7 3 11.9 3 6.3 6.8 3 12 3Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[linear-gradient(180deg,rgba(255,246,251,0.98),rgba(250,243,250,0.96),rgba(255,248,252,0.98))] px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6 font-serif text-ink">
        <PageHero
          eyebrow={
            <EditableText
              copyKey="contact.header.label"
              defaultText={t("header.label")}
            />
          }
          title={
            <EditableText
              copyKey="contact.header.title"
              defaultText={t("header.title")}
            />
          }
          description={
            <EditableText
              copyKey="contact.header.subtitle"
              defaultText={t("header.subtitle")}
              multiline
            />
          }
          actions={
            <PrimaryButton
              type="button"
              onClick={() => navigate("/order")}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em]"
            >
              {tCommon("buttons.startOrder")}
            </PrimaryButton>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-12 items-center gap-4 rounded-card border border-border-soft bg-surface p-4 shadow-soft transition duration-300 ease-soft hover:-translate-y-1 hover:border-accent/50 hover:shadow-float sm:p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] bg-accent-soft/75 text-plum shadow-soft transition duration-300 ease-soft group-hover:bg-white sm:h-12 sm:w-12">
                {social.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary">
                  {social.name}
                </p>
                <p className="text-xs text-text-secondary">{social.handle}</p>
              </div>
              <span className="ml-auto shrink-0 text-sm font-semibold text-plum transition group-hover:text-brandPink">
                <EditableText
                  copyKey="contact.social.visit"
                  defaultText={t("social.visit")}
                />
              </span>
            </a>
          ))}
        </div>

        <SurfaceCard className="border-white/70 bg-white/72 p-5 text-center backdrop-blur sm:p-6">
          <p className="text-sm leading-6 text-text-secondary">
            <EditableText
              copyKey="contact.cta.label"
              defaultText={t("cta.label")}
            />
          </p>
        </SurfaceCard>
      </div>
    </section>
  );
}
