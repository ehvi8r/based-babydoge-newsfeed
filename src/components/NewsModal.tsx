
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  content: string;
}

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal = ({ news, isOpen, onClose }: NewsModalProps) => {
  if (!news) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">
                  {news.category}
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
                />
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-muted-foreground mb-4 font-medium">
                {news.summary}
              </p>
              <div className="text-foreground whitespace-pre-line">
                {news.content}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
