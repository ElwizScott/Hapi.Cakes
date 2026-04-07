import { useEffect, useRef, useState } from "react";
import { fetchFeedbackImages } from "../../../api/public/feedback.api";
import { fetchAdmin } from "../../../api/http";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import Loader from "../../../components/common/Loader";

export default function Feedback() {
  const { authenticated } = useAdminAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  const loadImages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchFeedbackImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load feedback images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError("");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetchAdmin("/api/admin/feedback-images", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
      }
      await loadImages();
    } catch (err) {
      setUploadError("One or more uploads failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum/70">
            Customer Love
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink font-serif">
            Feedback Gallery
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sweet moments shared by our customers.
          </p>
        </div>

        {authenticated ? (
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full border border-brandPink px-4 py-2 text-xs font-semibold text-brandPink transition hover:bg-brandPink hover:text-white disabled:opacity-60"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add Feedback Images"}
            </button>
          </div>
        ) : null}
      </div>

      {uploadError ? (
        <p className="mt-4 text-sm text-rose-500">{uploadError}</p>
      ) : null}

      {loading ? (
        <div className="mt-10">
          <Loader label="Loading feedback..." />
        </div>
      ) : error ? (
        <p className="mt-10 text-center text-sm text-rose-500">{error}</p>
      ) : images.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          No feedback images yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id ?? image.url}
              className="group overflow-hidden rounded-3xl border border-lavender/40 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(200,141,191,0.25)]"
            >
              <img
                src={image.url ?? image}
                alt="Customer feedback"
                className="h-64 w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
