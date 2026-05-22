export function cx(...values) {
  return values.filter(Boolean).join(" ");
}

export const surfaceCardClass =
  "rounded-card border border-border-soft bg-surface shadow-soft transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-float will-change-transform";

export const surfaceElevatedClass =
  "rounded-card border border-border-soft bg-surface-elevated shadow-float transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(110,85,117,0.16)] will-change-transform";

export const frostedSurfaceClass =
  "rounded-card border border-border-soft/80 bg-gradient-to-br from-surface-elevated via-surface to-accent-soft/70 shadow-soft backdrop-blur";

export const titleClass =
  "font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl";

export const sectionTitleClass =
  "font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl";

export const bodyClass = "text-sm leading-6 text-text-secondary sm:text-base";

export const eyebrowClass =
  "text-xs font-semibold uppercase tracking-[0.22em] text-plum/80";

export const badgeClass =
  "inline-flex items-center rounded-pill border border-border-soft bg-surface-elevated px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-plum";

export const buttonBaseClass =
  "inline-flex min-h-11 touch-manipulation items-center justify-center rounded-pill px-4 text-sm font-semibold transition duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 active:translate-y-0.5 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70";

export const buttonPrimaryClass = cx(
  buttonBaseClass,
  "bg-accent px-5 py-3 text-white shadow-soft hover:-translate-y-0.5 hover:bg-plum hover:shadow-float focus-visible:ring-accent/40",
);

export const buttonSecondaryClass = cx(
  buttonBaseClass,
  "border border-border-soft bg-surface-elevated px-5 py-3 text-text-primary shadow-soft hover:-translate-y-0.5 hover:border-accent hover:text-plum hover:shadow-float focus-visible:ring-accent/30",
);

export const buttonGhostClass = cx(
  buttonBaseClass,
  "px-4 py-2 font-medium text-plum hover:bg-accent-soft focus-visible:ring-accent/30",
);

export const fieldClass =
  "w-full min-h-11 rounded-ui border border-border-soft bg-surface-elevated px-4 py-3 text-sm text-text-primary shadow-insetSoft outline-none transition duration-200 ease-soft placeholder:text-text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

export const fieldLabelClass =
  "mb-1.5 block text-sm font-medium text-text-primary";

export const fieldMessageClass = "mt-1 text-xs text-text-secondary";
export const fieldErrorClass = "mt-1 text-xs text-danger";
