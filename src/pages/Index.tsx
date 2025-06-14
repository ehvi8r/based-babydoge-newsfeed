
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="https://babydoge20.com/assets/images/BABYlogo.png" 
              alt="Based BabyDoge Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-3xl font-bold">Based BabyDoge Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Welcome back to your portfolio (More on the way)</p>
        </header>
        
        <AnnouncementBanner />
        
        <MarketStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CryptoChart />
          </div>
          <div>
            <PortfolioCard />
          </div>
        </div>
        
        <CryptoList />
      </div>
    </div>
  );
};

export default Index;
