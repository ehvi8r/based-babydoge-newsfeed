
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { fetchWithCache, BitcoinPriceData } from "@/utils/apiUtils";

const fetchBitcoinPrices = async () => {
  const data = await fetchWithCache<BitcoinPriceData>(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily",
    'bitcoin-prices',
    10 // 10 minute cache
  );
  
  // Format data for the chart - take last 7 days
  return data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: Math.round(price)
  }));
};

const PortfolioCard = () => {
  const { data: priceData, isLoading, isError } = useQuery({
    queryKey: ['bitcoinPrices'],
    queryFn: fetchBitcoinPrices,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: false, // Let our utility handle retries
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <h2 className="text-xl font-semibold mb-6">Bitcoin Performance</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <span className="text-muted-foreground">Loading chart data...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <h2 className="text-xl font-semibold mb-6">Bitcoin Performance</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <div className="flex items-center gap-3 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <div className="text-center">
              <p className="font-medium">Chart Unavailable</p>
              <p className="text-sm text-muted-foreground">Unable to load Bitcoin price data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Bitcoin Performance</h2>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <XAxis 
              dataKey="date" 
              stroke="#E6E4DD"
              fontSize={12}
            />
            <YAxis 
              stroke="#E6E4DD"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#3A3935',
                border: '1px solid #605F5B',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#E6E4DD' }}
              itemStyle={{ color: '#8989DE' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#8989DE" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioCard;
