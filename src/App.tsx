/**
 * Next (https://NextSocialNetwork.Com)
 * Decentralized Encrypted Social Network & Autonomous Trading Hub
 * Features:
 * - Brand: Next (https://NextSocialNetwork.Com)
 * - Header logo: Non-link element as requested
 * - AI Support button: Moved to left side next to logo as requested
 * - 7,485 Google SEO-Friendly Decentralized Blog Articles with sitemap.xml & Schema.org JSON-LD
 * - Header navigation tab renamed to Blog (clean typography without number badges)
 * - AI Chat Support Box on the right side powered by server-side Gemini 3.8 Flash
 * - Multi-Language Engine with Lithuanian (🇱🇹 Lietuvių), English, Español, 中文, Deutsch, 日本語, Français, العربية, Português, Русский
 * - Comprehensive Google SEO-friendly Footer with 4 columns of whitepapers, zero-KYC policy, and robots.txt
 * - Zero-KYC Self-Sovereign Identity Enclave
 * - End-to-End Encrypted DMs (AES-256-GCM)
 * - Multi-Chain Vault & Cross-Chain Swaps
 * - Bitcoin & Equities Trading with Volatility Alerts & Biometric Signatures
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  SovereignIdentity, 
  Post, 
  DirectMessage, 
  MultiChainAsset, 
  MarketTicker, 
  TradeOrder, 
  VolatilityAlert 
} from './types';
import { generateSovereignIdentity, getStoredIdentity } from './services/crypto';
import { INITIAL_POSTS, INITIAL_MESSAGES } from './services/mockData';
import { 
  INITIAL_TICKERS, 
  INITIAL_MULTI_CHAIN_ASSETS 
} from './services/marketData';
import { SeoArticle } from './services/articleCatalog';
import { haptics } from './services/haptics';
import { notificationDispatcher } from './services/notifications';
import { LanguageCode, TRANSLATIONS } from './services/i18n';

// Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FeedView } from './components/social/FeedView';
import { BlogDetailModal } from './components/social/BlogDetailModal';
import { CreatePostModal } from './components/social/CreatePostModal';
import { SeoInspectorModal } from './components/social/SeoInspectorModal';
import { ArticleArchiveView } from './components/social/ArticleArchiveView';
import { ArticleDetailModal } from './components/social/ArticleDetailModal';
import { DirectMessagesView } from './components/social/DirectMessagesView';
import { TradingView } from './components/trading/TradingView';
import { PortfolioRebalancer } from './components/trading/PortfolioRebalancer';
import { VolatilityAlertsModal } from './components/trading/VolatilityAlertsModal';
import { WalletDrawer } from './components/wallet/WalletDrawer';
import { SwapModal } from './components/wallet/SwapModal';
import { TipModal } from './components/wallet/TipModal';
import { KeyManagementModal } from './components/identity/KeyManagementModal';
import { NetworkTopologyModal } from './components/network/NetworkTopologyModal';
import { BiometricModal } from './components/biometrics/BiometricModal';
import { AiChatSupportModal } from './components/chat/AiChatSupportModal';
import { SeoFooterPagesModal, FooterPageId } from './components/footer/SeoFooterPagesModal';
import { Bell, Zap, X, Bot } from 'lucide-react';

export default function App() {
  // Sovereign Identity state
  const [identity, setIdentity] = useState<SovereignIdentity | null>(null);

  // Multi-Language State (Default to English or detected)
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Navigation tab: feed | articles (2,896 SEO) | blogs | trading | dms | wallet
  const [activeTab, setActiveTab] = useState<'feed' | 'articles' | 'blogs' | 'dms' | 'trading' | 'wallet'>('feed');

  // Posts & Direct Messages
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [messages, setMessages] = useState<DirectMessage[]>(INITIAL_MESSAGES);

  // Market & Trading State
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);
  const [selectedTicker, setSelectedTicker] = useState<MarketTicker>(INITIAL_TICKERS[0]);
  const [assets, setAssets] = useState<MultiChainAsset[]>(INITIAL_MULTI_CHAIN_ASSETS);
  const [alerts, setAlerts] = useState<VolatilityAlert[]>(notificationDispatcher.getAlertHistory());
  const [activeToastAlert, setActiveToastAlert] = useState<VolatilityAlert | null>(null);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Post | null>(null);
  const [selectedSeoPost, setSelectedSeoPost] = useState<Post | null>(null);
  const [selectedTipPost, setSelectedTipPost] = useState<Post | null>(null);
  const [selectedArchiveArticle, setSelectedArchiveArticle] = useState<SeoArticle | null>(null);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [isKeyManagementOpen, setIsKeyManagementOpen] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isRebalancerOpen, setIsRebalancerOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [selectedFooterPage, setSelectedFooterPage] = useState<FooterPageId | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Biometric Prompt state
  const [biometricConfig, setBiometricConfig] = useState<{
    isOpen: boolean;
    title: string;
    details: string;
    callback: () => void;
    payload?: string;
  }>({
    isOpen: false,
    title: '',
    details: '',
    callback: () => {},
    payload: ''
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Initialize or restore sovereign identity on first load
  useEffect(() => {
    async function initIdentity() {
      const stored = getStoredIdentity();
      if (stored) {
        setIdentity(stored);
      } else {
        const fresh = await generateSovereignIdentity();
        setIdentity(fresh);
      }
    }
    initIdentity();
  }, []);

  // Subscribe to real-time Volatility Alerts
  useEffect(() => {
    const unsubscribe = notificationDispatcher.subscribe((alert) => {
      setAlerts(prev => [alert, ...prev]);
      setActiveToastAlert(alert);
      setTimeout(() => {
        setActiveToastAlert(current => (current?.id === alert.id ? null : current));
      }, 6000);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Real-time market tick generator (subtle price changes every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prevTickers => {
        return prevTickers.map(ticker => {
          const pct = (Math.random() - 0.47) * 0.0035;
          const newPrice = +(ticker.price * (1 + pct)).toFixed(2);
          const lastCandle = ticker.candles[ticker.candles.length - 1];
          let updatedCandles = [...ticker.candles];

          if (lastCandle) {
            const updatedCandle = {
              ...lastCandle,
              close: newPrice,
              high: Math.max(lastCandle.high, newPrice),
              low: Math.min(lastCandle.low, newPrice)
            };
            updatedCandles[updatedCandles.length - 1] = updatedCandle;
          }

          return {
            ...ticker,
            price: newPrice,
            candles: updatedCandles
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Sync selectedTicker when ticker array ticks
  useEffect(() => {
    const updated = tickers.find(t => t.symbol === selectedTicker.symbol);
    if (updated) {
      setSelectedTicker(updated);
    }
  }, [tickers, selectedTicker.symbol]);

  // Request Biometric Verification helper
  const requireBiometric = useCallback((
    title: string, 
    details: string, 
    callback: () => void, 
    payload?: string
  ) => {
    setBiometricConfig({
      isOpen: true,
      title,
      details,
      callback,
      payload
    });
  }, []);

  // Handlers for social feed
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleRepost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, reposts: p.reposts + 1 } : p));
  };

  const handleTipSuccess = (postId: string, amountUsd: number, symbol: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, tipsReceivedUsd: p.tipsReceivedUsd + amountUsd } : p));
    setAssets(prev => prev.map(a => {
      if (a.symbol === symbol) {
        const deltaUnits = amountUsd / a.priceUsd;
        return { ...a, balance: +(Math.max(a.balance - deltaUnits, 0)).toFixed(4) };
      }
      return a;
    }));
  };

  const handleExecuteTrade = (order: TradeOrder) => {
    const baseSymbol = order.symbol.split('/')[0];
    setAssets(prev => {
      return prev.map(a => {
        if (a.symbol === baseSymbol) {
          const newBal = order.side === 'buy' ? a.balance + order.amount : Math.max(a.balance - order.amount, 0);
          return { ...a, balance: +newBal.toFixed(4) };
        }
        return a;
      });
    });
  };

  const handleSwapSuccess = (fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number) => {
    setAssets(prev => prev.map(a => {
      if (a.symbol === fromSymbol) {
        return { ...a, balance: +Math.max(a.balance - fromAmount, 0).toFixed(4) };
      }
      if (a.symbol === toSymbol) {
        return { ...a, balance: +(a.balance + toAmount).toFixed(4) };
      }
      return a;
    }));
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    haptics.setSoundEnabled(next);
    if (next) haptics.tap();
  };

  const handleGenerateNewIdentity = async () => {
    const fresh = await generateSovereignIdentity();
    setIdentity(fresh);
  };

  const handleTipArticle = (article: SeoArticle) => {
    setSelectedTipPost({
      id: `article-${article.id}`,
      authorHandle: article.authorHandle,
      authorKey: article.authorKey,
      content: article.title,
      timestamp: article.publishedDate,
      relativeTime: 'SEO Published',
      likes: 120,
      reposts: 42,
      tipsReceivedUsd: 0,
      signature: article.signature,
      cid: article.cid,
      isEncrypted: false,
      category: 'Cryptography',
      tags: article.tags,
      slug: article.slug
    });
  };

  if (!identity) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 font-mono text-sm">
        Initializing Next Sovereign Cryptographic Enclave...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 3-Zone Top Bar Navigation with Non-Link Logo and Left-Sided AI Support Button */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'wallet') {
            setIsWalletOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenIdentity={() => setIsKeyManagementOpen(true)}
        onOpenTopology={() => setIsTopologyOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        unreadAlertCount={alerts.length}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        userHandle={identity.handle}
        language={language}
        onSelectLanguage={(lang) => setLanguage(lang)}
      />

      {/* Floating Push Volatility Toast Alert */}
      {activeToastAlert && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-[#0d121c] border border-amber-500/60 rounded-2xl p-4 shadow-2xl text-slate-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>{activeToastAlert.symbol} Volatility Alert</span>
                  <span className="text-[10px] text-amber-400 font-normal">({activeToastAlert.deltaPercent >= 0 ? '+' : ''}{activeToastAlert.deltaPercent}%)</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {activeToastAlert.message}
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveToastAlert(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setActiveToastAlert(null);
                setActiveTab('trading');
                haptics.tap();
              }}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Open Trading Terminal</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500">{activeToastAlert.timestamp}</span>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'feed' && (
          <FeedView
            posts={posts}
            identity={identity}
            onOpenCreate={() => setIsCreateOpen(true)}
            onOpenBlog={(post) => setSelectedBlog(post)}
            onOpenSeo={(post) => setSelectedSeoPost(post)}
            onTipPost={(post) => setSelectedTipPost(post)}
            onLikePost={handleLikePost}
            onRepost={handleRepost}
            activeFilterTab="all"
          />
        )}

        {/* 7,485 Google SEO-Friendly Decentralized Blog Articles Tab */}
        {activeTab === 'articles' && (
          <ArticleArchiveView
            language={language}
            onOpenArticle={(article) => setSelectedArchiveArticle(article)}
            onTipArticle={handleTipArticle}
          />
        )}

        {activeTab === 'trading' && (
          <TradingView
            tickers={tickers}
            selectedTicker={selectedTicker}
            onSelectTicker={setSelectedTicker}
            assets={assets}
            onExecuteTrade={handleExecuteTrade}
            onRequireBiometric={requireBiometric}
            onOpenRebalancer={() => setIsRebalancerOpen(true)}
          />
        )}

        {activeTab === 'dms' && (
          <DirectMessagesView
            messages={messages}
            identity={identity}
            onSendMessage={(msg) => setMessages(prev => [...prev, msg])}
            onRequireBiometric={requireBiometric}
          />
        )}
      </main>

      {/* Floating AI Chat Trigger Pill (Docked on the opposite side: bottom-right) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => { setIsAiChatOpen(!isAiChatOpen); haptics.tap(); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-full shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span className="text-xs font-semibold">{t.btn_ai_support}</span>
        </button>
      </div>

      {/* Google SEO-Friendly 4-Column Footer */}
      <Footer
        language={language}
        onNavigateTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenTopology={() => setIsTopologyOpen(true)}
        onOpenIdentity={() => setIsKeyManagementOpen(true)}
        onOpenFooterPage={(pageId) => setSelectedFooterPage(pageId)}
      />

      {/* Modals */}
      <SeoFooterPagesModal
        pageId={selectedFooterPage}
        onClose={() => setSelectedFooterPage(null)}
      />

      <AiChatSupportModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        language={language}
      />

      <BiometricModal
        isOpen={biometricConfig.isOpen}
        onClose={() => setBiometricConfig(prev => ({ ...prev, isOpen: false }))}
        onSuccess={biometricConfig.callback}
        actionTitle={biometricConfig.title}
        actionDetails={biometricConfig.details}
        amountOrPayload={biometricConfig.payload}
      />

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPublish={(newPost) => setPosts(prev => [newPost, ...prev])}
        identity={identity}
        onRequireBiometric={requireBiometric}
      />

      <BlogDetailModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onTip={(post) => setSelectedTipPost(post)}
        onOpenSeo={(post) => setSelectedSeoPost(post)}
      />

      <ArticleDetailModal
        article={selectedArchiveArticle}
        onClose={() => setSelectedArchiveArticle(null)}
        onTip={handleTipArticle}
      />

      <SeoInspectorModal
        post={selectedSeoPost}
        onClose={() => setSelectedSeoPost(null)}
      />

      <TipModal
        post={selectedTipPost}
        onClose={() => setSelectedTipPost(null)}
        onSendTip={handleTipSuccess}
        onRequireBiometric={requireBiometric}
      />

      <WalletDrawer
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        assets={assets}
        identity={identity}
        onOpenSwap={() => { setIsWalletOpen(false); setIsSwapOpen(true); }}
        onOpenKeyManagement={() => { setIsWalletOpen(false); setIsKeyManagementOpen(true); }}
      />

      <SwapModal
        isOpen={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
        assets={assets}
        onSwapSuccess={handleSwapSuccess}
        onRequireBiometric={requireBiometric}
      />

      <KeyManagementModal
        isOpen={isKeyManagementOpen}
        onClose={() => setIsKeyManagementOpen(false)}
        identity={identity}
        onGenerateNewIdentity={handleGenerateNewIdentity}
        onRequireBiometric={requireBiometric}
      />

      <NetworkTopologyModal
        isOpen={isTopologyOpen}
        onClose={() => setIsTopologyOpen(false)}
      />

      <PortfolioRebalancer
        isOpen={isRebalancerOpen}
        onClose={() => setIsRebalancerOpen(false)}
        assets={assets}
        onApplyRebalance={(updated) => setAssets(updated)}
        onRequireBiometric={requireBiometric}
      />

      <VolatilityAlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onTriggerSim={(type) => notificationDispatcher.triggerSimulatedAlert(type)}
      />
    </div>
  );
}
