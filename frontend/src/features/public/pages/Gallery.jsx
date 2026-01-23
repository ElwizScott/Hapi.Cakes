import { useEffect, useState } from "react";
import { fetchCakes } from "../../../api/public/cake.api";
import CakeGrid from "../../../components/cake/CakeGrid";
import Loader from "../../../components/common/Loader";

export default function Gallery({ variant = "elegant" }) {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError("");

    fetchCakes()
      .then((data) => {
        if (!isActive) return;
        setCakes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isActive) return;
        console.error("API ERROR:", err);
        setError("Unable to load cakes right now.");
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const isSocial = variant === "social";

  return (
    <section className="px-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-800">
          {isSocial ? "Instagram Gallery" : "Elegant Gallery"}
        </h1>
        <p className="text-sm text-slate-500">
          {isSocial
            ? "A curated social feed of our latest creations."
            : "Discover our signature cakes and seasonal favorites."}
        </p>
        <p className="text-xs text-slate-400">Cakes loaded: {cakes.length}</p>
      </header>

      {loading ? (
        <Loader label="Loading cakes..." />
      ) : error ? (
        <p className="text-sm text-rose-500">{error}</p>
      ) : (
        <CakeGrid cakes={cakes} variant={variant} />
      )}
    </section>
  );
}
