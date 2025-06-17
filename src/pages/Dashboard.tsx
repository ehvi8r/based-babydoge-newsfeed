
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
import ResourceLinksRow from "@/components/ResourceLinksRow";
import StaticCustomTokenDialog from "@/components/StaticCustomTokenDialog";

const Dashboard = () => {
  console.log("Dashboard: Starting render");
  
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "BINANCE:BTCUSDT",
    name: "Bitcoin"
  });

  const [customToken, setCustomToken] = useState<{
    chain: "ETH" | "BASE";
    symbol: string;
    address: string;
  } | null>(null);

  useEffect(() => {
    console.log('Dashboard: Component mounted successfully');
    console.log('Dashboard: Selected currency:', selectedCurrency);
  }, [selectedCurrency]);

  const handleCurrencySelect = (symbol: string, name: string) => {
    console.log(`Dashboard: Selected currency: ${name} (${symbol})`);
    setSelectedCurrency({ symbol, name });
    setCustomToken(null);
  };

  const handleCustomTokenSelect = (tokenData: { chain: "ETH" | "BASE"; symbol: string; address: string }) => {
    console.log('Dashboard: Custom token selected:', tokenData);
    setCustomToken(tokenData);
  };

  console.log('Dashboard: About to render JSX');

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

        {/* Custom Token Dialog as full-width separate card */}
        <div className="mb-8">
          <StaticCustomTokenDialog onTokenSelect={handleCustomTokenSelect} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-0">
          <div className="col-span-1 xl:col-span-3">
            <ErrorBoundary>
              <CryptoChart 
                symbol={selectedCurrency.symbol} 
                name={selectedCurrency.name}
                customToken={customToken}
              />
            </ErrorBoundary>
          </div>
        </div>

        {/* Resource Links */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="col-span-1 xl:col-span-3">
            <ResourceLinksRow />
          </div>
        </div>

        {/* Bitcoin Performance - Full width */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
          <div className="col-span-1 xl:col-span-3">
            <ErrorBoundary>
              <PortfolioCard />
            </ErrorBoundary>
          </div>
          <div className="col-span-1 xl:col-span-3">
            <div className="glass-card p-6 rounded-lg animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Uniswap Widget</h2>
              <div className="bg-secondary/20 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  UniswapWidget temporarily disabled due to IPFS gateway issues.
                  <br />
                  Will be restored once the service is stable.
                </p>
              </div>
            </div>
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
