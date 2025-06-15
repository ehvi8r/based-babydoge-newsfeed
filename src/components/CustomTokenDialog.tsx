
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CustomTokenSelectorProps {
  onSelect: (opts: { chain: "ETH" | "BASE"; symbol: string; address: string }) => void;
}

const chainDisplayMap: Record<string, string> = {
  ETH: "Ethereum",
  BASE: "Base"
};

const CustomTokenDialog: React.FC<CustomTokenSelectorProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [chain, setChain] = useState<"ETH" | "BASE">("ETH");
  const [symbol, setSymbol] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleShowChart = (e: React.FormEvent) => {
    e.preventDefault();
    // Contract address is required
    if (!address || address.trim().length < 8) { // Simple length check
      setError("Please enter a valid contract address.");
      return;
    }
    setError(null);
    onSelect({ chain, symbol, address });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2 w-full sm:w-auto">Custom Token Chart</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleShowChart}>
          <DialogHeader>
            <DialogTitle>View Custom Token Chart</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Chain</label>
              <Select value={chain} onValueChange={(v) => setChain(v as "ETH" | "BASE")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="BASE">Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Token Symbol <span className="text-muted-foreground">(optional)</span></label>
              <Input 
                placeholder="e.g. PEPE"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                maxLength={16}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Contract Address <span className="text-destructive">*</span></label>
              <Input 
                placeholder="Enter contract address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                maxLength={64}
                minLength={8}
              />
            </div>
            {error && <span className="block text-destructive text-sm">{error}</span>}
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full">Show Chart</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomTokenDialog;
