/**
 * Decentralized Network Topology & Scalability Architecture Modal
 * Displays DHT sharding, peer consensus, and zero-telemetry sovereign audits.
 */

import React from 'react';
import { X, Network, Server, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

interface NetworkTopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkTopologyModal: React.FC<NetworkTopologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const relays = [
    { region: 'US-West Enclave', latency: '18ms', peers: 1240, status: 'Active Relay' },
    { region: 'EU-Central Cluster', latency: '24ms', peers: 1890, status: 'Active Relay' },
    { region: 'Asia-East Matrix', latency: '35ms', peers: 1180, status: 'Active Relay' },
    { region: 'P2P Gossip Mesh', latency: '12ms', peers: 502, status: 'Active Relay' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c1018] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d14]">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-sm text-white">Scalable Decentralized Architecture</h3>
              <p className="text-xs text-slate-400">Sharded DHT & Zero-Telemetry Sovereign Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Scalability Architecture Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Millions Scalability</span>
              </div>
              <p className="text-xs text-slate-400">
                Logarithmic $O(\log N)$ DHT routing routes messages across millions of concurrent users without centralized bottlenecks.
              </p>
            </div>
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-semibold">
                <HardDrive className="w-3.5 h-3.5" />
                <span>Content Addressed</span>
              </div>
              <p className="text-xs text-slate-400">
                All blogs and feeds use cryptographic CIDs. Data is permanently cached and replicated across independent storage relays.
              </p>
            </div>
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Telemetry</span>
              </div>
              <p className="text-xs text-slate-400">
                No Google Analytics, no tracking scripts, no cloud logs. Zero IP recording on relay gossip hops.
              </p>
            </div>
          </div>

          {/* Live Relay Cluster Table */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Federated DHT Relay Clusters
            </div>
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 divide-y divide-slate-800 text-xs font-mono">
              <div className="grid grid-cols-12 p-3 bg-slate-950/80 text-slate-500 text-[11px]">
                <span className="col-span-5">Cluster Node</span>
                <span className="col-span-3 text-right">Relay Latency</span>
                <span className="col-span-4 text-right">Active Peers</span>
              </div>
              {relays.map(r => (
                <div key={r.region} className="grid grid-cols-12 p-3 items-center hover:bg-slate-800/30 transition-colors">
                  <span className="col-span-5 font-semibold text-slate-200 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-emerald-400" />
                    {r.region}
                  </span>
                  <span className="col-span-3 text-right text-emerald-400 tabular-nums">{r.latency}</span>
                  <span className="col-span-4 text-right text-slate-300 tabular-nums">{r.peers.toLocaleString()} nodes</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Invariants Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
            <div className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographic Invariants & Client Audits</span>
            </div>
            <ul className="space-y-1 text-slate-400 font-mono text-[11px] list-disc list-inside">
              <li>SubtleCrypto Curve25519 Ephemeral ECDH handshakes on all DMs</li>
              <li>Ed25519 digital signature validation on all incoming public posts</li>
              <li>Hardware-level biometric passkey signature on every financial transaction</li>
              <li>Pure browser execution: zero remote telemetry or server database requirement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
