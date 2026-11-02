/**
 * Initial Seed Data for NEXUS ZERO
 * Feeds, SEO-friendly Blogs, Cryptographic Signatures, and E2EE Messages.
 */

import { DirectMessage, Post } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-101',
    authorHandle: '@cipher_architect',
    authorKey: '0x8f43a9b12d50e823',
    content: 'Decentralized social networks do not need your government ID, email address, or phone number. Mathematical keypairs guarantee identity sovereignty without centralized censorship. Every message signed, every record permanent.',
    timestamp: '2026-11-01T17:42:00Z',
    relativeTime: '12m ago',
    likes: 142,
    reposts: 48,
    tipsReceivedUsd: 185.50,
    signature: 'sig:ed25519:7b49ef821d30c9a87123bf01824d56789a',
    cid: 'bafyreibq2j5w6d4f9s1t8y3u7i0o2p4a6s8d9f1g3h5j7k9l2z4x6c8v',
    isEncrypted: false,
    category: 'Cryptography',
    tags: ['ZeroKnowledge', 'PrivacyTech', 'DecentralizedWeb'],
    slug: 'mathematical-keypairs-guarantee-sovereignty',
    blogPost: {
      title: 'The Zero-Knowledge Future: Beyond Identity Verifications and Centralized KYC',
      readTime: '6 min read',
      coverImage: '/src/assets/images/crypto_network_mesh_1793585630869.jpg',
      summary: 'Why zero-knowledge proofs and asymmetric cryptography render corporate identity harvesting obsolete for decentralized social systems and financial autonomous rails.',
      canonicalUrl: 'https://nexus-zero.network/blog/zero-knowledge-future-beyond-kyc',
      fullMarkdown: `## The Fallacy of Centralized Identity Verification

For two decades, web platforms enforced a false dichotomy: either users surrender government passports, phone numbers, and facial biometrics to corporate databases, or civil communication collapses under spam.

**NEXUS ZERO demonstrates an alternative architecture:**
1. **Mathematical Proof of Personhood**: Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) verify that an actor represents a unique cryptographic entity without disclosing private telemetry.
2. **End-to-End Cryptographic Signatures**: Every public dispatch and blog post is signed with an elliptic curve key (Ed25519), providing cryptographic non-repudiation.
3. **Decentralized Storage**: Data payloads are distributed across immutable content-addressed storage (IPFS / Arweave CIDs), meaning no single server can erase history.

### Eliminating KYC from Financial Autonomy
When combined with multi-chain smart contracts and Bitcoin Lightning settlement, creators receive direct micro-tips without intermediary payment gateways taking 30% cuts or arbitrarily freezing accounts. Sovereign identity is not a privilege granted by an authority—it is an innate mathematical truth.`
    },
    metrics: {
      nodeRelays: 1428,
      encryptionCipher: 'Ed25519 ECDSA'
    }
  },
  {
    id: 'post-102',
    authorHandle: '@macro_quant',
    authorKey: '0x3c99e17b84f09231',
    content: 'Bitcoin holding firm above $89,000 as equities volatility index cools down. Our automated trend rebalancer triggered an automatic 8% reallocation from tech stocks into spot BTC ahead of the weekly close.',
    timestamp: '2026-11-01T17:15:00Z',
    relativeTime: '38m ago',
    likes: 89,
    reposts: 26,
    tipsReceivedUsd: 94.20,
    signature: 'sig:ed25519:3c8f10294dae5927c918342718294aef91c8',
    cid: 'bafyreia789bcdef1234567890abcdef1234567890abcdef1234567',
    isEncrypted: false,
    category: 'Market Alpha',
    tags: ['Bitcoin', 'QuantTrading', 'PortfolioRebalance'],
    slug: 'bitcoin-holding-firm-automated-trend-rebalancer',
    blogPost: {
      title: 'Autonomous Liquidity: Real-Time Bitcoin Portfolio Balancing in Volatile Regimes',
      readTime: '4 min read',
      coverImage: '/src/assets/images/market_trading_visual_1793585632119.jpg',
      summary: 'How algorithmic volatility triggers and cross-asset smart rebalancing enable non-custodial traders to exploit rapid market regimes without human emotional bias.',
      canonicalUrl: 'https://nexus-zero.network/blog/autonomous-liquidity-bitcoin-portfolio-balancing',
      fullMarkdown: `## Managing Volatility in 24/7 Global Markets

Traditional portfolio management relies on quarterly rebalancing intervals dictated by broker banking hours. In decentralized markets, volatility events unfold in minutes.

### The NEXUS Trend Analysis Architecture
Our local client-side analytics engine computes:
- Exponential Moving Average differentials (EMA 20 vs EMA 50)
- Real-time volatility expansion metrics
- Target allocation deviation thresholds (>5% triggers rebalance alerts)

All order executions are authorized client-side with hardware-grade biometric authentication (Passkeys / WebAuthn), ensuring your private assets remain strictly under your sovereign control.`
    },
    metrics: {
      nodeRelays: 892,
      encryptionCipher: 'Ed25519 ECDSA'
    }
  },
  {
    id: 'post-103',
    authorHandle: '@sovereign_dev',
    authorKey: '0x14f882a931dc4e90',
    content: 'Client-side AES-GCM 256 encryption is now active across all direct channels. No cleartext ever leaves the browser memory. Keys are derived ephemerally via Curve25519 ECDH. Your private conversations cannot be subpoenaed from servers because the servers never possess the keys.',
    timestamp: '2026-11-01T16:30:00Z',
    relativeTime: '1h ago',
    likes: 215,
    reposts: 74,
    tipsReceivedUsd: 310.00,
    signature: 'sig:ed25519:4a9918237cbbe819203948571029384756ab',
    cid: 'bafyreib23847593847291039485729384759382710394857293847',
    isEncrypted: true,
    category: 'Privacy Tech',
    tags: ['E2EE', 'Cybersecurity', 'DecentralizedRelay'],
    slug: 'client-side-aes-gcm-256-encryption-active',
    blogPost: {
      title: 'Client-Side Cryptography: Engineering End-to-End Encrypted Social Meshes',
      readTime: '8 min read',
      coverImage: '/src/assets/images/digital_sovereignty_vault_1793585631235.jpg',
      summary: 'A deep architectural dissection into Web Crypto SubtleCrypto implementation for ephemeral Diffie-Hellman handshakes and tamper-evident decentralized feeds.',
      canonicalUrl: 'https://nexus-zero.network/blog/client-side-cryptography-encrypted-social-meshes',
      fullMarkdown: `## Zero Trust at the Edge

Decentralization without cryptographic privacy is merely transparent panopticism. For a social network to be truly free, public data must be verifiable and private data must be mathematically impenetrable.

### Architectural Invariants:
1. **Local Key Derivation**: Keys are generated within browser memory and stored in encrypted local vaults.
2. **SubtleCrypto AES-GCM 256**: Authenticated encryption ensures that tampering with ciphertext payloads is instantly rejected by the decryptor.
3. **Decentralized Relay Federation**: Messages are broadcast across onion-routed gossip protocols, obscuring client IP addresses from network listeners.`
    },
    metrics: {
      nodeRelays: 2410,
      encryptionCipher: 'AES-256-GCM + Curve25519'
    }
  },
  {
    id: 'post-104',
    authorHandle: '@echo_sentinel',
    authorKey: '0x9923bbfa418902d3',
    content: 'Whale transfer of 4,100 BTC detected moving to self-custody multisig. The sovereign accumulation trend continues despite macro noise. Have you secured your biometric hardware enclave?',
    timestamp: '2026-11-01T15:10:00Z',
    relativeTime: '3h ago',
    likes: 67,
    reposts: 19,
    tipsReceivedUsd: 42.00,
    signature: 'sig:ed25519:881923049586710293847561029384756102',
    cid: 'bafyreic09182736451029384756102938475610293847561029384',
    isEncrypted: false,
    category: 'Econ Theory',
    tags: ['SelfCustody', 'OnChainAnalytics', 'Bitcoin'],
    slug: 'whale-transfer-detected-sovereign-accumulation',
    metrics: {
      nodeRelays: 620,
      encryptionCipher: 'Ed25519 ECDSA'
    }
  }
];

