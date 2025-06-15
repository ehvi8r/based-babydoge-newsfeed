
import { SwapWidget } from '@uniswap/widgets';
import { useState, useEffect } from 'react';

const UniswapWidget = () => {
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [isReady, setIsReady] = useState(false);

  console.log('UniswapWidget rendering...');

  // Ensure BigInt and other globals are available with more comprehensive polyfill
  useEffect(() => {
    // More aggressive BigInt polyfill
    try {
      if (typeof BigInt === 'undefined') {
        console.error('BigInt is not available in this environment');
        setWidgetError('BigInt not supported in this browser');
        return;
      }

      // Ensure BigInt is available globally in multiple contexts
      if (typeof window !== 'undefined') {
        (window as any).BigInt = BigInt;
        if (!(window as any).global) {
          (window as any).global = window;
        }
      }
      
      if (typeof globalThis !== 'undefined') {
        (globalThis as any).BigInt = BigInt;
      }
      
      // Also set it on global if it exists
      if (typeof global !== 'undefined') {
        (global as any).BigInt = BigInt;
      }

      console.log('BigInt setup complete:', typeof BigInt);
      
      // Give it a moment to settle before rendering the widget
      setTimeout(() => setIsReady(true), 200);
    } catch (error) {
      console.error('Error setting up BigInt:', error);
      setWidgetError('Failed to initialize BigInt support');
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

  // Correct USDC address for Ethereum mainnet
  const ETH_USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Correct USDC on Ethereum
  const ETH_CHAIN_ID = 1; // Ethereum mainnet

  console.log('Widget config:', {
    chainId: ETH_CHAIN_ID,
    outputToken: ETH_USDC_ADDRESS,
    widgetKey,
    isReady,
    bigIntAvailable: typeof BigInt !== 'undefined'
  });

  if (!isReady) {
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full p-4 text-center">
          <p>Initializing trading widget...</p>
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
              setTimeout(() => setIsReady(true), 200);
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
