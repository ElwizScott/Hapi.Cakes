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
  const [updateError, setUpdateError] = useState("");
  const [categories, setCategories] = useState([]);
  const [feedbackImages, setFeedbackImages] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [savingImages, setSavingImages] = useState(false);
  const [imageError, setImageError] = useState("");
  const [savingFeedback, setSavingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [fieldDraft, setFieldDraft] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const imageInputRef = useRef(null);
  const feedbackInputRef = useRef(null);
  const leftImageRef = useRef(null);
  const [rightMaxHeight, setRightMaxHeight] = useState(null);

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
        setCategories(categories);
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
    if (categories.length) return;
    const loadCategories = async () => {
      try {
        if (authenticated) {
          const response = await fetchAdmin("/api/admin/categories");
          if (response.ok) {
            setCategories(await response.json());
          }
          return;
        }
        setCategories(await fetchCategories());
      } catch (_) {
        // Ignore category load failures here; detail view can still render.
      }
    };
    loadCategories();
  }, [authenticated, categories.length]);

  useEffect(() => {
    let active = true;
    if (!cake?.id) {
      setFeedbackImages([]);
      return;
    }
    setFeedbackImages(cake.feedbackImages ?? []);
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

  useEffect(() => {
    if (!cake) return;
    setFieldDraft({
      name: cake.name ?? "",
      description: cake.description ?? "",
      categoryId: cake.categoryId ?? "",
    });
  }, [cake?.id]);

  useEffect(() => {
    if (!cake?.categoryId || !categories.length) return;
    const match = categories.find(
      (item) => String(item.id) === String(cake.categoryId),
    );
    if (match?.name && match.name !== categoryName) {
      setCategoryName(match.name);
    }
  }, [cake?.categoryId, categories, categoryName]);

  useEffect(() => {
    const element = leftImageRef.current;
    if (!element) return;
    const updateHeight = () =>
      setRightMaxHeight(Math.round(element.getBoundingClientRect().height));
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, [images.length, activeIndex]);

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

  const persistCakeUpdate = async ({
    name = cake?.name ?? "",
    description = cake?.description ?? "",
    price = cake?.price ?? null,
    categoryId = cake?.categoryId ?? "",
    imageUrls = cake?.imageUrls ?? [],
    feedbackImages: nextFeedbackImages = feedbackImages.length
      ? feedbackImages
      : cake?.feedbackImages ?? [],
    featured = cake?.featured ?? false,
  }) => {
    const payload = {
      name,
      description,
      price,
      categoryId,
      imageUrls,
      feedbackImages: nextFeedbackImages,
      featured,
    };

    const response = await fetchAdmin(`/api/admin/cakes/${cake?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to save cake updates.");
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
      await persistCakeUpdate({ imageUrls: nextImages });
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

  const handleDeleteImage = async () => {
    if (!authenticated || !cake?.id || !images.length) return;
    const nextImages = images.filter((_, index) => index !== activeIndex);
    setSavingImages(true);
    setImageError("");
    try {
      await persistCakeUpdate({ imageUrls: nextImages });
      setCake((prev) =>
        prev ? { ...prev, imageUrls: nextImages } : prev,
      );
      if (nextImages.length === 0) {
        setActiveIndex(0);
      } else if (activeIndex >= nextImages.length) {
        setActiveIndex(nextImages.length - 1);
      }
    } catch (err) {
      setImageError("Unable to delete image.");
    } finally {
      setSavingImages(false);
    }
  };

  const handleAddFeedbackImages = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length || !cake?.id) return;
    setSavingFeedback(true);
    setFeedbackError("");
    try {
      const uploadedUrls = [];
      for (const file of files) {
        uploadedUrls.push(await uploadImage(file));
      }
      const nextFeedback = [...feedbackImages, ...uploadedUrls];
      await persistCakeUpdate({ feedbackImages: nextFeedback });
      setFeedbackImages(nextFeedback);
    } catch (err) {
      setFeedbackError("Feedback upload failed.");
    } finally {
      setSavingFeedback(false);
      event.target.value = "";
    }
  };

  const handleDeleteFeedbackImage = async (index) => {
    if (!authenticated || !feedbackImages.length) return;
    const nextFeedback = feedbackImages.filter(
      (_, imageIndex) => imageIndex !== index,
    );
    setSavingFeedback(true);
    setFeedbackError("");
    try {
      await persistCakeUpdate({ feedbackImages: nextFeedback });
      setFeedbackImages(nextFeedback);
    } catch (err) {
      setFeedbackError("Unable to delete feedback image.");
    } finally {
      setSavingFeedback(false);
    }
  };

  const handleStartEdit = (field) => {
    if (!authenticated) return;
    setEditingField(field);
    setUpdateError("");
    setFieldDraft({
      name: cake?.name ?? "",
      description: cake?.description ?? "",
      categoryId: cake?.categoryId ?? "",
    });
  };

  const handleSaveField = async () => {
    if (!authenticated || !cake?.id) return;
    setUpdateError("");
    try {
      await persistCakeUpdate({
        name: fieldDraft.name.trim(),
        description: fieldDraft.description.trim(),
        categoryId: fieldDraft.categoryId,
      });
      setCake((prev) =>
        prev
          ? {
              ...prev,
              name: fieldDraft.name.trim(),
              description: fieldDraft.description.trim(),
              categoryId: fieldDraft.categoryId,
            }
          : prev,
      );
      const nextCategory = categories.find(
        (item) => String(item.id) === String(fieldDraft.categoryId),
      );
      setCategoryName(nextCategory?.name ?? "");
      setEditingField(null);
    } catch (err) {
      setUpdateError("Unable to update cake details.");
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setUpdateError("");
    setFieldDraft({
      name: cake?.name ?? "",
      description: cake?.description ?? "",
      categoryId: cake?.categoryId ?? "",
    });
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
          <div
            ref={leftImageRef}
            className="group relative overflow-hidden rounded-2xl bg-softBg"
          >
            {images[activeIndex] ? (
              <img
                src={images[activeIndex]}
                alt={cake.name}
                className="block w-full h-auto object-contain rounded-2xl"
              />
            ) : (
              <div className="flex h-72 items-center justify-center text-sm text-muted md:h-[420px]">
                No image available
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition group-hover:bg-black/35" />
            {showPrev ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow ring-1 ring-black/10 transition hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow ring-1 ring-black/10 transition hover:bg-white"
                >
                  ›
                </button>
              </>
            ) : null}
            {authenticated && images.length ? (
              <button
                type="button"
                onClick={handleDeleteImage}
                aria-label="Delete image"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow ring-1 ring-black/10 transition hover:bg-white"
                disabled={savingImages}
              >
                🗑
              </button>
            ) : null}
            {authenticated ? (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-plum shadow opacity-0 transition group-hover:opacity-100"
              >
                Add Image
              </button>
            ) : null}
          </div>

          {authenticated ? (
            <div className="flex flex-wrap gap-2">
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

        <div
          className="flex flex-col gap-4 overflow-y-auto pr-2"
          style={rightMaxHeight ? { maxHeight: `${rightMaxHeight}px` } : undefined}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {editingField === "name" ? (
                <input
                  value={fieldDraft.name}
                  onChange={(event) =>
                    setFieldDraft((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-lavender bg-softBg px-3 py-2 text-sm text-ink"
                />
              ) : (
                <h2 className="text-2xl font-semibold text-ink">{cake.name}</h2>
              )}
              {authenticated ? (
                <button
                  type="button"
                  onClick={() =>
                    editingField === "name"
                      ? handleSaveField()
                      : handleStartEdit("name")
                  }
                  className="rounded-full bg-lavender/60 p-1 text-xs"
                  title="Edit name"
                >
                  ✎
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              {editingField === "category" ? (
                <select
                  value={fieldDraft.categoryId}
                  onChange={(event) =>
                    setFieldDraft((prev) => ({
                      ...prev,
                      categoryId: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-lavender bg-softBg px-3 py-2 text-sm text-ink"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{categoryName || "Uncategorized"}</span>
              )}
              {authenticated ? (
                <button
                  type="button"
                  onClick={() =>
                    editingField === "category"
                      ? handleSaveField()
                      : handleStartEdit("category")
                  }
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
                  onClick={() =>
                    editingField === "description"
                      ? handleSaveField()
                      : handleStartEdit("description")
                  }
                  className="rounded-full bg-lavender/60 p-1 text-xs"
                  title="Edit description"
                >
                  ✎
                </button>
              ) : null}
            </div>
            {editingField === "description" ? (
              <textarea
                value={fieldDraft.description}
                onChange={(event) =>
                  setFieldDraft((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-lavender bg-softBg p-3 text-sm text-ink"
                rows={3}
              />
            ) : (
              <div className="rounded-2xl bg-softBg p-3 text-sm text-muted">
                {cake.description || "No description provided."}
              </div>
            )}
            {editingField ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveField}
                  className="rounded-full bg-brandPink px-3 py-1 text-xs font-semibold text-white transition hover:bg-brandPink/90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink"
                >
                  Cancel
                </button>
              </div>
            ) : null}
            {updateError ? (
              <p className="text-xs text-rose-500">{updateError}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Feedback</h3>
              {authenticated ? (
                <button
                  type="button"
                  onClick={() => feedbackInputRef.current?.click()}
                  className="rounded-full border border-lavender px-3 py-1 text-xs font-semibold text-plum transition hover:border-brandPink hover:text-brandPink disabled:opacity-60"
                  disabled={savingFeedback}
                >
                  {savingFeedback ? "Uploading..." : "Add Feedback Image"}
                </button>
              ) : null}
            </div>

            <input
              ref={feedbackInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAddFeedbackImages}
            />

            {loadingFeedback ? (
              <p className="text-xs text-muted">Loading feedback...</p>
            ) : feedbackImages.length ? (
              <div className="space-y-3">
                {feedbackImages.map((image, index) => (
                  <div key={image} className="relative rounded-2xl bg-softBg p-2">
                    <img
                      src={image}
                      alt="Feedback"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                    {authenticated ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteFeedbackImage(index)}
                        aria-label="Delete feedback image"
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow ring-1 ring-black/10 transition hover:bg-white"
                        disabled={savingFeedback}
                      >
                        🗑
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">No feedback images yet.</p>
            )}
            {feedbackError ? (
              <p className="text-xs text-rose-500">{feedbackError}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
