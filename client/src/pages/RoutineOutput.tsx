import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/AudioPlayer";
import RoutineCard from "@/components/RoutineCard";
import NutritionCard from "@/components/NutritionCard";
import { Wind, Target, Flame, Droplet, Wheat, Loader2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import heroGradient from "@assets/generated_images/hero_meditation_gradient_background.png";

export default function RoutineOutput() {
  const [, setLocation] = useLocation();
  const { id } = useParams();

  const { data: routine, isLoading } = useQuery({
    queryKey: ["/api/routines", id],
    queryFn: async () => {
      const res = await fetch(`/api/routines/${id}`);
      if (!res.ok) throw new Error("Failed to fetch routine");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Routine not found</h1>
          <Button onClick={() => setLocation("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const routineLines = routine.routineText.split('\n').filter((line: string) => line.trim());
  const mantra = routineLines.find((line: string) => 
    line.toLowerCase().includes('mantra') || 
    line.toLowerCase().includes('affirmation')
  ) || routineLines[0];
  
  const strategyLines = routine.strategyTemplate ? [
    routine.strategyTemplate.primaryPlan,
    routine.strategyTemplate.opponentTendencies,
    `Avoid: ${routine.strategyTemplate.situationsToAvoid}`,
    `Emphasize: ${routine.strategyTemplate.strengthsToEmphasize}`,
    routine.strategyTemplate.coachReminders || "",
  ].filter(Boolean) : [];

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
          <h2 className="font-display font-medium text-xl text-white/80 mb-4">Match vs {routine.opponentName}</h2>
          <p className="font-display font-semibold text-3xl md:text-5xl italic text-white max-w-3xl mx-auto leading-relaxed">
            {mantra}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {routine.routineAudioUrl && <AudioPlayer audioUrl={routine.routineAudioUrl} />}

        <div className="space-y-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-8">Your Pre-Match Routine</h2>

          <RoutineCard
            title="Full Routine"
            content={routine.routineText}
            icon={Wind}
          />

          {strategyLines.length > 0 && (
            <RoutineCard
              title="Strategy Reminders"
              content={strategyLines}
              icon={Target}
              variant="highlight"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NutritionCard
              title="Hydration"
              value={routine.hydrationTodayMl.toString()}
              unit="ml"
              icon={Droplet}
              description="Recommended for today"
            />
            <NutritionCard
              title="Energy Level"
              value={routine.energyLevel.toString()}
              unit="/10"
              icon={Flame}
              description={`Current: ${routine.mood}`}
            />
          </div>
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
            onClick={() => setLocation("/history")}
            data-testid="button-save"
          >
            View All Routines
          </Button>
        </div>
      </div>
    </div>
  );
}
