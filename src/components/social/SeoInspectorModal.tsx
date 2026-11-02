/**
 * SEO & Decentralized Discovery Inspector Modal
 * Visualizes how NEXUS ZERO posts and blogs are seamlessly indexed by search engines
 * through canonical mirrors, Schema.org JSON-LD, OpenGraph cards, and IPFS CIDs.
 */

import React, { useState } from 'react';
import { X, Search, Globe, Code2, Share2, Check, FileText } from 'lucide-react';
import { Post } from '../../types';
import { haptics } from '../../services/haptics';

interface SeoInspectorModalProps {
  post: Post | null;
  onClose: () => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({ post, onClose }) => {
  const [activeTab, setActiveTab] = useState<'card' | 'jsonld' | 'meta' | 'decentralized'>('card');
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const blog = post.blogPost;
  const canonicalUrl = blog ? blog.canonicalUrl : `https://nexus-zero.network/p/${post.slug}`;
  const title = blog ? blog.title : post.content.slice(0, 70);
  const description = blog ? blog.summary : post.content;
  const imageUrl = blog?.coverImage || 'https://nexus-zero.network/assets/og-default.jpg';

  // Schema.org Structured Data (JSON-LD)
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': blog ? 'BlogPosting' : 'SocialMediaPosting',
    'headline': title,
    'description': description,
    'author': {
      '@type': 'Person',
      'name': post.authorHandle,
      'identifier': post.authorKey
    },
    'datePublished': post.timestamp,
    'mainEntityOfPage': canonicalUrl,
    'keywords': post.tags.join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'NEXUS ZERO Decentralized Network',
      'url': 'https://nexus-zero.network'
    },
    'storageCid': post.cid,
    'cryptographicSignature': post.signature
  };

  const copyJsonLd = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdData, null, 2));
    setCopied(true);
    haptics.tap();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-sm text-white">Decentralized SEO & Discovery Inspector</h3>
              <p className="text-xs text-slate-400">Canonical search indexing for privacy-first decentralized nodes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800/80 bg-[#090d14]/50 text-xs">
          <button
            onClick={() => { setActiveTab('card'); haptics.tap(); }}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'card' ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            OpenGraph Preview
          </button>
          <button
            onClick={() => { setActiveTab('jsonld'); haptics.tap(); }}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'jsonld' ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Schema.org JSON-LD
          </button>
          <button
            onClick={() => { setActiveTab('meta'); haptics.tap(); }}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'meta' ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Meta Tags & Head
          </button>
          <button
            onClick={() => { setActiveTab('decentralized'); haptics.tap(); }}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'decentralized' ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Decentralized Mirror
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'card' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Visual card rendered when this decentralized post is shared on X/Twitter, Discord, LinkedIn, or indexed by Google:
              </div>
              <div className="border border-slate-700/80 rounded-xl overflow-hidden bg-slate-900/90 shadow-lg">
                {blog?.coverImage ? (
                  <div className="h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={blog.coverImage}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 p-4 flex items-end">
                    <span className="font-mono text-xs text-emerald-400">nexus-zero.network</span>
                  </div>
                )}
                <div className="p-4 space-y-1.5">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">nexus-zero.network</div>
                  <h4 className="font-semibold text-white text-base leading-snug">{title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{description}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1 font-mono">
                <div className="text-slate-400">Canonical Slug: <span className="text-slate-200">/p/{post.slug}</span></div>
                <div className="text-slate-400">Content Hash (CID): <span className="text-cyan-400">{post.cid.slice(0, 28)}...</span></div>
              </div>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Rich Snippet Structured Data (schema.org)</span>
                <button
                  onClick={copyJsonLd}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                  {copied ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[12px] font-mono text-emerald-300/90 overflow-x-auto">
                {JSON.stringify(jsonLdData, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="text-slate-400 font-sans">Injected HTML Head Headers for Web Crawlers:</div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 space-y-2 overflow-x-auto">
                <div>&lt;title&gt;{title} | NEXUS ZERO&lt;/title&gt;</div>
                <div>&lt;meta name="description" content="{description.slice(0, 140)}..." /&gt;</div>
                <div>&lt;link rel="canonical" href="{canonicalUrl}" /&gt;</div>
                <div>&lt;meta property="og:title" content="{title}" /&gt;</div>
                <div>&lt;meta property="og:description" content="{description}" /&gt;</div>
                <div>&lt;meta property="og:image" content="{imageUrl}" /&gt;</div>
                <div>&lt;meta name="twitter:card" content="summary_large_image" /&gt;</div>
                <div>&lt;meta name="dht-cid" content="{post.cid}" /&gt;</div>
                <div>&lt;meta name="sig-ed25519" content="{post.signature}" /&gt;</div>
              </div>
            </div>
          )}

          {activeTab === 'decentralized' && (
            <div className="space-y-3 text-xs">
              <div className="text-slate-300">
                How NEXUS ZERO achieves public SEO discovery while preserving user anonymity:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-semibold text-emerald-400">Decentralized Relay Mirror</div>
                  <p className="text-slate-400">
                    Content is pinned to interplanetary content-addressed storage (IPFS / Arweave). Gateway nodes act as SEO crawlers without logging visitor IP addresses.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-semibold text-cyan-400">Cryptographic Non-Repudiation</div>
                  <p className="text-slate-400">
                    Search engines can verify the author's public key signature directly against the published text, guaranteeing the post was never tampered with in transit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
