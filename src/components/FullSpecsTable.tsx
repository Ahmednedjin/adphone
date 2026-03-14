import { type Phone } from "@/data/phones";

const specSections: { key: keyof Phone["specs"]; title: string; labels: Record<string, string> }[] = [
  {
    key: "design", title: "التصميم",
    labels: { height: "الطول", width: "العرض", thickness: "السمك", weight: "الوزن", materials: "الخامات", colors: "الألوان المتوفرة" },
  },
  {
    key: "screen", title: "الشاشة",
    labels: { type: "نوع الشاشة", size: "الحجم", resolution: "الدقة", ppi: "كثافة البيكسل", refreshRate: "معدل التحديث", touchRate: "معدل اللمس", protection: "الحماية" },
  },
  {
    key: "processor", title: "المعالج",
    labels: { name: "اسم المعالج", cores: "عدد الأنوية", frequency: "التردد", gpu: "معالج الرسوميات", fabrication: "دقة التصنيع" },
  },
  {
    key: "memory", title: "الذاكرة",
    labels: { storage: "التخزين", ram: "الرام", type: "نوع الذاكرة", sdCard: "بطاقة الذاكرة" },
  },
  {
    key: "cameras", title: "الكاميرات",
    labels: { main: "الكاميرا الرئيسية", ultrawide: "الكاميرا الواسعة", telephoto: "الكاميرا المقربة", macro: "كاميرا الماكرو", front: "الكاميرا الأمامية", video: "تصوير الفيديو" },
  },
  {
    key: "connectivity", title: "الاتصال",
    labels: { network: "الشبكات", wifi: "Wi-Fi", bluetooth: "Bluetooth", nfc: "NFC", gps: "GPS" },
  },
  {
    key: "battery", title: "البطارية",
    labels: { capacity: "السعة", charging: "سرعة الشحن", wireless: "الشحن اللاسلكي", reverse: "الشحن العكسي" },
  },
  {
    key: "software", title: "النظام",
    labels: { os: "نظام التشغيل", ui: "واجهة المستخدم" },
  },
  {
    key: "sensors", title: "المستشعرات",
    labels: { fingerprint: "البصمة", faceUnlock: "التعرف على الوجه", gyroscope: "الجيروسكوب", compass: "البوصلة", waterResistance: "مقاومة الماء" },
  },
];

const FullSpecsTable = ({ phone }: { phone: Phone }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden w-full">
    <table className="spec-table">
      <tbody>
        {specSections.map(section => {
          const data = phone.specs[section.key] as Record<string, string>;
          return (
            <tbody key={section.key}>
              <tr>
                <td colSpan={2} className="spec-header">{section.title}</td>
              </tr>
              {Object.entries(section.labels).map(([field, label]) => (
                <tr key={field}>
                  <td className="spec-label">{label}</td>
                  <td className="spec-value">{data[field] || "—"}</td>
                </tr>
              ))}
            </tbody>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default FullSpecsTable;
