import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { searchPhones } from "@/data/phones";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "الشركات", to: "/brands" },
  { label: "المقارنات", to: "/compare" },
  { label: "أفضل الهواتف", to: "/best" },
  { label: "الهواتف الجديدة", to: "/new" },
];

const SiteHeader = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const results = query.length > 1 ? searchPhones(query) : [];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AD</span>
          </div>
          <span className="font-bold text-lg text-foreground">AD Phone</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative">
          <div className="flex items-center bg-secondary rounded-lg px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن هاتف..."
              className="bg-transparent text-sm outline-none w-32 md:w-48 text-foreground placeholder:text-muted-foreground"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-auto">
              {results.map(phone => (
                <button
                  key={phone.id}
                  className="w-full text-right px-4 py-2 hover:bg-secondary text-sm text-foreground transition-colors"
                  onMouseDown={() => { navigate(`/phone/${phone.slug}`); setQuery(""); }}
                >
                  {phone.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItems.map(item => (
          <Link key={item.to} to={item.to} className="nav-link whitespace-nowrap text-xs">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default SiteHeader;
