import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import CakeGrid from "../../../components/cake/CakeGrid";
import Loader from "../../../components/common/Loader";
import Modal from "../../../components/common/Modal";
import useAdminAuth from "../../admin/hooks/useAdminAuth";

export default function Gallery({ variant = "elegant" }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authenticated } = useAdminAuth();
  const categoryParam = (searchParams.get("category") || "").toLowerCase();
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCake, setSelectedCake] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
      .catch(() => {});
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const filteredCakes = useMemo(() => cakes, [cakes]);

  const isSocial = variant === "social";

  return (
    <section
      className={`px-6 space-y-6 transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      }`}
    >
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-800">
          {isSocial ? "Instagram Gallery" : "Elegant Gallery"}
        </h1>
        <p className="text-sm text-slate-500">
          {isSocial
            ? "A curated social feed of our latest creations."
            : "Discover our signature cakes and seasonal favorites."}
        </p>
        <p className="text-xs text-slate-400">
          Cakes loaded: {filteredCakes.length}
        </p>
      </header>

      {!isSocial ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/gallery?category=${category.slug}`}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                category.slug === categoryParam
                  ? "border-brandPink text-brandPink"
                  : "border-lavender text-muted hover:border-brandPink hover:text-brandPink"
              }`}
            >
              {category.name}
            </a>
          ))}
        </div>
      ) : null}

      {loading ? (
        <Loader label="Loading cakes..." />
      ) : error ? (
        <p className="text-sm text-rose-500">{error}</p>
      ) : isSocial ? (
        <CakeGrid cakes={filteredCakes} variant={variant} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredCakes.map((cake, index) => {
            const isHovered = hoveredIndex === index;
            const isOther = hoveredIndex !== null && hoveredIndex !== index;

            const handleClick = () => {
              if (isMobile) setSelectedCake(cake);
            };

            return (
              <div
                key={cake.id || `${cake.name}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={handleClick}
                className={`group relative overflow-hidden rounded-3xl border border-lavender bg-white p-5 transition-all duration-500 ease-out ${
                  isOther ? "scale-[0.98] opacity-90" : "scale-100"
                } ${
                  isHovered
                    ? "md:origin-left md:scale-x-[1.08] md:z-10 md:shadow-[0_18px_40px_rgba(200,141,191,0.2)]"
                    : "shadow-sm"
                }`}
              >
                {authenticated ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/admin/cakes?edit=${cake.id ?? ""}`);
                    }}
                    className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-plum opacity-0 transition group-hover:opacity-100"
                    aria-label={`Edit ${cake.name}`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                ) : null}
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="h-56 w-full overflow-hidden rounded-2xl bg-softBg md:h-48 md:w-48">
                    {cake.imageUrls?.[0] ? (
                      <img
                        src={cake.imageUrls[0]}
                        alt={cake.name}
                        className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
                          isHovered ? "md:scale-[1.04]" : "scale-100"
                        }`}
                      />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-ink">
                      {cake.name}
                    </h3>
                    <p className="text-sm text-muted mt-2">
                      {cake.description}
                    </p>
                    <div
                      className={`mt-4 flex gap-2 transition-all duration-500 ease-out ${
                        isHovered ? "md:opacity-100" : "md:opacity-0"
                      }`}
                    >
                      {cake.feedbackImages?.slice(0, 3).map((image) => (
                        <img
                          key={image}
                          src={image}
                          alt="Customer feedback"
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={Boolean(selectedCake)}
        title={selectedCake?.name ?? "Cake details"}
        onClose={() => setSelectedCake(null)}
      >
        {selectedCake ? (
          <div className="space-y-4">
            {selectedCake.imageUrls?.[0] ? (
              <img
                src={selectedCake.imageUrls[0]}
                alt={selectedCake.name}
                className="h-48 w-full rounded-2xl object-cover"
              />
            ) : null}
            <p className="text-sm text-muted">{selectedCake.description}</p>
            {selectedCake.feedbackImages?.length ? (
              <div className="flex gap-2">
                {selectedCake.feedbackImages.slice(0, 3).map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Customer feedback"
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
