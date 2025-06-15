
import { useState, useEffect } from "react";
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import TopBaseCurrencies from "@/components/TopBaseCurrencies";
import BaseCurrencies from "@/components/BaseCurrencies";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import UniswapWidget from "@/components/UniswapWidget";
import ErrorBoundary from "@/components/ErrorBoundary";

const Dashboard = () => {
  console.log("Rendering Dashboard");
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "BINANCE:BTCUSDT",
    name: "Bitcoin"
  });

  useEffect(() => {
    console.log('Dashboard component mounted');
    console.log('Selected currency:', selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencySelect = (symbol: string, name: string) => {
    console.log(`Selected currency: ${name} (${symbol})`);
    setSelectedCurrency({ symbol, name });
  };

  console.log('Dashboard rendering with selectedCurrency:', selectedCurrency);

  try {
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
            <div className="xl:col-span-2 space-y-6">
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

          {/* Trade Tokens widget - full width and centered */}
          <div className="flex justify-center w-full mb-8">
            <div className="w-full max-w-3xl">
              <ErrorBoundary>
                <UniswapWidget />
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
  } catch (error) {
    console.error('Dashboard render error:', error);
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              Dashboard Error
            </h3>
            <p className="text-muted-foreground">
              There was an error loading the dashboard. Check the console for details.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
