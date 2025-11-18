import { type User, type InsertUser, type Incident, type InsertIncident, type DetectionEvent, type InsertDetectionEvent, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, incidents, detectionEvents, contacts } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  getAllIncidents(): Promise<Incident[]>;
  deleteIncident(id: number): Promise<void>;
  createDetectionEvent(event: InsertDetectionEvent): Promise<DetectionEvent>;
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    throw new Error("Database storage required for incidents");
  }

  async getAllIncidents(): Promise<Incident[]> {
    throw new Error("Database storage required for incidents");
  }

  async deleteIncident(id: number): Promise<void> {
    throw new Error("Database storage required for incidents");
  }

  async createDetectionEvent(event: InsertDetectionEvent): Promise<DetectionEvent> {
    throw new Error("Database storage required for detection events");
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    throw new Error("Database storage required for contacts");
  }

  async getAllContacts(): Promise<Contact[]> {
    throw new Error("Database storage required for contacts");
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    const [newIncident] = await db.insert(incidents).values(incident).returning();
    return newIncident;
  }

  async getAllIncidents(): Promise<Incident[]> {
    return await db.select().from(incidents).orderBy(desc(incidents.createdAt));
  }

  async deleteIncident(id: number): Promise<void> {
    await db.delete(incidents).where(eq(incidents.id, id));
  }

  async createDetectionEvent(event: InsertDetectionEvent): Promise<DetectionEvent> {
    const [newEvent] = await db.insert(detectionEvents).values(event).returning();
    return newEvent;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.timestamp));
  }
}

export const storage = new DbStorage();
