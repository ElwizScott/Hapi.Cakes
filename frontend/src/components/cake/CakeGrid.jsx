import CakeCard from "./CakeCard";

export default function CakeGrid({ cakes = [], variant = "elegant" }) {
  if (!cakes.length) {
    return (
      <p className="text-center text-sm text-slate-500">
        No cakes available yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cakes.map((cake) => (
        <CakeCard key={cake.id ?? cake.name} cake={cake} variant={variant} />
      ))}
    </div>
  );
}
