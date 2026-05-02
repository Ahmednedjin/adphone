import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, Smartphone, ChevronDown } from "lucide-react";

const BRANDS = [
  { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com", slug: "Samsung" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com", slug: "Apple" },
  { name: "Xiaomi", logo: "https://logo.clearbit.com/xiaomi.com", slug: "Xiaomi" },
  { name: "Huawei", logo: "https://logo.clearbit.com/huawei.com", slug: "Huawei" },
  { name: "Oppo", logo: "https://logo.clearbit.com/oppo.com", slug: "Oppo" },
  { name: "Vivo", logo: "https://logo.clearbit.com/vivo.com", slug: "Vivo" },
  { name: "Realme", logo: "https://logo.clearbit.com/realme.com", slug: "Realme" },
  { name: "OnePlus", logo: "https://logo.clearbit.com/oneplus.com", slug: "OnePlus" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com", slug: "Google" },
  { name: "Sony", logo: "https://logo.clearbit.com/sony.com", slug: "Sony" },
  { name: "Motorola", logo: "https://logo.clearbit.com/motorola.com", slug: "Motorola" },
  { name: "Nokia", logo: "https://logo.clearbit.com/nokia.com", slug: "Nokia" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [phones, setPhones] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showBrands, setShowBrands] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/phones")
      .then(r => r.json())
      .then(data => {
        setPhones(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("[v0] Error fetching phones:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(phones);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      phones.filter(p =>
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q)
      )
    );
  }, [search, phones]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Smartphone className="text-primary-foreground" size={24} />
              </div>
              <span className="text-2xl font-bold">AdPhone</span>
            </div>
            <button
              onClick={() => setShowBrands(!showBrands)}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
            >
              الشركات
              <ChevronDown size={16} className={`transition-transform ${showBrands ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="ابحث عن هاتف... Samsung, iPhone, Xiaomi"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* BRANDS DROPDOWN */}
        {showBrands && (
          <div className="max-w-6xl mx-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pb-3">
            {BRANDS.map(brand => (
              <button
                key={brand.slug}
                onClick={() => { navigate(`/brand/${brand.slug}`); setShowBrands(false); }}
                className="flex flex-col items-center gap-2 bg-card hover:bg-accent border border-border rounded-lg p-3 transition-colors"
              >
                <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" onError={e => (e.currentTarget.src = "https://via.placeholder.com/40")} />
                <span className="text-xs font-medium">{brand.name}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="max-w-6xl mx-auto w-full px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-3">مواصفات كل الهواتف</h1>
        <p className="text-muted-foreground text-base">ابحث وقارن بين أحدث الهواتف الذكية بسهولة</p>
      </div>

      {/* BRANDS GRID - shown when no search */}
      {!search && (
        <div className="max-w-6xl mx-auto w-full px-4 mb-12">
          <h2 className="text-xl font-bold mb-5">الشركات الرائدة</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {BRANDS.map(brand => (
              <button
                key={brand.slug}
                onClick={() => navigate(`/brand/${brand.slug}`)}
                className="flex flex-col items-center gap-3 bg-card hover:bg-accent border border-border rounded-xl p-4 transition-colors"
              >
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain" onError={e => (e.currentTarget.src = "https://via.placeholder.com/48")} />
                <span className="text-sm font-medium text-center">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PHONES GRID */}
      <div className="max-w-6xl mx-auto w-full px-4 pb-16 flex-grow">
        {search && <h2 className="text-lg font-bold mb-5">نتائج البحث ({filtered.length})</h2>}
        {!search && <h2 className="text-lg font-bold mb-5">أحدث الهواتف</h2>}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg h-48 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">لم يتم العثور على هواتف</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.slice(0, 20).map(phone => (
              <button
                key={phone.id}
                onClick={() => navigate(`/phone/${phone.id}`)}
                className="bg-card hover:bg-accent border border-border rounded-lg p-4 text-left transition-colors flex flex-col gap-3"
              >
                {phone.imageUrl ? (
                  <img src={phone.imageUrl} alt={phone.model} className="w-full h-32 object-contain" />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-muted rounded">
                    <Smartphone className="text-muted-foreground" size={48} />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs text-primary font-medium">{phone.brand}</p>
                  <p className="text-sm font-bold truncate">{phone.model}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8 px-4 text-center mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="text-primary" size={20} />
            <span className="font-bold text-lg">AdPhone</span>
          </div>
          <p className="text-muted-foreground text-sm">موقع مواصفات الهواتف الذكية</p>
          <p className="text-muted-foreground text-xs mt-3">© 2025 AdPhone. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
