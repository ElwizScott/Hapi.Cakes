import { buttonSecondaryClass, cx } from "./designSystem";

export default function SecondaryButton({
  as: Component = "button",
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <Component
      className={cx(buttonSecondaryClass, className)}
      type={type}
      {...props}
    >
      {children}
    </Component>
  );
}
