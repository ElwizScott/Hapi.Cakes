import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchCakeFeedbackImages,
  fetchCakes,
} from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import { fetchAdmin } from "../../../api/http";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import Loader from "../../../components/common/Loader";
import PillBadge from "../../../components/common/PillBadge";
import SurfaceCard from "../../../components/common/SurfaceCard";
import { formatVND } from "../../../utils/formatPrice";
import useAppTranslation from "../../../i18n/useAppTranslation";
import {
  bodyClass,
  buttonGhostClass,
  buttonPrimaryClass,
  buttonSecondaryClass,
  cx,
  fieldClass,
  fieldErrorClass,
  surfaceCardClass,
  surfaceElevatedClass,
  titleClass,
} from "../../../components/common/designSystem";

export default function CakeDetail() {
  const { cakeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticated } = useAdminAuth();
  const { t } = useAppTranslation("common");

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

    const loadFromPublic = () => Promise.all([fetchCakes(), fetchCategories()]);

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
          setError(t("cakeDetail.notFound"));
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
        setError(t("cakeDetail.notFound"));
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
      : (cake?.feedbackImages ?? []),
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
      setCake((prev) => (prev ? { ...prev, imageUrls: nextImages } : prev));
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
      setCake((prev) => (prev ? { ...prev, imageUrls: nextImages } : prev));
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
      setCake((prev) => (prev ? { ...prev, imageUrls: nextImages } : prev));
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
      setUpdateError(t("cakeDetail.updateFailed"));
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
    return <Loader label={t("cakeDetail.loading")} />;
  }

  if (error || !cake) {
    return (
      <SurfaceCard
        elevated
        className="mx-auto max-w-xl p-6 text-center text-sm text-text-secondary sm:p-8"
      >
        {error || t("cakeDetail.notFound")}
      </SurfaceCard>
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
    <section className="bg-surface px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={cx(
              buttonSecondaryClass,
              "min-h-11 px-4 py-2 text-xs uppercase tracking-[0.18em]",
            )}
          >
            {t("cakeDetail.backToGallery")}
          </button>
          <PillBadge className="px-3 py-1 text-[0.62rem] tracking-[0.18em]">
            {categoryName}
          </PillBadge>
        </div>

        <div
          className={cx(
            surfaceElevatedClass,
            "grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:p-5",
          )}
        >
          <div className="space-y-3">
            <div className={cx(surfaceCardClass, "p-3 sm:p-4")}>
              <div className="group relative overflow-hidden rounded-card border border-border-soft/80 bg-gradient-to-br from-surface via-surface to-accent-soft/40 shadow-soft">
                {images[activeIndex] ? (
                  <div className="relative aspect-[4/5] w-full max-h-[70vh] overflow-hidden sm:aspect-[4/4.8]">
                    <img
                      src={images[activeIndex]}
                      alt={cake.name}
                      className="block h-full w-full cursor-zoom-in object-cover object-center transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                      onClick={() => setLightboxOpen(true)}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(83,55,99,0.08))]" />
                  </div>
                ) : (
                  <div
                    className={cx(
                      "flex h-72 items-center justify-center md:h-[420px]",
                      bodyClass,
                    )}
                  >
                    {t("cakeDetail.noImageAvailable")}
                  </div>
                )}
                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft transition duration-300 ease-soft hover:-translate-y-1/2 hover:bg-white hover:shadow-float"
                      aria-label={t("cakeDetail.previousImage")}
                    >
                      <span className="text-lg leading-none">‹</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft transition duration-300 ease-soft hover:-translate-y-1/2 hover:bg-white hover:shadow-float"
                      aria-label={t("cakeDetail.nextImage")}
                    >
                      <span className="text-lg leading-none">›</span>
                    </button>
                  </>
                ) : null}
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-black/0 transition duration-300 group-hover:bg-black/18" />
                {authenticated && images.length ? (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    aria-label={t("cakeDetail.deleteImage")}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft transition hover:bg-white hover:shadow-float"
                    disabled={savingImages}
                  >
                    🗑
                  </button>
                ) : null}
                {authenticated ? (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className={cx(
                      buttonPrimaryClass,
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 text-xs opacity-0 transition duration-300 group-hover:opacity-100",
                    )}
                  >
                    {t("cakeDetail.addImage")}
                  </button>
                ) : null}
              </div>

              {images.length > 1 ? (
                <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
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
                        className={`relative overflow-hidden rounded-card border transition ${
                          realIndex === activeIndex
                            ? "border-accent ring-2 ring-accent/30 scale-[1.03]"
                            : "border-border-soft hover:border-accent-soft hover:scale-[1.01]"
                        }`}
                        aria-label={`View image ${realIndex + 1}`}
                      >
                        <img
                          src={image}
                          alt={`${cake.name} thumbnail ${realIndex + 1}`}
                          className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {savingImages && uploadProgress ? (
                <p className={cx("mt-2 text-xs", bodyClass)}>
                  {t("cakeDetail.uploadingProgress", {
                    current: uploadProgress.current,
                    total: uploadProgress.total,
                  })}
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
                  <span className={fieldErrorClass}>{imageError}</span>
                ) : null}
              </div>
            ) : null}
          </div>

          <div
            className={cx(
              surfaceCardClass,
              "flex min-w-0 flex-col gap-4 p-4 sm:p-5",
            )}
          >
            <div className="space-y-3 border-b border-border-soft/80 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {editingField === "name" ? (
                  <input
                    value={fieldDraft.name}
                    onChange={(event) =>
                      setFieldDraft((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                ) : (
                  <h2 className={cx(titleClass, "sm:text-4xl")}>{cake.name}</h2>
                )}
                {authenticated ? (
                  editingField === "name" ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleSaveField}
                        className={cx(
                          buttonPrimaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.save")}
                        aria-label={t("buttons.save")}
                      >
                        ✔
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className={cx(
                          buttonSecondaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.cancel")}
                        aria-label={t("buttons.cancel")}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartEdit("name")}
                      className={cx(
                        buttonSecondaryClass,
                        "min-h-9 px-3 py-1.5 text-xs",
                      )}
                      title={t("cakeDetail.editName")}
                      aria-label={t("cakeDetail.editName")}
                    >
                      ✎
                    </button>
                  )
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                {editingField === "category" ? (
                  <select
                    value={fieldDraft.categoryId}
                    onChange={(event) =>
                      setFieldDraft((prev) => ({
                        ...prev,
                        categoryId: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  >
                    <option value="">{t("cakeDetail.selectCategory")}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="inline-flex items-center rounded-pill border border-border-soft bg-accent-soft px-3 py-1 text-xs font-semibold text-plum shadow-soft">
                    {categoryName || t("cakeCard.uncategorized")}
                  </span>
                )}
                {authenticated ? (
                  editingField === "category" ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleSaveField}
                        className={cx(
                          buttonPrimaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.save")}
                        aria-label={t("buttons.save")}
                      >
                        ✔
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className={cx(
                          buttonSecondaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.cancel")}
                        aria-label={t("buttons.cancel")}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartEdit("category")}
                      className={cx(
                        buttonSecondaryClass,
                        "min-h-9 px-3 py-1.5 text-xs",
                      )}
                      title={t("cakeDetail.editCategory")}
                      aria-label={t("cakeDetail.editCategory")}
                    >
                      ✎
                    </button>
                  )
                ) : null}
              </div>
              {Number.isFinite(cake.price) ? (
                <p className="text-sm font-semibold text-plum sm:text-base">
                  {formatVND(cake.price)}
                </p>
              ) : null}
            </div>

            <div className="space-y-3 border-b border-border-soft/80 pb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-plum/75">
                  {t("cakeDetail.description")}
                </h3>
                {authenticated ? (
                  editingField === "description" ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleSaveField}
                        className={cx(
                          buttonPrimaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.save")}
                        aria-label={t("buttons.save")}
                      >
                        ✔
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className={cx(
                          buttonSecondaryClass,
                          "min-h-9 px-3 py-1.5 text-xs",
                        )}
                        title={t("buttons.cancel")}
                        aria-label={t("buttons.cancel")}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartEdit("description")}
                      className={cx(
                        buttonSecondaryClass,
                        "min-h-9 px-3 py-1.5 text-xs",
                      )}
                      title={t("cakeDetail.editDescription")}
                      aria-label={t("cakeDetail.editDescription")}
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
                  className={cx(
                    fieldClass,
                    "min-h-32 rounded-card px-4 py-4 leading-7",
                  )}
                  rows={3}
                />
              ) : (
                <div className="rounded-card border border-border-soft bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(250,243,250,0.92))] p-4 text-sm text-text-secondary shadow-soft">
                  <div
                    className={cx(
                      bodyClass,
                      "whitespace-pre-line tracking-[0.01em]",
                    )}
                    style={{
                      maxHeight: showFullDescription ? "14rem" : "6.5rem",
                      overflowY: showFullDescription ? "auto" : "hidden",
                    }}
                  >
                    {cake.description || t("feedback.description.none")}
                  </div>
                  {cake.description && cake.description.length > 180 ? (
                    <button
                      type="button"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                      className={cx(
                        buttonGhostClass,
                        "mt-3 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em]",
                      )}
                    >
                      {showFullDescription
                        ? t("feedback.description.seeLess")
                        : t("feedback.description.seeMore")}
                    </button>
                  ) : null}
                </div>
              )}
              {updateError ? (
                <p className={fieldErrorClass}>{updateError}</p>
              ) : null}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-plum/75">
                  {t("feedback.header.label")}
                </h3>
                {authenticated ? (
                  <button
                    type="button"
                    onClick={() => feedbackInputRef.current?.click()}
                    className={cx(
                      buttonSecondaryClass,
                      "min-h-11 px-3 py-2 text-xs uppercase tracking-[0.16em] disabled:opacity-60",
                    )}
                    disabled={savingFeedback}
                  >
                    {savingFeedback
                      ? t("feedback.header.uploading")
                      : t("feedback.header.addImages")}
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
                <p className={bodyClass}>{t("feedback.header.loading")}</p>
              ) : feedbackImages.length ? (
                <div className="relative">
                  <div className="w-full max-w-full min-w-0 overflow-x-auto pb-2 pr-2 sm:pr-6">
                    <div className="flex w-max gap-3">
                      {feedbackImages.map((image, index) => (
                        <div
                          key={image}
                          className="group relative w-44 flex-none overflow-hidden rounded-card border border-border-soft bg-surface shadow-soft transition duration-300 ease-soft hover:-translate-y-1 hover:shadow-float sm:w-56"
                        >
                          <img
                            src={image}
                            alt={t("feedback.imageAlt")}
                            className="block aspect-[4/3] w-full cursor-zoom-in object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                            onClick={() => handleOpenFeedbackLightbox(index)}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                          {authenticated ? (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteFeedbackImage(index);
                              }}
                              aria-label={t("feedback.controls.delete")}
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft transition hover:bg-white hover:shadow-float"
                              disabled={savingFeedback}
                            >
                              🗑
                            </button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-white/70 to-transparent" />
                </div>
              ) : (
                <p className={bodyClass}>{t("feedback.header.empty")}</p>
              )}
              {feedbackError ? (
                <p className={fieldErrorClass}>{feedbackError}</p>
              ) : null}
            </div>
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
              aria-label={t("buttons.close")}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft"
            >
              ✕
            </button>
            <img
              src={images[activeIndex]}
              alt={cake.name}
              className="max-h-[90vh] max-w-[90vw] rounded-card object-contain shadow-soft"
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
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft"
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
                  aria-label={t("feedback.controls.previous")}
                  className="absolute -left-10 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft"
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
                  aria-label={t("feedback.controls.next")}
                  className="absolute -right-10 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-elevated text-plum shadow-soft"
                >
                  ›
                </button>
              </>
            ) : null}
            <img
              src={feedbackImages[feedbackActiveIndex]}
              alt="Feedback"
              className="max-h-[90vh] max-w-[90vw] rounded-card object-contain shadow-soft"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
