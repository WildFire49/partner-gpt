import { Check } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Intelligent Conversations",
      description: "Natural, flowing conversations with emotional intelligence and context awareness",
      highlights: [
        "Remembers past conversations and preferences",
        "Recognizes your emotional state",
        "Adapts communication style to your needs",
        "Learns from your feedback over time"
      ]
    },
    {
      title: "Personal Growth",
      description: "Features designed to help you develop and become your best self",
      highlights: [
        "Journal prompts and reflection tools",
        "Goal setting and progress tracking",
        "Personalized growth recommendations",
        "Habit formation assistance"
      ]
    },
    {
      title: "Memory Keeper",
      description: "Never forget important moments, dates, or details",
      highlights: [
        "Stores your stories and memories",
        "Reminds you of important dates",
        "Creates connections between shared experiences",
        "Generates memory summaries and highlights"
      ]
    },
    {
      title: "Interactive Activities",
      description: "Enjoy engaging activities designed to entertain and connect",
      highlights: [
        "Personalized quizzes and games",
        "Thoughtful conversation starters",
        "Interactive storytelling experiences",
        "Daily challenges and prompts"
      ]
    },
    {
      title: "Smart Calendar",
      description: "Plan your activities and special occasions with intelligent suggestions",
      highlights: [
        "Event planning assistance",
        "Celebration reminders",
        "Activity suggestions based on interests",
        "Weather-aware recommendations"
      ]
    },
    {
      title: "Privacy Focused",
      description: "Your data stays private and secure with PartnerGPT",
      highlights: [
        "End-to-end encryption",
        "Privacy-first design",
        "Data deletion options",
        "Transparent data policies"
      ]
    }
  ];

  return (
    <div className="container py-16 md:py-24 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          PartnerGPT Features
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover all the ways PartnerGPT can enrich your life with meaningful
          conversations and experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {features.map((feature) => (
          <div key={feature.title} className="space-y-4 p-6 rounded-xl border border-border bg-card">
            <h2 className="text-2xl font-bold">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.description}</p>
            
            <ul className="space-y-2 pt-4">
              {feature.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-6">
          Ready to experience all these features?
        </p>
        <a 
          href="/onboard"
          className="inline-flex h-10 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium"
        >
          Get Started for Free
        </a>
      </div>
    </div>
  );
}
