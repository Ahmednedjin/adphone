import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("open_id", { length: 64 }).notNull().unique(),
  username: varchar("username", { length: 50 }).unique(),
  passwordHash: text("password_hash"),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  emailVerified: timestamp("email_verified"),
  phoneVerified: timestamp("phone_verified"),
  emailVerificationToken: varchar("email_verification_token", { length: 255 }),
  phoneVerificationCode: varchar("phone_verification_code", { length: 10 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Phones table for storing smartphone specifications and details
 */
export const phones = pgTable("phones", {
  id: serial("id").primaryKey(),
  brand: varchar("brand", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  specs: text("specs").notNull(), // JSON string
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Phone = typeof phones.$inferSelect;
export type InsertPhone = typeof phones.$inferInsert;
