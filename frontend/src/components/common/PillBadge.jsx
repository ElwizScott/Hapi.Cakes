import { badgeClass, cx } from "./designSystem";

export default function PillBadge({
  as: Component = "span",
  className = "",
  children,
  ...props
}) {
  return (
    <Component className={cx(badgeClass, className)} {...props}>
      {children}
    </Component>
  );
}
