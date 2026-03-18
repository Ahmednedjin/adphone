import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "الشركات", to: "/brands" },
  { label: "من نحن", to: "/about" },
  { label: "اتصل بنا", to: "/contact" },
];

const SiteHeader = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="AD Phone"
            className="h-10 w-auto object-contain rounded shadow-sm"
          />
          <span className="font-bold text-lg text-foreground hidden sm:inline">AD Phone</span>
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
