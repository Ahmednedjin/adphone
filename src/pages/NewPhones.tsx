import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import PhoneCard from "@/components/PhoneCard";
import { phones } from "@/data/phones";

const NewPhones = () => {
  const sorted = [...phones].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">الهواتف الجديدة</h1>
        <p className="text-sm text-muted-foreground mb-6">أحدث الهواتف التي تم إضافتها للموقع</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sorted.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NewPhones;
