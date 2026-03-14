import { useParams, Link } from "react-router-dom";
import { getPhoneBySlug, getSimilarPhones } from "@/data/phones";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import QuickSpecs from "@/components/QuickSpecs";
import FullSpecsTable from "@/components/FullSpecsTable";
import PhoneCard from "@/components/PhoneCard";

const PhoneDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const phone = getPhoneBySlug(slug || "");

  if (!phone) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">الهاتف غير موجود</h1>
          <Link to="/" className="text-primary mt-4 inline-block">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const similar = getSimilarPhones(phone);

  return (
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex gap-2">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          <Link to={`/brand/${phone.brandSlug}`} className="hover:text-primary">{phone.brand}</Link>
          <span>/</span>
          <span className="text-foreground">{phone.name}</span>
        </nav>

        {/* Hero section: image + quick specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card rounded-xl border border-border p-8 flex items-center justify-center">
            <img
              src={phone.image}
              alt={phone.name}
              className="max-h-96 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">مواصفات {phone.name}</h1>
            <p className="text-sm text-muted-foreground mb-1">{phone.brand} · {phone.year}</p>
            {phone.price && <p className="text-lg font-bold text-primary mb-6">{phone.price}</p>}
            <QuickSpecs phone={phone} />
          </div>
        </div>

        {/* Ad between sections */}
        <AdBanner className="rounded-xl mb-8" />

        {/* Full specs - full width */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">المواصفات التفصيلية</h2>
          <FullSpecsTable phone={phone} />
        </div>

        {/* Similar phones */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">هواتف مشابهة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similar.map(p => (
              <PhoneCard key={p.id} phone={p} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
      <div className="ad-banner-bottom">
        <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
      </div>
    </div>
  );
};

export default PhoneDetail;
