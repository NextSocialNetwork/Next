/**
 * Top Bar Navigation
 * Brand: Next (https://NextSocialNetwork.Com)
 * Logo: Non-link element
 * Center: Clean navigation links including "Blog" (with number badge removed as requested)
 * Right side: AI Support button (moved to the right side as requested), Language Switcher, Volatility Alerts, Sound, and Sovereign Account
 */

import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Bell, Bot, ChevronDown } from 'lucide-react';
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
  onOpenAiChat,
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
    <header className="sticky top-0 z-40 w-full bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand wordmark - Clean "Next" text that redirects to the main page when clicked */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('feed');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              haptics.tap();
            }}
            title="Next - Return to Main Page"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group transition-opacity hover:opacity-90 cursor-pointer text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-emerald-300 transition-colors">
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

        {/* Zone 2: Clean single-line text navigation links - "Blog" with article number removed as requested */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => { setActiveTab('feed'); haptics.tap(); }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'feed' ? 'text-white font-semibold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-400'
            }`}
          >
            {t.nav_feed}
          </button>
          {/* Changed name to Blog and removed number badge as requested */}
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

        {/* Zone 3: AI Support button moved back to the right side as requested + Controls + Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* AI Support button moved to right side */}
          <button
            onClick={() => { onOpenAiChat(); haptics.tap(); }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-900/40 text-emerald-300 text-xs font-semibold transition-all shadow-sm shadow-emerald-950/30 shrink-0"
            title="Next AI Chat Support"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.btn_ai_support}</span>
          </button>

          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); haptics.tap(); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-colors"
              title="Select Language / Pasirinkite kalbą"
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-mono text-[11px] uppercase">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-[#0c1018] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto">
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
            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => { onOpenWallet(); haptics.tap(); }}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg transition-all shadow-md shadow-emerald-950/30 whitespace-nowrap shrink-0"
          >
            <span className="font-mono">{userHandle}</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex md:hidden items-center justify-between pt-2.5 mt-2 border-t border-slate-800/60 text-xs overflow-x-auto gap-3">
        <button
          onClick={() => { setActiveTab('feed'); haptics.tap(); }}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'feed' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          {t.nav_feed}
        </button>
        <button
          onClick={() => { setActiveTab('articles'); haptics.tap(); }}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'articles' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          {t.nav_articles}
        </button>
        <button
          onClick={() => { setActiveTab('trading'); haptics.tap(); }}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'trading' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          {t.nav_trading}
        </button>
        <button
          onClick={() => { setActiveTab('dms'); haptics.tap(); }}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'dms' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          {t.nav_dms}
        </button>
        <button
          onClick={() => { setActiveTab('wallet'); haptics.tap(); }}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'wallet' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'}`}
        >
          {t.nav_vault}
        </button>
      </div>
    </header>
  );
};
