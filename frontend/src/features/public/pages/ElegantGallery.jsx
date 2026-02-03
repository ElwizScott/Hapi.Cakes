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
      className={`bg-softBg px-6 py-12 transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-ink">Elegant Gallery</h1>
          <p className="text-sm text-muted">
            Explore our signature cakes by category, with interactive cards that
            expand in place.
          </p>
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
          <div className="space-y-10">
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
