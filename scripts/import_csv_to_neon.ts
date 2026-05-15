import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { phones } from "../drizzle/schema";
import fs from "fs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

async function main() {
  console.log("Starting CSV import to Neon...");
  const client = postgres(connectionString!);
  const db = drizzle(client);

  try {
    const csvData = fs.readFileSync("/home/ubuntu/upload/phones-export-2026-05-12_10-52-52.csv", "utf-8");
    const lines = csvData.split("\n").filter(line => line.trim() !== "");
    
    // The CSV uses semicolon (;) as separator based on the preview
    const phoneRecords = lines.map(line => {
      const parts = line.split(";");
      // Mapping based on observation:
      // index 2: Full Name
      // index 4: Brand ID (or similar)
      // index 7: Image URL
      // We will store the whole row as JSON in 'specs' for now to ensure no data loss, 
      // and extract key fields for the columns.
      
      const fullName = parts[2] || "Unknown Phone";
      const brand = fullName.split(" ")[0]; // Simple brand extraction
      const model = fullName;
      const imageUrl = parts[7] || "";
      
      return {
        brand: brand,
        model: model,
        imageUrl: imageUrl,
        specs: JSON.stringify({
            id: parts[0],
            slug: parts[1],
            name: parts[2],
            year: parts[5],
            release_date: parts[6],
            image: parts[7],
            quick_specs: {
                screen: parts[9],
                processor: parts[10],
                camera: parts[11],
                front_camera: parts[12],
                memory: parts[13],
                battery: parts[14]
            },
            design: {
                height: parts[15],
                width: parts[16],
                thickness: parts[17],
                weight: parts[18],
                materials: parts[19],
                colors: parts[20],
                frame: parts[21]
            },
            screen: {
                type: parts[22],
                size: parts[23],
                resolution: parts[24],
                ppi: parts[25],
                refresh_rate: parts[26],
                touch_rate: parts[27],
                brightness: parts[28],
                protection: parts[29],
                back_protection: parts[30]
            },
            processor: {
                name: parts[31],
                cores: parts[32],
                frequency: parts[33],
                gpu: parts[34],
                fabrication: parts[35],
                antutu: parts[36]
            },
            memory: {
                storage: parts[37],
                ram: parts[38],
                type: parts[39],
                sd_card: parts[40]
            },
            cameras: {
                main: parts[41],
                ultrawide: parts[42],
                telephoto: parts[43],
                macro: parts[44],
                front: parts[45],
                video: parts[46]
            },
            audio: {
                speakers: parts[47],
                jack: parts[48]
            },
            connectivity: {
                sim: parts[49],
                network: parts[50],
                wifi: parts[51],
                bluetooth: parts[52],
                nfc: parts[53],
                gps: parts[54]
            },
            protection: {
                water: parts[55],
                standard: parts[56]
            },
            battery: {
                capacity: parts[57],
                charging: parts[58],
                wireless: parts[59],
                reverse: parts[60]
            },
            software: {
                os: parts[61],
                ui: parts[62]
            },
            sensors: {
                fingerprint: parts[63],
                face_unlock: parts[64],
                gyroscope: parts[65],
                compass: parts[66],
                proximity: parts[67],
                light: parts[68],
                other: parts[69]
            }
        }),
      };
    });

    console.log(`Found ${phoneRecords.length} records in CSV.`);

    // Clear existing phones to avoid duplicates during this full import
    await db.delete(phones);
    console.log("Cleared existing phone records.");

    // Insert in chunks
    const chunkSize = 50;
    for (let i = 0; i < phoneRecords.length; i += chunkSize) {
      const chunk = phoneRecords.slice(i, i + chunkSize);
      await db.insert(phones).values(chunk);
      console.log(`Imported chunk ${i / chunkSize + 1}`);
    }

    console.log("CSV Import completed successfully!");
  } catch (error) {
    console.error("Error during CSV import:", error);
  } finally {
    await client.end();
  }
}

main();
