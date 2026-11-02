/**
 * AI Chat Support Box for Next (https://NextSocialNetwork.Com)
 * 24/7 Sovereign Intelligence & Technical Support powered by server-side Gemini 3.8 Flash.
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { haptics } from '../../services/haptics';
import { LanguageCode, TRANSLATIONS } from '../../services/i18n';

interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiChatSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const AiChatSupportModal: React.FC<AiChatSupportModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Initialize initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'model',
          text: t.chat_welcome,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language, messages.length, t.chat_welcome]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickQuestions = [
    language === 'lt' ? 'Kaip visi 7,485 SEO straipsniai indeksuojami Google paieškoje?' :
    language === 'zh' ? '这 7,485 篇 SEO 博客文章是如何被 Google 索引的？' :
    language === 'es' ? '¿Cómo se indexan los 7.485 artículos en Google SEO?' :
    'How are all 7,485 articles indexed for Google SEO?',

    language === 'lt' ? 'Kaip veikia tapatybė be KYC su 12 žodžių atkūrimo fraze?' :
    language === 'zh' ? '免KYC的自主助记词身份如何运作？' :
    language === 'es' ? '¿Cómo funciona la identidad sin KYC con 12 palabras?' :
    'How does zero-KYC sovereign seed identity work?',

    language === 'lt' ? 'Paaiškinkite automatinio Bitcoin ir akcijų portfelio subalansavimo modelį' :
    language === 'zh' ? '实时比特币与股票投资组合再平衡算法原理' :
    language === 'es' ? '¿Cómo funciona el rebalanceo de portafolio algorítmico?' :
    'Explain the algorithmic trend portfolio rebalance model',

    language === 'lt' ? 'Kaip AES-256-GCM šifravimas saugo asmeninius susirašinėjimus?' :
    language === 'zh' ? '端到端加密AES-256-GCM是如何保护私聊的？' :
    language === 'es' ? '¿Cómo protege el cifrado E2EE AES-256-GCM los mensajes?' :
    'How does AES-256-GCM E2EE protect direct messages?'
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    haptics.tap();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ sender: m.sender, text: m.text })),
          language
        })
      });

      const data = await res.json();
      haptics.biometricSuccess();

      const modelMsg: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        sender: 'model',
        text: data.response || 'I am processing your query across the decentralized network.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-err`,
          sender: 'model',
          text: 'Next AI Support is active. Your sovereign connection is established.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    haptics.tap();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    haptics.tap();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'model',
        text: t.chat_welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? 'inset-3 sm:inset-10' 
        : 'bottom-3 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[440px] max-h-[85vh] h-[520px]'
    } bg-[#0c1018] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200`}>
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#090d14] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#090d14] rounded-[7px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs text-white">Next AI Support</h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/60">
                Gemini 3.8 Flash
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">https://NextSocialNetwork.Com</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Reset Conversation"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Restore Size' : 'Expand'}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors hidden sm:inline-flex"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Thread Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#0a0e16]/60">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const isCopied = copiedId === msg.id;

          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
              <div className={`relative group max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                isUser
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200'
              }`}>
                {!isUser && (
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800/80 text-[10px] font-mono text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Next AI Intelligence
                    </span>
                    <button
                      onClick={() => copyMessage(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {isCopied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 px-1">{msg.timestamp}</span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl w-fit text-slate-400 font-mono text-[11px] animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>Analyzing decentralized knowledge mesh...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-2 bg-[#090d14] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg whitespace-nowrap shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-[#090d14] border-t border-slate-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.chat_input_placeholder}
            className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-950/40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
