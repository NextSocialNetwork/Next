/**
 * Type definitions for NEXUS ZERO
 */

export interface SovereignIdentity {
  publicKey: string; // e.g. 0x4f8a...c912
  handle: string; // e.g. @zero_cipher
  keyFingerprint: string; // e.g. SHA256:8b4f...
  mnemonic: string[]; // 12-word seed phrase
  createdAt: string;
  avatarSeed: string;
  reputationProof: string; // Zero-knowledge proof score hash
  biometricsEnrolled: boolean;
  algorithm: 'Ed25519 + Curve25519 (ECDH)' | 'Secp256k1 + AES-256-GCM';
}

export interface Post {
  id: string;
  authorHandle: string;
  authorKey: string;
  content: string;
  timestamp: string;
  relativeTime: string;
  likes: number;
  reposts: number;
  tipsReceivedUsd: number;
  signature: string; // Cryptographic signature of payload
  cid: string; // IPFS / Arweave decentralized storage CID
  isEncrypted: boolean;
  category: 'Cryptography' | 'Market Alpha' | 'Decentralization' | 'Privacy Tech' | 'Econ Theory';
  tags: string[];
  slug: string;
  blogPost?: {
    title: string;
    readTime: string;
    coverImage: string;
    summary: string;
    fullMarkdown: string;
    canonicalUrl: string;
  };
  metrics?: {
    nodeRelays: number;
    encryptionCipher: string;
  };
}

export interface DirectMessage {
  id: string;
  senderHandle: string;
  senderKey: string;
  recipientKey: string;
  timestamp: string;
  encryptedPayload: string; // aes-gcm:iv:cipher
  decryptedContent: string;
  isSelf: boolean;
  deliveredViaNode: string;
}

export interface MultiChainAsset {
  symbol: string;
  name: string;
  chain: 'Bitcoin' | 'Ethereum' | 'Solana' | 'Polygon' | 'Cosmos' | 'Arbitrum';
  chainIconColor: string;
  balance: number;
  priceUsd: number;
  change24h: number;
  address: string;
  isStock?: boolean;
}

export interface MarketTicker {
  symbol: string;
  name: string;
  category: 'Crypto' | 'Stock';
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  marketCap: string;
  volatilityIndex: number;
  priceHistory: number[]; // Sparkline data
  candles: Candle[];
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface VolatilityAlert {
  id: string;
  symbol: string;
  triggerType: 'spike' | 'dump' | 'breakout' | 'whale';
  message: string;
  deltaPercent: number;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TradeOrder {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  amount: number;
  price: number;
  totalUsd: number;
  timestamp: string;
  status: 'executed' | 'pending' | 'canceled';
  txHash: string;
}
