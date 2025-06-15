
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const StaticCustomTokenDialog: React.FC = () => {
  // UI-only form; no handlers, just design mimic
  return (
    <div className="glass-card w-full p-6 rounded-lg border border-muted bg-background shadow animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-center">Select Custom Token</h3>
      <form className="space-y-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4 gap-2">
          {/* Chain (15ch) */}
          <div className="flex-1 min-w-0" style={{ maxWidth: "15ch" }}>
            <label className="block mb-1 text-sm font-medium" htmlFor="chain-static">
              Chain
            </label>
            <Select defaultValue="BASE">
              <SelectTrigger id="chain-static" className="w-full">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">Ethereum</SelectItem>
                <SelectItem value="BASE">Base</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Token Symbol (25ch) */}
          <div className="flex-1 min-w-0" style={{ maxWidth: "25ch" }}>
            <label className="block mb-1 text-sm font-medium" htmlFor="symbol-static">
              Token Symbol <span className="text-muted-foreground">(optional)</span>
            </label>
            <Input 
              id="symbol-static"
              placeholder="e.g. PEPE"
              disabled
              style={{ width: "25ch" }}
            />
          </div>
          {/* Contract Address * (45ch) */}
          <div className="flex-1 min-w-0" style={{ maxWidth: "45ch" }}>
            <label className="block mb-1 text-sm font-medium" htmlFor="address-static">
              Contract Address <span className="text-destructive">*</span>
            </label>
            <Input 
              id="address-static"
              placeholder="Enter contract address"
              disabled
              style={{ width: "45ch" }}
            />
          </div>
          {/* Show Chart Button (15ch) */}
          <div className="flex-1 min-w-0 flex md:block" style={{ maxWidth: "15ch" }}>
            <Button type="button" className="w-full" style={{ width: "15ch", minWidth: "100px" }} disabled>
              Show Chart
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaticCustomTokenDialog;
