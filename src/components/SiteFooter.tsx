import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const SiteFooter = () => (
  <footer className="bg-card border-t border-border mt-16 pb-16">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="AD Phone" className="h-8 w-auto rounded shadow-sm" />
            <span className="font-bold text-lg text-foreground">AD Phone</span>
          </div>
          <p className="text-sm text-muted-foreground">المرجع العربي الأول لمواصفات الهواتف الذكية.</p>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
            <li><Link to="/brands" className="hover:text-primary transition-colors">الشركات</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">معلومات</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">تواصل معنا</h4>
          <p className="text-sm text-muted-foreground mb-2">Ahmednedjin2@gmail.com</p>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AD Phone. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
