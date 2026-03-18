import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background pb-16">
    <AdBanner />
    <SiteHeader />
    <main className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">سياسة الخصوصية</h1>
      <div className="bg-card rounded-xl border border-border p-8 space-y-4 text-foreground leading-relaxed">
        <p>آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
        <h2 className="text-xl font-bold pt-4">جمع المعلومات</h2>
        <p>لا نقوم بجمع معلومات شخصية من الزوار. الموقع يعرض فقط مواصفات الهواتف الذكية ولا يتطلب تسجيل حساب للتصفح.</p>
        <h2 className="text-xl font-bold pt-4">ملفات تعريف الارتباط (Cookies)</h2>
        <p>قد نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة الزوار. يمكنك تعطيل هذه الملفات من إعدادات متصفحك.</p>
        <h2 className="text-xl font-bold pt-4">الإعلانات</h2>
        <p>قد نعرض إعلانات من أطراف ثالثة مثل Google AdSense. هذه الخدمات قد تستخدم ملفات تعريف الارتباط لعرض إعلانات مناسبة.</p>
        <h2 className="text-xl font-bold pt-4">روابط خارجية</h2>
        <p>قد يحتوي الموقع على روابط لمواقع خارجية. لسنا مسؤولين عن سياسات الخصوصية الخاصة بتلك المواقع.</p>
        <h2 className="text-xl font-bold pt-4">التواصل</h2>
        <p>للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر: Ahmednedjin2@gmail.com</p>
      </div>
    </main>
    <SiteFooter />
    <div className="ad-banner-bottom">
      <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
    </div>
  </div>
);

export default PrivacyPage;
