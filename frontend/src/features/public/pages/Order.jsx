import { useState } from "react";
import EditableText from "../../../components/common/EditableText";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  occasion: "",
  date: "",
  servings: "",
  flavor: "",
  budget: "",
  fulfillment: "pickup",
  address: "",
  notes: "",
  referenceUrl: "",
};

export default function Order() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim() && !form.phone.trim()) {
      nextErrors.contact = "Email or phone is required.";
    }
    if (!form.occasion.trim()) nextErrors.occasion = "Occasion is required.";
    if (!form.date.trim()) nextErrors.date = "Date is required.";
    if (form.fulfillment === "delivery" && !form.address.trim()) {
      nextErrors.address = "Delivery address is required.";
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="bg-gradient-to-b from-softBg via-softBg to-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6 font-serif text-ink">
        <header className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-brandPink/20 blur-2xl" />
            <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-lavender/30 blur-xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,213,233,0.6),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(225,203,235,0.5),transparent_45%)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
            <EditableText
              copyKey="order.header.label"
              defaultText="Custom Order"
            />
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">
            <EditableText
              copyKey="order.header.title"
              defaultText="Order Your Dream Cake"
            />
          </h1>
          <p className="mt-2 text-sm text-muted">
            <EditableText
              copyKey="order.header.subtitle"
              defaultText="Share a few details and we’ll get back with ideas, pricing, and the next steps."
              multiline
            />
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-lavender/50 bg-white p-6 shadow-sm space-y-5"
        >
          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Thank you! Your request has been received. We’ll contact you soon.
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText copyKey="order.field.name" defaultText="Name" />
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="Your name"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText
                  copyKey="order.field.occasion"
                  defaultText="Occasion"
                />
              </label>
              <input
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="Birthday, wedding, anniversary..."
              />
              {errors.occasion ? (
                <p className="mt-1 text-xs text-rose-500">{errors.occasion}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText copyKey="order.field.email" defaultText="Email" />
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText copyKey="order.field.phone" defaultText="Phone" />
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="Optional"
              />
              {errors.contact ? (
                <p className="mt-1 text-xs text-rose-500">{errors.contact}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText copyKey="order.field.date" defaultText="Date" />
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
              />
              {errors.date ? (
                <p className="mt-1 text-xs text-rose-500">{errors.date}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText
                  copyKey="order.field.servings"
                  defaultText="Servings"
                />
              </label>
              <input
                name="servings"
                value={form.servings}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="e.g. 20"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText
                  copyKey="order.field.flavor"
                  defaultText="Flavor"
                />
              </label>
              <input
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="Vanilla, chocolate, matcha..."
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                <EditableText
                  copyKey="order.field.budget"
                  defaultText="Budget"
                />
              </label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-ink">
              <EditableText
                copyKey="order.field.fulfillment"
                defaultText="Pickup or Delivery"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              {["pickup", "delivery"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, fulfillment: option }))
                  }
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    form.fulfillment === option
                      ? "border-brandPink bg-brandPink/10 text-brandPink"
                      : "border-lavender text-plum hover:border-brandPink"
                  }`}
                >
                  {option === "pickup" ? (
                    <EditableText
                      copyKey="order.fulfillment.pickup"
                      defaultText="Pickup"
                    />
                  ) : (
                    <EditableText
                      copyKey="order.fulfillment.delivery"
                      defaultText="Delivery"
                    />
                  )}
                </button>
              ))}
            </div>
            {form.fulfillment === "delivery" ? (
              <div>
                <label className="text-sm font-semibold text-ink">
                  <EditableText
                    copyKey="order.field.address"
                    defaultText="Delivery Address"
                  />
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
                  placeholder="Street, City"
                />
                {errors.address ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.address}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-semibold text-ink">
              <EditableText
                copyKey="order.field.reference"
                defaultText="Inspiration / Reference URL"
              />
            </label>
            <input
              name="referenceUrl"
              value={form.referenceUrl}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink">
              <EditableText copyKey="order.field.notes" defaultText="Notes" />
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-lavender bg-softBg px-4 py-2 text-sm"
              rows={4}
              placeholder="Color palette, theme, dietary needs..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brandPink px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brandPink/90"
          >
            <EditableText
              copyKey="order.cta.submit"
              defaultText="Send Request"
            />
          </button>
        </form>
      </div>
    </section>
  );
}
