/**
 * Push Notifications & Volatility Alerts Center Modal
 * Real-time monitoring of rapid market dislocations and whale transfers.
 */

import React from 'react';
import { VolatilityAlert } from '../../types';
import { notificationDispatcher } from '../../services/notifications';
import { haptics } from '../../services/haptics';
import { X, Bell, Zap, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';

interface VolatilityAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: VolatilityAlert[];
  onTriggerSim: (type: 'btc_spike' | 'nvda_breakout' | 'whale_transfer' | 'dip_warning') => void;
}

export const VolatilityAlertsModal: React.FC<VolatilityAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onTriggerSim
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className="font-semibold text-sm text-white">Volatility Radar & Push Alerts</h3>
              <p className="text-xs text-slate-400">Real-Time Market Dislocations & Whale Movements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Simulator Triggers */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400">Trigger Real-Time Volatility Simulator:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onTriggerSim('btc_spike')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center gap-1.5 font-medium transition-colors border border-slate-700/60"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>BTC +4.2% Flash Spike</span>
            </button>
            <button
              onClick={() => onTriggerSim('whale_transfer')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center gap-1.5 font-medium transition-colors border border-slate-700/60"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>4,100 BTC Whale Alert</span>
            </button>
            <button
              onClick={() => onTriggerSim('nvda_breakout')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center gap-1.5 font-medium transition-colors border border-slate-700/60"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>NVDA Equities Breakout</span>
            </button>
            <button
              onClick={() => onTriggerSim('dip_warning')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center gap-1.5 font-medium transition-colors border border-slate-700/60"
            >
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              <span>ETH Support Retest</span>
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {alerts.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              Radar nominal. No recent volatility triggers.
            </div>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.id}
                className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{alert.symbol}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      alert.triggerType === 'spike' || alert.triggerType === 'breakout'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                        : alert.triggerType === 'whale'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-900'
                        : 'bg-rose-950 text-rose-400 border border-rose-900'
                    }`}>
                      {alert.triggerType.toUpperCase()} ({alert.deltaPercent >= 0 ? '+' : ''}{alert.deltaPercent}%)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090d14] flex items-center justify-between text-xs">
          <button
            onClick={async () => {
              const res = await notificationDispatcher.requestBrowserPushPermission();
              if (res) haptics.biometricSuccess();
            }}
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
          >
            Request Browser Push Permission →
          </button>
          <span className="font-mono text-slate-500 text-[11px]">Haptic Radar Active</span>
        </div>
      </div>
    </div>
  );
};
