
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="https://babydoge20.com/assets/images/BABYlogo.png" 
              alt="Based BabyDoge Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-2xl sm:text-3xl font-bold">Based BabyDoge Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back to your cryptocurrency portfolio
          </p>
        </header>
        
        <ErrorBoundary>
          <AnnouncementBanner />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <MarketStats />
        </ErrorBoundary>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
          <div className="xl:col-span-2">
            <ErrorBoundary>
              <CryptoChart />
            </ErrorBoundary>
          </div>
          <div>
            <ErrorBoundary>
              <PortfolioCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <ErrorBoundary>
          <CryptoList />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
