
import React, { useEffect, useState } from 'react'
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import '@uniswap/widgets/theme.css'

declare global {
  interface Window {
    ethereum?: any
  }
}

type ChainOption = 'ethereum' | 'bnb' | 'base'

const CHAIN_CONFIG: Record<
  ChainOption,
  {
    name: string
    rpc: string
    chainId: number
    inputToken?: string
    outputToken?: string
  }
> = {
  ethereum: {
    name: 'Ethereum',
    rpc: 'https://rpc.ankr.com/eth', // from Chainlist.org
    chainId: 1,
    inputToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    outputToken: 'ETH',
  },
  bnb: {
    name: 'BNB Chain',
    rpc: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    inputToken: '0x55d398326f99059fF775485246999027B3197955', // USDT
    outputToken: '0xBB4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
  },
  base: {
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    chainId: 8453,
    inputToken: '0x4200000000000000000000000000000000000006', // ETH
    outputToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC (assumed bridged)
  },
}

const getChainById = (chainId: number): ChainOption | null => {
  return (
    (Object.entries(CHAIN_CONFIG).find(
      ([, config]) => config.chainId === chainId
    )?.[0] as ChainOption) || null
  )
}

const UniswapWidget: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<ChainOption>('base')

  // Detect connected wallet chain
  useEffect(() => {
    const detectChain = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' })
          const chainId = parseInt(chainIdHex, 16)
          const detected = getChainById(chainId)
          if (detected) setSelectedChain(detected)
        } catch (err) {
          console.error('Could not get wallet chain:', err)
        }
      }
    }

    detectChain()

    // Optional: update on chain change
    if (window.ethereum) {
      const handleChainChanged = (chainIdHex: string) => {
        const chainId = parseInt(chainIdHex, 16)
        const detected = getChainById(chainId)
        if (detected) setSelectedChain(detected)
      }

      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const config = CHAIN_CONFIG[selectedChain]

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Trade Tokens</h2>
      </div>
      <div className="w-full">
        <div className="mb-4">
          <label htmlFor="chain-select" className="block text-sm font-medium mb-2">
            Select Chain:
          </label>
          <select
            id="chain-select"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value as ChainOption)}
            className="w-full p-2 border border-secondary rounded-md bg-background text-foreground"
          >
            {Object.entries(CHAIN_CONFIG).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <SwapWidget
          jsonRpcEndpoint={config.rpc}
          chainId={config.chainId}
          defaultInputTokenAddress={config.inputToken}
          defaultOutputTokenAddress={config.outputToken}
          theme="dark"
          width="100%"
        />
      </div>
    </div>
  )
}

export default UniswapWidget
