import { useEffect, useState } from "react";

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError(null);

    Promise.resolve(fetcher())
      .then((result) => {
        if (!isActive) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (!isActive) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, deps);

  return { data, loading, error };
}
