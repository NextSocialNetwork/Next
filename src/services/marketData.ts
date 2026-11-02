/**
 * Real-Time Market Analytics & Trading Engine for NEXUS ZERO
 * Manages live feeds for Bitcoin, crypto pairs, and major equities (NVDA, TSLA, MSTR, AAPL).
 */

import { Candle, MarketTicker, MultiChainAsset, VolatilityAlert } from '../types';

export const INITIAL_TICKERS: MarketTicker[] = [
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin Sovereign',
    category: 'Crypto',
    price: 89420.50,
    change24h: 4.82,
    high24h: 91100.00,
    low24h: 85200.00,
    volume24h: '$38.4B',
    marketCap: '$1.76T',
    volatilityIndex: 82.4,
    priceHistory: [85400, 86100, 85900, 87200, 88100, 87800, 89420],
    candles: generateInitialCandles(89420, 32, 450)
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum Virtual',
    category: 'Crypto',
    price: 3145.20,
    change24h: 2.15,
    high24h: 3210.00,
    low24h: 3075.00,
    volume24h: '$16.2B',
    marketCap: '$378B',
    volatilityIndex: 68.1,
    priceHistory: [3080, 3105, 3090, 3120, 3140, 3130, 3145],
    candles: generateInitialCandles(3145, 32, 28)
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana High-TPS',
    category: 'Crypto',
    price: 184.75,
    change24h: 7.64,
    high24h: 189.20,
    low24h: 171.50,
    volume24h: '$7.8B',
    marketCap: '$86.2B',
    volatilityIndex: 91.0,
    priceHistory: [172, 175, 174, 179, 182, 180, 184.75],
    candles: generateInitialCandles(184.75, 32, 2.5)
  },
  {
    symbol: 'MSTR',
    name: 'MicroStrategy Bitcoin Proxy',
    category: 'Stock',
    price: 286.40,
    change24h: 8.92,
    high24h: 294.50,
    low24h: 262.10,
    volume24h: '$4.1B',
    marketCap: '$58.4B',
    volatilityIndex: 94.2,
    priceHistory: [264, 270, 268, 275, 282, 279, 286.4],
    candles: generateInitialCandles(286.4, 32, 3.8)
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA AI Compute',
    category: 'Stock',
    price: 139.80,
    change24h: 3.42,
    high24h: 142.10,
    low24h: 135.20,
    volume24h: '$12.5B',
    marketCap: '$3.42T',
    volatilityIndex: 64.8,
    priceHistory: [136, 137, 136.5, 138, 139, 138.8, 139.8],
    candles: generateInitialCandles(139.8, 32, 1.8)
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Autonomous & Energy',
    category: 'Stock',
    price: 249.20,
    change24h: -1.35,
    high24h: 256.00,
    low24h: 246.50,
    volume24h: '$6.2B',
    marketCap: '$790B',
    volatilityIndex: 72.3,
    priceHistory: [253, 252, 254, 251, 250, 250.5, 249.2],
    candles: generateInitialCandles(249.2, 32, 3.2)
  }
];

export const INITIAL_MULTI_CHAIN_ASSETS: MultiChainAsset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin Native (SegWit)',
    chain: 'Bitcoin',
    chainIconColor: '#F7931A',
    balance: 0.845,
    priceUsd: 89420.50,
    change24h: 4.82,
    address: 'bc1q9x3d84jmf7v63j4k2lm4z0qps849v940d'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum Mainnet',
    chain: 'Ethereum',
    chainIconColor: '#627EEA',
    balance: 4.25,
    priceUsd: 3145.20,
    change24h: 2.15,
    address: '0x8849b28f73b06385a498b36c4b9281a74d2'
  },
  {
    symbol: 'SOL',
    name: 'Solana SPL',
    chain: 'Solana',
    chainIconColor: '#14F195',
    balance: 45.0,
    priceUsd: 184.75,
    change24h: 7.64,
    address: '7N2Ztq4qJtH9N2Fz...d84h'
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum One Rollup',
    chain: 'Arbitrum',
    chainIconColor: '#28A0F0',
    balance: 2400.0,
    priceUsd: 0.94,
    change24h: 3.12,
    address: '0x8849b28f73b06385a498b36c4b9281a74d2'
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos Hub Interchain',
    chain: 'Cosmos',
    chainIconColor: '#2E3148',
    balance: 310.0,
    priceUsd: 7.20,
    change24h: -0.84,
    address: 'cosmos17f9382k...v94f'
  },
  {
    symbol: 'POL',
    name: 'Polygon 2.0 Proof of Stake',
    chain: 'Polygon',
    chainIconColor: '#8247E5',
    balance: 3500.0,
    priceUsd: 0.52,
    change24h: 1.45,
    address: '0x8849b28f73b06385a498b36c4b9281a74d2'
  },
  {
    symbol: 'MSTR',
    name: 'MicroStrategy Equities Token',
    chain: 'Arbitrum',
    chainIconColor: '#F59E0B',
    balance: 15.0,
    priceUsd: 286.40,
    change24h: 8.92,
    address: '0x8849b28f73b06385a498b36c4b9281a74d2',
    isStock: true
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Equities Token',
    chain: 'Arbitrum',
    chainIconColor: '#76B900',
    balance: 25.0,
    priceUsd: 139.80,
    change24h: 3.42,
    address: '0x8849b28f73b06385a498b36c4b9281a74d2',
    isStock: true
  }
];

