import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Helper function to fetch tokens from CoinGecko by symbol and chain
const COINGECKO_CHAIN_IDS: Record<string, string> = {
  ethereum: "ethereum",
  base: "base",
};
async function fetchTokensBySymbol(chain: string, symbol: string) {
  // CoinGecko API search for tokens by symbol (returns ALL matches, not filtered by chain)
  // (CoinGecko's API is limited for direct chain/symbol lookup, but for demo we'll filter manually)
  const resp = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(symbol)}`);
  const data = await resp.json();
  if (!data || !Array.isArray(data.coins)) return [];
  return data.coins.filter(
    (c: any) =>
      c.symbol.toLowerCase() === symbol.toLowerCase() &&
      (c.platforms && Object.keys(c.platforms).includes(COINGECKO_CHAIN_IDS[chain]))
  );
}

type ChainOption = "ethereum" | "base";

export interface ChainTokenSelectorProps {
  initialChain?: ChainOption;
  initialSymbol?: string;
  initialAddress?: string;
  onApply: (chain: ChainOption, symbol: string, address: string) => void;
  onClear?: () => void;
}

const CHAIN_LABELS: Record<ChainOption, string> = {
  ethereum: "Ethereum",
  base: "Base",
};

const ChainTokenSelector: React.FC<ChainTokenSelectorProps> = ({
  initialChain = "base", // changed default to base
  initialSymbol = "",
  initialAddress = "",
  onApply,
  onClear,
}) => {
  const [chain, setChain] = useState<ChainOption>(initialChain);
  const [symbol, setSymbol] = useState<string>(initialSymbol);
  const [address, setAddress] = useState<string>(initialAddress);
  const [touched, setTouched] = useState<{ symbol: boolean; address: boolean }>({ symbol: false, address: false });
  const [tokenOptions, setTokenOptions] = useState<any[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(false);

  // Basic ETH contract validation
  function isValidEthAddress(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  // For user selection from search
  function handleSelectToken(token: any) {
    const contractAddr = token.platforms[COINGECKO_CHAIN_IDS[chain]];
    setAddress(contractAddr);
    setSymbol(token.symbol.toUpperCase());
    setTokenOptions([]); // Hide the list
    onApply(chain, token.symbol.toUpperCase(), contractAddr);
  }

  async function handleApply() {
    // If user entered contract address (always takes precedence)
    if (address && isValidEthAddress(address)) {
      onApply(chain, symbol.trim().toUpperCase(), address.trim());
      return;
    }

    // If symbol entered but no contract address: look up matches
    if (symbol && !address) {
      setLoadingTokens(true);
      setTokenOptions([]);
      try {
        const tokens = await fetchTokensBySymbol(chain, symbol.trim());
        if (tokens.length === 1) {
          // One match, auto-select it
          const contractAddr = tokens[0].platforms[COINGECKO_CHAIN_IDS[chain]];
          setAddress(contractAddr);
          setTokenOptions([]);
          onApply(chain, symbol.trim().toUpperCase(), contractAddr);
        } else if (tokens.length > 1) {
          // Multiple: display the list and wait
          setTokenOptions(tokens);
        } else {
          setTokenOptions([]);
          onApply(chain, symbol.trim().toUpperCase(), "");
        }
      } finally {
        setLoadingTokens(false);
      }
      return;
    }
    // Neither symbol nor address: behave as before
    onApply(chain, symbol.trim().toUpperCase(), address.trim());
  }

  function handleClear() {
    setSymbol("");
    setAddress("");
    setTouched({ symbol: false, address: false });
    setTokenOptions([]);
    if (onClear) onClear();
  }

  const addressError =
    touched.address && address && !isValidEthAddress(address)
      ? "Invalid contract address"
      : "";

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1" htmlFor="chain-select">
          Chain
        </label>
        <select
          id="chain-select"
          value={chain}
          className="p-2 rounded-md border bg-zinc-900 text-white min-w-[120px]"
          onChange={e => { setChain(e.target.value as ChainOption); setTokenOptions([]); }}
        >
          {Object.entries(CHAIN_LABELS).map(([key, label]) => (
            <option value={key} key={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1" htmlFor="symbol-input">
          Symbol <span className="text-muted-foreground">(e.g. ETH, PEPE)</span>
        </label>
        <Input
          id="symbol-input"
          value={symbol}
          placeholder="Enter symbol (optional)"
          maxLength={12}
          onChange={e => { setSymbol(e.target.value); setTokenOptions([]); }}
          onBlur={() => setTouched(t => ({ ...t, symbol: true }))}
          className="min-w-[120px]"
          autoComplete="off"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1" htmlFor="address-input">
          Contract Address <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          id="address-input"
          value={address}
          placeholder="0x..."
          maxLength={42}
          onChange={e => setAddress(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, address: true }))}
          className="min-w-[230px]"
          autoComplete="off"
        />
        {addressError && (
          <div className="text-xs text-warning mt-1">{addressError}</div>
        )}
      </div>
      <div className="flex gap-2 sm:ml-2 mt-2 sm:mt-0">
        <Button
          type="button"
          variant="default"
          disabled={!!address && !isValidEthAddress(address) || loadingTokens}
          onClick={handleApply}
        >
          {loadingTokens ? "Loading..." : "Show Chart"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
      {/* Token selection list (if ambiguous search) */}
      {tokenOptions.length > 0 && (
        <div className="col-span-full bg-zinc-800 rounded-lg mt-2 p-3 max-h-64 overflow-auto w-full shadow-lg z-20 border border-zinc-700">
          <div className="mb-1 text-xs text-zinc-200 font-semibold">Select the correct token:</div>
          <ul>
            {tokenOptions.map(token => (
              <li
                key={token.id}
                className="hover:bg-primary/20 rounded cursor-pointer px-2 py-1 flex items-center gap-2"
                onClick={() => handleSelectToken(token)}
              >
                {/* Token icon */}
                {token.thumb && (
                  <img src={token.thumb} alt={token.symbol} className="w-5 h-5 rounded-full border border-white/40" />
                )}
                <div>
                  <div className="font-semibold text-sm">{token.name} ({token.symbol.toUpperCase()})</div>
                  <div className="text-xs text-muted-foreground break-all">{token.platforms[COINGECKO_CHAIN_IDS[chain]]}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChainTokenSelector;
