import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdmin, handleUnauthorized } from "../../../api/http";
import useAdminAuth from "../hooks/useAdminAuth";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { loading, authenticated, setSession, clearSession, setLoading } =
    useAdminAuth();

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchAdmin("/api/admin/me", { method: "GET" }, { skipAuthRedirect: true })
      .then(async (response) => {
        if (!active) return;
        if (!response.ok) {
          clearSession();
          await handleUnauthorized();
          navigate("/admin/login", { replace: true });
          return;
        }
        const data = await response.json().catch(() => ({}));
        setSession({ email: data.email });
      })
      .catch(async () => {
        if (!active) return;
        clearSession();
        await handleUnauthorized();
        navigate("/admin/login", { replace: true });
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [clearSession, navigate, setLoading, setSession]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        Checking admin session...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
