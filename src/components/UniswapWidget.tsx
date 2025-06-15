
import { SwapWidget } from '@uniswap/widgets';
import { useState, useEffect } from 'react';

const UniswapWidget = () => {
  const [widgetError, setWidgetError] = useState<string | null>(null);

  console.log('UniswapWidget rendering...');

  // Add comprehensive BigInt polyfill and debugging
  useEffect(() => {
    console.log('Checking BigInt support...');
    console.log('typeof BigInt:', typeof BigInt);
    console.log('BigInt available:', typeof BigInt !== 'undefined');
    
    // Ensure BigInt is available globally
    if (typeof window !== 'undefined') {
      if (typeof window.BigInt === 'undefined' && typeof BigInt !== 'undefined') {
        (window as any).BigInt = BigInt;
        console.log('Added BigInt to window');
      }
      
      // Also ensure it's available on globalThis
      if (typeof (globalThis as any).BigInt === 'undefined' && typeof BigInt !== 'undefined') {
        (globalThis as any).BigInt = BigInt;
        console.log('Added BigInt to globalThis');
      }
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

  useEffect(() => {
    console.log('UniswapWidget mounted');
    return () => {
      console.log('UniswapWidget unmounting');
    };
  }, []);

  if (widgetError) {
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full p-4 bg-red-100 text-red-800 rounded">
          <p>Widget Error: {widgetError}</p>
          <button 
            onClick={() => setWidgetError(null)} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  try {
    console.log('Attempting to render SwapWidget...');
    return (
      <div className="glass-card p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trade Tokens</h2>
        </div>
        <div className="w-full">
          <SwapWidget
            theme={theme}
            tokenList="https://gateway.ipfs.io/ipns/tokens.uniswap.org"
            width="100%"
            defaultChainId={1}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress="0xA0b86a33E6441c8b2f5b9F4D1eF0A5f67F96CC3E"
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
