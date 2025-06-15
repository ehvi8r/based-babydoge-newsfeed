
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const BANNER_IMAGE_KEY = "babydoge-ad-banner-image";

const AdBanner = () => {
  const [visible, setVisible] = useState(true);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(BANNER_IMAGE_KEY);
    if (stored) setBannerUrl(stored);
    else setBannerUrl(null);
  }, []);

  if (!visible || !bannerUrl) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-40 px-2 pb-safe",
        "flex justify-center"
      )}
    >
      <div className="glass-card bg-black/80 text-white rounded-t-lg shadow-lg flex items-center max-w-lg w-full mx-2 mb-2 px-4 py-3 relative animate-fade-in border border-accent">
        <img
          src={bannerUrl}
          alt="Sponsored Banner"
          className="h-14 max-h-24 w-auto rounded object-contain max-w-[200px] mr-3 bg-white"
          style={{ background: "white" }}
        />
        <span className="font-medium flex-1 truncate">
          <span className="sr-only">Ad: </span>
        </span>
        <button
          className="absolute top-1 right-2 p-1 hover:text-red-400"
          aria-label="Dismiss banner"
          onClick={() => setVisible(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
