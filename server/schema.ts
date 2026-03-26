import { pgTable, text, integer, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const appRoleEnum = pgEnum("app_role", ["admin", "user"]);

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  name_ar: text("name_ar").notNull(),
  logo: text("logo"),
  color: text("color").default("#333333"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const phones = pgTable("phones", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  name_ar: text("name_ar"),
  brand_id: uuid("brand_id").references(() => brands.id, { onDelete: "cascade" }).notNull(),
  year: integer("year"),
  release_date: text("release_date"),
  image: text("image"),
  status: text("status").default("published"),
  quick_screen: text("quick_screen"),
  quick_processor: text("quick_processor"),
  quick_camera: text("quick_camera"),
  quick_front_camera: text("quick_front_camera"),
  quick_memory: text("quick_memory"),
  quick_battery: text("quick_battery"),
  design_height: text("design_height"),
  design_width: text("design_width"),
  design_thickness: text("design_thickness"),
  design_weight: text("design_weight"),
  design_materials: text("design_materials"),
  design_colors: text("design_colors"),
  design_frame: text("design_frame"),
  screen_type: text("screen_type"),
  screen_size: text("screen_size"),
  screen_resolution: text("screen_resolution"),
  screen_ppi: text("screen_ppi"),
  screen_refresh_rate: text("screen_refresh_rate"),
  screen_touch_rate: text("screen_touch_rate"),
  screen_brightness: text("screen_brightness"),
  screen_protection: text("screen_protection"),
  screen_back_protection: text("screen_back_protection"),
  processor_name: text("processor_name"),
  processor_cores: text("processor_cores"),
  processor_frequency: text("processor_frequency"),
  processor_gpu: text("processor_gpu"),
  processor_fabrication: text("processor_fabrication"),
  antutu_score: text("antutu_score"),
  memory_storage: text("memory_storage"),
  memory_ram: text("memory_ram"),
  memory_type: text("memory_type"),
  memory_sd_card: text("memory_sd_card"),
  camera_main: text("camera_main"),
  camera_ultrawide: text("camera_ultrawide"),
  camera_telephoto: text("camera_telephoto"),
  camera_macro: text("camera_macro"),
  camera_front: text("camera_front"),
  camera_video: text("camera_video"),
  audio_speakers: text("audio_speakers"),
  audio_jack: text("audio_jack"),
  connectivity_sim: text("connectivity_sim"),
  connectivity_network: text("connectivity_network"),
  connectivity_wifi: text("connectivity_wifi"),
  connectivity_bluetooth: text("connectivity_bluetooth"),
  connectivity_nfc: text("connectivity_nfc"),
  connectivity_gps: text("connectivity_gps"),
  protection_water: text("protection_water"),
  protection_standard: text("protection_standard"),
  battery_capacity: text("battery_capacity"),
  battery_charging: text("battery_charging"),
  battery_wireless: text("battery_wireless"),
  battery_reverse: text("battery_reverse"),
  software_os: text("software_os"),
  software_ui: text("software_ui"),
  sensor_fingerprint: text("sensor_fingerprint"),
  sensor_face_unlock: text("sensor_face_unlock"),
  sensor_gyroscope: text("sensor_gyroscope"),
  sensor_compass: text("sensor_compass"),
  sensor_proximity: text("sensor_proximity"),
  sensor_light: text("sensor_light"),
  sensor_other: text("sensor_other"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const phone_images = pgTable("phone_images", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  phone_id: uuid("phone_id").references(() => phones.id, { onDelete: "cascade" }).notNull(),
  url: text("url").notNull(),
  label: text("label"),
  sort_order: integer("sort_order").default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const admin_users = pgTable("admin_users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const brandsRelations = relations(brands, ({ many }) => ({
  phones: many(phones),
}));

export const phonesRelations = relations(phones, ({ one, many }) => ({
  brands: one(brands, { fields: [phones.brand_id], references: [brands.id] }),
  phone_images: many(phone_images),
}));

export const phoneImagesRelations = relations(phone_images, ({ one }) => ({
  phones: one(phones, { fields: [phone_images.phone_id], references: [phones.id] }),
}));
