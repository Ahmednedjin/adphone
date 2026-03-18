import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const { phoneName, imageBase64 } = await req.json();

    let prompt = "";
    const parts: any[] = [];

    if (imageBase64) {
      parts.push({
        inlineData: { mimeType: "image/jpeg", data: imageBase64 }
      });
      prompt = `Identify this phone from the image and provide its full specifications. Return JSON only with these exact keys:
name, name_ar, year, release_date, price (USD), price_category (budget/mid/flagship),
quick_screen, quick_processor, quick_camera, quick_front_camera, quick_memory, quick_battery,
design_height, design_width, design_thickness, design_weight, design_materials, design_colors, design_frame,
screen_type, screen_size, screen_resolution, screen_ppi, screen_refresh_rate, screen_touch_rate, screen_brightness, screen_protection, screen_back_protection,
processor_name, processor_cores, processor_frequency, processor_gpu, processor_fabrication, antutu_score,
memory_storage, memory_ram, memory_type, memory_sd_card,
camera_main, camera_ultrawide, camera_telephoto, camera_macro, camera_front, camera_video,
audio_speakers, audio_jack,
connectivity_sim, connectivity_network, connectivity_wifi, connectivity_bluetooth, connectivity_nfc, connectivity_gps,
protection_water, protection_standard,
battery_capacity, battery_charging, battery_wireless, battery_reverse,
software_os, software_ui,
sensor_fingerprint, sensor_face_unlock, sensor_gyroscope, sensor_compass, sensor_proximity, sensor_light, sensor_other.
All values should be strings. Price should be in USD format like "$999". Return only valid JSON, no markdown.`;
    } else {
      prompt = `Provide the full specifications of the phone "${phoneName}". If there's a typo in the name, correct it.
Return JSON only with these exact keys:
name, name_ar, year, release_date, price (USD), price_category (budget/mid/flagship),
quick_screen, quick_processor, quick_camera, quick_front_camera, quick_memory, quick_battery,
design_height, design_width, design_thickness, design_weight, design_materials, design_colors, design_frame,
screen_type, screen_size, screen_resolution, screen_ppi, screen_refresh_rate, screen_touch_rate, screen_brightness, screen_protection, screen_back_protection,
processor_name, processor_cores, processor_frequency, processor_gpu, processor_fabrication, antutu_score,
memory_storage, memory_ram, memory_type, memory_sd_card,
camera_main, camera_ultrawide, camera_telephoto, camera_macro, camera_front, camera_video,
audio_speakers, audio_jack,
connectivity_sim, connectivity_network, connectivity_wifi, connectivity_bluetooth, connectivity_nfc, connectivity_gps,
protection_water, protection_standard,
battery_capacity, battery_charging, battery_wireless, battery_reverse,
software_os, software_ui,
sensor_fingerprint, sensor_face_unlock, sensor_gyroscope, sensor_compass, sensor_proximity, sensor_light, sensor_other.
All values should be strings. Price should be in USD format like "$999". Return only valid JSON, no markdown.`;
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

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error [${response.status}]: ${errText}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const specs = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ specs }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-phone-specs error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
