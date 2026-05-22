import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../../components/home/HeroSection";
import CategorySection from "../../../components/home/CategorySection";
import FeaturedCakes from "../../../components/home/FeaturedCakes";
import Testimonials from "../../../components/home/Testimonials";
import OrderingProcess from "../../../components/home/OrderingProcess";
import SocialGallery from "../../../components/home/SocialGallery";
import WhyChooseUs from "../../../components/home/WhyChooseUs";
import RevealSection from "../../../components/home/RevealSection";
import useAdminAuth from "../../admin/hooks/useAdminAuth";
import { fetchPublic } from "../../../api/http";
import { fetchCakes } from "../../../api/public/cake.api";
import { fetchCategories } from "../../../api/public/category.api";
import { fetchFeedbackImages } from "../../../api/public/feedback.api";
import EditableText from "../../../components/common/EditableText";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import useAppTranslation from "../../../i18n/useAppTranslation";

export default function Home() {
  const { authenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { t: tHome } = useAppTranslation("home");
  const { t: tCommon } = useAppTranslation("common");
  const [images, setImages] = useState({
    featured: "",
  });
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedbackImages, setFeedbackImages] = useState([]);

  useEffect(() => {
    let isActive = true;
    fetchPublic("/api/public/homepage-images")
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

  useEffect(() => {
    let active = true;
    fetchCakes()
      .then((data) => {
        if (!active) return;
        setCakes(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    fetchCategories()
      .then((data) => {
        if (!active) return;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    fetchFeedbackImages()
      .then((data) => {
        if (!active) return;
        setFeedbackImages(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const categoriesWithImages = useMemo(() => {
    if (!categories.length) return [];
    return categories.slice(0, 3).map((category) => {
      const firstCake = cakes.find(
        (cake) => String(cake.categoryId) === String(category.id),
      );
      return {
        ...category,
        imageUrl: firstCake?.imageUrls?.[0] ?? "",
      };
    });
  }, [categories, cakes]);

  const categoryById = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => map.set(String(category.id), category));
    return map;
  }, [categories]);

  const featuredCakes = useMemo(() => {
    const withImages = cakes.filter((cake) => cake.imageUrls?.[0]);
    const featured = withImages.filter((cake) => cake.featured);
    const list = featured.length ? featured : withImages;
    return list.slice(0, 10);
  }, [cakes]);

  const socialGalleryImages = useMemo(() => {
    const images = cakes.map((cake) => cake.imageUrls?.[0]).filter(Boolean);
    for (let i = images.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    return images.slice(0, 12);
  }, [cakes]);

  const handleFeaturedUpdate = (url) => {
    setImages((prev) => ({ ...prev, featured: url }));
  };

  return (
    <div className="min-h-screen bg-softBg text-ink">
      <HeroSection
        featuredImageUrl={images.featured}
        isAdmin={authenticated}
        onFeaturedImageUploaded={handleFeaturedUpdate}
        onOrderClick={() => navigate("/order")}
        onGalleryClick={() => {
          document.getElementById("special-events")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        onContactClick={() => navigate("/contact")}
      />
      <FeaturedCakes cakes={featuredCakes} categoryById={categoryById} />

      <CategorySection categories={categoriesWithImages} />
      <WhyChooseUs />
      <OrderingProcess onOrderClick={() => navigate("/order")} />
      <Testimonials images={feedbackImages} />
      <SocialGallery images={socialGalleryImages} />

      <RevealSection className="ds-page-shell pb-10 pt-4 sm:pt-10 lg:pb-20">
        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,250,245,0.98),rgba(251,242,250,0.95))] p-4 shadow-soft sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-0 h-32 w-32 rounded-full bg-brandPink/10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-36 w-36 rounded-full bg-lavender/18 blur-3xl" />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plum/75">
                {tHome("cta.eyebrow")}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                <EditableText
                  copyKey="home.cta.title"
                  defaultText={tHome("cta.title")}
                />
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
                {tHome("cta.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                type="button"
                onClick={() => navigate("/order")}
                className="px-6 py-3 text-xs uppercase tracking-[0.18em]"
              >
                {tCommon("buttons.startOrder")}
              </PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={() => navigate("/contact")}
                className="border-white/70 bg-white/78 px-6 py-3 text-xs uppercase tracking-[0.18em]"
              >
                <EditableText
                  copyKey="home.cta.button"
                  defaultText={tHome("cta.button")}
                />
              </SecondaryButton>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
