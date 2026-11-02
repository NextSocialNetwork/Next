/**
 * Google SEO-Friendly Footer Documentation & Protocol Pages Modal
 * Renders structured documentation pages for Googlebot indexing, zero-KYC policies,
 * robots.txt directives, and cryptographic specifications.
 */

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Globe, 
  Code2, 
  Share2, 
  Check, 
  Lock, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { haptics } from '../../services/haptics';

export type FooterPageId = 
  | 'zero_kyc_policy'
  | 'privacy_zero_telemetry'
  | 'robots_txt'
  | 'google_sitemap_xml'
  | 'protocol_specs'
  | 'zk_cryptography'
  | 'bitcoin_macro'
  | 'portfolio_models'
  | 'sovereign_identity';

interface SeoFooterPagesModalProps {
  pageId: FooterPageId | null;
  onClose: () => void;
}

interface PageData {
  title: string;
  category: string;
  canonicalUrl: string;
  metaDescription: string;
  content: string;
  schemaType: string;
}

const FOOTER_PAGES: Record<FooterPageId, PageData> = {
  zero_kyc_policy: {
    title: 'Zero-KYC Policy & Mathematical Anonymity Guarantee',
    category: 'Legal & Sovereignty',
    canonicalUrl: 'https://NextSocialNetwork.Com/legal/zero-kyc-policy',
    metaDescription: 'Next (https://NextSocialNetwork.Com) enforces a mathematical Zero-KYC policy. No government identity cards, phone numbers, or emails are ever harvested.',
    schemaType: 'DigitalDocument',
    content: `## 1. Absolute Prohibition of Identity Harvesting
Next operates under a strict mathematical non-custodial standard. The network does not, cannot, and will never request:
- Government passports or national ID cards
- Phone numbers or SMS verification OTPs
- Email addresses or centralized OAuth accounts
- Residential addresses or utility statements

## 2. Cryptographic Proof of Authority
Identity on Next is established entirely through client-side asymmetric cryptography. Users derive their sovereign handle and public key from a 12-word BIP39 mnemonic phrase generated in browser memory via native Web Crypto SubtleCrypto.

## 3. Google SEO Indexability without Personal Data
Public posts, technical whitepapers, and the 2,896 decentralized articles are indexed by Googlebot via canonical metadata and Schema.org markup without collecting visitor IP addresses or tracking cookies.`
  },
  privacy_zero_telemetry: {
    title: 'Privacy Architecture & Zero-Telemetry Audit',
    category: 'Privacy Tech',
    canonicalUrl: 'https://NextSocialNetwork.Com/privacy/zero-telemetry-audit',
    metaDescription: 'Next runs pure client-side cryptography. Zero tracking cookies, zero analytics pixels, and zero IP logging on federated DHT relays.',
    schemaType: 'SecurityPolicy',
    content: `## 1. The Zero-Telemetry Covenant
Unlike traditional social networks that monetize behavioural surveillance, Next has zero trackers, zero tracking pixels, and zero centralized database requirements.

## 2. In-Memory Cryptographic Execution
- **SubtleCrypto AES-256-GCM**: Direct messages are encrypted locally before transmission.
- **Ed25519 Digital Signatures**: Public articles are signed with client keys for tamper-evident verification.
- **WebAuthn Biometric Passkeys**: Hardware enclaves confirm transactions without exposing private seed keys to the DOM.

## 3. Relay Mesh Privacy
Relay hops utilize onion routing principles. Intermediary nodes observe only content-addressed hashes (CIDs), with zero logging of originating network addresses.`
  },
  robots_txt: {
    title: 'Googlebot Crawler Directives (robots.txt)',
    category: 'SEO Infrastructure',
    canonicalUrl: 'https://NextSocialNetwork.Com/robots.txt',
    metaDescription: 'Crawler directives for Next (https://NextSocialNetwork.Com) enabling Googlebot, Bingbot, and open search spiders to index 2,896 sovereign articles.',
    schemaType: 'TechnicalFile',
    content: `## Next Robots.txt Specification

\`\`\`txt
# robots.txt for https://NextSocialNetwork.Com
User-agent: Googlebot
Allow: /
Allow: /articles/
Allow: /blog/
Allow: /sitemap.xml
Disallow: /dms/
Disallow: /vault/private/

User-agent: Bingbot
Allow: /
Allow: /articles/

User-agent: *
Allow: /
Disallow: /dms/

Sitemap: https://NextSocialNetwork.Com/sitemap.xml
\`\`\`

### Explanation for Google Search Console
This file instructs web crawlers that all public research articles (1 through 2,896) are fully accessible for indexing, while private E2EE direct messages and non-custodial asset keys are protected from search spiders.`
  },
  google_sitemap_xml: {
    title: 'Google Search Console XML Sitemap Protocol',
    category: 'SEO Infrastructure',
    canonicalUrl: 'https://NextSocialNetwork.Com/sitemap.xml',
    metaDescription: 'Complete XML sitemap indexing all 2,896 Google SEO-friendly decentralized articles on Next Social Network.',
    schemaType: 'WebApplication',
    content: `## Google Search Console Sitemap Integration

The Next sitemap indexes **2,896 canonical URLs** across decentralized research disciplines. Each URL includes:
- \`<loc>\`: Full canonical HTTPS address
- \`<lastmod>\`: ISO 8601 published timestamp
- \`<changefreq>\`: Weekly updates
- \`<priority>\`: 0.8 to 1.0 based on citation density

### Verifiable Schema Integration
All sitemap URLs output valid **Schema.org/TechArticle** structured JSON-LD with:
- Author cryptographic handle & public key
- Content-addressed storage CID
- Canonical link rel tag
- Google OpenGraph social card previews`
  },
  protocol_specs: {
    title: 'Next Decentralized Protocol Specifications',
    category: 'Core Architecture',
    canonicalUrl: 'https://NextSocialNetwork.Com/protocol/specs',
    metaDescription: 'Complete technical specifications for the Next decentralized encrypted social network and sovereign trading engine.',
    schemaType: 'TechnicalSpecification',
    content: `## Technical Specification v2.6

### 1. Network Layer (DHT Relay Mesh)
- **Topology**: Federated Distributed Hash Table with Kademlia routing metric.
- **Addressing**: IPFS CIDv1 (SHA-256 multihash).
- **Scalability**: $O(\\log N)$ message complexity for millions of concurrent active peers.

### 2. Encryption Layer
- **Symmetric Cipher**: AES-256-GCM with 96-bit random IV per payload.
- **Key Exchange**: Ephemeral Curve25519 Diffie-Hellman (ECDH).
- **Public Feed Authentication**: Ed25519 digital signatures.

### 3. Financial Settlement
- **Bitcoin**: Native SegWit (bech32) & Lightning HTLC routing.
- **Equities Synthetic Tokens**: Tokenized representations of MSTR, NVDA, TSLA on Layer-2 rollups.
- **Order Execution**: Biometrically authorized atomic swaps with zero slippage.`
  },
  zk_cryptography: {
    title: 'Zero-Knowledge Cryptography Research Whitepaper',
    category: 'Research Whitepapers',
    canonicalUrl: 'https://NextSocialNetwork.Com/research/zk-cryptography',
    metaDescription: 'Mathematical foundations of zero-knowledge proofs (zk-SNARKs) in autonomous sovereign communication networks.',
    schemaType: 'ScholarlyArticle',
    content: `## Zero-Knowledge Proofs in Decentralized Social Networks

Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) enable a prover to mathematically demonstrate possession of a valid state transition without revealing the witness.

### Applications on Next:
1. **Sybil Resistance**: Proof of uniqueness without KYC identity disclosure.
2. **Reputation Proofs**: Users authenticate participation scores without revealing transaction history.
3. **Private Group Membership**: Cryptographic inclusion proofs via Merkle trees.`
  },
  bitcoin_macro: {
    title: 'Bitcoin Macro Economics & Autonomous Liquidity',
    category: 'Research Whitepapers',
    canonicalUrl: 'https://NextSocialNetwork.Com/research/bitcoin-macro',
    metaDescription: 'Analyzing Bitcoin as the apex sovereign collateral asset in non-custodial decentralized networks.',
    schemaType: 'ScholarlyArticle',
    content: `## The Hard Money Standard for Web Platforms

Traditional web applications rely on banking intermediaries with high fees, transaction chargebacks, and political censorship risks.

### The Next Multi-Chain Architecture
Next integrates Bitcoin as the foundational reserve asset:
- Direct Lightning Network micro-tipping on feed posts.
- Cross-chain atomic liquidity pools for instant Bitcoin-to-Stock token rebalancing.
- Hardware passkey protection guaranteeing unforgeable custody.`
  },
  portfolio_models: {
    title: 'Algorithmic Portfolio Rebalancing Models',
    category: 'Quantitative Finance',
    canonicalUrl: 'https://NextSocialNetwork.Com/research/portfolio-models',
    metaDescription: 'Quantitative trend analysis, volatility expansion metrics, and automated rebalancing models on Next.',
    schemaType: 'ScholarlyArticle',
    content: `## Quantitative Rebalancing Strategies

Our local client-side trend analysis calculates real-time portfolio drift:

1. **Hyper-Alpha (50% BTC, 20% SOL, 15% MSTR, 10% NVDA, 5% ETH)**: Momentum capture model for volatile expansion regimes.
2. **Balanced Core (40% BTC, 25% ETH, 15% NVDA, 10% SOL, 10% ARB)**: Macro diversified core with equity growth exposure.
3. **Hard Money Vault (60% BTC, 20% ETH, 20% Alt)**: Conservative wealth preservation model with non-custodial cold storage.`
  },
  sovereign_identity: {
    title: 'Self-Sovereign Identity Protocols & WebAuthn Enclaves',
    category: 'Security Standards',
    canonicalUrl: 'https://NextSocialNetwork.Com/research/sovereign-identity',
    metaDescription: 'Hardware-level biometric signing using WebAuthn FIDO2 passkeys for zero-knowledge transaction authorization.',
    schemaType: 'ScholarlyArticle',
    content: `## Hardware Enclave Sovereign Security

Next bridges web browsers with device hardware security modules (Apple Secure Enclave, Android StrongBox, Titan M2).

### Security Invariants:
- Private keys never touch JavaScript strings in unencrypted form.
- Biometric scans (Touch ID, Face ID) release cryptographic signatures directly at the hardware layer.
- Master seed words can only be unmasked after successful biometric verification.`
  }
};

