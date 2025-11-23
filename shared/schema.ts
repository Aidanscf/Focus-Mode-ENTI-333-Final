import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Athlete Profile
export const athleteProfiles = pgTable("athlete_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heightCm: integer("height_cm").notNull(),
  weightKg: integer("weight_kg").notNull(),
  age: integer("age"),
  sport: text("sport").notNull(),
  position: text("position"),
  preferredMatchTime: text("preferred_match_time").notNull(),
  hydrationHabits: text("hydration_habits").notNull(),
  dietType: text("diet_type"),
  mentalTendencies: text("mental_tendencies").notNull(),
  performsBestWhen: text("performs_best_when").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Match Sessions and Routines
export const routines = pgTable("routines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  athleteProfileId: varchar("athlete_profile_id").notNull().references(() => athleteProfiles.id),
  opponentName: text("opponent_name").notNull(),
  opponentStyle: text("opponent_style").notNull(),
  matchHistory: text("match_history"),
  strategyTemplate: jsonb("strategy_template").notNull().$type<{
    primaryPlan: string;
    opponentTendencies: string;
    situationsToAvoid: string;
    strengthsToEmphasize: string;
    coachReminders?: string;
  }>(),
  mood: text("mood").notNull(),
  energyLevel: integer("energy_level").notNull(),
  hydrationTodayMl: integer("hydration_today_ml").notNull(),
  matchDuration: text("match_duration").notNull(),
  routineText: text("routine_text").notNull(),
  routineAudioUrl: text("routine_audio_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertAthleteProfileSchema = createInsertSchema(athleteProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRoutineSchema = createInsertSchema(routines).omit({
  id: true,
  createdAt: true,
}).extend({
  strategyTemplate: z.object({
    primaryPlan: z.string(),
    opponentTendencies: z.string(),
    situationsToAvoid: z.string(),
    strengthsToEmphasize: z.string(),
    coachReminders: z.string().optional(),
  }),
});

// Select types
export type AthleteProfile = typeof athleteProfiles.$inferSelect;
export type InsertAthleteProfile = z.infer<typeof insertAthleteProfileSchema>;
export type Routine = typeof routines.$inferSelect;
export type InsertRoutine = z.infer<typeof insertRoutineSchema>;
