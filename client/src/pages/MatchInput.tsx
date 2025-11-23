import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import MoodChips from "@/components/MoodChips";
import { useLocation } from "wouter";
import { useState } from "react";

const matchInputSchema = z.object({
  opponentName: z.string().min(1, "Opponent name is required"),
  opponentStyle: z.string().min(1, "Play style is required"),
  matchHistory: z.string().optional(),
  primaryPlan: z.string().min(10, "Primary game plan is required"),
  opponentTendencies: z.string().min(10, "Opponent tendencies are required"),
  situationsToAvoid: z.string().min(5, "Situations to avoid are required"),
  strengthsToEmphasize: z.string().min(10, "Your strengths are required"),
  coachReminders: z.string().optional(),
  mood: z.string().min(1, "Mood is required"),
  energyLevel: z.number().min(1).max(10),
  hydrationToday: z.string().min(1, "Hydration is required"),
  matchDuration: z.string().min(1, "Match duration is required"),
});

const moods = ["Anxious", "Focused", "Flat", "Energized", "Nervous", "Confident"];

export default function MatchInput() {
  const [, setLocation] = useLocation();
  const [selectedMood, setSelectedMood] = useState("");

  const form = useForm({
    resolver: zodResolver(matchInputSchema),
    defaultValues: {
      opponentName: "",
      opponentStyle: "",
      matchHistory: "",
      primaryPlan: "",
      opponentTendencies: "",
      situationsToAvoid: "",
      strengthsToEmphasize: "",
      coachReminders: "",
      mood: "",
      energyLevel: 5,
      hydrationToday: "",
      matchDuration: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Match data submitted:", data);
    //todo: remove mock functionality - send to backend to generate routine
    setLocation("/routine/preview");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-display font-bold text-4xl text-center mb-2">Match-Day Check-In</h1>
      <p className="text-center text-muted-foreground mb-8">
        Tell us about today's match to personalize your routine
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opponent Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="opponentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opponent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Carlos Vega" {...field} data-testid="input-opponent-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="opponentStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Play Style</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Aggressive baseline player" {...field} data-testid="input-opponent-style" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matchHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match History (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lost last 2 matches" {...field} data-testid="input-match-history" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strategy Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="primaryPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Primary game plan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Control the pace, use variety to keep opponent guessing" 
                        className="min-h-20"
                        {...field} 
                        data-testid="textarea-primary-plan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="opponentTendencies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Opponent tendencies to exploit</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Weak backhand under pressure, struggles with drop shots" 
                        className="min-h-20"
                        {...field} 
                        data-testid="textarea-opponent-tendencies"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situationsToAvoid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Mistakes / situations to avoid</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Don't get into long rallies, avoid losing first serve" 
                        className="min-h-20"
                        {...field} 
                        data-testid="textarea-avoid"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="strengthsToEmphasize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4. Your strengths to emphasize</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Strong forehand, excellent court coverage" 
                        className="min-h-20"
                        {...field} 
                        data-testid="textarea-strengths"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coachReminders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>5. Key reminders from coach (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Stay patient, trust your training" 
                        className="min-h-20"
                        {...field} 
                        data-testid="textarea-coach-reminders"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current State</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling?</FormLabel>
                    <FormControl>
                      <MoodChips
                        moods={moods}
                        selected={selectedMood}
                        onSelect={(mood) => {
                          setSelectedMood(mood);
                          field.onChange(mood);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Energy Level: {field.value}/10</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        data-testid="slider-energy"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hydrationToday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hydration Today (ml)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 800" type="number" {...field} data-testid="input-hydration-today" />
                    </FormControl>
                    <FormDescription>How much water have you had today?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matchDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Match Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 90 minutes" {...field} data-testid="input-match-duration" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg"
            data-testid="button-generate"
          >
            Generate My Pre-Match Routine
          </Button>
        </form>
      </Form>
    </div>
  );
}
