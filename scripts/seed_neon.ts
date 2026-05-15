import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { phones } from "../drizzle/schema";
import { phones as localPhones } from "../src/data/phones.ts";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

async function main() {
  console.log("Starting seeding process...");
  const client = postgres(connectionString!);
  const db = drizzle(client);

  try {
    // Convert local phones to DB format
    const dbPhones = localPhones.map(p => ({
      brand: p.brand,
      model: p.name, // In the file it's 'name', in DB it's 'model'
      specs: JSON.stringify(p), // Store full object as JSON string
      imageUrl: p.image,
    }));

    console.log(`Found ${dbPhones.length} phones to seed.`);

    // Insert in chunks to avoid timeout
    const chunkSize = 50;
    for (let i = 0; i < dbPhones.length; i += chunkSize) {
      const chunk = dbPhones.slice(i, i + chunkSize);
      await db.insert(phones).values(chunk);
      console.log(`Inserted chunk ${i / chunkSize + 1}`);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end();
  }
}

main();
