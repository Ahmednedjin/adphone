import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPhoneBySlug, fetchSimilarPhones, fetchPhoneImages, type DbPhone, type DbPhoneImage } from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdBanner from "@/components/AdBanner";
import QuickSpecs from "@/components/QuickSpecs";
import FullSpecsTable from "@/components/FullSpecsTable";
import PhoneCard from "@/components/PhoneCard";
import PhoneGallery from "@/components/PhoneGallery";

const PhoneDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [phone, setPhone] = useState<DbPhone | null>(null);
  const [similar, setSimilar] = useState<DbPhone[]>([]);
  const [images, setImages] = useState<DbPhoneImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPhoneBySlug(slug || "").then(data => {
      setPhone(data);
      setLoading(false);
      if (data) {
        fetchSimilarPhones(data).then(setSimilar);
        fetchPhoneImages(data.id).then(setImages);
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4" />
            <div className="h-64 bg-secondary rounded-xl max-w-md mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">الهاتف غير موجود</h1>
          <Link to="/" className="text-primary mt-4 inline-block">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const brand = (phone as any).brands;
  const allImages = [
    ...(phone.image ? [{ id: 'main', url: phone.image, label: 'الصورة الرئيسية' }] : []),
    ...images.map(img => ({ id: img.id, url: img.url, label: img.label || '' }))
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <AdBanner />
      <SiteHeader />

      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex gap-2">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          {brand && <Link to={`/brand/${brand.slug}`} className="hover:text-primary">{brand.name}</Link>}
          <span>/</span>
          <span className="text-foreground">{phone.name}</span>
        </nav>

        {/* Hero: image + quick specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div
            className="bg-card rounded-xl border border-border p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setGalleryOpen(true)}
          >
            <img
              src={phone.image || '/placeholder.svg'}
              alt={phone.name}
              className="max-h-96 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">مواصفات {phone.name}</h1>
            <p className="text-sm text-muted-foreground mb-1">{brand?.name} · {phone.year}</p>
            {phone.release_date && <p className="text-xs text-muted-foreground mb-1">تاريخ الإصدار: {phone.release_date}</p>}
            {phone.price && <p className="text-lg font-bold text-primary mb-6">{phone.price}</p>}
            <QuickSpecs phone={phone} />
          </div>
        </div>

        {/* Ad */}
        <AdBanner className="rounded-xl mb-8" />

        {/* Full specs - full width */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">المواصفات التفصيلية</h2>
        </div>
      </main>
      <div className="px-4 mb-12">
        <FullSpecsTable phone={phone} />
      </div>
      <main className="container">

        {/* Similar phones */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">هواتف مشابهة</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similar.map(p => (
                <PhoneCard key={p.id} phone={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
      <div className="ad-banner-bottom">
        <span className="text-muted-foreground text-xs">مساحة إعلانية</span>
      </div>

      {/* Gallery modal */}
      {galleryOpen && <PhoneGallery images={allImages} onClose={() => setGalleryOpen(false)} />}
    </div>
  );
};

export default PhoneDetail;
