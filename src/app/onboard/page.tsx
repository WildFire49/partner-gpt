"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Onboarding steps
const steps = [
  {
    id: "welcome",
    title: "Welcome to PartnerGPT",
    description:
      "Let's get to know each other better so I can be the best partner for you.",
  },
  {
    id: "basics",
    title: "The Basics",
    description: "Tell me a bit about yourself.",
  },
  {
    id: "interests",
    title: "Your Interests",
    description: "What do you enjoy doing?",
  },
  {
    id: "preferences",
    title: "Your Preferences",
    description: "How would you like me to interact with you?",
  },
  {
    id: "complete",
    title: "All Set!",
    description: "You're ready to start your journey with PartnerGPT.",
  },
];

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [addressStyle, setAddressStyle] = useState("casual");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="container max-w-4xl mx-auto py-12 px-4 flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-12">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step content */}
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {steps[currentStep].title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {steps[currentStep].description}
          </p>

          <div className="flex-1">
            {/* Step-specific content will go here */}
            {currentStep === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">👋</span>
                </div>
                <p className="text-center max-w-md text-muted-foreground">
                  I'm excited to get to know you! In the next few steps, I'll
                  ask you some questions to help personalize your experience.
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    What's your name?
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your name"
                    className="px-4 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="birthdate" className="text-sm font-medium">
                    When's your birthday?
                  </label>
                  <input
                    id="birthdate"
                    type="date"
                    className="px-4 py-2 rounded-md border border-input bg-background"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <p className="text-sm font-medium mb-4">
                  Select your interests:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Reading",
                    "Movies",
                    "Fitness",
                    "Travel",
                    "Music",
                    "Cooking",
                    "Art",
                    "Technology",
                    "Nature",
                    "Sports",
                    "Gaming",
                    "Photography",
                  ].map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center gap-2 p-3 rounded-lg border border-input hover:bg-muted/50 cursor-pointer"
                    >
                      <input type="checkbox" className="rounded" />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    How would you like me to address you?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-input hover:bg-muted/50 cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        value="formal"
                        checked={addressStyle === "formal"}
                        onChange={() => setAddressStyle("formal")}
                      />
                      <span>Formally</span>
                    </label>
                    <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-input hover:bg-muted/50 cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        value="casual"
                        checked={addressStyle === "casual"}
                        onChange={() => setAddressStyle("casual")}
                      />
                      <span>Casually</span>
                    </label>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Communication style preference:
                  </label>
                  <select className="px-4 py-2 rounded-md border border-input bg-background">
                    <option>Supportive and encouraging</option>
                    <option>Direct and straightforward</option>
                    <option>Analytical and thoughtful</option>
                    <option>Playful and humorous</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-2xl font-semibold mb-3">You're all set!</h2>
                <p className="max-w-md text-muted-foreground mb-8">
                  Thank you for sharing about yourself. I'm looking forward to
                  being your AI partner and helping you along your journey.
                </p>
                <Link href="/chat">
                  <Button className="flex items-center gap-2">
                    Start Chatting Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep}>Continue</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
