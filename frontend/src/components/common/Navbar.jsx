import { NavLink, useNavigate } from "react-router-dom";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const linkClass =
  "px-3 py-2 rounded-md text-sm font-medium font-script transition-colors";

const activeClass = "text-[#B895C2]";
const inactiveClass = "text-gray-700 hover:text-[#B895C2]";

export default function Navbar() {
  const navigate = useNavigate();
  const { authenticated } = useAdminAuth();

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/admin/login", { replace: true });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="font-script text-2xl text-plum">
            Hapi.Cakes
          </NavLink>

          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </nav>
  );
}
