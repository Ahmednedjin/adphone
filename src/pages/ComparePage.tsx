import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import { phones, type Phone } from "@/data/phones";
import { X } from "lucide-react";

const specSections: { key: keyof Phone["specs"]; title: string; labels: Record<string, string> }[] = [
  { key: "design", title: "التصميم", labels: { height: "الطول", width: "العرض", thickness: "السمك", weight: "الوزن", materials: "الخامات" } },
  { key: "screen", title: "الشاشة", labels: { type: "نوع الشاشة", size: "الحجم", resolution: "الدقة", refreshRate: "معدل التحديث", protection: "الحماية" } },
  { key: "processor", title: "المعالج", labels: { name: "اسم المعالج", cores: "عدد الأنوية", frequency: "التردد", gpu: "معالج الرسوميات" } },
  { key: "memory", title: "الذاكرة", labels: { storage: "التخزين", ram: "الرام", type: "نوع الذاكرة", sdCard: "بطاقة الذاكرة" } },
  { key: "cameras", title: "الكاميرات", labels: { main: "الرئيسية", ultrawide: "الواسعة", telephoto: "المقربة", front: "الأمامية", video: "الفيديو" } },
  { key: "battery", title: "البطارية", labels: { capacity: "السعة", charging: "الشحن", wireless: "اللاسلكي", port: "المنفذ" } },
  { key: "other", title: "أخرى", labels: { fingerprint: "البصمة", waterResistance: "مقاومة الماء", os: "النظام", networks: "الشبكات" } },
];

const ComparePage = () => {
  const [selected, setSelected] = useState<Phone[]>([]);

  const addPhone = (id: string) => {
    const phone = phones.find(p => p.id === id);
    if (phone && !selected.find(s => s.id === id) && selected.length < 4) {
      setSelected([...selected, phone]);
    }
  };

  const removePhone = (id: string) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">مقارنة الهواتف</h1>

        {/* Phone selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">أضف هاتف للمقارنة (حتى 4 هواتف)</label>
          <select
            className="bg-card border border-border rounded-lg px-4 py-2 text-sm text-foreground w-full max-w-sm"
            onChange={e => { addPhone(e.target.value); e.target.value = ""; }}
            value=""
          >
            <option value="">اختر هاتف...</option>
            {phones.filter(p => !selected.find(s => s.id === p.id)).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Selected phones chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selected.map(p => (
              <span key={p.id} className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                {p.name}
                <button onClick={() => removePhone(p.id)}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        {selected.length >= 2 ? (
          <div className="overflow-x-auto">
            <table className="spec-table bg-card rounded-xl border border-border">
              <thead>
                <tr className="sticky top-0 z-10 bg-card border-b border-border">
                  <th className="py-4 px-4 text-right text-sm font-bold text-foreground w-40">المواصفة</th>
                  {selected.map(phone => (
                    <th key={phone.id} className="py-4 px-4 text-center min-w-[180px]">
                      <img
                        src={phone.image}
                        alt={phone.name}
                        className="w-16 h-20 object-contain mx-auto mb-2"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <span className="text-sm font-bold text-foreground block">{phone.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specSections.map(section => (
                  <>
                    <tr key={section.key}>
                      <td colSpan={selected.length + 1} className="spec-header">{section.title}</td>
                    </tr>
                    {Object.entries(section.labels).map(([field, label]) => (
                      <tr key={`${section.key}-${field}`}>
                        <td className="spec-label">{label}</td>
                        {selected.map(phone => {
                          const data = phone.specs[section.key] as Record<string, string>;
                          return <td key={phone.id} className="spec-value text-center text-sm">{data[field]}</td>;
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">اختر هاتفين على الأقل للمقارنة</p>
            <p className="text-sm">استخدم القائمة أعلاه لإضافة الهواتف</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ComparePage;
