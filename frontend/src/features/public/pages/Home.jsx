import HeroSection from "../../../components/home/HeroSection";
import CategorySection from "../../../components/home/CategorySection";

export default function Home() {
  return (
    <div className="bg-softBg min-h-screen text-ink">
      <HeroSection />
      <CategorySection />
    </div>
  );
}
