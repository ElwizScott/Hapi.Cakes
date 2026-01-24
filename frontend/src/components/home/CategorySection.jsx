import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminImageEditOverlay from "../../features/admin/components/AdminImageEditOverlay";

const categories = [
  { label: "Wedding Cakes", type: "wedding" },
  { label: "Birthday Cakes", type: "birthday" },
  { label: "Event Cakes", type: "event" },
];

export default function CategorySection({
  categoryImages,
  isAdmin,
  onCategoryImageUploaded,
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <section className="max-w-7xl mx-auto bg-softBg px-8 py-16 overflow-hidden">
      <h2 className="font-script text-5xl text-center mb-14 text-plum">
        Special Events & Occasions
      </h2>

      <div className="flex justify-center items-stretch gap-10">
        {categories.map((c, index) => {
          const isHovered = hovered === index;
          const isOther = hovered !== null && hovered !== index;
          const isClicked = clickedIndex === index;

          let translate = "";
          if (hovered !== null) {
            if (index < hovered) translate = "-translate-x-6";
            if (index > hovered) translate = "translate-x-6";
          }

          const handleClick = () => {
            if (clickedIndex !== null) return;
            setClickedIndex(index);
            setTimeout(() => {
              navigate(`/gallery?category=${c.type}`);
            }, 300);
          };

          return (
            <div
              key={c.type}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={handleClick}
              className={`
                relative transition-all duration-500 ease-out
                ${translate}
                ${isHovered ? "scale-110 z-20" : ""}
                ${isOther ? "scale-90 opacity-80" : ""}
                ${isClicked ? "scale-125 opacity-0" : ""}
              `}
            >
              <div
                className="
                  group
                  w-[320px]
                  rounded-2xl bg-white p-6 text-center
                  border border-transparent
                  shadow-sm
                  transition-all duration-500
                  hover:border-brandPink
                  hover:shadow-[0_18px_40px_rgba(200,141,191,0.25)]
                "
              >
                {/* Click animates into the gallery without layout shift. */}
                <div className="relative h-80 rounded-xl mb-4 overflow-hidden border border-lavender bg-gradient-to-br from-softBg to-lavender">
                  {categoryImages?.[c.type] && (
                    <img
                      src={categoryImages[c.type]}
                      alt={c.label}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}

                  {isAdmin && (
                    <AdminImageEditOverlay
                      label={`Update ${c.label}`}
                      uploadEndpoint={`/api/admin/upload/category/${c.type}`}
                      currentImageUrl={categoryImages?.[c.type]}
                      onUploaded={(url) =>
                        onCategoryImageUploaded?.(c.type, url)
                      }
                    />
                  )}
                </div>

                <p className="font-serif text-lg text-ink transition-colors duration-300">
                  {c.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
