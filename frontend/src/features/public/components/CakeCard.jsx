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
        flex-[0_0_120px] hover:flex-[0_0_420px]
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

      {/* CONTENT */}
      <div className="flex h-full items-center gap-4 p-4">
        {/* IMAGE */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-softBg">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>

        {/* DETAILS (hidden until hover) */}
        <div
          className="
            min-w-0 overflow-hidden
            opacity-0 translate-x-2
            transition-all duration-700 ease-out
            group-hover:opacity-100 group-hover:translate-x-0
          "
        >
          <p className="font-semibold text-sm text-ink">{name}</p>

          {description && (
            <p className="mt-1 text-xs text-muted line-clamp-3">
              {description}
            </p>
          )}

          {feedbackImageUrl && (
            <img
              src={feedbackImageUrl}
              alt="Feedback"
              className="mt-2 h-10 w-10 rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
