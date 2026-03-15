import { type DbPhone } from "@/lib/api";
import { Monitor, Cpu, Camera, HardDrive, Battery, Smartphone } from "lucide-react";

const specs = [
  { key: "quick_screen", label: "الشاشة", icon: Monitor },
  { key: "quick_processor", label: "المعالج", icon: Cpu },
  { key: "quick_camera", label: "الكاميرا الخلفية", icon: Camera },
  { key: "quick_front_camera", label: "الكاميرا الأمامية", icon: Smartphone },
  { key: "quick_memory", label: "الذاكرة", icon: HardDrive },
  { key: "quick_battery", label: "البطارية", icon: Battery },
] as const;

const QuickSpecs = ({ phone }: { phone: DbPhone }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {specs.map(({ key, label, icon: Icon }) => {
      const value = phone[key];
      if (!value) return null;
      return (
        <div key={key} className="quick-spec-item">
          <Icon className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground leading-tight">{value}</span>
        </div>
      );
    })}
  </div>
);

export default QuickSpecs;
