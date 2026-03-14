import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhoneCard from "@/components/PhoneCard";
import { phones, brands, searchPhones } from "@/data/phones";

const Index = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const results = query.length > 1 ? searchPhones(query) : [];

  return (
    <div className="min-h-screen bg-background">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        {/* Brands grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">الشركات المصنعة</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/brand/${brand.slug}`}
                className="card-phone flex flex-col items-center gap-2 py-4 px-2"
                style={{ borderColor: `${brand.color}30` }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-xs font-semibold text-foreground text-center">{brand.nameAr}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-10 max-w-2xl mx-auto relative">
          <div className="flex items-center bg-card border-2 border-primary/30 rounded-xl px-5 py-4 gap-3 shadow-md focus-within:border-primary transition-colors">
            <Search className="w-6 h-6 text-primary" />
            <input
              type="text"
              placeholder="ابحث عن هاتف... مثال: Samsung Galaxy S24"
              className="bg-transparent text-base outline-none w-full text-foreground placeholder:text-muted-foreground"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
              {results.map(phone => (
                <button
                  key={phone.id}
                  className="w-full text-right px-5 py-3 hover:bg-secondary text-sm text-foreground transition-colors flex items-center gap-3"
                  onMouseDown={() => { navigate(`/phone/${phone.slug}`); setQuery(""); }}
                >
                  <img src={phone.image} alt="" className="w-8 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                  <div>
                    <span className="font-medium block">{phone.name}</span>
                    <span className="text-xs text-muted-foreground">{phone.brand} · {phone.year}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Latest phones */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">أحدث الهواتف الذكية</h1>
          <p className="text-sm text-muted-foreground mb-4">اكتشف أحدث الهواتف الذكية مع مواصفاتها التقنية الكاملة</p>
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
