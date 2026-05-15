import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Search, Smartphone, X } from "lucide-react";
import { supabase } from "@db/client";

type PhoneHit = { id: string; slug: string; name: string; image: string | null };

export default function SiteHeader() {
  const [, navigate] = useLocation();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<PhoneHit[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (q.trim().length < 2) {
      setHits([]);
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from("phones")
        .select("id,slug,name,image")
        .ilike("name", `%${q.trim()}%`)
        .eq("status", "published")
        .limit(8);
      if (!cancelled) {
        setHits((data as PhoneHit[]) ?? []);
        setOpen(true);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white shrink-0"
        >
          <Smartphone className="text-blue-500" size={26} />
          <span className="text-2xl font-bold">AdPhone</span>
        </button>

        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => hits.length && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            placeholder="ابحث عن هاتف... Samsung S25, iPhone 16, Xiaomi"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pr-12 pl-10 py-3.5 text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800/80"
          />
          {q && (
            <button
              onClick={() => { setQ(""); setHits([]); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          )}

          {open && hits.length > 0 && (
            <div className="absolute top-full mt-2 right-0 left-0 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
              {hits.map((p) => (
                <button
                  key={p.id}
                  onMouseDown={() => {
                    navigate(`/phone/${p.slug}`);
                    setOpen(false);
                    setQ("");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 text-right border-b border-gray-800 last:border-b-0"
                >
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-white/5 rounded" loading="lazy" />
                  )}
                  <span className="text-white text-sm">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
