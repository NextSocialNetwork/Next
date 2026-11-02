/**
 * Longform Decentralized Blog View Modal
 * Renders full markdown research articles with cryptographic author proof and micro-tipping.
 */

import React from 'react';
import { X, Clock, ShieldCheck, Share2, Coins, Search } from 'lucide-react';
import { Post } from '../../types';
import { haptics } from '../../services/haptics';

interface BlogDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onTip: (post: Post) => void;
  onOpenSeo: (post: Post) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose,
  onTip,
  onOpenSeo
}) => {
  if (!post || !post.blogPost) return null;

  const blog = post.blogPost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#090d14] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800/80 bg-[#07090e]/80">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-mono text-emerald-400">{post.authorHandle}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Verified Signature
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { onOpenSeo(post); haptics.tap(); }}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>SEO Meta</span>
            </button>
            <button
              onClick={() => { onTip(post); haptics.tap(); }}
              className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-slate-900" />
              <span>Tip Multi-Chain</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
              <img
                src={blog.coverImage}
                alt={blog.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Metadata strip (Strict Zero-Pill Discipline: unboxed text with typographic separators) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.relativeTime}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-500">CID: {post.cid.slice(0, 16)}...</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Lead Summary */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-sm sm:text-base text-slate-300 leading-relaxed italic">
            "{blog.summary}"
          </div>

          {/* Rendered content */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
            {blog.fullMarkdown.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-bold text-white pt-4 pb-1 border-b border-slate-800">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-slate-100 pt-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Canonical Proof Box */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div>
              <div className="text-slate-500 uppercase tracking-wider text-[10px]">Canonical Decentralized Address</div>
              <div className="text-emerald-400 break-all">{blog.canonicalUrl}</div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(blog.canonicalUrl);
                  haptics.tap();
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share URL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
