import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressSteps from "@/components/ProgressSteps";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const stepSchemas = [
  z.object({
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
    age: z.string().optional(),
  }),
  z.object({
    sport: z.string().min(1, "Sport is required"),
    position: z.string().optional(),
    preferredMatchTime: z.string().min(1, "Preferred match time is required"),
  }),
  z.object({
    hydrationHabits: z.string().min(1, "Hydration habits are required"),
    dietType: z.string().optional(),
  }),
  z.object({
    mentalTendencies: z.string().min(10, "Please provide more detail about your mental state"),
    performsBestWhen: z.string().min(10, "Please describe when you perform best"),
  }),
];

const steps = ["Bio Info", "Sport Profile", "Habits", "Mental State"];

export default function AthleteSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(stepSchemas[currentStep]),
    defaultValues: formData,
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      return await apiRequest("/api/athlete-profile", {
        method: "POST",
        body: JSON.stringify({
          heightCm: parseInt(profileData.height),
          weightKg: parseInt(profileData.weight),
          age: profileData.age ? parseInt(profileData.age) : null,
          sport: profileData.sport,
          position: profileData.position || null,
          preferredMatchTime: profileData.preferredMatchTime,
          hydrationHabits: profileData.hydrationHabits,
          dietType: profileData.dietType || null,
          mentalTendencies: profileData.mentalTendencies,
          performsBestWhen: profileData.performsBestWhen,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/athlete-profile"] });
      toast({
        title: "Profile created",
        description: "Your athlete profile has been saved successfully",
      });
      setLocation("/match-input");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      form.reset(newFormData);
    } else {
      createProfileMutation.mutate(newFormData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      form.reset(formData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-display font-bold text-4xl text-center mb-2">Athlete Profile Setup</h1>
      <p className="text-center text-muted-foreground mb-8">
        Help us personalize your pre-match routine
      </p>

      <ProgressSteps steps={steps} currentStep={currentStep} />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{steps[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="180" type="number" {...field} data-testid="input-height" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="75" type="number" {...field} data-testid="input-weight" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="22" type="number" {...field} data-testid="input-age" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Tennis, Basketball, Squash" {...field} data-testid="input-sport" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position/Role (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Forward, Point Guard" {...field} data-testid="input-position" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredMatchTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Match Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-match-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="hydrationHabits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typical Daily Water Intake</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2L/day, 8 glasses" {...field} data-testid="input-hydration" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dietType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diet Type (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Vegetarian, Vegan, Omnivore" {...field} data-testid="input-diet" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="mentalTendencies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Before matches, I usually feel...</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Anxious and overthinking, or energized and confident" 
                            className="min-h-24"
                            {...field} 
                            data-testid="textarea-mental-tendencies"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="performsBestWhen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I perform best when I feel...</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Calm and focused, or pumped up with high energy" 
                            className="min-h-24"
                            {...field} 
                            data-testid="textarea-performs-best"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex gap-4 pt-4">
                {currentStep > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack} 
                    disabled={createProfileMutation.isPending}
                    data-testid="button-back"
                  >
                    Back
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={createProfileMutation.isPending}
                  data-testid="button-next"
                >
                  {createProfileMutation.isPending ? "Saving..." : currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
