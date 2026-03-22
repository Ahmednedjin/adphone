import { type DbPhone } from "@/lib/api";

type SpecSection = {
  title: string;
  rows: { label: string; key: keyof DbPhone }[];
};

const specSections: SpecSection[] = [
  {
    title: "معلومات عامة",
    rows: [
      { label: "تاريخ الإصدار", key: "release_date" },
    ],
  },
  {
    title: "التصميم",
    rows: [
      { label: "الطول", key: "design_height" },
      { label: "العرض", key: "design_width" },
      { label: "السمك", key: "design_thickness" },
      { label: "الوزن", key: "design_weight" },
      { label: "الخامات", key: "design_materials" },
      { label: "الألوان المتوفرة", key: "design_colors" },
      { label: "نوع الجوانب (الحواف)", key: "design_frame" },
    ],
  },
  {
    title: "الشاشة",
    rows: [
      { label: "نوع الشاشة", key: "screen_type" },
      { label: "الحجم", key: "screen_size" },
      { label: "الدقة", key: "screen_resolution" },
      { label: "كثافة البيكسلات (PPI)", key: "screen_ppi" },
      { label: "معدل التحديث", key: "screen_refresh_rate" },
      { label: "معدل اللمس", key: "screen_touch_rate" },
      { label: "قوة السطوع", key: "screen_brightness" },
      { label: "حماية الشاشة", key: "screen_protection" },
      { label: "حماية الظهر", key: "screen_back_protection" },
    ],
  },
  {
    title: "المعالج",
    rows: [
      { label: "اسم المعالج", key: "processor_name" },
      { label: "عدد الأنوية", key: "processor_cores" },
      { label: "تردد الأنوية", key: "processor_frequency" },
      { label: "معالج الرسوميات (GPU)", key: "processor_gpu" },
      { label: "دقة التصنيع", key: "processor_fabrication" },
    ],
  },
  {
    title: "الأداء",
    rows: [
      { label: "نتيجة Antutu Benchmark", key: "antutu_score" },
    ],
  },
  {
    title: "الذاكرة",
    rows: [
      { label: "التخزين", key: "memory_storage" },
      { label: "الرام (RAM)", key: "memory_ram" },
      { label: "نوع الذاكرة", key: "memory_type" },
      { label: "بطاقة الذاكرة (SD)", key: "memory_sd_card" },
    ],
  },
  {
    title: "الكاميرات",
    rows: [
      { label: "الكاميرا الرئيسية", key: "camera_main" },
      { label: "الكاميرا الواسعة", key: "camera_ultrawide" },
      { label: "الكاميرا المقربة", key: "camera_telephoto" },
      { label: "كاميرا الماكرو", key: "camera_macro" },
      { label: "الكاميرا الأمامية", key: "camera_front" },
      { label: "تصوير الفيديو", key: "camera_video" },
    ],
  },
  {
    title: "الصوت",
    rows: [
      { label: "السماعات (ستيريو/أحادي)", key: "audio_speakers" },
      { label: "منفذ 3.5mm", key: "audio_jack" },
    ],
  },
  {
    title: "الاتصال",
    rows: [
      { label: "بطاقة SIM", key: "connectivity_sim" },
      { label: "الشبكات (2G/3G/4G/5G)", key: "connectivity_network" },
      { label: "Wi-Fi", key: "connectivity_wifi" },
      { label: "Bluetooth", key: "connectivity_bluetooth" },
      { label: "NFC", key: "connectivity_nfc" },
      { label: "GPS", key: "connectivity_gps" },
    ],
  },
  {
    title: "الحماية",
    rows: [
      { label: "مقاومة الماء والغبار", key: "protection_water" },
      { label: "معيار الحماية", key: "protection_standard" },
    ],
  },
  {
    title: "البطارية",
    rows: [
      { label: "السعة", key: "battery_capacity" },
      { label: "سرعة الشحن", key: "battery_charging" },
      { label: "الشحن اللاسلكي", key: "battery_wireless" },
      { label: "الشحن العكسي", key: "battery_reverse" },
    ],
  },
  {
    title: "النظام",
    rows: [
      { label: "نظام التشغيل", key: "software_os" },
      { label: "واجهة المستخدم", key: "software_ui" },
    ],
  },
  {
    title: "المستشعرات",
    rows: [
      { label: "البصمة", key: "sensor_fingerprint" },
      { label: "التعرف على الوجه", key: "sensor_face_unlock" },
      { label: "الجيروسكوب", key: "sensor_gyroscope" },
      { label: "البوصلة", key: "sensor_compass" },
      { label: "مستشعر القرب", key: "sensor_proximity" },
      { label: "مستشعر الضوء", key: "sensor_light" },
      { label: "مستشعرات أخرى", key: "sensor_other" },
    ],
  },
];

const FullSpecsTable = ({ phone }: { phone: DbPhone }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden w-full">
    <table className="spec-table w-full">
      <tbody>
        {specSections.map(section => {
          const hasValues = section.rows.some(r => phone[r.key]);
          if (!hasValues) return null;
          return (
            <tbody key={section.title}>
              <tr>
                <td colSpan={2} className="spec-header">{section.title}</td>
              </tr>
              {section.rows.map(({ label, key }) => {
                const value = phone[key];
                if (!value) return null;
                return (
                  <tr key={key}>
                    <td className="spec-label">{label}</td>
                    <td className="spec-value">{String(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default FullSpecsTable;
