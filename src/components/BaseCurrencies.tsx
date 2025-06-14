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

interface ContractTokenData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}

const fetchContractToken = async (contractAddress: string): Promise<BaseCurrency | null> => {
  try {
    const data = await fetchWithCache<ContractTokenData>(
      `https://api.coingecko.com/api/v3/coins/base/contract/${contractAddress}`,
      `contract-${contractAddress}`,
      10
    );

    return {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      image: data.image.small,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h
    };
  } catch (error) {
    console.error(`Failed to fetch contract token ${contractAddress}:`, error);
    return null;
  }
};

const fetchBaseCurrencies = async (): Promise<BaseCurrency[]> => {
  // Fetch standard tokens from CoinGecko
  const baseTokenIds = [
    'coinbase-wrapped-staked-eth',
    'usd-coin',
    'aerodrome-finance',
    'based-pepe',
    'higher',
    'degen-base',
    'seamless-protocol',
    'moonwell',
    'prime',
    'toshi-base'
  ];
  
  const idsParam = baseTokenIds.join(',');
  
  const standardTokens = await fetchWithCache<BaseCurrency[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
    'base-currencies',
    10
  );

  // Fetch custom contract tokens
  const customContracts = [
    '0x459F65A7aaB8c08220ac636Ef633508E697e15d8' // Toshiba
  ];

  const contractTokenPromises = customContracts.map(address => fetchContractToken(address));
  const contractTokens = (await Promise.all(contractTokenPromises)).filter(token => token !== null) as BaseCurrency[];

  // Combine and return all tokens
  return [...standardTokens, ...contractTokens];
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
