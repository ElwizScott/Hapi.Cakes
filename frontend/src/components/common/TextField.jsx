import {
  cx,
  fieldClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldMessageClass,
} from "./designSystem";

export default function TextField({
  label,
  hint,
  error,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <div className={className}>
      {label ? <label className={fieldLabelClass}>{label}</label> : null}
      <input className={cx(fieldClass, inputClassName)} {...props} />
      {error ? <p className={fieldErrorClass}>{error}</p> : null}
      {!error && hint ? <p className={fieldMessageClass}>{hint}</p> : null}
    </div>
  );
}
