import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";

const TermsPage = () => (
  <div className="min-h-screen bg-background pb-16">
    <AdBanner />
    <SiteHeader />
    <main className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">الشروط والأحكام</h1>
      <div className="bg-card rounded-xl border border-border p-8 space-y-4 text-foreground leading-relaxed">
        <p>آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
        <h2 className="text-xl font-bold pt-4">استخدام الموقع</h2>
        <p>باستخدامك لموقع AD Phone فإنك توافق على هذه الشروط والأحكام. الموقع مخصص لعرض مواصفات الهواتف الذكية لأغراض المعلومات فقط.</p>
        <h2 className="text-xl font-bold pt-4">دقة المعلومات</h2>
        <p>نبذل قصارى جهدنا لتقديم معلومات دقيقة ومحدثة. ومع ذلك، لا نضمن دقة أو اكتمال جميع المعلومات المعروضة. ننصح بالتحقق من المواصفات الرسمية من الشركة المصنعة.</p>
        <h2 className="text-xl font-bold pt-4">الملكية الفكرية</h2>
        <p>جميع المحتويات المعروضة على الموقع بما فيها النصوص والتصميم هي ملك لـ AD Phone. أسماء الشركات والعلامات التجارية هي ملك لأصحابها.</p>
        <h2 className="text-xl font-bold pt-4">إخلاء المسؤولية</h2>
        <p>الموقع يقدم المعلومات "كما هي" دون أي ضمانات. لا نتحمل مسؤولية أي قرار شراء يتم اتخاذه بناءً على المعلومات المعروضة.</p>
        <h2 className="text-xl font-bold pt-4">تعديل الشروط</h2>
        <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم نشر أي تعديلات على هذه الصفحة.</p>
      </div>
    </main>
    <SiteFooter />
    <div className="ad-banner-bottom">
      <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
    </div>
  </div>
);

export default TermsPage;
