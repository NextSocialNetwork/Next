/**
 * Full-Stack Express Server for Next (https://NextSocialNetwork.Com)
 * Implements server-side Gemini API AI Chat Support and Vite dev middleware mounting.
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Server-Side Google GenAI Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Chat Support Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history = [], language = 'en' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemInstruction = `You are Next AI Support, the sovereign decentralized intelligence assistant for Next (https://NextSocialNetwork.Com).
Key knowledge:
- Next is a futuristic, zero-verification decentralized social network and autonomous trading platform.
- Zero KYC: Users generate 12-word seed phrases and Ed25519 cryptographic keypairs client-side in browser memory. No email or phone is required.
- The platform hosts exactly 7,485 Google SEO-friendly research blog articles with canonical tags, Schema.org JSON-LD, and permanent IPFS CIDs.
- Direct messaging is end-to-end encrypted with AES-256-GCM.
- Real-time Bitcoin and equity trading includes candlestick analytics, live order books, and algorithmic portfolio rebalancing (Hyper-Alpha, Balanced Core, Hard Money).
- Biometric authentication (WebAuthn / Passkeys) protects all transactions, trades, seed phrase unmasking, and DMs.
- Multi-chain wallet integrates Bitcoin, Ethereum, Solana, Arbitrum, Cosmos, and Polygon.
Always respond warmly, concisely, technically accurate, and respond in the user's current language: ${language}.`;

  try {
    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          ...history.map((h: { sender: string; text: string }) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          })),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        config: {
          systemInstruction,
        }
      });

      const replyText = response.text || 'I am ready to assist your sovereign journey on Next.';
      return res.json({ response: replyText });
    } else {
      // Intelligent fallback when GEMINI_API_KEY is pending
      const fallbackReply = generateFallbackReply(message, language);
      return res.json({ response: fallbackReply });
    }
  } catch (error: unknown) {
    console.error('Gemini API Chat Error:', error);
    const fallbackReply = generateFallbackReply(message, language);
    return res.json({ response: fallbackReply });
  }
});

function generateFallbackReply(message: string, language: string): string {
  const lower = message.toLowerCase();
  if (language === 'lt') {
    if (lower.includes('straipsn') || lower.includes('seo') || lower.includes('blog') || lower.includes('7485') || lower.includes('2896')) {
      return 'Next (https://NextSocialNetwork.Com) turi 7 485 Google SEO optimizuotus blogo straipsnius su kanoninėmis nuorodomis, Schema.org JSON-LD ir nuolatiniais IPFS CID įrašais.';
    }
    if (lower.includes('prekyb') || lower.includes('bitcoin') || lower.includes('akcij')) {
      return 'Next platformoje veikia realaus laiko Bitcoin bei akcijų prekyba su žvakių diagramomis, gyvu pavedimų knyga ir algoritminiu portfelio subalansavimu.';
    }
    return 'Sveiki atvykę į Next (https://NextSocialNetwork.Com) DI pagalbą. Jūsų tapatybė yra 100% suvereni be jokio KYC patvirtinimo, apsaugota Ed25519 raktais ir biometrine prieiga.';
  }
  if (language === 'es') {
    if (lower.includes('articulo') || lower.includes('seo') || lower.includes('blog') || lower.includes('7485') || lower.includes('2896')) {
      return 'Next cuenta con un catálogo de 7.485 artículos de blog indexados para Google SEO con marcado Schema.org JSON-LD, enlaces canónicos y CIDs permanentes.';
    }
    return 'Bienvenido al soporte de Next (https://NextSocialNetwork.Com). Tu identidad es 100% soberana con claves Ed25519 y cifrado E2EE AES-256-GCM.';
  }
  if (language === 'zh') {
    if (lower.includes('seo') || lower.includes('文章') || lower.includes('博客') || lower.includes('7485') || lower.includes('2896')) {
      return 'Next (https://NextSocialNetwork.Com) 已收录并索引了 7,485 篇适配 Google SEO 的去中心化博客技术文章，支持 Schema.org JSON-LD 和 XML 网站地图。';
    }
    return '您好！欢迎使用 Next 智能客服。平台支持免KYC自主密钥生成、端到端加密私聊、多链资产管理以及比特币与美股实时交易。';
  }

  // English default fallback
  if (lower.includes('article') || lower.includes('seo') || lower.includes('blog') || lower.includes('7485') || lower.includes('2896')) {
    return 'Next indexes exactly 7,485 Google SEO-friendly blog articles equipped with canonical tags, Schema.org BlogPosting JSON-LD structured data, and permanent IPFS CIDs for global discovery.';
  }
  if (lower.includes('trade') || lower.includes('bitcoin') || lower.includes('stock')) {
    return 'Next provides real-time Bitcoin and stock trading with live candlestick charts, streaming order books, and algorithmic portfolio rebalancing (Hyper-Alpha, Balanced, and Hard Money Vault).';
  }
  if (lower.includes('security') || lower.includes('kyc') || lower.includes('identity')) {
    return 'Next requires zero identity verification (Zero-KYC). Your identity is derived from a 12-word recovery mnemonic and Ed25519 keypair, secured via local biometric Passkeys.';
  }
  return 'Welcome to Next (https://NextSocialNetwork.Com) AI Support. I can guide you through our 2,896 Google SEO articles, multi-chain asset vaults, Bitcoin trading, and E2EE messaging.';
}

// In production, serve the built static client files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  // In development, integrate Vite middleware
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Next Server running on http://0.0.0.0:${port}`);
});
