import { eq, and, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, phones, InsertPhone } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Mock data for demonstration
const mockPhones = [
  {
    id: 1,
    brand: "Apple",
    model: "iPhone 15 Pro",
    specs: JSON.stringify({
      processor: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
      display: "6.1-inch OLED",
      battery: "3582mAh",
      camera: "48MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    specs: JSON.stringify({
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      display: "6.8-inch AMOLED",
      battery: "5000mAh",
      camera: "200MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
  {
    id: 3,
    brand: "Xiaomi",
    model: "14 Ultra",
    specs: JSON.stringify({
      processor: "Snapdragon 8 Gen 3 Leading Version",
      ram: "16GB",
      storage: "512GB",
      display: "6.73-inch AMOLED",
      battery: "5300mAh",
      camera: "50MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
  {
    id: 4,
    brand: "Google",
    model: "Pixel 8 Pro",
    specs: JSON.stringify({
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "256GB",
      display: "6.7-inch OLED",
      battery: "5050mAh",
      camera: "50MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
  {
    id: 5,
    brand: "OnePlus",
    model: "12",
    specs: JSON.stringify({
      processor: "Snapdragon 8 Gen 3 Leading Version",
      ram: "12GB",
      storage: "256GB",
      display: "6.82-inch AMOLED",
      battery: "5400mAh",
      camera: "50MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
  {
    id: 6,
    brand: "Motorola",
    model: "Edge 50 Pro",
    specs: JSON.stringify({
      processor: "Snapdragon 8 Gen 3 Leading Version",
      ram: "12GB",
      storage: "512GB",
      display: "6.7-inch AMOLED",
      battery: "5000mAh",
      camera: "50MP Main"
    }),
    imageUrl: "https://via.placeholder.com/200",
    createdAt: new Date(),
  },
];

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
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
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all phones with optional filtering
 */
export async function getAllPhones(filter?: { brand?: string; model?: string }) {
  const db = await getDb();
  
  // If database is not available, use mock data
  if (!db) {
    console.log("[Database] Using mock data for getAllPhones");
    try {
      if (!filter || (!filter.brand && !filter.model)) {
        return mockPhones;
      }

      return mockPhones.filter(phone => {
        const brandMatch = !filter.brand || phone.brand.toLowerCase().includes(filter.brand.toLowerCase());
        const modelMatch = !filter.model || phone.model.toLowerCase().includes(filter.model.toLowerCase());
        return brandMatch && modelMatch;
      });
    } catch (error) {
      console.error("[Database] Failed to filter mock phones:", error);
      return [];
    }
  }

  try {
    let conditions = [];
    if (filter?.brand && filter.brand.trim()) {
      // Use LIKE for partial matching
      conditions.push(like(phones.brand, `%${filter.brand.trim()}%`));
    }
    if (filter?.model && filter.model.trim()) {
      // Use LIKE for partial matching
      conditions.push(like(phones.model, `%${filter.model.trim()}%`));
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

/**
 * Get a single phone by ID
 */
export async function getPhoneById(id: number) {
  const db = await getDb();
  
  // If database is not available, use mock data
  if (!db) {
    console.log("[Database] Using mock data for phone by ID");
    return mockPhones.find(phone => phone.id === id);
  }

  try {
    const result = await db.select().from(phones).where(eq(phones.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get phone:", error);
    return undefined;
  }
}

/**
 * Check if a phone already exists by brand and model
 */
export async function phoneExists(brand: string, model: string) {
  const db = await getDb();
  
  // If database is not available, use mock data
  if (!db) {
    console.log("[Database] Using mock data to check existence");
    return mockPhones.some(phone => phone.brand === brand && phone.model === model);
  }

  try {
    const result = await db
      .select()
      .from(phones)
      .where(and(eq(phones.brand, brand), eq(phones.model, model)))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to check phone existence:", error);
    return false;
  }
}

/**
 * Insert a new phone
 */
export async function insertPhone(phone: InsertPhone) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert phone: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(phones).values(phone);
    return result;
  } catch (error) {
    console.error("[Database] Failed to insert phone:", error);
    throw error;
  }
}

/**
 * Update an existing phone
 */
export async function updatePhone(id: number, updates: Partial<InsertPhone>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update phone: database not available");
    return undefined;
  }

  try {
    const result = await db.update(phones).set(updates).where(eq(phones.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update phone:", error);
    throw error;
  }
}

/**
 * Delete a phone
 */
export async function deletePhone(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete phone: database not available");
    return undefined;
  }

  try {
    const result = await db.delete(phones).where(eq(phones.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete phone:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
