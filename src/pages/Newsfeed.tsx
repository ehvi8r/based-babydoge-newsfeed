
import ErrorBoundary from "@/components/ErrorBoundary";

const Newsfeed = () => {
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
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">
              The newsfeed feature is being prepared. This will include the latest cryptocurrency news, 
              Based BabyDoge updates, and market insights.
            </p>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Newsfeed;
