"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      }
    });

    tl.fromTo(
      section.querySelector('.cta-content'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    ).fromTo(
      section.querySelector('.cta-buttons'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.3" // Start slightly before the content animation completes
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content space-y-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Start Your Journey with PartnerGPT Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience meaningful conversations, emotional growth, and a supportive AI partner that understands you.
            </p>
          </div>
          
          <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/onboard">
              <Button size="lg" className="font-medium px-8 text-base">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="font-medium text-base">
                View Plans
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Start with our free plan today.
          </p>
        </div>
      </div>
    </section>
  );
}
