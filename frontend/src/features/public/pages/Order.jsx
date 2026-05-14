import { useMemo, useState } from "react";
import EditableText from "../../../components/common/EditableText";
import PageHero from "../../../components/common/PageHero";
import PillBadge from "../../../components/common/PillBadge";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import SelectField from "../../../components/common/SelectField";
import SurfaceCard from "../../../components/common/SurfaceCard";
import TextArea from "../../../components/common/TextArea";
import TextField from "../../../components/common/TextField";
import { cx } from "../../../components/common/designSystem";

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

const steps = [
  {
    id: "contact",
    label: "Step 1",
    title: "Your celebration",
    description: "Share the occasion and how we should reach you.",
  },
  {
    id: "cake",
    label: "Step 2",
    title: "Cake design",
    description: "Choose the flavors, size, and styling direction.",
  },
  {
    id: "delivery",
    label: "Step 3",
    title: "Delivery details",
    description: "Set timing, fulfillment, and extra notes.",
  },
];

const occasionOptions = [
  { value: "Birthday", icon: "🎂", hint: "Playful, personal, and photo-ready" },
  { value: "Wedding", icon: "💍", hint: "Elegant florals and soft finishes" },
  { value: "Anniversary", icon: "💐", hint: "Romantic and polished" },
  { value: "Baby Shower", icon: "🧸", hint: "Sweet pastel storytelling" },
  { value: "Graduation", icon: "🎓", hint: "Celebration centerpiece styling" },
  { value: "Other", icon: "✨", hint: "Custom mood and concept" },
];

const flavorOptions = [
  { value: "Vanilla", icon: "🍦" },
  { value: "Chocolate", icon: "🍫" },
  { value: "Strawberry", icon: "🍓" },
  { value: "Matcha", icon: "🍵" },
  { value: "Red Velvet", icon: "❤️" },
  { value: "Custom", icon: "🌷" },
];

const budgetOptions = [
  { value: "Under 800k", icon: "$" },
  { value: "800k - 1.5M", icon: "$$" },
  { value: "1.5M - 2.5M", icon: "$$$" },
  { value: "2.5M+", icon: "$$$$" },
];

const servingsOptions = ["6 - 10", "10 - 20", "20 - 30", "30 - 50", "50+"];

