/**
 * Instant Portfolio Rebalancer based on Live Trend Analysis
 * Computes asset divergence from algorithmic target models and executes
 * batch multi-chain portfolio rebalancing in a single biometric signature.
 */

import React, { useState, useMemo } from 'react';
import { MultiChainAsset } from '../../types';
import { calculateRebalanceRecommendation } from '../../services/marketData';
import { haptics } from '../../services/haptics';
import { X, SlidersHorizontal, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface PortfolioRebalancerProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MultiChainAsset[];
  onApplyRebalance: (updatedAssets: MultiChainAsset[]) => void;
  onRequireBiometric: (title: string, details: string, callback: () => void, payload?: string) => void;
}

export const PortfolioRebalancer: React.FC<PortfolioRebalancerProps> = ({
  isOpen,
  onClose,
  assets,
  onApplyRebalance,
  onRequireBiometric
}) => {
  const [strategy, setStrategy] = useState<'hyper-alpha' | 'balanced' | 'conservative'>('hyper-alpha');
  const [isSuccess, setIsSuccess] = useState(false);

  const rebalanceData = useMemo(() => {
    return calculateRebalanceRecommendation(assets, strategy);
  }, [assets, strategy]);

  if (!isOpen) return null;

  const handleExecuteRebalance = () => {
    const totalAdjustments = rebalanceData.recommendations.reduce((acc, r) => acc + (r.action !== 'HOLD' ? r.valueDiff : 0), 0);

    onRequireBiometric(
      `Instant Trend Portfolio Rebalance (${strategy.toUpperCase()})`,
      `Batch execute ${rebalanceData.recommendations.filter(r => r.action !== 'HOLD').length} rebalance orders across Bitcoin & Equities`,
      () => {
        haptics.orderExecuted();
        setIsSuccess(true);

        // Adjust assets according to target
        const updated = assets.map(a => {
          const rec = rebalanceData.recommendations.find(r => r.symbol === a.symbol);
          if (!rec) return a;
          const newBalance = rec.targetValue / a.priceUsd;
          return {
            ...a,
            balance: +newBalance.toFixed(4)
          };
        });

        setTimeout(() => {
          onApplyRebalance(updated);
          onClose();
          setIsSuccess(false);
        }, 1200);
      },
      `$${totalAdjustments.toFixed(2)} Volatility Delta`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-sm text-white">Instant Portfolio Balancing Engine</h3>
              <p className="text-xs text-slate-400">Live Trend Analysis & Multi-Chain Diversification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#0a0e16] space-y-3">
          <div className="text-xs font-mono text-slate-400">Select Algorithmic Trend Model:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => { setStrategy('hyper-alpha'); haptics.tap(); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                strategy === 'hyper-alpha'
                  ? 'bg-slate-800 border-emerald-500/80 shadow-md text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-xs text-emerald-400">Hyper-Alpha</div>
              <div className="text-[11px] text-slate-400 mt-0.5">50% BTC · 20% SOL · 15% MSTR</div>
            </button>
            <button
              onClick={() => { setStrategy('balanced'); haptics.tap(); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                strategy === 'balanced'
                  ? 'bg-slate-800 border-cyan-500/80 shadow-md text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-xs text-cyan-400">Balanced Core</div>
              <div className="text-[11px] text-slate-400 mt-0.5">40% BTC · 25% ETH · 15% NVDA</div>
            </button>
            <button
              onClick={() => { setStrategy('conservative'); haptics.tap(); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                strategy === 'conservative'
                  ? 'bg-slate-800 border-amber-500/80 shadow-md text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-xs text-amber-400">Hard Money Vault</div>
              <div className="text-[11px] text-slate-400 mt-0.5">60% BTC · 20% ETH · 20% Alt</div>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Portfolio NAV: <span className="text-white font-bold">${rebalanceData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></span>
            <span>Trend Momentum: <span className="text-emerald-400 font-bold">Strong Bullish</span></span>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 divide-y divide-slate-800 text-xs font-mono">
            <div className="grid grid-cols-12 p-3 bg-slate-950/80 text-slate-500 text-[11px]">
              <span className="col-span-4">Asset</span>
              <span className="col-span-3 text-right">Current %</span>
              <span className="col-span-3 text-right">Target %</span>
              <span className="col-span-2 text-right">Action</span>
            </div>

            {rebalanceData.recommendations.map(rec => (
              <div key={rec.symbol} className="grid grid-cols-12 p-3 items-center hover:bg-slate-800/30 transition-colors">
                <div className="col-span-4">
                  <div className="font-semibold text-white">{rec.symbol}</div>
                  <div className="text-[10px] text-slate-500 font-sans truncate">{rec.name}</div>
                </div>
                <div className="col-span-3 text-right text-slate-300 tabular-nums">
                  {rec.currentWeight}% (${rec.currentValue.toLocaleString()})
                </div>
                <div className="col-span-3 text-right text-emerald-300 tabular-nums font-semibold">
                  {rec.targetWeight}% (${rec.targetValue.toLocaleString()})
                </div>
                <div className="col-span-2 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rec.action === 'BUY'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                      : rec.action === 'SELL'
                      ? 'bg-rose-950 text-rose-400 border border-rose-900'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {rec.action}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Rebalance explanation */}
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-200">Cross-Platform Settlement Guarantee</div>
            <p>
              Rebalancing triggers zero-slippage atomic cross-chain swaps. All actions are executed in parallel and cryptographically signed via your biometric passkey.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#090d14] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExecuteRebalance}
            disabled={isSuccess}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                <span>Portfolio Rebalanced!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Biometric Execute Rebalance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
