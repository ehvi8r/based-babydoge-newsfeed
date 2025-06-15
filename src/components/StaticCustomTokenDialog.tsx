
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const StaticCustomTokenDialog: React.FC = () => {
  // UI-only form; no handlers, just design mimic
  return (
    <div className="w-full max-w-lg mx-auto mb-6 p-4 border border-muted rounded-lg bg-background shadow glass-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-center">Select Custom Token</h3>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="chain-static">Chain</label>
          <Select defaultValue="ETH">
            <SelectTrigger id="chain-static">
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">Ethereum</SelectItem>
              <SelectItem value="BASE">Base</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="symbol-static">
            Token Symbol <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input 
            id="symbol-static"
            placeholder="e.g. PEPE"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="address-static">
            Contract Address <span className="text-destructive">*</span>
          </label>
          <Input 
            id="address-static"
            placeholder="Enter contract address"
            disabled
          />
        </div>
        <Button type="button" className="w-full" disabled>
          Show Chart
        </Button>
      </form>
    </div>
  );
};

export default StaticCustomTokenDialog;