function generateInitialCandles(basePrice: number, count: number, volatility: number): Candle[] {
  const candles: Candle[] = [];
  let current = basePrice - count * (volatility * 0.4);

  const now = Date.now();
  for (let i = count; i >= 0; i--) {
    const timeStr = new Date(now - i * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const delta = (Math.random() - 0.48) * volatility;
    const open = current;
    const close = Math.max(open + delta, 1);
    const high = Math.max(open, close) + Math.random() * (volatility * 0.4);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.4);
    const volume = Math.floor(Math.random() * 2500 + 400);

    candles.push({ time: timeStr, open, high, low, close, volume });
    current = close;
  }
  return candles;
}

export function generateOrderBook(midPrice: number) {
  const bids = [];
  const asks = [];
  let cumBidVol = 0;
  let cumAskVol = 0;

  for (let i = 1; i <= 6; i++) {
    const bidPrice = midPrice * (1 - (i * 0.0012));
    const bidVol = +(Math.random() * 1.8 + 0.3).toFixed(3);
    cumBidVol += bidVol;
    bids.push({ price: +bidPrice.toFixed(2), amount: bidVol, total: +cumBidVol.toFixed(3) });

    const askPrice = midPrice * (1 + (i * 0.0012));
    const askVol = +(Math.random() * 1.8 + 0.3).toFixed(3);
    cumAskVol += askVol;
    asks.push({ price: +askPrice.toFixed(2), amount: askVol, total: +cumAskVol.toFixed(3) });
  }

  return { bids, asks: asks.reverse() };
}

/**
 * Trend Analysis & Portfolio Rebalance Engine
 */
export function calculateRebalanceRecommendation(assets: MultiChainAsset[], targetStrategy: 'hyper-alpha' | 'balanced' | 'conservative') {
  const totalValue = assets.reduce((sum, a) => sum + a.balance * a.priceUsd, 0);

  // Targets per strategy
  const targets: Record<string, Record<string, number>> = {
    'hyper-alpha': { BTC: 0.50, SOL: 0.20, MSTR: 0.15, NVDA: 0.10, ETH: 0.05 },
    'balanced': { BTC: 0.40, ETH: 0.25, NVDA: 0.15, SOL: 0.10, ARB: 0.10 },
    'conservative': { BTC: 0.60, ETH: 0.20, POL: 0.10, ATOM: 0.10 }
  };

  const selectedTarget = targets[targetStrategy];

  const recommendations = assets.map(asset => {
    const currentValue = asset.balance * asset.priceUsd;
    const currentWeight = currentValue / totalValue;
    const targetWeight = selectedTarget[asset.symbol] || 0.02;
    const targetValue = totalValue * targetWeight;
    const diffValue = targetValue - currentValue;
    const diffUnits = diffValue / asset.priceUsd;

    return {
      symbol: asset.symbol,
      name: asset.name,
      currentWeight: +(currentWeight * 100).toFixed(1),
      targetWeight: +(targetWeight * 100).toFixed(1),
      currentValue: +currentValue.toFixed(2),
      targetValue: +targetValue.toFixed(2),
      action: diffValue > 20 ? 'BUY' : diffValue < -20 ? 'SELL' : 'HOLD',
      amountDiff: +Math.abs(diffUnits).toFixed(4),
      valueDiff: +Math.abs(diffValue).toFixed(2)
    };
  });

  return {
    totalValue,
    recommendations
  };
}
