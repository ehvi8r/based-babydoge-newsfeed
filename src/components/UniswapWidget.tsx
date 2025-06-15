import React, { useEffect, useState } from 'react'
import { SwapWidget } from '@uniswap/widgets'
import { ethers } from 'ethers'
import './assets/theme.css'
import './assets/fonts.css'

declare global {
  interface Window {
    ethereum?: any
  }
}

type ChainOption = 'ethereum' | 'base'

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
    rpc: 'https://rpc.ankr.com/eth',
    chainId: 1,
    inputToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    outputToken: 'ETH',
  },
  base: {
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    chainId: 8453,
    inputToken: '0x4200000000000000000000000000000000000006', // ETH
    outputToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  },
}

const getChainById = (chainId: number): ChainOption | null => {
  return (
    (Object.entries(CHAIN_CONFIG).find(
      ([, config]) => config.chainId === chainId
    )?.[0] as ChainOption) || null
  )
}

const darkTheme = {
  primary: '#8989DE',
  secondary: '#3A3935',
  interactive: '#8989DE',
  container: '#141413',
  module: '#3A3935',
  accent: '#8989DE',
  outline: '#605F5B',
  dialog: '#141413',
  fontFamily: 'Inter',
  borderRadius: {
    button: 12,
    container: 16,
    actionButton: 12,
    large: 16,
    medium: 12,
    small: 8,
    xsmall: 4,
  },
}

const UniswapWidget: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<ChainOption>('base')

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
  const provider =
    typeof window !== 'undefined' && window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : undefined

  if (!config) return <div>Unsupported chain selected.</div>

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
            className="w-full p-2 border border-gray-600 rounded-md bg-zinc-900 text-white"
          >
            {Object.entries(CHAIN_CONFIG).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
        <SwapWidget
          provider={provider}
          jsonRpcUrlMap={{
            [config.chainId]: [config.rpc],
          }}
          defaultInputTokenAddress={config.inputToken}
          defaultOutputTokenAddress={config.outputToken}
          theme={darkTheme}
          width="100%"
        />
      </div>
    </div>
  )
}

export default UniswapWidget
