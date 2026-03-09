import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import Loader from "../../../components/common/Loader";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import GalleryCategorySection from "../components/GalleryCategorySection";

export default function ElegantGallery() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated } = useAdminAuth();
  const categoryParam = (searchParams.get("category") || "").toLowerCase();
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [visible, setVisible] = useState(false);
  const restoredScrollRef = useRef(false);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError("");

    fetchCakes(categoryParam || undefined)
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
  }, [categoryParam]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => {
        setCategoriesError("Unable to load categories right now.");
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Restore scroll position when navigating back from the detail page.
    if (restoredScrollRef.current) return;
    const scrollY = location.state?.scrollY;
    if (typeof scrollY === "number") {
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
    }
    restoredScrollRef.current = true;
  }, [location.state]);

  const visibleCategories = useMemo(() => {
    if (!categoryParam) return categories;
    return categories.filter((category) => category.slug === categoryParam);
  }, [categories, categoryParam]);

  const cakesByCategory = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => map.set(category.id, []));
    cakes.forEach((cake) => {
      if (!cake.categoryId) return;
      if (!map.has(cake.categoryId)) map.set(cake.categoryId, []);
      map.get(cake.categoryId).push(cake);
    });
    return map;
  }, [cakes, categories]);

  const handleSelectCake = (cake, category) => {
    navigate(`/cakes/${cake.id}`, {
      state: {
        cake,
        categoryName: category?.name ?? "",
        scrollY: window.scrollY,
      },
    });
  };

  return (
    <section
      className={`bg-gradient-to-b from-softBg via-softBg to-white px-4 py-10 transition-all duration-500 ease-out sm:px-6 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-white/70 p-6 text-center shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-brandPink/20 blur-2xl" />
            <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-lavender/30 blur-xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,213,233,0.6),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(225,203,235,0.5),transparent_45%)]" />
          <div className="pointer-events-none absolute right-10 top-8 text-[10px] text-plum/40">
            ✧ ✦ ✧
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
            Elegant Gallery
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink font-serif">
            Signature Cakes
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
            Explore our signature cakes by category, with interactive cards that
            expand in place.
          </p>
          {authenticated ? (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/categories")}
                className="rounded-full border border-lavender bg-white px-4 py-2 text-xs font-semibold text-plum shadow-sm transition hover:border-brandPink hover:text-brandPink"
              >
                Add Category
              </button>
            </div>
          ) : null}
        </header>

        {loading ? (
          <Loader label="Loading cakes..." />
        ) : error ? (
          <p className="text-center text-sm text-rose-500">{error}</p>
        ) : categoriesError ? (
          <p className="text-center text-sm text-rose-500">{categoriesError}</p>
        ) : visibleCategories.length === 0 ? (
          <div className="text-center text-sm text-muted space-y-2">
            <p>No categories available for this selection.</p>
            {authenticated ? (
              <button
                type="button"
                onClick={() => navigate("/admin/categories")}
                className="rounded-full border border-lavender px-4 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink"
              >
                Manage categories
              </button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((category) => (
              <GalleryCategorySection
                key={category.id}
                category={category}
                cakes={cakesByCategory.get(category.id) ?? []}
                showAdminEdit={authenticated}
                onEdit={(cake) =>
                  navigate(`/admin/cakes?edit=${cake.id ?? ""}`)
                }
                onAdd={() => navigate("/admin/cakes")}
                onSelect={handleSelectCake}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
