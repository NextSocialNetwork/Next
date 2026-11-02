/**
 * Micro-Tipping Modal for Posts & Blogs
 * Instant direct peer-to-peer cryptocurrency micro-grants with biometric authorization.
 */

import React, { useState } from 'react';
import { Post } from '../../types';
import { X, Coins, Zap } from 'lucide-react';
import { haptics } from '../../services/haptics';

interface TipModalProps {
  post: Post | null;
  onClose: () => void;
  onSendTip: (postId: string, amountUsd: number, symbol: string) => void;
  onRequireBiometric: (title: string, details: string, callback: () => void, payload?: string) => void;
}

export const TipModal: React.FC<TipModalProps> = ({
  post,
  onClose,
  onSendTip,
  onRequireBiometric
}) => {
  const [selectedAsset, setSelectedAsset] = useState<'BTC' | 'ETH' | 'SOL'>('BTC');
  const [tipTier, setTipTier] = useState<number>(10); // USD

  if (!post) return null;

  const cryptoAmounts = {
    BTC: (tipTier / 89420).toFixed(6),
    ETH: (tipTier / 3145).toFixed(4),
    SOL: (tipTier / 184.75).toFixed(3)
  };

  const handleConfirmTip = (e: React.FormEvent) => {
    e.preventDefault();

    onRequireBiometric(
      `Send Micro-Tip to ${post.authorHandle}`,
      `Authorize ${cryptoAmounts[selectedAsset]} ${selectedAsset} ($${tipTier} USD) directly to creator address`,
      () => {
        haptics.orderExecuted();
        onSendTip(post.id, tipTier, selectedAsset);
        onClose();
      },
      `$${tipTier} USD (${selectedAsset})`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#0d121c] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm text-white">Direct Peer Micro-Tip</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleConfirmTip} className="py-4 space-y-4">
          <div className="text-xs text-slate-400">
            Recipient: <span className="font-mono text-emerald-400 font-semibold">{post.authorHandle}</span>
          </div>

          {/* Asset Selection */}
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {(['BTC', 'ETH', 'SOL'] as const).map(asset => (
              <button
                key={asset}
                type="button"
                onClick={() => { setSelectedAsset(asset); haptics.tap(); }}
                className={`py-2 rounded-xl border text-center transition-all ${
                  selectedAsset === asset
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-bold shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>

          {/* Amount Tiers */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-slate-400">Select Tip Amount (USD):</div>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {[5, 10, 25, 50].map(tier => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => { setTipTier(tier); haptics.tap(); }}
                  className={`py-2 rounded-xl border transition-all text-center ${
                    tipTier === tier
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ${tier}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Crypto Amount:</span>
              <span className="text-white font-bold">{cryptoAmounts[selectedAsset]} {selectedAsset}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fiat Equiv:</span>
              <span className="text-emerald-400">${tipTier}.00 USD</span>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
              0% platform fee · 100% directly transferred to peer public key
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/40"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Biometric Authorize Tip</span>
          </button>
        </form>
      </div>
    </div>
  );
};
