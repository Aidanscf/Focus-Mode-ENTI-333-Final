import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioPlayer from "@/components/AudioPlayer";
import RoutineCard from "@/components/RoutineCard";
import NutritionCard from "@/components/NutritionCard";
import { Wind, Target, Flame, Droplet, Eye, Heart, Sparkles, Loader2, Quote, ListChecks, Headphones } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import heroGradient from "@assets/generated_images/hero_meditation_gradient_background.png";

interface RoutineSection {
  title: string;
  content: string;
  icon: any;
}

function parseRoutineSections(routineText: string): RoutineSection[] {
  const sectionHeaders = [
    { pattern: /\d*\.?\s*BREATHING\s*ROUTINE\s*:?/i, title: "Breathing Routine", icon: Wind },
    { pattern: /\d*\.?\s*VISUALIZATION\s*ROUTINE\s*:?/i, title: "Visualization Routine", icon: Eye },
    { pattern: /\d*\.?\s*PERSONALIZED\s*MANTRA\s*:?/i, title: "Personalized Mantra", icon: Quote },
    { pattern: /\d*\.?\s*STRATEGY\s*REMINDERS?\s*:?/i, title: "Strategy Reminders", icon: ListChecks },
    { pattern: /\d*\.?\s*HYDRATION\s*(AND|&)?\s*ENERGY\s*CUE\s*:?/i, title: "Hydration & Energy", icon: Droplet },
    { pattern: /\d*\.?\s*MOTIVATIONAL\s*CLOSING\s*:?/i, title: "Motivational Closing", icon: Sparkles },
    // Legacy section patterns for backwards compatibility
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
  const usedTitles = new Set<string>();
  
  for (const header of sectionHeaders) {
    // Skip if we already matched a similar section (e.g., "Visualization Routine" vs "Visualization")
    const baseTitle = header.title.replace(/\s*Routine$/, '').replace(/\s*Reminders?$/, '');
    if (usedTitles.has(baseTitle)) continue;
    
    const match = normalizedText.match(header.pattern);
    if (match && match.index !== undefined) {
      usedTitles.add(baseTitle);
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
  const [showMeditation, setShowMeditation] = useState(false);

  const { data: routine, isLoading } = useQuery<{
    id: string;
    opponentName: string;
    routineText: string;
    meditationScript?: string | null;
    routineAudioUrl?: string | null;
    hydrationTodayMl: number;
    energyLevel: number;
    mood: string;
  }>({
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
  
  // Find mantra or closing for hero text
  const mantraSection = sections.find(s => s.title === "Personalized Mantra");
  const closingSection = sections.find(s => s.title === "Motivational Closing" || s.title === "Closing");
  const heroText = mantraSection?.content || closingSection?.content?.split('\n')[0] || "You are ready.";

  return (
    <div className="min-h-screen">
      <section 
        className="relative min-h-[45vh] flex items-center justify-center bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 95, 0.9) 0%, rgba(74, 59, 92, 0.85) 50%, rgba(30, 58, 95, 0.9) 100%), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4 py-20">
          <h2 className="font-display font-medium text-lg text-white/70 mb-6 tracking-wide uppercase">Match vs {routine.opponentName}</h2>
          <p className="font-display font-light text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-relaxed tracking-wide">
            "{heroText}"
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Headphones className="h-5 w-5" />
            <span className="text-sm font-medium">10-Minute Guided Meditation</span>
          </div>
          {routine.routineAudioUrl ? (
            <AudioPlayer audioUrl={routine.routineAudioUrl} />
          ) : (
            <Card className="p-10 bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50">
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="p-5 rounded-full bg-primary/10">
                  <Headphones className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Audio meditation is being generated or was not available for this routine.
                </p>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-8">Your Pre-Match Routine</h2>

          {sections.length > 0 ? (
            sections.map((section, index) => (
              <RoutineCard
                key={index}
                title={section.title}
                content={section.content}
                icon={section.icon}
                variant={section.title === "Personalized Mantra" || section.title === "Affirmations" ? "highlight" : undefined}
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
              title="Hydration Today"
              value={routine.hydrationTodayMl.toString()}
              unit="ml"
              icon={Droplet}
              description="What you've had so far"
            />
            <NutritionCard
              title="Energy Level"
              value={routine.energyLevel.toString()}
              unit="/10"
              icon={Flame}
              description={`Current mood: ${routine.mood}`}
            />
          </div>
        </div>

        {routine.meditationScript && (
          <div className="space-y-6">
            <Button
              variant="outline"
              className="w-full border-border/50"
              onClick={() => setShowMeditation(!showMeditation)}
              data-testid="button-toggle-meditation"
            >
              <Headphones className="h-4 w-4 mr-2" />
              {showMeditation ? "Hide" : "View"} Full Meditation Script
            </Button>
            
            {showMeditation && (
              <Card className="bg-card/90 backdrop-blur-sm shadow-lg shadow-primary/5 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/15">
                      <Headphones className="h-5 w-5 text-primary" />
                    </div>
                    10-Minute Guided Meditation Script
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {routine.meditationScript.split('\n').filter((p: string) => p.trim()).map((paragraph: string, index: number) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="flex gap-4 pt-10">
          <Button 
            variant="outline" 
            className="flex-1 border-border/50"
            onClick={() => setLocation("/home")}
            data-testid="button-home"
          >
            Return Home
          </Button>
          <Button 
            className="flex-1 shadow-lg shadow-primary/20"
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
