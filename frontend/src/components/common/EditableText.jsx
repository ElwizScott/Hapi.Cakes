import { useState } from "react";
import { useSiteCopy } from "../../features/public/context/SiteCopyContext";
import useAdminAuth from "../../features/admin/hooks/useAdminAuth";

export default function EditableText({
  copyKey,
  defaultText,
  multiline = false,
  className = "",
  placeholder = "",
}) {
  const { authenticated } = useAdminAuth();
  const { copy, updateCopy } = useSiteCopy();
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
      setError("Save failed.");
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
            className="w-full rounded-xl border border-lavender bg-softBg px-3 py-2 text-sm text-ink"
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-full rounded-xl border border-lavender bg-softBg px-3 py-2 text-sm text-ink"
            placeholder={placeholder}
          />
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600"
          >
            Cancel
          </button>
          {error ? <span className="text-xs text-rose-500">{error}</span> : null}
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
        className="rounded-full bg-lavender/60 px-2 py-1 text-xs text-ink opacity-0 transition group-hover:opacity-100"
        title="Edit text"
      >
        ✎
      </button>
    </span>
  );
}
