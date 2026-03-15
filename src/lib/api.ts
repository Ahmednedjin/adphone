import { supabase } from "@/integrations/supabase/client";

export type DbPhone = {
  id: string;
  slug: string;
  name: string;
  name_ar: string | null;
  brand_id: string;
  year: number | null;
  release_date: string | null;
  price: string | null;
  price_category: string | null;
  image: string | null;
  status: string | null;
  quick_screen: string | null;
  quick_processor: string | null;
  quick_camera: string | null;
  quick_front_camera: string | null;
  quick_memory: string | null;
  quick_battery: string | null;
  design_height: string | null;
  design_width: string | null;
  design_thickness: string | null;
  design_weight: string | null;
  design_materials: string | null;
  design_colors: string | null;
  design_frame: string | null;
  screen_type: string | null;
  screen_size: string | null;
  screen_resolution: string | null;
  screen_ppi: string | null;
  screen_refresh_rate: string | null;
  screen_touch_rate: string | null;
  screen_brightness: string | null;
  screen_protection: string | null;
  screen_back_protection: string | null;
  processor_name: string | null;
  processor_cores: string | null;
  processor_frequency: string | null;
  processor_gpu: string | null;
  processor_fabrication: string | null;
  antutu_score: string | null;
  memory_storage: string | null;
  memory_ram: string | null;
  memory_type: string | null;
  memory_sd_card: string | null;
  camera_main: string | null;
  camera_ultrawide: string | null;
  camera_telephoto: string | null;
  camera_macro: string | null;
  camera_front: string | null;
  camera_video: string | null;
  audio_speakers: string | null;
  audio_jack: string | null;
  connectivity_sim: string | null;
  connectivity_network: string | null;
  connectivity_wifi: string | null;
  connectivity_bluetooth: string | null;
  connectivity_nfc: string | null;
  connectivity_gps: string | null;
  protection_water: string | null;
  protection_standard: string | null;
  battery_capacity: string | null;
  battery_charging: string | null;
  battery_wireless: string | null;
  battery_reverse: string | null;
  software_os: string | null;
  software_ui: string | null;
  sensor_fingerprint: string | null;
  sensor_face_unlock: string | null;
  sensor_gyroscope: string | null;
  sensor_compass: string | null;
  sensor_proximity: string | null;
  sensor_light: string | null;
  sensor_other: string | null;
  created_at: string;
  updated_at: string;
  brands?: DbBrand;
};

export type DbBrand = {
  id: string;
  slug: string;
  name: string;
  name_ar: string;
  logo: string | null;
  color: string | null;
  created_at: string;
};

export type DbPhoneImage = {
  id: string;
  phone_id: string;
  url: string;
  label: string | null;
  sort_order: number | null;
};

// Fetch all brands
export async function fetchBrands(): Promise<DbBrand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");
  if (error) throw error;
  return data || [];
}

// Fetch phones with brand info
export async function fetchPhones(limit = 50): Promise<DbPhone[]> {
  const { data, error } = await supabase
    .from("phones")
    .select("*, brands(*)")
    .eq("status", "published")
    .order("year", { ascending: false })
    .order("name")
    .limit(limit);
  if (error) throw error;
  return data || [];
}

// Fetch phones by brand
export async function fetchPhonesByBrand(brandSlug: string): Promise<{ brand: DbBrand | null; phones: DbPhone[] }> {
  const { data: brand } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", brandSlug)
    .single();

  if (!brand) return { brand: null, phones: [] };

  const { data: phones, error } = await supabase
    .from("phones")
    .select("*, brands(*)")
    .eq("brand_id", brand.id)
    .eq("status", "published")
    .order("year", { ascending: false })
    .order("name");
  if (error) throw error;
  return { brand, phones: phones || [] };
}

// Fetch single phone by slug
export async function fetchPhoneBySlug(slug: string): Promise<DbPhone | null> {
  const { data, error } = await supabase
    .from("phones")
    .select("*, brands(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) return null;
  return data;
}

// Fetch phone images
export async function fetchPhoneImages(phoneId: string): Promise<DbPhoneImage[]> {
  const { data, error } = await supabase
    .from("phone_images")
    .select("*")
    .eq("phone_id", phoneId)
    .order("sort_order");
  if (error) throw error;
  return data || [];
}

// Search phones
export async function searchPhones(query: string): Promise<DbPhone[]> {
  const { data, error } = await supabase
    .from("phones")
    .select("*, brands(*)")
    .eq("status", "published")
    .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%`)
    .limit(20);
  if (error) throw error;
  return data || [];
}

// Fetch similar phones
export async function fetchSimilarPhones(phone: DbPhone): Promise<DbPhone[]> {
  const { data, error } = await supabase
    .from("phones")
    .select("*, brands(*)")
    .eq("status", "published")
    .neq("id", phone.id)
    .eq("price_category", phone.price_category || "mid")
    .limit(8);
  if (error) throw error;
  return data || [];
}