export const SeoFooterPagesModal: React.FC<SeoFooterPagesModalProps> = ({
  pageId,
  onClose
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!pageId || !FOOTER_PAGES[pageId]) return null;

  const page = FOOTER_PAGES[pageId];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(page.canonicalUrl);
    setCopiedUrl(true);
    haptics.tap();
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#090d14] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#07090e]/90">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">{page.category}</div>
              <h3 className="font-bold text-sm text-white">{page.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyUrl}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors font-mono"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied' : 'Share URL'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Canonical Google SEO Bar */}
          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Canonical URL:</span>
              <span className="text-emerald-300">{page.canonicalUrl}</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Schema Type: <span className="text-cyan-400">{page.schemaType}</span> · Indexed for Googlebot
            </div>
          </div>

          {/* Rendered content */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed font-sans">
            {page.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-bold text-white pt-3 pb-1 border-b border-slate-800">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-base font-semibold text-slate-100 pt-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                return (
                  <pre key={index} className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
                    {paragraph.replace(/```[a-z]*\n?/g, '')}
                  </pre>
                );
              }
              return (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Google Search Snippet Preview Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs font-mono">
            <div className="text-slate-500 uppercase text-[10px]">Google Search Result Appearance</div>
            <div className="text-cyan-400 text-sm font-semibold">{page.title} - Next Social Network</div>
            <div className="text-emerald-400/80 text-[11px]">{page.canonicalUrl}</div>
            <div className="text-slate-400 text-xs font-sans mt-0.5">{page.metaDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
