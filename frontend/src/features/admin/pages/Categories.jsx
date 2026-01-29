import { useEffect, useState } from "react";
import { fetchAdmin } from "../../../api/http";

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  order: 0,
  coverImageUrl: "",
  enabled: true,
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    const response = await fetchAdmin("/api/admin/categories");
    if (!response.ok) return;
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      order: Number(form.order) || 0,
      coverImageUrl: form.coverImageUrl.trim(),
      enabled: form.enabled,
    };

    try {
      const response = await fetchAdmin(
        `/api/admin/categories${form.id ? `/${form.id}` : ""}`,
        {
          method: form.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        setError("Unable to save category.");
        return;
      }

      setForm(emptyForm);
      await loadCategories();
    } catch (err) {
      setError("Unable to save category.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setForm({
      id: category.id,
      name: category.name ?? "",
      slug: category.slug ?? "",
      order: category.order ?? 0,
      coverImageUrl: category.coverImageUrl ?? "",
      enabled: category.enabled ?? true,
    });
  };

  const handleDelete = async (id) => {
    await fetchAdmin(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
    await loadCategories();
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink">Cake Categories</h1>
        <p className="text-sm text-muted">
          Manage category names, order, and cover images for the gallery.
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
              placeholder="Wedding Cakes"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="wedding"
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">Order</label>
            <input
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1">
              Cover Image URL
            </label>
            <input
              name="coverImageUrl"
              value={form.coverImageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-lavender px-4 py-2 text-sm text-ink bg-softBg"
            />
          </div>
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
          />
          Enabled
        </label>

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brandPink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brandPink/90 disabled:opacity-70"
        >
          {form.id ? "Update category" : "Create category"}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl border border-lavender bg-white p-5 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-ink">
                  {category.name}
                </p>
                <p className="text-xs text-muted">Slug: {category.slug}</p>
              </div>
              <span className="text-xs text-muted">Order {category.order}</span>
            </div>
            {category.coverImageUrl ? (
              <img
                src={category.coverImageUrl}
                alt={category.name}
                className="h-32 w-full rounded-2xl object-cover"
              />
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(category)}
                className="rounded-full border border-brandPink px-3 py-1 text-xs font-semibold text-brandPink transition hover:bg-brandPink hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(category.id)}
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
