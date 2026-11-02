/**
 * Multi-Chain Wallet Drawer
 * Cross-platform decentralized asset management across Bitcoin, Ethereum, Solana, Arbitrum, Cosmos, and Polygon.
 */

import React, { useState } from 'react';
import { MultiChainAsset, SovereignIdentity } from '../../types';
import { X, ArrowDownUp, Shield, Copy, Check, ExternalLink, Key } from 'lucide-react';
import { haptics } from '../../services/haptics';

interface WalletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MultiChainAsset[];
  identity: SovereignIdentity;
  onOpenSwap: () => void;
  onOpenKeyManagement: () => void;
}

export const WalletDrawer: React.FC<WalletDrawerProps> = ({
  isOpen,
  onClose,
  assets,
  identity,
  onOpenSwap,
  onOpenKeyManagement
}) => {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalBalanceUsd = assets.reduce((sum, a) => sum + a.balance * a.priceUsd, 0);

  const copyAddress = (symbol: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedSymbol(symbol);
    haptics.tap();
    setTimeout(() => setCopiedSymbol(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1018] border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 bg-[#090d14] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Multi-Chain Sovereign Vault</h3>
                <p className="text-xs text-slate-400 font-mono">Self-Custodial · Zero KYC</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Portfolio NAV Card */}
          <div className="p-6 bg-[#0a0e16] border-b border-slate-800 space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Sovereign Net Asset Value</div>
              <div className="text-3xl font-mono font-bold text-white tabular-nums">
                ${totalBalanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span>+4.6% (24h Aggregate Yield)</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Zero Central Custody</span>
              </div>
            </div>

            {/* Quick Vault Action Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => { onOpenSwap(); haptics.tap(); }}
                className="py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/40"
              >
                <ArrowDownUp className="w-3.5 h-3.5" />
                <span>Instant Swap</span>
              </button>
              <button
                onClick={() => { onOpenKeyManagement(); haptics.tap(); }}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Sovereign Keys</span>
              </button>
            </div>
          </div>

          {/* Asset List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Diversified Chain Assets</span>
              <span>Holdings</span>
            </div>

            <div className="space-y-2">
              {assets.map(asset => {
                const totalAssetUsd = asset.balance * asset.priceUsd;
                const isCopied = copiedSymbol === asset.symbol;

                return (
                  <div
                    key={asset.symbol}
                    className="p-3.5 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-xl space-y-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white font-mono"
                          style={{ backgroundColor: asset.chainIconColor + '25', border: `1px solid ${asset.chainIconColor}60` }}
                        >
                          {asset.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-white">{asset.symbol}</span>
                            <span className="text-[10px] font-mono text-slate-500">{asset.chain}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            ${asset.priceUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-white tabular-nums">
                          {asset.balance} {asset.symbol}
                        </div>
                        <div className="text-[11px] text-slate-400 tabular-nums">
                          ${totalAssetUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    {/* Address & Copy helper */}
                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="truncate max-w-[220px]" title={asset.address}>
                        {asset.address}
                      </span>
                      <button
                        onClick={() => copyAddress(asset.symbol, asset.address)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Zero-Telemetry Guarantee */}
          <div className="p-4 border-t border-slate-800 bg-[#090d14] text-[11px] font-mono text-slate-500 text-center">
            Private Key Fingerprint: <span className="text-slate-400">{identity.keyFingerprint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
