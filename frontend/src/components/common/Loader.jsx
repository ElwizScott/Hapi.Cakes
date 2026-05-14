export default function Loader({ label = "Loading..." }) {
  return (
    <div
      className="flex items-center justify-center gap-3 text-text-secondary"
      aria-live="polite"
    >
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-brandPink/70 animate-soft-pulse [animation-delay:0ms]" />
        <span className="h-2.5 w-2.5 rounded-full bg-lavender/80 animate-soft-pulse [animation-delay:180ms]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80 animate-soft-pulse [animation-delay:360ms]" />
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
