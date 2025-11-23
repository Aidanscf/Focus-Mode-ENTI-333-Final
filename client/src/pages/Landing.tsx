import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Zap, Wind } from "lucide-react";
import heroGradient from "@assets/generated_images/hero_meditation_gradient_background.png";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <section 
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4 py-16 max-w-4xl">
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6">
            Master Your Mind.<br/>Dominate Your Match.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            AI-powered pre-match mental preparation routines tailored to your sport, opponent, and mindset.
          </p>
          <Button
            size="lg"
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold text-lg px-8 py-6 rounded-full"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Brain,
              title: "Personalized Routines",
              description: "AI analyzes your profile, opponent, and mental state to create custom pre-match preparation",
            },
            {
              icon: Wind,
              title: "Guided Meditation",
              description: "Text-to-speech audio guides you through breathing exercises and visualization techniques",
            },
            {
              icon: Target,
              title: "Strategic Focus",
              description: "Match-specific tactical reminders based on opponent tendencies and your game plan",
            },
            {
              icon: Zap,
              title: "Science-Based",
              description: "Hydration and nutrition recommendations calibrated to your energy levels and match duration",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6 hover-elevate" data-testid={`card-feature-${i}`}>
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="font-display font-bold text-4xl mb-6">
            Ready to Unlock Your Mental Edge?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join athletes who are transforming their pre-match preparation with AI-powered mental coaching.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-full"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-sign-up"
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
}
