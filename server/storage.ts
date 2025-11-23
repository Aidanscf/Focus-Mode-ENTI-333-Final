import { type AthleteProfile, type InsertAthleteProfile, type Routine, type InsertRoutine, athleteProfiles, routines } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

type CreateRoutineData = InsertRoutine & {
  routineText: string;
  routineAudioUrl: string | null;
};

export interface IStorage {
  // Athlete Profile operations
  createAthleteProfile(profile: InsertAthleteProfile): Promise<AthleteProfile>;
  getAthleteProfile(id: string): Promise<AthleteProfile | undefined>;
  getFirstAthleteProfile(): Promise<AthleteProfile | undefined>;
  updateAthleteProfile(id: string, profile: Partial<InsertAthleteProfile>): Promise<AthleteProfile | undefined>;
  
  // Routine operations
  createRoutine(routine: CreateRoutineData): Promise<Routine>;
  getRoutine(id: string): Promise<Routine | undefined>;
  getRoutinesByAthleteProfile(athleteProfileId: string): Promise<Routine[]>;
  getAllRoutines(): Promise<Routine[]>;
}

export class DbStorage implements IStorage {
  async createAthleteProfile(profile: InsertAthleteProfile): Promise<AthleteProfile> {
    const [created] = await db.insert(athleteProfiles).values(profile).returning();
    return created;
  }

  async getAthleteProfile(id: string): Promise<AthleteProfile | undefined> {
    const [profile] = await db.select().from(athleteProfiles).where(eq(athleteProfiles.id, id));
    return profile;
  }

  async getFirstAthleteProfile(): Promise<AthleteProfile | undefined> {
    const [profile] = await db.select().from(athleteProfiles).limit(1);
    return profile;
  }

  async updateAthleteProfile(id: string, profile: Partial<InsertAthleteProfile>): Promise<AthleteProfile | undefined> {
    const [updated] = await db.update(athleteProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(athleteProfiles.id, id))
      .returning();
    return updated;
  }

  async createRoutine(routine: CreateRoutineData): Promise<Routine> {
    const [created] = await db.insert(routines).values(routine).returning();
    return created;
  }

  async getRoutine(id: string): Promise<Routine | undefined> {
    const [routine] = await db.select().from(routines).where(eq(routines.id, id));
    return routine;
  }

  async getRoutinesByAthleteProfile(athleteProfileId: string): Promise<Routine[]> {
    return await db.select()
      .from(routines)
      .where(eq(routines.athleteProfileId, athleteProfileId))
      .orderBy(desc(routines.createdAt));
  }

  async getAllRoutines(): Promise<Routine[]> {
    return await db.select()
      .from(routines)
      .orderBy(desc(routines.createdAt));
  }
}

export const storage = new DbStorage();
