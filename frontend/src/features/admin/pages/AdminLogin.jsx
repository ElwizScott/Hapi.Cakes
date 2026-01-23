export default function AdminLogin() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(200,141,191,0.45)] p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-brand-plum">
            Admin Login
          </h1>
          <p className="text-sm text-muted mt-2">
            Secure access for bakery management
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@hapicakes.com"
              disabled
              className="w-full rounded-xl border border-brand-lavender px-4 py-2 text-sm text-ink bg-surface focus:outline-none focus:ring-2 focus:ring-brand-pink/40"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              disabled
              className="w-full rounded-xl border border-brand-lavender px-4 py-2 text-sm text-ink bg-surface focus:outline-none focus:ring-2 focus:ring-brand-pink/40"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            disabled
            className="w-full mt-4 rounded-full bg-brand-pink text-white py-2 text-sm font-medium opacity-70 cursor-not-allowed"
          >
            Login (Coming Soon)
          </button>
        </form>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-muted">
          This area is reserved for store owners only.
        </div>
      </div>
    </div>
  );
}
