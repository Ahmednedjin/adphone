import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type GalleryImage = {
  id: string;
  url: string;
  label: string;
};

const PhoneGallery = ({ images, onClose }: { images: GalleryImage[]; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <img
            src={images[current].url}
            alt={images[current].label}
            className="max-h-[80vh] max-w-full object-contain"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((current + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrent((current - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="flex gap-2 justify-center mt-4">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setCurrent(i)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${i === current ? 'border-primary' : 'border-transparent opacity-60'}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}

        {images[current].label && (
          <p className="text-center text-white/80 text-sm mt-2">{images[current].label}</p>
        )}
      </div>
    </div>
  );
};

export default PhoneGallery;
