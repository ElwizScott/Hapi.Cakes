import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Order", to: "/order" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/hapi.cakes_bymichelle/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568773922797" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-lavender bg-white">
      <div className="relative max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-script text-2xl text-plum">Hapi.Cakes</p>
            <p className="text-sm font-serif text-muted">
              Handcrafted cakes for celebrations, delivered with care and a dash
              of sweetness.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Quick Links</p>
            <ul className="mt-3 font-serif space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted hover:text-brandPink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Follow Us</p>
            <ul className="mt-3 font-serif space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-brandPink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-lavender pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Hapi.Cakes. All rights reserved.
        </div>

        <Link
          to="/admin/login"
          className="absolute bottom-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brandPink text-white shadow-lg transition hover:bg-brandPink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPink/40"
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
