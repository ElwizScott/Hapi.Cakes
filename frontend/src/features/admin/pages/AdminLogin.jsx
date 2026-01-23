export default function AdminLogin() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-softBg px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(200,141,191,0.45)] p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold font-serif text-plum">Admin Login</h1>
        <p className="text-sm text-muted mt-2">
            Secure access for bakery management
        </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@hapicakes.com"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg focus:outline-none focus:ring-2 focus:ring-brandPink/40"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg focus:outline-none focus:ring-2 focus:ring-brandPink/40"
            />
          </div>
          {/* Footer note */}
          <div className="mt-6 text-center text-xs text-muted">
            This area is reserved for store owners only.
          </div>
          {/* Button */}
          <button className="w-full mt-6 font-semibold rounded-xl bg-brandPink text-white py-2 text-sm font-medium hover:bg-plum transition">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
