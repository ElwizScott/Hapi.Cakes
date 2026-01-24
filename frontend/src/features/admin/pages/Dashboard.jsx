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

  const quickActions = [
    {
      title: "Manage Cakes",
      description: "Upload, edit, and remove cake photos.",
      href: "/admin/cakes",
      icon: "📸",
      enabled: true,
    },
    {
      title: "View Orders",
      description: "Review today’s requests and order notes.",
      href: "/admin/orders",
      icon: "📦",
      enabled: true,
    },
    {
      title: "Customer Messages",
      description: "See inquiries and special requests.",
      href: "#",
      icon: "✉️",
      enabled: false,
    },
    {
      title: "Settings",
      description: "Profile details and password updates.",
      href: "#",
      icon: "⚙️",
      enabled: false,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Welcome back</p>
          <h1 className="text-3xl font-semibold text-ink">Owner Dashboard</h1>
          <p className="text-sm text-muted mt-2">
            Signed in as {email || "admin"}.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-brandPink px-4 py-2 text-sm font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
        >
          Log out
        </button>
      </header>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-plum">Quick actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className={`rounded-3xl border border-lavender bg-white p-5 transition shadow-sm ${
                action.enabled
                  ? "hover:border-brandPink hover:shadow-[0_12px_30px_rgba(200,141,191,0.2)]"
                  : "opacity-60 cursor-not-allowed"
              }`}
              aria-disabled={!action.enabled}
              onClick={(event) => {
                if (!action.enabled) event.preventDefault();
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender text-2xl">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {action.description}
                  </p>
                  {!action.enabled ? (
                    <p className="text-xs text-brandPink mt-2">Coming soon</p>
                  ) : null}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Today Overview */}
      <section className="rounded-3xl border border-lavender bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-plum">Today overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-softBg p-4">
            <p className="text-xs text-muted uppercase tracking-wide">
              Total cakes
            </p>
            <p className="text-2xl font-semibold text-ink mt-2">24</p>
          </div>
          <div className="rounded-2xl bg-softBg p-4">
            <p className="text-xs text-muted uppercase tracking-wide">
              Orders today
            </p>
            <p className="text-2xl font-semibold text-ink mt-2">5</p>
          </div>
          <div className="rounded-2xl bg-softBg p-4">
            <p className="text-xs text-muted uppercase tracking-wide">
              Orders this week
            </p>
            <p className="text-2xl font-semibold text-ink mt-2">18</p>
          </div>
        </div>
      </section>
    </div>
  );
}
