import { type AthleteProfile, type InsertAthleteProfile, type Routine, type InsertRoutine, type User, type InsertUser, athleteProfiles, routines, users } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

type CreateRoutineData = InsertRoutine & {
  routineText: string;
  meditationScript?: string | null;
  routineAudioUrl: string | null;
};

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Athlete Profile operations
  createAthleteProfile(userId: string, profile: InsertAthleteProfile): Promise<AthleteProfile>;
  getAthleteProfile(id: string): Promise<AthleteProfile | undefined>;
  getAthleteProfileByUserId(userId: string): Promise<AthleteProfile | undefined>;
  updateAthleteProfile(id: string, profile: Partial<InsertAthleteProfile>): Promise<AthleteProfile | undefined>;
  
  // Routine operations
  createRoutine(routine: CreateRoutineData): Promise<Routine>;
  getRoutine(id: string): Promise<Routine | undefined>;
  getRoutinesByAthleteProfile(athleteProfileId: string): Promise<Routine[]>;
  getAllRoutines(): Promise<Routine[]>;
}

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  // Athlete Profile operations
  async createAthleteProfile(userId: string, profile: InsertAthleteProfile): Promise<AthleteProfile> {
    const [created] = await db.insert(athleteProfiles).values({ ...profile, userId }).returning();
    return created;
  }

  async getAthleteProfile(id: string): Promise<AthleteProfile | undefined> {
    const [profile] = await db.select().from(athleteProfiles).where(eq(athleteProfiles.id, id));
    return profile;
  }

  async getAthleteProfileByUserId(userId: string): Promise<AthleteProfile | undefined> {
    const [profile] = await db.select().from(athleteProfiles).where(eq(athleteProfiles.userId, userId));
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
