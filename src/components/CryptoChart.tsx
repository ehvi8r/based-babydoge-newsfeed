
import React, { useState } from "react";
import TradingViewWidget from "react-tradingview-widget";
import ChainTokenSelector from "./ChainTokenSelector";

// Utility to map chain, symbol, and/or address to TradingView symbol
function generateTradingViewSymbol(
  chain: "ethereum" | "base",
  symbol: string,
  address: string
): string {
  // If directly entering symbol and Base/Ethereum is selected
  const DEFAULT = chain === "ethereum"
    ? "BINANCE:BTCUSDT"
    : "AERODROME:ETHUSDC";
  if (!symbol && !address) return DEFAULT;

  // Popular mappings, add more symbols as needed
  const KNOWN: Record<string, string> = {
    ethereum: {
      BTC: "BINANCE:BTCUSDT",
      ETH: "BINANCE:ETHUSDT",
      USDC: "BINANCE:USDCUSDT",
      USDT: "BINANCE:USDTUSD",
      PEPE: "UNISWAP3ETH:PEPEUSDC",
      WETH: "UNISWAP3ETH:WETHUSDC",
    },
    base: {
      ETH: "AERODROME:ETHUSDC",
      USDC: "AERODROME:USDCETH",
      USDT: "AERODROME:USDTETH",
      DEGEN: "AERODROME:DEGENETH",
    },
  } as any;

  if (symbol && KNOWN[chain][symbol]) {
    return KNOWN[chain][symbol];
  }

  // If contract provided, try to guess format (most DEX pairs aren't directly available in TradingView with contract notation)
  // Placeholder: fallback to default, address-based support can be implemented with API support later
  if (address) {
    // Optionally add logic to map contract address to TradingView symbol if supported
    // For now, fallback
    return DEFAULT;
  }

  // If only symbol provided, try generic formats
  if (symbol) {
    // Fallback examples, can be improved
    return chain === "ethereum"
      ? `BINANCE:${symbol}USDT`
      : `AERODROME:${symbol}ETH`;
  }

  return DEFAULT;
}

interface CryptoChartProps {
  symbol?: string;
  name?: string;
}

const CryptoChart = ({
  symbol = "BINANCE:BTCUSDT",
  name = "Bitcoin",
}: CryptoChartProps) => {
  // Local selection state
  const [selectedChain, setSelectedChain] = useState<"ethereum" | "base">(
    symbol?.includes("BASE") || symbol?.includes("AERODROME") ? "base" : "ethereum"
  );
  const [inputSymbol, setInputSymbol] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");

  // On selector change
  const handleSelectorChange = (
    chain: "ethereum" | "base",
    symbol: string,
    address: string
  ) => {
    setSelectedChain(chain);
    setInputSymbol(symbol);
    setInputAddress(address);
  };

  // Compute TV symbol from input
  const chartSymbol = generateTradingViewSymbol(selectedChain, inputSymbol, inputAddress);

  // Chart title display
  let chartTitle = "Price Chart";
  if (inputSymbol) chartTitle = `${inputSymbol.toUpperCase()} Price Chart`;
  else if (inputAddress) chartTitle = `Token (by Contract) Price Chart`;

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <ChainTokenSelector
        initialChain={selectedChain}
        initialSymbol={inputSymbol}
        initialAddress={inputAddress}
        onChange={handleSelectorChange}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{chartTitle}</h2>
      </div>
      <div className="h-[400px] w-full">
        <TradingViewWidget
          symbol={chartSymbol}
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

