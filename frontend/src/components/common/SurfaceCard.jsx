import { cx, surfaceCardClass, surfaceElevatedClass } from "./designSystem";

export default function SurfaceCard({
  as: Component = "div",
  elevated = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={cx(
        elevated ? surfaceElevatedClass : surfaceCardClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
