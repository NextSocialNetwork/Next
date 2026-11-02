/**
 * Article Detail Reader Modal for any of the 2,896 SEO Articles
 * Renders full markdown research paper with canonical proof, Google rich snippet metadata, and crypto tipping.
 */

import React from 'react';
import { SeoArticle } from '../../services/articleCatalog';
import { X, Clock, ShieldCheck, Share2, Coins, Globe, Code2 } from 'lucide-react';
import { haptics } from '../../services/haptics';

interface ArticleDetailModalProps {
  article: SeoArticle | null;
  onClose: () => void;
  onTip: (article: SeoArticle) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onTip
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#090d14] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800/80 bg-[#07090e]/80">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold">{article.authorHandle}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Ed25519 Signed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { onTip(article); haptics.tap(); }}
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

        {/* Scrollable Paper Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metadata Strip (Strict Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400">Article #{article.id}</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">CID: {article.cid.slice(0, 16)}...</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Google Search Snippet Preview Box */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>https://NextSocialNetwork.Com &gt; articles &gt; #{article.id}</span>
            </div>
            <div className="text-sm font-semibold text-cyan-300 hover:underline cursor-pointer">
              {article.title} - Next Social Network
            </div>
            <div className="text-xs text-slate-300 font-sans">
              {article.metaDescription}
            </div>
          </div>

          {/* Abstract / Summary */}
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-sm sm:text-base text-slate-300 leading-relaxed italic">
            "{article.summary}"
          </div>

          {/* Markdown Paper Body */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
            {article.markdownContent.split('\n\n').map((paragraph, index) => {
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
              <div className="text-slate-500 uppercase tracking-wider text-[10px]">Canonical Google SEO URL</div>
              <div className="text-emerald-400 break-all">{article.canonicalUrl}</div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(article.canonicalUrl);
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
