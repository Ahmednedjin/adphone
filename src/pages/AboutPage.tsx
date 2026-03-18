import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";

const AboutPage = () => (
  <div className="min-h-screen bg-background pb-16">
    <AdBanner />
    <SiteHeader />
    <main className="container py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">من نحن</h1>
      <div className="bg-card rounded-xl border border-border p-8 space-y-4 text-foreground leading-relaxed">
        <p>
          <strong>AD Phone</strong> هو المرجع العربي الأول لمواصفات الهواتف الذكية. نهدف لتقديم قاعدة بيانات شاملة ودقيقة
          تغطي جميع الهواتف الذكية من جميع الشركات العالمية.
        </p>
        <p>
          نقدم لك مواصفات تفصيلية لكل هاتف تشمل: التصميم، الشاشة، المعالج، الكاميرات، البطارية، الاتصال، المستشعرات، 
          وأكثر من ذلك بكثير. كل ذلك باللغة العربية وبتصميم سهل القراءة.
        </p>
        <p>
          يعتمد الموقع على تقنيات الذكاء الاصطناعي لاكتشاف الهواتف الجديدة وجمع مواصفاتها تلقائياً فور الإعلان عنها،
          مما يضمن أن تكون قاعدة بياناتنا محدثة دائماً.
        </p>
        <h2 className="text-xl font-bold pt-4">مميزاتنا</h2>
        <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
          <li>قاعدة بيانات شاملة لآلاف الهواتف الذكية</li>
          <li>مواصفات تفصيلية ودقيقة باللغة العربية</li>
          <li>بحث ذكي يدعم العربية والإنجليزية مع تصحيح الأخطاء</li>
          <li>بحث بالصور باستخدام الذكاء الاصطناعي</li>
          <li>تحديث تلقائي عند صدور هواتف جديدة</li>
          <li>مقارنة بين الهواتف المشابهة</li>
        </ul>
      </div>
    </main>
    <SiteFooter />
    <div className="ad-banner-bottom">
      <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
    </div>
  </div>
);

export default AboutPage;
