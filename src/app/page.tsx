import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustedBySection } from "@/components/landing/trusted-by-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { APISection } from "@/components/landing/api-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <HowItWorksSection />
        <APISection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
