import { Navigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

export default function AdminRouteGuard({ children }) {
  const { loading, authenticated } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        Checking admin session...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
