import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { Search, Camera, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchPhones, type DbPhone } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "الشركات", to: "/brands" },
  { label: "من نحن", to: "/about" },
  { label: "اتصل بنا", to: "/contact" },
];

const SiteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DbPhone[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [aiSearching, setAiSearching] = useState(false);
  const [correctedName, setCorrectedName] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const lastAiCallRef = useRef<number>(0);

  const doSearch = useCallback(async (val: string) => {
    if (val.length < 2) { setResults([]); setCorrectedName(null); return; }
    
    // Always search DB first
    const dbResults = await searchPhones(val);
    if (dbResults.length > 0) {
      setResults(dbResults);
      setCorrectedName(null);
      return;
    }

    // Only call AI if no DB results AND enough time has passed (5s cooldown)
    const now = Date.now();
    if (now - lastAiCallRef.current < 5000) {
      setResults([]);
      return;
    }

    // Only call AI for queries >= 4 chars to avoid noise
    if (val.length < 4) { setResults([]); return; }

    lastAiCallRef.current = now;
    setAiSearching(true);
    try {
      const { data } = await supabase.functions.invoke("ai-search", { body: { query: val } });
      setResults(data?.phones || []);
      if (data?.corrected) setCorrectedName(data.correctedName);
      else setCorrectedName(null);
    } catch {
      setResults([]);
    }
    setAiSearching(false);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    setShowResults(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 600);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="AD Phone" className="h-10 w-auto object-contain rounded shadow-sm" />
          <span className="font-bold text-lg text-foreground hidden sm:inline">AD Phone</span>
        </Link>

        {/* Desktop search */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="flex items-center bg-secondary rounded-lg px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="ابحث عن هاتف..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
              value={query}
              onChange={e => handleInputChange(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>
          {showResults && (results.length > 0 || aiSearching || correctedName) && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
              {aiSearching && <p className="px-4 py-2 text-sm text-muted-foreground">🔍 جاري البحث الذكي...</p>}
              {correctedName && <p className="px-4 py-1.5 text-xs text-primary">هل تقصد: {correctedName}؟</p>}
              {results.map((phone: any) => (
                <button
                  key={phone.id}
                  className="w-full text-right px-4 py-2.5 hover:bg-secondary text-sm text-foreground transition-colors flex items-center gap-3"
                  onMouseDown={() => { navigate(`/phone/${phone.slug}`); setQuery(""); }}
                >
                  <img src={phone.image || '/placeholder.svg'} alt="" className="w-7 h-9 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                  <div>
                    <span className="font-medium block">{phone.name}</span>
                    <span className="text-xs text-muted-foreground">{phone.brands?.name || ''} · {phone.year}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          <div className="flex items-center bg-secondary rounded-lg px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن هاتف..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
              value={query}
              onChange={e => handleInputChange(e.target.value)}
            />
          </div>
          {showResults && results.length > 0 && (
            <div className="bg-card border border-border rounded-lg max-h-48 overflow-auto">
              {results.map((phone: any) => (
                <button
                  key={phone.id}
                  className="w-full text-right px-4 py-2 hover:bg-secondary text-sm text-foreground flex items-center gap-2"
                  onClick={() => { navigate(`/phone/${phone.slug}`); setMobileMenu(false); setQuery(""); }}
                >
                  <img src={phone.image || '/placeholder.svg'} alt="" className="w-6 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                  <span>{phone.name}</span>
                </button>
              ))}
            </div>
          )}
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className="block py-2 text-foreground font-medium" onClick={() => setMobileMenu(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
