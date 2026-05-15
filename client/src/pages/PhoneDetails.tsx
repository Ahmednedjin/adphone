import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { supabase } from "@db/client";
import SiteHeader from "@/components/SiteHeader";

type Phone = Record<string, any>;
type PhoneCard = { id: string; slug: string; name: string; image: string | null; year: number | null };

const SPEC_GROUPS: { title: string; rows: { key: string; label: string }[] }[] = [
  {
    title: "نظرة سريعة",
    rows: [
      { key: "quick_screen", label: "الشاشة" },
      { key: "quick_processor", label: "المعالج" },
      { key: "quick_camera", label: "الكاميرا الخلفية" },
      { key: "quick_front_camera", label: "الكاميرا الأمامية" },
      { key: "quick_memory", label: "الذاكرة" },
      { key: "quick_battery", label: "البطارية" },
    ],
  },
  {
    title: "التصميم",
    rows: [
      { key: "design_height", label: "الارتفاع" },
      { key: "design_width", label: "العرض" },
      { key: "design_thickness", label: "السماكة" },
      { key: "design_weight", label: "الوزن" },
      { key: "design_materials", label: "الخامات" },
      { key: "design_colors", label: "الألوان" },
      { key: "design_frame", label: "الإطار" },
    ],
  },
  {
    title: "الشاشة",
    rows: [
      { key: "screen_type", label: "النوع" },
      { key: "screen_size", label: "الحجم" },
      { key: "screen_resolution", label: "الدقة" },
      { key: "screen_ppi", label: "كثافة البكسل" },
      { key: "screen_refresh_rate", label: "معدل التحديث" },
      { key: "screen_touch_rate", label: "معدل اللمس" },
      { key: "screen_brightness", label: "السطوع" },
      { key: "screen_protection", label: "الحماية" },
    ],
  },
  {
    title: "المعالج والأداء",
    rows: [
      { key: "processor_name", label: "المعالج" },
      { key: "processor_cores", label: "الأنوية" },
      { key: "processor_frequency", label: "التردد" },
      { key: "processor_gpu", label: "معالج الرسوميات" },
      { key: "processor_fabrication", label: "دقة التصنيع" },
      { key: "antutu_score", label: "Antutu" },
    ],
  },
  {
    title: "الذاكرة",
    rows: [
      { key: "memory_storage", label: "التخزين" },
      { key: "memory_ram", label: "الرام" },
      { key: "memory_type", label: "النوع" },
      { key: "memory_sd_card", label: "بطاقة SD" },
    ],
  },
  {
    title: "الكاميرا",
    rows: [
      { key: "camera_main", label: "الكاميرا الأساسية" },
      { key: "camera_ultrawide", label: "Ultrawide" },
      { key: "camera_telephoto", label: "Telephoto" },
      { key: "camera_macro", label: "Macro" },
      { key: "camera_front", label: "الأمامية" },
      { key: "camera_video", label: "الفيديو" },
    ],
  },
  {
    title: "البطارية والشحن",
    rows: [
      { key: "battery_capacity", label: "السعة" },
      { key: "battery_charging", label: "الشحن السلكي" },
      { key: "battery_wireless", label: "الشحن اللاسلكي" },
      { key: "battery_reverse", label: "الشحن العكسي" },
    ],
  },
  {
    title: "الاتصال",
    rows: [
      { key: "connectivity_sim", label: "الشريحة" },
      { key: "connectivity_network", label: "الشبكة" },
      { key: "connectivity_wifi", label: "Wi-Fi" },
      { key: "connectivity_bluetooth", label: "Bluetooth" },
      { key: "connectivity_nfc", label: "NFC" },
      { key: "connectivity_gps", label: "GPS" },
    ],
  },
  {
    title: "النظام والمستشعرات",
    rows: [
      { key: "software_os", label: "نظام التشغيل" },
      { key: "software_ui", label: "الواجهة" },
      { key: "sensor_fingerprint", label: "بصمة الإصبع" },
      { key: "sensor_face_unlock", label: "بصمة الوجه" },
      { key: "protection_water", label: "الحماية من الماء" },
      { key: "audio_speakers", label: "السماعات" },
      { key: "audio_jack", label: "مقبس السماعات" },
    ],
  },
];

