import { cx, sectionTitleClass, surfaceElevatedClass } from "./designSystem";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/35 p-3 backdrop-blur-sm sm:p-4">
      <div
        className={cx(surfaceElevatedClass, "w-full max-w-lg overflow-hidden")}
      >
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3 sm:px-5 sm:py-4">
          <h2 className={cx(sectionTitleClass, "text-lg sm:text-2xl")}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition hover:bg-accent-soft hover:text-plum"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="px-4 py-4 text-text-primary sm:px-5">{children}</div>
      </div>
    </div>
  );
}
