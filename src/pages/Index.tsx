import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Camera } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhoneCard from "@/components/PhoneCard";
import { fetchPhones, searchPhones, type DbPhone } from "@/lib/api";

const Index = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<DbPhone[]>([]);
  const [phones, setPhones] = useState<DbPhone[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhones(40).then(data => {
      setPhones(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const timer = setTimeout(() => {
        searchPhones(query).then(setResults);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        {/* Hero Search */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">AD Phone</h1>
          <p className="text-muted-foreground mb-6">قاعدة بيانات شاملة لمواصفات جميع الهواتف الذكية</p>
          
          <div className="relative">
            <div className="flex items-center bg-card border-2 border-primary/30 rounded-2xl px-5 py-4 gap-3 shadow-lg focus-within:border-primary transition-colors">
              <Search className="w-6 h-6 text-primary shrink-0" />
              <input
                type="text"
                placeholder="ابحث عن هاتف... مثال: Samsung Galaxy S25 Ultra"
                className="bg-transparent text-lg outline-none w-full text-foreground placeholder:text-muted-foreground"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <button
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary shrink-0"
                title="البحث بالصورة"
                onClick={() => {/* TODO: implement image search */}}
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            {showResults && results.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-auto">
                {results.map(phone => (
                  <button
                    key={phone.id}
                    className="w-full text-right px-5 py-3 hover:bg-secondary text-sm text-foreground transition-colors flex items-center gap-3"
                    onMouseDown={() => { navigate(`/phone/${phone.slug}`); setQuery(""); }}
                  >
                    <img src={phone.image || '/placeholder.svg'} alt="" className="w-8 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                    <div>
                      <span className="font-medium block">{phone.name}</span>
                      <span className="text-xs text-muted-foreground">{(phone as any).brands?.name || ''} · {phone.year}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Latest phones */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">أحدث الهواتف الذكية</h2>
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
