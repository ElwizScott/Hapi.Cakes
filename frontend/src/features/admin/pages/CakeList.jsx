import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  price: "",
  categoryId: "",
  imageUrls: [],
  feedbackImages: [],
  featured: false,
};

export default function CakeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCakes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/cakes`, {
      credentials: "include",
    });
    if (!response.ok) return;
    setCakes(await response.json());
  };

  const loadCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
      credentials: "include",
    });
    if (!response.ok) return;
    setCategories(await response.json());
  };

  useEffect(() => {
    loadCakes();
    loadCategories();
  }, []);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (!editId || cakes.length === 0) return;
    const cake = cakes.find((item) => item.id === editId);
    if (cake) {
      handleEdit(cake);
    }
  }, [cakes, searchParams]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/admin/upload/cake`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const handleImageUpload = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({
        ...prev,
        [type]: [...prev[type], url],
      }));
    } catch (err) {
      setError("Image upload failed.");
    }
  };

  const removeImage = (type, url) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== url),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price ? Number(form.price) : null,
      categoryId: form.categoryId,
      imageUrls: form.imageUrls,
      feedbackImages: form.feedbackImages,
      featured: form.featured,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/cakes${form.id ? `/${form.id}` : ""}`,
        {
          method: form.id ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        setError("Unable to save cake.");
        return;
      }

      setForm(emptyForm);
      setSearchParams((prev) => {
        prev.delete("edit");
        return prev;
      });
      await loadCakes();
    } catch (err) {
      setError("Unable to save cake.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cake) => {
    setForm({
      id: cake.id,
      name: cake.name ?? "",
      description: cake.description ?? "",
      price: cake.price ?? "",
      categoryId: cake.categoryId ?? "",
      imageUrls: cake.imageUrls ?? [],
      feedbackImages: cake.feedbackImages ?? [],
      featured: cake.featured ?? false,
    });
    setSearchParams((prev) => {
      prev.set("edit", cake.id);
      return prev;
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE_URL}/api/admin/cakes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await loadCakes();
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink">Cakes</h1>
        <p className="text-sm text-muted">
          Manage cake details, images, and category assignments.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-lavender bg-white p-6 shadow-sm space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-muted mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-muted mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-muted mt-6">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-muted mb-1">Cake Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, "imageUrls")}
              className="w-full text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {form.imageUrls.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => removeImage("imageUrls", url)}
                  className="relative"
                >
                  <img
                    src={url}
                    alt="Cake"
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">
              Feedback Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, "feedbackImages")}
              className="w-full text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {form.feedbackImages.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => removeImage("feedbackImages", url)}
                  className="relative"
                >
                  <img
                    src={url}
                    alt="Feedback"
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brandPink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brandPink/90 disabled:opacity-70"
        >
          {form.id ? "Update cake" : "Create cake"}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {cakes.map((cake) => (
          <div
            key={cake.id}
            className="rounded-3xl border border-lavender bg-white p-5 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-ink">{cake.name}</p>
                <p className="text-xs text-muted">{cake.description}</p>
              </div>
              {cake.featured ? (
                <span className="text-xs text-brandPink">Featured</span>
              ) : null}
            </div>
            {cake.imageUrls?.[0] ? (
              <img
                src={cake.imageUrls[0]}
                alt={cake.name}
                className="h-32 w-full rounded-2xl object-cover"
              />
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(cake)}
                className="rounded-full border border-brandPink px-3 py-1 text-xs font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(cake.id)}
                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
