import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/AudioPlayer";
import RoutineCard from "@/components/RoutineCard";
import NutritionCard from "@/components/NutritionCard";
import { Wind, Target, Flame, Droplet, Eye, Heart, Brain, Sparkles, Loader2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import heroGradient from "@assets/generated_images/hero_meditation_gradient_background.png";

interface RoutineSection {
  title: string;
  content: string;
  icon: any;
}

function parseRoutineSections(routineText: string): RoutineSection[] {
  const sectionHeaders = [
    { key: "BREATHING AND GROUNDING:", title: "Breathing & Grounding", icon: Wind },
    { key: "VISUALIZATION:", title: "Visualization", icon: Eye },
    { key: "AFFIRMATIONS:", title: "Affirmations", icon: Heart },
    { key: "TACTICAL FOCUS:", title: "Tactical Focus", icon: Target },
    { key: "PHYSICAL PREPARATION:", title: "Physical Preparation", icon: Droplet },
    { key: "CLOSING:", title: "Closing", icon: Sparkles },
  ];

  const sections: RoutineSection[] = [];
  
  for (let i = 0; i < sectionHeaders.length; i++) {
    const currentHeader = sectionHeaders[i];
    const nextHeader = sectionHeaders[i + 1];
    
    const startIndex = routineText.indexOf(currentHeader.key);
    if (startIndex === -1) continue;
    
    const contentStart = startIndex + currentHeader.key.length;
    let contentEnd = routineText.length;
    
    if (nextHeader) {
      const nextIndex = routineText.indexOf(nextHeader.key);
      if (nextIndex !== -1) {
        contentEnd = nextIndex;
      }
    }
    
    const content = routineText.slice(contentStart, contentEnd).trim();
    if (content) {
      sections.push({
        title: currentHeader.title,
        content,
        icon: currentHeader.icon,
      });
    }
  }
  
  return sections;
}

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

  const sections = parseRoutineSections(routine.routineText);
  
  const affirmationSection = sections.find(s => s.title === "Affirmations");
  const closingSection = sections.find(s => s.title === "Closing");
  const heroText = closingSection?.content || affirmationSection?.content?.split('\n')[0] || "You are ready.";

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
          <p className="font-display font-semibold text-2xl md:text-4xl italic text-white max-w-3xl mx-auto leading-relaxed">
            {heroText}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        {routine.routineAudioUrl && <AudioPlayer audioUrl={routine.routineAudioUrl} />}

        <div className="space-y-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-8">Your Pre-Match Routine</h2>

          {sections.length > 0 ? (
            sections.map((section, index) => (
              <RoutineCard
                key={index}
                title={section.title}
                content={section.content}
                icon={section.icon}
                variant={section.title === "Affirmations" ? "highlight" : undefined}
              />
            ))
          ) : (
            <RoutineCard
              title="Full Routine"
              content={routine.routineText}
              icon={Wind}
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
            onClick={() => setLocation("/home")}
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
