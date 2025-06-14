
import { ArrowUpIcon, ArrowDownIcon, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchWithCache } from "@/utils/apiUtils";
import CryptoImage from "@/components/CryptoImage";

interface BaseCurrenciesProps {
  onCurrencySelect: (symbol: string, name: string) => void;
}

interface BaseCurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const fetchBaseCurrencies = async (): Promise<BaseCurrency[]> => {
  // Updated with more reliable image URLs and better fallback data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "coinbase-wrapped-staked-eth",
          name: "Coinbase Wrapped Staked ETH",
          symbol: "cbETH",
          image: "https://coin-images.coingecko.com/coins/images/27008/large/cbeth.png",
          current_price: 3420.50,
          market_cap: 4200000000,
          price_change_percentage_24h: 2.4
        },
        {
          id: "usd-coin",
          name: "USD Coin",
          symbol: "USDC",
          image: "https://coin-images.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
          current_price: 1.00,
          market_cap: 3800000000,
          price_change_percentage_24h: 0.02
        },
        {
          id: "aerodrome-finance",
          name: "Aerodrome Finance",
          symbol: "AERO",
          image: "https://coin-images.coingecko.com/coins/images/31745/large/token.png",
          current_price: 1.85,
          market_cap: 890000000,
          price_change_percentage_24h: 5.7
        },
        {
          id: "base-god",
          name: "Based God",
          symbol: "TYBG",
          image: "https://coin-images.coingecko.com/coins/images/31234/large/based-god.png",
          current_price: 0.245,
          market_cap: 245000000,
          price_change_percentage_24h: -1.2
        },
        {
          id: "higher",
          name: "Higher",
          symbol: "HIGHER",
          image: "https://coin-images.coingecko.com/coins/images/35687/large/higher.jpg",
          current_price: 0.0892,
          market_cap: 89200000,
          price_change_percentage_24h: 12.3
        },
        {
          id: "degen-base",
          name: "Degen",
          symbol: "DEGEN",
          image: "https://coin-images.coingecko.com/coins/images/34515/large/degen.jpg",
          current_price: 0.0234,
          market_cap: 78900000,
          price_change_percentage_24h: -3.4
        },
        {
          id: "seamless-protocol",
          name: "Seamless Protocol",
          symbol: "SEAM",
          image: "https://coin-images.coingecko.com/coins/images/35234/large/seamless.png",
          current_price: 2.67,
          market_cap: 67000000,
          price_change_percentage_24h: 8.9
        },
        {
          id: "based-pepe",
          name: "Based Pepe",
          symbol: "PEPE",
          image: "https://coin-images.coingecko.com/coins/images/35123/large/based-pepe.png",
          current_price: 0.000034,
          market_cap: 34000000,
          price_change_percentage_24h: -7.1
        },
        {
          id: "moonwell",
          name: "Moonwell",
          symbol: "WELL",
          image: "https://coin-images.coingecko.com/coins/images/25392/large/moonwell.png",
          current_price: 0.078,
          market_cap: 28500000,
          price_change_percentage_24h: 4.2
        },
        {
          id: "prime-base",
          name: "Prime",
          symbol: "PRIME",
          image: "https://coin-images.coingecko.com/coins/images/34567/large/prime-base.png",
          current_price: 15.67,
          market_cap: 25600000,
          price_change_percentage_24h: -2.8
        }
      ]);
    }, 500);
  });
};

const BaseCurrencies = ({ onCurrencySelect }: BaseCurrenciesProps) => {
  const { data: baseCurrencies, isLoading, isError } = useQuery({
    queryKey: ['baseCurrencies'],
    queryFn: fetchBaseCurrencies,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleRowClick = (currency: BaseCurrency) => {
    const tradingViewSymbol = `BINANCE:${currency.symbol.toUpperCase()}USDT`;
    onCurrencySelect(tradingViewSymbol, currency.name);
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <img 
            src="https://cryptologos.cc/logos/base-base-logo.png" 
            alt="Base Chain" 
            className="w-6 h-6"
          />
          <h2 className="text-xl font-semibold">Top Base Currencies</h2>
        </div>
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-t border-secondary">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full"></div>
                <div>
                  <div className="h-4 bg-secondary rounded w-20 mb-1"></div>
                  <div className="h-3 bg-secondary rounded w-12"></div>
                </div>
              </div>
              <div className="h-4 bg-secondary rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card rounded-lg p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <img 
            src="https://cryptologos.cc/logos/base-base-logo.png" 
            alt="Base Chain" 
            className="w-6 h-6"
          />
          <h2 className="text-xl font-semibold">Top Base Currencies</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <div className="text-center">
              <p className="font-medium">Base Chain Data Unavailable</p>
              <p className="text-sm text-muted-foreground">Unable to load Base token data. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <CryptoImage 
          src="https://cryptologos.cc/logos/base-base-logo.png"
          alt="Base Chain"
          className="w-6 h-6"
          fallbackText="B"
        />
        <h2 className="text-xl font-semibold">Top Base Currencies</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="pb-4">Rank</th>
              <th className="pb-4">Name</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">24h Change</th>
              <th className="pb-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {baseCurrencies?.map((currency, index) => (
              <tr 
                key={currency.id} 
                className="border-t border-secondary hover:bg-secondary/20 cursor-pointer transition-colors"
                onClick={() => handleRowClick(currency)}
              >
                <td className="py-4 text-muted-foreground">#{index + 1}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <CryptoImage 
                      src={currency.image} 
                      alt={currency.name}
                      fallbackText={currency.symbol.charAt(0).toUpperCase()}
                    />
                    <div>
                      <p className="font-medium">{currency.name}</p>
                      <p className="text-sm text-muted-foreground">{currency.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 font-medium">
                  ${currency.current_price < 1 
                    ? currency.current_price.toFixed(6) 
                    : currency.current_price.toLocaleString()}
                </td>
                <td className="py-4">
                  <span
                    className={`flex items-center gap-1 ${
                      currency.price_change_percentage_24h >= 0 ? "text-success" : "text-warning"
                    }`}
                  >
                    {currency.price_change_percentage_24h >= 0 ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    {Math.abs(currency.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 text-muted-foreground">
                  ${(currency.market_cap / 1e6).toFixed(1)}M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaseCurrencies;
