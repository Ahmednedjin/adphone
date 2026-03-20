import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/AdBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhoneCard from "@/components/PhoneCard";
import { fetchPhones, type DbPhone } from "@/lib/api";

const Index = () => {
  const [phones, setPhones] = useState<DbPhone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhones(40).then(data => {
      setPhones(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        {/* Hero */}
        <div className="mb-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">AD Phone</h1>
          <p className="text-muted-foreground mb-2">قاعدة بيانات شاملة لمواصفات جميع الهواتف الذكية</p>
        </div>

        {/* Latest phones */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">أحدث الهواتف الذكية</h2>
          <p className="text-sm text-muted-foreground mb-4">اكتشف أحدث الهواتف مع مواصفاتها التقنية الكاملة</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="card-phone animate-pulse">
                <div className="aspect-[3/4] bg-secondary rounded-lg mb-3" />
                <div className="h-4 bg-secondary rounded mb-2 w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {phones.map(phone => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
      <div className="ad-banner-bottom">
        <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
      </div>
    </div>
  );
};

export default Index;
