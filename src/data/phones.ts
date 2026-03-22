export interface Phone {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  image: string;
  year: number;
  colors?: string;
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
      colors: string;
    };
    screen: {
      type: string;
      size: string;
      resolution: string;
      ppi: string;
      refreshRate: string;
      touchRate: string;
      protection: string;
    };
    processor: {
      name: string;
      cores: string;
      frequency: string;
      gpu: string;
      fabrication: string;
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
      macro: string;
      front: string;
      video: string;
    };
    connectivity: {
      network: string;
      wifi: string;
      bluetooth: string;
      nfc: string;
      gps: string;
    };
    battery: {
      capacity: string;
      charging: string;
      wireless: string;
      reverse: string;
    };
    software: {
      os: string;
      ui: string;
    };
    sensors: {
      fingerprint: string;
      faceUnlock: string;
      gyroscope: string;
      compass: string;
      waterResistance: string;
    };
  };
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  logo: string;
  color: string;
}

export const brands: Brand[] = [
  { id: "1", slug: "samsung", name: "Samsung", nameAr: "سامسونج", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", color: "#1428A0" },
  { id: "2", slug: "apple", name: "Apple", nameAr: "آبل", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", color: "#555555" },
  { id: "3", slug: "xiaomi", name: "Xiaomi", nameAr: "شاومي", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg", color: "#FF6700" },
  { id: "4", slug: "redmi", name: "Redmi", nameAr: "ريدمي", logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/Redmi_Logo.svg", color: "#FF2D2D" },
  { id: "5", slug: "realme", name: "Realme", nameAr: "ريلمي", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.svg", color: "#F5C518" },
  { id: "6", slug: "oppo", name: "OPPO", nameAr: "أوبو", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/OPPO_LOGO_2019.svg", color: "#1A8A3F" },
  { id: "7", slug: "vivo", name: "Vivo", nameAr: "فيفو", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Vivo_logo_2019.svg", color: "#415FFF" },
  { id: "8", slug: "honor", name: "Honor", nameAr: "أونر", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Honor_logo_2022.svg", color: "#0AB4FF" },
  { id: "9", slug: "infinix", name: "Infinix", nameAr: "إنفينيكس", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Infinix_logo.svg", color: "#E8372C" },
  { id: "10", slug: "google", name: "Google Pixel", nameAr: "جوجل بيكسل", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#4285F4" },
  { id: "11", slug: "oneplus", name: "OnePlus", nameAr: "ون بلس", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/OnePlus_logo.svg", color: "#F5010C" },
  { id: "12", slug: "nokia", name: "Nokia", nameAr: "نوكيا", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg", color: "#124191" },
  { id: "13", slug: "motorola", name: "Motorola", nameAr: "موتورولا", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_Motorola_Solutions_Logo.svg", color: "#5C068C" },
  { id: "14", slug: "huawei", name: "Huawei", nameAr: "هواوي", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Huawei_Logo.svg", color: "#CF0A2C" },
  { id: "15", slug: "sony", name: "Sony", nameAr: "سوني", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg", color: "#000000" },
  { id: "16", slug: "asus", name: "ASUS", nameAr: "أسوس", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg", color: "#00529B" },
];

function p(id: string, slug: string, name: string, brand: string, brandSlug: string, year: number, _price: string, _priceCategory: string | undefined, image: string, qs: Phone["quickSpecs"], specs: Phone["specs"]): Phone {
  return { id, slug, name, brand, brandSlug, image, year, quickSpecs: qs, specs };
}

const ds = (h: string, w: string, t: string, wt: string, m: string, c: string): Phone["specs"]["design"] => ({ height: h, width: w, thickness: t, weight: wt, materials: m, colors: c });
const sc = (ty: string, sz: string, res: string, ppi: string, rr: string, tr: string, pr: string): Phone["specs"]["screen"] => ({ type: ty, size: sz, resolution: res, ppi, refreshRate: rr, touchRate: tr, protection: pr });
const pr = (n: string, c: string, f: string, g: string, fab: string): Phone["specs"]["processor"] => ({ name: n, cores: c, frequency: f, gpu: g, fabrication: fab });
const mem = (s: string, r: string, t: string, sd: string): Phone["specs"]["memory"] => ({ storage: s, ram: r, type: t, sdCard: sd });
const cam = (m: string, u: string, t: string, mc: string, f: string, v: string): Phone["specs"]["cameras"] => ({ main: m, ultrawide: u, telephoto: t, macro: mc, front: f, video: v });
const con = (n: string, w: string, b: string, nfc: string, g: string): Phone["specs"]["connectivity"] => ({ network: n, wifi: w, bluetooth: b, nfc, gps: g });
const bat = (c: string, ch: string, wl: string, rv: string): Phone["specs"]["battery"] => ({ capacity: c, charging: ch, wireless: wl, reverse: rv });
const sw = (o: string, u: string): Phone["specs"]["software"] => ({ os: o, ui: u });
const sn = (fp: string, face: string, gy: string, comp: string, wr: string): Phone["specs"]["sensors"] => ({ fingerprint: fp, faceUnlock: face, gyroscope: gy, compass: comp, waterResistance: wr });

export const phones: Phone[] = [
  // ===== SAMSUNG =====
  p("1", "samsung-galaxy-s24-ultra", "Samsung Galaxy S24 Ultra", "Samsung", "samsung", 2024, "1299$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg",
    { screen: "Dynamic AMOLED 2X, 6.8\"", processor: "Snapdragon 8 Gen 3", camera: "200 MP", memory: "256/512GB + 12GB RAM", battery: "5000 mAh, 45W" },
    { design: ds("162.3 مم","79 مم","8.6 مم","232 جرام","إطار تيتانيوم، ظهر زجاجي Gorilla Armor","رمادي تيتانيوم، أسود، بنفسجي، أصفر"),
      screen: sc("Dynamic AMOLED 2X","6.8 بوصة","1440 x 3120","505 ppi","120 هرتز","240 هرتز","Gorilla Armor"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.39 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB / 1TB","12 GB","LPDDR5X","لا يدعم"),
      cameras: cam("200 MP, f/1.7, OIS","12 MP, f/2.2","50 MP, تقريب 5x","لا يوجد","12 MP, f/2.2","8K@30fps, 4K@120fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5000 mAh","45W سلكي","15W لاسلكي","4.5W شحن عكسي"),
      software: sw("Android 14","One UI 6.1"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("2", "samsung-galaxy-s24-plus", "Samsung Galaxy S24+", "Samsung", "samsung", 2024, "999$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-plus.jpg",
    { screen: "Dynamic AMOLED 2X, 6.7\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP", memory: "256GB + 12GB RAM", battery: "4900 mAh, 45W" },
    { design: ds("158.5 مم","75.9 مم","7.7 مم","196 جرام","إطار ألمنيوم Armor، ظهر زجاجي","أسود، رمادي، بنفسجي، أصفر"),
      screen: sc("Dynamic AMOLED 2X","6.7 بوصة","1440 x 3120","513 ppi","120 هرتز","240 هرتز","Gorilla Armor"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.39 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, f/1.8, OIS","12 MP, f/2.2","10 MP, تقريب 3x","لا يوجد","12 MP, f/2.2","8K@30fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4900 mAh","45W سلكي","15W لاسلكي","4.5W شحن عكسي"),
      software: sw("Android 14","One UI 6.1"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("3", "samsung-galaxy-s24", "Samsung Galaxy S24", "Samsung", "samsung", 2024, "799$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24.jpg",
    { screen: "Dynamic AMOLED 2X, 6.2\"", processor: "Exynos 2400", camera: "50 MP", memory: "128/256GB + 8GB RAM", battery: "4000 mAh, 25W" },
    { design: ds("147 مم","70.6 مم","7.6 مم","167 جرام","إطار ألمنيوم Armor، ظهر زجاجي","أسود، رمادي، بنفسجي، أصفر"),
      screen: sc("Dynamic AMOLED 2X","6.2 بوصة","1080 x 2340","416 ppi","120 هرتز","240 هرتز","Gorilla Armor"),
      processor: pr("Exynos 2400","10 أنوية","3.2 GHz","Xclipse 940","4 نانومتر"),
      memory: mem("128/256GB","8 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, f/1.8, OIS","12 MP, f/2.2","10 MP, تقريب 3x","لا يوجد","12 MP, f/2.2","8K@30fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4000 mAh","25W سلكي","15W لاسلكي","4.5W شحن عكسي"),
      software: sw("Android 14","One UI 6.1"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("4", "samsung-galaxy-a55", "Samsung Galaxy A55", "Samsung", "samsung", 2024, "449$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
    { screen: "Super AMOLED, 6.6\"", processor: "Exynos 1480", camera: "50 MP", memory: "128/256GB + 8GB RAM", battery: "5000 mAh, 25W" },
    { design: ds("161.7 مم","77.4 مم","8.2 مم","213 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق، بنفسجي، أصفر ليموني"),
      screen: sc("Super AMOLED","6.6 بوصة","1080 x 2340","390 ppi","120 هرتز","-","Gorilla Glass Victus+"),
      processor: pr("Exynos 1480","8 أنوية","2.75 GHz","Xclipse 530","4 نانومتر"),
      memory: mem("128/256GB","8 GB","LPDDR5","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8, OIS","12 MP, f/2.2","5 MP ماكرو","لا يوجد","13 MP, f/2.2","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","25W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","One UI 6.1"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP67") }),

  p("5", "samsung-galaxy-a15", "Samsung Galaxy A15", "Samsung", "samsung", 2024, "199$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a15.jpg",
    { screen: "Super AMOLED, 6.5\"", processor: "Helio G99", camera: "50 MP", memory: "128GB + 4/6GB RAM", battery: "5000 mAh, 25W" },
    { design: ds("160.1 مم","76.8 مم","8.4 مم","200 جرام","بلاستيك","أسود، أزرق، أصفر ليموني"),
      screen: sc("Super AMOLED","6.5 بوصة","1080 x 2340","396 ppi","90 هرتز","-","Gorilla Glass 5"),
      processor: pr("MediaTek Helio G99","8 أنوية","2.2 GHz","Mali-G57 MC2","6 نانومتر"),
      memory: mem("128GB","4/6 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8","5 MP, f/2.2","2 MP ماكرو","لا يوجد","13 MP, f/2.0","1080p@30fps"),
      connectivity: con("4G LTE","Wi-Fi 5","Bluetooth 5.1","لا يدعم","GPS, GLONASS"),
      battery: bat("5000 mAh","25W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","One UI 6.1"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","لا يدعم") }),

  // ===== APPLE =====
  p("10", "iphone-15-pro-max", "iPhone 15 Pro Max", "Apple", "apple", 2023, "1199$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
    { screen: "Super Retina XDR OLED, 6.7\"", processor: "Apple A17 Pro", camera: "48 MP", memory: "256/512GB + 8GB RAM", battery: "4441 mAh, 27W" },
    { design: ds("159.9 مم","76.7 مم","8.25 مم","221 جرام","إطار تيتانيوم، ظهر زجاجي","تيتانيوم طبيعي، أزرق، أبيض، أسود"),
      screen: sc("Super Retina XDR OLED","6.7 بوصة","1290 x 2796","460 ppi","120 هرتز (ProMotion)","-","Ceramic Shield"),
      processor: pr("Apple A17 Pro","6 أنوية","3.78 GHz","Apple GPU (6 أنوية)","3 نانومتر"),
      memory: mem("256/512GB / 1TB","8 GB","LPDDR5","لا يدعم"),
      cameras: cam("48 MP, f/1.78, OIS","12 MP, f/2.2","12 MP, تقريب 5x","لا يوجد","12 MP, f/1.9","4K@60fps, Cinematic"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6E","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("4441 mAh","27W سلكي","15W MagSafe","لا يدعم"),
      software: sw("iOS 17","—"),
      sensors: sn("Face ID","Face ID","نعم","نعم","IP68") }),

  p("11", "iphone-15-pro", "iPhone 15 Pro", "Apple", "apple", 2023, "999$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
    { screen: "Super Retina XDR OLED, 6.1\"", processor: "Apple A17 Pro", camera: "48 MP", memory: "128/256/512GB + 8GB RAM", battery: "3274 mAh, 27W" },
    { design: ds("146.6 مم","70.6 مم","8.25 مم","187 جرام","إطار تيتانيوم، ظهر زجاجي","تيتانيوم طبيعي، أزرق، أبيض، أسود"),
      screen: sc("Super Retina XDR OLED","6.1 بوصة","1179 x 2556","460 ppi","120 هرتز (ProMotion)","-","Ceramic Shield"),
      processor: pr("Apple A17 Pro","6 أنوية","3.78 GHz","Apple GPU (6 أنوية)","3 نانومتر"),
      memory: mem("128/256/512GB / 1TB","8 GB","LPDDR5","لا يدعم"),
      cameras: cam("48 MP, f/1.78, OIS","12 MP, f/2.2","12 MP, تقريب 3x","لا يوجد","12 MP, f/1.9","4K@60fps, Cinematic"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6E","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("3274 mAh","27W سلكي","15W MagSafe","لا يدعم"),
      software: sw("iOS 17","—"),
      sensors: sn("Face ID","Face ID","نعم","نعم","IP68") }),

  p("12", "iphone-15", "iPhone 15", "Apple", "apple", 2023, "799$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
    { screen: "Super Retina XDR OLED, 6.1\"", processor: "Apple A16 Bionic", camera: "48 MP", memory: "128/256/512GB + 6GB RAM", battery: "3349 mAh, 20W" },
    { design: ds("147.6 مم","71.6 مم","7.8 مم","171 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق، أخضر، أصفر، وردي"),
      screen: sc("Super Retina XDR OLED","6.1 بوصة","1179 x 2556","460 ppi","60 هرتز","-","Ceramic Shield"),
      processor: pr("Apple A16 Bionic","6 أنوية","3.46 GHz","Apple GPU (5 أنوية)","4 نانومتر"),
      memory: mem("128/256/512GB","6 GB","LPDDR5","لا يدعم"),
      cameras: cam("48 MP, f/1.6, OIS","12 MP, f/2.4","لا يوجد","لا يوجد","12 MP, f/1.9","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("3349 mAh","20W سلكي","15W MagSafe","لا يدعم"),
      software: sw("iOS 17","—"),
      sensors: sn("Face ID","Face ID","نعم","نعم","IP68") }),

  p("13", "iphone-se-2022", "iPhone SE (2022)", "Apple", "apple", 2022, "429$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2022.jpg",
    { screen: "Retina IPS LCD, 4.7\"", processor: "Apple A15 Bionic", camera: "12 MP", memory: "64/128/256GB + 4GB RAM", battery: "2018 mAh, 20W" },
    { design: ds("138.4 مم","67.3 مم","7.3 مم","144 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أبيض، أحمر"),
      screen: sc("Retina IPS LCD","4.7 بوصة","750 x 1334","326 ppi","60 هرتز","-","زجاج مقاوم"),
      processor: pr("Apple A15 Bionic","6 أنوية","3.22 GHz","Apple GPU (5 أنوية)","5 نانومتر"),
      memory: mem("64/128/256GB","4 GB","LPDDR4X","لا يدعم"),
      cameras: cam("12 MP, f/1.8, OIS","لا يوجد","لا يوجد","لا يوجد","7 MP, f/2.2","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.0","نعم","GPS, GLONASS, Galileo"),
      battery: bat("2018 mAh","20W سلكي","7.5W Qi","لا يدعم"),
      software: sw("iOS 15","—"),
      sensors: sn("Touch ID (زر الهوم)","لا يوجد","نعم","نعم","IP67") }),

  // ===== XIAOMI =====
  p("20", "xiaomi-14-ultra", "Xiaomi 14 Ultra", "Xiaomi", "xiaomi", 2024, "999$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg",
    { screen: "LTPO AMOLED, 6.73\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP Leica", memory: "256/512GB + 16GB RAM", battery: "5300 mAh, 90W" },
    { design: ds("161.4 مم","75.3 مم","9.2 مم","229 جرام","إطار ألمنيوم، ظهر جلد نباتي","أسود، أبيض"),
      screen: sc("LTPO AMOLED","6.73 بوصة","1440 x 3200","522 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB / 1TB","16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Leica Summilux, f/1.63, OIS","50 MP, f/1.8","50 MP, تقريب 5x","لا يوجد","32 MP","8K@24fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5300 mAh","90W سلكي","50W لاسلكي","10W شحن عكسي"),
      software: sw("Android 14","HyperOS"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("21", "xiaomi-14", "Xiaomi 14", "Xiaomi", "xiaomi", 2024, "699$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14.jpg",
    { screen: "LTPO AMOLED, 6.36\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP Leica", memory: "256/512GB + 12GB RAM", battery: "4610 mAh, 90W" },
    { design: ds("152.8 مم","71.5 مم","8.2 مم","193 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أبيض، أخضر"),
      screen: sc("LTPO AMOLED","6.36 بوصة","1200 x 2670","460 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Leica Summilux, f/1.6, OIS","50 MP, f/2.2","50 MP, تقريب 3.2x","لا يوجد","32 MP","8K@24fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("4610 mAh","90W سلكي","50W لاسلكي","10W شحن عكسي"),
      software: sw("Android 14","HyperOS"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("22", "xiaomi-13t-pro", "Xiaomi 13T Pro", "Xiaomi", "xiaomi", 2023, "599$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13t-pro.jpg",
    { screen: "AMOLED, 6.67\"", processor: "Dimensity 9200+", camera: "50 MP Leica", memory: "256/512GB + 12GB RAM", battery: "5000 mAh, 120W" },
    { design: ds("162.2 مم","75.7 مم","8.6 مم","206 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق، أخضر"),
      screen: sc("AMOLED","6.67 بوصة","1220 x 2712","446 ppi","144 هرتز","240 هرتز","Gorilla Glass 5"),
      processor: pr("Dimensity 9200+","8 أنوية","3.35 GHz","Immortalis-G715","4 نانومتر"),
      memory: mem("256/512GB","12 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Leica, f/1.9, OIS","12 MP, f/2.2","50 MP, تقريب 2x","لا يوجد","20 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6E","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5000 mAh","120W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","MIUI 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  // ===== REDMI =====
  p("30", "redmi-note-13-pro-plus", "Redmi Note 13 Pro+", "Redmi", "redmi", 2024, "349$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-plus-5g.jpg",
    { screen: "AMOLED, 6.67\"", processor: "Dimensity 7200 Ultra", camera: "200 MP", memory: "256/512GB + 8/12GB RAM", battery: "5000 mAh, 120W" },
    { design: ds("161.4 مم","74.2 مم","8.9 مم","204.5 جرام","إطار بلاستيك، ظهر زجاجي","أسود، أبيض، بنفسجي"),
      screen: sc("AMOLED","6.67 بوصة","1220 x 2712","446 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Dimensity 7200 Ultra","8 أنوية","2.8 GHz","Mali-G610 MC4","4 نانومتر"),
      memory: mem("256/512GB","8/12 GB","LPDDR5","لا يدعم"),
      cameras: cam("200 MP, f/1.65, OIS","8 MP, f/2.2","2 MP ماكرو","2 MP","16 MP, f/2.45","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5000 mAh","120W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","MIUI 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("31", "redmi-note-13-pro", "Redmi Note 13 Pro", "Redmi", "redmi", 2024, "299$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-5g.jpg",
    { screen: "AMOLED, 6.67\"", processor: "Snapdragon 7s Gen 2", camera: "200 MP", memory: "128/256GB + 8/12GB RAM", battery: "5100 mAh, 67W" },
    { design: ds("161.2 مم","74.2 مم","7.98 مم","187 جرام","إطار بلاستيك، ظهر زجاجي","أسود، أبيض، بنفسجي"),
      screen: sc("AMOLED","6.67 بوصة","1220 x 2712","446 ppi","120 هرتز","240 هرتز","Gorilla Glass 5"),
      processor: pr("Snapdragon 7s Gen 2","8 أنوية","2.4 GHz","Adreno 710","4 نانومتر"),
      memory: mem("128/256GB","8/12 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("200 MP, f/1.65, OIS","8 MP, f/2.2","2 MP ماكرو","2 MP","16 MP, f/2.45","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.2","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5100 mAh","67W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","MIUI 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP54") }),

  p("32", "redmi-note-13", "Redmi Note 13", "Redmi", "redmi", 2024, "199$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-4g.jpg",
    { screen: "AMOLED, 6.67\"", processor: "Snapdragon 685", camera: "108 MP", memory: "128/256GB + 6/8GB RAM", battery: "5000 mAh, 33W" },
    { design: ds("162.2 مم","75 مم","7.97 مم","188.5 جرام","بلاستيك","أسود، أزرق، أخضر"),
      screen: sc("AMOLED","6.67 بوصة","1080 x 2400","395 ppi","120 هرتز","-","Gorilla Glass 3"),
      processor: pr("Snapdragon 685","8 أنوية","2.8 GHz","Adreno 610","6 نانومتر"),
      memory: mem("128/256GB","6/8 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("108 MP, f/1.7","2 MP ماكرو","لا يوجد","2 MP","16 MP","1080p@30fps"),
      connectivity: con("4G LTE","Wi-Fi 5","Bluetooth 5.1","نعم","GPS, GLONASS"),
      battery: bat("5000 mAh","33W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","MIUI 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP54") }),

  p("33", "redmi-13c", "Redmi 13C", "Redmi", "redmi", 2023, "129$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-13c.jpg",
    { screen: "IPS LCD, 6.74\"", processor: "Helio G85", camera: "50 MP", memory: "128/256GB + 4/6/8GB RAM", battery: "5000 mAh, 18W" },
    { design: ds("167.3 مم","76.8 مم","8.09 مم","192 جرام","بلاستيك","أسود، أزرق، أخضر"),
      screen: sc("IPS LCD","6.74 بوصة","720 x 1600","260 ppi","90 هرتز","-","لا يوجد"),
      processor: pr("MediaTek Helio G85","8 أنوية","2.0 GHz","Mali-G52 MC2","12 نانومتر"),
      memory: mem("128/256GB","4/6/8 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8","لا يوجد","لا يوجد","لا يوجد","5 MP","1080p@30fps"),
      connectivity: con("4G LTE","Wi-Fi 5","Bluetooth 5.1","لا يدعم","GPS, GLONASS"),
      battery: bat("5000 mAh","18W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","MIUI 14"),
      sensors: sn("بصمة خلفية","لا يوجد","لا يوجد","نعم","لا يدعم") }),

  // ===== REALME =====
  p("40", "realme-gt5-pro", "Realme GT5 Pro", "Realme", "realme", 2024, "499$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/realme-gt5-pro.jpg",
    { screen: "AMOLED, 6.78\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP Sony IMX890", memory: "256GB + 12/16GB RAM", battery: "5400 mAh, 100W" },
    { design: ds("161.7 مم","75.6 مم","8.7 مم","199 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أبيض"),
      screen: sc("AMOLED","6.78 بوصة","1264 x 2780","450 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12/16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX890, f/1.69, OIS","8 MP, f/2.2","64 MP, تقريب 3x","لا يوجد","32 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5400 mAh","100W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Realme UI 5.0"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP65") }),

  p("41", "realme-12-pro-plus", "Realme 12 Pro+", "Realme", "realme", 2024, "399$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/realme-12-pro-plus-5g.jpg",
    { screen: "AMOLED, 6.7\"", processor: "Snapdragon 7s Gen 2", camera: "50 MP Sony IMX890", memory: "256GB + 8/12GB RAM", battery: "5000 mAh, 67W" },
    { design: ds("161.5 مم","73.9 مم","8.8 مم","190 جرام","إطار بلاستيك، ظهر زجاجي","أزرق، بيج"),
      screen: sc("AMOLED","6.7 بوصة","1080 x 2412","394 ppi","120 هرتز","240 هرتز","Gorilla Glass 5"),
      processor: pr("Snapdragon 7s Gen 2","8 أنوية","2.4 GHz","Adreno 710","4 نانومتر"),
      memory: mem("256GB","8/12 GB","LPDDR4X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX890, f/1.88, OIS","8 MP, f/2.2","64 MP بيريسكوب، تقريب 3x","لا يوجد","32 MP","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.2","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","67W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Realme UI 5.0"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","لا يدعم") }),

  p("42", "realme-c67", "Realme C67", "Realme", "realme", 2024, "149$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/realme-c67-4g.jpg",
    { screen: "IPS LCD, 6.72\"", processor: "Snapdragon 685", camera: "108 MP", memory: "128/256GB + 6/8GB RAM", battery: "5000 mAh, 33W" },
    { design: ds("165.7 مم","76 مم","7.9 مم","188 جرام","بلاستيك","أسود، أخضر"),
      screen: sc("IPS LCD","6.72 بوصة","1080 x 2400","391 ppi","90 هرتز","-","لا يوجد"),
      processor: pr("Snapdragon 685","8 أنوية","2.8 GHz","Adreno 610","6 نانومتر"),
      memory: mem("128/256GB","6/8 GB","LPDDR4X","يدعم حتى 2TB"),
      cameras: cam("108 MP, f/1.75","2 MP عمق","لا يوجد","لا يوجد","8 MP","1080p@30fps"),
      connectivity: con("4G LTE","Wi-Fi 5","Bluetooth 5.0","لا يدعم","GPS, GLONASS"),
      battery: bat("5000 mAh","33W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","Realme UI 4.0"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","لا يدعم") }),

  // ===== OPPO =====
  p("50", "oppo-find-x7-ultra", "OPPO Find X7 Ultra", "OPPO", "oppo", 2024, "899$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x7-ultra.jpg",
    { screen: "AMOLED LTPO, 6.82\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP × 2", memory: "256/512GB + 16GB RAM", battery: "5600 mAh, 100W" },
    { design: ds("164.3 مم","76.2 مم","9.5 مم","221 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق"),
      screen: sc("AMOLED LTPO","6.82 بوصة","1440 x 3168","510 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP × 2, Sony LYT-900, OIS","50 MP","50 MP, تقريب 6x","لا يوجد","32 MP","4K@60fps, Dolby Vision"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5600 mAh","100W سلكي","50W لاسلكي","10W شحن عكسي"),
      software: sw("Android 14","ColorOS 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP65") }),

  p("51", "oppo-reno-11-pro", "OPPO Reno 11 Pro", "OPPO", "oppo", 2024, "499$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/oppo-reno11-pro-5g.jpg",
    { screen: "AMOLED, 6.7\"", processor: "Dimensity 8200", camera: "50 MP", memory: "256GB + 12GB RAM", battery: "4600 mAh, 80W" },
    { design: ds("163.6 مم","75 مم","7.6 مم","181 جرام","إطار بلاستيك، ظهر زجاجي","أسود، أخضر"),
      screen: sc("AMOLED","6.7 بوصة","1080 x 2412","394 ppi","120 هرتز","240 هرتز","Gorilla Glass 5"),
      processor: pr("Dimensity 8200","8 أنوية","3.1 GHz","Mali-G610 MC6","4 نانومتر"),
      memory: mem("256GB","12 GB","LPDDR5","لا يدعم"),
      cameras: cam("50 MP, Sony IMX890, f/1.8, OIS","8 MP, f/2.2","32 MP تقريب 2x","لا يوجد","32 MP","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4600 mAh","80W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","ColorOS 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","لا يدعم") }),

  p("52", "oppo-a79", "OPPO A79", "OPPO", "oppo", 2024, "249$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/oppo-a79.jpg",
    { screen: "IPS LCD, 6.72\"", processor: "Dimensity 6020", camera: "50 MP", memory: "128/256GB + 4/8GB RAM", battery: "5000 mAh, 33W" },
    { design: ds("166 مم","76.1 مم","8 مم","193 جرام","بلاستيك","أسود، أخضر"),
      screen: sc("IPS LCD","6.72 بوصة","1080 x 2400","391 ppi","90 هرتز","-","لا يوجد"),
      processor: pr("Dimensity 6020","8 أنوية","2.2 GHz","Mali-G57 MC2","6 نانومتر"),
      memory: mem("128/256GB","4/8 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8","2 MP عمق","لا يوجد","لا يوجد","8 MP","1080p@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 5","Bluetooth 5.1","نعم","GPS, GLONASS"),
      battery: bat("5000 mAh","33W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","ColorOS 13"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","لا يدعم") }),

  // ===== VIVO =====
  p("60", "vivo-x100-pro", "Vivo X100 Pro", "Vivo", "vivo", 2024, "799$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/vivo-x100-pro.jpg",
    { screen: "LTPO AMOLED, 6.78\"", processor: "Dimensity 9300", camera: "50 MP Zeiss", memory: "256/512GB + 16GB RAM", battery: "5400 mAh, 100W" },
    { design: ds("164.1 مم","75.3 مم","8.9 مم","225 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق"),
      screen: sc("LTPO AMOLED","6.78 بوصة","1260 x 2800","453 ppi","120 هرتز","300 هرتز","زجاج مقاوم"),
      processor: pr("Dimensity 9300","8 أنوية","3.25 GHz","Immortalis-G720","4 نانومتر"),
      memory: mem("256/512GB","16 GB","LPDDR5T","لا يدعم"),
      cameras: cam("50 MP, Sony LYT-900, Zeiss, OIS","50 MP, f/2.0","64 MP بيريسكوب, تقريب 3x","لا يوجد","32 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5400 mAh","100W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Funtouch OS 14"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","لا يوجد","نعم","نعم","IP68") }),

  p("61", "vivo-v30-pro", "Vivo V30 Pro", "Vivo", "vivo", 2024, "449$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/vivo-v30-pro.jpg",
    { screen: "AMOLED, 6.78\"", processor: "Snapdragon 7 Gen 3", camera: "50 MP", memory: "256GB + 12GB RAM", battery: "5000 mAh, 80W" },
    { design: ds("163.2 مم","74.9 مم","7.73 مم","186 جرام","إطار بلاستيك، ظهر زجاجي","أسود، أخضر"),
      screen: sc("AMOLED","6.78 بوصة","1080 x 2400","388 ppi","120 هرتز","240 هرتز","زجاج مقاوم"),
      processor: pr("Snapdragon 7 Gen 3","8 أنوية","2.63 GHz","Adreno 720","4 نانومتر"),
      memory: mem("256GB","12 GB","LPDDR4X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX920, f/1.88, OIS","8 MP, f/2.2","لا يوجد","لا يوجد","50 MP, Zeiss","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","80W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Funtouch OS 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","لا يوجد","نعم","نعم","IP54") }),

  p("62", "vivo-y28", "Vivo Y28", "Vivo", "vivo", 2024, "179$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/vivo-y28-5g.jpg",
    { screen: "IPS LCD, 6.56\"", processor: "Dimensity 6020", camera: "50 MP", memory: "128GB + 4/6GB RAM", battery: "6000 mAh, 15W" },
    { design: ds("164.2 مم","76.1 مم","8.2 مم","197 جرام","بلاستيك","أسود، أخضر"),
      screen: sc("IPS LCD","6.56 بوصة","720 x 1612","269 ppi","90 هرتز","-","لا يوجد"),
      processor: pr("Dimensity 6020","8 أنوية","2.2 GHz","Mali-G57 MC2","7 نانومتر"),
      memory: mem("128GB","4/6 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8","لا يوجد","لا يوجد","لا يوجد","8 MP","1080p@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 5","Bluetooth 5.1","لا يدعم","GPS, GLONASS"),
      battery: bat("6000 mAh","15W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Funtouch OS 14"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","لا يدعم") }),

  // ===== HONOR =====
  p("70", "honor-magic6-pro", "Honor Magic6 Pro", "Honor", "honor", 2024, "899$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/honor-magic6-pro.jpg",
    { screen: "LTPO OLED, 6.78\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP", memory: "256/512GB + 12/16GB RAM", battery: "5600 mAh, 80W" },
    { design: ds("162.5 مم","75.8 مم","8.9 مم","229 جرام","إطار ألمنيوم، ظهر زجاجي / جلد","أسود، أخضر"),
      screen: sc("LTPO OLED","6.78 بوصة","1280 x 2800","453 ppi","120 هرتز","300 هرتز","زجاج مقاوم"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12/16 GB","LPDDR5T","لا يدعم"),
      cameras: cam("50 MP, Sony IMX906, f/1.4-2.0, OIS","50 MP, f/2.0","180 MP بيريسكوب, تقريب 2.5x","لا يوجد","12 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5600 mAh","80W سلكي","66W لاسلكي","5W شحن عكسي"),
      software: sw("Android 14","MagicOS 8.0"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","3D Face Unlock","نعم","نعم","IP68") }),

  p("71", "honor-200-pro", "Honor 200 Pro", "Honor", "honor", 2024, "549$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/honor-200-pro.jpg",
    { screen: "OLED, 6.78\"", processor: "Snapdragon 8s Gen 3", camera: "50 MP", memory: "256/512GB + 12/16GB RAM", battery: "5200 mAh, 100W" },
    { design: ds("163.3 مم","75.2 مم","8.2 مم","199 جرام","إطار ألمنيوم، ظهر زجاجي","أزرق، أسود"),
      screen: sc("OLED","6.78 بوصة","1224 x 2700","437 ppi","120 هرتز","240 هرتز","زجاج مقاوم"),
      processor: pr("Snapdragon 8s Gen 3","8 أنوية","3.0 GHz","Adreno 735","4 نانومتر"),
      memory: mem("256/512GB","12/16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX906, f/1.9, OIS","12 MP, f/2.2","50 MP بيريسكوب, تقريب 2.5x","لا يوجد","50 MP, Studio Harcourt","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5200 mAh","100W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","MagicOS 8.0"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","لا يدعم") }),

  // ===== INFINIX =====
  p("80", "infinix-gt-20-pro", "Infinix GT 20 Pro", "Infinix", "infinix", 2024, "349$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/infinix-gt-20-pro.jpg",
    { screen: "AMOLED, 6.78\"", processor: "Dimensity 8200 Ultimate", camera: "108 MP", memory: "256GB + 8/12GB RAM", battery: "5000 mAh, 45W" },
    { design: ds("163.5 مم","75.9 مم","8.6 مم","195 جرام","بلاستيك","أسود، أبيض"),
      screen: sc("AMOLED","6.78 بوصة","1080 x 2436","395 ppi","144 هرتز","-","زجاج مقاوم"),
      processor: pr("Dimensity 8200 Ultimate","8 أنوية","3.1 GHz","Mali-G610 MC6","4 نانومتر"),
      memory: mem("256GB","8/12 GB","LPDDR5","لا يدعم"),
      cameras: cam("108 MP, f/1.75, OIS","2 MP عمق","لا يوجد","لا يوجد","32 MP","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","45W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","XOS 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","لا يدعم") }),

  p("81", "infinix-hot-40-pro", "Infinix Hot 40 Pro", "Infinix", "infinix", 2024, "149$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/infinix-hot-40-pro.jpg",
    { screen: "IPS LCD, 6.78\"", processor: "Helio G99", camera: "108 MP", memory: "256GB + 8GB RAM", battery: "5000 mAh, 33W" },
    { design: ds("168.6 مم","76.6 مم","8.2 مم","199 جرام","بلاستيك","أسود، أخضر، ذهبي"),
      screen: sc("IPS LCD","6.78 بوصة","1080 x 2460","396 ppi","120 هرتز","-","لا يوجد"),
      processor: pr("MediaTek Helio G99","8 أنوية","2.2 GHz","Mali-G57 MC2","6 نانومتر"),
      memory: mem("256GB","8 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("108 MP, f/1.75","2 MP عمق","لا يوجد","لا يوجد","8 MP","1080p@30fps"),
      connectivity: con("4G LTE","Wi-Fi 5","Bluetooth 5.0","لا يدعم","GPS, GLONASS"),
      battery: bat("5000 mAh","33W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","XOS 13"),
      sensors: sn("بصمة جانبية","Face Unlock","نعم","نعم","لا يدعم") }),

  // ===== GOOGLE PIXEL =====
  p("90", "google-pixel-8-pro", "Google Pixel 8 Pro", "Google Pixel", "google", 2023, "999$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro-new.jpg",
    { screen: "LTPO OLED, 6.7\"", processor: "Google Tensor G3", camera: "50 MP", memory: "128/256/512GB + 12GB RAM", battery: "5050 mAh, 30W" },
    { design: ds("162.6 مم","76.5 مم","8.8 مم","213 جرام","إطار ألمنيوم مصقول، ظهر زجاجي","أسود، أزرق، كريمي"),
      screen: sc("LTPO OLED","6.7 بوصة","1344 x 2992","489 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Google Tensor G3","9 أنوية","3.0 GHz","Immortalis-G715","4 نانومتر"),
      memory: mem("128/256/512GB / 1TB","12 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, f/1.68, OIS","48 MP, f/1.95","48 MP, تقريب 5x","لا يوجد","10.5 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5050 mAh","30W سلكي","23W لاسلكي","شحن عكسي"),
      software: sw("Android 14","Pixel UI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP68") }),

  p("91", "google-pixel-8", "Google Pixel 8", "Google Pixel", "google", 2023, "699$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-new.jpg",
    { screen: "OLED, 6.2\"", processor: "Google Tensor G3", camera: "50 MP", memory: "128/256GB + 8GB RAM", battery: "4575 mAh, 27W" },
    { design: ds("150.5 مم","70.8 مم","8.9 مم","187 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أخضر، وردي، أزرق"),
      screen: sc("OLED","6.2 بوصة","1080 x 2400","428 ppi","120 هرتز","-","Gorilla Glass Victus 2"),
      processor: pr("Google Tensor G3","9 أنوية","3.0 GHz","Immortalis-G715","4 نانومتر"),
      memory: mem("128/256GB","8 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, f/1.68, OIS","12 MP, f/2.2","لا يوجد","لا يوجد","10.5 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4575 mAh","27W سلكي","18W لاسلكي","شحن عكسي"),
      software: sw("Android 14","Pixel UI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP68") }),

  p("92", "google-pixel-7a", "Google Pixel 7a", "Google Pixel", "google", 2023, "499$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-7a.jpg",
    { screen: "OLED, 6.1\"", processor: "Google Tensor G2", camera: "64 MP", memory: "128GB + 8GB RAM", battery: "4385 mAh, 18W" },
    { design: ds("152 مم","72.9 مم","9 مم","193.5 جرام","إطار ألمنيوم معاد تدويره، ظهر بلاستيك","أسود، أبيض، أزرق، أحمر"),
      screen: sc("OLED","6.1 بوصة","1080 x 2400","429 ppi","90 هرتز","-","Gorilla Glass 3"),
      processor: pr("Google Tensor G2","8 أنوية","2.85 GHz","Mali-G710 MP7","5 نانومتر"),
      memory: mem("128GB","8 GB","LPDDR5","لا يدعم"),
      cameras: cam("64 MP, f/1.89, OIS","13 MP, f/2.2","لا يوجد","لا يوجد","13 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6E","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4385 mAh","18W سلكي","7.5W لاسلكي","لا يدعم"),
      software: sw("Android 13","Pixel UI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP67") }),

  // ===== ONEPLUS =====
  p("100", "oneplus-12", "OnePlus 12", "OnePlus", "oneplus", 2024, "799$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg",
    { screen: "LTPO AMOLED, 6.82\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP Hasselblad", memory: "256/512GB + 12/16GB RAM", battery: "5400 mAh, 100W" },
    { design: ds("164.3 مم","75.8 مم","9.15 مم","220 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أخضر"),
      screen: sc("LTPO AMOLED","6.82 بوصة","1440 x 3168","510 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12/16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Sony LYT-808, Hasselblad, OIS","48 MP, f/2.2","64 MP بيريسكوب, تقريب 3x","لا يوجد","32 MP","4K@60fps, Dolby Vision"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5400 mAh","100W سلكي","50W لاسلكي","10W شحن عكسي"),
      software: sw("Android 14","OxygenOS 14"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","Face Unlock","نعم","نعم","IP65") }),

  p("101", "oneplus-nord-ce4", "OnePlus Nord CE4", "OnePlus", "oneplus", 2024, "299$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/oneplus-nord-ce4.jpg",
    { screen: "AMOLED, 6.7\"", processor: "Snapdragon 7 Gen 3", camera: "50 MP", memory: "128/256GB + 8GB RAM", battery: "5500 mAh, 100W" },
    { design: ds("162.6 مم","75.6 مم","7.99 مم","184 جرام","إطار بلاستيك، ظهر زجاجي","أسود، أخضر"),
      screen: sc("AMOLED","6.7 بوصة","1080 x 2412","394 ppi","120 هرتز","240 هرتز","Gorilla Glass 5"),
      processor: pr("Snapdragon 7 Gen 3","8 أنوية","2.63 GHz","Adreno 720","4 نانومتر"),
      memory: mem("128/256GB","8 GB","LPDDR4X","لا يدعم"),
      cameras: cam("50 MP, Sony LYT-600, f/1.8, OIS","2 MP عمق","لا يوجد","لا يوجد","16 MP","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5500 mAh","100W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","OxygenOS 14"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","لا يدعم") }),

  // ===== NOKIA =====
  p("110", "nokia-g42", "Nokia G42 5G", "Nokia", "nokia", 2023, "199$", "budget",
    "https://fdn2.gsmarena.com/vv/bigpic/nokia-g42-5g.jpg",
    { screen: "IPS LCD, 6.56\"", processor: "Snapdragon 480+", camera: "50 MP", memory: "128GB + 6GB RAM", battery: "5000 mAh, 20W" },
    { design: ds("164.6 مم","75.8 مم","8.5 مم","193 جرام","بلاستيك معاد تدويره","رمادي، بنفسجي"),
      screen: sc("IPS LCD","6.56 بوصة","720 x 1612","269 ppi","90 هرتز","-","زجاج مقاوم"),
      processor: pr("Snapdragon 480+ 5G","8 أنوية","2.2 GHz","Adreno 619","6 نانومتر"),
      memory: mem("128GB","6 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8","2 MP عمق","لا يوجد","لا يوجد","8 MP","1080p@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 5","Bluetooth 5.1","لا يدعم","GPS, GLONASS"),
      battery: bat("5000 mAh","20W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","Android نقي"),
      sensors: sn("بصمة جانبية","Face Unlock","نعم","نعم","IP52") }),

  // ===== MOTOROLA =====
  p("120", "motorola-edge-50-ultra", "Motorola Edge 50 Ultra", "Motorola", "motorola", 2024, "799$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-ultra.jpg",
    { screen: "LTPO AMOLED, 6.7\"", processor: "Snapdragon 8s Gen 3", camera: "50 MP", memory: "256/512GB/1TB + 16GB RAM", battery: "4500 mAh, 125W" },
    { design: ds("161.1 مم","72.4 مم","8.6 مم","197 جرام","إطار ألمنيوم، ظهر خشب / جلد","خشبي، جلد بني"),
      screen: sc("LTPO AMOLED","6.7 بوصة","1220 x 2712","444 ppi","144 هرتز","360 هرتز","Gorilla Glass Victus"),
      processor: pr("Snapdragon 8s Gen 3","8 أنوية","3.0 GHz","Adreno 735","4 نانومتر"),
      memory: mem("256/512GB / 1TB","16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, f/1.6, OIS","50 MP, f/2.2","64 MP بيريسكوب, تقريب 3x","لا يوجد","50 MP","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo"),
      battery: bat("4500 mAh","125W سلكي","50W لاسلكي","10W شحن عكسي"),
      software: sw("Android 14","Hello UI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP68") }),

  p("121", "motorola-moto-g84", "Motorola Moto G84", "Motorola", "motorola", 2023, "249$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g84-5g.jpg",
    { screen: "AMOLED, 6.5\"", processor: "Snapdragon 695", camera: "50 MP", memory: "256GB + 12GB RAM", battery: "5000 mAh, 33W" },
    { design: ds("160.3 مم","74.4 مم","7.6 مم","168 جرام","إطار بلاستيك، ظهر جلد","أسود، أزرق"),
      screen: sc("AMOLED","6.5 بوصة","1080 x 2400","405 ppi","120 هرتز","-","Gorilla Glass 3"),
      processor: pr("Snapdragon 695","8 أنوية","2.2 GHz","Adreno 619","6 نانومتر"),
      memory: mem("256GB","12 GB","LPDDR4X","يدعم حتى 1TB"),
      cameras: cam("50 MP, f/1.8, OIS","8 MP, f/2.2","لا يوجد","لا يوجد","16 MP","1080p@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 5","Bluetooth 5.1","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","33W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 13","Android شبه نقي"),
      sensors: sn("بصمة جانبية","Face Unlock","نعم","نعم","IP54") }),

  // ===== HUAWEI =====
  p("130", "huawei-pura-70-ultra", "Huawei Pura 70 Ultra", "Huawei", "huawei", 2024, "1499$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/huawei-pura-70-ultra-.jpg",
    { screen: "LTPO OLED, 6.8\"", processor: "Kirin 9010", camera: "50 MP, عدسة متغيرة", memory: "512GB/1TB + 16GB RAM", battery: "5200 mAh, 100W" },
    { design: ds("162.6 مم","75.1 مم","8.4 مم","226 جرام","إطار تيتانيوم، ظهر سيراميك","أسود، أبيض، أخضر"),
      screen: sc("LTPO OLED","6.8 بوصة","1260 x 2844","460 ppi","120 هرتز","300 هرتز","Kunlun Glass 2"),
      processor: pr("Kirin 9010","8 أنوية","2.3 GHz","Maleoon 910","7 نانومتر"),
      memory: mem("512GB / 1TB","16 GB","LPDDR5T","يدعم NM Card"),
      cameras: cam("50 MP, فتحة متغيرة f/1.4-4.0, OIS","40 MP","50 MP, تقريب 3.5x","لا يوجد","13 MP + 3D ToF","4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 6","Bluetooth 5.2","نعم","GPS, GLONASS, BDS"),
      battery: bat("5200 mAh","100W سلكي","80W لاسلكي","20W شحن عكسي"),
      software: sw("HarmonyOS 4.2","—"),
      sensors: sn("بصمة فوق صوتية تحت الشاشة","3D Face Unlock","نعم","نعم","IP68") }),

  p("131", "huawei-nova-12-ultra", "Huawei Nova 12 Ultra", "Huawei", "huawei", 2024, "599$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/huawei-nova-12-ultra.jpg",
    { screen: "OLED, 6.76\"", processor: "Kirin 9000S1", camera: "50 MP", memory: "256/512GB + 12GB RAM", battery: "5000 mAh, 100W" },
    { design: ds("162.5 مم","74.5 مم","7.8 مم","202 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أبيض، أخضر"),
      screen: sc("OLED","6.76 بوصة","1200 x 2688","436 ppi","120 هرتز","-","زجاج مقاوم"),
      processor: pr("Kirin 9000S1","8 أنوية","2.35 GHz","Maleoon 910","7 نانومتر"),
      memory: mem("256/512GB","12 GB","LPDDR5","لا يدعم"),
      cameras: cam("50 MP, f/1.9, OIS","8 MP, f/2.2","لا يوجد","لا يوجد","60 MP","4K@30fps"),
      connectivity: con("4G LTE","Wi-Fi 6","Bluetooth 5.2","نعم","GPS, GLONASS, BDS"),
      battery: bat("5000 mAh","100W سلكي","لا يدعم","لا يدعم"),
      software: sw("HarmonyOS 4.0","—"),
      sensors: sn("بصمة بصرية تحت الشاشة","3D Face Unlock","نعم","نعم","لا يدعم") }),

  // ===== SONY =====
  p("140", "sony-xperia-1-vi", "Sony Xperia 1 VI", "Sony", "sony", 2024, "1399$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-vi.jpg",
    { screen: "LTPO OLED, 6.5\"", processor: "Snapdragon 8 Gen 3", camera: "52 MP Exmor T", memory: "256/512GB + 12GB RAM", battery: "5000 mAh, 30W" },
    { design: ds("162 مم","74.4 مم","8.2 مم","192 جرام","إطار ألمنيوم، ظهر Gorilla Glass Victus 2","أسود، أخضر، فضي"),
      screen: sc("LTPO OLED","6.5 بوصة","1080 x 2340","395 ppi","120 هرتز","240 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12 GB","LPDDR5X","يدعم حتى 1.5TB"),
      cameras: cam("52 MP Exmor T, f/1.9, OIS","12 MP, f/2.2","12 MP بيريسكوب, تقريب 3.5-7.1x","لا يوجد","12 MP","4K@120fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.4","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","30W سلكي","15W لاسلكي","5W شحن عكسي"),
      software: sw("Android 14","Sony UI"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","IP68") }),

  p("141", "sony-xperia-10-vi", "Sony Xperia 10 VI", "Sony", "sony", 2024, "499$", "mid",
    "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-10-vi.jpg",
    { screen: "OLED, 6.1\"", processor: "Snapdragon 6 Gen 1", camera: "48 MP", memory: "128GB + 8GB RAM", battery: "5000 mAh, 30W" },
    { design: ds("155 مم","68 مم","8.3 مم","164 جرام","إطار بلاستيك، ظهر بلاستيك","أسود، أبيض، أزرق"),
      screen: sc("OLED","6.1 بوصة","1080 x 2520","457 ppi","60 هرتز","-","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 6 Gen 1","8 أنوية","2.2 GHz","Adreno 710","4 نانومتر"),
      memory: mem("128GB","8 GB","LPDDR5","يدعم حتى 1.5TB"),
      cameras: cam("48 MP, f/1.8, OIS","8 MP, f/2.2","لا يوجد","لا يوجد","8 MP","4K@30fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 5","Bluetooth 5.2","نعم","GPS, GLONASS, Galileo"),
      battery: bat("5000 mAh","30W سلكي","لا يدعم","لا يدعم"),
      software: sw("Android 14","Sony UI"),
      sensors: sn("بصمة جانبية","لا يوجد","نعم","نعم","IP68") }),

  // ===== ASUS =====
  p("150", "asus-rog-phone-8-pro", "ASUS ROG Phone 8 Pro", "ASUS", "asus", 2024, "1199$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-8-pro.jpg",
    { screen: "LTPO AMOLED, 6.78\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP", memory: "256/512GB + 16/24GB RAM", battery: "5500 mAh, 65W" },
    { design: ds("163.8 مم","76.8 مم","8.9 مم","225 جرام","إطار ألمنيوم، ظهر Gorilla Glass Victus 2","أسود"),
      screen: sc("LTPO AMOLED","6.78 بوصة","1080 x 2400","388 ppi","165 هرتز","720 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","16/24 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX890, f/1.9, OIS","13 MP, f/2.2","32 MP تقريب 3x","لا يوجد","32 MP","8K@24fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5500 mAh","65W سلكي","15W لاسلكي","لا يدعم"),
      software: sw("Android 14","ROG UI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP68") }),

  p("151", "asus-zenfone-11-ultra", "ASUS Zenfone 11 Ultra", "ASUS", "asus", 2024, "899$", "flagship",
    "https://fdn2.gsmarena.com/vv/bigpic/asus-zenfone-11-ultra.jpg",
    { screen: "LTPO AMOLED, 6.78\"", processor: "Snapdragon 8 Gen 3", camera: "50 MP", memory: "256/512GB + 12/16GB RAM", battery: "5500 mAh, 65W" },
    { design: ds("163.8 مم","76.8 مم","8.9 مم","225 جرام","إطار ألمنيوم، ظهر زجاجي","أسود، أزرق"),
      screen: sc("LTPO AMOLED","6.78 بوصة","1080 x 2400","388 ppi","144 هرتز","300 هرتز","Gorilla Glass Victus 2"),
      processor: pr("Snapdragon 8 Gen 3","8 أنوية","3.3 GHz","Adreno 750","4 نانومتر"),
      memory: mem("256/512GB","12/16 GB","LPDDR5X","لا يدعم"),
      cameras: cam("50 MP, Sony IMX890, f/1.9, OIS","13 MP, f/2.2","32 MP تقريب 3x","لا يوجد","32 MP","8K@24fps, 4K@60fps"),
      connectivity: con("5G, 4G LTE","Wi-Fi 7","Bluetooth 5.3","نعم","GPS, GLONASS, Galileo, BDS"),
      battery: bat("5500 mAh","65W سلكي","15W لاسلكي","لا يدعم"),
      software: sw("Android 14","ZenUI"),
      sensors: sn("بصمة بصرية تحت الشاشة","Face Unlock","نعم","نعم","IP68") }),
];

export function getPhonesByBrand(brandSlug: string): Phone[] {
  return phones.filter(p => p.brandSlug === brandSlug);
}

export function getPhoneBySlug(slug: string): Phone | undefined {
  return phones.find(p => p.slug === slug);
}

export function getSimilarPhones(phone: Phone, count = 4): Phone[] {
  // Score similarity based on price category, processor tier, and battery
  const scored = phones
    .filter(ph => ph.id !== phone.id)
    .map(ph => {
      let score = 0;
      if (ph.priceCategory === phone.priceCategory) score += 3;
      if (ph.brandSlug !== phone.brandSlug) score += 1; // prefer different brands
      // similar year
      if (Math.abs(ph.year - phone.year) <= 1) score += 1;
      return { phone: ph, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(s => s.phone);
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase();
  return phones.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q)
  );
}
