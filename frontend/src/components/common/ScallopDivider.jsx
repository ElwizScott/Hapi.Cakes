import { useId } from "react";
import { cx } from "./designSystem";

export default function ScallopDivider({
  className = "",
  fillClassName = "text-surface",
  flip = false,
  size = "md",
}) {
  const patternId = useId();
  const heightClass =
    size === "lg" ? "h-7 sm:h-10" : size === "sm" ? "h-3 sm:h-4" : "h-5 sm:h-7";

  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none w-full overflow-hidden leading-none", className)}
    >
      <svg
        viewBox="0 0 240 20"
        preserveAspectRatio="none"
        className={cx("block w-full", heightClass, fillClassName, flip ? "rotate-180" : "")}
      >
        <defs>
          <pattern
            id={patternId}
            width="24"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="0" r="11.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="240" height="20" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
