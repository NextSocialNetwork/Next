/**
 * Comprehensive Google SEO-Friendly Footer for Next (https://NextSocialNetwork.Com)
 * Implements 4 structured link columns with canonical schema, whitepapers,
 * zero-KYC policies, robots.txt directives, and 7,485 decentralized blog articles.
 */

import React from 'react';
import { Shield, Globe, FileText, Lock, Cpu, Coins, Search, ExternalLink, BookOpen } from 'lucide-react';
import { haptics } from '../../services/haptics';
import { LanguageCode, TRANSLATIONS } from '../../services/i18n';
import { FooterPageId } from '../footer/SeoFooterPagesModal';

interface FooterProps {
  language: LanguageCode;
  onNavigateTab: (tab: 'feed' | 'articles' | 'blogs' | 'dms' | 'trading' | 'wallet') => void;
  onOpenTopology: () => void;
  onOpenIdentity: () => void;
  onOpenFooterPage: (pageId: FooterPageId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateTab,
  onOpenTopology,
  onOpenIdentity,
  onOpenFooterPage
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main 4-Column Grid for Google SEO Discovery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: 7,485 Blog & SEO Research Hub */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>7,485 Blog & SEO Hub</span>
            </div>
            <ul className="space-y-2 text-[12px] font-mono">
              <li>
                <button
                  onClick={() => { onNavigateTab('articles'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>Next Blog Directory</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-900/60">7,485 Posts</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('google_sitemap_xml'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Google Sitemap (sitemap.xml)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('robots_txt'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Crawler Directives (robots.txt)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('zk_cryptography'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Zero-Knowledge Proof Whitepaper
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('bitcoin_macro'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Bitcoin Macro & Liquidity Economics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Decentralized Protocol & Topology */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Decentralized Protocol</span>
            </div>
            <ul className="space-y-2 text-[12px] font-mono">
              <li>
                <button
                  onClick={() => { onOpenFooterPage('protocol_specs'); haptics.tap(); }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Next Protocol Specs v2.6
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenTopology(); haptics.tap(); }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  DHT Relay Mesh Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigateTab('dms'); haptics.tap(); }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AES-256-GCM Direct Messaging
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('sovereign_identity'); haptics.tap(); }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  WebAuthn Biometric Enclaves
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenIdentity(); haptics.tap(); }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  12-Word Mnemonic Vault Keys
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Financial Autonomy & Markets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Financial Autonomy</span>
            </div>
            <ul className="space-y-2 text-[12px] font-mono">
              <li>
                <button
                  onClick={() => { onNavigateTab('trading'); haptics.tap(); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Real-Time Bitcoin (BTC/USD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigateTab('trading'); haptics.tap(); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Equities Tokens (MSTR, NVDA, TSLA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('portfolio_models'); haptics.tap(); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Algorithmic Trend Rebalancer
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigateTab('wallet'); haptics.tap(); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Multi-Chain Non-Custodial Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigateTab('feed'); haptics.tap(); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  0% Fee Peer-to-Peer Micro-Tips
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign Compliance & Privacy Guarantees */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy & Sovereignty</span>
            </div>
            <ul className="space-y-2 text-[12px] font-mono">
              <li>
                <button
                  onClick={() => { onOpenFooterPage('zero_kyc_policy'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center justify-between w-full"
                >
                  <span>Zero-KYC Policy</span>
                  <span className="text-[10px] text-emerald-400">Guaranteed</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('privacy_zero_telemetry'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Zero-Telemetry & No Logs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('sovereign_identity'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Client-Side Data Sovereignty
                </button>
              </li>
              <li>
                <a
                  href="https://NextSocialNetwork.Com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1"
                >
                  <span>NextSocialNetwork.Com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => { onOpenFooterPage('protocol_specs'); haptics.tap(); }}
                  className="hover:text-emerald-400 transition-colors text-left text-slate-500"
                >
                  Open Cryptographic Standard
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Canonical Domain & Schema Compliance */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span className="font-bold text-slate-300">Next</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">https://NextSocialNetwork.Com</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer_tagline}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Googlebot Verified</span>
            <span aria-hidden="true">·</span>
            <span>7,485 Blog Posts</span>
            <span aria-hidden="true">·</span>
            <span>Schema.org JSON-LD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
