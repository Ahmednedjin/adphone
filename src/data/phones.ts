export interface Phone {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  image: string;
  year: number;
  price?: string;
  quickSpecs: {
    screen: string;
    processor: string;
    camera: string;
    memory: string;
    battery: string;
  };
  specs: {
    design: {
      height: string;
      width: string;
      thickness: string;
      weight: string;
      materials: string;
    };
    screen: {
      type: string;
      size: string;
      resolution: string;
      refreshRate: string;
      protection: string;
    };
    processor: {
      name: string;
      cores: string;
      frequency: string;
      gpu: string;
    };
    memory: {
      storage: string;
      ram: string;
      type: string;
      sdCard: string;
    };
    cameras: {
      main: string;
      ultrawide: string;
      telephoto: string;
      front: string;
      video: string;
    };
    battery: {
      capacity: string;
      charging: string;
      wireless: string;
      port: string;
    };
    other: {
      fingerprint: string;
      waterResistance: string;
      os: string;
      networks: string;
    };
  };
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  logo: string;
}

export const brands: Brand[] = [
  { id: "1", slug: "samsung", name: "Samsung", nameAr: "سامسونج", logo: "📱" },
  { id: "2", slug: "apple", name: "Apple", nameAr: "آبل", logo: "🍎" },
  { id: "3", slug: "xiaomi", name: "Xiaomi", nameAr: "شاومي", logo: "📱" },
  { id: "4", slug: "oppo", name: "OPPO", nameAr: "أوبو", logo: "📱" },
  { id: "5", slug: "realme", name: "Realme", nameAr: "ريلمي", logo: "📱" },
  { id: "6", slug: "huawei", name: "Huawei", nameAr: "هواوي", logo: "📱" },
];

