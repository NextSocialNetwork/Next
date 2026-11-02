/**
 * Top Bar Navigation
 * Brand: Next (https://NextSocialNetwork.Com)
 * Logo: Clean click-to-main-page element
 * Center: Navigation links (Feed, Blog, Bitcoin & Stocks, Encrypted DMs, Multi-Chain Vault)
 * Right: Multi-Language Switcher, Volatility Alerts, Sound Toggle, and Sovereign Account
 * Optimized for compact, comfortable mobile presence (<15% sticky viewport height)
 */

import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Bell, ChevronDown } from 'lucide-react';
import { haptics } from '../../services/haptics';
import { LANGUAGES, LanguageCode, TRANSLATIONS } from '../../services/i18n';

interface HeaderProps {
  activeTab: 'feed' | 'articles' | 'blogs' | 'dms' | 'trading' | 'wallet';
  setActiveTab: (tab: 'feed' | 'articles' | 'blogs' | 'dms' | 'trading' | 'wallet') => void;
  onOpenWallet: () => void;
  onOpenIdentity: () => void;
  onOpenTopology: () => void;
  onOpenAiChat: () => void;
  unreadAlertCount: number;
  onOpenAlerts: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  userHandle: string;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenWallet,
  onOpenTopology,
  unreadAlertCount,
  onOpenAlerts,
  soundEnabled,
  onToggleSound,
  userHandle,
  language,
  onSelectLanguage
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80 px-2.5 sm:px-6 lg:px-8 py-2 sm:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand wordmark - Clean "Next" text that redirects to the main page when clicked */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('feed');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              haptics.tap();
            }}
            title="Next - Return to Main Page"
            className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 group transition-opacity hover:opacity-90 cursor-pointer text-left"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07090e] rounded-[5px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
              </div>
            </div>
            <span className="font-extrabold text-white text-sm sm:text-base tracking-tight group-hover:text-emerald-300 transition-colors">
              Next
            </span>
          </button>

          <button
            onClick={onOpenTopology}
            title="Inspect Decentralized Scalability"
            className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 hover:text-emerald-400 bg-slate-900/60 border border-slate-800 hover:border-emerald-900/60 transition-colors whitespace-nowrap"
          >
            <span>Relay Mesh Active</span>
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links - "Blog" */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => { setActiveTab('feed'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'feed' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_feed}
          </button>
          <button
            onClick={() => { setActiveTab('articles'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'articles' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_articles}
          </button>
          <button
            onClick={() => { setActiveTab('trading'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'trading' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_trading}
          </button>
          <button
            onClick={() => { setActiveTab('dms'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'dms' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_dms}
          </button>
          <button
            onClick={() => { setActiveTab('wallet'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'wallet' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_vault}
          </button>
        </nav>

        {/* Zone 3: Multi-Language Switcher, Volatility Alerts, Sound, and Primary Action (AI Support removed from header) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); haptics.tap(); }}
              className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-colors"
              title="Select Language / Kalba"
            >
              <span className="text-xs sm:text-sm leading-none">{currentLangObj.flag}</span>
              <span className="font-mono text-[9px] sm:text-[11px] uppercase">{currentLangObj.code}</span>
              <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 sm:w-48 bg-[#0c1018] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Select Language / Kalba
                </div>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsLangMenuOpen(false);
                      haptics.tap();
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      language === lang.code ? 'text-emerald-400 font-semibold bg-emerald-950/20' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volatility Alerts Bell */}
          <button
            onClick={onOpenAlerts}
            aria-label="Volatility Alerts"
            className="relative p-1 sm:p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            className="p-1 sm:p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />}
          </button>

          {/* Primary Action Button (Truncated handle on mobile to prevent overflow) */}
          <button
            onClick={() => { onOpenWallet(); haptics.tap(); }}
            className="flex items-center gap-1 px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg transition-all shadow-md shadow-emerald-950/30 whitespace-nowrap shrink-0"
          >
            <span className="font-mono text-[10px] sm:hidden">{userHandle.length > 7 ? `${userHandle.slice(0, 5)}…` : userHandle}</span>
            <span className="hidden sm:inline font-mono text-xs">{userHandle}</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip - Compact and sleek (<15% sticky viewport height) */}
      <div className="flex md:hidden items-center justify-between pt-1 mt-1 border-t border-slate-800/60 text-[10px] overflow-x-auto gap-0.5 no-scrollbar">
        <button
          onClick={() => { setActiveTab('feed'); haptics.tap(); }}
          className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${activeTab === 'feed' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          {t.nav_feed}
        </button>
        <button
          onClick={() => { setActiveTab('articles'); haptics.tap(); }}
          className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${activeTab === 'articles' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          {t.nav_articles}
        </button>
        <button
          onClick={() => { setActiveTab('trading'); haptics.tap(); }}
          className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${activeTab === 'trading' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          {t.nav_trading}
        </button>
        <button
          onClick={() => { setActiveTab('dms'); haptics.tap(); }}
          className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${activeTab === 'dms' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          {t.nav_dms}
        </button>
        <button
          onClick={() => { setActiveTab('wallet'); haptics.tap(); }}
          className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${activeTab === 'wallet' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          {t.nav_vault}
        </button>
      </div>
    </header>
  );
};
