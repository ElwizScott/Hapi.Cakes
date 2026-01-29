import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [state, setState] = useState({
    loading: false,
    authenticated: false,
    email: "",
  });

  const setSession = useCallback(({ email }) => {
    setState({ loading: false, authenticated: true, email: email ?? "" });
  }, []);

  const clearSession = useCallback(() => {
    setState({ loading: false, authenticated: false, email: "" });
  }, []);

  const setLoading = useCallback((loading) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setSession,
      clearSession,
      setLoading,
    }),
    [state, setSession, clearSession, setLoading],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuthContext() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
