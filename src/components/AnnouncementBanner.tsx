
import { Bell } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="glass-card p-4 rounded-lg mb-8 animate-fade-in border-l-4 border-primary">
      <div className="flex items-center gap-3">
        <Bell className="w-5 h-5 text-primary animate-pulse-subtle" />
        <div>
          <h3 className="font-semibold text-primary">BBDOGE Trading Coming Soon!</h3>
          <p className="text-sm text-muted-foreground">
            Based BabyDoge will be available for trading soon. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
