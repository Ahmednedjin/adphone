import "dotenv/config";
import express from "express";
import session from "express-session";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db.js";
import { brands, phones, phone_images, admin_users } from "./schema.js";
import { eq, ilike, or, desc, asc, and, ne } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json({ limit: "10mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "adphone-secret-2024",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminEmail?: string;
  }
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const admin = await db.query.admin_users.findFirst({ where: eq(admin_users.email, email) });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;
    res.json({ success: true, email: admin.email });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {});
  res.json({ success: true });
});

app.get("/api/auth/me", (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: "Not authenticated" });
  res.json({ id: req.session.adminId, email: req.session.adminEmail });
});

// ─── PUBLIC API ────────────────────────────────────────────────────────────────

app.get("/api/brands", async (_req, res) => {
  try {
    const data = await db.select().from(brands).orderBy(asc(brands.name));
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/phones", async (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit || "40")), 200);
    const data = await db.query.phones.findMany({
      where: eq(phones.status, "published"),
      orderBy: [desc(phones.year), asc(phones.name)],
      limit,
      with: { brands: true },
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/phones/slug/:slug", async (req, res) => {
  try {
    const data = await db.query.phones.findFirst({
      where: and(eq(phones.slug, req.params.slug), eq(phones.status, "published")),
      with: { brands: true },
    });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/phones/brand/:brandSlug", async (req, res) => {
  try {
    const brand = await db.query.brands.findFirst({
      where: eq(brands.slug, req.params.brandSlug),
    });
    if (!brand) return res.status(404).json({ error: "Brand not found" });

    const data = await db.query.phones.findMany({
      where: and(eq(phones.brand_id, brand.id), eq(phones.status, "published")),
      orderBy: [desc(phones.year), asc(phones.name)],
      with: { brands: true },
    });
    res.json({ brand, phones: data });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/phones/similar/:phoneId", async (req, res) => {
  try {
    const { brandId } = req.query;
    const data = await db.query.phones.findMany({
      where: and(
        eq(phones.status, "published"),
        eq(phones.brand_id, String(brandId || "")),
        ne(phones.id, req.params.phoneId)
      ),
      limit: 8,
      with: { brands: true },
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/phones/images/:phoneId", async (req, res) => {
  try {
    const data = await db.query.phone_images.findMany({
      where: eq(phone_images.phone_id, req.params.phoneId),
      orderBy: asc(phone_images.sort_order),
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const q = String(req.query.q || "");
    if (q.length < 2) return res.json([]);
    const data = await db.query.phones.findMany({
      where: and(
        eq(phones.status, "published"),
        or(ilike(phones.name, `%${q}%`), ilike(phones.name_ar, `%${q}%`))
      ),
      limit: 20,
      with: { brands: true },
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ─── AI ────────────────────────────────────────────────────────────────────────

app.post("/api/ai/search", async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) return res.status(503).json({ error: "AI not configured" });

    const { query, imageBase64 } = req.body;
    const parts: any[] = [];

    if (imageBase64) {
      parts.push({ inlineData: { mimeType: "image/jpeg", data: imageBase64 } });
      parts.push({ text: `Identify the phone in this image. Return JSON only: {"phoneName": "exact phone name", "corrected": false}. Return only valid JSON.` });
    } else {
      parts.push({ text: `The user searched for: "${query}". This might have typos or be in Arabic. Correct the phone name to its proper English name. Return JSON only: {"phoneName": "corrected phone name", "corrected": true/false}. Return only valid JSON.` });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) }
    );

    if (!geminiRes.ok) throw new Error(`Gemini error: ${geminiRes.status}`);
    const result = await geminiRes.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]);

    const dbPhones = await db.query.phones.findMany({
      where: and(
        eq(phones.status, "published"),
        or(ilike(phones.name, `%${parsed.phoneName}%`), ilike(phones.name_ar, `%${parsed.phoneName}%`))
      ),
      limit: 10,
      with: { brands: true },
    });

    res.json({ correctedName: parsed.phoneName, corrected: parsed.corrected, phones: dbPhones });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/ai/phone-specs", requireAdmin, async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) return res.status(503).json({ error: "AI not configured" });

    const { phoneName, imageBase64 } = req.body;
    const parts: any[] = [];

    const specKeys = `name, name_ar, year, release_date, quick_screen, quick_processor, quick_camera, quick_front_camera, quick_memory, quick_battery, design_height, design_width, design_thickness, design_weight, design_materials, design_colors, design_frame, screen_type, screen_size, screen_resolution, screen_ppi, screen_refresh_rate, screen_touch_rate, screen_brightness, screen_protection, screen_back_protection, processor_name, processor_cores, processor_frequency, processor_gpu, processor_fabrication, antutu_score, memory_storage, memory_ram, memory_type, memory_sd_card, camera_main, camera_ultrawide, camera_telephoto, camera_macro, camera_front, camera_video, audio_speakers, audio_jack, connectivity_sim, connectivity_network, connectivity_wifi, connectivity_bluetooth, connectivity_nfc, connectivity_gps, protection_water, protection_standard, battery_capacity, battery_charging, battery_wireless, battery_reverse, software_os, software_ui, sensor_fingerprint, sensor_face_unlock, sensor_gyroscope, sensor_compass, sensor_proximity, sensor_light, sensor_other`;

    if (imageBase64) {
      parts.push({ inlineData: { mimeType: "image/jpeg", data: imageBase64 } });
      parts.push({ text: `Identify this phone from the image and provide its full specifications. Return JSON only with these exact keys: ${specKeys}. All values should be strings. Do NOT include any price fields. Return only valid JSON, no markdown.` });
    } else {
      parts.push({ text: `Provide the full specifications of the phone "${phoneName}". If there's a typo in the name, correct it. Return JSON only with these exact keys: ${specKeys}. All values should be strings. Do NOT include any price fields. Return only valid JSON, no markdown.` });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      throw new Error(`Gemini API error [${geminiRes.status}]: ${errText}`);
    }
    const result = await geminiRes.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    const specs = JSON.parse(jsonMatch[0]);

    res.json({ specs });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ─── ADMIN API ─────────────────────────────────────────────────────────────────

app.get("/api/admin/phones", requireAdmin, async (_req, res) => {
  try {
    const data = await db.query.phones.findMany({
      orderBy: desc(phones.created_at),
      limit: 200,
      with: { brands: true },
    });
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/phones", requireAdmin, async (req, res) => {
  try {
    const { brands: _b, ...phoneData } = req.body;
    if (!phoneData.slug) {
      phoneData.slug = (phoneData.name || "phone")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");
    }
    const [inserted] = await db.insert(phones).values(phoneData).returning();
    res.json(inserted);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/phones/:id", requireAdmin, async (req, res) => {
  try {
    const { brands: _b, id: _id, created_at: _c, updated_at: _u, ...phoneData } = req.body;
    const [updated] = await db.update(phones).set({ ...phoneData, updated_at: new Date() }).where(eq(phones.id, req.params.id)).returning();
    res.json(updated);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/admin/phones/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(phones).where(eq(phones.id, req.params.id));
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/brands", requireAdmin, async (req, res) => {
  try {
    const [inserted] = await db.insert(brands).values(req.body).returning();
    res.json(inserted);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/brands/:id", requireAdmin, async (req, res) => {
  try {
    const { id: _id, created_at: _c, ...brandData } = req.body;
    const [updated] = await db.update(brands).set(brandData).where(eq(brands.id, req.params.id)).returning();
    res.json(updated);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/admin/brands/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(brands).where(eq(brands.id, req.params.id));
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ─── FRONTEND ──────────────────────────────────────────────────────────────────

const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
