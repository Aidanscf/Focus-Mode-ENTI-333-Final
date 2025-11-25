import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Zap, Wind, Headphones, CheckCircle2, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl">FocusMode</span>
          </div>
          <Link href="/auth">
            <Button variant="ghost" data-testid="button-signin">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight">
              Master Your Mind Before Every Match
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered pre-match mental preparation routines personalized for your sport, opponent, and mental state
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 h-14 rounded-xl" data-testid="button-get-started">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Everything You Need to Win Mentally
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for athletes who know that mental preparation is just as important as physical training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI-Powered Routines",
                description: "Personalized 10-minute mental preparation sequences generated specifically for your sport, opponent, and current mental state",
              },
              {
                icon: Headphones,
                title: "Guided Audio Meditation",
                description: "Every routine includes text-to-speech audio so you can close your eyes, breathe, and focus completely",
              },
              {
                icon: Target,
                title: "Strategy Integration",
                description: "Input your game plan and opponent tendencies to get tactical reminders woven into your mental routine",
              },
              {
                icon: Zap,
                title: "Smart Nutrition Guidance",
                description: "Receive personalized hydration and carb intake recommendations based on your body weight and match duration",
              },
              {
                icon: CheckCircle2,
                title: "Routine History",
                description: "Track all your past routines and see what mental approaches worked best for different opponents and situations",
              },
              {
                icon: Wind,
                title: "Breathing Techniques",
                description: "Learn proven breathing exercises and visualization methods designed for peak athletic performance",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-8 hover-elevate transition-all" data-testid={`card-feature-${i + 1}`}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From setup to mental mastery in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Create Your Profile", desc: "Tell us about your sport, position, and mental tendencies" },
              { num: "2", title: "Enter Match Details", desc: "Add opponent info, your game plan, and current energy levels" },
              { num: "3", title: "Get Your Routine", desc: "AI generates a personalized mental prep routine in seconds" },
              { num: "4", title: "Focus & Perform", desc: "Listen to your guided meditation and enter the zone" },
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4" data-testid={`step-${i + 1}`}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-xl">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Ready to Win the Mental Game?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join athletes who are using FocusMode to transform their pre-match preparation and compete with confidence
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 h-14 rounded-xl bg-white text-primary hover:bg-white/90"
              data-testid="button-cta-signup"
            >
              Start Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">FocusMode</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © 2025 FocusMode. Built for athletes who compete at their best.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
