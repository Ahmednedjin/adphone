import { describe, expect, it } from "vitest";

describe("Admin Password Configuration", () => {
  it("should have VITE_ADMIN_PASSWORD environment variable set", () => {
    const adminPassword = process.env.VITE_ADMIN_PASSWORD;
    expect(adminPassword).toBeDefined();
    expect(typeof adminPassword).toBe("string");
    expect(adminPassword!.length).toBeGreaterThan(0);
  });

  it("should have a secure admin password", () => {
    const adminPassword = process.env.VITE_ADMIN_PASSWORD;
    // Password should be at least 6 characters
    expect(adminPassword!.length).toBeGreaterThanOrEqual(6);
  });
});
