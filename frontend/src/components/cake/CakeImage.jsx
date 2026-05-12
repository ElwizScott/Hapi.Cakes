export default function CakeImage({ src, alt, className = "" }) {
  if (src) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-accent-soft text-plum ${className}`}
    >
      No Image
    </div>
  );
}
