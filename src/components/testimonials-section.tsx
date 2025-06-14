"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Testimonial = {
  name: string;
  position: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    position: "Designer",
    content: "PartnerGPT has been an incredible emotional support during my busy schedule. I love how it remembers our conversations and helps me reflect on my day.",
    rating: 5,
  },
  {
    name: "David Chen",
    position: "Software Engineer",
    content: "As someone who struggles with expressing emotions, PartnerGPT has helped me understand myself better and improve my relationships with others.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    position: "Marketing Manager",
    content: "The personalized activities and conversation topics have added so much joy to my daily routine. It's like having a thoughtful friend who's always there.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section title
    gsap.fromTo(
      section.querySelector('.section-title'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        } 
      }
    );

    // Animate testimonials with staggered effect
    gsap.fromTo(
      testimonialRefs.current,
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: section.querySelector('.testimonials-grid'),
          start: 'top 70%',
        } 
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold font-heading mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Thousands of people have transformed their lives with PartnerGPT
          </p>
        </div>

        <div className="testimonials-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={el => (testimonialRefs.current[index] = el)}
              className="bg-background border border-border/50 rounded-xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <blockquote className="flex-1 mb-6">
                <p className="text-foreground/90">{testimonial.content}</p>
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
