import AdBanner from "@/components/AdBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhoneCard from "@/components/PhoneCard";
import { phones } from "@/data/phones";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">أحدث الهواتف الذكية</h1>
          <p className="text-sm text-muted-foreground">اكتشف أحدث الهواتف الذكية مع مواصفاتها التقنية الكاملة</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {phones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </main>

      <SiteFooter />
      <div className="ad-banner-bottom">
        <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
      </div>
    </div>
  );
};

export default Index;
