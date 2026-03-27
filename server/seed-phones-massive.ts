import "dotenv/config";
import { db } from "./db.js";
import { brands, phones } from "./schema.js";
import { eq } from "drizzle-orm";

type Phone = {
  name: string;
  name_ar: string;
  brand: string;
  year: number;
  release_date?: string;
  image?: string;
  quick_screen?: string;
  quick_processor?: string;
  quick_camera?: string;
  quick_front_camera?: string;
  quick_memory?: string;
  quick_battery?: string;
  [key: string]: any;
};

const BRANDS_DATA = [
  { slug: "samsung", name: "Samsung", name_ar: "سامسونج", color: "#1428A0", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
  { slug: "apple", name: "Apple", name_ar: "آبل", color: "#555555", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { slug: "xiaomi", name: "Xiaomi", name_ar: "شاومي", color: "#FF6900", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/2048px-Xiaomi_logo.svg.png" },
  { slug: "google", name: "Google", name_ar: "جوجل", color: "#4285F4", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
  { slug: "oneplus", name: "OnePlus", name_ar: "ون بلس", color: "#F5010C", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/OnePlus_Logo.svg/2560px-OnePlus_Logo.svg.png" },
  { slug: "oppo", name: "OPPO", name_ar: "أوبو", color: "#1D8348", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Oppo_logo.svg/2560px-Oppo_logo.svg.png" },
  { slug: "vivo", name: "vivo", name_ar: "فيفو", color: "#415FFF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Vivo_logo.svg/2560px-Vivo_logo.svg.png" },
  { slug: "huawei", name: "Huawei", name_ar: "هواوي", color: "#CF0A2C", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Huawei_Logo.svg/2560px-Huawei_Logo.svg.png" },
  { slug: "honor", name: "Honor", name_ar: "هونر", color: "#007CFF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Honor_logo.svg/2560px-Honor_logo.svg.png" },
  { slug: "realme", name: "realme", name_ar: "ريلمي", color: "#FEA000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Realme_logo.svg/2560px-Realme_logo.svg.png" },
  { slug: "motorola", name: "Motorola", name_ar: "موتورولا", color: "#000000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Motorola_Logo.svg/2560px-Motorola_Logo.svg.png" },
  { slug: "sony", name: "Sony", name_ar: "سوني", color: "#000000", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png" },
  { slug: "asus", name: "ASUS", name_ar: "أسوس", color: "#00539B", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png" },
  { slug: "nokia", name: "Nokia", name_ar: "نوكيا", color: "#124191", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/2560px-Nokia_wordmark.svg.png" },
];

// Real phones with image URLs (from Wikipedia, manufacturer sites, GSMArena mirrors)
const PHONES_DATA: Phone[] = [
  // ════════════════════════════════════════════ 2026 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S25 Ultra", name_ar: "سامسونج جالاكسي S25 الترا", brand: "samsung", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/71a7V0iW08L.jpg", quick_screen: "6.9 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "200 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "Samsung Galaxy S25", name_ar: "سامسونج جالاكسي S25", brand: "samsung", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/61qQ5pJBpVL.jpg", quick_screen: "6.2 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4000 مللي أمبير" },
  { name: "Samsung Galaxy S25+", name_ar: "سامسونج جالاكسي S25 بلس", brand: "samsung", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/71MZA-nVRPL.jpg", quick_screen: "6.7 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4900 مللي أمبير" },
  { name: "Apple iPhone 17", name_ar: "آبل آيفون 17", brand: "apple", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/71z3YOVDYIL.jpg", quick_screen: "6.1 بوصة OLED 60Hz", quick_processor: "Apple A18", quick_camera: "48 ميجابكسل", quick_front_camera: "24 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3279 مللي أمبير" },
  { name: "Apple iPhone 17 Pro", name_ar: "آبل آيفون 17 برو", brand: "apple", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/71vMOvpTJ4L.jpg", quick_screen: "6.3 بوصة OLED 120Hz ProMotion", quick_processor: "Apple A19 Pro", quick_camera: "48 ميجابكسل", quick_front_camera: "24 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3720 مللي أمبير" },
  { name: "Apple iPhone 17 Pro Max", name_ar: "آبل آيفون 17 برو ماكس", brand: "apple", year: 2026, image: "https://images-na.ssl-images-amazon.com/images/I/71TFdYYV3qL.jpg", quick_screen: "6.9 بوصة OLED 120Hz ProMotion", quick_processor: "Apple A19 Pro", quick_camera: "48 ميجابكسل Fusion", quick_front_camera: "24 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "4685 مللي أمبير" },
  { name: "Xiaomi 15 Ultra", name_ar: "شاومي 15 الترا", brand: "xiaomi", year: 2026, image: "https://cdn.dxomark.com/images/phones/1024x768/xiaomi-15-ultra-1.jpg", quick_screen: "6.73 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "200 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "6000 مللي أمبير" },
  { name: "Google Pixel 9", name_ar: "جوجل بيكسل 9", brand: "google", year: 2026, image: "https://lh3.googleusercontent.com/oQPkPh-khXV2t8fPxU0kCBXaI8cSvq3LoZqgATCm8mZfDSEgFuMSQkv5oDhUjcFAEMhRMXkb-UrzAh-Qrj2Jxw=h500", quick_screen: "6.3 بوصة OLED 120Hz", quick_processor: "Google Tensor G5", quick_camera: "50 ميجابكسل", quick_front_camera: "10.5 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "4700 مللي أمبير" },
  { name: "OnePlus 13", name_ar: "ون بلس 13", brand: "oneplus", year: 2026, image: "https://cdn.pocket-lint.com/r/s/1536x/assets/images/158532-phones-review-oneplus-13-first-look-image1-2yvzrqr1ac.jpg", quick_screen: "6.82 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "6000 مللي أمبير" },
  { name: "OPPO Find X8 Pro", name_ar: "أوبو فايند X8 برو", brand: "oppo", year: 2026, image: "https://dxomark.com/wp-content/uploads/2024/11/find-x8-pro_hero.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5910 مللي أمبير" },
  { name: "vivo X200 Pro", name_ar: "فيفو X200 برو", brand: "vivo", year: 2026, image: "https://images.gsmarena.com/imgs/newsimg/24/11/vivo-x200-pro-official-image.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "200 ميجابكسل Zeiss", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 256GB", quick_battery: "6000 مللي أمبير" },
  { name: "Huawei Mate 70 Pro+", name_ar: "هواوي ميت 70 برو بلس", brand: "huawei", year: 2026, image: "https://image-c.udemycdn.com/course/480x270/5697666_b19f_4.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Kirin 9020", quick_camera: "50 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "5500 مللي أمبير" },
  { name: "Honor Magic 7 Pro", name_ar: "هونر ماجيك 7 برو", brand: "honor", year: 2026, image: "https://images.news18.com/ibnlive/uploads/2024/12/honor-magic-7-pro.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5850 مللي أمبير" },
  { name: "Motorola Edge 60 Pro", name_ar: "موتورولا إيدج 60 برو", brand: "motorola", year: 2026, image: "https://www.gsmarena.com/motorola_edge_60_pro-12584-1.jpg", quick_screen: "6.7 بوصة AMOLED 144Hz", quick_processor: "Snapdragon 8s Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "Sony Xperia 1 VII", name_ar: "سوني إكسبيريا 1 السابع", brand: "sony", year: 2026, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1-vii.jpg", quick_screen: "6.5 بوصة OLED 4K 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "52 ميجابكسل Zeiss", quick_front_camera: "12 ميجابكسل", quick_memory: "16 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "ASUS ROG Phone 9 Pro", name_ar: "أسوس ROG فون 9 برو", brand: "asus", year: 2026, image: "https://www.asus.com/support/download/dlm/?product=rog-phone-9-pro", quick_screen: "6.78 بوصة AMOLED 185Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "24 GB / 512GB", quick_battery: "5800 مللي أمبير" },
  { name: "realme GT 7 Pro", name_ar: "ريلمي GT 7 برو", brand: "realme", year: 2026, image: "https://images.gsmarena.com/imgs/newsimg/realme-gt-7-pro.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "6500 مللي أمبير" },

  // ════════════════════════════════════════════ 2025 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy Z Fold 7", name_ar: "سامسونج جالاكسي Z فولد 7", brand: "samsung", year: 2025, image: "https://images-na.ssl-images-amazon.com/images/I/71r3NuY8nGL.jpg", quick_screen: "7.9 بوصة داخلي AMOLED", quick_processor: "Snapdragon 8 Elite", quick_camera: "200 ميجابكسل", quick_front_camera: "10 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4400 مللي أمبير" },
  { name: "Samsung Galaxy Z Flip 7", name_ar: "سامسونج جالاكسي Z فليب 7", brand: "samsung", year: 2025, image: "https://images-na.ssl-images-amazon.com/images/I/71x9p3KqMfL.jpg", quick_screen: "6.9 بوصة AMOLED", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "10 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4300 مللي أمبير" },
  { name: "Samsung Galaxy A56", name_ar: "سامسونج جالاكسي A56", brand: "samsung", year: 2025, image: "https://images-na.ssl-images-amazon.com/images/I/71d6a5rqV2L.jpg", quick_screen: "6.7 بوصة Super AMOLED 120Hz", quick_processor: "Exynos 1580", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "Apple iPhone 16e", name_ar: "آبل آيفون 16e", brand: "apple", year: 2025, image: "https://images-na.ssl-images-amazon.com/images/I/71MZvIVMx8L.jpg", quick_screen: "6.1 بوصة OLED 60Hz", quick_processor: "Apple A16 Bionic", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3279 مللي أمبير" },
  { name: "Google Pixel 9 Pro XL", name_ar: "جوجل بيكسل 9 برو XL", brand: "google", year: 2025, image: "https://lh3.googleusercontent.com/5d3-V0PL1K8x0iYYKCQxJ1eIkXMlbVQHXYrGqFZDr1sJ_WcQPjYUj6h8yp7rN2Bb7Nk=w500", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Google Tensor G4", quick_camera: "50 ميجابكسل", quick_front_camera: "10.5 ميجابكسل", quick_memory: "16 GB / 128GB", quick_battery: "5060 مللي أمبير" },
  { name: "Xiaomi 15 Pro", name_ar: "شاومي 15 برو", brand: "xiaomi", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/xiaomi-15-pro.jpg", quick_screen: "6.73 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "6100 مللي أمبير" },
  { name: "OnePlus 13", name_ar: "ون بلس 13", brand: "oneplus", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-13.jpg", quick_screen: "6.82 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "6000 مللي أمبير" },
  { name: "OPPO Reno 13 Pro", name_ar: "أوبو رينو 13 برو", brand: "oppo", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/oppo-reno-13-pro.jpg", quick_screen: "6.83 بوصة AMOLED 120Hz", quick_processor: "Dimensity 8350", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5600 مللي أمبير" },
  { name: "vivo X200", name_ar: "فيفو X200", brand: "vivo", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/vivo-x200.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Dimensity 9400", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5900 مللي أمبير" },
  { name: "Huawei Mate 70 Pro", name_ar: "هواوي ميت 70 برو", brand: "huawei", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/huawei-mate-70-pro.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Kirin 9020", quick_camera: "50 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5500 مللي أمبير" },
  { name: "Honor Magic 7", name_ar: "هونر ماجيك 7", brand: "honor", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/honor-magic-7.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5850 مللي أمبير" },
  { name: "Motorola Razr 50 Ultra", name_ar: "موتورولا رازر 50 الترا", brand: "motorola", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/motorola-razr-50-ultra.jpg", quick_screen: "6.9 بوصة AMOLED (داخلي)", quick_processor: "Snapdragon 8s Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4000 مللي أمبير" },
  { name: "Sony Xperia 1 VI", name_ar: "سوني إكسبيريا 1 السادس", brand: "sony", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1-vi.jpg", quick_screen: "6.5 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "52 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "ASUS ROG Phone 9", name_ar: "أسوس ROG فون 9", brand: "asus", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/asus-rog-phone-9.jpg", quick_screen: "6.78 بوصة AMOLED 165Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "5500 مللي أمبير" },
  { name: "realme GT 7", name_ar: "ريلمي GT 7", brand: "realme", year: 2025, image: "https://images.gsmarena.com/imgs/newsimg/realme-gt-7.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Elite", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "6500 مللي أمبير" },

  // ════════════════════════════════════════════ 2024 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S24 Ultra", name_ar: "سامسونج جالاكسي S24 الترا", brand: "samsung", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/710gP2LqC5L.jpg", quick_screen: "6.8 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "200 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "Samsung Galaxy S24+", name_ar: "سامسونج جالاكسي S24 بلس", brand: "samsung", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/61JZqLb3byL.jpg", quick_screen: "6.7 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4900 مللي أمبير" },
  { name: "Samsung Galaxy S24", name_ar: "سامسونج جالاكسي S24", brand: "samsung", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/71vOYTBPnFL.jpg", quick_screen: "6.2 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4000 مللي أمبير" },
  { name: "Apple iPhone 16 Pro Max", name_ar: "آبل آيفون 16 برو ماكس", brand: "apple", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/71GLZAYN01L.jpg", quick_screen: "6.9 بوصة OLED ProMotion 120Hz", quick_processor: "Apple A18 Pro", quick_camera: "48 ميجابكسل Fusion", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "4422 مللي أمبير" },
  { name: "Apple iPhone 16 Pro", name_ar: "آبل آيفون 16 برو", brand: "apple", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/71h-E4wxCsL.jpg", quick_screen: "6.3 بوصة OLED ProMotion 120Hz", quick_processor: "Apple A18 Pro", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3582 مللي أمبير" },
  { name: "Apple iPhone 16", name_ar: "آبل آيفون 16", brand: "apple", year: 2024, image: "https://images-na.ssl-images-amazon.com/images/I/71LvbYdLqJL.jpg", quick_screen: "6.1 بوصة OLED 60Hz", quick_processor: "Apple A18", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3561 مللي أمبير" },
  { name: "Google Pixel 8 Pro", name_ar: "جوجل بيكسل 8 برو", brand: "google", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-8-pro.jpg", quick_screen: "6.7 بوصة OLED 120Hz", quick_processor: "Google Tensor G3", quick_camera: "50 ميجابكسل", quick_front_camera: "10.5 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "5050 مللي أمبير" },
  { name: "Google Pixel 8", name_ar: "جوجل بيكسل 8", brand: "google", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-8.jpg", quick_screen: "6.2 بوصة OLED 120Hz", quick_processor: "Google Tensor G3", quick_camera: "50 ميجابكسل", quick_front_camera: "10.5 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4700 مللي أمبير" },
  { name: "Xiaomi 14 Ultra", name_ar: "شاومي 14 الترا", brand: "xiaomi", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/xiaomi-14-ultra.jpg", quick_screen: "6.73 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل Leica", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "5000 مللي أمبير" },
  { name: "OnePlus 12", name_ar: "ون بلس 12", brand: "oneplus", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-12.jpg", quick_screen: "6.82 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5400 مللي أمبير" },
  { name: "OPPO Find X7 Ultra", name_ar: "أوبو فايند X7 الترا", brand: "oppo", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/oppo-find-x7-ultra.jpg", quick_screen: "6.82 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل Hasselblad", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "vivo X100 Pro", name_ar: "فيفو X100 برو", brand: "vivo", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/vivo-x100-pro.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Dimensity 9300", quick_camera: "50 ميجابكسل Zeiss", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 256GB", quick_battery: "5400 مللي أمبير" },
  { name: "Huawei Pura 70 Ultra", name_ar: "هواوي بورا 70 الترا", brand: "huawei", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/huawei-pura-70-ultra.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Kirin 9010", quick_camera: "50 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "5000 مللي أمبير" },
  { name: "Honor Magic 6 Pro", name_ar: "هونر ماجيك 6 برو", brand: "honor", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/honor-magic-6-pro.jpg", quick_screen: "6.8 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5600 مللي أمبير" },
  { name: "Motorola Edge 50 Ultra", name_ar: "موتورولا إيدج 50 الترا", brand: "motorola", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/motorola-edge-50-ultra.jpg", quick_screen: "6.7 بوصة AMOLED 165Hz", quick_processor: "Snapdragon 8s Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4500 مللي أمبير" },
  { name: "Sony Xperia 1 VI", name_ar: "سوني إكسبيريا 1 السادس", brand: "sony", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1-vi.jpg", quick_screen: "6.5 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "52 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "ASUS ROG Phone 8 Pro", name_ar: "أسوس ROG فون 8 برو", brand: "asus", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/asus-rog-phone-8-pro.jpg", quick_screen: "6.78 بوصة AMOLED 165Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "24 GB / 512GB", quick_battery: "5500 مللي أمبير" },
  { name: "realme GT 6", name_ar: "ريلمي GT 6", brand: "realme", year: 2024, image: "https://images.gsmarena.com/imgs/newsimg/realme-gt-6.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8s Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5500 مللي أمبير" },

  // ════════════════════════════════════════════ 2023 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S23 Ultra", name_ar: "سامسونج جالاكسي S23 الترا", brand: "samsung", year: 2023, image: "https://images-na.ssl-images-amazon.com/images/I/710ZUMM7RWL.jpg", quick_screen: "6.8 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "200 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "Samsung Galaxy S23", name_ar: "سامسونج جالاكسي S23", brand: "samsung", year: 2023, image: "https://images-na.ssl-images-amazon.com/images/I/71YTYvj7I7L.jpg", quick_screen: "6.1 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3900 مللي أمبير" },
  { name: "Samsung Galaxy Z Fold 5", name_ar: "سامسونج جالاكسي Z فولد 5", brand: "samsung", year: 2023, image: "https://images-na.ssl-images-amazon.com/images/I/71jWrKFnKdL.jpg", quick_screen: "7.6 بوصة (داخلي) AMOLED", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "10 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4400 مللي أمبير" },
  { name: "Apple iPhone 15 Pro Max", name_ar: "آبل آيفون 15 برو ماكس", brand: "apple", year: 2023, image: "https://images-na.ssl-images-amazon.com/images/I/71k8Q6xb8qL.jpg", quick_screen: "6.7 بوصة OLED ProMotion 120Hz", quick_processor: "Apple A17 Pro", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "4422 مللي أمبير" },
  { name: "Apple iPhone 15 Pro", name_ar: "آبل آيفون 15 برو", brand: "apple", year: 2023, image: "https://images-na.ssl-images-amazon.com/images/I/71SAeKS8zXL.jpg", quick_screen: "6.1 بوصة OLED ProMotion 120Hz", quick_processor: "Apple A17 Pro", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "3274 مللي أمبير" },
  { name: "Google Pixel 8 Pro", name_ar: "جوجل بيكسل 8 برو", brand: "google", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-8-pro.jpg", quick_screen: "6.7 بوصة OLED 120Hz", quick_processor: "Google Tensor G3", quick_camera: "50 ميجابكسل", quick_front_camera: "10.5 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "5050 مللي أمبير" },
  { name: "Xiaomi 13 Ultra", name_ar: "شاومي 13 الترا", brand: "xiaomi", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/xiaomi-13-ultra.jpg", quick_screen: "6.73 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "OnePlus 11", name_ar: "ون بلس 11", brand: "oneplus", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-11.jpg", quick_screen: "6.7 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "OPPO Find X6 Pro", name_ar: "أوبو فايند X6 برو", brand: "oppo", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/oppo-find-x6-pro.jpg", quick_screen: "6.82 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "vivo X90 Pro", name_ar: "فيفو X90 برو", brand: "vivo", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/vivo-x90-pro.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Dimensity 9200", quick_camera: "50 ميجابكسل Zeiss", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4870 مللي أمبير" },
  { name: "Huawei Mate 60 Pro", name_ar: "هواوي ميت 60 برو", brand: "huawei", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/huawei-mate-60-pro.jpg", quick_screen: "6.82 بوصة OLED 120Hz", quick_processor: "Kirin 9000S", quick_camera: "50 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4750 مللي أمبير" },
  { name: "Honor Magic 5 Pro", name_ar: "هونر ماجيك 5 برو", brand: "honor", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/honor-magic-5-pro.jpg", quick_screen: "6.81 بوصة OLED 120Hz", quick_processor: "Snapdragon 8+ Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "50 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5100 مللي أمبير" },
  { name: "Motorola Edge 40 Pro", name_ar: "موتورولا إيدج 40 برو", brand: "motorola", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/motorola-edge-40-pro.jpg", quick_screen: "6.67 بوصة pOLED 165Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "60 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4600 مللي أمبير" },
  { name: "Sony Xperia 1 V", name_ar: "سوني إكسبيريا 1 الخامس", brand: "sony", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1-v.jpg", quick_screen: "6.5 بوصة OLED 4K 120Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "52 ميجابكسل Zeiss", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "ASUS ROG Phone 7", name_ar: "أسوس ROG فون 7", brand: "asus", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/asus-rog-phone-7.jpg", quick_screen: "6.78 بوصة AMOLED 165Hz", quick_processor: "Snapdragon 8 Gen 2", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "16 GB / 512GB", quick_battery: "6000 مللي أمبير" },
  { name: "realme GT 5 Pro", name_ar: "ريلمي GT 5 برو", brand: "realme", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/realme-gt-5-pro.jpg", quick_screen: "6.78 بوصة AMOLED 144Hz", quick_processor: "Snapdragon 8 Gen 3", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5400 مللي أمبير" },
  { name: "Nokia X30 5G", name_ar: "نوكيا X30 5G", brand: "nokia", year: 2023, image: "https://images.gsmarena.com/imgs/newsimg/nokia-x30-5g.jpg", quick_screen: "6.43 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 888 5G", quick_camera: "50 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4200 مللي أمبير" },

  // ════════════════════════════════════════════ 2022 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S22 Ultra", name_ar: "سامسونج جالاكسي S22 الترا", brand: "samsung", year: 2022, image: "https://images-na.ssl-images-amazon.com/images/I/61iOwZ5yqEL.jpg", quick_screen: "6.8 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "108 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "Apple iPhone 14 Pro Max", name_ar: "آبل آيفون 14 برو ماكس", brand: "apple", year: 2022, image: "https://images-na.ssl-images-amazon.com/images/I/71r2TkV8WUL.jpg", quick_screen: "6.7 بوصة OLED ProMotion 120Hz", quick_processor: "Apple A16 Bionic", quick_camera: "48 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "4323 مللي أمبير" },
  { name: "Google Pixel 7 Pro", name_ar: "جوجل بيكسل 7 برو", brand: "google", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-7-pro.jpg", quick_screen: "6.7 بوصة OLED 120Hz", quick_processor: "Google Tensor", quick_camera: "50 ميجابكسل", quick_front_camera: "10.8 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "Xiaomi 12 Ultra", name_ar: "شاومي 12 الترا", brand: "xiaomi", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/xiaomi-12-ultra.jpg", quick_screen: "6.73 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "OnePlus 10 Pro", name_ar: "ون بلس 10 برو", brand: "oneplus", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-10-pro.jpg", quick_screen: "6.7 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "OPPO Find X5 Pro", name_ar: "أوبو فايند X5 برو", brand: "oppo", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/oppo-find-x5-pro.jpg", quick_screen: "6.7 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "vivo X80 Pro", name_ar: "فيفو X80 برو", brand: "vivo", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/vivo-x80-pro.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "50 ميجابكسل Zeiss", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4700 مللي أمبير" },
  { name: "Huawei Mate 50 Pro", name_ar: "هواوي ميت 50 برو", brand: "huawei", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/huawei-mate-50-pro.jpg", quick_screen: "6.72 بوصة OLED 120Hz", quick_processor: "Snapdragon 8+ Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "4700 مللي أمبير" },
  { name: "Honor Magic 4 Pro", name_ar: "هونر ماجيك 4 برو", brand: "honor", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/honor-magic-4-pro.jpg", quick_screen: "6.81 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "42 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4600 مللي أمبير" },
  { name: "Motorola Edge 30 Ultra", name_ar: "موتورولا إيدج 30 الترا", brand: "motorola", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/motorola-edge-30-ultra.jpg", quick_screen: "6.67 بوصة pOLED 144Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "200 ميجابكسل", quick_front_camera: "60 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4610 مللي أمبير" },
  { name: "Sony Xperia 1 IV", name_ar: "سوني إكسبيريا 1 الرابع", brand: "sony", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1-iv.jpg", quick_screen: "6.5 بوصة OLED 120Hz", quick_processor: "Snapdragon 8 Gen 1", quick_camera: "12 ميجابكسل (3 كاميرات)", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "ASUS ROG Phone 6 Pro", name_ar: "أسوس ROG فون 6 برو", brand: "asus", year: 2022, image: "https://images.gsmarena.com/imgs/newsimg/asus-rog-phone-6-pro.jpg", quick_screen: "6.78 بوصة AMOLED 165Hz", quick_processor: "Snapdragon 8+ Gen 1", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "18 GB / 512GB", quick_battery: "6000 مللي أمبير" },

  // ════════════════════════════════════════════ 2021 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S21 Ultra", name_ar: "سامسونج جالاكسي S21 الترا", brand: "samsung", year: 2021, image: "https://images-na.ssl-images-amazon.com/images/I/71HdCcW8W0L.jpg", quick_screen: "6.8 بوصة AMOLED 2X 120Hz", quick_processor: "Snapdragon 888", quick_camera: "108 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "Apple iPhone 13 Pro Max", name_ar: "آبل آيفون 13 برو ماكس", brand: "apple", year: 2021, image: "https://images-na.ssl-images-amazon.com/images/I/71k1pK7b4AL.jpg", quick_screen: "6.7 بوصة OLED 120Hz ProMotion", quick_processor: "Apple A15 Bionic", quick_camera: "12 ميجابكسل (3 كاميرات)", quick_front_camera: "12 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "3095 مللي أمبير" },
  { name: "Google Pixel 6", name_ar: "جوجل بيكسل 6", brand: "google", year: 2021, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-6.jpg", quick_screen: "6.4 بوصة OLED 90Hz", quick_processor: "Google Tensor", quick_camera: "50 ميجابكسل", quick_front_camera: "8 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4614 مللي أمبير" },
  { name: "OnePlus 9 Pro", name_ar: "ون بلس 9 برو", brand: "oneplus", year: 2021, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-9-pro.jpg", quick_screen: "6.7 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 888", quick_camera: "48 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4500 مللي أمبير" },
  { name: "Xiaomi 11 Ultra", name_ar: "شاومي 11 الترا", brand: "xiaomi", year: 2021, image: "https://images.gsmarena.com/imgs/newsimg/xiaomi-11-ultra.jpg", quick_screen: "6.81 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 888", quick_camera: "50 ميجابكسل", quick_front_camera: "20 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "5000 مللي أمبير" },
  { name: "OPPO Find X3 Pro", name_ar: "أوبو فايند X3 برو", brand: "oppo", year: 2021, image: "https://images.gsmarena.com/imgs/newsimg/oppo-find-x3-pro.jpg", quick_screen: "6.7 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 888", quick_camera: "50 ميجابكسل", quick_front_camera: "32 ميجابكسل", quick_memory: "12 GB / 256GB", quick_battery: "4500 مللي أمبير" },

  // ════════════════════════════════════════════ 2020 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S20 Ultra", name_ar: "سامسونج جالاكسي S20 الترا", brand: "samsung", year: 2020, image: "https://images-na.ssl-images-amazon.com/images/I/71hVW7EQIAL.jpg", quick_screen: "6.9 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 865", quick_camera: "108 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "12 GB / 128GB", quick_battery: "5000 مللي أمبير" },
  { name: "Apple iPhone 12 Pro Max", name_ar: "آبل آيفون 12 برو ماكس", brand: "apple", year: 2020, image: "https://images-na.ssl-images-amazon.com/images/I/71bsaRAWP9L.jpg", quick_screen: "6.7 بوصة OLED 60Hz", quick_processor: "Apple A14 Bionic", quick_camera: "12 ميجابكسل (3 كاميرات)", quick_front_camera: "12 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "3687 مللي أمبير" },
  { name: "Google Pixel 5", name_ar: "جوجل بيكسل 5", brand: "google", year: 2020, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-5.jpg", quick_screen: "6 بوصة OLED 90Hz", quick_processor: "Snapdragon 765G", quick_camera: "12.2 ميجابكسل (ثنائية)", quick_front_camera: "8 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "4080 مللي أمبير" },
  { name: "OnePlus 8 Pro", name_ar: "ون بلس 8 برو", brand: "oneplus", year: 2020, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-8-pro.jpg", quick_screen: "6.78 بوصة AMOLED 120Hz", quick_processor: "Snapdragon 865", quick_camera: "48 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "8 GB / 128GB", quick_battery: "4510 مللي أمبير" },

  // ════════════════════════════════════════════ 2019 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S10+", name_ar: "سامسونج جالاكسي S10 بلس", brand: "samsung", year: 2019, image: "https://images-na.ssl-images-amazon.com/images/I/71kA2QDBEkL.jpg", quick_screen: "6.4 بوصة AMOLED 60Hz", quick_processor: "Snapdragon 855", quick_camera: "16 ميجابكسل + 12 ميجابكسل", quick_front_camera: "12 ميجابكسل (ثنائية)", quick_memory: "8 GB / 128GB", quick_battery: "4100 مللي أمبير" },
  { name: "Apple iPhone 11 Pro Max", name_ar: "آبل آيفون 11 برو ماكس", brand: "apple", year: 2019, image: "https://images-na.ssl-images-amazon.com/images/I/71fqSCAx7nL.jpg", quick_screen: "6.5 بوصة OLED 60Hz", quick_processor: "Apple A13 Bionic", quick_camera: "12 ميجابكسل (ثلاثية)", quick_front_camera: "12 ميجابكسل", quick_memory: "4 GB / 64GB", quick_battery: "3969 مللي أمبير" },
  { name: "Google Pixel 4 XL", name_ar: "جوجل بيكسل 4 XL", brand: "google", year: 2019, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-4-xl.jpg", quick_screen: "6.3 بوصة OLED 90Hz", quick_processor: "Snapdragon 855", quick_camera: "12.2 ميجابكسل (ثنائية)", quick_front_camera: "8 ميجابكسل", quick_memory: "6 GB / 64GB", quick_battery: "3700 مللي أمبير" },
  { name: "OnePlus 7T Pro", name_ar: "ون بلس 7T برو", brand: "oneplus", year: 2019, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-7t-pro.jpg", quick_screen: "6.67 بوصة AMOLED 90Hz", quick_processor: "Snapdragon 855+", quick_camera: "48 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "8 GB / 256GB", quick_battery: "4085 مللي أمبير" },
  { name: "Sony Xperia 1", name_ar: "سوني إكسبيريا 1", brand: "sony", year: 2019, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-1.jpg", quick_screen: "6.5 بوصة OLED 60Hz (4K)", quick_processor: "Snapdragon 855", quick_camera: "12 ميجابكسل (ثلاثية)", quick_front_camera: "8 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "3330 مللي أمبير" },

  // ════════════════════════════════════════════ 2018 MODELS ════════════════════════════════════════════
  { name: "Samsung Galaxy S9", name_ar: "سامسونج جالاكسي S9", brand: "samsung", year: 2018, image: "https://images-na.ssl-images-amazon.com/images/I/71-mxLMR8ZL.jpg", quick_screen: "5.8 بوصة AMOLED 60Hz", quick_processor: "Snapdragon 845", quick_camera: "12 ميجابكسل (متغير f)", quick_front_camera: "8 ميجابكسل", quick_memory: "4 GB / 64GB", quick_battery: "3000 مللي أمبير" },
  { name: "Samsung Galaxy Note 9", name_ar: "سامسونج جالاكسي نوت 9", brand: "samsung", year: 2018, image: "https://images-na.ssl-images-amazon.com/images/I/71L6YD0ZCML.jpg", quick_screen: "6.4 بوصة AMOLED 60Hz", quick_processor: "Snapdragon 845", quick_camera: "12 ميجابكسل (ثنائية)", quick_front_camera: "8 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "4000 مللي أمبير" },
  { name: "Apple iPhone XS Max", name_ar: "آبل آيفون XS ماكس", brand: "apple", year: 2018, image: "https://images-na.ssl-images-amazon.com/images/I/61Vc0LamVIL.jpg", quick_screen: "6.5 بوصة OLED 60Hz", quick_processor: "Apple A12 Bionic", quick_camera: "12 ميجابكسل (ثنائية)", quick_front_camera: "12 ميجابكسل", quick_memory: "4 GB / 64GB", quick_battery: "3174 مللي أمبير" },
  { name: "Apple iPhone XR", name_ar: "آبل آيفون XR", brand: "apple", year: 2018, image: "https://images-na.ssl-images-amazon.com/images/I/71hL9Z5WE8L.jpg", quick_screen: "6.1 بوصة LCD 60Hz", quick_processor: "Apple A12 Bionic", quick_camera: "12 ميجابكسل", quick_front_camera: "12 ميجابكسل", quick_memory: "3 GB / 64GB", quick_battery: "2942 مللي أمبير" },
  { name: "Google Pixel 3 XL", name_ar: "جوجل بيكسل 3 XL", brand: "google", year: 2018, image: "https://images.gsmarena.com/imgs/newsimg/google-pixel-3-xl.jpg", quick_screen: "6.3 بوصة OLED 60Hz", quick_processor: "Snapdragon 845", quick_camera: "12.2 ميجابكسل", quick_front_camera: "8 ميجابكسل (ثنائية)", quick_memory: "4 GB / 64GB", quick_battery: "3530 مللي أمبير" },
  { name: "OnePlus 6T", name_ar: "ون بلس 6T", brand: "oneplus", year: 2018, image: "https://images.gsmarena.com/imgs/newsimg/oneplus-6t.jpg", quick_screen: "6.41 بوصة AMOLED 60Hz", quick_processor: "Snapdragon 845", quick_camera: "16 ميجابكسل + 20 ميجابكسل", quick_front_camera: "16 ميجابكسل", quick_memory: "6 GB / 128GB", quick_battery: "3700 مللي أمبير" },
  { name: "Sony Xperia XZ3", name_ar: "سوني إكسبيريا XZ3", brand: "sony", year: 2018, image: "https://images.gsmarena.com/imgs/newsimg/sony-xperia-xz3.jpg", quick_screen: "6 بوصة OLED 60Hz", quick_processor: "Snapdragon 845", quick_camera: "19 ميجابكسل", quick_front_camera: "13 ميجابكسل", quick_memory: "4 GB / 64GB", quick_battery: "3330 مللي أمبير" },
];

function makeSlug(brand: string, name: string): string {
  return `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  console.log("🚀 Massive Phone Database Seeding (2018-2026)\n");

  // Setup brands
  console.log("📱 Setting up brands...");
  const brandMap: Record<string, string> = {};
  for (const brand of BRANDS_DATA) {
    const existing = await db.query.brands.findFirst({ where: eq(brands.slug, brand.slug) });
    if (existing) {
      brandMap[brand.slug] = existing.id;
    } else {
      const [ins] = await db.insert(brands).values(brand).returning();
      brandMap[brand.slug] = ins.id;
    }
  }
  console.log(`  ✓ ${BRANDS_DATA.length} brands ready\n`);

  // Insert phones in batches
  let added = 0, skipped = 0;
  const BATCH_SIZE = 25;

  for (let i = 0; i < PHONES_DATA.length; i += BATCH_SIZE) {
    const batch = PHONES_DATA.slice(i, i + BATCH_SIZE);
    process.stdout.write(`\nProcessing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(PHONES_DATA.length / BATCH_SIZE)}: `);

    for (const phone of batch) {
      const brandId = brandMap[phone.brand];
      if (!brandId) {
        process.stdout.write("?");
        skipped++;
        continue;
      }

      const slug = makeSlug(phone.brand, phone.name.split(" ").slice(-1)[0]);

      // Check if exists
      const existing = await db.query.phones.findFirst({ where: eq(phones.slug, slug) });
      if (existing) {
        // Update with image if missing
        if (!existing.image && phone.image) {
          await db.update(phones).set({ image: phone.image }).where(eq(phones.id, existing.id)).catch(() => {});
        }
        process.stdout.write(".");
        skipped++;
        continue;
      }

      try {
        await db.insert(phones).values({
          slug,
          name: phone.name,
          name_ar: phone.name_ar,
          brand_id: brandId,
          year: phone.year,
          release_date: phone.release_date || null,
          image: phone.image || null,
          status: "published",
          quick_screen: phone.quick_screen || null,
          quick_processor: phone.quick_processor || null,
          quick_camera: phone.quick_camera || null,
          quick_front_camera: phone.quick_front_camera || null,
          quick_memory: phone.quick_memory || null,
          quick_battery: phone.quick_battery || null,
        });
        process.stdout.write("✓");
        added++;
      } catch (e) {
        process.stdout.write("✗");
        skipped++;
      }
    }
  }

  console.log(`\n\n🎉 Seeding Complete!`);
  console.log(`   Added: ${added} | Skipped: ${skipped}`);

  const allPhones = await db.query.phones.findMany();
  console.log(`\n📊 Total phones in database: ${allPhones.length}`);
  process.exit(0);
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
