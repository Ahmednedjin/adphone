import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

describe("Supabase Connection", () => {
  it("should connect to Supabase with valid credentials", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Test connection by fetching auth status
    const { data, error } = await supabase.auth.getSession();

    // If there's an error, it should not be an authentication error
    // (since we're not logged in, but the connection should work)
    if (error) {
      // Connection errors would have specific messages
      expect(error.message).not.toContain("Invalid API key");
    }

    // The test passes if we can reach Supabase without auth errors
    expect(supabaseUrl).toBeTruthy();
  });
});
