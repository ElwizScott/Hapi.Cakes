import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";
import { API_BASE_URL } from "../../../api/http";
import useAppTranslation from "../../../i18n/useAppTranslation";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setSession, clearSession } = useAdminAuth();
  const { t } = useAppTranslation("auth");
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
      // Server sets an httpOnly JWT cookie. The frontend never reads or stores it.
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
        setError(data.message || t("login.errors.invalid"));
        clearSession();
        return;
      }

      setSession({ email: form.email.trim() });
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(t("login.errors.network"));
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
            {t("login.title")}
          </h1>
          <p className="text-sm text-muted mt-2">{t("login.subtitle")}</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-muted mb-1">
              {t("login.emailLabel")}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("login.emailPlaceholder")}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg focus:outline-none focus:ring-2 focus:ring-brandPink/40"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">
              {t("login.passwordLabel")}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t("login.passwordPlaceholder")}
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
            {loading ? t("login.loading") : t("login.button")}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-muted">
          {t("login.footer")}
        </div>
      </div>
    </div>
  );
}
