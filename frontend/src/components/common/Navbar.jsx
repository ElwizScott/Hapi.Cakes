import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";
import { fetchPublic } from "../../api/http";
import logo from "../../assets/logo.jpg";

const linkClass =
  "px-3 py-2 rounded-md text-sm font-medium font-script transition-colors";

const activeClass = "text-[#B895C2]";
const inactiveClass = "text-gray-700 hover:text-[#B895C2]";

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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-script text-2xl text-plum">
            <img
              src={logo}
              alt="Hapi.Cakes"
              className="h-10 w-auto"
            />
            <span> Hapi.Cakes</span>
          </NavLink>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-script ${
                  isActive
                    ? "text-[#B895C2]"
                    : "text-slate-700 hover:text-[#B895C2]"
                }`
              }
            >
              Home
            </NavLink>

            {authenticated ? (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Dashboard
              </NavLink>
            ) : null}

            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Elegant Gallery
            </NavLink>

            <NavLink
              to="/gallery-social"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Social Gallery
            </NavLink>

            <NavLink
              to="/order"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Order
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Contact
            </NavLink>

            {authenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 rounded-full border border-brandPink px-4 py-1.5 text-xs font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
              >
                Log out
              </button>
            ) : null}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-brandPink px-3 py-2 text-xs font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden border-t border-gray-200 bg-white ${isOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-3 space-y-1">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block rounded-full px-4 py-2 font-script text-base ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Home
          </NavLink>

          {authenticated ? (
            <NavLink
              to="/admin/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-full px-4 py-2 font-script text-base ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              Dashboard
            </NavLink>
          ) : null}

          <NavLink
            to="/gallery"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block rounded-full px-4 py-2 font-script text-base ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Elegant Gallery
          </NavLink>

          <NavLink
            to="/gallery-social"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block rounded-full px-4 py-2 font-script text-base ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Social Gallery
          </NavLink>

          <NavLink
            to="/order"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block rounded-full px-4 py-2 font-script text-base ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Order
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block rounded-full px-4 py-2 font-script text-base ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Contact
          </NavLink>

          {authenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 w-full rounded-full border border-brandPink px-4 py-2 text-sm font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
            >
              Log out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