function OptionCard({ selected, onClick, icon, title, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group rounded-[1.6rem] border p-4 text-left shadow-soft transition-all duration-300 ease-soft",
        selected
          ? "border-accent bg-accent-soft/80 ring-2 ring-accent/15"
          : "border-white/70 bg-white/72 hover:-translate-y-0.5 hover:border-accent/55 hover:bg-white",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "grid h-11 w-11 place-items-center rounded-[1.1rem] text-lg transition duration-300 ease-soft",
            selected
              ? "bg-white text-plum"
              : "bg-accent-soft/75 text-plum group-hover:bg-accent-soft",
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text-primary">{title}</p>
          {hint ? (
            <p className="mt-1 text-sm leading-5 text-text-secondary">{hint}</p>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function ProgressStep({ step, index, currentStep, total }) {
  const active = index === currentStep;
  const complete = index < currentStep;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cx(
          "grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-300 ease-soft",
          complete
            ? "border-accent bg-accent text-white"
            : active
              ? "border-accent bg-accent-soft text-plum ring-2 ring-accent/15"
              : "border-white/80 bg-white/75 text-text-secondary",
        )}
      >
        {complete ? "✓" : index + 1}
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-plum/70">
          {step.label}
        </p>
        <p
          className={cx(
            "mt-1 font-serif text-lg transition-colors duration-300 ease-soft",
            active || complete ? "text-text-primary" : "text-text-secondary",
          )}
        >
          {step.title}
        </p>
      </div>
      {index < total - 1 ? (
        <div className="hidden h-px flex-1 bg-border-soft/80 lg:block" />
      ) : null}
    </div>
  );
}

export default function Order() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const previewTitle = useMemo(() => {
    return form.occasion || "Your custom cake";
  }, [form.occasion]);

  const previewMood = useMemo(() => {
    return [form.flavor, form.budget, form.fulfillment]
      .filter(Boolean)
      .join(" • ");
  }, [form.flavor, form.budget, form.fulfillment]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name, value) => {
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

  const validateStep = (stepIndex) => {
    const nextErrors = validate();

    if (stepIndex === 0) {
      return {
        name: nextErrors.name,
        contact: nextErrors.contact,
        occasion: nextErrors.occasion,
      };
    }

    if (stepIndex === 1) {
      return {};
    }

    return {
      date: nextErrors.date,
      address: nextErrors.address,
    };
  };

  const goNext = () => {
    const stepErrors = validateStep(currentStep);
    const filteredErrors = Object.fromEntries(
      Object.entries(stepErrors).filter(([, value]) => value),
    );
    setErrors((prev) => ({ ...prev, ...filteredErrors }));
    if (Object.keys(filteredErrors).length > 0) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name || nextErrors.contact || nextErrors.occasion) {
        setCurrentStep(0);
      } else if (nextErrors.date || nextErrors.address) {
        setCurrentStep(2);
      }
      return;
    }
    setSubmitted(true);
    setForm(initialForm);
    setCurrentStep(0);
  };

  return (
    <section className="bg-gradient-to-b from-softBg via-brandCream/50 to-white px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHero
          eyebrow={
            <EditableText
              copyKey="order.header.label"
              defaultText="Custom Order"
            />
          }
          title={
            <EditableText
              copyKey="order.header.title"
              defaultText="Build Your Dream Cake"
            />
          }
          description={
            <EditableText
              copyKey="order.header.subtitle"
              defaultText="A boutique cake builder designed to make your order feel clear, inspiring, and beautifully personal from the very first step."
              multiline
            />
          }
          actions={
            <>
              <PillBadge className="border-white/75 bg-white/80 px-4 py-2 text-[0.68rem] tracking-[0.22em] shadow-soft">
                Soft premium styling
              </PillBadge>
              <PillBadge className="border-white/75 bg-white/80 px-4 py-2 text-[0.68rem] tracking-[0.22em] shadow-soft">
                Guided 3-step flow
              </PillBadge>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <SurfaceCard className="overflow-hidden border-white/75 bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(250,243,250,0.94))] p-4 sm:p-6">
              <div className="flex flex-col gap-5">
                <div className="grid gap-4 md:grid-cols-3">
                  {steps.map((step, index) => (
                    <ProgressStep
                      key={step.id}
                      step={step}
                      index={index}
                      currentStep={currentStep}
                      total={steps.length}
                    />
                  ))}
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brandPink via-accent to-plum transition-all duration-500 ease-soft"
                    style={{
                      width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </SurfaceCard>

            {submitted ? (
              <SurfaceCard className="border-success/35 bg-[linear-gradient(180deg,rgba(240,255,248,0.96),rgba(255,253,249,0.96))] p-5 text-sm text-success sm:p-6">
                Thank you! Your request has been received. We’ll contact you
                soon.
              </SurfaceCard>
            ) : null}

            <SurfaceCard className="overflow-hidden border-white/75 bg-white/76 p-4 backdrop-blur sm:p-6">
              <div
                className="transition-all duration-500 ease-soft"
                key={steps[currentStep].id}
              >
                <div className="mb-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    {steps[currentStep].label}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                    {steps[currentStep].title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                    {steps[currentStep].description}
                  </p>
                </div>

                {currentStep === 0 ? (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField
                        label={
                          <EditableText
                            copyKey="order.field.name"
                            defaultText="Name"
                          />
                        }
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        error={errors.name}
                      />
                      <div>
                        <p className="mb-1.5 block text-sm font-medium text-text-primary">
                          <EditableText
                            copyKey="order.field.occasion"
                            defaultText="Occasion"
                          />
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {occasionOptions.map((option) => (
                            <OptionCard
                              key={option.value}
                              selected={form.occasion === option.value}
                              onClick={() => setField("occasion", option.value)}
                              icon={option.icon}
                              title={option.value}
                              hint={option.hint}
                            />
                          ))}
                        </div>
                        {errors.occasion ? (
                          <p className="mt-2 text-xs text-danger">
                            {errors.occasion}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField
                        type="email"
                        label={
                          <EditableText
                            copyKey="order.field.email"
                            defaultText="Email"
                          />
                        }
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                      />
                      <TextField
                        label={
                          <EditableText
                            copyKey="order.field.phone"
                            defaultText="Phone"
                          />
                        }
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Optional"
                        error={errors.contact}
                      />
                    </div>
                  </div>
                ) : null}

                {currentStep === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-1.5 block text-sm font-medium text-text-primary">
                        <EditableText
                          copyKey="order.field.flavor"
                          defaultText="Flavor"
                        />
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {flavorOptions.map((option) => (
                          <OptionCard
                            key={option.value}
                            selected={form.flavor === option.value}
                            onClick={() => setField("flavor", option.value)}
                            icon={option.icon}
                            title={option.value}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <SelectField
                        label={
                          <EditableText
                            copyKey="order.field.servings"
                            defaultText="Servings"
                          />
                        }
                        name="servings"
                        value={form.servings}
                        onChange={handleChange}
                      >
                        <option value="">Select servings</option>
                        {servingsOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </SelectField>

                      <div>
                        <p className="mb-1.5 block text-sm font-medium text-text-primary">
                          <EditableText
                            copyKey="order.field.budget"
                            defaultText="Budget"
                          />
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {budgetOptions.map((option) => (
                            <OptionCard
                              key={option.value}
                              selected={form.budget === option.value}
                              onClick={() => setField("budget", option.value)}
                              icon={option.icon}
                              title={option.value}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label={
                        <EditableText
                          copyKey="order.field.reference"
                          defaultText="Inspiration / Reference URL"
                        />
                      }
                      name="referenceUrl"
                      value={form.referenceUrl}
                      onChange={handleChange}
                      placeholder="Pinterest, Instagram, or mood board link"
                    />
                  </div>
                ) : null}

                {currentStep === 2 ? (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField
                        type="date"
                        label={
                          <EditableText
                            copyKey="order.field.date"
                            defaultText="Date"
                          />
                        }
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        error={errors.date}
                      />

                      <div>
                        <p className="mb-1.5 block text-sm font-medium text-text-primary">
                          <EditableText
                            copyKey="order.field.fulfillment"
                            defaultText="Pickup or Delivery"
                          />
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            {
                              value: "pickup",
                              icon: "🏡",
                              title: "Pickup",
                              hint: "Simple collection from the bakery",
                            },
                            {
                              value: "delivery",
                              icon: "🛵",
                              title: "Delivery",
                              hint: "Bring it straight to the celebration",
                            },
                          ].map((option) => (
                            <OptionCard
                              key={option.value}
                              selected={form.fulfillment === option.value}
                              onClick={() =>
                                setField("fulfillment", option.value)
                              }
                              icon={option.icon}
                              title={option.title}
                              hint={option.hint}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {form.fulfillment === "delivery" ? (
                      <TextField
                        label={
                          <EditableText
                            copyKey="order.field.address"
                            defaultText="Delivery Address"
                          />
                        }
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street, district, and city"
                        error={errors.address}
                      />
                    ) : null}

                    <TextArea
                      label={
                        <EditableText
                          copyKey="order.field.notes"
                          defaultText="Notes"
                        />
                      }
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Color palette, floral style, dietary notes, message on cake..."
                    />
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border-soft/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-text-secondary">
                  {currentStep < steps.length - 1
                    ? "You can review and submit after the final step."
                    : "Everything looks ready. Send your request when you’re happy."}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {currentStep > 0 ? (
                    <SecondaryButton
                      type="button"
                      onClick={goBack}
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      Back
                    </SecondaryButton>
                  ) : null}
                  {currentStep < steps.length - 1 ? (
                    <PrimaryButton
                      type="button"
                      onClick={goNext}
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      Continue
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="submit"
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      <EditableText
                        copyKey="order.cta.submit"
                        defaultText="Send Request"
                      />
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </SurfaceCard>
          </form>

          <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <SurfaceCard className="overflow-hidden border-white/75 bg-[linear-gradient(180deg,rgba(255,253,250,0.97),rgba(249,241,249,0.95))] p-4 sm:p-6">
              <div className="space-y-5">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                      Live Preview
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                      {previewTitle}
                    </h3>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-[1.3rem] bg-accent-soft text-xl text-plum sm:h-14 sm:w-14 sm:text-2xl">
                    🍰
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.9rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,252,248,1),rgba(250,238,249,0.96))] p-4 shadow-soft">
                  <div className="pointer-events-none absolute -left-6 top-6 h-16 w-16 rounded-full bg-brandPink/16 blur-2xl" />
                  <div className="pointer-events-none absolute right-6 top-4 h-10 w-10 rounded-full bg-lavender/40 blur-xl" />
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(238,220,241,0.78))] p-6">
                    <div className="mx-auto flex aspect-[4/4.8] max-w-[16rem] items-center justify-center rounded-[1.8rem] border border-white/70 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),rgba(255,247,252,0.6)_45%,rgba(227,205,232,0.7)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl">🎂</div>
                        <p className="mt-3 font-serif text-xl text-plum sm:text-2xl">
                          {form.flavor || "Dream flavor"}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                          {form.servings || "Select size"} • {form.fulfillment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    form.occasion || "Celebration type",
                    form.flavor || "Flavor",
                    form.budget || "Budget",
                    form.servings ? `${form.servings} servings` : "Servings",
                  ].map((item) => (
                    <PillBadge
                      key={item}
                      className="border-white/75 bg-white/82 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] shadow-soft"
                    >
                      {item}
                    </PillBadge>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                    Builder Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {previewMood ||
                      "Choose your flavor, budget, and fulfillment option to shape the feel of your custom cake request."}
                  </p>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="border-white/75 bg-white/74 p-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                  What we’ll receive
                </p>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex justify-between gap-3">
                    <span>Name</span>
                    <span className="text-right text-text-primary">
                      {form.name || "Not added"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Occasion</span>
                    <span className="text-right text-text-primary">
                      {form.occasion || "Not added"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Date</span>
                    <span className="text-right text-text-primary">
                      {form.date || "Not added"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Fulfillment</span>
                    <span className="text-right capitalize text-text-primary">
                      {form.fulfillment}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Reference</span>
                    <span className="text-right text-text-primary">
                      {form.referenceUrl ? "Included" : "Optional"}
                    </span>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </section>
  );
}
