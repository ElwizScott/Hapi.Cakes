import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCakeFeedbackImages, fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import { fetchAdmin } from "../../../api/http";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import Loader from "../../../components/common/Loader";
import { formatVND } from "../../../utils/formatPrice";

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
  const [uploadProgress, setUploadProgress] = useState(null);
  const [savingFeedback, setSavingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [feedbackLightboxOpen, setFeedbackLightboxOpen] = useState(false);
  const [feedbackActiveIndex, setFeedbackActiveIndex] = useState(0);
  const [fieldDraft, setFieldDraft] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const imageInputRef = useRef(null);
  const feedbackInputRef = useRef(null);
  const dragIndexRef = useRef(null);

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
    setShowFullDescription(false);
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
    setUploadProgress({ current: 0, total: files.length });
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
        setUploadProgress((prev) =>
          prev ? { ...prev, current: prev.current + 1 } : prev,
        );
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
      setUploadProgress(null);
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

  const handleReorderImages = async (fromIndex, toIndex) => {
    if (!authenticated || fromIndex === toIndex) return;
    const nextImages = [...images];
    const [moved] = nextImages.splice(fromIndex, 1);
    nextImages.splice(toIndex, 0, moved);
    setSavingImages(true);
    setImageError("");
    try {
      await persistCakeUpdate({ imageUrls: nextImages });
      setCake((prev) =>
        prev ? { ...prev, imageUrls: nextImages } : prev,
      );
      if (activeIndex === fromIndex) {
        setActiveIndex(toIndex);
      } else if (fromIndex < activeIndex && toIndex >= activeIndex) {
        setActiveIndex((prev) => prev - 1);
      } else if (fromIndex > activeIndex && toIndex <= activeIndex) {
        setActiveIndex((prev) => prev + 1);
      }
    } catch (err) {
      setImageError("Unable to reorder images.");
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

  const handleOpenFeedbackLightbox = (index) => {
    setFeedbackActiveIndex(index);
    setFeedbackLightboxOpen(true);
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

  const thumbWindowSize = 5;
  const thumbWindowStart =
    images.length <= thumbWindowSize
      ? 0
      : Math.min(
          Math.max(activeIndex - Math.floor(thumbWindowSize / 2), 0),
          images.length - thumbWindowSize,
        );
  const visibleThumbs = images.slice(
    thumbWindowStart,
    thumbWindowStart + thumbWindowSize,
  );

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-3 pb-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-lavender bg-white px-4 py-2 text-xs font-semibold text-plum shadow-sm transition hover:border-brandPink hover:text-brandPink"
        >
          ← Back to gallery
        </button>
        <span className="text-xs text-muted">{categoryName}</span>
      </div>

      <div className="grid gap-5 rounded-3xl bg-white p-4 shadow-[0_30px_80px_rgba(83,55,99,0.2)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <div className="rounded-3xl border border-lavender/40 bg-white p-3 shadow-sm">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-lavender/30 shadow-[0_18px_45px_rgba(83,55,99,0.18)]">
              {images[activeIndex] ? (
                <img
                  src={images[activeIndex]}
                  alt={cake.name}
                  className="block w-full max-h-[55vh] object-cover object-center rounded-2xl cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                />
              ) : (
                <div className="flex h-72 items-center justify-center text-sm text-muted md:h-[420px]">
                  No image available
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition group-hover:bg-black/35" />
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

            {images.length > 1 ? (
              <div className="mt-5 grid grid-cols-5 gap-3">
                {visibleThumbs.map((image, index) => {
                  const realIndex = thumbWindowStart + index;
                  return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveIndex(realIndex)}
                    draggable={authenticated}
                    onDragStart={() => {
                      dragIndexRef.current = realIndex;
                    }}
                    onDragOver={(event) => {
                      if (!authenticated) return;
                      event.preventDefault();
                    }}
                    onDrop={() => {
                      if (!authenticated) return;
                      const fromIndex = dragIndexRef.current;
                      dragIndexRef.current = null;
                      if (typeof fromIndex === "number") {
                        handleReorderImages(fromIndex, realIndex);
                      }
                    }}
                    className={`relative overflow-hidden rounded-xl border transition ${
                      realIndex === activeIndex
                        ? "border-brandPink ring-2 ring-brandPink/40 scale-[1.03]"
                        : "border-transparent hover:border-lavender/60 hover:scale-[1.01]"
                    }`}
                    aria-label={`View image ${realIndex + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${cake.name} thumbnail ${realIndex + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                  );
                })}
              </div>
            ) : null}
            {savingImages && uploadProgress ? (
              <p className="mt-2 text-xs text-muted">
                Uploading {uploadProgress.current}/{uploadProgress.total}
              </p>
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

        <div className="flex flex-col gap-4 rounded-3xl border border-lavender/40 bg-white p-4 shadow-sm">
          <div className="space-y-2 pb-2 border-b border-lavender/30">
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
                <h2 className="text-2xl font-semibold tracking-tight text-ink">
                  {cake.name}
                </h2>
              )}
              {authenticated ? (
                editingField === "name" ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleSaveField}
                      className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                      title="Save"
                    >
                      ✔
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-600"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEdit("name")}
                    className="rounded-full bg-lavender/60 p-1 text-xs"
                    title="Edit name"
                  >
                    ✎
                  </button>
                )
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
                <span className="inline-flex items-center rounded-full border border-lavender/60 bg-softBg px-2 py-0.5 text-xs font-semibold text-plum">
                  {categoryName || "Uncategorized"}
                </span>
              )}
              {authenticated ? (
                editingField === "category" ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleSaveField}
                      className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                      title="Save"
                    >
                      ✔
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-600"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEdit("category")}
                    className="rounded-full bg-lavender/60 p-1 text-xs"
                    title="Edit category"
                  >
                    ✎
                  </button>
                )
              ) : null}
            </div>
            {Number.isFinite(cake.price) ? (
              <p className="text-sm font-semibold text-plum">
                {formatVND(cake.price)}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 pb-2 border-b border-lavender/30">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">Description</h3>
              {authenticated ? (
                editingField === "description" ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleSaveField}
                      className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                      title="Save"
                    >
                      ✔
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-600"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEdit("description")}
                    className="rounded-full bg-lavender/60 p-1 text-xs"
                    title="Edit description"
                  >
                    ✎
                  </button>
                )
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
                <div
                  className="whitespace-pre-line"
                  style={{
                    maxHeight: showFullDescription ? "14rem" : "6.5rem",
                    overflowY: showFullDescription ? "auto" : "hidden",
                  }}
                >
                  {cake.description || "No description provided."}
                </div>
                {cake.description && cake.description.length > 180 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setShowFullDescription((prev) => !prev)
                    }
                    className="mt-2 text-xs font-semibold text-plum transition hover:text-brandPink"
                  >
                    {showFullDescription ? "See less" : "See more"}
                  </button>
                ) : null}
              </div>
            )}
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
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto pb-2 pr-6">
                  {feedbackImages.map((image, index) => (
                    <div
                      key={image}
                      className="group relative w-56 flex-none overflow-hidden rounded-2xl"
                    >
                      <img
                        src={image}
                        alt="Feedback"
                        className="block aspect-[4/3] w-full object-cover rounded-2xl cursor-zoom-in"
                        onClick={() => handleOpenFeedbackLightbox(index)}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition group-hover:bg-black/35" />
                      {authenticated ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteFeedbackImage(index);
                          }}
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
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-white/70 to-transparent" />
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
      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow"
            >
              ✕
            </button>
            <img
              src={images[activeIndex]}
              alt={cake.name}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      ) : null}
      {feedbackLightboxOpen ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setFeedbackLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFeedbackLightboxOpen(false)}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow"
            >
              ✕
            </button>
            {feedbackImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackActiveIndex(
                      (prev) =>
                        (prev - 1 + feedbackImages.length) %
                        feedbackImages.length,
                    )
                  }
                  aria-label="Previous feedback image"
                  className="absolute -left-10 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackActiveIndex(
                      (prev) => (prev + 1) % feedbackImages.length,
                    )
                  }
                  aria-label="Next feedback image"
                  className="absolute -right-10 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                >
                  ›
                </button>
              </>
            ) : null}
            <img
              src={feedbackImages[feedbackActiveIndex]}
              alt="Feedback"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
