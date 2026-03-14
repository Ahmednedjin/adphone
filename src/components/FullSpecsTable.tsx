import { type Phone } from "@/data/phones";

const specSections: { key: keyof Phone["specs"]; title: string; labels: Record<string, string> }[] = [
  {
    key: "design", title: "التصميم",
    labels: { height: "الطول", width: "العرض", thickness: "السمك", weight: "الوزن", materials: "الخامات" },
  },
  {
    key: "screen", title: "الشاشة",
    labels: { type: "نوع الشاشة", size: "الحجم", resolution: "الدقة", refreshRate: "معدل التحديث", protection: "الحماية" },
  },
  {
    key: "processor", title: "المعالج",
    labels: { name: "اسم المعالج", cores: "عدد الأنوية", frequency: "التردد", gpu: "معالج الرسوميات" },
  },
  {
    key: "memory", title: "الذاكرة",
    labels: { storage: "التخزين", ram: "الرام", type: "نوع الذاكرة", sdCard: "بطاقة الذاكرة" },
  },
  {
    key: "cameras", title: "الكاميرات",
    labels: { main: "الكاميرا الرئيسية", ultrawide: "الكاميرا الواسعة", telephoto: "الكاميرا المقربة", front: "الكاميرا الأمامية", video: "تصوير الفيديو" },
  },
  {
    key: "battery", title: "البطارية",
    labels: { capacity: "السعة", charging: "سرعة الشحن", wireless: "الشحن اللاسلكي", port: "منفذ الشحن" },
  },
  {
    key: "other", title: "المزايا الأخرى",
    labels: { fingerprint: "البصمة", waterResistance: "مقاومة الماء", os: "نظام التشغيل", networks: "الشبكات" },
  },
];

const FullSpecsTable = ({ phone }: { phone: Phone }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
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
                  <td className="spec-value">{data[field]}</td>
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
