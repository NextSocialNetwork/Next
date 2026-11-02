/**
 * Create Post & Decentralized Blog Publisher Modal
 * Signs payloads with local sovereign Ed25519 keys, calculates IPFS CIDs, and injects SEO tags.
 */

import React, { useState } from 'react';
import { X, Lock, Globe, FileText, Send, Sparkles } from 'lucide-react';
import { Post, SovereignIdentity } from '../../types';
import { signPayload, generateContentCid } from '../../services/crypto';
import { haptics } from '../../services/haptics';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newPost: Post) => void;
  identity: SovereignIdentity;
  onRequireBiometric: (title: string, details: string, callback: () => void) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  identity,
  onRequireBiometric
}) => {
  const [postType, setPostType] = useState<'micro' | 'blog'>('micro');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Post['category']>('Cryptography');
  const [tagsInput, setTagsInput] = useState('Decentralization, PrivacyTech');
  const [isEncrypted, setIsEncrypted] = useState(false);

  // Blog specific fields
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');

  if (!isOpen) return null;

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Trigger biometric authorization for publishing to decentralized network
    onRequireBiometric(
      `Sign & Broadcast ${postType === 'blog' ? 'Blog' : 'Post'}`,
      `Sign payload with ${identity.handle} (${identity.publicKey.slice(0, 10)}...)`,
      async () => {
        haptics.cryptoSign();
        const signature = await signPayload(content, identity.publicKey);
        const cid = await generateContentCid(content + Date.now());
        const tags = tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
        const slug = (blogTitle || content.slice(0, 30))
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const newPost: Post = {
          id: `post-${Date.now()}`,
          authorHandle: identity.handle,
          authorKey: identity.publicKey,
          content,
          timestamp: new Date().toISOString(),
          relativeTime: 'Just now',
          likes: 0,
          reposts: 0,
          tipsReceivedUsd: 0,
          signature,
          cid,
          isEncrypted,
          category,
          tags,
          slug,
          blogPost: postType === 'blog' ? {
            title: blogTitle || 'Decentralized Research Note',
            readTime: '3 min read',
            coverImage: '/src/assets/images/crypto_network_mesh_1793585630869.jpg',
            summary: blogSummary || content.slice(0, 120),
            fullMarkdown: `## ${blogTitle}\n\n${content}`,
            canonicalUrl: `https://nexus-zero.network/blog/${slug}`
          } : undefined,
          metrics: {
            nodeRelays: 12,
            encryptionCipher: isEncrypted ? 'AES-256-GCM + Ed25519' : 'Ed25519 Signed'
          }
        };

        onPublish(newPost);
        setContent('');
        setBlogTitle('');
        setBlogSummary('');
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0d121c] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm text-white">Broadcast to Decentralized Relay</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post Type Selector (Interactive button tabs) */}
        <div className="flex items-center gap-2 my-4 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => { setPostType('micro'); haptics.tap(); }}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
              postType === 'micro' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Micro-Post
          </button>
          <button
            type="button"
            onClick={() => { setPostType('blog'); haptics.tap(); }}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
              postType === 'blog' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            SEO Longform Article
          </button>
        </div>

        <form onSubmit={handlePublishSubmit} className="space-y-4 overflow-y-auto pr-1">
          {postType === 'blog' && (
            <>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Article Headline (SEO & Index Title)</label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. Asymmetric Cryptography and Zero-Knowledge Proofs in 2026"
                  className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Meta Description / Abstract</label>
                <input
                  type="text"
                  value={blogSummary}
                  onChange={(e) => setBlogSummary(e.target.value)}
                  placeholder="Brief synopsis for Google search snippets and OpenGraph card previews..."
                  className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              {postType === 'blog' ? 'Markdown Content' : 'Post Content'}
            </label>
            <textarea
              rows={postType === 'blog' ? 6 : 4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'blog'
                  ? '## Section Header\n\nDeep dive content with cryptographic proofs and analytical insights...'
                  : 'What is unfolding across your sovereign cryptographic node?'
              }
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none font-mono text-[13px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Taxonomy Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Post['category'])}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              >
                <option value="Cryptography">Cryptography</option>
                <option value="Market Alpha">Market Alpha</option>
                <option value="Privacy Tech">Privacy Tech</option>
                <option value="Decentralization">Decentralization</option>
                <option value="Econ Theory">Econ Theory</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ZeroKnowledge, Bitcoin, Privacy"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Privacy & Encryption selector */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEncrypted ? (
                <Lock className="w-4 h-4 text-cyan-400" />
              ) : (
                <Globe className="w-4 h-4 text-emerald-400" />
              )}
              <div>
                <div className="text-xs font-medium text-white">
                  {isEncrypted ? 'End-to-End Encrypted Relay' : 'Public Canonical (SEO Indexed)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isEncrypted ? 'Only peers with decryption key can read' : 'Open to search spiders and web indexers'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setIsEncrypted(!isEncrypted); haptics.tap(); }}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                isEncrypted ? 'bg-cyan-950/40 border-cyan-800 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {isEncrypted ? 'Encrypted' : 'Public'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-500">
              Author: <span className="text-emerald-400">{identity.handle}</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Biometric Sign & Broadcast</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
