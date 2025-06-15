
import { SwapWidget } from '@uniswap/widgets';
import { useState, useEffect } from 'react';

const UniswapWidget = () => {
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [isReady, setIsReady] = useState(false);

  console.log('UniswapWidget rendering...');

  // Ensure BigInt and other globals are available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure BigInt is available
      if (typeof BigInt !== 'undefined') {
        (window as any).BigInt = BigInt;
        (globalThis as any).BigInt = BigInt;
      }
      
      // Add additional global definitions that Uniswap might need
      if (!(window as any).global) {
        (window as any).global = window;
      }
      
      // Give it a moment to settle
      setTimeout(() => setIsReady(true), 100);
    } else {
      setIsReady(true);
    }
  }, []);

  const theme = {
    primary: '#8989DE',
    secondary: '#3A3935',
    interactive: '#8989DE',
    container: '#141413',
    module: '#3A3935',
    accent: '#8989DE',
    outline: '#605F5B',
    dialog: '#3A3935',
    fontFamily: 'inherit',
    borderRadius: {
      button: 1.0,
      container: 1.0,
      large: 1.0,
      medium: 1.0,
      small: 1.0,
      xsmall: 1.0,
    },
  };

  // Use Ethereum mainnet instead of Base for better compatibility
  const ETH_USDC_ADDRESS = "0xA0b86a33E6417bFf9a634482bC24bbA11D4aE41C"; // USDC on Ethereum
  const ETH_CHAIN_ID = 1; // Ethereum mainnet

  console.log('Widget config:', {
    chainId: ETH_CHAIN_ID,
    outputToken: ETH_USDC_ADDRESS,
    widgetKey,
    isReady
  });

  if (!isReady) {
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full p-4 text-center">
          <p>Loading widget...</p>
        </div>
      </div>
    );
  }

  if (widgetError) {
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full p-4 bg-red-100 text-red-800 rounded">
          <p>Widget Error: {widgetError}</p>
          <button 
            onClick={() => {
              setWidgetError(null);
              setWidgetKey(prev => prev + 1);
              setIsReady(false);
              setTimeout(() => setIsReady(true), 100);
            }} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full">
          <SwapWidget
            key={`widget-${widgetKey}`}
            theme={theme}
            tokenList="https://gateway.ipfs.io/ipns/tokens.uniswap.org"
            width="100%"
            defaultChainId={ETH_CHAIN_ID}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={ETH_USDC_ADDRESS}
            onError={(error) => {
              console.error('Uniswap Widget Error:', error);
              setWidgetError(error.message || 'Unknown widget error');
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('UniswapWidget render error:', error);
    setWidgetError(error instanceof Error ? error.message : 'Render error');
    return null;
  }
};

export default UniswapWidget;
