
import React, { useState, useEffect } from "react";
import TradingViewWidget from 'react-tradingview-widget';
import CustomTokenDialog from "./CustomTokenDialog";

interface CryptoChartProps {
  symbol?: string;
  name?: string;
  customToken?: {
    chain: "ETH" | "BASE";
    symbol: string;
    address: string;
  } | null;
}

const CryptoChart = ({ symbol = "BINANCE:BTCUSDT", name = "Bitcoin", customToken }: CryptoChartProps) => {
  // local state for custom chart override (if user uses dialog)
  const [custom, setCustom] = useState<null | {
    chain: "ETH" | "BASE";
    symbol: string;
    address: string;
  }>(null);

  // Update local custom state when customToken prop changes
  useEffect(() => {
    if (customToken) {
      setCustom(customToken);
    }
  }, [customToken]);

  // Utility to generate TradingView symbol for custom tokens (for demonstration, this follows known DEX tickers)
  const computeSymbol = (chain: "ETH" | "BASE", address: string) => {
    // TradingView expects e.g. UNISWAP: or COINBASE: + address
    // We'll use UNISWAP: for ETH and COINBASE: for BASE as an example
    return chain === "ETH"
      ? `UNISWAP:${address.toUpperCase()}`
      : `COINBASE:${address.toUpperCase()}`;
  };

  const displayTitle = custom
    ? `${
        custom.symbol
          ? `${custom.symbol.toUpperCase()} (${custom.chain})`
          : `Custom Token (${custom.chain})`
      }`
    : name;

  const displaySymbol = custom
    ? computeSymbol(custom.chain, custom.address)
    : symbol;

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h2 className="text-xl font-semibold">Price Chart</h2>
        {/* Hide <CustomTokenDialog /> trigger button */}
      </div>
      <div className="w-full mb-3 px-1 flex flex-col items-start">
        {custom && (
          <div className="mb-2 bg-secondary/70 rounded p-2 text-xs text-foreground">
            <span>
              <span className="font-semibold">Custom selected:</span>{" "}
              {custom.symbol ? `${custom.symbol.toUpperCase()} - ` : ""}
              {custom.address} on {custom.chain === "ETH" ? "Ethereum" : "Base"}
              <button
                className="ml-2 p-1 px-2 rounded bg-destructive text-white text-xs"
                onClick={() => setCustom(null)}
              >
                Clear
              </button>
            </span>
          </div>
        )}
      </div>
      <div className="h-[400px] w-full">
        <TradingViewWidget
          symbol={displaySymbol}
          theme="Dark"
          locale="en"
          autosize
          hide_side_toolbar={false}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg="#141413"
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={false}
          container_id="tradingview_chart"
        />
      </div>
    </div>
  );
};

export default CryptoChart;
