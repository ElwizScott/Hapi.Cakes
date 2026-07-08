import { useState } from "react";
import { useSiteCopy } from "../../features/public/context/SiteCopyContext";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";
import useAppTranslation from "../../i18n/useAppTranslation";
import {
  cx,
  fieldClass,
  fieldErrorClass,
  buttonPrimaryClass,
  buttonSecondaryClass,
} from "./designSystem";

export default function EditableText({
  copyKey,
  defaultText,
  multiline = false,
  className = "",
  placeholder = "",
}) {
  const { authenticated } = useAdminAuth();
  const { copy, updateCopy } = useSiteCopy();
  const { t } = useAppTranslation("common");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const value = copy?.[copyKey] ?? defaultText;

  const startEdit = () => {
    setDraft(value ?? "");
    setError("");
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateCopy(copyKey, draft);
      setEditing(false);
    } catch (err) {
      setError(t("errors.saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
  };

  if (!authenticated) {
    return <span className={className}>{value}</span>;
  }

  if (editing) {
    return (
      <div className={`inline-flex flex-col gap-2 ${className}`}>
        {multiline ? (
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className={cx(fieldClass, "min-h-[8rem] resize-y")}
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className={fieldClass}
            placeholder={placeholder}
          />
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={cx(buttonPrimaryClass, "px-3 py-1.5 text-xs")}
          >
            {saving ? t("states.saving") : t("buttons.save")}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={cx(buttonSecondaryClass, "px-3 py-1.5 text-xs")}
          >
            {t("buttons.cancel")}
          </button>
          {error ? <span className={fieldErrorClass}>{error}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <span className={`group inline-flex items-center gap-2 ${className}`}>
      <span>{value}</span>
      <button
        type="button"
        onClick={startEdit}
        className="rounded-pill bg-accent-soft px-2.5 py-1 text-xs text-plum opacity-0 transition duration-200 ease-soft group-hover:opacity-100"
        title={t("actions.editText")}
      >
        ✎
      </button>
    </span>
  );
}
