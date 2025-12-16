import { CTASection } from "@/features/landing";
import BenefitsSection from "@/features/landing/components/benefits-section";
import Categories from "@/features/landing/components/categories";
import HeroSection from "@/features/landing/components/hero-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BenefitsSection />
      <Categories />
      <CTASection />
    </div>
  );
}
