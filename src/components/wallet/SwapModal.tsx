/**
 * Instant Cross-Platform Swap Modal
 * Allows exchanging assets across Bitcoin, Ethereum, Solana, and Equities Tokens
 * with zero-slippage routes and biometric authentication.
 */

import React, { useState } from 'react';
import { MultiChainAsset } from '../../types';
import { X, ArrowDownUp, Zap, ShieldCheck } from 'lucide-react';
import { haptics } from '../../services/haptics';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MultiChainAsset[];
  onSwapSuccess: (fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number) => void;
  onRequireBiometric: (title: string, details: string, callback: () => void, payload?: string) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSwapSuccess,
  onRequireBiometric
}) => {
  const [fromSymbol, setFromSymbol] = useState('ETH');
  const [toSymbol, setToSymbol] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('1.0');

  if (!isOpen) return null;

  const fromAsset = assets.find(a => a.symbol === fromSymbol) || assets[0];
  const toAsset = assets.find(a => a.symbol === toSymbol) || assets[1];

  const parsedFrom = parseFloat(fromAmount) || 0;
  const fromUsd = parsedFrom * fromAsset.priceUsd;
  const toAmount = +(fromUsd / toAsset.priceUsd).toFixed(6);

  const handleInvert = () => {
    haptics.tap();
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
  };

  const handleExecuteSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedFrom <= 0) return;

    onRequireBiometric(
      `Cross-Chain Atomic Swap: ${fromSymbol} → ${toSymbol}`,
      `Swap ${parsedFrom} ${fromSymbol} for ~${toAmount} ${toSymbol} (Est: $${fromUsd.toFixed(2)})`,
      () => {
        haptics.orderExecuted();
        onSwapSuccess(fromSymbol, toSymbol, parsedFrom, toAmount);
        onClose();
      },
      `$${fromUsd.toFixed(2)}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0d121c] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm text-white">Cross-Chain Atomic Swap</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleExecuteSwap} className="py-4 space-y-3">
          {/* Pay from box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>You Pay</span>
              <span>Balance: {fromAsset.balance} {fromAsset.symbol}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                step="any"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="w-full bg-transparent font-mono text-xl font-bold text-white focus:outline-none"
                placeholder="0.0"
                required
              />
              <select
                value={fromSymbol}
                onChange={(e) => setFromSymbol(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              >
                {assets.map(a => (
                  <option key={a.symbol} value={a.symbol} disabled={a.symbol === toSymbol}>
                    {a.symbol} ({a.chain})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              ≈ ${fromUsd.toFixed(2)} USD
            </div>
          </div>

          {/* Invert button */}
          <div className="flex justify-center -my-1">
            <button
              type="button"
              onClick={handleInvert}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-transform hover:rotate-180"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Receive to box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>You Receive (Estimated)</span>
              <span>Rate: 1 {fromSymbol} = {(fromAsset.priceUsd / toAsset.priceUsd).toFixed(4)} {toSymbol}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="w-full font-mono text-xl font-bold text-emerald-400 tabular-nums">
                {toAmount}
              </div>
              <select
                value={toSymbol}
                onChange={(e) => setToSymbol(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              >
                {assets.map(a => (
                  <option key={a.symbol} value={a.symbol} disabled={a.symbol === fromSymbol}>
                    {a.symbol} ({a.chain})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Zero platform fee · Network gas: ~0.0001 {toSymbol}
            </div>
          </div>

          {/* Atomic routing info */}
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Decentralized Hash Time-Locked Contract (HTLC)</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Funds settle atomically without custodial bridge vulnerabilities.
            </div>
          </div>

          <button
            type="submit"
            disabled={parsedFrom <= 0}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
          >
            <Zap className="w-4 h-4" />
            <span>Biometric Authorize Swap</span>
          </button>
        </form>
      </div>
    </div>
  );
};
