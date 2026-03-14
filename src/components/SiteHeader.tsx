import { Link } from "react-router-dom";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "الشركات", to: "/brands" },
];

const SiteHeader = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AD</span>
          </div>
          <span className="font-bold text-lg text-foreground">AD Phone</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
