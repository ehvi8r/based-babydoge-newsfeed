
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  content: string;
  source: string;
  url: string;
}

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal = ({ news, isOpen, onClose }: NewsModalProps) => {
  if (!news) return null;

  const handleReadFull = () => {
    const trimmedUrl = (news.url || '').trim();
    if (
      trimmedUrl &&
      trimmedUrl !== '#' &&
      trimmedUrl.toLowerCase() !== 'undefined' &&
      trimmedUrl.toLowerCase() !== 'null' &&
      trimmedUrl.toLowerCase().indexOf('about:blank') === -1
    ) {
      window.open(trimmedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const hasValidUrl = !!(
    news.url &&
    typeof news.url === "string" &&
    news.url.trim() !== "" &&
    news.url !== "#" &&
    news.url.toLowerCase() !== "undefined" &&
    news.url.toLowerCase() !== "null" &&
    news.url.startsWith("http")
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogDescription className="sr-only">
          Full article details for {news.title}
        </DialogDescription>
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">
                  {news.category}
                </Badge>
                <Badge variant="outline">
                  {news.source}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {news.date} • {news.readTime}
                </span>
              </div>
              <DialogTitle className="text-2xl font-bold leading-tight">
                {news.title}
              </DialogTitle>
            </DialogHeader>
            
            {news.imageUrl && (
              <div className="mb-6">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-muted-foreground mb-4 font-medium">
                {news.summary}
              </p>
              <div className="text-foreground whitespace-pre-line mb-6">
                {news.content}
              </div>
              
              <div className="border-t pt-4">
                {hasValidUrl ? (
                  <>
                    <button
                      onClick={handleReadFull}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {/* Visible debug: show the article's link as text */}
                    <div className="mt-2 text-xs break-all font-mono bg-gray-100 text-gray-800 px-2 py-2 rounded">
                      URL to be opened: 
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ wordBreak: "break-word" }}
                        className="ml-1 underline text-blue-600"
                      >
                        {news.url}
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg opacity-50 cursor-not-allowed">
                    Article URL Not Available
                    <ExternalLink className="w-4 h-4" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Source: {news.source}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;