export const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'dm-1',
    senderHandle: '@cipher_architect',
    senderKey: '0x8f43a9b12d50e823',
    recipientKey: 'self',
    timestamp: '18:02',
    encryptedPayload: 'aes-256-gcm:94a8bc12e4f0:6e849201f84b84c8a910394857201948571029...',
    decryptedContent: 'Welcome to NEXUS ZERO. Your ephemeral node is active on DHT relay #704. All incoming transmissions are end-to-end encrypted with your browser key.',
    isSelf: false,
    deliveredViaNode: 'relay.eu-central.nexus.dht'
  },
  {
    id: 'dm-2',
    senderHandle: 'You (@node_self)',
    senderKey: 'self',
    recipientKey: '0x8f43a9b12d50e823',
    timestamp: '18:05',
    encryptedPayload: 'aes-256-gcm:33df19a820c7:84920394857102938475610293847561029384...',
    decryptedContent: 'Confirmed. SubtleCrypto AES-GCM handshake established with verified Curve25519 public key. Ready for zero-KYC asset transfers.',
    isSelf: true,
    deliveredViaNode: 'relay.us-west.nexus.dht'
  },
  {
    id: 'dm-3',
    senderHandle: '@cipher_architect',
    senderKey: '0x8f43a9b12d50e823',
    recipientKey: 'self',
    timestamp: '18:08',
    encryptedPayload: 'aes-256-gcm:77ee49a119c3:10293847561029384756102938475610293847...',
    decryptedContent: 'Keep your 12-word seed safe in memory or an offline cold medium. No password recovery exists because no central custodian holds your authority.',
    isSelf: false,
    deliveredViaNode: 'relay.asia-east.nexus.dht'
  }
];
