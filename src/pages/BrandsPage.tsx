import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import { brands } from "@/data/phones";

const BrandsPage = () => (
  <div className="min-h-screen bg-background">
    <AdBanner />
    <SiteHeader />
    <main className="container py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">الشركات المصنعة</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map(brand => (
          <Link
            key={brand.id}
            to={`/brand/${brand.slug}`}
            className="card-phone flex flex-col items-center gap-3 py-8"
          >
            <span className="text-4xl">{brand.logo}</span>
            <span className="font-semibold text-foreground">{brand.name}</span>
            <span className="text-xs text-muted-foreground">{brand.nameAr}</span>
          </Link>
        ))}
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default BrandsPage;
