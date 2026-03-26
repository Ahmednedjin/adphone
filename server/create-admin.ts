import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { admin_users } from "./schema.js";
import { eq } from "drizzle-orm";

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error("Usage: tsx server/create-admin.ts <email> <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

const existing = await db.query.admin_users.findFirst({ where: eq(admin_users.email, email) });
if (existing) {
  console.log(`Admin with email ${email} already exists. Updating password...`);
  await db.update(admin_users).set({ password_hash: hash }).where(eq(admin_users.email, email));
} else {
  await db.insert(admin_users).values({ email, password_hash: hash });
}

console.log(`Admin user ${email} created/updated successfully.`);
process.exit(0);
