
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const BANNER_IMAGE_KEY = "babydoge-ad-banner-image";

const BannerSettings = () => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(BANNER_IMAGE_KEY);
    if (stored) setBannerUrl(stored);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        localStorage.setItem(BANNER_IMAGE_KEY, reader.result);
        setBannerUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    localStorage.removeItem(BANNER_IMAGE_KEY);
    setBannerUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-lg mx-auto my-8 glass-card rounded-lg p-6 shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Banner Ad Settings</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={handleUpload}
      />
      {bannerUrl ? (
        <div className="flex flex-col items-center">
          <img src={bannerUrl} alt="Ad Banner" className="h-24 max-w-full object-contain mb-2 rounded" />
          <Button onClick={handleRemove} variant="destructive" size="sm">
            Remove Banner
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No banner set. Upload an image to show at the bottom of every page.</p>
      )}
    </div>
  );
};

export default BannerSettings;
