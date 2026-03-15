-- Create brands table
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  logo TEXT,
  color TEXT DEFAULT '#333333',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create phones table with comprehensive specs
CREATE TABLE public.phones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_ar TEXT,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  year INTEGER,
  release_date TEXT,
  price TEXT,
  price_category TEXT CHECK (price_category IN ('budget', 'mid', 'flagship')),
  image TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  quick_screen TEXT,
  quick_processor TEXT,
  quick_camera TEXT,
  quick_front_camera TEXT,
  quick_memory TEXT,
  quick_battery TEXT,
  design_height TEXT,
  design_width TEXT,
  design_thickness TEXT,
  design_weight TEXT,
  design_materials TEXT,
  design_colors TEXT,
  design_frame TEXT,
  screen_type TEXT,
  screen_size TEXT,
  screen_resolution TEXT,
  screen_ppi TEXT,
  screen_refresh_rate TEXT,
  screen_touch_rate TEXT,
  screen_brightness TEXT,
  screen_protection TEXT,
  screen_back_protection TEXT,
  processor_name TEXT,
  processor_cores TEXT,
  processor_frequency TEXT,
  processor_gpu TEXT,
  processor_fabrication TEXT,
  antutu_score TEXT,
  memory_storage TEXT,
  memory_ram TEXT,
  memory_type TEXT,
  memory_sd_card TEXT,
  camera_main TEXT,
  camera_ultrawide TEXT,
  camera_telephoto TEXT,
  camera_macro TEXT,
  camera_front TEXT,
  camera_video TEXT,
  audio_speakers TEXT,
  audio_jack TEXT,
  connectivity_sim TEXT,
  connectivity_network TEXT,
  connectivity_wifi TEXT,
  connectivity_bluetooth TEXT,
  connectivity_nfc TEXT,
  connectivity_gps TEXT,
  protection_water TEXT,
  protection_standard TEXT,
  battery_capacity TEXT,
  battery_charging TEXT,
  battery_wireless TEXT,
  battery_reverse TEXT,
  software_os TEXT,
  software_ui TEXT,
  sensor_fingerprint TEXT,
  sensor_face_unlock TEXT,
  sensor_gyroscope TEXT,
  sensor_compass TEXT,
  sensor_proximity TEXT,
  sensor_light TEXT,
  sensor_other TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create phone images table
CREATE TABLE public.phone_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_id UUID REFERENCES public.phones(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  label TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_phones_brand_id ON public.phones(brand_id);
CREATE INDEX idx_phones_status ON public.phones(status);
CREATE INDEX idx_phones_year ON public.phones(year);
CREATE INDEX idx_phones_name ON public.phones USING gin(to_tsvector('simple', name));
CREATE INDEX idx_phone_images_phone_id ON public.phone_images(phone_id);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phone_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Brands are publicly readable" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Published phones are publicly readable" ON public.phones FOR SELECT USING (status = 'published');
CREATE POLICY "Phone images are publicly readable" ON public.phone_images FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Authenticated users can manage brands" ON public.brands FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage phones" ON public.phones FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage phone images" ON public.phone_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_phones_updated_at
  BEFORE UPDATE ON public.phones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();