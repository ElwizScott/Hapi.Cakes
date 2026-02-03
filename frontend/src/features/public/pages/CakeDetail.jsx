import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCakeFeedbackImages, fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import { fetchAdmin } from "../../../api/http";
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
  const [savingImages, setSavingImages] = useState(false);
  const [imageError, setImageError] = useState("");
  const imageInputRef = useRef(null);

  const images = useMemo(() => cake?.imageUrls ?? [], [cake]);
  const showPrev = images.length > 1;

  useEffect(() => {
    if (!cakeId || cake) return;
    let active = true;
    setLoading(true);
    setError("");

    const loadFromPublic = () =>
      Promise.all([fetchCakes(), fetchCategories()]);

    const loadFromAdmin = async () => {
      const [cakesResponse, categoriesResponse] = await Promise.all([
        fetchAdmin("/api/admin/cakes"),
        fetchAdmin("/api/admin/categories"),
      ]);
      if (!cakesResponse.ok || !categoriesResponse.ok) {
        throw new Error("Unable to load admin data.");
      }
      const cakes = await cakesResponse.json();
      const categories = await categoriesResponse.json();
      return [cakes, categories];
    };

    const loader = authenticated ? loadFromAdmin : loadFromPublic;

    loader()
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
  }, [cakeId, cake, authenticated]);

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchAdmin("/api/admin/upload/cake", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const persistCakeImages = async (nextImages) => {
    const payload = {
      name: cake?.name ?? "",
      description: cake?.description ?? "",
      price: cake?.price ?? null,
      categoryId: cake?.categoryId ?? "",
      imageUrls: nextImages,
      feedbackImages: cake?.feedbackImages ?? [],
      featured: cake?.featured ?? false,
    };

    const response = await fetchAdmin(`/api/admin/cakes/${cake?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to save cake images.");
    }
  };

  const handleAddImages = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length || !cake?.id) return;
    setSavingImages(true);
    setImageError("");
    try {
      const uploadedUrls = [];
      for (const file of files) {
        uploadedUrls.push(await uploadImage(file));
      }
      const nextImages = [...(cake.imageUrls ?? []), ...uploadedUrls];
      await persistCakeImages(nextImages);
      setCake((prev) =>
        prev ? { ...prev, imageUrls: nextImages } : prev,
      );
      if (!images.length && uploadedUrls.length) {
        setActiveIndex(0);
      }
    } catch (err) {
      setImageError("Image upload failed.");
    } finally {
      setSavingImages(false);
      event.target.value = "";
    }
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
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-ink shadow ring-1 ring-black/10 transition hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-ink shadow ring-1 ring-black/10 transition hover:bg-white"
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
                onClick={() => imageInputRef.current?.click()}
                className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink disabled:opacity-60"
                disabled={savingImages}
              >
                {savingImages ? "Uploading..." : "Add Image"}
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddImages}
              />
              {imageError ? (
                <span className="text-xs text-rose-500">{imageError}</span>
              ) : null}
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
