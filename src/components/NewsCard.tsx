
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
  onClick: (news: NewsItem) => void;
}

const NewsCard = ({ news, onClick }: NewsCardProps) => {
  return (
    <Card 
      className="glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      onClick={() => onClick(news)}
    >
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
              <Badge variant="outline" className="text-xs">
                {news.source}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {news.date} • {news.readTime}
              </span>
              <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
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
