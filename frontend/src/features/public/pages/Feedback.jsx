import { useEffect, useRef, useState } from "react";
import { fetchFeedbackImages } from "../../../api/public/feedback.api";
import { fetchAdmin } from "../../../api/http";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import Loader from "../../../components/common/Loader";
import EditableText from "../../../components/common/EditableText";
import Modal from "../../../components/common/Modal";

export default function Feedback() {
  const { authenticated } = useAdminAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [masonrySpans, setMasonrySpans] = useState({});
  const [aspectRatios, setAspectRatios] = useState({});
  const [lightboxUrl, setLightboxUrl] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const inputRef = useRef(null);

  const masonryRowHeight = 8;
  const masonryGap = 16;
  const masonryRowUnit = masonryRowHeight + masonryGap;

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
      <header className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-brandPink/20 blur-2xl" />
          <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-lavender/30 blur-xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,213,233,0.6),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(225,203,235,0.5),transparent_45%)]" />
        <div className="pointer-events-none absolute right-10 top-8 text-[10px] text-plum/40">
          ✧ ✦ ✧
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
              <EditableText
                copyKey="feedback.header.label"
                defaultText="Customer Love"
              />
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink font-serif">
              <EditableText
                copyKey="feedback.header.title"
                defaultText="Feedback Gallery"
              />
            </h1>
            <p className="mt-2 text-sm text-muted">
              <EditableText
                copyKey="feedback.header.subtitle"
                defaultText="Sweet moments shared by our customers."
                multiline
              />
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
      </header>

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
        <div className="mt-8 grid grid-cols-2 auto-rows-[8px] gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => {
            const url = image.url ?? image;
            const masonryKey = image.id ?? url ?? `feedback-${index}`;
            const span = masonrySpans[masonryKey] ?? 24;
            const aspectRatio = aspectRatios[masonryKey];

            return (
              <button
                key={masonryKey}
                type="button"
                onClick={() => {
                  setLightboxUrl(url);
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                style={{ gridRowEnd: `span ${span}` }}
                className="group relative w-full overflow-hidden rounded-3xl bg-white/80 shadow-[0_16px_34px_rgba(200,141,191,0.2)] transition-transform hover:scale-[1.02] hover:shadow-[0_24px_45px_rgba(200,141,191,0.28)]"
              >
                <div
                  className="w-full"
                  style={aspectRatio ? { aspectRatio } : undefined}
                >
                  <img
                    src={url}
                    alt="Customer feedback"
                    className="block h-full w-full object-cover"
                    loading="lazy"
                    onLoad={(event) => {
                      if (!aspectRatios[masonryKey]) {
                        const { naturalWidth, naturalHeight } =
                          event.currentTarget;
                        if (naturalWidth && naturalHeight) {
                          setAspectRatios((prev) => ({
                            ...prev,
                            [masonryKey]: naturalWidth / naturalHeight,
                          }));
                        }
                      }
                      const container = event.currentTarget.parentElement;
                      if (container) {
                        const height = container.getBoundingClientRect().height;
                        const nextSpan = Math.max(
                          1,
                          Math.ceil(height / masonryRowUnit),
                        );
                        setMasonrySpans((prev) =>
                          prev[masonryKey] === nextSpan
                            ? prev
                            : { ...prev, [masonryKey]: nextSpan },
                        );
                      }
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Modal
        open={lightboxOpen}
        title="Feedback"
        onClose={() => {
          setLightboxOpen(false);
          setLightboxUrl("");
        }}
      >
        {lightboxUrl ? (
          <div className="relative">
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const prevIndex =
                      (lightboxIndex - 1 + images.length) % images.length;
                    const prevUrl = images[prevIndex]?.url ?? images[prevIndex];
                    setLightboxIndex(prevIndex);
                    setLightboxUrl(prevUrl);
                  }}
                  aria-label="Previous feedback image"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIndex = (lightboxIndex + 1) % images.length;
                    const nextUrl = images[nextIndex]?.url ?? images[nextIndex];
                    setLightboxIndex(nextIndex);
                    setLightboxUrl(nextUrl);
                  }}
                  aria-label="Next feedback image"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow"
                >
                  ›
                </button>
              </>
            ) : null}
            <img
              src={lightboxUrl}
              alt="Feedback zoom"
              className="w-full max-h-[80vh] rounded-2xl object-contain"
            />
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
