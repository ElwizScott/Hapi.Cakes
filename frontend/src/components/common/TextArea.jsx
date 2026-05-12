import {
  cx,
  fieldClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldMessageClass,
} from "./designSystem";

export default function TextArea({
  label,
  hint,
  error,
  className = "",
  inputClassName = "",
  rows = 4,
  ...props
}) {
  return (
    <div className={className}>
      {label ? <label className={fieldLabelClass}>{label}</label> : null}
      <textarea
        rows={rows}
        className={cx(fieldClass, "min-h-[8rem] resize-y", inputClassName)}
        {...props}
      />
      {error ? <p className={fieldErrorClass}>{error}</p> : null}
      {!error && hint ? <p className={fieldMessageClass}>{hint}</p> : null}
    </div>
  );
}
