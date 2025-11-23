import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/AudioPlayer";
import RoutineCard from "@/components/RoutineCard";
import NutritionCard from "@/components/NutritionCard";
import { Wind, Target, Flame, Droplet, Wheat } from "lucide-react";
import { useLocation } from "wouter";
import heroGradient from "@assets/generated_images/hero_meditation_gradient_background.png";

export default function RoutineOutput() {
  const [, setLocation] = useLocation();

  //todo: remove mock functionality - replace with actual generated routine
  const routine = {
    mantra: "I am calm, focused, and ready. This is my moment.",
    breathing: "Close your eyes. Inhale deeply for 4 counts through your nose. Hold for 4 counts. Exhale slowly for 6 counts through your mouth. Feel tension leaving your shoulders. Repeat 5 times. With each breath, feel yourself settling into calm readiness.",
    strategy: [
      "Control the pace with variety",
      "Exploit opponent's weak backhand under pressure",
      "Avoid long baseline rallies",
      "Emphasize your strong forehand and court coverage",
      "Stay patient and trust your training"
    ],
    hydration: {
      daily: "2625 ml",
      preMarch: "375 ml"
    },
    carbs: "75 g",
    motivation: "You've prepared for this. Your training has built the foundation. Trust your instincts, play your game, and leave it all on the court. You're ready."
  };

  return (
    <div className="min-h-screen">
      <section 
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4 py-16">
          <h2 className="font-display font-medium text-xl text-white/80 mb-4">Your Mantra</h2>
          <p className="font-display font-semibold text-3xl md:text-5xl italic text-white max-w-3xl mx-auto leading-relaxed">
            "{routine.mantra}"
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <AudioPlayer />

        <div className="space-y-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-8">Your Pre-Match Routine</h2>

          <RoutineCard
            title="Breathing & Visualization"
            content={routine.breathing}
            icon={Wind}
          />

          <RoutineCard
            title="Strategy Reminders"
            content={routine.strategy}
            icon={Target}
            variant="highlight"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NutritionCard
              title="Hydration"
              value={routine.hydration.preMarch}
              unit="ml"
              icon={Droplet}
              description="Drink 2 hours before match"
            />
            <NutritionCard
              title="Carbohydrates"
              value={routine.carbs}
              unit="g"
              icon={Wheat}
              description="1-2 hours before match"
            />
          </div>

          <RoutineCard
            title="Motivation"
            content={routine.motivation}
            icon={Flame}
          />
        </div>

        <div className="flex gap-4 pt-8">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setLocation("/")}
            data-testid="button-home"
          >
            Return Home
          </Button>
          <Button 
            className="flex-1"
            onClick={() => {
              console.log("Routine saved");
              setLocation("/");
            }}
            data-testid="button-save"
          >
            Save Routine
          </Button>
        </div>
      </div>
    </div>
  );
}
