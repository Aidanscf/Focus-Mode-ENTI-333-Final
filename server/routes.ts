import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAthleteProfileSchema, insertRoutineSchema } from "@shared/schema";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import OpenAI from "openai";

const execAsync = promisify(exec);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Athlete Profile Routes
  app.get("/api/athlete-profile", async (_req, res) => {
    try {
      const profile = await storage.getFirstAthleteProfile();
      if (!profile) {
        return res.status(404).json({ message: "No athlete profile found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/athlete-profile", async (req, res) => {
    try {
      const validated = insertAthleteProfileSchema.parse(req.body);
      const profile = await storage.createAthleteProfile(validated);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/athlete-profile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await storage.updateAthleteProfile(id, req.body);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Routine Routes
  app.get("/api/routines", async (_req, res) => {
    try {
      const routines = await storage.getAllRoutines();
      res.json(routines);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/routines/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const routine = await storage.getRoutine(id);
      if (!routine) {
        return res.status(404).json({ message: "Routine not found" });
      }
      res.json(routine);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/routines/generate", async (req, res) => {
    try {
      const validated = insertRoutineSchema.parse(req.body);
      
      // Get athlete profile
      const athleteProfile = await storage.getAthleteProfile(validated.athleteProfileId);
      if (!athleteProfile) {
        return res.status(404).json({ message: "Athlete profile not found" });
      }

      // Calculate hydration and carb recommendations
      const hydrationMl = calculateHydration(
        athleteProfile.weightKg,
        validated.matchDuration,
        validated.energyLevel
      );
      const carbsGrams = calculateCarbs(
        athleteProfile.weightKg,
        validated.matchDuration,
        validated.energyLevel
      );

      // Generate routine using GPT-4
      const routineText = await generateRoutineWithGPT(
        athleteProfile,
        validated,
        hydrationMl,
        carbsGrams
      );

      // Generate audio file
      const audioUrl = await generateAudio(routineText);

      // Save routine
      const routine = await storage.createRoutine({
        ...validated,
        routineText,
        routineAudioUrl: audioUrl,
      });

      res.status(201).json(routine);
    } catch (error: any) {
      console.error("Error generating routine:", error);
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper Functions
function calculateHydration(weightKg: number, matchDuration: string, energyLevel: number): number {
  const baseRate = 7; // ml per kg per hour
  const durationHours = parseDuration(matchDuration);
  let multiplier = 1;
  
  if (energyLevel < 5) multiplier = 1.2; // Need more if low energy
  else if (energyLevel >= 8) multiplier = 0.9; // Need less if high energy
  
  return Math.round(weightKg * baseRate * durationHours * multiplier);
}

function calculateCarbs(weightKg: number, matchDuration: string, energyLevel: number): number {
  const durationHours = parseDuration(matchDuration);
  const baseRate = 30; // grams per hour for moderate activity
  let multiplier = 1;
  
  if (energyLevel < 5) multiplier = 1.3; // Need more if low energy
  else if (energyLevel >= 8) multiplier = 0.8; // Need less if high energy
  
  return Math.round(baseRate * durationHours * multiplier);
}

function parseDuration(duration: string): number {
  const match = duration.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 2;
}

async function generateRoutineWithGPT(
  profile: any,
  matchData: any,
  hydrationMl: number,
  carbsGrams: number
): Promise<string> {
  const prompt = `You are an expert sports psychologist creating a personalized pre-match mental preparation routine for an athlete.

Athlete Profile:
- Sport: ${profile.sport}${profile.position ? `, Position: ${profile.position}` : ''}
- Age: ${profile.age || 'Not specified'}
- Physical: ${profile.heightCm}cm, ${profile.weightKg}kg
- Performs Best When: ${profile.performsBestWhen}
- Mental Tendencies: ${profile.mentalTendencies}
- Preferred Match Time: ${profile.preferredMatchTime}

Match Context:
- Opponent: ${matchData.opponentName}
- Opponent Style: ${matchData.opponentStyle}
${matchData.matchHistory ? `- Match History: ${matchData.matchHistory}` : ''}
- Current Mood: ${matchData.mood}
- Energy Level: ${matchData.energyLevel}/10
- Match Duration: ${matchData.matchDuration}

Strategic Plan:
- Primary Plan: ${matchData.strategyTemplate.primaryPlan}
- Opponent Tendencies: ${matchData.strategyTemplate.opponentTendencies}
- Situations to Avoid: ${matchData.strategyTemplate.situationsToAvoid}
- Strengths to Emphasize: ${matchData.strategyTemplate.strengthsToEmphasize}
${matchData.strategyTemplate.coachReminders ? `- Coach Reminders: ${matchData.strategyTemplate.coachReminders}` : ''}

Physical Preparation:
- Recommended Hydration: ${hydrationMl}ml
- Recommended Carbs: ${carbsGrams}g

Create a comprehensive pre-match meditation and mental preparation routine (3-5 minutes when read aloud). Include:
1. Breathing exercises and grounding
2. Mental imagery and visualization specific to their strategy
3. Positive affirmations tailored to their mental tendencies
4. Focus cues and tactical reminders
5. Physical preparation reminders (hydration, nutrition)

Write in second person ("you"), calm and encouraging tone, suitable for audio meditation. Make it specific to this athlete and match.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content || "Unable to generate routine at this time.";
}

async function generateAudio(text: string): Promise<string> {
  try {
    const timestamp = Date.now();
    const filename = `routine_${timestamp}.mp3`;
    const publicDir = path.join(process.cwd(), "public", "audio");
    const outputPath = path.join(publicDir, filename);
    
    await fs.mkdir(publicDir, { recursive: true });
    
    const pythonScript = path.join(process.cwd(), "server", "tts.py");
    const { stderr } = await execAsync(`python3 "${pythonScript}" "${text.replace(/"/g, '\\"')}" "${outputPath}"`);
    
    if (stderr) {
      console.error("TTS stderr:", stderr);
    }
    
    return `/audio/${filename}`;
  } catch (error) {
    console.error("Audio generation error:", error);
    return "";
  }
}
