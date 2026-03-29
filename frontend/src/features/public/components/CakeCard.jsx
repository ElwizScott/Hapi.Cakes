export default function CakeCard({
  imageUrl,
  name,
  description,
  price,
  feedbackImageUrl,
  showAdminEdit = false,
  onEdit,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
        group relative overflow-hidden
        rounded-2xl bg-white border border-transparent shadow-sm
        transition-[flex-basis,box-shadow,border-color] duration-[700ms] ease-out
        w-full md:w-auto flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_280px] md:hover:flex-[0_0_660px]
        hover:border-brandPink
        hover:shadow-[0_18px_36px_rgba(200,141,191,0.25)]
        cursor-pointer
      "
    >
      {showAdminEdit && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 opacity-0 transition group-hover:opacity-100"
        >
          ✎
        </button>
      )}

      {/* MAIN LAYOUT: left stack + right details */}
      {/* MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row p-4 md:p-5 gap-4">
        {/* LEFT IMAGE WRAPPER */}
        <div className="relative w-full md:w-[240px] h-[240px] md:h-[240px] overflow-hidden rounded-xl flex-shrink-0 bg-white">
          {/* IMAGE */}
          <img
            src={imageUrl}
            alt={name}
            className="
              absolute inset-0
              h-full w-full object-cover
              rounded-xl
              transform
              scale-[0.98]
              origin-top-left
              transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]
              md:group-hover:scale-[1.0]
            "
          />

          {/* NAME (slides down & disappears) */}
        </div>

        {/* RIGHT DETAILS */}
        <div
          className="
            flex-1 min-w-0
            opacity-100 translate-x-0
            transition-all duration-700 ease-out
            md:opacity-0 md:translate-x-8
            md:group-hover:opacity-100 md:group-hover:translate-x-0
          "
        >
          <p className="font-semibold text-sm text-ink">{name}</p>
          {Number.isFinite(price) ? (
            <p className="mt-1 text-xs font-semibold text-plum">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0,
              }).format(price)}
            </p>
          ) : null}

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
