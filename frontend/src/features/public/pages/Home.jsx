import { useEffect, useState } from "react";
import HeroSection from "../../../components/home/HeroSection";
import CategorySection from "../../../components/home/CategorySection";
import useAdminAuth from "../../admin/hooks/useAdminAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export default function Home() {
  const { authenticated } = useAdminAuth();
  const [images, setImages] = useState({
    featured: "",
    wedding: "",
    birthday: "",
    event: "",
  });

  useEffect(() => {
    let isActive = true;
    fetch(`${API_BASE_URL}/api/public/homepage-images`, {
      credentials: "include",
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((data) => {
        if (!isActive) return;
        setImages((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        if (!isActive) return;
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleFeaturedUpdate = (url) => {
    setImages((prev) => ({ ...prev, featured: url }));
  };

  const handleCategoryUpdate = (type, url) => {
    setImages((prev) => ({ ...prev, [type]: url }));
  };
  return (
    <div className="bg-softBg min-h-screen text-ink">
      <HeroSection
        featuredImageUrl={images.featured}
        isAdmin={authenticated}
        onFeaturedImageUploaded={handleFeaturedUpdate}
      />
      <CategorySection
        categoryImages={images}
        isAdmin={authenticated}
        onCategoryImageUploaded={handleCategoryUpdate}
      />
    </div>
  );
}
