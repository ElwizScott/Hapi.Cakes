import { useAdminAuthContext } from "../context/AdminAuthContext";

export default function useAdminAuth() {
  const { loading, authenticated, email, setSession, clearSession, setLoading } =
    useAdminAuthContext();

  return {
    loading,
    authenticated,
    email,
    setSession,
    clearSession,
    setLoading,
  };
}
