import {
  bodyClass,
  cx,
  eyebrowClass,
  frostedSurfaceClass,
  titleClass,
} from "./designSystem";

export default function PageHero({
  eyebrow,
  title,
  description,
  className = "",
  contentClassName = "",
  actions = null,
  align = "left",
  children,
}) {
  const centered = align === "center";

  return (
    <header
      className={cx(
        frostedSurfaceClass,
        "relative overflow-hidden p-4 sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-brandPink/18 blur-3xl" />
        <div className="absolute right-6 top-10 h-20 w-20 rounded-full bg-lavender/35 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(247,232,244,0.75),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(232,217,241,0.6),transparent_40%)]" />
      </div>
      <div
        className={cx(
          "relative",
          centered && "mx-auto max-w-3xl text-center",
          contentClassName,
        )}
      >
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        {title ? (
          <h1 className={cx(titleClass, eyebrow ? "mt-2" : "")}>{title}</h1>
        ) : null}
        {description ? (
          <p className={cx(bodyClass, title ? "mt-3" : "")}>{description}</p>
        ) : null}
        {actions ? (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        ) : null}
        {children ? <div className="relative mt-5">{children}</div> : null}
      </div>
    </header>
  );
}
