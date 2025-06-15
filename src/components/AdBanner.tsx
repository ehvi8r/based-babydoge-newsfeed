
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const AdBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-40 px-2 pb-safe",
        "flex justify-center"
      )}
    >
      <div className="glass-card bg-black/80 text-white rounded-t-lg shadow-lg flex items-center max-w-lg w-full mx-2 mb-2 px-4 py-3 relative animate-fade-in border border-accent">
        <span className="mr-3 font-medium">
          🚀 Advertise here! Promote your crypto project with Based BabyDoge.
        </span>
        <a
          href="https://babydoge20.com/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 ml-auto text-accent hover:text-white font-semibold"
        >
          View Content Calendar
        </a>
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
