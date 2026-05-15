import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@db/client";
import SiteHeader from "@/components/SiteHeader";

type Brand = { id: string; slug: string; name: string; name_ar: string | null; logo: string | null; color: string | null };
type Phone = { id: string; slug: string; name: string; image: string | null; year: number | null };

export default function Home() {
  const [, navigate] = useLocation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [latest, setLatest] = useState<Phone[]>([]);
  const [popular, setPopular] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: b }, { data: l }, { data: p }] = await Promise.all([
        supabase.from("brands").select("id,slug,name,name_ar,logo,color").order("name"),
        supabase.from("phones").select("id,slug,name,image,year").eq("status", "published").order("year", { ascending: false }).limit(12),
        supabase.from("phones").select("id,slug,name,image,year").eq("status", "published").order("created_at", { ascending: false }).range(12, 23),
      ]);
      setBrands((b as Brand[]) ?? []);
      setLatest((l as Phone[]) ?? []);
      setPopular((p as Phone[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
        {/* HERO */}
        <section className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">مواصفات كل الهواتف</h1>
          <p className="text-gray-400 text-sm md:text-base">ابحث وقارن بين أحدث الهواتف الذكية</p>
        </section>

        {/* LATEST PHONES */}
        <Section title="أحدث الهواتف">
          <PhoneGrid phones={latest} loading={loading} onClick={(s) => navigate(`/phone/${s}`)} />
        </Section>

        {/* BRANDS */}
        <Section title="تصفح حسب الشركة">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate(`/brand/${b.slug}`)}
                className="group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl p-4 flex flex-col items-center gap-2 transition"
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="h-10 w-auto max-w-[80%] object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-10 flex items-center font-bold text-lg">{b.name}</div>
                )}
                <span className="text-xs text-gray-400 group-hover:text-white">{b.name_ar || b.name}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* POPULAR */}
        {popular.length > 0 && (
          <Section title="هواتف شائعة">
            <PhoneGrid phones={popular} loading={false} onClick={(s) => navigate(`/phone/${s}`)} />
          </Section>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <div>© AdPhone 2026 — موقع مواصفات الهواتف الذكية</div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-4 border-r-4 border-blue-500 pr-3">{title}</h2>
      {children}
    </section>
  );
}

function PhoneGrid({ phones, loading, onClick }: { phones: Phone[]; loading: boolean; onClick: (slug: string) => void }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }
  if (phones.length === 0) {
    return <p className="text-gray-500 text-center py-8">لم يتم العثور على هواتف</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {phones.map((p) => (
        <button
          key={p.id}
          onClick={() => onClick(p.slug)}
          className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-blue-500 rounded-xl p-3 transition group flex flex-col"
        >
          <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
            {p.image ? (
              <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" loading="lazy" />
            ) : (
              <span className="text-gray-600 text-xs">لا توجد صورة</span>
            )}
          </div>
          <span className="text-xs md:text-sm font-medium text-center text-gray-200 line-clamp-2 min-h-[2.5em]">{p.name}</span>
          {p.year && <span className="text-[10px] text-gray-500 text-center mt-1">{p.year}</span>}
        </button>
      ))}
    </div>
  );
}
