import { type Phone } from "@/data/phones";
import { Monitor, Cpu, Camera, HardDrive, Battery } from "lucide-react";

const icons = {
  screen: Monitor,
  processor: Cpu,
  camera: Camera,
  memory: HardDrive,
  battery: Battery,
};

const labels: Record<string, string> = {
  screen: "الشاشة",
  processor: "المعالج",
  camera: "الكاميرا",
  memory: "الذاكرة",
  battery: "البطارية",
};

const QuickSpecs = ({ phone }: { phone: Phone }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {(Object.keys(phone.quickSpecs) as Array<keyof typeof phone.quickSpecs>).map(key => {
      const Icon = icons[key];
      return (
        <div key={key} className="quick-spec-item">
          <Icon className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold text-foreground">{labels[key]}</span>
          <span className="text-xs text-muted-foreground leading-tight">{phone.quickSpecs[key]}</span>
        </div>
      );
    })}
  </div>
);

export default QuickSpecs;
