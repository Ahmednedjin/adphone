import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "../drizzle/schema";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

async function main() {
  console.log("Creating Admin user...");
  const client = postgres(connectionString!);
  const db = drizzle(client);

  try {
    const passwordHash = await bcrypt.hash("Admin@ADphone2025", 10);
    
    await db.insert(users).values({
      openId: "admin-manual-001",
      username: "admin",
      passwordHash: passwordHash,
      email: "admin@adphonedz.com",
      role: "admin",
      name: "Site Admin"
    }).onConflictDoUpdate({
      target: users.openId,
      set: {
        passwordHash: passwordHash,
        role: "admin"
      }
    });

    console.log("Admin user created/updated successfully!");
    console.log("Email: admin@adphonedz.com");
    console.log("Password: Admin@ADphone2025");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await client.end();
  }
}

main();
