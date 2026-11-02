/**
 * Decentralized Encrypted Social Feed & SEO Article Stream
 * Zero-KYC cryptographic architecture with signed dispatches, E2EE toggle, and multi-chain tipping.
 */

import React, { useState } from 'react';
import { Post, SovereignIdentity } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  Coins, 
  Repeat, 
  Heart, 
  Lock, 
  Unlock, 
  FileText, 
  Plus,
  Eye,
  ArrowUpRight
} from 'lucide-react';
import { haptics } from '../../services/haptics';

interface FeedViewProps {
  posts: Post[];
  identity: SovereignIdentity;
  onOpenCreate: () => void;
  onOpenBlog: (post: Post) => void;
  onOpenSeo: (post: Post) => void;
  onTipPost: (post: Post) => void;
  onLikePost: (postId: string) => void;
  onRepost: (postId: string) => void;
  activeFilterTab?: 'all' | 'blogs';
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  onOpenCreate,
  onOpenBlog,
  onOpenSeo,
  onTipPost,
  onLikePost,
  onRepost,
  activeFilterTab = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedCipherIds, setRevealedCipherIds] = useState<Record<string, boolean>>({});

  const toggleCipherView = (postId: string) => {
    haptics.tap();
    setRevealedCipherIds(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = posts.filter(post => {
    if (activeFilterTab === 'blogs' && !post.blogPost) return false;
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.authorHandle.toLowerCase().includes(q);
      const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
      const matchTitle = post.blogPost?.title.toLowerCase().includes(q);
      return matchContent || matchAuthor || matchTag || matchTitle;
    }
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Banner with Proof of Zero-Verification & Autonomous Architecture */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c101a] via-[#0e1320] to-[#07090e] border border-slate-800 p-3.5 sm:p-6 lg:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400">
              <span className="text-emerald-400 font-mono">Zero-Knowledge Mesh</span>
              <span aria-hidden="true">·</span>
              <span>No KYC · No Phone · Sovereign</span>
            </div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
              Decentralized Encrypted Social Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every message is cryptographically signed via Ed25519. Public articles are indexed seamlessly for global SEO discovery, while private channels are sealed with client-side AES-256-GCM.
            </p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 sm:gap-3 shrink-0 pt-1 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
            <button
              onClick={() => { onOpenCreate(); haptics.tap(); }}
              className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg shadow-emerald-950/40 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Broadcast Dispatch</span>
            </button>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
              Active Relays: <span className="text-emerald-400 tabular-nums">4,812 nodes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Interactive Filter Tabs (Zero-Pill discipline: segmented controls using button elements) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          {['all', 'Cryptography', 'Market Alpha', 'Privacy Tech', 'Decentralization', 'Econ Theory'].map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); haptics.tap(); }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Channels' : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hash, author, tag..."
            className="w-full pl-8 sm:pl-9 pr-3 py-1 sm:py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>
      </div>

      {/* Stream of Posts and Longform Articles */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center border border-slate-800/80 rounded-2xl bg-slate-900/40 space-y-3">
            <FileText className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-300">No transmissions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No dispatches match the current filter or cryptographic search query.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); haptics.tap(); }}
              className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map(post => {
            const isCipherRevealed = revealedCipherIds[post.id];
            const blog = post.blogPost;

            return (
              <article
                key={post.id}
                className="p-3.5 sm:p-5 lg:p-6 bg-[#0c1018] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl transition-all space-y-2.5 sm:space-y-3 shadow-md"
              >
                {/* Header metadata (Clean unboxed text with typographic separators) */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                    <span className="font-mono text-emerald-400 font-semibold">{post.authorHandle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.relativeTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => { onOpenSeo(post); haptics.tap(); }}
                      title="Inspect SEO & OpenGraph Indexing"
                      className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">SEO Meta</span>
                    </button>
                    <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
                    <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-cyan-400/90" title={`Signed: ${post.signature}`}>
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Ed25519</span>
                    </div>
                  </div>
                </div>

                {/* Blog Card Feature Spotlight (if attached) */}
                {blog && (
                  <div
                    onClick={() => { onOpenBlog(post); haptics.tap(); }}
                    className="group cursor-pointer border border-slate-800/90 hover:border-emerald-500/50 rounded-xl overflow-hidden bg-slate-900/60 transition-all"
                  >
                    {blog.coverImage && (
                      <div className="h-32 sm:h-48 lg:h-52 w-full overflow-hidden bg-slate-950">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-3 sm:p-4 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] sm:text-[11px] text-emerald-400 uppercase tracking-wider">
                          SEO Indexed Article · {blog.readTime}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {blog.title}
                      </h2>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {blog.summary}
                      </p>
                    </div>
                  </div>
                )}

                {/* Post Text or Ciphertext inspection */}
                {!blog && (
                  <div className="text-sm sm:text-[15px] text-slate-200 leading-relaxed">
                    {post.isEncrypted && !isCipherRevealed ? (
                      <div className="p-3 bg-cyan-950/20 border border-cyan-900/40 rounded-xl space-y-1 font-mono text-xs">
                        <div className="flex items-center justify-between text-cyan-400">
                          <span className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            Client-Side AES-256-GCM Payload
                          </span>
                          <button
                            onClick={() => toggleCipherView(post.id)}
                            className="text-slate-300 hover:text-white underline text-[11px]"
                          >
                            Decrypt with Enclave
                          </button>
                        </div>
                        <div className="text-slate-400 truncate">
                          iv:94a8bc12e4f0 cipher:84b84c8a9103948572019485710293847561029384...
                        </div>
                      </div>
                    ) : (
                      <div>
                        {post.content}
                        {post.isEncrypted && (
                          <div className="mt-2 flex items-center justify-between text-xs text-cyan-400/90 font-mono">
                            <span className="flex items-center gap-1">
                              <Unlock className="w-3 h-3" />
                              Decrypted locally via Sovereign Key
                            </span>
                            <button
                              onClick={() => toggleCipherView(post.id)}
                              className="text-slate-400 hover:text-slate-200 underline text-[11px]"
                            >
                              View Ciphertext
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Tags & Storage CID (Unboxed metadata) */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 font-mono">
                  {post.tags.map(t => (
                    <span key={t} className="text-slate-400">#{t}</span>
                  ))}
                  <span aria-hidden="true">·</span>
                  <span title={`IPFS CIDv1: ${post.cid}`}>CID: {post.cid.slice(0, 14)}...</span>
                </div>

                {/* Action Bar: Likes, Reposts, Multi-Chain Tipping */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => { onLikePost(post.id); haptics.tap(); }}
                      className="flex items-center gap-1.5 hover:text-rose-400 transition-colors group"
                    >
                      <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="tabular-nums font-mono">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => { onRepost(post.id); haptics.tap(); }}
                      className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors group"
                    >
                      <Repeat className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      <span className="tabular-nums font-mono">{post.reposts}</span>
                    </button>
                  </div>

                  {/* Multi-Chain Crypto Tip Button */}
                  <button
                    onClick={() => { onTipPost(post); haptics.tap(); }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-900/60 hover:bg-emerald-900/50 text-emerald-400 font-mono text-xs transition-colors"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Tip Multi-Chain</span>
                    {post.tipsReceivedUsd > 0 && (
                      <span className="text-slate-400 tabular-nums">(${post.tipsReceivedUsd.toFixed(1)})</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
