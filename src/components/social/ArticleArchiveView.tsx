/**
 * 7,485 Google SEO-Friendly Decentralized Blog Archive View & Explorer
 * High-performance paginated blog catalog with Google Search snippet preview,
 * Schema.org BlogPosting JSON-LD inspection, XML Sitemap generator, and multi-language support.
 */

import React, { useState, useMemo } from 'react';
import { 
  getSeoArticlesPage, 
  generateArticleJsonLd, 
  generateSitemapPreview, 
  TOTAL_SEO_ARTICLES, 
  SeoArticle 
} from '../../services/articleCatalog';
import { haptics } from '../../services/haptics';
import { LanguageCode, TRANSLATIONS } from '../../services/i18n';
import { 
  Search, 
  FileText, 
  ArrowRight, 
  Globe, 
  Code2, 
  Check, 
  Coins, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  X
} from 'lucide-react';

interface ArticleArchiveViewProps {
  language: LanguageCode;
  onOpenArticle: (article: SeoArticle) => void;
  onTipArticle: (article: SeoArticle) => void;
}

export const ArticleArchiveView: React.FC<ArticleArchiveViewProps> = ({
  language,
  onOpenArticle,
  onTipArticle
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [selectedInspectArticle, setSelectedInspectArticle] = useState<SeoArticle | null>(null);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const categories = [
    'all',
    'Zero-Knowledge Cryptography',
    'Decentralized Social Networks',
    'Bitcoin Macro Economics',
    'Algorithmic Portfolio Rebalancing',
    'Self-Sovereign Identity Protocols',
    'Cross-Chain Atomic Settlement',
    'Censorship-Resistant Publishing'
  ];

  const { articles, totalPages, totalMatches } = useMemo(() => {
    return getSeoArticlesPage(currentPage, 12, searchQuery, selectedCategory);
  }, [currentPage, searchQuery, selectedCategory]);

  const sitemapData = useMemo(() => generateSitemapPreview(15), []);

  const handlePageChange = (newPage: number) => {
    haptics.tap();
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpPageInput('');
    }
  };

  const copySitemap = () => {
    navigator.clipboard.writeText(sitemapData.sampleXml);
    setCopiedSitemap(true);
    haptics.tap();
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner - Blog Friendly */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c101a] via-[#0e1320] to-[#07090e] border border-slate-800 p-3.5 sm:p-6 lg:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400 font-mono">
              <span className="text-emerald-400 font-semibold">https://NextSocialNetwork.Com/blog</span>
              <span aria-hidden="true">·</span>
              <span>Googlebot & Open Web Index</span>
            </div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight flex items-center gap-2.5 sm:gap-3">
              <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400 shrink-0" />
              <span>Next Blog: 7,485 SEO-Friendly Articles</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore 7,485 decentralized blog articles on cryptography, sovereign identity, Bitcoin macro economics, and autonomous finance. Formatted for effortless reading and instant Google search engine indexation.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 sm:gap-3 shrink-0 pt-1 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
            <button
              onClick={() => { setIsSitemapOpen(true); haptics.tap(); }}
              className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shadow-md shadow-emerald-950/20 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>{t.sitemap_btn}</span>
            </button>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
              Total Blog Corpus: <span className="text-emerald-400 font-bold tabular-nums">7,485 Articles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto text-xs no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); haptics.tap(); }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? t.all_channels : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder={t.search_placeholder}
            className="w-full pl-8 sm:pl-9 pr-3 py-1 sm:py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid of Blog Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {articles.map(article => (
          <article
            key={article.id}
            className="p-3.5 sm:p-5 bg-[#0c1018] border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3 shadow-md group"
          >
            <div className="space-y-2">
              {/* Unboxed Metadata Strip (Zero-Pill Discipline) */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-emerald-400 font-semibold">Post #{article.id}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300 truncate">{article.category}</span>
                </div>
                <span className="shrink-0">{article.readTime}</span>
              </div>

              {/* Title */}
              <h2
                onClick={() => onOpenArticle(article)}
                className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer leading-snug line-clamp-2"
              >
                {article.title}
              </h2>

              {/* Summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
              {/* Canonical URL preview for Googlebot */}
              <div className="text-[11px] font-mono text-slate-500 truncate" title={article.canonicalUrl}>
                {article.canonicalUrl.replace('https://', '')}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => { setSelectedInspectArticle(article); haptics.tap(); }}
                  className="font-mono text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>Google JSON-LD</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { onTipArticle(article); haptics.tap(); }}
                    className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Tip Author in Crypto"
                  >
                    <Coins className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenArticle(article)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="p-4 bg-[#0c1018] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="text-slate-400">
          Showing Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-emerald-400 font-bold">{totalPages}</span> ({totalMatches.toLocaleString()} blog posts)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder={`${currentPage}`}
              className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-center text-white text-xs focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
            >
              Go
            </button>
          </form>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Google Sitemap Modal */}
      {isSitemapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Google Search Console sitemap.xml</h3>
                  <p className="text-xs text-slate-400">Total 7,485 indexed canonical blog URLs</p>
                </div>
              </div>
              <button
                onClick={() => setIsSitemapOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target Sitemap Endpoint: <span className="text-emerald-400">{sitemapData.sitemapUrl}</span></span>
                <button
                  onClick={copySitemap}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
                >
                  {copiedSitemap ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                  <span>{copiedSitemap ? 'Copied' : 'Copy Sitemap'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-96">
                {sitemapData.sampleXml}
              </pre>

              <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white">Automated Googlebot Indexing Strategy</div>
                <p className="text-slate-400 leading-relaxed">
                  Every blog article published on Next (https://NextSocialNetwork.Com) is appended to the root sitemap. Search engine crawlers can index the full 7,485-article corpus without any visitor tracking or privacy compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JSON-LD Structured Data Inspector Modal */}
      {selectedInspectArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Schema.org BlogPosting JSON-LD (Post #{selectedInspectArticle.id})</h3>
                  <p className="text-xs text-slate-400">Google Rich Snippet Structured Data</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInspectArticle(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[12px] font-mono text-emerald-300/90 overflow-x-auto">
                {JSON.stringify(generateArticleJsonLd(selectedInspectArticle), null, 2)}
              </pre>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono space-y-1 text-slate-400">
                <div>Canonical URL: <span className="text-slate-200">{selectedInspectArticle.canonicalUrl}</span></div>
                <div>Storage CID: <span className="text-cyan-400">{selectedInspectArticle.cid}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
