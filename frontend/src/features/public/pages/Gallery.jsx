import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import Loader from "../../../components/common/Loader";
import Modal from "../../../components/common/Modal";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import EditableText from "../../../components/common/EditableText";
import { formatVND } from "../../../utils/formatPrice";

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
  const [socialSlideIndex, setSocialSlideIndex] = useState({});
  const [masonrySpans, setMasonrySpans] = useState({});
  const [socialAspectRatios, setSocialAspectRatios] = useState({});

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
  const masonryRowHeight = 8;
  const masonryGap = 16;
  const masonryRowUnit = masonryRowHeight + masonryGap;

  const getSlideIndex = (cakeId, max) => {
    const current = socialSlideIndex[cakeId] ?? 0;
    if (!max) return 0;
    return Math.min(Math.max(current, 0), max - 1);
  };

  const updateSlide = (cakeId, nextIndex, max) => {
    setSocialSlideIndex((prev) => ({
      ...prev,
      [cakeId]: Math.min(Math.max(nextIndex, 0), max - 1),
    }));
  };

  return (
    <section
      className={`px-4 py-6 space-y-6 transition-all duration-500 ease-out sm:px-6 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      }`}
    >
      <header className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-brandPink/20 blur-2xl" />
            <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-lavender/30 blur-xl" />
          </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,213,233,0.6),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(225,203,235,0.5),transparent_45%)]" />
        <div className="pointer-events-none absolute right-10 top-8 text-[10px] text-plum/40">
          ✧ ✦ ✧
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
              <EditableText
                copyKey={isSocial ? "gallery.social.label" : "gallery.elegant.label"}
                defaultText={isSocial ? "Social Feed" : "Curated Collection"}
              />
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink font-serif">
              <EditableText
                copyKey={isSocial ? "gallery.social.title" : "gallery.elegant.title"}
                defaultText={isSocial ? "Instagram Gallery" : "Elegant Gallery"}
              />
            </h1>
            <p className="mt-2 text-sm text-muted">
              <EditableText
                copyKey={
                  isSocial
                    ? "gallery.social.subtitle"
                    : "gallery.elegant.subtitle"
                }
                defaultText={
                  isSocial
                    ? "A curated social feed of our latest creations."
                    : "Discover our signature cakes and seasonal favorites."
                }
                multiline
              />
            </p>
          </div>
          <div className="rounded-full border border-lavender/60 bg-white px-3 py-1 text-xs font-semibold text-plum">
            {filteredCakes.length} cakes
          </div>
        </div>
      </header>

      {!isSocial ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/gallery?category=${category.slug}`}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                category.slug === categoryParam
                  ? "border-brandPink bg-brandPink/10 text-brandPink"
                  : "border-lavender bg-white text-muted hover:border-brandPink hover:text-brandPink"
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
        <div className="grid grid-cols-2 auto-rows-[8px] gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredCakes.map((cake, index) => {
            const images = cake.imageUrls ?? [];
            const count = images.length;
            const current = getSlideIndex(cake.id, count);
            const currentImage = images[current] ?? images[0];
            const masonryKey = cake.id ?? `${cake.name}-${index}`;
            const span = masonrySpans[masonryKey] ?? 24;
            const aspectRatio = socialAspectRatios[masonryKey];

            return (
              <button
                key={masonryKey}
                type="button"
                onClick={() =>
                  navigate(`/cakes/${cake.id}`, {
                    state: {
                      cake,
                      scrollY: window.scrollY,
                    },
                  })
                }
                style={{ gridRowEnd: `span ${span}` }}
                className="group relative w-full overflow-hidden rounded-3xl bg-white/80 shadow-[0_16px_34px_rgba(200,141,191,0.2)] transition-transform hover:scale-[1.02] hover:shadow-[0_24px_45px_rgba(200,141,191,0.28)]"
              >
                {currentImage ? (
                  <div
                    className="w-full"
                    style={aspectRatio ? { aspectRatio } : undefined}
                  >
                    <img
                      src={currentImage}
                      alt={cake.name}
                      className="block h-full w-full object-cover object-center"
                      loading="lazy"
                      onLoad={(event) => {
                        if (!socialAspectRatios[masonryKey]) {
                          const { naturalWidth, naturalHeight } =
                            event.currentTarget;
                          if (naturalWidth && naturalHeight) {
                            setSocialAspectRatios((prev) => ({
                              ...prev,
                              [masonryKey]: naturalWidth / naturalHeight,
                            }));
                          }
                        }
                        const container = event.currentTarget.parentElement;
                        if (container) {
                          const height = container.getBoundingClientRect().height;
                          const nextSpan = Math.max(
                            1,
                            Math.ceil(height / masonryRowUnit),
                          );
                          setMasonrySpans((prev) =>
                            prev[masonryKey] === nextSpan
                              ? prev
                              : { ...prev, [masonryKey]: nextSpan },
                          );
                        }
                      }}
                    />
                  </div>
                ) : null}

                {count > 1 ? (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateSlide(cake.id, current - 1, count);
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
                        aria-label="Previous image"
                      >
                        <span className="text-lg leading-none">‹</span>
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateSlide(cake.id, current + 1, count);
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
                        aria-label="Next image"
                      >
                        <span className="text-lg leading-none">›</span>
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 px-2 py-1">
                      {images.map((_, idx) => (
                        <span
                          key={`${cake.id}-dot-${idx}`}
                          className={`h-1.5 w-1.5 rounded-full ${
                            idx === current ? "bg-plum" : "bg-plum/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                className={`group relative overflow-hidden rounded-[28px] border border-lavender/50 bg-gradient-to-br from-white via-white to-lavender/20 p-4 shadow-[0_18px_36px_rgba(200,141,191,0.22)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(200,141,191,0.32)] ${
                  isOther ? "scale-[0.985] opacity-90" : "scale-100"
                } ${
                  isHovered
                    ? "md:origin-left md:scale-x-[1.06] md:z-10"
                    : ""
                }`}
              >
                <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-plum shadow-sm">
                  ✦
                </div>
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
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-white/70 md:h-48 md:w-48">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brandPink/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
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
                  <div className="flex-1 font-serif">
                    <h3 className="text-lg font-semibold text-ink tracking-tight">
                      {cake.name}
                    </h3>
                    {Number.isFinite(cake.price) ? (
                      <p className="mt-1 text-sm font-semibold text-plum">
                        {formatVND(cake.price)}
                      </p>
                    ) : null}
                    <p className="text-sm text-muted mt-2 line-clamp-3 font-sans">
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
            {Number.isFinite(selectedCake.price) ? (
              <p className="text-sm font-semibold text-plum">
                {formatVND(selectedCake.price)}
              </p>
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
