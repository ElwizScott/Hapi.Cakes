import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAdmin, fetchPublic } from "../../../api/http";

const SiteCopyContext = createContext({
  copy: {},
  refresh: () => {},
  updateCopy: async () => {},
});

export function SiteCopyProvider({ children }) {
  const [copy, setCopy] = useState({});

  const loadCopy = async () => {
    const response = await fetchPublic("/api/public/site-copy");
    if (!response.ok) return;
    const data = await response.json();
    setCopy(data ?? {});
  };

  useEffect(() => {
    loadCopy();
  }, []);

  const updateCopy = async (key, value) => {
    const response = await fetchAdmin("/api/admin/site-copy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (!response.ok) {
      throw new Error("Unable to update copy.");
    }
    const data = await response.json();
    setCopy((prev) => ({ ...prev, [data.key]: data.value }));
  };

  const value = useMemo(
    () => ({
      copy,
      refresh: loadCopy,
      updateCopy,
    }),
    [copy],
  );

  return (
    <SiteCopyContext.Provider value={value}>
      {children}
    </SiteCopyContext.Provider>
  );
}

export function useSiteCopy() {
  return useContext(SiteCopyContext);
}
