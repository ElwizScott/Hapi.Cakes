export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
