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
    { pattern: /BREATHING\s*(AND|&)?\s*GROUNDING\s*:?/i, title: "Breathing & Grounding", icon: Wind },
    { pattern: /VISUALIZATION\s*:?/i, title: "Visualization", icon: Eye },
    { pattern: /AFFIRMATIONS?\s*:?/i, title: "Affirmations", icon: Heart },
    { pattern: /TACTICAL\s*FOCUS\s*:?/i, title: "Tactical Focus", icon: Target },
    { pattern: /PHYSICAL\s*PREPARATION\s*:?/i, title: "Physical Preparation", icon: Droplet },
    { pattern: /CLOSING\s*:?/i, title: "Closing", icon: Sparkles },
  ];

  const sections: RoutineSection[] = [];
  const normalizedText = routineText
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\*/g, '')
    .replace(/#/g, '');
  
  const sectionMatches: { index: number; endIndex: number; header: typeof sectionHeaders[0] }[] = [];
  
  for (const header of sectionHeaders) {
    const match = normalizedText.match(header.pattern);
    if (match && match.index !== undefined) {
      sectionMatches.push({
        index: match.index,
        endIndex: match.index + match[0].length,
        header,
      });
    }
  }
  
  sectionMatches.sort((a, b) => a.index - b.index);
  
  for (let i = 0; i < sectionMatches.length; i++) {
    const current = sectionMatches[i];
    const next = sectionMatches[i + 1];
    
    const contentStart = current.endIndex;
    const contentEnd = next ? next.index : normalizedText.length;
    
    let content = normalizedText.slice(contentStart, contentEnd).trim();
    
    content = content
      .split('\n')
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(line => line.length > 0)
      .join('\n');
    
    if (content) {
      sections.push({
        title: current.header.title,
        content,
        icon: current.header.icon,
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
