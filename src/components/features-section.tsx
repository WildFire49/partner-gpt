"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle, Calendar, Brain, Sparkles, Award } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "Emotional Intelligence",
    description: "PartnerGPT understands your emotions and responds with empathy and care.",
    icon: Heart,
  },
  {
    title: "Memorable Conversations",
    description: "Your AI partner remembers your stories, preferences, and important moments.",
    icon: MessageCircle,
  },
  {
    title: "Smart Calendar",
    description: "Plan activities, events, and special occasions for a more fulfilling relationship.",
    icon: Calendar,
  },
  {
    title: "Personal Growth",
    description: "Get insights and guidance to help you become the best version of yourself.",
    icon: Brain,
  },
  {
    title: "Customized Experience",
    description: "Tailor your AI partner's personality and interaction style to your preferences.",
    icon: Sparkles,
  },
  {
    title: "Premium Content",
    description: "Access expert-crafted conversation topics, activities, and relationship games.",
    icon: Award,
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section title
    gsap.fromTo(
      section.querySelector('.section-title'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        } 
      }
    );

    // Animate features with staggered effect
    gsap.fromTo(
      featureRefs.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.15, 
        scrollTrigger: {
          trigger: section.querySelector('.features-grid'),
          start: 'top 70%',
        } 
      }
    );

    // Animate image
    gsap.fromTo(
      section.querySelector('.feature-image'),
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: section.querySelector('.feature-image'),
          start: 'top 70%',
        } 
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center font-heading mb-16">
          Features You'll Love
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="features-grid grid sm:grid-cols-2 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={el => (featureRefs.current[index] = el)}
                className="flex flex-col gap-4 p-6 rounded-lg bg-background border border-border/50 shadow-sm"
              >
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="feature-image relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden order-first lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Replace with actual app screenshot or illustration */}
              <div className="w-3/4 h-3/4 bg-background/90 rounded-xl shadow-2xl border border-border flex items-center justify-center">
                <p className="text-xl font-medium text-center px-4">PartnerGPT App Interface<br />(Placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
