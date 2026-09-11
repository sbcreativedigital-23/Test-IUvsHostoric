import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Cpu,
  Brain,
  Zap,
  DollarSign,
  ClipboardList,
  BarChart3,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { TabId } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  roleUsed?: string;
}

export type ChatRole = 'analyst' | 'tactician' | 'vegas';
export type ChatModel = 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';

interface ChatViewProps {
  onNavigateTab?: (tab: TabId) => void;
}

const DEFAULT_STARTERS = [
  'Why was Indiana 2025 such a historic anomaly against the spread (+9.2 cover)?',
  'Simulate Indiana 2025 vs. Alabama 2020: What is the projected score and key battle?',
  'Compare Indiana’s defensive EPA allowed (-0.18) to Michigan 2023 (-0.14).',
  'Explain Indiana’s +11.8 4th quarter scoring differential and how it wore teams down.',
  'What is Adjusted Net Efficiency Z-Score and why does Indiana lead at 4.63?'
];

export const ChatView: React.FC<ChatViewProps> = ({ onNavigateTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: `**Welcome to the Championship Intelligence AI Assistant.**\n\nI am grounded directly in the complete empirical dataset comparing **Indiana 2025 (16-0)** alongside modern titans **Alabama 2020**, **LSU 2019**, **Georgia 2022**, and **Michigan 2023**.\n\nYou can query any metric across all 70+ ledger attributes, ask for head-to-head simulations, examine EPA differentials, or investigate Vegas betting inefficiencies. Select a role above or click any starter question below to begin!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.5-flash',
        roleUsed: 'analyst'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<ChatRole>('analyst');
  const [selectedModel, setSelectedModel] = useState<ChatModel>('gemini-3.5-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Clear current conversation history?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content: 'Conversation cleared. How can I assist your championship research today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModel,
          roleUsed: selectedRole
        }
      ]);
      setErrorBanner(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setErrorBanner(null);
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation payload for backend
      const payload = updatedMessages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payload,
          role: selectedRole,
          model: selectedModel
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
        roleUsed: data.roleUsed || selectedRole
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorBanner(err.message || 'Failed to communicate with AI service.');
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ **Unable to complete query**: ${err.message || 'Check server connection and GEMINI_API_KEY.'}\n\n*Note*: The full empirical dataset remains accessible across all analytical tabs in the suite.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectStarter = (text: string) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[750px] animate-fadeIn">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-950/50">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Championship Intelligence AI Analyst
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-950 text-red-400 border border-red-800/80">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Interactive multi-turn intelligence chat grounded in Indiana 2025 & all 5 champions
            </p>
          </div>
        </div>

        {/* Controls: Persona Role & Model Engine */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Persona Role Selector */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setSelectedRole('analyst')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedRole === 'analyst'
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Focuses on EPA, efficiency Z-scores, and advanced metrics"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analyst</span>
            </button>
            <button
              onClick={() => setSelectedRole('tactician')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedRole === 'tactician'
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Focuses on schemes, personnel groupings, and game-day matchups"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Tactician</span>
            </button>
            <button
              onClick={() => setSelectedRole('vegas')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedRole === 'vegas'
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Focuses on ATS, point spreads, and betting market valuation"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Vegas Sharp</span>
            </button>
          </div>

          {/* Model Engine Selector */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                selectedModel === 'gemini-3.1-flash-lite'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Fast speed for quick stat queries"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Lite</span>
            </button>
            <button
              onClick={() => setSelectedModel('gemini-3.5-flash')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                selectedModel === 'gemini-3.5-flash'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="General task engine: balanced and thorough (default)"
            >
              <Brain className="w-3 h-3 text-emerald-400" />
              <span>Flash (Default)</span>
            </button>
            <button
              onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                selectedModel === 'gemini-3.1-pro-preview'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Pro model for complex strategic reasoning"
            >
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>Pro</span>
            </button>
          </div>

          {/* Reset History Button */}
          <button
            onClick={handleClear}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition cursor-pointer"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Error Notice Banner if any */}
      {errorBanner && (
        <div className="bg-red-950/80 border-b border-red-900/80 px-4 py-2 text-xs text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            onClick={() => setErrorBanner(null)}
            className="text-red-400 hover:text-white font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-zinc-950/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isCopied = copiedId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 text-xs font-bold ${
                  isUser
                    ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                    : 'bg-red-950 text-red-400 border border-red-800/80'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div
                className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm shadow-md space-y-2 relative group max-w-2xl sm:max-w-3xl ${
                  isUser
                    ? 'bg-red-950/40 border border-red-900/60 text-zinc-100 rounded-tr-none'
                    : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}
              >
                {/* Message Header / Meta */}
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pb-1 border-b border-zinc-800/40">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-400">
                      {isUser ? 'You' : `AI Analyst (${msg.roleUsed || selectedRole})`}
                    </span>
                    {!isUser && msg.modelUsed && (
                      <span className="text-[10px] text-zinc-500 bg-zinc-800/70 px-1.5 py-0.2 rounded">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition text-zinc-500 hover:text-zinc-200 cursor-pointer p-0.5"
                      title="Copy response"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Content with Markdown Rendering */}
                <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-zinc-200 leading-relaxed font-sans">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-red-950 text-red-400 border border-red-800/80 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin text-red-400" />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl rounded-tl-none text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="font-mono text-[11px] text-zinc-400 ml-1">
                Consulting {selectedModel} ({selectedRole} perspective)...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/90 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max text-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1 mr-1">
            <HelpCircle className="w-3 h-3 text-red-400" /> Starters:
          </span>
          {DEFAULT_STARTERS.map((starter, i) => (
            <button
              key={i}
              onClick={() => handleSelectStarter(starter)}
              className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-[11px] transition truncate max-w-[280px] cursor-pointer"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask anything about Indiana 2025 vs Alabama, LSU, Georgia, Michigan (e.g. "Compare red zone EPA")...`}
              rows={2}
              className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-2xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none transition"
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-2.5 text-[10px] text-zinc-500 font-mono hidden sm:block">
              Press Enter ↵ to send
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3.5 rounded-2xl font-black transition flex items-center justify-center cursor-pointer shrink-0 shadow-lg ${
              input.trim() && !isLoading
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2 px-1">
          <span>
            Grounded in 70+ ledger attributes, EPA metrics, & betting spreads
          </span>
          <span>
            This site is property of{' '}
            <a
              href="https://creativetech.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-red-400 underline font-medium"
            >
              CreativeTech.Studio
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
