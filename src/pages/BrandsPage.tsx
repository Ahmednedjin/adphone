import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import { fetchBrands, type DbBrand } from "@/lib/api";

const BrandsPage = () => {
  const [brands, setBrands] = useState<DbBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands().then(data => {
      setBrands(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16">
      <AdBanner />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">الشركات المصنعة</h1>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="card-phone animate-pulse py-8">
                <div className="h-10 w-20 bg-secondary rounded mx-auto mb-3" />
                <div className="h-4 bg-secondary rounded w-16 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/brand/${brand.slug}`}
                className="card-phone flex flex-col items-center gap-3 py-8"
                style={{ borderColor: `${brand.color || '#333'}30` }}
              >
                <img
                  src={brand.logo || ''}
                  alt={brand.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
                <span className="font-semibold text-foreground">{brand.name}</span>
                <span className="text-xs text-muted-foreground">{brand.name_ar}</span>
              </Link>
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

export default BrandsPage;
