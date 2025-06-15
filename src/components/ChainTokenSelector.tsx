
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ChainOption = "ethereum" | "base";

export interface ChainTokenSelectorProps {
  initialChain?: ChainOption;
  initialSymbol?: string;
  initialAddress?: string;
  onChange: (chain: ChainOption, symbol: string, address: string) => void;
}

const CHAIN_LABELS: Record<ChainOption, string> = {
  ethereum: "Ethereum",
  base: "Base",
};

const ChainTokenSelector: React.FC<ChainTokenSelectorProps> = ({
  initialChain = "ethereum",
  initialSymbol = "",
  initialAddress = "",
  onChange,
}) => {
  const [chain, setChain] = useState<ChainOption>(initialChain);
  const [symbol, setSymbol] = useState<string>(initialSymbol);
  const [address, setAddress] = useState<string>(initialAddress);
  const [touched, setTouched] = useState<{ symbol: boolean; address: boolean }>({
    symbol: false,
    address: false,
  });

  // Basic ETH contract validation
  function isValidEthAddress(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  function handleApply() {
    onChange(chain, symbol.trim().toUpperCase(), address.trim());
  }

  // Show error only if touched and not empty
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
          onChange={e => setChain(e.target.value as ChainOption)}
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
          onChange={e => setSymbol(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, symbol: true }))}
          className="min-w-[120px]"
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
      <Button
        type="button"
        className="sm:ml-2 mt-2 sm:mt-0"
        disabled={!!address && !isValidEthAddress(address)}
        onClick={handleApply}
      >
        Show Chart
      </Button>
    </div>
  );
};

export default ChainTokenSelector;

