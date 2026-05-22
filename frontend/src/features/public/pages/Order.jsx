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
import useAppTranslation from "../../../i18n/useAppTranslation";

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

function OptionCard({ selected, onClick, icon, title, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group min-h-12 rounded-[1.6rem] border p-4 text-left shadow-soft transition-all duration-300 ease-soft",
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
  const { t } = useAppTranslation("order");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const previewTitle = useMemo(() => {
    return form.occasion || t("messages.previewTitle");
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
    if (!form.name.trim()) nextErrors.name = t("messages.nameRequired");
    if (!form.email.trim() && !form.phone.trim()) {
      nextErrors.contact = t("messages.contactRequired");
    }
    if (!form.occasion.trim())
      nextErrors.occasion = t("messages.occasionRequired");
    if (!form.date.trim()) nextErrors.date = t("messages.dateRequired");
    if (form.fulfillment === "delivery" && !form.address.trim()) {
      nextErrors.address = t("messages.addressRequired");
    }
    return nextErrors;
  };

  const steps = [
    {
      id: "contact",
      label: t("steps.contact.label"),
      title: t("steps.contact.title"),
      description: t("steps.contact.description"),
    },
    {
      id: "cake",
      label: t("steps.cake.label"),
      title: t("steps.cake.title"),
      description: t("steps.cake.description"),
    },
    {
      id: "delivery",
      label: t("steps.delivery.label"),
      title: t("steps.delivery.title"),
      description: t("steps.delivery.description"),
    },
  ];

  const occasionOptions = [
    {
      value: t("options.birthday.value"),
      icon: "🎂",
      hint: t("options.birthday.hint"),
    },
    {
      value: t("options.wedding.value"),
      icon: "💍",
      hint: t("options.wedding.hint"),
    },
    {
      value: t("options.anniversary.value"),
      icon: "💐",
      hint: t("options.anniversary.hint"),
    },
    {
      value: t("options.babyShower.value"),
      icon: "🧸",
      hint: t("options.babyShower.hint"),
    },
    {
      value: t("options.graduation.value"),
      icon: "🎓",
      hint: t("options.graduation.hint"),
    },
    {
      value: t("options.other.value"),
      icon: "✨",
      hint: t("options.other.hint"),
    },
  ];

  const flavorOptions = [
    { value: t("options.vanilla"), icon: "🍦" },
    { value: t("options.chocolate"), icon: "🍫" },
    { value: t("options.strawberry"), icon: "🍓" },
    { value: t("options.matcha"), icon: "🍵" },
    { value: t("options.redVelvet"), icon: "❤️" },
    { value: t("options.custom"), icon: "🌷" },
  ];

  const budgetOptions = [
    { value: "Under 800k", icon: "$" },
    { value: "800k - 1.5M", icon: "$$" },
    { value: "1.5M - 2.5M", icon: "$$$" },
    { value: "2.5M+", icon: "$$$$" },
  ];

  const servingsOptions = ["6 - 10", "10 - 20", "20 - 30", "30 - 50", "50+"];

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
    <section className="bg-[linear-gradient(180deg,rgba(255,246,251,0.98),rgba(250,243,250,0.96),rgba(255,248,252,0.98))] px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHero
          eyebrow={
            <EditableText
              copyKey="order.header.label"
              defaultText={t("header.label")}
            />
          }
          title={
            <EditableText
              copyKey="order.header.title"
              defaultText={t("header.title")}
            />
          }
          description={
            <EditableText
              copyKey="order.header.subtitle"
              defaultText={t("header.subtitle")}
              multiline
            />
          }
          actions={
            <>
              <PillBadge className="border-white/75 bg-white/80 px-4 py-2 text-[0.68rem] tracking-[0.22em] shadow-soft">
                {t("badges.premium")}
              </PillBadge>
              <PillBadge className="border-white/75 bg-white/80 px-4 py-2 text-[0.68rem] tracking-[0.22em] shadow-soft">
                {t("badges.guided")}
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
                {t("messages.submitted")}
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
                            defaultText={t("fields.name")}
                          />
                        }
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t("placeholders.name")}
                        error={errors.name}
                      />
                      <div>
                        <p className="mb-1.5 block text-sm font-medium text-text-primary">
                          <EditableText
                            copyKey="order.field.occasion"
                            defaultText={t("fields.occasion")}
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
                            defaultText={t("fields.email")}
                          />
                        }
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("placeholders.email")}
                      />
                      <TextField
                        label={
                          <EditableText
                            copyKey="order.field.phone"
                            defaultText={t("fields.phone")}
                          />
                        }
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t("placeholders.phone")}
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
                          defaultText={t("fields.flavor")}
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
                            defaultText={t("fields.servings")}
                          />
                        }
                        name="servings"
                        value={form.servings}
                        onChange={handleChange}
                      >
                        <option value="">{t("placeholders.servings")}</option>
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
                            defaultText={t("fields.budget")}
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
                          defaultText={t("fields.reference")}
                        />
                      }
                      name="referenceUrl"
                      value={form.referenceUrl}
                      onChange={handleChange}
                      placeholder={t("placeholders.reference")}
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
                            defaultText={t("fields.date")}
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
                            defaultText={t("fields.fulfillment")}
                          />
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            {
                              value: "pickup",
                              icon: "🏡",
                              title: t("options.pickup.title"),
                              hint: t("options.pickup.hint"),
                            },
                            {
                              value: "delivery",
                              icon: "🛵",
                              title: t("options.delivery.title"),
                              hint: t("options.delivery.hint"),
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
                            defaultText={t("fields.address")}
                          />
                        }
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder={t("placeholders.address")}
                        error={errors.address}
                      />
                    ) : null}

                    <TextArea
                      label={
                        <EditableText
                          copyKey="order.field.notes"
                          defaultText={t("fields.notes")}
                        />
                      }
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder={t("placeholders.notes")}
                    />
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border-soft/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-text-secondary">
                  {currentStep < steps.length - 1
                    ? t("messages.review")
                    : t("messages.ready")}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {currentStep > 0 ? (
                    <SecondaryButton
                      type="button"
                      onClick={goBack}
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      {t("cta.back")}
                    </SecondaryButton>
                  ) : null}
                  {currentStep < steps.length - 1 ? (
                    <PrimaryButton
                      type="button"
                      onClick={goNext}
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      {t("cta.continue")}
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="submit"
                      className="px-5 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      <EditableText
                        copyKey="order.cta.submit"
                        defaultText={t("cta.submit")}
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
                      {t("messages.previewTitle")}
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
                          {form.flavor || t("messages.dreamFlavor")}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                          {form.servings || t("messages.selectSize")} •{" "}
                          {form.fulfillment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    form.occasion || t("messages.celebrationType"),
                    form.flavor || t("fields.flavor"),
                    form.budget || t("fields.budget"),
                    form.servings
                      ? `${form.servings} ${t("fields.servings")}`
                      : t("fields.servings"),
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
                    {t("messages.builderNotes")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {previewMood || t("messages.builderDescription")}
                  </p>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="border-white/75 bg-white/74 p-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-plum/75">
                  {t("messages.received")}
                </p>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex justify-between gap-3">
                    <span>{t("fields.name")}</span>
                    <span className="text-right text-text-primary">
                      {form.name || t("messages.notAdded")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>{t("fields.occasion")}</span>
                    <span className="text-right text-text-primary">
                      {form.occasion || t("messages.notAdded")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>{t("fields.date")}</span>
                    <span className="text-right text-text-primary">
                      {form.date || t("messages.notAdded")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>{t("fields.fulfillment")}</span>
                    <span className="text-right capitalize text-text-primary">
                      {form.fulfillment}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>{t("fields.reference")}</span>
                    <span className="text-right text-text-primary">
                      {form.referenceUrl
                        ? t("messages.included")
                        : t("messages.optional")}
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
