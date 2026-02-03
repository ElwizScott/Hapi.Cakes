import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCakeFeedbackImages, fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import Loader from "../../../components/common/Loader";

export default function CakeDetail() {
  const { cakeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticated } = useAdminAuth();

  const [cake, setCake] = useState(() => location.state?.cake ?? null);
  const [categoryName, setCategoryName] = useState(
    () => location.state?.categoryName ?? "",
  );
  const [loading, setLoading] = useState(!location.state?.cake);
  const [error, setError] = useState("");
  const [feedbackImages, setFeedbackImages] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => cake?.imageUrls ?? [], [cake]);
  const showPrev = images.length > 1;

  useEffect(() => {
    if (!cakeId || cake) return;
    let active = true;
    setLoading(true);
    setError("");

    Promise.all([fetchCakes(), fetchCategories()])
      .then(([cakes, categories]) => {
        if (!active) return;
        const found = cakes.find((item) => String(item.id) === String(cakeId));
        if (!found) {
          setError("Cake not found.");
          setLoading(false);
          return;
        }
        setCake(found);
        const category = categories.find(
          (item) => String(item.id) === String(found.categoryId),
        );
        setCategoryName(category?.name ?? "");
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Unable to load this cake.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [cakeId, cake]);

  useEffect(() => {
    let active = true;
    if (!cake?.id) {
      setFeedbackImages([]);
      return;
    }
    setLoadingFeedback(true);
    fetchCakeFeedbackImages(cake.id)
      .then((data) => {
        if (!active) return;
        setFeedbackImages(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!active) return;
        setFeedbackImages([]);
      })
      .finally(() => {
        if (!active) return;
        setLoadingFeedback(false);
      });
    return () => {
      active = false;
    };
  }, [cake?.id]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  if (loading) {
    return <Loader label="Loading cake..." />;
  }

  if (error || !cake) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-sm text-rose-500 shadow">
        {error || "Cake not found."}
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-lavender bg-white px-4 py-2 text-xs font-semibold text-plum shadow-sm transition hover:border-brandPink hover:text-brandPink"
        >
          ← Back to gallery
        </button>
        <span className="text-xs text-muted">{categoryName}</span>
      </div>

      <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(83,55,99,0.2)] md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="relative h-72 overflow-hidden rounded-2xl bg-softBg md:h-[520px]">
            {images[activeIndex] ? (
              <img
                src={images[activeIndex]}
                alt={cake.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                No image available
              </div>
            )}
            {showPrev ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow"
                >
                  ›
                </button>
              </>
            ) : null}
          </div>

          {authenticated ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink"
              >
                Add Image
              </button>
              <button
                type="button"
                className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink"
              >
                Remove Image
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-ink">{cake.name}</h2>
              {authenticated ? (
                <button
                  type="button"
                  className="rounded-full bg-lavender/60 p-1 text-xs"
                  title="Edit name"
                >
                  ✎
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>{categoryName || "Uncategorized"}</span>
              {authenticated ? (
                <button
                  type="button"
                  className="rounded-full bg-lavender/60 p-1 text-xs"
                  title="Edit category"
                >
                  ✎
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">Description</h3>
              {authenticated ? (
                <button
                  type="button"
                  className="rounded-full bg-lavender/60 p-1 text-xs"
                  title="Edit description"
                >
                  ✎
                </button>
              ) : null}
            </div>
            <div className="rounded-2xl bg-softBg p-3 text-sm text-muted">
              {cake.description || "No description provided."}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Feedback</h3>
              {authenticated ? (
                <button
                  type="button"
                  className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink"
                >
                  Add Feedback Image
                </button>
              ) : null}
            </div>

            {loadingFeedback ? (
              <p className="text-xs text-muted">Loading feedback...</p>
            ) : feedbackImages.length ? (
              <div className="grid grid-cols-3 gap-2">
                {feedbackImages.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="Feedback"
                    className="h-20 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">No feedback images yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
