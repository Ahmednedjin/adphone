import { Link } from "react-router-dom";
import { brands } from "@/data/phones";

const SiteFooter = () => (
  <footer className="bg-card border-t border-border mt-16 pb-16">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AD</span>
            </div>
            <span className="font-bold text-lg text-foreground">AD Phone</span>
          </div>
          <p className="text-sm text-muted-foreground">المرجع العربي الأول لمواصفات الهواتف الذكية والمقارنات التقنية.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
            <li><Link to="/brands" className="hover:text-primary transition-colors">الشركات</Link></li>
            <li><Link to="/compare" className="hover:text-primary transition-colors">المقارنات</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">الشركات</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {brands.slice(0, 4).map(b => (
              <li key={b.id}><Link to={`/brand/${b.slug}`} className="hover:text-primary transition-colors">{b.nameAr}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AD Phone. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
