import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import PhoneCard from "@/components/PhoneCard";
import { brands, getPhonesByBrand } from "@/data/phones";

const BrandDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = brands.find(b => b.slug === slug);
  const brandPhones = getPhonesByBrand(slug || "");

  if (!brand) {
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
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />
      <main className="container py-8">
        <nav className="text-sm text-muted-foreground mb-6 flex gap-2">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-primary">الشركات</Link>
          <span>/</span>
          <span className="text-foreground">{brand.nameAr}</span>
        </nav>

        <h1 className="text-2xl font-bold text-foreground mb-2">هواتف {brand.nameAr} ({brand.name})</h1>
        <p className="text-sm text-muted-foreground mb-6">{brandPhones.length} هاتف</p>

        {brandPhones.length === 0 ? (
          <p className="text-muted-foreground">لا توجد هواتف حالياً لهذه الشركة.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brandPhones.map(phone => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default BrandDetail;
