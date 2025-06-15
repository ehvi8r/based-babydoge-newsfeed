
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  source: string;
  url: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = news.url?.trim();
    if (
      url &&
      url !== "#" &&
      url.toLowerCase() !== "undefined" &&
      url.toLowerCase() !== "null" &&
      url.toLowerCase().indexOf("about:blank") === -1
    ) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className="glass-card transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {news.imageUrl && (
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {news.category}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={handleSourceClick}
                tabIndex={0}
                role="button"
                title={`Open ${news.source} in new tab`}
                aria-label={`Open ${news.source} in new tab`}
              >
                {news.source}
                <ExternalLink className="w-3 h-3 ml-1 inline opacity-70" />
              </Badge>
              <span className="text-xs text-muted-foreground">
                {news.date} • {news.readTime}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
              {news.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {news.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;

