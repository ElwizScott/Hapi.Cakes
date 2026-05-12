import { useState } from "react";
import { Link } from "react-router-dom";
import EditableText from "./EditableText";
import PrimaryButton from "./PrimaryButton";
import PillBadge from "./PillBadge";
import SurfaceCard from "./SurfaceCard";
import {
  bodyClass,
  buttonGhostClass,
  cx,
  fieldClass,
} from "./designSystem";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Order", to: "/order" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hapi.cakes_bymichelle/",
    icon: "◎",
    detail: "@hapi.cakes_bymichelle",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61568773922797",
    icon: "◌",
    detail: "Celebration updates",
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@hapi.cakes_bymichelle",
    icon: "◍",
    detail: "Cake styling videos",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@hapi.cakes_bymichelle",
    icon: "◐",
    detail: "Sweet daily notes",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setNewsletterState("error");
      return;
    }
    setNewsletterState("success");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border-soft bg-[linear-gradient(180deg,rgba(255,251,247,0.98),rgba(250,243,250,0.94))] backdrop-blur">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-brandPink/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-lavender/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-accent-soft/70 blur-2xl" />
      </div>

      <div className="relative ds-page-shell py-12 sm:py-14 lg:py-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_0.85fr]">
          <SurfaceCard className="overflow-hidden border-white/75 bg-white/72 p-6 backdrop-blur sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_1fr]">
              <div className="space-y-5">
                <div>
                  <p className="font-script text-4xl leading-none text-plum">
                    <EditableText
                      copyKey="footer.brand"
                      defaultText="Hapi.Cakes"
                    />
                  </p>
                  <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-plum/65">
                    Patisserie Studio
                  </p>
                </div>

                <p className={cx(bodyClass, "max-w-sm text-sm")}>
                  <EditableText
                    copyKey="footer.description"
                    defaultText="Handcrafted cakes for celebrations, delivered with care and a dash of sweetness."
                    multiline
                  />
                </p>

                <div className="flex flex-wrap gap-2">
                  <PillBadge className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Cozy cafe aesthetic
                  </PillBadge>
                  <PillBadge className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Made for celebrations
                  </PillBadge>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    <EditableText
                      copyKey="footer.quick_links"
                      defaultText="Quick Links"
                    />
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {quickLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={cx(
                            buttonGhostClass,
                            "inline-flex px-0 py-1 text-sm font-medium text-text-secondary hover:bg-transparent hover:text-plum",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    <EditableText
                      copyKey="footer.follow_us"
                      defaultText="Follow Us"
                    />
                  </p>
                  <ul className="mt-4 space-y-3">
                    {socialLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 rounded-[1.2rem] border border-transparent bg-white/36 px-3 py-3 transition duration-300 ease-soft hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/72 hover:shadow-soft"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft/75 text-sm text-plum transition duration-300 ease-soft group-hover:bg-white">
                            {link.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-text-primary">
                              {link.label}
                            </span>
                            <span className="block text-xs text-text-secondary">
                              {link.detail}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="overflow-hidden border-white/75 bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(250,241,249,0.94))] p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                  Sweet Updates
                </p>
                <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-text-primary">
                  Join the Hapi.Cakes circle
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Be first to see seasonal cake styles, boutique celebration ideas, and soft pastel bakery inspiration.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="rounded-[1.4rem] border border-white/75 bg-white/76 p-2 shadow-soft">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (newsletterState !== "idle") {
                        setNewsletterState("idle");
                      }
                    }}
                    className={cx(
                      fieldClass,
                      "border-transparent bg-transparent px-4 py-3 shadow-none focus:border-border-soft",
                    )}
                    placeholder="Enter your email for sweet news"
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full px-5 py-3 text-xs uppercase tracking-[0.18em]"
                >
                  Join the newsletter
                </PrimaryButton>

                {newsletterState === "error" ? (
                  <p className="text-sm text-danger">
                    Add a valid email to join the sweet updates list.
                  </p>
                ) : null}

                {newsletterState === "success" ? (
                  <p className="text-sm text-success">
                    You’re on the list. We’ll keep the sweet inspiration coming.
                  </p>
                ) : null}
              </form>

              <div className="rounded-[1.3rem] border border-white/70 bg-white/58 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-plum/75">
                  Most loved
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <PillBadge className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Floral birthday cakes
                  </PillBadge>
                  <PillBadge className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Wedding centerpieces
                  </PillBadge>
                  <PillBadge className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft">
                    Pastel dessert styling
                  </PillBadge>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border-soft/80 pt-6 text-center text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Hapi.Cakes. All rights reserved.</p>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-plum/70">
            Softly made for your sweetest moments
          </p>
        </div>

        <Link
          to="/admin/login"
          className="absolute bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-accent text-white shadow-soft transition duration-300 ease-soft hover:-translate-y-0.5 hover:bg-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          aria-label="Admin login"
          title="Admin login"
        >
          <span className="text-base" role="img" aria-hidden="true">
            🍰
          </span>
        </Link>
      </div>
    </footer>
  );
}
