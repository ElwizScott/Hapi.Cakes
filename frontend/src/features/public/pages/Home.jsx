import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../../components/home/HeroSection";
import CategorySection from "../../../components/home/CategorySection";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import { fetchPublic } from "../../../api/http";
import { fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";

export default function Home() {
  const { authenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState({
    featured: "",
    wedding: "",
    birthday: "",
    event: "",
  });
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isActive = true;
    fetchPublic("/api/public/homepage-images")
      .then((response) => (response.ok ? response.json() : {}))
      .then((data) => {
        if (!isActive) return;
        setImages((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        if (!isActive) return;
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchCakes()
      .then((data) => {
        if (!active) return;
        setCakes(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    fetchCategories()
      .then((data) => {
        if (!active) return;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const categoriesWithImages = useMemo(() => {
    if (!categories.length) return [];
    return categories.slice(0, 3).map((category) => {
      const firstCake = cakes.find(
        (cake) => String(cake.categoryId) === String(category.id),
      );
      return {
        ...category,
        imageUrl: firstCake?.imageUrls?.[0] ?? "",
      };
    });
  }, [categories, cakes]);

  const categoryById = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => map.set(String(category.id), category));
    return map;
  }, [categories]);

  const featuredCakes = useMemo(() => {
    return cakes.filter((cake) => cake.imageUrls?.[0]).slice(0, 2);
  }, [cakes]);

  const handleFeaturedUpdate = (url) => {
    setImages((prev) => ({ ...prev, featured: url }));
  };

  const handleCategoryUpdate = (type, url) => {
    setImages((prev) => ({ ...prev, [type]: url }));
  };
  return (
    <div className="bg-softBg min-h-screen text-ink">
      <HeroSection
        featuredImageUrl={images.featured}
        isAdmin={authenticated}
        onFeaturedImageUploaded={handleFeaturedUpdate}
        onOrderClick={() => navigate("/order")}
        onGalleryClick={() => {
          document.getElementById("special-events")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        onContactClick={() => navigate("/contact")}
      />
      {featuredCakes.length ? (
        <section className="mx-auto max-w-7xl px-8 pb-8 font-serif">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-ink font-serif">
              Featured Today
            </h2>
            <button
              type="button"
              onClick={() => navigate("/gallery")}
              className="text-sm font-semibold text-plum underline-offset-4 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredCakes.map((cake) => {
              const category = categoryById.get(String(cake.categoryId));
              return (
                <button
                  key={cake.id}
                  type="button"
                  onClick={() =>
                    navigate(`/cakes/${cake.id}`, {
                      state: {
                        cake,
                        categoryName: category?.name ?? "",
                        scrollY: window.scrollY,
                      },
                    })
                  }
                  className="group text-left rounded-3xl border border-lavender/40 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(200,141,191,0.25)]"
                >
                  <div className="h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-lavender/20">
                    <img
                      src={cake.imageUrls[0]}
                      alt={cake.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3 font-serif">
                    <h3 className="text-lg font-semibold text-ink font-serif">
                      {cake.name}
                    </h3>
                    {category?.name ? (
                      <p className="text-xs text-muted mt-1 font-serif">
                        {category.name}
                      </p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <CategorySection categories={categoriesWithImages} />

      <section className="mx-auto max-w-7xl px-8 pb-16 font-serif">
        <div className="rounded-3xl border border-lavender/40 bg-white p-6 text-center shadow-sm">
          <h3 className="text-2xl font-semibold text-ink font-serif">
            Custom cake in mind?
          </h3>
          <p className="mt-2 text-sm text-muted font-serif">
            Tell us your idea and we’ll bring it to life.
          </p>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="mt-4 rounded-full border-2 border-brandPink px-6 py-2 text-sm font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
