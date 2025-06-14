
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCard from "@/components/NewsCard";
import NewsModal from "@/components/NewsModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { mockNewsData, NewsItem } from "@/data/newsData";

const Newsfeed = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Based BabyDoge Newsfeed</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Stay updated with the latest cryptocurrency news and Based BabyDoge updates
          </p>
        </header>
        
        <ErrorBoundary>
          <div className="glass-card rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Latest Cryptocurrency News</h3>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4 pr-4">
                {mockNewsData.map((news) => (
                  <NewsCard 
                    key={news.id} 
                    news={news} 
                    onClick={handleNewsClick}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ErrorBoundary>

        <NewsModal 
          news={selectedNews}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Newsfeed;
