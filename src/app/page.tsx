"use client";

import { CtaSection } from "./components/landingPage/cta";
import { FeaturesSection } from "./components/landingPage/features";
import { Footer } from "./components/landingPage/footer";
import { HeroSection } from "./components/landingPage/hero";
import { PricingSection } from "./components/landingPage/pricing";
import { TestimonialsSection } from "./components/landingPage/testimonials";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}