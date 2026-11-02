/**
 * Bitcoin & Stock Trading Engine with Real-Time Market Analytics
 * Features interactive candlestick charts, live order book, biometric execution, and trend rebalancer.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MarketTicker, TradeOrder, MultiChainAsset } from '../../types';
import { generateOrderBook } from '../../services/marketData';
import { haptics } from '../../services/haptics';
import { notificationDispatcher } from '../../services/notifications';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  SlidersHorizontal,
  Bell,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface TradingViewProps {
  tickers: MarketTicker[];
  selectedTicker: MarketTicker;
  onSelectTicker: (t: MarketTicker) => void;
  assets: MultiChainAsset[];
  onExecuteTrade: (order: TradeOrder) => void;
  onRequireBiometric: (title: string, details: string, callback: () => void, payload?: string) => void;
  onOpenRebalancer: () => void;
}

export const TradingView: React.FC<TradingViewProps> = ({
  tickers,
  selectedTicker,
  onSelectTicker,
  assets,
  onExecuteTrade,
  onRequireBiometric,
  onOpenRebalancer
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '15m' | '1h' | '1D'>('15m');
  const [tradeSide, setTradeSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amountInput, setAmountInput] = useState<string>('0.05');
  const [limitPriceInput, setLimitPriceInput] = useState<string>(selectedTicker.price.toString());
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  // Update limit price input when selected ticker changes
  useEffect(() => {
    setLimitPriceInput(selectedTicker.price.toString());
  }, [selectedTicker.symbol, selectedTicker.price]);

  // Generate live dynamic order book
  const orderBook = useMemo(() => {
    return generateOrderBook(selectedTicker.price);
  }, [selectedTicker.price]);

  // Find user's asset balance for this symbol
  const baseSymbol = selectedTicker.symbol.split('/')[0];
  const userAsset = assets.find(a => a.symbol === baseSymbol);
  const usdcAsset = assets.find(a => a.symbol === 'ETH'); // Proxy quote asset or cash balance
  const cashBalance = 24500.00; // Autonomous USD liquid vault

  const currentPrice = orderType === 'market' ? selectedTicker.price : parseFloat(limitPriceInput) || selectedTicker.price;
  const numAmount = parseFloat(amountInput) || 0;
  const totalCostUsd = +(numAmount * currentPrice).toFixed(2);

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return;

    const actionText = `${tradeSide.toUpperCase()} ${numAmount} ${baseSymbol}`;
    const details = `${orderType.toUpperCase()} order @ $${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} (Est. Total: $${totalCostUsd.toLocaleString()})`;

    onRequireBiometric(
      `Authorize Execution: ${actionText}`,
      details,
      () => {
        haptics.orderExecuted();
        const order: TradeOrder = {
          id: `ord-${Date.now()}`,
          symbol: selectedTicker.symbol,
          side: tradeSide,
          type: orderType,
          amount: numAmount,
          price: currentPrice,
          totalUsd: totalCostUsd,
          timestamp: new Date().toLocaleTimeString(),
          status: 'executed',
          txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...9c1b'
        };
        onExecuteTrade(order);
      },
      `$${totalCostUsd.toLocaleString()}`
    );
  };

  // SVG Chart Dimensions
  const candles = selectedTicker.candles;
  const minPrice = Math.min(...candles.map(c => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.002;
  const chartHeight = 280;
  const chartWidth = 620;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / (maxPrice - minPrice)) * chartHeight;
  };

  const candleWidth = chartWidth / (candles.length || 1);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Ticker Selector Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tickers.map(ticker => {
          const isSelected = ticker.symbol === selectedTicker.symbol;
          const isPos = ticker.change24h >= 0;
          return (
            <button
              key={ticker.symbol}
              onClick={() => { onSelectTicker(ticker); haptics.tap(); }}
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl border text-left transition-all whitespace-nowrap shrink-0 flex items-center gap-2 sm:gap-3 ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-[#0c1018] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-white">{ticker.symbol}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase">{ticker.category}</span>
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-300 font-semibold tabular-nums">
                  ${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className={`text-[11px] sm:text-xs font-mono font-medium flex items-center ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPos ? '+' : ''}{ticker.change24h}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Live Chart + Order Book + Instant Execution Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column: Interactive Candlestick Chart & Technicals */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-3.5 sm:p-5 lg:p-6 bg-[#0c1018] border border-slate-800 rounded-2xl shadow-xl space-y-3 sm:space-y-4">
            {/* Chart Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400">
                  <span className="font-mono text-emerald-400 font-semibold">{selectedTicker.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>24h Vol: {selectedTicker.volume24h}</span>
                  <span aria-hidden="true">·</span>
                  <span>Vol: <span className="font-mono text-amber-400">{selectedTicker.volatilityIndex}</span></span>
                </div>
                <div className="flex items-baseline gap-2.5 sm:gap-3 mt-1">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-white tabular-nums">
                    ${selectedTicker.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`text-xs sm:text-sm font-mono font-semibold flex items-center ${selectedTicker.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedTicker.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                    {selectedTicker.change24h >= 0 ? '+' : ''}{selectedTicker.change24h}%
                  </span>
                </div>
              </div>

              {/* Timeframe selector (Button controls) */}
              <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono self-start sm:self-auto">
                {(['1m', '15m', '1h', '1D'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => { setTimeframe(tf); haptics.tap(); }}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] sm:text-xs transition-colors ${timeframe === tf ? 'bg-slate-800 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Candle inspect readout on hover */}
            <div className="h-6 flex items-center gap-3 text-xs font-mono text-slate-400">
              {hoveredCandle !== null && candles[hoveredCandle] ? (
                <>
                  <span>O: <span className="text-white">${candles[hoveredCandle].open.toFixed(2)}</span></span>
                  <span>H: <span className="text-emerald-400">${candles[hoveredCandle].high.toFixed(2)}</span></span>
                  <span>L: <span className="text-rose-400">${candles[hoveredCandle].low.toFixed(2)}</span></span>
                  <span>C: <span className="text-white">${candles[hoveredCandle].close.toFixed(2)}</span></span>
                  <span>Vol: <span className="text-cyan-400">{candles[hoveredCandle].volume}</span></span>
                </>
              ) : (
                <span className="text-slate-500">Hover over candles for live tick metrics</span>
              )}
            </div>

            {/* SVG Candlestick Rendering */}
            <div className="relative w-full overflow-hidden bg-[#090d14] border border-slate-800/80 rounded-xl p-1.5 sm:p-2">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-64 sm:h-72"
                preserveAspectRatio="none"
              >
                {/* Horizontal price grid lines */}
                {[0.25, 0.5, 0.75].map(ratio => {
                  const y = chartHeight * ratio;
                  const priceLabel = maxPrice - (maxPrice - minPrice) * ratio;
                  return (
                    <g key={ratio}>
                      <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <text x={chartWidth - 6} y={y - 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                        ${priceLabel.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Candles */}
                {candles.map((candle, i) => {
                  const isUp = candle.close >= candle.open;
                  const x = i * candleWidth + candleWidth * 0.15;
                  const w = Math.max(candleWidth * 0.7, 3);
                  const highY = getY(candle.high);
                  const lowY = getY(candle.low);
                  const openY = getY(candle.open);
                  const closeY = getY(candle.close);
                  const bodyY = Math.min(openY, closeY);
                  const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
                  const color = isUp ? '#10b981' : '#f43f5e';

                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setHoveredCandle(i)}
                      onMouseLeave={() => setHoveredCandle(null)}
                      className="cursor-crosshair"
                    >
                      {/* High-Low Wick */}
                      <line
                        x1={x + w / 2}
                        y1={highY}
                        x2={x + w / 2}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      {/* Open-Close Body */}
                      <rect
                        x={x}
                        y={bodyY}
                        width={w}
                        height={bodyHeight}
                        fill={color}
                        rx="1"
                        className="transition-opacity hover:opacity-80"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Actions Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenRebalancer}
                  className="px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Instant Trend Rebalancer</span>
                </button>
                <button
                  onClick={() => notificationDispatcher.triggerSimulatedAlert('btc_spike')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simulate Volatility Flash</span>
                </button>
              </div>

              <button
                onClick={async () => {
                  const granted = await notificationDispatcher.requestBrowserPushPermission();
                  if (granted) haptics.biometricSuccess();
                }}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Bell className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enable Push Volatility Alerts</span>
              </button>
            </div>
          </div>

          {/* Live Order Book depth */}
          <div className="p-5 bg-[#0c1018] border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Live Order Book Depth
              </span>
              <span className="text-slate-500">Tick: ~1.2s</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              {/* Bids */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-800">
                  <span>Price (USD)</span>
                  <span>Bid Size</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {orderBook.bids.map((b, idx) => (
                    <div key={idx} className="flex items-center justify-between text-emerald-400 hover:bg-emerald-950/20 px-1 rounded transition-colors">
                      <span>${b.price.toFixed(2)}</span>
                      <span className="text-slate-300 tabular-nums">{b.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-800">
                  <span>Price (USD)</span>
                  <span>Ask Size</span>
                </div>
                <div className="space-y-1 mt-1.5">
                  {orderBook.asks.map((a, idx) => (
                    <div key={idx} className="flex items-center justify-between text-rose-400 hover:bg-rose-950/20 px-1 rounded transition-colors">
                      <span>${a.price.toFixed(2)}</span>
                      <span className="text-slate-300 tabular-nums">{a.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Execution Terminal */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-3.5 sm:p-5 lg:p-6 bg-[#0c1018] border border-slate-800 rounded-2xl shadow-xl space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800">
              <h3 className="font-semibold text-xs sm:text-sm text-white">Execution Terminal</h3>
              <span className="font-mono text-[11px] sm:text-xs text-emerald-400">0% Commission</span>
            </div>

            {/* Buy / Sell side switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setTradeSide('buy'); haptics.tap(); }}
                className={`py-2 rounded-lg transition-all ${
                  tradeSide === 'buy' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => { setTradeSide('sell'); haptics.tap(); }}
                className={`py-2 rounded-lg transition-all ${
                  tradeSide === 'sell' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            {/* Order Type switcher */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Order Type:</span>
              <div className="flex items-center gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => { setOrderType('market'); haptics.tap(); }}
                  className={`px-2 py-0.5 rounded ${orderType === 'market' ? 'bg-slate-800 text-white font-semibold' : 'hover:text-white'}`}
                >
                  Market
                </button>
                <button
                  type="button"
                  onClick={() => { setOrderType('limit'); haptics.tap(); }}
                  className={`px-2 py-0.5 rounded ${orderType === 'limit' ? 'bg-slate-800 text-white font-semibold' : 'hover:text-white'}`}
                >
                  Limit
                </button>
              </div>
            </div>

            <form onSubmit={handleExecuteTrade} className="space-y-4">
              {orderType === 'limit' && (
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Limit Price (USD)</span>
                    <span>Best: ${selectedTicker.price.toFixed(2)}</span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={limitPriceInput}
                    onChange={(e) => setLimitPriceInput(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Amount ({baseSymbol})</span>
                  <span>Avail: {userAsset?.balance || 0} {baseSymbol}</span>
                </div>
                <input
                  type="number"
                  step="any"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              {/* Quick amount presets */}
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {['25%', '50%', '75%', 'MAX'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      if (preset === '25%') setAmountInput('0.025');
                      if (preset === '50%') setAmountInput('0.05');
                      if (preset === '75%') setAmountInput('0.10');
                      if (preset === 'MAX') setAmountInput('0.25');
                    }}
                    className="py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-center"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Order Calculation Summary */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Execution Price:</span>
                  <span className="text-white">${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Settlement Route:</span>
                  <span className="text-cyan-400">Multi-Chain Atomic Relay</span>
                </div>
                <div className="pt-1.5 mt-1 border-t border-slate-800 flex justify-between font-bold">
                  <span className="text-slate-300">Est. Total:</span>
                  <span className="text-emerald-400 text-sm">${totalCostUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={numAmount <= 0}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  tradeSide === 'buy'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/40'
                    : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-950/40'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Biometric {tradeSide.toUpperCase()} {baseSymbol}</span>
              </button>
            </form>

            <div className="text-[11px] font-mono text-center text-slate-500">
              Hardware enclave verification required before order broadcast
            </div>
          </div>

          {/* Autonomous Custody Balance Widget */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-slate-400">
              <span>Sovereign Cash Pool</span>
              <span className="text-white font-bold">${cashBalance.toLocaleString()} USD</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Instant liquidity backed by decentralized cross-chain collateral vaults.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
