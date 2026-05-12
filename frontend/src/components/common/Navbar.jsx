import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";
import { fetchPublic } from "../../api/http";
import logo from "../../assets/logo.jpg";
import { cx } from "./designSystem";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const linkClass =
  "rounded-pill px-4 py-2 text-sm font-medium text-text-secondary transition duration-200 ease-soft hover:bg-accent-soft hover:text-plum";

const activeClass = "bg-accent-soft text-plum";
const inactiveClass = "text-text-secondary hover:text-plum";

export default function Navbar() {
  const navigate = useNavigate();
  const { authenticated, clearSession } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 border-b border-border-soft bg-surface/90 backdrop-blur">
      <div className="ds-page-shell">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-plum">
            <img
              src={logo}
              alt="Hapi.Cakes"
              className="h-10 w-auto rounded-full border border-border-soft/70 object-cover shadow-soft"
            />
            <span className="font-script text-2xl">Hapi.Cakes</span>
          </NavLink>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cx("rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft", isActive
                  ? activeClass
                  : "text-text-secondary hover:bg-accent-soft hover:text-plum")
              }
            >
              Home
            </NavLink>

            {authenticated ? (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  cx(linkClass, isActive ? activeClass : inactiveClass)
                }
              >
                Dashboard
              </NavLink>
            ) : null}

            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                cx(linkClass, isActive ? activeClass : inactiveClass)
              }
            >
              Elegant Gallery
            </NavLink>

            <NavLink
              to="/gallery-social"
              className={({ isActive }) =>
                cx(linkClass, isActive ? activeClass : inactiveClass)
              }
            >
              Social Gallery
            </NavLink>

            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                cx(linkClass, isActive ? activeClass : inactiveClass)
              }
            >
              Feedback
            </NavLink>

            <NavLink
              to="/order"
              className={({ isActive }) =>
                cx(linkClass, isActive ? activeClass : inactiveClass)
              }
            >
              Order
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cx(linkClass, isActive ? activeClass : inactiveClass)
              }
            >
              Contact
            </NavLink>

            {authenticated ? (
              <SecondaryButton
                onClick={handleLogout}
                className="ml-2 px-4 py-2 text-xs"
              >
                Log out
              </SecondaryButton>
            ) : null}
          </div>

          <PrimaryButton
            className="px-3 py-2 text-xs md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Close" : "Menu"}
          </PrimaryButton>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden border-t border-border-soft bg-surface ${isOpen ? "block" : "hidden"}`}
      >
        <div className="ds-page-shell space-y-1 py-3">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Home
          </NavLink>

          {authenticated ? (
            <NavLink
              to="/admin/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                cx(
                  "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                  isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
                )
              }
            >
              Dashboard
            </NavLink>
          ) : null}

          <NavLink
            to="/gallery"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Elegant Gallery
          </NavLink>

          <NavLink
            to="/gallery-social"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Social Gallery
          </NavLink>

          <NavLink
            to="/feedback"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Feedback
          </NavLink>

          <NavLink
            to="/order"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Order
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              cx(
                "block rounded-pill px-4 py-2 text-sm font-medium transition duration-200 ease-soft",
                isActive ? activeClass : "text-text-secondary hover:bg-accent-soft hover:text-plum",
              )
            }
          >
            Contact
          </NavLink>

          {authenticated ? (
            <SecondaryButton
              onClick={handleLogout}
              className="mt-2 w-full"
            >
              Log out
            </SecondaryButton>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
