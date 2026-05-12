import { cx, sectionTitleClass, surfaceElevatedClass } from "./designSystem";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/35 p-4 backdrop-blur-sm">
      <div className={cx(surfaceElevatedClass, "w-full max-w-lg overflow-hidden")}>
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
          <h2 className={cx(sectionTitleClass, "text-xl sm:text-2xl")}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-text-secondary transition hover:bg-accent-soft hover:text-plum"
            aria-label="Close modal"
          >
          ✕
          </button>
        </div>
        <div className="px-5 py-4 text-text-primary">{children}</div>
      </div>
    </div>
  );
}
