const PALETTE = ["bg-brandPink", "bg-lavender", "bg-accent", "bg-candy", "bg-plum/70"];

const LAYOUTS = {
  hero: [
    { top: "6%", left: "4%", size: "h-2.5 w-1", rot: -20, color: 0, anim: "animate-wiggle" },
    { top: "14%", left: "92%", size: "h-3 w-1.5", rot: 35, color: 2, anim: "animate-float-gentle" },
    { top: "38%", left: "1%", size: "h-2 w-2", rot: 0, color: 1, anim: "animate-soft-pulse" },
    { top: "58%", left: "95%", size: "h-2.5 w-1", rot: -55, color: 3, anim: "animate-wiggle" },
    { top: "80%", left: "6%", size: "h-2 w-2", rot: 0, color: 0, anim: "animate-float-delayed" },
    { top: "88%", left: "88%", size: "h-3 w-1.5", rot: 65, color: 2, anim: "animate-float-gentle" },
    { top: "2%", left: "48%", size: "h-2 w-2", rot: 0, color: 4, anim: "animate-soft-pulse" },
  ],
  section: [
    { top: "8%", left: "3%", size: "h-2 w-1", rot: -30, color: 1, anim: "animate-wiggle" },
    { top: "85%", left: "96%", size: "h-2.5 w-1", rot: 40, color: 3, anim: "animate-float-gentle" },
    { top: "50%", left: "99%", size: "h-1.5 w-1.5", rot: 0, color: 0, anim: "animate-soft-pulse" },
  ],
  card: [
    { top: "-4%", left: "88%", size: "h-2 w-1", rot: 25, color: 2, anim: "animate-wiggle" },
    { top: "94%", left: "6%", size: "h-1.5 w-1.5", rot: 0, color: 0, anim: "animate-soft-pulse" },
  ],
};

export default function Sprinkles({ variant = "section", className = "" }) {
  const pieces = LAYOUTS[variant] ?? LAYOUTS.section;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {pieces.map((piece, index) => (
        <span
          key={index}
          className={`absolute ${piece.size} ${PALETTE[piece.color]} rounded-full ${piece.anim} shadow-[0_2px_6px_rgba(110,85,117,0.18)]`}
          style={{
            top: piece.top,
            left: piece.left,
            transform: `rotate(${piece.rot}deg)`,
            animationDelay: `${(index % 5) * 320}ms`,
          }}
        />
      ))}
    </div>
  );
}
