import { Link } from "react-router-dom";
import { type DbPhone } from "@/lib/api";

const PhoneCard = ({ phone }: { phone: DbPhone }) => {
  const brand = (phone as any).brands;
  return (
    <Link to={`/phone/${phone.slug}`} className="card-phone group block">
      <div className="aspect-[3/4] bg-secondary rounded-lg mb-3 overflow-hidden flex items-center justify-center p-4">
        <img
          src={phone.image || '/placeholder.svg'}
          alt={phone.name}
          className="max-h-full max-w-full object-contain transition-transform duration-150 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
      </div>
      <h3 className="font-semibold text-sm text-foreground leading-tight mb-1">{phone.name}</h3>
      <p className="text-xs text-muted-foreground">{brand?.name || ''} · {phone.year}</p>
      {phone.price && <p className="text-xs font-semibold text-primary mt-1">{phone.price}</p>}
    </Link>
  );
};

export default PhoneCard;
