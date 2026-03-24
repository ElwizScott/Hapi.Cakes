import { useState } from "react";
import { fetchAdmin } from "../../../api/http";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetchAdmin("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError(payload?.message || "Unable to update password.");
        return;
      }

      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Unable to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-lavender/50 bg-white/80 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink font-serif">
          Account & Password
        </h1>
        <p className="mt-2 text-sm text-muted">
          Update your admin password to keep your account secure.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-lavender/50 bg-white p-6 shadow-sm space-y-5"
      >
        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="text-sm font-semibold text-ink">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-ink">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-ink">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-brandPink px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brandPink/90 disabled:opacity-70"
        >
          {saving ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
