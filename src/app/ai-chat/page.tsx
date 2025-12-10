'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  BarChart3,
  Activity,
  Clock,
  ArrowUp,
  Plus,
  PanelLeftClose,
  Check,
  Brain,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  dataCards?: Array<{
    type: 'metric' | 'insight' | 'action';
    title: string;
    value?: string;
    description?: string;
    trend?: string;
    icon: 'trending' | 'users' | 'dollar' | 'calendar' | 'target' | 'chart' | 'activity';
    color: string;
  }>;
}

const suggestions = [
  { text: 'Analyze my pipeline', icon: TrendingUp, color: 'var(--indigo-500)' },
  { text: 'Who should I contact today?', icon: Users, color: 'var(--cyan-500)' },
  { text: 'Revenue forecast for Q4', icon: DollarSign, color: 'var(--emerald-500)' },
  { text: 'Optimize my schedule', icon: Calendar, color: 'var(--purple-500)' },
];

const dummyResponses: Record<string, Message> = {
  'pipeline': {
    id: '1',
    role: 'assistant',
    content: "I've analyzed your sales pipeline. Here's what I found:\n\n**Pipeline Health: Strong** with a total value of **$2.95M** across 23 active deals.\n\n**Key Insights:**\n• Win rate is **34%**, up 5% from last month\n• Average deal size increased to **$47.5K**\n• Deals are spending 2.3x longer in the Negotiation stage\n\n**Recommendation:** Focus on the 5 deals in negotiation stage - they represent $890K in potential revenue. Consider implementing faster approval workflows to reduce cycle time.",
    timestamp: new Date(),
    suggestions: [
      'Show deals in negotiation',
      'Compare to last quarter',
      'What actions should I take?',
    ],
  },
  'contacts': {
    id: '2',
    role: 'assistant',
    content: "Based on engagement data, here are your priority contacts for today:\n\n**Hot Leads:**\n1. **Sarah Chen** (Acme Corp) - Opened 12 emails this week, visited pricing page 3x\n2. **Michael Torres** (TechFlow) - Requested a demo, high intent signals\n3. **Emily Watson** (DataSync) - Contract expires in 2 weeks\n\n**Follow-up Needed:**\n• 8 contacts haven't been touched in 14+ days\n• 3 proposals awaiting response\n\nWould you like me to draft follow-up emails for any of these contacts?",
    timestamp: new Date(),
    suggestions: [
      'Draft email for Sarah Chen',
      'Show all overdue follow-ups',
      'Schedule calls for hot leads',
    ],
  },
  'revenue': {
    id: '3',
    role: 'assistant',
    content: "Here's your Q4 revenue forecast:\n\n**Projected Revenue: $1.2M** (115% of target)\n\n**Breakdown by Segment:**\n• Enterprise: $780K (65%) - Growing 42% YoY\n• Mid-Market: $320K (27%)\n• SMB: $100K (8%)\n\n**Confidence Level: 87%**\n\nThe forecast accounts for:\n• Current pipeline weighted by stage probability\n• Historical close rates by segment\n• Seasonal patterns from previous years\n\n**Risk Factor:** 3 enterprise deals ($245K) showing reduced engagement.",
    timestamp: new Date(),
    suggestions: [
      'Show at-risk deals',
      'Break down by sales rep',
      'Adjust forecast assumptions',
    ],
  },
  'schedule': {
    id: '4',
    role: 'assistant',
    content: "I've analyzed your calendar for optimization opportunities:\n\n**Current State:**\n• 18 hours of meetings per week\n• Only 4 hours of focus time\n• Peak productivity: 10am-12pm\n\n**Recommendations:**\n1. **Batch Tuesday meetings** - Save 2.5 hours by grouping\n2. **Block 10am-12pm** for deep work (your peak hours)\n3. **Move 3 low-priority calls** to async video updates\n\n**Potential Time Saved: 6+ hours/week**\n\nWant me to suggest specific calendar changes?",
    timestamp: new Date(),
    suggestions: [
      'Show proposed calendar',
      'Block focus time now',
      'Set meeting preferences',
    ],
  },
  'default': {
    id: '5',
    role: 'assistant',
    content: "I can help you with insights about your CRM data. Here are some things I can do:\n\n• **Analyze your pipeline** - Deal health, conversion rates, bottlenecks\n• **Contact intelligence** - Engagement scoring, follow-up recommendations\n• **Revenue forecasting** - Projections, trends, risk analysis\n• **Schedule optimization** - Meeting analysis, productivity insights\n• **Deal scoring** - Probability analysis, next best actions\n\nWhat would you like to explore?",
    timestamp: new Date(),
    suggestions: [
      'Analyze my pipeline',
      'Who needs follow-up?',
      'Show revenue forecast',
    ],
  },
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const getResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('pipeline') || lowerQuery.includes('deals') || lowerQuery.includes('bottleneck')) {
      return { ...dummyResponses.pipeline, id: Date.now().toString(), timestamp: new Date() };
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('who') || lowerQuery.includes('follow')) {
      return { ...dummyResponses.contacts, id: Date.now().toString(), timestamp: new Date() };
    }
    if (lowerQuery.includes('revenue') || lowerQuery.includes('forecast') || lowerQuery.includes('quarter') || lowerQuery.includes('q4')) {
      return { ...dummyResponses.revenue, id: Date.now().toString(), timestamp: new Date() };
    }
    if (lowerQuery.includes('schedule') || lowerQuery.includes('meeting') || lowerQuery.includes('calendar') || lowerQuery.includes('optimize')) {
      return { ...dummyResponses.schedule, id: Date.now().toString(), timestamp: new Date() };
    }
    return { ...dummyResponses.default, id: Date.now().toString(), timestamp: new Date() };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getResponse(currentInput);
      setMessages((prev) => [...prev, response]);
    }, 1000 + Math.random() * 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content.split('\n').map((line, i) => {
      // Bold text
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--void-50)] font-semibold">$1</strong>');
      // Bullet points
      if (line.startsWith('• ')) {
        return (
          <div key={i} className="flex gap-2 ml-1">
            <span className="text-[var(--indigo-400)]">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatted.substring(2) }} />
          </div>
        );
      }
      // Numbered lists
      const numMatch = line.match(/^(\d+)\.\s/);
      if (numMatch) {
        return (
          <div key={i} className="flex gap-2 ml-1">
            <span className="text-[var(--indigo-400)] min-w-[1.25rem]">{numMatch[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: formatted.substring(numMatch[0].length) }} />
          </div>
        );
      }
      // Empty lines become spacing
      if (line === '') return <div key={i} className="h-3" />;
      // Regular text
      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen bg-[var(--void-950)] flex flex-col relative">
      {/* Advanced ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow orbs with liquid animation */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[var(--indigo-500)] rounded-full opacity-[0.04] blur-[120px]"
          style={{ animation: 'liquid 20s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--purple-500)] rounded-full opacity-[0.03] blur-[100px]"
          style={{ animation: 'liquid 25s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--cyan-500)] rounded-full opacity-[0.03] blur-[80px]"
          style={{ animation: 'liquid 18s ease-in-out infinite 2s' }}
        />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />

      {/* Header with premium styling */}
      <header className="relative z-10 flex-shrink-0">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-[var(--void-950)]/70 backdrop-blur-2xl" />

        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--void-700)] to-transparent" />

        <div className="relative h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="group p-2 rounded-xl hover:bg-[var(--void-800)]/80 text-[var(--void-400)] hover:text-[var(--void-200)] transition-all">
              <PanelLeftClose className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {/* Premium AI icon */}
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center shadow-lg shadow-[var(--indigo-500)]/25">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                {/* Live indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
                  <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                  <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-75" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--void-100)]">Nexus AI</span>
                  <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--indigo-500)]/20 to-[var(--purple-500)]/20 text-[var(--indigo-400)] rounded border border-[var(--indigo-500)]/30">
                    Pro
                  </span>
                </div>
                <p className="text-[10px] text-[var(--void-500)]">Powered by advanced AI</p>
              </div>
            </div>
          </div>
          <button className="group p-2 rounded-xl hover:bg-[var(--void-800)]/80 text-[var(--void-400)] hover:text-[var(--void-200)] transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-hidden">
        {!hasMessages ? (
          /* Empty State - Premium welcome */
          <div className="h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
              {/* Premium Logo with effects */}
              <div className="mb-8 relative">
                <div className="relative w-20 h-20 mx-auto">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'conic-gradient(from 0deg, var(--indigo-500), var(--purple-500), var(--cyan-500), var(--indigo-500))',
                      padding: '2px',
                      animation: 'spin-slow 8s linear infinite',
                    }}
                  >
                    <div className="absolute inset-[2px] rounded-2xl bg-[var(--void-900)]" />
                  </div>

                  {/* Main icon container */}
                  <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center shadow-2xl shadow-[var(--indigo-500)]/30">
                    <Brain className="w-9 h-9 text-white" />
                  </div>

                  {/* Sparkle accents */}
                  <Sparkles
                    className="absolute -top-2 -right-2 w-5 h-5 text-[var(--amber-400)]"
                    style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
                  />
                </div>
              </div>

              {/* Title with gradient */}
              <h1 className="text-3xl font-display font-semibold text-[var(--void-50)] mb-3">
                What can I help with?
              </h1>
              <p className="text-[var(--void-400)] mb-10 text-lg">
                Ask about your pipeline, contacts, forecasts, or anything in your CRM.
              </p>

              {/* Premium suggestion cards */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="group relative rounded-xl overflow-hidden text-left transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Conic gradient border on hover */}
                    <div
                      className="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `conic-gradient(from 0deg, ${suggestion.color}, ${suggestion.color}40, ${suggestion.color}80, ${suggestion.color}40, ${suggestion.color})` }}
                    >
                      <div className="absolute inset-[1px] rounded-xl bg-[var(--void-850)]" />
                    </div>

                    <div className="relative flex items-center gap-3 p-4 rounded-xl bg-[var(--void-850)]/80 backdrop-blur-sm border border-[var(--void-700)]/50 group-hover:border-transparent transition-all duration-300">
                      {/* Chrome reflection */}
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-xl pointer-events-none" />

                      {/* Ambient glow */}
                      <div
                        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 blur-[40px] group-hover:opacity-30 transition-all duration-500"
                        style={{ background: suggestion.color }}
                      />

                      <div
                        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${suggestion.color}20, ${suggestion.color}10)`,
                          boxShadow: `0 0 0 1px ${suggestion.color}25`,
                        }}
                      >
                        <suggestion.icon className="w-5 h-5" style={{ color: suggestion.color }} />
                      </div>
                      <span className="relative z-10 text-sm text-[var(--void-300)] group-hover:text-[var(--void-100)] transition-colors flex-1">
                        {suggestion.text}
                      </span>
                      <ArrowUpRight className="relative z-10 w-4 h-4 text-[var(--void-600)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--void-400)] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages with premium styling */
          <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-8">
              {messages.map((message, msgIndex) => (
                <div
                  key={message.id}
                  className="mb-8 last:mb-4 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${msgIndex * 50}ms`, animationFillMode: 'forwards' }}
                >
                  {message.role === 'user' ? (
                    /* User message with premium styling */
                    <div className="flex justify-end">
                      <div className="relative max-w-[85%] rounded-2xl rounded-br-md overflow-hidden">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)]" />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                        <div className="relative px-4 py-3">
                          <p className="text-[15px] leading-relaxed text-white">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Assistant message with premium styling */
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        {/* AI Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center shadow-lg shadow-[var(--indigo-500)]/20">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          {/* Pulse effect */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--indigo-400)] to-[var(--purple-400)] animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] leading-relaxed text-[var(--void-200)] space-y-1">
                            {formatContent(message.content)}
                          </div>

                          {/* Premium action buttons */}
                          <div className="flex items-center gap-1 mt-4">
                            <button
                              onClick={() => copyToClipboard(message.content, message.id)}
                              className="group p-2 rounded-lg hover:bg-[var(--void-800)]/80 text-[var(--void-500)] hover:text-[var(--void-300)] transition-all"
                              title="Copy"
                            >
                              {copiedId === message.id ? (
                                <Check className="w-4 h-4 text-[var(--emerald-400)]" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              className="group p-2 rounded-lg hover:bg-[var(--void-800)]/80 text-[var(--void-500)] hover:text-[var(--emerald-400)] transition-all"
                              title="Good response"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              className="group p-2 rounded-lg hover:bg-[var(--void-800)]/80 text-[var(--void-500)] hover:text-[var(--rose-400)] transition-all"
                              title="Bad response"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button
                              className="group p-2 rounded-lg hover:bg-[var(--void-800)]/80 text-[var(--void-500)] hover:text-[var(--void-300)] transition-all"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Premium suggestion pills */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {message.suggestions.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="group relative px-3 py-1.5 rounded-full overflow-hidden text-sm transition-all duration-300"
                                >
                                  {/* Background with hover effect */}
                                  <div className="absolute inset-0 bg-[var(--void-800)]/60 border border-[var(--void-700)]/50 rounded-full group-hover:bg-[var(--void-800)] group-hover:border-[var(--indigo-500)]/30 transition-all" />
                                  {/* Glow on hover */}
                                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)' }} />
                                  <span className="relative z-10 text-[var(--void-300)] group-hover:text-[var(--void-100)] transition-colors">
                                    {suggestion}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Premium typing indicator */}
              {isTyping && (
                <div className="mb-8 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 py-3 px-4 bg-[var(--void-850)]/80 rounded-xl border border-[var(--void-700)]/50">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--indigo-400)]" style={{ animation: 'bounce 1s infinite', animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--indigo-400)]" style={{ animation: 'bounce 1s infinite', animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--indigo-400)]" style={{ animation: 'bounce 1s infinite', animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-[var(--void-500)]">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* Premium input area */}
      <footer className="relative z-10 flex-shrink-0 px-4 pb-6 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-2xl p-[1px] opacity-50"
              style={{ background: 'linear-gradient(135deg, var(--void-600), var(--void-800), var(--void-600))' }}
            >
              <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
            </div>

            <div className="relative bg-[var(--void-850)]/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/30">
              {/* Chrome reflection */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Nexus AI..."
                rows={1}
                className="relative z-10 w-full px-4 py-4 pr-14 bg-transparent text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none resize-none text-[15px] leading-relaxed max-h-[200px]"
              />

              {/* Premium send button */}
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 bottom-2 group p-2.5 rounded-xl transition-all disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Button background */}
                <div className={`absolute inset-0 rounded-xl transition-all ${input.trim() ? 'bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] shadow-lg shadow-[var(--indigo-500)]/30' : 'bg-[var(--void-700)]'}`} />
                {/* Shimmer on hover */}
                {input.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
                <ArrowUp className={`w-5 h-5 relative z-10 ${input.trim() ? 'text-white' : 'text-[var(--void-500)]'}`} />
              </button>
            </div>
          </div>

          {/* Footer text with subtle styling */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sparkles className="w-3 h-3 text-[var(--void-600)]" />
            <p className="text-xs text-[var(--void-600)]">
              Nexus AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
