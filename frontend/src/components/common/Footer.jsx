import { useState } from "react";
import { Link } from "react-router-dom";
import EditableText from "./EditableText";
import PrimaryButton from "./PrimaryButton";
import PillBadge from "./PillBadge";
import SurfaceCard from "./SurfaceCard";
import { bodyClass, buttonGhostClass, cx, fieldClass } from "./designSystem";

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
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61568773922797",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@hapi.cakes_bymichelle",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M15.5 3h2.2c.3 2.1 1.8 3.8 3.8 4.3v2.3c-1.8-.1-3.4-.7-4.7-1.8v6.6a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v2.4a3.4 3.4 0 1 0 2.4 3.3V3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@hapi.cakes_bymichelle",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 3c5 0 8.8 2.9 9 8.3v.7c0 4.9-3.2 8-7.9 8-2.7 0-4.8-1.2-5.7-3.2l2.2-.9c.5 1.3 1.9 2.1 3.6 2.1 3 0 4.9-1.8 4.9-4.8v-.3c-1-.9-2.6-1.4-4.4-1.4-2.5 0-4.2 1-4.2 2.6 0 1.2 1 2 2.6 2 .7 0 1.4-.2 2-.5l.7 2.1c-.8.4-1.8.6-2.8.6-2.7 0-4.7-1.5-4.7-4.1 0-2.9 2.5-4.7 6.4-4.7 1.6 0 3.2.3 4.5.9-.6-3.1-3.2-4.8-6.5-4.8-3.9 0-6.5 2.4-6.5 6.8 0 4.4 2.6 6.9 6.8 6.9 1.6 0 3-.4 4.1-1.3l1.3 1.9c-1.4 1.1-3.2 1.7-5.4 1.7C6.1 20 3 16.7 3 11.9 3 6.3 6.8 3 12 3Z"
          fill="currentColor"
        />
      </svg>
    ),
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
      {/* Ambient blobs — kept subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-brandPink/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-lavender/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-20 w-20 rounded-full bg-accent-soft/70 blur-2xl" />
      </div>

      <div className="relative ds-page-shell py-7 sm:py-9">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_0.85fr]">
          {/* ── Left card: brand + links + socials ── */}
          <SurfaceCard className="overflow-hidden border-white/75 bg-white/72 p-4 backdrop-blur sm:p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_1fr]">
              {/* Brand blurb */}
              <div className="space-y-3">
                <div>
                  <p className="font-script text-3xl leading-none text-plum">
                    <EditableText
                      copyKey="footer.brand"
                      defaultText="Hapi.Cakes"
                    />
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-plum/60">
                    Get a taste of happiness
                  </p>

                </div>

                <p
                  className={cx(bodyClass, "max-w-sm text-xs leading-relaxed")}
                >
                  <EditableText
                    copyKey="footer.description"
                    defaultText="Handcrafted cakes for celebrations, delivered with care and a dash of sweetness."
                    multiline
                  />
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <PillBadge className="border-white/75 bg-white/82 px-2.5 py-1 text-[0.58rem] tracking-[0.16em] shadow-soft">
                    Cozy aesthetic
                  </PillBadge>
                  <PillBadge className="border-white/75 bg-white/82 px-2.5 py-1 text-[0.58rem] tracking-[0.16em] shadow-soft">
                    Made for celebrations
                  </PillBadge>
                </div>
              </div>

              {/* Links + socials */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    <EditableText
                      copyKey="footer.quick_links"
                      defaultText="Quick Links"
                    />
                  </p>
                  <ul className="mt-2.5 space-y-1.5 text-xs">
                    {quickLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={cx(
                            buttonGhostClass,
                            "inline-flex px-0 py-0.5 text-xs font-medium text-text-secondary hover:bg-transparent hover:text-plum",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    <EditableText
                      copyKey="footer.follow_us"
                      defaultText="Follow Us"
                    />
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {socialLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-2 rounded-[1rem] border border-transparent bg-white/36 px-2.5 py-1.5 transition duration-300 ease-soft hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/72 hover:shadow-soft"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft/75 text-xs text-plum transition duration-300 ease-soft group-hover:bg-white">
                            {link.icon}
                          </span>
                          <span className="text-xs font-semibold text-text-primary">
                            {link.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SurfaceCard>

          {/* ── Right card: newsletter ── */}
          <SurfaceCard className="overflow-hidden border-white/75 bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(250,241,249,0.94))] p-4 sm:p-5">
            <div className="space-y-3.5">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                  Sweet Updates
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold tracking-tight text-text-primary">
                  Join the Hapi.Cakes circle
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-text-secondary">
                  First to see seasonal styles, boutique celebration ideas, and
                  pastel bakery inspiration.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="rounded-[1.2rem] border border-white/75 bg-white/76 p-1.5 shadow-soft">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (newsletterState !== "idle")
                        setNewsletterState("idle");
                    }}
                    className={cx(
                      fieldClass,
                      "border-transparent bg-transparent px-3 py-1.5 text-xs shadow-none focus:border-border-soft",
                    )}
                    placeholder="Your email for sweet news"
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full px-4 py-2 text-[0.65rem] uppercase tracking-[0.18em]"
                >
                  Join the newsletter
                </PrimaryButton>

                {newsletterState === "error" && (
                  <p className="text-xs text-danger">
                    Please add a valid email to continue.
                  </p>
                )}
                {newsletterState === "success" && (
                  <p className="text-xs text-success">
                    You're on the list — sweet inspiration incoming!
                  </p>
                )}
              </form>
            </div>
          </SurfaceCard>
        </div>

        {/* ── Legal bar ── */}
        <div className="relative mt-5 flex flex-col items-center gap-2 border-t border-border-soft/80 pt-4 text-center text-[0.68rem] text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <p>© {new Date().getFullYear()} Hapi.Cakes. All rights reserved.</p>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-plum/80 shadow-soft transition duration-300 ease-soft hover:-translate-y-0.5 hover:bg-white hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              aria-label="Admin login"
              title="Admin login"
            >
              <span className="text-[0.7rem]" role="img" aria-hidden="true">
                🍰
              </span>
              Admin
            </Link>
          </div>
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-plum/60">
            Softly made for your sweetest moments
          </p>
        </div>
      </div>
    </footer>
  );
}
