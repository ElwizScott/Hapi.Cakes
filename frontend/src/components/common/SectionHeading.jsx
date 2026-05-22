import { bodyClass, cx, eyebrowClass, sectionTitleClass } from "./designSystem";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions = null,
  className = "",
}) {
  const centered = align === "center";

  return (
    <div
      className={cx(
        centered
          ? "flex w-full flex-col items-center justify-center gap-3 text-center sm:flex-col"
          : "flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4",
        className,
      )}
    >
      <div className={cx(centered && "mx-auto max-w-2xl")}>
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        {title ? (
          <h2
            className={cx(
              sectionTitleClass,
              centered && "md:whitespace-nowrap",
              eyebrow ? "mt-2" : "",
            )}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={cx(bodyClass, title ? "mt-2" : "")}>{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full flex-wrap gap-3 sm:w-auto">{actions}</div>
      ) : null}
    </div>
  );
}
