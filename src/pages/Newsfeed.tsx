
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import NewsCard from "@/components/NewsCard";
import NewsModal from "@/components/NewsModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useNewsData, NewsItem } from "@/hooks/useNewsData";

const Newsfeed = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: newsData, isLoading, error, refetch } = useNewsData();

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Failed to load news
            </h3>
            <p className="text-muted-foreground mb-4">
              There was an error loading the latest cryptocurrency news.
            </p>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Based BabyDoge Newsfeed</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Stay updated with the latest cryptocurrency news and Based BabyDoge updates
              </p>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </header>
        
        <ErrorBoundary>
          <div className="glass-card rounded-lg p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Latest Cryptocurrency News</h3>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4 pr-4">
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="glass-card p-6">
                      <div className="flex gap-4">
                        <Skeleton className="w-24 h-24 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-6 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  newsData?.map((news) => (
                    <NewsCard 
                      key={news.id} 
                      news={news} 
                      onClick={handleNewsClick}
                    />
                  ))
                )}
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
