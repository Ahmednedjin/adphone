export type DbPhone = {
  id: string;
  slug: string;
  name: string;
  name_ar: string | null;
  brand_id: string;
  year: number | null;
  release_date: string | null;
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

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export async function fetchBrands(): Promise<DbBrand[]> {
  return apiFetch<DbBrand[]>("/api/brands");
}

export async function fetchPhones(limit = 50): Promise<DbPhone[]> {
  return apiFetch<DbPhone[]>(`/api/phones?limit=${limit}`);
}

export async function fetchPhonesByBrand(brandSlug: string): Promise<{ brand: DbBrand | null; phones: DbPhone[] }> {
  try {
    return await apiFetch<{ brand: DbBrand; phones: DbPhone[] }>(`/api/phones/brand/${brandSlug}`);
  } catch {
    return { brand: null, phones: [] };
  }
}

export async function fetchPhoneBySlug(slug: string): Promise<DbPhone | null> {
  try {
    return await apiFetch<DbPhone>(`/api/phones/slug/${slug}`);
  } catch {
    return null;
  }
}

export async function fetchPhoneImages(phoneId: string): Promise<DbPhoneImage[]> {
  return apiFetch<DbPhoneImage[]>(`/api/phones/images/${phoneId}`);
}

export async function searchPhones(query: string): Promise<DbPhone[]> {
  return apiFetch<DbPhone[]>(`/api/search?q=${encodeURIComponent(query)}`);
}

export async function fetchSimilarPhones(phone: DbPhone): Promise<DbPhone[]> {
  return apiFetch<DbPhone[]>(`/api/phones/similar/${phone.id}?brandId=${phone.brand_id}`);
}

export async function aiSearch(query: string, imageBase64?: string): Promise<{ correctedName: string; corrected: boolean; phones: DbPhone[] }> {
  return apiFetch("/api/ai/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, imageBase64 }),
  });
}

export async function aiPhoneSpecs(phoneName: string, imageBase64?: string): Promise<{ specs: Partial<DbPhone> }> {
  return apiFetch("/api/ai/phone-specs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneName, imageBase64 }),
  });
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; email: string }> {
  return apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogout(): Promise<void> {
  await apiFetch("/api/auth/logout", { method: "POST" });
}

export async function getMe(): Promise<{ id: string; email: string } | null> {
  try {
    return await apiFetch<{ id: string; email: string }>("/api/auth/me");
  } catch {
    return null;
  }
}

export async function adminFetchPhones(): Promise<DbPhone[]> {
  return apiFetch<DbPhone[]>("/api/admin/phones");
}

export async function adminCreatePhone(data: Partial<DbPhone>): Promise<DbPhone> {
  return apiFetch<DbPhone>("/api/admin/phones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function adminUpdatePhone(id: string, data: Partial<DbPhone>): Promise<DbPhone> {
  return apiFetch<DbPhone>(`/api/admin/phones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function adminDeletePhone(id: string): Promise<void> {
  await apiFetch(`/api/admin/phones/${id}`, { method: "DELETE" });
}
