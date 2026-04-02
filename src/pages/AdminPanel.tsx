import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchPhones, fetchBrands, aiPhoneSpecs, type DbPhone, type DbBrand
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, Sparkles } from "lucide-react";

const AdminPanel = () => {
  const [phones, setPhones] = useState<DbPhone[]>([]);
  const [brands, setBrands] = useState<DbBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editPhone, setEditPhone] = useState<DbPhone | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const me = await getMe();
    if (!me) { navigate("/admin-login"); return; }
    setIsAdmin(true);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    const [phonesData, brandsData] = await Promise.all([adminFetchPhones(), fetchBrands()]);
    setPhones(phonesData);
    setBrands(brandsData);
    setLoading(false);
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate("/admin-login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذا الهاتف؟")) return;
    try {
      await adminDeletePhone(id);
      toast({ title: "تم الحذف" });
      loadData();
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    }
  };

  const handleAiFill = async (phoneName: string) => {
    if (!phoneName.trim()) {
      toast({ title: "أدخل اسم الهاتف أولاً", variant: "destructive" });
      return;
    }
    setAiLoading(true);
    try {
      const { specs } = await aiPhoneSpecs(phoneName);
      setEditPhone(prev => ({ ...prev!, ...specs }));
      toast({ title: "تم ملء المواصفات بنجاح ✨" });
    } catch (err: any) {
      toast({ title: "خطأ في جلب المواصفات", description: err.message, variant: "destructive" });
    }
    setAiLoading(false);
  };

  const handleSave = async () => {
    if (!editPhone) return;
    const isNew = !editPhone.id || editPhone.id === "new";
    try {
      if (isNew) {
        const { id: _id, brands: _b, ...phoneData } = editPhone as any;
        await adminCreatePhone(phoneData);
      } else {
        await adminUpdatePhone(editPhone.id, editPhone);
      }
      toast({ title: isNew ? "تمت الإضافة ✓" : "تم التحديث ✓" });
      setShowForm(false);
      setEditPhone(null);
      loadData();
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    }
  };

  const createNewPhone = () => {
    setEditPhone({
      id: "new", slug: "", name: "", name_ar: null, brand_id: brands[0]?.id || "",
      year: new Date().getFullYear(), release_date: null,
      image: null, status: "draft",
      quick_screen: null, quick_processor: null, quick_camera: null, quick_front_camera: null, quick_memory: null, quick_battery: null,
      design_height: null, design_width: null, design_thickness: null, design_weight: null, design_materials: null, design_colors: null, design_frame: null,
      screen_type: null, screen_size: null, screen_resolution: null, screen_ppi: null, screen_refresh_rate: null, screen_touch_rate: null, screen_brightness: null, screen_protection: null, screen_back_protection: null,
      processor_name: null, processor_cores: null, processor_frequency: null, processor_gpu: null, processor_fabrication: null, antutu_score: null,
      memory_storage: null, memory_ram: null, memory_type: null, memory_sd_card: null,
      camera_main: null, camera_ultrawide: null, camera_telephoto: null, camera_macro: null, camera_front: null, camera_video: null,
      audio_speakers: null, audio_jack: null,
      connectivity_sim: null, connectivity_network: null, connectivity_wifi: null, connectivity_bluetooth: null, connectivity_nfc: null, connectivity_gps: null,
      protection_water: null, protection_standard: null,
      battery_capacity: null, battery_charging: null, battery_wireless: null, battery_reverse: null,
      software_os: null, software_ui: null,
      sensor_fingerprint: null, sensor_face_unlock: null, sensor_gyroscope: null, sensor_compass: null, sensor_proximity: null, sensor_light: null, sensor_other: null,
      created_at: "", updated_at: "",
    } as DbPhone);
    setShowForm(true);
  };

  if (!isAdmin) return null;

  const fieldGroups = [
    { title: "معلومات أساسية", fields: [
      { key: "name", label: "الاسم (إنجليزي)" }, { key: "name_ar", label: "الاسم (عربي)" },
      { key: "year", label: "السنة", type: "number" }, { key: "release_date", label: "تاريخ الإصدار" },
      { key: "image", label: "رابط الصورة" }, { key: "status", label: "الحالة (draft/published)" },
    ]},
    { title: "المواصفات السريعة", fields: [
      { key: "quick_screen", label: "الشاشة" }, { key: "quick_processor", label: "المعالج" },
      { key: "quick_camera", label: "الكاميرا" }, { key: "quick_front_camera", label: "الكاميرا الأمامية" },
      { key: "quick_memory", label: "الذاكرة" }, { key: "quick_battery", label: "البطارية" },
    ]},
    { title: "التصميم", fields: [
      { key: "design_height", label: "الطول" }, { key: "design_width", label: "العرض" },
      { key: "design_thickness", label: "السمك" }, { key: "design_weight", label: "الوزن" },
      { key: "design_materials", label: "الخامات" }, { key: "design_colors", label: "الألوان" }, { key: "design_frame", label: "الجوانب" },
    ]},
    { title: "الشاشة", fields: [
      { key: "screen_type", label: "النوع" }, { key: "screen_size", label: "الحجم" },
      { key: "screen_resolution", label: "الدقة" }, { key: "screen_ppi", label: "كثافة البيكسل" },
      { key: "screen_refresh_rate", label: "معدل التحديث" }, { key: "screen_brightness", label: "السطوع" },
      { key: "screen_protection", label: "حماية الشاشة" }, { key: "screen_back_protection", label: "حماية الظهر" },
    ]},
    { title: "المعالج والأداء", fields: [
      { key: "processor_name", label: "المعالج" }, { key: "processor_cores", label: "الأنوية" },
      { key: "processor_frequency", label: "التردد" }, { key: "processor_gpu", label: "GPU" },
      { key: "processor_fabrication", label: "دقة التصنيع" }, { key: "antutu_score", label: "Antutu" },
    ]},
    { title: "الذاكرة", fields: [
      { key: "memory_storage", label: "التخزين" }, { key: "memory_ram", label: "الرام" },
      { key: "memory_type", label: "النوع" }, { key: "memory_sd_card", label: "SD Card" },
    ]},
    { title: "الكاميرات", fields: [
      { key: "camera_main", label: "الرئيسية" }, { key: "camera_ultrawide", label: "الواسعة" },
      { key: "camera_telephoto", label: "المقربة" }, { key: "camera_macro", label: "ماكرو" },
      { key: "camera_front", label: "الأمامية" }, { key: "camera_video", label: "الفيديو" },
    ]},
    { title: "الصوت", fields: [
      { key: "audio_speakers", label: "السماعات" }, { key: "audio_jack", label: "3.5mm" },
    ]},
    { title: "الاتصال", fields: [
      { key: "connectivity_sim", label: "SIM" }, { key: "connectivity_network", label: "الشبكات" },
      { key: "connectivity_wifi", label: "Wi-Fi" }, { key: "connectivity_bluetooth", label: "Bluetooth" },
      { key: "connectivity_nfc", label: "NFC" }, { key: "connectivity_gps", label: "GPS" },
    ]},
    { title: "البطارية", fields: [
      { key: "battery_capacity", label: "السعة" }, { key: "battery_charging", label: "الشحن" },
      { key: "battery_wireless", label: "لاسلكي" }, { key: "battery_reverse", label: "عكسي" },
    ]},
    { title: "الحماية", fields: [
      { key: "protection_water", label: "مقاومة الماء" }, { key: "protection_standard", label: "المعيار" },
    ]},
    { title: "النظام", fields: [
      { key: "software_os", label: "نظام التشغيل" }, { key: "software_ui", label: "الواجهة" },
    ]},
    { title: "المستشعرات", fields: [
      { key: "sensor_fingerprint", label: "البصمة" }, { key: "sensor_face_unlock", label: "الوجه" },
      { key: "sensor_gyroscope", label: "جيروسكوب" }, { key: "sensor_compass", label: "بوصلة" },
      { key: "sensor_proximity", label: "القرب" }, { key: "sensor_light", label: "الضوء" }, { key: "sensor_other", label: "أخرى" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container flex items-center justify-between h-14">
          <h1 className="font-bold text-foreground">لوحة التحكم - AD Phone</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 ml-2" />خروج</Button>
        </div>
      </header>

      <main className="container py-6">
        {showForm && editPhone ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {editPhone.id === "new" ? "إضافة هاتف جديد" : `تعديل: ${editPhone.name}`}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setShowForm(false); setEditPhone(null); }}>إلغاء</Button>
                <Button onClick={handleSave}>حفظ</Button>
              </div>
            </div>

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">ملء تلقائي بالذكاء الاصطناعي</label>
                <Input placeholder="اكتب اسم الهاتف ثم اضغط ملء..." value={editPhone.name} onChange={e => setEditPhone({ ...editPhone, name: e.target.value })} />
              </div>
              <Button onClick={() => handleAiFill(editPhone.name)} disabled={aiLoading} className="gap-2">
                <Sparkles className="w-4 h-4" />{aiLoading ? "جاري الجلب..." : "ملء تلقائي"}
              </Button>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">الشركة</label>
              <select
                className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground"
                value={editPhone.brand_id}
                onChange={e => setEditPhone({ ...editPhone, brand_id: e.target.value })}
              >
                {brands.map(b => <option key={b.id} value={b.id}>{b.name} - {b.name_ar}</option>)}
              </select>
            </div>

            {fieldGroups.map(group => (
              <div key={group.title} className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-bold text-foreground mb-3">{group.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.fields.map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                      <Input
                        type={(f as any).type || "text"}
                        value={(editPhone as any)[f.key] ?? ""}
                        onChange={e => setEditPhone({ ...editPhone, [f.key]: e.target.value || null })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setShowForm(false); setEditPhone(null); }}>إلغاء</Button>
              <Button onClick={handleSave}>حفظ</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">الهواتف ({phones.length})</h2>
              <Button onClick={createNewPhone} className="gap-2"><Plus className="w-4 h-4" />إضافة هاتف</Button>
            </div>

            {loading ? (
              <p className="text-muted-foreground">جاري التحميل...</p>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="px-4 py-3 text-right text-foreground font-medium">الهاتف</th>
                      <th className="px-4 py-3 text-right text-foreground font-medium">الشركة</th>
                      <th className="px-4 py-3 text-right text-foreground font-medium">السنة</th>
                      <th className="px-4 py-3 text-right text-foreground font-medium">الحالة</th>
                      <th className="px-4 py-3 text-right text-foreground font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phones.map(phone => (
                      <tr key={phone.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="px-4 py-3 text-foreground flex items-center gap-2">
                          {phone.image && <img src={phone.image} alt="" className="w-6 h-8 object-contain" />}
                          {phone.name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{(phone as any).brands?.name || ""}</td>
                        <td className="px-4 py-3 text-muted-foreground">{phone.year}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${phone.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {phone.status === "published" ? "منشور" : "مسودة"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => { setEditPhone(phone); setShowForm(true); }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(phone.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
