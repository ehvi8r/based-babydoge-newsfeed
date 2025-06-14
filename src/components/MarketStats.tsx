
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchWithCache } from "@/utils/apiUtils";

const fetchGlobalData = async () => {
  return fetchWithCache(
    'https://api.coingecko.com/api/v3/global',
    'global-data',
    10 // 10 minute cache
  );
};

const MarketStats = () => {
  const { data: globalData, isLoading, isError } = useQuery({
    queryKey: ['globalData'],
    queryFn: fetchGlobalData,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: false, // Let our utility handle retries
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 rounded-lg animate-pulse">
            <div className="h-4 bg-secondary rounded mb-2"></div>
            <div className="h-8 bg-secondary rounded mb-2"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <div className="flex items-center gap-3 text-warning">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Market Data Unavailable</h3>
            <p className="text-sm text-muted-foreground">
              Unable to fetch market statistics. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const marketCap = globalData?.data?.total_market_cap?.usd;
  const volume24h = globalData?.data?.total_volume?.usd;
  const btcDominance = globalData?.data?.market_cap_percentage?.btc;
  const marketCapChange = globalData?.data?.market_cap_change_percentage_24h_usd;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Total Market Cap</h3>
          <TrendingUpIcon className="w-4 h-4 text-success" />
        </div>
        <p className="text-2xl font-semibold mt-2">
          ${marketCap ? (marketCap / 1e12).toFixed(1) : '--'}T
        </p>
        <span className={`text-sm flex items-center gap-1 ${
          marketCapChange >= 0 ? 'text-success' : 'text-warning'
        }`}>
          {marketCapChange >= 0 ? (
            <ArrowUpIcon className="w-3 h-3" />
          ) : (
            <ArrowDownIcon className="w-3 h-3" />
          )}
          {marketCapChange ? Math.abs(marketCapChange).toFixed(1) : '--'}%
        </span>
      </div>
      
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">24h Volume</h3>
          <TrendingUpIcon className="w-4 h-4 text-success" />
        </div>
        <p className="text-2xl font-semibold mt-2">
          ${volume24h ? (volume24h / 1e9).toFixed(1) : '--'}B
        </p>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <ArrowUpIcon className="w-3 h-3" />
          --
        </span>
      </div>
      
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">BTC Dominance</h3>
          <TrendingUpIcon className="w-4 h-4 text-warning" />
        </div>
        <p className="text-2xl font-semibold mt-2">
          {btcDominance ? btcDominance.toFixed(1) : '--'}%
        </p>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <ArrowDownIcon className="w-3 h-3" />
          --
        </span>
      </div>
    </div>
  );
};

export default MarketStats;
