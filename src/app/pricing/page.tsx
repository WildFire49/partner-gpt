"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type PricingPeriod = "monthly" | "annual";

const plans = [
  {
    name: "Free",
    description: "Basic features to get started with PartnerGPT.",
    price: {
      monthly: 0,
      annual: 0
    },
    features: [
      "Daily conversations (limited to 20/day)",
      "Basic memory capabilities",
      "Simple journal entries",
      "Community support"
    ],
    cta: "Get Started",
    href: "/onboard",
    highlighted: false
  },
  {
    name: "Premium",
    description: "Enhanced features for deeper connections.",
    price: {
      monthly: 9.99,
      annual: 7.99
    },
    features: [
      "Unlimited conversations",
      "Advanced memory capabilities",
      "Detailed journal entries with insights",
      "Custom activity suggestions",
      "Priority support",
      "No ads"
    ],
    cta: "Go Premium",
    href: "/onboard?plan=premium",
    highlighted: true
  },
  {
    name: "Ultimate",
    description: "Full suite of features for the ultimate experience.",
    price: {
      monthly: 19.99,
      annual: 14.99
    },
    features: [
      "Everything in Premium",
      "Multiple AI personalities",
      "Advanced analytics and insights",
      "Early access to new features",
      "1-on-1 onboarding session",
      "Premium content library"
    ],
    cta: "Get Ultimate",
    href: "/onboard?plan=ultimate",
    highlighted: false
  }
];

export default function PricingPage() {
  const [period, setPeriod] = useState<PricingPeriod>("monthly");

  return (
    <div className="container py-16 md:py-24 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1 border border-border rounded-lg">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              period === "monthly" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              period === "annual" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setPeriod("annual")}
          >
            Annual <span className="text-xs opacity-75">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative flex flex-col p-6 rounded-xl border ${
              plan.highlighted 
                ? "border-primary shadow-lg shadow-primary/10 -mt-2" 
                : "border-border"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
            )}
            
            <div className="mb-5">
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">
                  ${plan.price[period]}
                </span>
                {plan.price[period] > 0 && (
                  <span className="text-muted-foreground ml-2">
                    / {period === "monthly" ? "month" : "month, billed yearly"}
                  </span>
                )}
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href={plan.href} className="mt-auto">
              <Button 
                className="w-full" 
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      
      {/* FAQ section */}
      <div className="pt-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Can I switch plans later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of the next billing cycle.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes! The Free plan is available indefinitely with limited features. You can upgrade anytime.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards and PayPal. All payments are processed securely.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Can I cancel anytime?</h3>
            <p className="text-muted-foreground">
              Absolutely. There are no contracts or commitments. You can cancel your subscription at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
