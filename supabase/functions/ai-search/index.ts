import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { query, imageBase64 } = await req.json();

    const messages: any[] = [
      {
        role: "system",
        content: "You correct phone name typos and identify phones. Return ONLY valid JSON: {\"phoneName\": \"corrected name\", \"corrected\": true/false}. No markdown, no extra text."
      }
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
          { type: "text", text: "Identify this phone. Return JSON: {\"phoneName\": \"exact phone name\", \"corrected\": false}" }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: `The user searched for: "${query}". This might have typos or be in Arabic. Correct the phone name to its proper English name. Return JSON only: {"phoneName": "corrected phone name", "corrected": true/false}`
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later", phones: [] }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required", phones: [] }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in AI response");

    const parsed = JSON.parse(jsonMatch[0]);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: phones } = await supabaseClient
      .from("phones")
      .select("id, name, slug, image, year, brand_id, brands(name)")
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
    return new Response(JSON.stringify({
      error: e instanceof Error ? e.message : "Unknown",
      correctedName: null,
      corrected: false,
      phones: [],
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
