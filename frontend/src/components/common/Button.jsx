import {
  buttonGhostClass,
  buttonPrimaryClass,
  buttonSecondaryClass,
  cx,
} from "./designSystem";

const variants = {
  primary: buttonPrimaryClass,
  secondary: buttonSecondaryClass,
  ghost: buttonGhostClass,
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variantClass = variants[variant] ?? variants.primary;
  return <button className={cx(variantClass, className)} {...props}>{children}</button>;
}
