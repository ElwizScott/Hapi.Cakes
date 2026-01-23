import { NavLink } from "react-router-dom";

const linkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

const activeClass = "bg-[#B895C2] text-white";
const inactiveClass =
  "text-gray-700 hover:bg-[#B895C2]/15 hover:text-[#B895C2]";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="font-script text-xl text-plum">
            Hapi.Cakes
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full ${
                  isActive
                    ? "bg-[#B895C2] text-white"
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
          </div>
        </div>
      </div>
    </nav>
  );
}
