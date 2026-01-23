export default function CakeImage({ src, alt, className = "" }) {
  if (src) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-[#B895C2]/15 text-[#B895C2] ${className}`}
    >
      No Image
    </div>
  );
}
