/**
 * Push Notifications & Volatility Alerts Dispatcher for NEXUS ZERO
 */

import { VolatilityAlert } from '../types';
import { haptics } from './haptics';

type AlertListener = (alert: VolatilityAlert) => void;

class VolatilityNotificationDispatcher {
  private listeners: Set<AlertListener> = new Set();
  private history: VolatilityAlert[] = [
    {
      id: 'alert-01',
      symbol: 'BTC/USD',
      triggerType: 'spike',
      message: 'Bitcoin flashed +3.4% in 15m. Order flow indicates massive perpetual liquidation cascade above $89,000.',
      deltaPercent: 3.4,
      timestamp: '2m ago',
      severity: 'high'
    },
    {
      id: 'alert-02',
      symbol: 'MSTR',
      triggerType: 'whale',
      message: 'On-chain accumulation alert: 2,450 BTC absorbed into institutional multisig custody.',
      deltaPercent: 8.9,
      timestamp: '14m ago',
      severity: 'medium'
    },
    {
      id: 'alert-03',
      symbol: 'SOL/USD',
      triggerType: 'breakout',
      message: 'Solana broke key resistance at $182.00 on 4.2x 24h volume.',
      deltaPercent: 7.6,
      timestamp: '32m ago',
      severity: 'medium'
    }
  ];

  public subscribe(listener: AlertListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getAlertHistory(): VolatilityAlert[] {
    return [...this.history];
  }

  public async requestBrowserPushPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch {
      return false;
    }
  }

  public dispatchAlert(alert: Omit<VolatilityAlert, 'id' | 'timestamp'>) {
    const fullAlert: VolatilityAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: 'Just now'
    };

    this.history.unshift(fullAlert);
    if (this.history.length > 20) this.history.pop();

    // Haptic and sound feedback
    haptics.volatilityAlert();

    // Browser native notification if allowed
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`⚡ NEXUS VOLATILITY: ${fullAlert.symbol}`, {
          body: fullAlert.message,
          icon: '/favicon.ico'
        });
      } catch {
        // Notification blocked or restricted
      }
    }

    // Inform in-app subscribers
    this.listeners.forEach(cb => cb(fullAlert));
  }

  public triggerSimulatedAlert(type: 'btc_spike' | 'nvda_breakout' | 'whale_transfer' | 'dip_warning') {
    switch (type) {
      case 'btc_spike':
        this.dispatchAlert({
          symbol: 'BTC/USD',
          triggerType: 'spike',
          message: 'Flash Breakout: BTC crossed $90,000 threshold. Velocity +4.2% in 3m. Bullish momentum high.',
          deltaPercent: 4.2,
          severity: 'high'
        });
        break;
      case 'nvda_breakout':
        this.dispatchAlert({
          symbol: 'NVDA',
          triggerType: 'breakout',
          message: 'Equities Volatility: NVDA surging +3.8% on after-hours AI compute cluster contracts.',
          deltaPercent: 3.8,
          severity: 'medium'
        });
        break;
      case 'whale_transfer':
        this.dispatchAlert({
          symbol: 'BTC/USD',
          triggerType: 'whale',
          message: 'Whale Alert: 4,100 BTC ($366M) moved to cold sovereign storage from exchange reserves.',
          deltaPercent: 2.1,
          severity: 'high'
        });
        break;
      case 'dip_warning':
        this.dispatchAlert({
          symbol: 'ETH/USD',
          triggerType: 'dump',
          message: 'ETH Volatility Dip: -1.9% retest of $3,120 support band. Automated rebalance triggers available.',
          deltaPercent: -1.9,
          severity: 'medium'
        });
        break;
    }
  }
}

export const notificationDispatcher = new VolatilityNotificationDispatcher();
