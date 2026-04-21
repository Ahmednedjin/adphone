import axios from "axios";
import { getDb } from "../db";
import { phones } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

const API_KEY = process.env.MOBILE_API_KEY!;
const BASE_URL = "https://api.mobileapi.dev";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const TRACKED_BRANDS = ["Samsung","Apple","Xiaomi","Huawei","Oppo","Vivo","Realme","OnePlus","Google","Sony","Motorola","Nokia"];

async function phoneExistsInDb(brand: string, model: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(phones).where(and(eq(phones.brand, brand), eq(phones.model, model))).limit(1);
  return result.length > 0;
}

async function savePhone(brand: string, model: string, specs: object, imageUrl: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(phones).values({ brand, model, specs: JSON.stringify(specs), imageUrl });
  console.log(`[Bot] ✅ ${brand} ${model}`);
}

export async function runPhoneBot() {
  console.log("[Bot] 🤖 البوت يعمل...");
  const stats = { added: 0, skipped: 0, errors: 0 };

  for (const brand of TRACKED_BRANDS) {
    try {
      const res = await axios.get(`${BASE_URL}/devices/search`, { params: { name: brand }, headers: { key: API_KEY }, timeout: 10000 });
      const deviceList = res.data?.devices || [];
      await delay(1000);

      for (const device of deviceList.slice(0, 10)) {
        try {
          const name = device.name || device.device_name || "";
          if (!name) continue;
          if (await phoneExistsInDb(brand, name)) { stats.skipped++; continue; }

          const r = await axios.get(`${BASE_URL}/devices/search`, { params: { name }, headers: { key: API_KEY }, timeout: 10000 });
          const s = r.data?.devices?.[0];
          await delay(1500);
          if (!s) { stats.errors++; continue; }

          const specs = {
            general: { brand: s.brand_name || brand, model: name, release_date: s.release_date || "", status: s.status || "" },
            display: { size: s.screen_resolution || "", type: s.display_type || "" },
            hardware: { chipset: s.chipset || "", ram: s.ram || "", storage: s.storage || "", hardware: s.hardware || "" },
            camera: { main: s.camera || "", front: s.front_camera || "" },
            battery: { capacity: s.battery_capacity || "", type: s.battery_type || "" },
            connectivity: { wifi: s.wifi || "", bluetooth: s.bluetooth || "" },
            design: { dimensions: s.dimensions || "", weight: s.weight || "", colors: s.colors || "" },
          };

          await savePhone(brand, name, specs, s.image || s.img || "");
          stats.added++;
        } catch (err) { stats.errors++; }
      }
    } catch (err) { console.error(`[Bot] خطأ ${brand}:`, err); stats.errors++; }
  }

  console.log(`[Bot] 🎉 مضاف: ${stats.added} | موجود: ${stats.skipped} | أخطاء: ${stats.errors}`);
  return stats;
}
