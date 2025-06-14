
import { useState } from "react";
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import TopBaseCurrencies from "@/components/TopBaseCurrencies";
import BaseCurrencies from "@/components/BaseCurrencies";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ErrorBoundary from "@/components/ErrorBoundary";

const Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "BINANCE:BTCUSDT",
    name: "Bitcoin"
  });

  const handleCurrencySelect = (symbol: string, name: string) => {
    console.log(`Selected currency: ${name} (${symbol})`);
    setSelectedCurrency({ symbol, name });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Based BabyDoge Trading Dashboard</h2>
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
              <CryptoChart symbol={selectedCurrency.symbol} name={selectedCurrency.name} />
            </ErrorBoundary>
          </div>
          <div>
            <ErrorBoundary>
              <PortfolioCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <ErrorBoundary>
            <CryptoList onCurrencySelect={handleCurrencySelect} />
          </ErrorBoundary>
          <ErrorBoundary>
            <TopBaseCurrencies onCurrencySelect={handleCurrencySelect} />
          </ErrorBoundary>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
          <ErrorBoundary>
            <BaseCurrencies onCurrencySelect={handleCurrencySelect} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
