import { constructMetadata } from "@/core/lib/seo";
import { CTASection } from "@/features/landing";
import BenefitsSection from "@/features/landing/components/benefits-section";
import Collections from "@/features/landing/components/categories";
import HeroSection from "@/features/landing/components/hero-section";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("home");
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BenefitsSection />
      <Collections />
      <CTASection />
    </div>
  );
}
