const baseClass =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition";

const variants = {
  primary: "bg-[#B895C2] text-white hover:bg-[#B895C2]/90",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  ghost: "text-[#B895C2] hover:bg-hapi-light",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variantClass = variants[variant] ?? variants.primary;
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
