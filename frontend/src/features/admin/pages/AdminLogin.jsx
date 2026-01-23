import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || "Login failed. Check your credentials.");
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Unable to reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-softBg px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(200,141,191,0.45)] p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold font-serif text-plum">
            Admin Login
          </h1>
          <p className="text-sm text-muted mt-2">
            Secure access for bakery management
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@hapicakes.com"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg focus:outline-none focus:ring-2 focus:ring-brandPink/40"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg focus:outline-none focus:ring-2 focus:ring-brandPink/40"
            />
          </div>
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 font-semibold rounded-xl bg-brandPink text-white py-2 text-sm font-medium transition hover:bg-plum disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-muted">
          This area is reserved for store owners only.
        </div>
      </div>
    </div>
  );
}
