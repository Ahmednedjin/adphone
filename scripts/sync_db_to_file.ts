import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { phones } from "../drizzle/schema";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

async function main() {
  console.log("Starting Sync: DB to phones_backup.json...");
  const client = postgres(connectionString!);
  const db = drizzle(client);

  try {
    const dbPhones = await db.select().from(phones);
    
    const formattedPhones = dbPhones.map(p => {
        try {
            return {
                id: p.id,
                brand: p.brand,
                model: p.model,
                imageUrl: p.imageUrl,
                specs: JSON.parse(p.specs)
            };
        } catch (e) {
            return {
                id: p.id,
                brand: p.brand,
                model: p.model,
                imageUrl: p.imageUrl,
                specs: p.specs
            };
        }
    });

    const filePath = path.join(process.cwd(), "shared/phones_backup.json");
    fs.writeFileSync(filePath, JSON.stringify(formattedPhones, null, 2));
    
    console.log(`Successfully synced ${dbPhones.length} phones to shared/phones_backup.json`);
  } catch (error) {
    console.error("Error during sync:", error);
  } finally {
    await client.end();
  }
}

main();
