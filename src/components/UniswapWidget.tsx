
import { SwapWidget } from '@uniswap/widgets';

const UniswapWidget = () => {
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
    borderRadius: 1.0,
  };

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
          defaultInputTokenAddress="NATIVE"
          defaultOutputTokenAddress="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
        />
      </div>
    </div>
  );
};

export default UniswapWidget;