export const phones: Phone[] = [
  {
    id: "1",
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    brandSlug: "samsung",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg",
    year: 2024,
    price: "1299$",
    quickSpecs: {
      screen: "Dynamic AMOLED 2X, 6.8 بوصة",
      processor: "Snapdragon 8 Gen 3",
      camera: "200 ميجابكسل",
      memory: "256/512 جيجا + 12 جيجا رام",
      battery: "5000 مللي أمبير، شحن 45 واط",
    },
    specs: {
      design: { height: "162.3 مم", width: "79 مم", thickness: "8.6 مم", weight: "232 جرام", materials: "إطار تيتانيوم، ظهر زجاجي Gorilla Armor" },
      screen: { type: "Dynamic AMOLED 2X", size: "6.8 بوصة", resolution: "1440 x 3120 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Armor" },
      processor: { name: "Snapdragon 8 Gen 3", cores: "8 أنوية", frequency: "3.39 جيجاهرتز", gpu: "Adreno 750" },
      memory: { storage: "256/512 جيجابايت / 1 تيرابايت", ram: "12 جيجابايت", type: "LPDDR5X", sdCard: "لا يدعم" },
      cameras: { main: "200 ميجابكسل، f/1.7، OIS", ultrawide: "12 ميجابكسل، f/2.2", telephoto: "50 ميجابكسل، تقريب بصري 5x", front: "12 ميجابكسل، f/2.2", video: "8K@30fps, 4K@120fps" },
      battery: { capacity: "5000 مللي أمبير", charging: "45 واط سلكي", wireless: "15 واط لاسلكي", port: "USB Type-C 3.2" },
      other: { fingerprint: "بصمة بالموجات فوق الصوتية تحت الشاشة", waterResistance: "IP68", os: "Android 14, One UI 6.1", networks: "5G, 4G LTE, Wi-Fi 7" },
    },
  },
  {
    id: "2",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    brandSlug: "apple",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
    year: 2023,
    price: "1199$",
    quickSpecs: {
      screen: "Super Retina XDR OLED, 6.7 بوصة",
      processor: "Apple A17 Pro",
      camera: "48 ميجابكسل",
      memory: "256/512 جيجا + 8 جيجا رام",
      battery: "4441 مللي أمبير، شحن 27 واط",
    },
    specs: {
      design: { height: "159.9 مم", width: "76.7 مم", thickness: "8.25 مم", weight: "221 جرام", materials: "إطار تيتانيوم، ظهر زجاجي" },
      screen: { type: "Super Retina XDR OLED", size: "6.7 بوصة", resolution: "1290 x 2796 بكسل", refreshRate: "120 هرتز (ProMotion)", protection: "Ceramic Shield" },
      processor: { name: "Apple A17 Pro", cores: "6 أنوية", frequency: "3.78 جيجاهرتز", gpu: "Apple GPU (6 أنوية)" },
      memory: { storage: "256/512 جيجابايت / 1 تيرابايت", ram: "8 جيجابايت", type: "LPDDR5", sdCard: "لا يدعم" },
      cameras: { main: "48 ميجابكسل، f/1.78، OIS", ultrawide: "12 ميجابكسل، f/2.2", telephoto: "12 ميجابكسل، تقريب بصري 5x", front: "12 ميجابكسل، f/1.9", video: "4K@60fps, Cinematic Mode" },
      battery: { capacity: "4441 مللي أمبير", charging: "27 واط سلكي", wireless: "15 واط MagSafe", port: "USB Type-C 3.0" },
      other: { fingerprint: "Face ID", waterResistance: "IP68", os: "iOS 17", networks: "5G, 4G LTE, Wi-Fi 6E" },
    },
  },
  {
    id: "3",
    slug: "xiaomi-redmi-note-13-pro",
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-5g.jpg",
    year: 2024,
    price: "299$",
    quickSpecs: {
      screen: "AMOLED, 6.67 بوصة",
      processor: "Snapdragon 7s Gen 2",
      camera: "200 ميجابكسل",
      memory: "128/256 جيجا + 8/12 جيجا رام",
      battery: "5100 مللي أمبير، شحن 67 واط",
    },
    specs: {
      design: { height: "161.2 مم", width: "74.2 مم", thickness: "7.98 مم", weight: "187 جرام", materials: "إطار بلاستيك، ظهر زجاجي" },
      screen: { type: "AMOLED", size: "6.67 بوصة", resolution: "1220 x 2712 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Glass 5" },
      processor: { name: "Snapdragon 7s Gen 2", cores: "8 أنوية", frequency: "2.4 جيجاهرتز", gpu: "Adreno 710" },
      memory: { storage: "128/256 جيجابايت", ram: "8/12 جيجابايت", type: "LPDDR4X", sdCard: "يدعم حتى 1 تيرابايت" },
      cameras: { main: "200 ميجابكسل، f/1.65، OIS", ultrawide: "8 ميجابكسل، f/2.2", telephoto: "لا يوجد", front: "16 ميجابكسل، f/2.45", video: "4K@30fps" },
      battery: { capacity: "5100 مللي أمبير", charging: "67 واط سلكي", wireless: "لا يدعم", port: "USB Type-C 2.0" },
      other: { fingerprint: "بصمة بصرية تحت الشاشة", waterResistance: "IP54", os: "Android 13, MIUI 14", networks: "5G, 4G LTE, Wi-Fi 6" },
    },
  },
  {
    id: "4",
    slug: "oppo-find-x7-ultra",
    name: "OPPO Find X7 Ultra",
    brand: "OPPO",
    brandSlug: "oppo",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x7-ultra.jpg",
    year: 2024,
    price: "899$",
    quickSpecs: {
      screen: "AMOLED LTPO, 6.82 بوصة",
      processor: "Snapdragon 8 Gen 3",
      camera: "50 ميجابكسل (كاميرتان رئيسيتان)",
      memory: "256/512 جيجا + 16 جيجا رام",
      battery: "5600 مللي أمبير، شحن 100 واط",
    },
    specs: {
      design: { height: "164.3 مم", width: "76.2 مم", thickness: "9.5 مم", weight: "221 جرام", materials: "إطار ألمنيوم، ظهر زجاجي" },
      screen: { type: "AMOLED LTPO", size: "6.82 بوصة", resolution: "1440 x 3168 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Glass Victus 2" },
      processor: { name: "Snapdragon 8 Gen 3", cores: "8 أنوية", frequency: "3.3 جيجاهرتز", gpu: "Adreno 750" },
      memory: { storage: "256/512 جيجابايت", ram: "16 جيجابايت", type: "LPDDR5X", sdCard: "لا يدعم" },
      cameras: { main: "50 ميجابكسل × 2 (Sony LYT-900)", ultrawide: "50 ميجابكسل", telephoto: "50 ميجابكسل، تقريب 6x", front: "32 ميجابكسل", video: "4K@60fps, Dolby Vision" },
      battery: { capacity: "5600 مللي أمبير", charging: "100 واط سلكي", wireless: "50 واط لاسلكي", port: "USB Type-C 3.2" },
      other: { fingerprint: "بصمة بصرية تحت الشاشة", waterResistance: "IP65", os: "Android 14, ColorOS 14", networks: "5G, 4G LTE, Wi-Fi 7" },
    },
  },
  {
    id: "5",
    slug: "realme-gt5-pro",
    name: "Realme GT5 Pro",
    brand: "Realme",
    brandSlug: "realme",
    image: "https://fdn2.gsmarena.com/vv/bigpic/realme-gt5-pro.jpg",
    year: 2024,
    price: "499$",
    quickSpecs: {
      screen: "AMOLED, 6.78 بوصة",
      processor: "Snapdragon 8 Gen 3",
      camera: "50 ميجابكسل Sony IMX890",
      memory: "256 جيجا + 12/16 جيجا رام",
      battery: "5400 مللي أمبير، شحن 100 واط",
    },
    specs: {
      design: { height: "161.7 مم", width: "75.6 مم", thickness: "8.7 مم", weight: "199 جرام", materials: "إطار ألمنيوم، ظهر زجاجي" },
      screen: { type: "AMOLED", size: "6.78 بوصة", resolution: "1264 x 2780 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Glass Victus 2" },
      processor: { name: "Snapdragon 8 Gen 3", cores: "8 أنوية", frequency: "3.3 جيجاهرتز", gpu: "Adreno 750" },
      memory: { storage: "256/512 جيجابايت", ram: "12/16 جيجابايت", type: "LPDDR5X", sdCard: "لا يدعم" },
      cameras: { main: "50 ميجابكسل، Sony IMX890، OIS", ultrawide: "8 ميجابكسل", telephoto: "64 ميجابكسل، تقريب 3x", front: "32 ميجابكسل", video: "4K@60fps" },
      battery: { capacity: "5400 مللي أمبير", charging: "100 واط سلكي", wireless: "لا يدعم", port: "USB Type-C 2.0" },
      other: { fingerprint: "بصمة بصرية تحت الشاشة", waterResistance: "IP65", os: "Android 14, Realme UI 5.0", networks: "5G, 4G LTE, Wi-Fi 7" },
    },
  },
  {
    id: "6",
    slug: "huawei-pura-70-ultra",
    name: "Huawei Pura 70 Ultra",
    brand: "Huawei",
    brandSlug: "huawei",
    image: "https://fdn2.gsmarena.com/vv/bigpic/huawei-pura-70-ultra-.jpg",
    year: 2024,
    price: "1499$",
    quickSpecs: {
      screen: "LTPO OLED, 6.8 بوصة",
      processor: "Kirin 9010",
      camera: "50 ميجابكسل، عدسة متغيرة الفتحة",
      memory: "512 جيجا / 1 تيرا + 16 جيجا رام",
      battery: "5200 مللي أمبير، شحن 100 واط",
    },
    specs: {
      design: { height: "162.6 مم", width: "75.1 مم", thickness: "8.4 مم", weight: "226 جرام", materials: "إطار تيتانيوم، ظهر سيراميك" },
      screen: { type: "LTPO OLED", size: "6.8 بوصة", resolution: "1260 x 2844 بكسل", refreshRate: "120 هرتز", protection: "Kunlun Glass 2" },
      processor: { name: "Kirin 9010", cores: "8 أنوية", frequency: "2.3 جيجاهرتز", gpu: "Maleoon 910" },
      memory: { storage: "512 جيجابايت / 1 تيرابايت", ram: "16 جيجابايت", type: "LPDDR5T", sdCard: "يدعم NM Card" },
      cameras: { main: "50 ميجابكسل، فتحة عدسة متغيرة f/1.4-4.0", ultrawide: "40 ميجابكسل", telephoto: "50 ميجابكسل، تقريب بصري 3.5x", front: "13 ميجابكسل + 3D ToF", video: "4K@60fps" },
      battery: { capacity: "5200 مللي أمبير", charging: "100 واط سلكي", wireless: "80 واط لاسلكي", port: "USB Type-C 3.1" },
      other: { fingerprint: "بصمة بالموجات فوق الصوتية تحت الشاشة", waterResistance: "IP68", os: "HarmonyOS 4.2", networks: "5G, 4G LTE, Wi-Fi 6" },
    },
  },
  {
    id: "7",
    slug: "samsung-galaxy-a55",
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    brandSlug: "samsung",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
    year: 2024,
    price: "449$",
    quickSpecs: {
      screen: "Super AMOLED, 6.6 بوصة",
      processor: "Exynos 1480",
      camera: "50 ميجابكسل",
      memory: "128/256 جيجا + 8 جيجا رام",
      battery: "5000 مللي أمبير، شحن 25 واط",
    },
    specs: {
      design: { height: "161.7 مم", width: "77.4 مم", thickness: "8.2 مم", weight: "213 جرام", materials: "إطار ألمنيوم، ظهر زجاجي Gorilla Glass Victus+" },
      screen: { type: "Super AMOLED", size: "6.6 بوصة", resolution: "1080 x 2340 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Glass Victus+" },
      processor: { name: "Exynos 1480", cores: "8 أنوية", frequency: "2.75 جيجاهرتز", gpu: "Xclipse 530" },
      memory: { storage: "128/256 جيجابايت", ram: "8 جيجابايت", type: "LPDDR5", sdCard: "يدعم حتى 1 تيرابايت" },
      cameras: { main: "50 ميجابكسل، f/1.8، OIS", ultrawide: "12 ميجابكسل، f/2.2", telephoto: "5 ميجابكسل ماكرو", front: "13 ميجابكسل، f/2.2", video: "4K@30fps" },
      battery: { capacity: "5000 مللي أمبير", charging: "25 واط سلكي", wireless: "لا يدعم", port: "USB Type-C 2.0" },
      other: { fingerprint: "بصمة بصرية تحت الشاشة", waterResistance: "IP67", os: "Android 14, One UI 6.1", networks: "5G, 4G LTE, Wi-Fi 6" },
    },
  },
  {
    id: "8",
    slug: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg",
    year: 2024,
    price: "999$",
    quickSpecs: {
      screen: "LTPO AMOLED, 6.73 بوصة",
      processor: "Snapdragon 8 Gen 3",
      camera: "50 ميجابكسل Leica Summilux",
      memory: "256/512 جيجا + 16 جيجا رام",
      battery: "5300 مللي أمبير، شحن 90 واط",
    },
    specs: {
      design: { height: "161.4 مم", width: "75.3 مم", thickness: "9.2 مم", weight: "229 جرام", materials: "إطار ألمنيوم، ظهر جلد نباتي" },
      screen: { type: "LTPO AMOLED", size: "6.73 بوصة", resolution: "1440 x 3200 بكسل", refreshRate: "120 هرتز", protection: "Gorilla Glass Victus 2" },
      processor: { name: "Snapdragon 8 Gen 3", cores: "8 أنوية", frequency: "3.3 جيجاهرتز", gpu: "Adreno 750" },
      memory: { storage: "256/512 جيجابايت / 1 تيرابايت", ram: "16 جيجابايت", type: "LPDDR5X", sdCard: "لا يدعم" },
      cameras: { main: "50 ميجابكسل، Leica Summilux، f/1.63، OIS", ultrawide: "50 ميجابكسل، f/1.8", telephoto: "50 ميجابكسل، تقريب بصري 5x", front: "32 ميجابكسل", video: "8K@24fps, 4K@60fps" },
      battery: { capacity: "5300 مللي أمبير", charging: "90 واط سلكي", wireless: "50 واط لاسلكي", port: "USB Type-C 3.2" },
      other: { fingerprint: "بصمة بصرية تحت الشاشة", waterResistance: "IP68", os: "Android 14, HyperOS", networks: "5G, 4G LTE, Wi-Fi 7" },
    },
  },
];

export function getPhonesByBrand(brandSlug: string): Phone[] {
  return phones.filter(p => p.brandSlug === brandSlug);
}

export function getPhoneBySlug(slug: string): Phone | undefined {
  return phones.find(p => p.slug === slug);
}

export function getSimilarPhones(phone: Phone, count = 4): Phone[] {
  return phones.filter(p => p.id !== phone.id).slice(0, count);
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase();
  return phones.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q)
  );
}
