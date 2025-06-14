"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/floating-bubbles";
import { gsap } from "gsap";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const cta = ctaRef.current;

    if (heading && subheading && cta) {
      // Create animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heading,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          subheading,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4" // Start slightly before the heading animation completes
        )
        .fromTo(
          cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3" // Start slightly before the subheading animation completes
        );
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      <FloatingBubbles />
      <div className="container relative py-20 md:py-32 flex flex-col items-center text-center">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold font-heading tracking-tight mb-6 max-w-3xl"
        >
          Your AI Partner for a More Meaningful Life
        </h1>
        
        <p
          ref={subheadingRef}
          className="text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          PartnerGPT understands your emotions, remembers your stories, and helps
          you become the best version of yourself through meaningful
          conversations.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <Link href="/onboard">
            <Button size="lg" className="font-medium px-8">
              Start for Free
            </Button>
          </Link>
          <Link href="/features">
            <Button size="lg" variant="outline" className="font-medium">
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className="mt-20 flex items-center justify-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="w-10 h-10 rounded-full border-2 border-background bg-primary/20"
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Join over <span className="font-semibold">10,000+</span> users
            already connecting
          </p>
        </div>
      </div>
    </section>
  );
}
