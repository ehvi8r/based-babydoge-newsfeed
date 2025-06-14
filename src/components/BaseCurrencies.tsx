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

interface GeckoTerminalToken {
  id: string;
  type: string;
  attributes: {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    coingecko_coin_id: string;
  };
}

interface GeckoTerminalPool {
  id: string;
  type: string;
  attributes: {
    name: string;
    address: string;
    base_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_usd: string;
    base_token_price_change_percentage: {
      h1: string;
      h24: string;
    };
    market_cap_usd: string;
    reserve_in_usd: string;
  };
  relationships: {
    base_token: {
      data: {
        id: string;
        type: string;
      };
    };
    quote_token: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

interface GeckoTerminalResponse {
  data: GeckoTerminalPool[];
  included: GeckoTerminalToken[];
}

const fetchBaseCurrencies = async (): Promise<BaseCurrency[]> => {
  try {
    // Fetch trending pools on Base network from GeckoTerminal
    const response = await fetchWithCache<GeckoTerminalResponse>(
      'https://api.geckoterminal.com/api/v2/networks/base/trending_pools?include=base_token',
      'base-trending-pools',
      5 // 5 minute cache for real-time data
    );

    const pools = response.data;
    const tokens = response.included;

    // Create a map of token data by ID
    const tokenMap = new Map();
    tokens.forEach(token => {
      tokenMap.set(token.id, token);
    });

    // Convert pool data to BaseCurrency format
    const baseCurrencies: BaseCurrency[] = pools
      .slice(0, 10) // Take top 10 trending pools
      .map((pool, index) => {
        const baseToken = tokenMap.get(pool.relationships.base_token.data.id);
        if (!baseToken) return null;

        return {
          id: baseToken.attributes.address,
          name: baseToken.attributes.name,
          symbol: baseToken.attributes.symbol,
          image: baseToken.attributes.image_url || '',
          current_price: parseFloat(pool.attributes.base_token_price_usd),
          market_cap: parseFloat(pool.attributes.market_cap_usd) || parseFloat(pool.attributes.reserve_in_usd),
          price_change_percentage_24h: parseFloat(pool.attributes.base_token_price_change_percentage.h24 || '0')
        };
      })
      .filter(currency => currency !== null) as BaseCurrency[];

    return baseCurrencies;
  } catch (error) {
    console.error('Failed to fetch from GeckoTerminal:', error);
    
    // Fallback to standard CoinGecko tokens if GeckoTerminal fails
    const fallbackTokenIds = [
      'coinbase-wrapped-staked-eth',
      'usd-coin',
      'aerodrome-finance',
      'based-pepe',
      'higher',
      'degen-base'
    ];
    
    const idsParam = fallbackTokenIds.join(',');
    
    return await fetchWithCache<BaseCurrency[]>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=6&page=1&sparkline=false`,
      'base-currencies-fallback',
      10
    );
  }
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
          <h2 className="text-xl font-semibold">Trending Base Pools</h2>
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
          <h2 className="text-xl font-semibold">Trending Base Pools</h2>
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
        <h2 className="text-xl font-semibold">Trending Base Pools</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="pb-4">Rank</th>
              <th className="pb-4">Name</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">24h Change</th>
              <th className="pb-4">Liquidity</th>
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
