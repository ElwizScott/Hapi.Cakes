import { useNavigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function Dashboard() {
  const navigate = useNavigate();
  const { email } = useAdminAuth();

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Signed in as {email || "admin"}.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-brandPink px-4 py-2 text-sm font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
        >
          Log out
        </button>
      </div>
      <p className="text-sm text-slate-500">
        Admin analytics and controls will live here.
      </p>
    </div>
  );
}
