import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const { query, imageBase64 } = await req.json();

    let prompt = "";
    const parts: any[] = [];

    if (imageBase64) {
      parts.push({ inlineData: { mimeType: "image/jpeg", data: imageBase64 } });
      prompt = `Identify the phone in this image. Return JSON only: {"phoneName": "exact phone name", "corrected": false}. Return only valid JSON.`;
    } else {
      prompt = `The user searched for: "${query}". This might have typos or be in Arabic. Correct the phone name to its proper English name. Return JSON only: {"phoneName": "corrected phone name", "corrected": true/false}. Return only valid JSON.`;
    }
    parts.push({ text: prompt });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }] }),
      }
    );

    if (!response.ok) throw new Error(`Gemini error: ${response.status}`);

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const parsed = JSON.parse(jsonMatch[0]);

    // Search DB with corrected name
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: phones } = await supabase
      .from("phones")
      .select("id, name, slug, image, year, brand_id, brands(name)")
      .eq("status", "published")
      .or(`name.ilike.%${parsed.phoneName}%,name_ar.ilike.%${parsed.phoneName}%`)
      .limit(10);

    return new Response(JSON.stringify({
      correctedName: parsed.phoneName,
      corrected: parsed.corrected,
      phones: phones || [],
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
