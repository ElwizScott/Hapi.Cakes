import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";
import { fetchPublic } from "../../api/http";
import logo from "../../assets/logo.jpg";
import { cx } from "./designSystem";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import useAppTranslation from "../../i18n/useAppTranslation";

const linkClass =
  "group relative inline-flex min-h-11 items-center justify-center rounded-pill px-4 py-2.5 text-sm font-medium tracking-[0.02em] text-text-secondary transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-white/65 hover:text-plum";

const activeClass = "bg-accent-soft text-plum";
const inactiveClass = "text-text-secondary hover:text-plum";

function NavItem({ to, children, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cx(
          linkClass,
          className,
          isActive
            ? cx(
                activeClass,
                "shadow-[0_12px_25px_rgba(198,154,199,0.18)] ring-1 ring-white/70",
              )
            : inactiveClass,
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10">{children}</span>
          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute inset-x-5 bottom-1.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-brandPink/0 via-accent to-brandPink/0 transition-all duration-300 ease-soft",
              isActive
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100",
            )}
          />
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { authenticated, clearSession } = useAdminAuth();
  const { t } = useAppTranslation("navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetchPublic("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    clearSession();
    navigate("/", { replace: true });
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const publicLinks = [
    { to: "/", label: t("links.home") },
    { to: "/gallery", label: t("links.elegantGallery") },
    { to: "/gallery-social", label: t("links.socialGallery") },
    { to: "/feedback", label: t("links.feedback") },
    { to: "/order", label: t("links.order") },
    { to: "/contact", label: t("links.contact") },
  ];

  return (
    <nav
      className={cx(
        "sticky top-0 z-50 transition-all duration-300 ease-soft",
        isScrolled
          ? "border-b border-white/40 bg-surface/72 shadow-[0_14px_40px_rgba(110,85,117,0.12)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-surface/90 to-surface/65 backdrop-blur-md",
      )}
    >
      <div className="ds-page-shell">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4 py-3">
          <NavLink
            to="/"
            className="group flex items-center gap-3 text-plum transition-transform duration-300 ease-soft hover:translate-y-[-1px]"
          >
            <img
              src={logo}
              alt="Hapi.Cakes"
              className={cx(
                "h-11 w-11 rounded-full border object-cover transition-all duration-300 ease-soft",
                isScrolled
                  ? "border-white/70 shadow-[0_10px_24px_rgba(110,85,117,0.12)]"
                  : "border-border-soft/80 shadow-soft",
              )}
            />
            <div className="flex flex-col">
              <span className="font-script text-[2rem] leading-none">
                Hapi.Cakes
              </span>
              <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-plum/65 sm:text-[0.65rem] sm:tracking-[0.2em]">
                {t("brand.tagline")}
              </span>
            </div>
          </NavLink>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-1 rounded-pill border border-white/55 bg-white/55 p-1.5 shadow-[0_12px_26px_rgba(198,154,199,0.12)] backdrop-blur">
              {publicLinks.map((link) => (
                <NavItem key={link.to} to={link.to}>
                  {link.label}
                </NavItem>
              ))}
            </div>

            {authenticated ? (
              <NavItem to="/admin/dashboard">{t("admin.dashboard")}</NavItem>
            ) : null}

            {authenticated ? (
              <SecondaryButton
                onClick={handleLogout}
                className="ml-2 border-white/60 bg-white/70 px-4 py-2.5 text-xs uppercase tracking-[0.2em]"
              >
                {t("buttons.logout", { ns: "common" })}
              </SecondaryButton>
            ) : null}
          </div>

          <PrimaryButton
            className="min-h-11 px-4 py-2.5 text-xs uppercase tracking-[0.2em] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen
              ? t("buttons.close", { ns: "common" })
              : t("buttons.menu", { ns: "common" })}
          </PrimaryButton>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cx(
          "overflow-hidden border-t border-white/40 bg-surface/88 backdrop-blur-xl transition-all duration-300 ease-soft lg:hidden",
          isOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="ds-page-shell py-3 sm:py-4">
          <div className="rounded-[1.75rem] border border-white/55 bg-white/58 p-3 shadow-[0_18px_40px_rgba(198,154,199,0.14)] backdrop-blur">
            <div className="grid gap-2">
              {publicLinks.map((link) => (
                <NavItem
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="w-full justify-start px-4 py-3 text-sm"
                >
                  {link.label}
                </NavItem>
              ))}

              {authenticated ? (
                <NavItem
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="w-full justify-start px-4 py-3 text-sm"
                >
                  {t("admin.dashboard")}
                </NavItem>
              ) : null}
            </div>

            {authenticated ? (
              <SecondaryButton
                onClick={handleLogout}
                className="mt-3 w-full border-white/60 bg-white/72 uppercase tracking-[0.18em]"
              >
                {t("buttons.logout", { ns: "common" })}
              </SecondaryButton>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
