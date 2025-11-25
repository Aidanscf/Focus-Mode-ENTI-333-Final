// Pure TypeScript types for client-side use (no database imports)
// This file should NEVER import drizzle-orm or any database packages

export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type InsertUser = {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type AthleteProfile = {
  id: string;
  userId: string;
  name: string;
  heightCm: number;
  weightKg: number;
  age: number | null;
  sport: string;
  position: string | null;
  preferredMatchTime: string;
  hydrationHabits: string;
  dietType: string | null;
  mentalTendencies: string;
  performsBestWhen: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InsertAthleteProfile = {
  name: string;
  heightCm: number;
  weightKg: number;
  age?: number;
  sport: string;
  position?: string;
  preferredMatchTime: string;
  hydrationHabits: string;
  dietType?: string;
  mentalTendencies: string;
  performsBestWhen: string;
};

export type StrategyTemplate = {
  primaryPlan: string;
  opponentTendencies: string;
  situationsToAvoid: string;
  strengthsToEmphasize: string;
  coachReminders?: string;
};

export type Routine = {
  id: string;
  athleteProfileId: string;
  opponentName: string;
  opponentStyle: string;
  matchHistory: string | null;
  strategyTemplate: StrategyTemplate;
  mood: string;
  energyLevel: number;
  hydrationTodayMl: number;
  matchDuration: string;
  routineText: string;
  routineAudioUrl: string | null;
  createdAt: Date;
};

export type InsertRoutine = {
  athleteProfileId: string;
  opponentName: string;
  opponentStyle: string;
  matchHistory?: string;
  strategyTemplate: StrategyTemplate;
  mood: string;
  energyLevel: number;
  hydrationTodayMl: number;
  matchDuration: string;
};
