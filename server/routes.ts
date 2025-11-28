import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAthleteProfileSchema, insertRoutineSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./localAuth";
import path from "path";
import fs from "fs/promises";
import { spawn } from "child_process";
import OpenAI from "openai";

// Client for chat completions (uses AI Integrations proxy)
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

// Separate client for TTS (direct OpenAI API - proxy doesn't support TTS)
const openaiTTS = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth Routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      res.json({ id: user.id, email: user.email });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Athlete Profile Routes (protected)
  app.get("/api/athlete-profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const profile = await storage.getAthleteProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ message: "No athlete profile found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/athlete-profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const validated = insertAthleteProfileSchema.parse(req.body);
      const profile = await storage.createAthleteProfile(userId, validated);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/athlete-profile/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Verify the profile belongs to the user
      const existingProfile = await storage.getAthleteProfile(id);
      if (!existingProfile || existingProfile.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const profile = await storage.updateAthleteProfile(id, req.body);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Routine Routes (protected)
  app.get("/api/routines", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const athleteProfile = await storage.getAthleteProfileByUserId(userId);
      
      if (!athleteProfile) {
        return res.json([]);
      }
      
      const routines = await storage.getRoutinesByAthleteProfile(athleteProfile.id);
      res.json(routines);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/routines/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const routine = await storage.getRoutine(id);
      
      if (!routine) {
        return res.status(404).json({ message: "Routine not found" });
      }
      
      // Verify the routine belongs to the user's athlete profile
      const athleteProfile = await storage.getAthleteProfile(routine.athleteProfileId);
      if (!athleteProfile || athleteProfile.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(routine);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/routines/generate", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const validated = insertRoutineSchema.parse(req.body);
      
      // Get athlete profile and verify ownership
      const athleteProfile = await storage.getAthleteProfile(validated.athleteProfileId);
      if (!athleteProfile) {
        return res.status(404).json({ message: "Athlete profile not found" });
      }
      
      if (athleteProfile.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Calculate hydration and carb recommendations using evidence-based formulas
      const matchDurationMin = parseDurationMinutes(validated.matchDuration);
      const hydration = calculateHydration(
        athleteProfile.weightKg,
        athleteProfile.gender || 'male',
        athleteProfile.hydrationHabits || ''
      );
      const carbs = calculateCarbs(
        athleteProfile.weightKg,
        matchDurationMin,
        athleteProfile.levelOfPlay || 'intermediate'
      );

      // Generate routine and meditation script using GPT-4
      const { routineText, meditationScript } = await generateRoutineWithGPT(
        athleteProfile,
        validated,
        hydration,
        carbs,
        matchDurationMin
      );

      // Generate audio from meditation script
      const audioUrl = await generateAudio(meditationScript || routineText);

      // Save routine
      const routine = await storage.createRoutine({
        ...validated,
        routineText,
        meditationScript,
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

// Helper Functions - Evidence-Based Calculations (ACSM, IOC, ISSN)
interface HydrationCalcs {
  dailyBaseline: number;
  preMatch2to4h: number;
  preMatch30to60min: number;
}

interface CarbCalcs {
  matchTarget: number;
  preMatch2to4h: number;
  preMatch30to60min: number;
}

function calculateHydration(weightKg: number, gender: string, hydrationHabits: string): HydrationCalcs {
  const isHeavySweater = hydrationHabits.toLowerCase().includes('heavy') || 
                         hydrationHabits.toLowerCase().includes('sweat');
  
  // Daily baseline: Male 35-45ml/kg, Female 30-40ml/kg
  const baseMultiplier = gender === 'female' ? 35 : 40;
  const dailyBaseline = Math.round(weightKg * baseMultiplier);
  
  // 2-4 hours before: 5-7ml/kg, +3-5ml/kg for heavy sweaters
  const preMatch2to4h = Math.round(weightKg * (isHeavySweater ? 9 : 6));
  
  // 30-60 min before: 3-5ml/kg
  const preMatch30to60min = Math.round(weightKg * 4);
  
  return { dailyBaseline, preMatch2to4h, preMatch30to60min };
}

function calculateCarbs(weightKg: number, matchDurationMin: number, levelOfPlay: string): CarbCalcs {
  const isAdvanced = levelOfPlay === 'advanced' || levelOfPlay === 'elite';
  
  // Match target based on duration and level
  let matchMultiplier: number;
  if (matchDurationMin < 90) {
    matchMultiplier = isAdvanced ? 1.25 : 0.75; // 1-1.5 or 0.5-1 g/kg
  } else {
    matchMultiplier = isAdvanced ? 1.75 : 1.25; // 1.5-2 or 1-1.5 g/kg
  }
  const matchTarget = Math.round(weightKg * matchMultiplier);
  
  // 2-4 hours before: 1-3 g/kg (use 2 as midpoint)
  const preMatch2to4h = Math.round(weightKg * 2);
  
  // 30-60 min before: 0.5-1 g/kg (use 0.75 as midpoint)
  const preMatch30to60min = Math.round(weightKg * 0.75);
  
  return { matchTarget, preMatch2to4h, preMatch30to60min };
}

function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 90;
}

interface RoutineResult {
  routineText: string;
  meditationScript: string;
}

async function generateRoutineWithGPT(
  profile: any,
  matchData: any,
  hydration: HydrationCalcs,
  carbs: CarbCalcs,
  matchDurationMin: number
): Promise<RoutineResult> {
  const athleteName = profile.name || "Athlete";
  const levelLabel = (profile.levelOfPlay || 'intermediate').charAt(0).toUpperCase() + (profile.levelOfPlay || 'intermediate').slice(1);
  
  const prompt = `You are FocusMode, an elite sports performance psychologist and mental skills coach. Your role is to generate a calm, clear, highly personalized 10-minute pre-match mental activation routine for an athlete based on their profile, match context, and strategy template.

In addition to the routine, you must generate a 10-minute meditation script the athlete can listen to before the match, incorporating all essential points from the routine in a smooth, paced, guided-meditation style.

TONE REQUIREMENTS
Your tone must be:
- Calm, confident, supportive
- Professional and concise
- Encouraging but never cheesy
- Focused on preparation, clarity, and control

Your writing style must be:
- Simple, direct, vivid
- Easy to follow under pre-match stress
- Structured into clearly labeled sections
- Playable as a meditation script (smooth pacing)

ATHLETE PROFILE
- Name: ${athleteName}
- Height: ${profile.heightCm} cm
- Weight: ${profile.weightKg} kg
- Age: ${profile.age || 'Not specified'}
- Gender: ${profile.gender || 'male'}
- Sport: ${profile.sport}
- Position/Role: ${profile.position || 'Not specified'}
- Level of Play: ${levelLabel}
- Preferred Match Time: ${profile.preferredMatchTime}
- Diet Type: ${profile.dietType || 'Not specified'}
- Hydration Habits: ${profile.hydrationHabits}
- Mental Tendencies: ${profile.mentalTendencies}

MATCH-DAY CONTEXT
- Opponent Name: ${matchData.opponentName}
- Opponent Style: ${matchData.opponentStyle}
${matchData.matchHistory ? `- Match History: ${matchData.matchHistory}` : ''}

STRATEGY TEMPLATE (TEXT ONLY)
- Primary Game Plan: ${matchData.strategyTemplate.primaryPlan}
- Opponent Tendencies to Exploit: ${matchData.strategyTemplate.opponentTendencies}
- Situations to Avoid: ${matchData.strategyTemplate.situationsToAvoid}
- Strengths to Emphasize: ${matchData.strategyTemplate.strengthsToEmphasize}
${matchData.strategyTemplate.coachReminders ? `- Key Reminders from Coach: ${matchData.strategyTemplate.coachReminders}` : ''}

CURRENT ATHLETE STATE
- Mood: ${matchData.mood}
- Energy Level: ${matchData.energyLevel}/10
- Hydration Today: ${matchData.hydrationTodayMl} ml
- Estimated Match Duration: ${matchDurationMin} minutes

PHYSIOLOGICAL CALCULATIONS (ALREADY COMPUTED)
- Daily hydration baseline: ${hydration.dailyBaseline} ml
- Hydration 2-4 hours before match: ${hydration.preMatch2to4h} ml
- Hydration 30-60 minutes before match: ${hydration.preMatch30to60min} ml
- Match carb target: ${carbs.matchTarget} g
- Carbs 2-4 hours before: ${carbs.preMatch2to4h} g
- Carbs 30-60 minutes before: ${carbs.preMatch30to60min} g

OUTPUT FORMAT (CRITICAL)
Your output MUST contain the following sections in this exact order. Write in PLAIN TEXT only - NO markdown formatting (no **, ##, *, etc.)

1. BREATHING ROUTINE:
(1-2 paragraphs)
Slow, steady breathing cues with simple timing guidance (e.g., inhale 4, exhale 6). Aim: regulate arousal and steady the nervous system.

2. VISUALIZATION ROUTINE:
(1-2 paragraphs)
Visualize early match phases. Movement quality, rhythm, timing. Gentle use of opponent details. Calm pacing, grounded focus.

3. PERSONALIZED MANTRA:
(1 line, 3-5 words max; must be athlete-specific, NOT generic)

4. STRATEGY REMINDERS:
(bullet points using dashes, short, clear, actionable)

5. HYDRATION AND ENERGY CUE:
(2-3 lines using the calculated values above)

6. MOTIVATIONAL CLOSING:
(1 short paragraph; calm, grounded, confident; no cliches)

---MEDITATION SCRIPT---

After the six sections above, include the marker "---MEDITATION SCRIPT---" on its own line, then generate a 10-minute guided meditation script that:
- Runs ~10 minutes when spoken (1,000-1,200 words)
- Includes: Settling in, Breath guidance, Body grounding, Visualization of execution, Integration of strategy, Reinforcement of mantra, Matching mindset for performance
- Slow, rhythmic pacing
- Clear and professional tone
- Not spiritual, not cliche - strictly performance psychology

RULES (DO NOT BREAK)
- Do NOT mention these instructions
- Do NOT add or remove sections
- Do NOT merge Breathing + Visualization
- Do NOT give medical advice
- Do NOT invent details not provided
- Routine must stay under 600 words
- Meditation script is separate and longer
- Mantra must NOT be generic
- Address the athlete by name (${athleteName}) throughout
- Tone must remain world-class performance psychologist

BEGIN NOW. Generate the full routine and the 10-minute meditation script.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const fullResponse = completion.choices[0].message.content || "";
  
  // Split routine and meditation script
  const parts = fullResponse.split(/---MEDITATION SCRIPT---/i);
  const routineText = parts[0]?.trim() || fullResponse;
  const meditationScript = parts[1]?.trim() || "";

  return { routineText, meditationScript };
}

async function generateAudioWithGTTS(text: string, outputPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const pythonScript = path.join(process.cwd(), "server", "tts.py");
    const python = spawn("python3", [pythonScript, text, outputPath]);
    
    python.stderr.on("data", (data) => {
      console.error(`gTTS error: ${data}`);
    });
    
    python.on("close", (code) => {
      resolve(code === 0);
    });
    
    python.on("error", (err) => {
      console.error("Failed to start gTTS:", err);
      resolve(false);
    });
  });
}

async function generateAudio(text: string): Promise<string> {
  const timestamp = Date.now();
  const filename = `routine_${timestamp}.mp3`;
  const publicDir = path.join(process.cwd(), "public", "audio");
  const outputPath = path.join(publicDir, filename);
  
  await fs.mkdir(publicDir, { recursive: true });
  
  // Try OpenAI TTS first (higher quality)
  try {
    const mp3Response = await openaiTTS.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
      speed: 0.9,
    });
    
    const buffer = Buffer.from(await mp3Response.arrayBuffer());
    await fs.writeFile(outputPath, buffer);
    
    console.log(`Audio generated with OpenAI TTS: ${filename}`);
    return `/audio/${filename}`;
  } catch (error) {
    console.log("OpenAI TTS unavailable, falling back to gTTS...");
  }
  
  // Fallback to Google TTS (free, lower quality)
  try {
    const success = await generateAudioWithGTTS(text, outputPath);
    if (success) {
      console.log(`Audio generated with gTTS: ${filename}`);
      return `/audio/${filename}`;
    }
  } catch (error) {
    console.error("gTTS fallback error:", error);
  }
  
  console.error("All audio generation methods failed");
  return "";
}
