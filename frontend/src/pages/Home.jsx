import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
// import FeaturedCakes from "../components/home/FeaturedCakes";
// import PromoBanner from "../components/home/PromoBanner";
// import Testimonials from "../components/home/Testimonials";
// import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <div className="bg-pink-50 min-h-screen text-white text-4xl">
      <HeroSection />
      <CategorySection />
      {/* <FeaturedCakes /> */}
      {/* <PromoBanner /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </div>
  );
}
