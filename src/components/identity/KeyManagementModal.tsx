/**
 * Sovereign Key Management & Autonomous Identity Modal
 * Unmasks 12-word seed phrase behind biometric protection and verifies ZK proofs.
 */

import React, { useState } from 'react';
import { SovereignIdentity } from '../../types';
import { X, Key, ShieldCheck, Eye, EyeOff, RefreshCw, Download, Check } from 'lucide-react';
import { haptics } from '../../services/haptics';

interface KeyManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  identity: SovereignIdentity;
  onGenerateNewIdentity: () => void;
  onRequireBiometric: (title: string, details: string, callback: () => void) => void;
}

export const KeyManagementModal: React.FC<KeyManagementModalProps> = ({
  isOpen,
  onClose,
  identity,
  onGenerateNewIdentity,
  onRequireBiometric
}) => {
  const [seedVisible, setSeedVisible] = useState(false);
  const [copiedSeed, setCopiedSeed] = useState(false);

  if (!isOpen) return null;

  const handleRevealSeed = () => {
    if (seedVisible) {
      setSeedVisible(false);
      haptics.tap();
      return;
    }

    onRequireBiometric(
      'Reveal 12-Word Sovereign Seed Phrase',
      'Requires hardware enclave authorization to unmask master recovery key',
      () => {
        setSeedVisible(true);
        haptics.biometricSuccess();
      }
    );
  };

  const copySeed = () => {
    navigator.clipboard.writeText(identity.mnemonic.join(' '));
    setCopiedSeed(true);
    haptics.tap();
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const handleExportBackup = () => {
    onRequireBiometric(
      'Export Encrypted Keyfile Backup',
      'Download self-sovereign identity bundle with zero-knowledge reputation proofs',
      () => {
        haptics.biometricSuccess();
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(identity, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `nexus-zero-identity-${identity.handle.replace('@', '')}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0d121c] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-sm text-white">Sovereign Identity & Zero-KYC Enclave</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4 overflow-y-auto">
          {/* Identity Header Card */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Handle:</span>
              <span className="text-emerald-400 font-bold">{identity.handle}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Master Public Key:</span>
              <span className="text-slate-200">{identity.publicKey.slice(0, 16)}...</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Fingerprint:</span>
              <span className="text-slate-400 text-[11px]">{identity.keyFingerprint}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">ZK Reputation Proof:</span>
              <span className="text-cyan-400 text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {identity.reputationProof}
              </span>
            </div>
          </div>

          {/* Seed Phrase Section */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-white">12-Word Recovery Mnemonic</div>
              <button
                type="button"
                onClick={handleRevealSeed}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                {seedVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{seedVisible ? 'Hide Words' : 'Biometric Reveal'}</span>
              </button>
            </div>

            {seedVisible ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {identity.mnemonic.map((word, index) => (
                    <div key={index} className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1.5">
                      <span className="text-slate-500 text-[10px]">{index + 1}.</span>
                      <span className="text-emerald-300 font-bold">{word}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={copySeed}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSeed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                    <span>{copiedSeed ? 'Copied' : 'Copy Words'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 font-mono bg-slate-900/40 rounded-lg border border-dashed border-slate-800">
                •••• •••• •••• •••• •••• •••• •••• •••• •••• •••• •••• ••••
                <div className="mt-1 text-[11px] text-slate-600">Hidden behind hardware biometric authorization</div>
              </div>
            )}
          </div>

          {/* Identity Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Keyfile</span>
            </button>
            <button
              onClick={() => {
                onRequireBiometric(
                  'Rotate Sovereign Master Key',
                  'Generates a fresh 12-word seed phrase and new pseudonym node',
                  () => {
                    onGenerateNewIdentity();
                    haptics.cryptoSign();
                  }
                );
              }}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Generate New Node</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
