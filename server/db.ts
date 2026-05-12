import { eq, and, ilike } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, phones, type InsertUser, type InsertPhone } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client, { schema: { users, phones } });
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(users).values(user).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: user.name,
        email: user.email,
        lastSignedIn: new Date(),
        role: user.openId === ENV.ownerOpenId ? 'admin' : user.role
      }
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getAllPhones(filter?: { brand?: string; model?: string }) {
  const db = await getDb();
  if (!db) return [];

  try {
    let conditions = [];
    if (filter?.brand?.trim()) {
      conditions.push(ilike(phones.brand, `%${filter.brand.trim()}%`));
    }
    if (filter?.model?.trim()) {
      conditions.push(ilike(phones.model, `%${filter.model.trim()}%`));
    }

    const query = conditions.length > 0 
      ? db.select().from(phones).where(and(...conditions))
      : db.select().from(phones);

    return await query;
  } catch (error) {
    console.error("[Database] Failed to get phones:", error);
    return [];
  }
}

export async function getPhoneById(id: number | string) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const phoneId = typeof id === 'string' ? parseInt(id) : id;
    const result = await db.select().from(phones).where(eq(phones.id, phoneId)).limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get phone:", error);
    return undefined;
  }
}

export async function phoneExists(brand: string, model: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(phones).where(and(eq(phones.brand, brand), eq(phones.model, model))).limit(1);
  return result.length > 0;
}

export async function insertPhone(phone: InsertPhone) {
  const db = await getDb();
  if (!db) return undefined;
  return await db.insert(phones).values(phone).returning();
}

export async function updatePhone(id: number | string, updates: Partial<InsertPhone>) {
  const db = await getDb();
  if (!db) return undefined;
  const phoneId = typeof id === 'string' ? parseInt(id) : id;
  return await db.update(phones).set({ ...updates, updatedAt: new Date() }).where(eq(phones.id, phoneId)).returning();
}

export async function deletePhone(id: number | string) {
  const db = await getDb();
  if (!db) return undefined;
  const phoneId = typeof id === 'string' ? parseInt(id) : id;
  return await db.delete(phones).where(eq(phones.id, phoneId)).returning();
}
