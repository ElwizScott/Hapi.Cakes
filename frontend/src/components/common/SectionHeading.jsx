import {
  bodyClass,
  cx,
  eyebrowClass,
  sectionTitleClass,
} from "./designSystem";

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
        "flex flex-wrap items-end justify-between gap-4",
        centered && "flex-col items-center text-center",
        className,
      )}
    >
      <div className={cx(centered && "max-w-2xl")}>
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        {title ? (
          <h2 className={cx(sectionTitleClass, eyebrow ? "mt-2" : "")}>
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={cx(bodyClass, title ? "mt-2" : "")}>{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
