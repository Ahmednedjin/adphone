import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import PhoneCard from "@/components/PhoneCard";
import { fetchPhonesByBrand, type DbBrand, type DbPhone } from "@/lib/api";

const BrandDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [brand, setBrand] = useState<DbBrand | null>(null);
  const [phones, setPhones] = useState<DbPhone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhonesByBrand(slug || "").then(({ brand, phones }) => {
      setBrand(brand);
      setPhones(phones);
      setLoading(false);
    });
  }, [slug]);

  if (!loading && !brand) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">الشركة غير موجودة</h1>
          <Link to="/brands" className="text-primary mt-4 inline-block">عرض جميع الشركات</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <AdBanner />
      <SiteHeader />
      <main className="container py-8">
        <nav className="text-sm text-muted-foreground mb-6 flex gap-2">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-primary">الشركات</Link>
          <span>/</span>
          <span className="text-foreground">{brand?.name_ar || ''}</span>
        </nav>

        <h1 className="text-2xl font-bold text-foreground mb-2">هواتف {brand?.name_ar} ({brand?.name})</h1>
        <p className="text-sm text-muted-foreground mb-6">{phones.length} هاتف</p>

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
        ) : phones.length === 0 ? (
          <p className="text-muted-foreground">لا توجد هواتف حالياً لهذه الشركة.</p>
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

export default BrandDetail;
