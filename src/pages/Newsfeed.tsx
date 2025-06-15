import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useNewsData, NewsItem } from "@/hooks/useNewsData";
import { useToast } from "@/hooks/use-toast";
import BannerSettings from "@/components/BannerSettings";

const Newsfeed = () => {
  console.log("Rendering Newsfeed");
  const { toast } = useToast();
  
  const { data: newsData, isLoading, error, refetch, isFetching } = useNewsData();

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "News Refreshed",
        description: "Latest cryptocurrency news has been loaded.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh news. Please try again.",
        variant: "destructive",
      });
    }
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
            <Button onClick={handleRefresh}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Banner Ad settings - remove or move wherever you like */}
      <BannerSettings />
      {/* ... keep existing JSX for Newsfeed ... */}
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
              <Button 
                onClick={handleRefresh}
                disabled={isLoading || isFetching}
                variant="outline"
                size="sm"
              >
                <RefreshCcw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </header>
          
          <ErrorBoundary>
            <div className="glass-card rounded-lg p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-6">
                Latest Cryptocurrency News ({newsData?.length || 0} articles)
              </h3>
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
                  ) : newsData && newsData.length > 0 ? (
                    newsData.map((news) => (
                      <NewsCard 
                        key={news.id} 
                        news={news} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No news articles available at the moment.</p>
                      <Button onClick={handleRefresh} className="mt-4" variant="outline">
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try Loading News
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Newsfeed;
