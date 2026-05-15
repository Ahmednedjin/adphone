import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { supabase } from "@db/client";
import SiteHeader from "@/components/SiteHeader";

type Brand = { id: string; slug: string; name: string; name_ar: string | null; logo: string | null };
type Phone = { id: string; slug: string; name: string; image: string | null; year: number | null };

export default function BrandPage() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/brand/:slug");
  const slug = params?.slug || "";
  const [brand, setBrand] = useState<Brand | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data: b } = await supabase
        .from("brands")
        .select("id,slug,name,name_ar,logo")
        .eq("slug", slug)
        .maybeSingle();
      if (!b) { setLoading(false); return; }
      setBrand(b as Brand);
      const { data: p } = await supabase
        .from("phones")
        .select("id,slug,name,image,year")
        .eq("brand_id", (b as Brand).id)
        .eq("status", "published")
        .order("year", { ascending: false });
      setPhones((p as Phone[]) ?? []);
      setLoading(false);
    })();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {brand && (
          <div className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            {brand.logo && (
              <img src={brand.logo} alt={brand.name} className="h-14 w-auto filter brightness-0 invert" />
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{brand.name_ar || brand.name}</h1>
              <p className="text-gray-400 text-sm">{phones.length} هاتف</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : phones.length === 0 ? (
          <p className="text-gray-500 text-center py-12">لا توجد هواتف لهذه الشركة.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {phones.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/phone/${p.slug}`)}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-blue-500 rounded-xl p-3 transition group flex flex-col"
              >
                <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" loading="lazy" />
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium text-center text-gray-200 line-clamp-2 min-h-[2.5em]">{p.name}</span>
                {p.year && <span className="text-[10px] text-gray-500 text-center mt-1">{p.year}</span>}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
