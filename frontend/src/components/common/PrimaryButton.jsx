import { buttonPrimaryClass, cx } from "./designSystem";

export default function PrimaryButton({
  as: Component = "button",
  className = "",
  type = "button",
  children,
  ...props
}) {
  return (
    <Component className={cx(buttonPrimaryClass, className)} type={type} {...props}>
      {children}
    </Component>
  );
}
