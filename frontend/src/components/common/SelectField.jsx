import {
  cx,
  fieldClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldMessageClass,
} from "./designSystem";

export default function SelectField({
  label,
  hint,
  error,
  className = "",
  inputClassName = "",
  children,
  ...props
}) {
  return (
    <div className={className}>
      {label ? <label className={fieldLabelClass}>{label}</label> : null}
      <select className={cx(fieldClass, inputClassName)} {...props}>
        {children}
      </select>
      {error ? <p className={fieldErrorClass}>{error}</p> : null}
      {!error && hint ? <p className={fieldMessageClass}>{hint}</p> : null}
    </div>
  );
}
