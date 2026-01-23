import { useCallback, useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function useAdminAuth() {
  const [state, setState] = useState({
    loading: true,
    authenticated: false,
    email: "",
  });

  const checkAdminAuth = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      // Uses httpOnly cookie; no token stored or read in JS.
      const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setState({ loading: false, authenticated: false, email: "" });
        return { authenticated: false };
      }

      const data = await response.json().catch(() => ({}));
      setState({
        loading: false,
        authenticated: true,
        email: data.email ?? "",
      });

      return { authenticated: true };
    } catch (error) {
      setState({ loading: false, authenticated: false, email: "" });
      return { authenticated: false };
    }
  }, []);

  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth]);

  return {
    loading: state.loading,
    authenticated: state.authenticated,
    email: state.email,
    checkAdminAuth,
  };
}
