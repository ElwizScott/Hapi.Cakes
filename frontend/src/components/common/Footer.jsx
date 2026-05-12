import { Link } from "react-router-dom";
import EditableText from "./EditableText";
import { bodyClass, cx } from "./designSystem";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Order", to: "/order" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/hapi.cakes_bymichelle/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568773922797" },
  { label: "Tiktok", href: "https://www.tiktok.com/@hapi.cakes_bymichelle" },
  { label: "Threads", href: "https://www.threads.com/@hapi.cakes_bymichelle"}
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface/95 backdrop-blur">
      <div className="relative ds-page-shell py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-script text-2xl text-plum">
              <EditableText
                copyKey="footer.brand"
                defaultText="Hapi.Cakes"
              />
            </p>
            <p className={cx(bodyClass, "text-sm")}>
              <EditableText
                copyKey="footer.description"
                defaultText="Handcrafted cakes for celebrations, delivered with care and a dash of sweetness."
                multiline
              />
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:col-span-2">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                <EditableText
                  copyKey="footer.quick_links"
                  defaultText="Quick Links"
                />
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-text-secondary transition hover:text-plum"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">
                <EditableText
                  copyKey="footer.follow_us"
                  defaultText="Follow Us"
                />
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-secondary transition hover:text-plum"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border-soft pt-6 text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} Hapi.Cakes. All rights reserved.
        </div>

        <Link
          to="/admin/login"
          className="absolute bottom-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-pill bg-accent text-white shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:bg-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          aria-label="Admin login"
          title="Admin login"
        >
          <span className="text-l" role="img" aria-hidden="true">
            🍰
          </span>
        </Link>
      </div>
    </footer>
  );
}
