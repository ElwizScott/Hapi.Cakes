import { useState } from "react";
import Modal from "../../../components/common/Modal";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function AdminImageEditOverlay({
  uploadEndpoint,
  currentImageUrl,
  label,
  onUploaded,
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}${uploadEndpoint}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        setError("Upload failed. Please try again.");
        return;
      }

      const data = await response.json().catch(() => ({}));
      if (data?.url) {
        onUploaded?.(data.url);
        setOpen(false);
        setFile(null);
      }
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition bg-white/90 backdrop-blur rounded-full p-2 shadow-sm text-plum"
        aria-label={`Edit ${label}`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>

      <Modal
        open={open}
        title={label}
        onClose={() => {
          setOpen(false);
          setFile(null);
          setError("");
        }}
      >
        <div className="space-y-4">
          {/* Admin-only image upload for the shared homepage. */}
          <div className="rounded-2xl border border-lavender bg-softBg p-4">
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt={label}
                className="h-40 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl bg-white text-sm text-muted">
                No image yet
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}

          <button
            type="button"
            disabled={!file || loading}
            onClick={handleUpload}
            className="w-full rounded-full bg-brandPink px-4 py-2 text-sm font-semibold text-white transition hover:bg-brandPink/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload image"}
          </button>
        </div>
      </Modal>
    </>
  );
}
