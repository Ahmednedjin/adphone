import { Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";

const ContactPage = () => (
  <div className="min-h-screen bg-background pb-16">
    <AdBanner />
    <SiteHeader />
    <main className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">اتصل بنا</h1>
      <div className="bg-card rounded-xl border border-border p-8 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          نسعد بتواصلكم معنا. يمكنكم التواصل عبر البريد الإلكتروني أو وسائل التواصل الاجتماعي.
        </p>
        <div className="flex items-center gap-3 text-foreground">
          <Mail className="w-5 h-5 text-primary" />
          <a href="mailto:Ahmednedjin2@gmail.com" className="hover:text-primary transition-colors">
            Ahmednedjin2@gmail.com
          </a>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">تابعنا على</h2>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
    <div className="ad-banner-bottom">
      <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
    </div>
  </div>
);

export default ContactPage;
