
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CryptoImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

const CryptoImage = ({ src, alt, className = "w-8 h-8 rounded-full", fallbackText }: CryptoImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.log(`Failed to load image: ${src}`);
    setIsLoading(false);
    setHasError(true);
  };

  if (isLoading) {
    return <Skeleton className={className} />;
  }

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold`}>
        {fallbackText || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default CryptoImage;