export default function PhoneDetails() {
  const [location, navigate] = useLocation();
  const slug = location.split("/").pop() || "";
  const [phone, setPhone] = useState<Phone | null>(null);
  const [similar, setSimilar] = useState<PhoneCard[]>([]);
  const [sameBrand, setSameBrand] = useState<PhoneCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    (async () => {
      const { data: p } = await supabase
        .from("phones")
        .select("*, brands(id,slug,name,name_ar,logo,color)")
        .eq("slug", slug)
        .maybeSingle();

      if (!p) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPhone(p);
      setLoading(false);

      // Same brand strip
      const { data: sb } = await supabase
        .from("phones")
        .select("id,slug,name,image,year")
        .eq("brand_id", p.brand_id)
        .eq("status", "published")
        .neq("id", p.id)
        .order("year", { ascending: false })
        .limit(12);
      setSameBrand((sb as PhoneCard[]) ?? []);

      // Similar phones (same year ± 1, different brand)
      const yr = p.year ?? new Date().getFullYear();
      const { data: sim } = await supabase
        .from("phones")
        .select("id,slug,name,image,year")
        .eq("status", "published")
        .neq("id", p.id)
        .neq("brand_id", p.brand_id)
        .gte("year", yr - 1)
        .lte("year", yr + 1)
        .limit(12);
      setSimilar((sim as PhoneCard[]) ?? []);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
        <SiteHeader />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="h-8 bg-gray-900 rounded w-1/3 mb-4 animate-pulse" />
          <div className="h-96 bg-gray-900 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (notFound || !phone) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">الهاتف غير موجود</h1>
          <button onClick={() => navigate("/")} className="text-blue-500 hover:underline">العودة للرئيسية</button>
        </div>
      </div>
    );
  }

  const brand = (phone as any).brands;

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
          <ArrowRight size={16} />
          الرئيسية
        </button>

        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 md:p-10">
          <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center p-6">
            {phone.image ? (
              <img src={phone.image} alt={phone.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-gray-600">لا توجد صورة</span>
            )}
          </div>
          <div>
            {brand && (
              <Link href={`/brand/${brand.slug}`} className="inline-flex items-center gap-2 mb-3 text-sm text-gray-400 hover:text-white">
                {brand.logo && <img src={brand.logo} alt={brand.name} className="h-5 w-auto filter brightness-0 invert opacity-70" />}
                <span>{brand.name_ar || brand.name}</span>
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{phone.name}</h1>
            {phone.release_date && <p className="text-gray-400 text-sm">تاريخ الإصدار: {phone.release_date}</p>}

            <div className="grid grid-cols-2 gap-3 mt-6">
              {SPEC_GROUPS[0].rows.map((r) =>
                phone[r.key] ? (
                  <div key={r.key} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                    <div className="text-[11px] text-gray-500 mb-1">{r.label}</div>
                    <div className="text-sm font-medium">{phone[r.key]}</div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>

        {/* FULL SPECS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-r-4 border-blue-500 pr-3">المواصفات الكاملة</h2>
          {SPEC_GROUPS.slice(1).map((group) => {
            const rows = group.rows.filter((r) => phone[r.key]);
            if (rows.length === 0) return null;
            return (
              <div key={group.title} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="bg-gray-800/50 px-5 py-3 font-bold border-b border-gray-800">{group.title}</div>
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.key} className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/40"}>
                        <td className="px-5 py-3 text-gray-400 w-1/3 align-top">{r.label}</td>
                        <td className="px-5 py-3 text-white">{phone[r.key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>

        {/* SIMILAR PHONES STRIP */}
        {similar.length > 0 && (
          <HorizontalStrip title="هواتف مشابهة" phones={similar} onClick={(s) => navigate(`/phone/${s}`)} />
        )}

        {/* SAME BRAND STRIP */}
        {sameBrand.length > 0 && (
          <HorizontalStrip title={`المزيد من ${brand?.name_ar || brand?.name || ""}`} phones={sameBrand} onClick={(s) => navigate(`/phone/${s}`)} />
        )}
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        © AdPhone 2026
      </footer>
    </div>
  );
}

function HorizontalStrip({
  title,
  phones,
  onClick,
}: {
  title: string;
  phones: { id: string; slug: string; name: string; image: string | null; year: number | null }[];
  onClick: (slug: string) => void;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 border-r-4 border-blue-500 pr-3">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x scrollbar-thin scrollbar-thumb-gray-700">
        {phones.map((p) => (
          <button
            key={p.id}
            onClick={() => onClick(p.slug)}
            className="flex-shrink-0 w-36 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-blue-500 rounded-xl p-3 transition snap-start"
          >
            <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
              {p.image ? (
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              ) : (
                <span className="text-gray-600 text-xs">—</span>
              )}
            </div>
            <div className="text-xs font-medium text-center text-gray-200 line-clamp-2 min-h-[2.5em]">{p.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
