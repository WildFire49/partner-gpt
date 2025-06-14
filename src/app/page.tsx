import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden">
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </main>
  );
}
