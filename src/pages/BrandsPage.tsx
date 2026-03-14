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
            style={{ borderColor: `${brand.color}30` }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const parent = el.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = 'text-3xl font-bold';
                  span.style.color = brand.color;
                  span.textContent = brand.name[0];
                  parent.insertBefore(span, el);
                }
              }}
            />
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
