export default function CakeCard({
  imageUrl,
  name,
  description,
  feedbackImageUrl,
  showAdminEdit = false,
  onEdit,
}) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl bg-white border border-transparent shadow-sm
        transition-[flex-basis,box-shadow,border-color] duration-[700ms] ease-out
        flex-[0_0_280px] hover:flex-[0_0_660px]
        hover:border-brandPink
        hover:shadow-[0_18px_36px_rgba(200,141,191,0.25)]
      "
    >
      {showAdminEdit && (
        <button
          onClick={onEdit}
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 opacity-0 transition group-hover:opacity-100"
        >
          ✎
        </button>
      )}

      {/* MAIN LAYOUT: left stack + right details */}
      {/* MAIN LAYOUT */}
      <div className="flex p-4 gap-4">
        {/* LEFT IMAGE WRAPPER */}
        <div className="relative w-[280px] h-[280px] overflow-hidden rounded-xl flex-shrink-0">
          {/* IMAGE */}
          <img
            src={imageUrl}
            alt={name}
            className="
    absolute inset-0
    h-full w-full object-cover
    rounded-xl
    transform
    scale-[0.9]
    origin-top-left
    transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]
    group-hover:scale-[1.0]

  "
          />

          {/* NAME (slides down & disappears) */}
          <div
            className="
        absolute bottom-0 right-4 w-full text-center
        transition-all duration-700 ease-out
        group-hover:translate-y-12 group-hover:opacity-0
      "
          >
            <p className="text-sm font-semibold text-ink">{name}</p>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div
          className="
      flex-1 min-w-0
      opacity-0 translate-x-8
      transition-all duration-700 ease-out
      group-hover:opacity-100 group-hover:translate-x-0
    "
        >
          <p className="font-semibold text-sm text-ink">{name}</p>

          {description && (
            <p className="mt-1 text-xs text-muted line-clamp-4">
              {description}
            </p>
          )}

          {feedbackImageUrl && (
            <img
              src={feedbackImageUrl}
              alt="Feedback"
              className="mt-3 h-12 w-12 rounded-xl object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
