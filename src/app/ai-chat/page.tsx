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
  { text: 'Analyze my pipeline', icon: TrendingUp },
  { text: 'Who should I contact today?', icon: Users },
  { text: 'Revenue forecast for Q4', icon: DollarSign },
  { text: 'Optimize my schedule', icon: Calendar },
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
            <span className="text-[var(--void-500)]">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatted.substring(2) }} />
          </div>
        );
      }
      // Numbered lists
      const numMatch = line.match(/^(\d+)\.\s/);
      if (numMatch) {
        return (
          <div key={i} className="flex gap-2 ml-1">
            <span className="text-[var(--void-500)] min-w-[1.25rem]">{numMatch[1]}.</span>
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
    <div className="h-screen bg-[var(--void-950)] flex flex-col">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--void-900)] via-[var(--void-950)] to-[var(--void-950)]" />
      </div>

      {/* Header - minimal */}
      <header className="relative z-10 flex-shrink-0 h-14 flex items-center justify-between px-4 border-b border-[var(--void-800)]/50">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-[var(--void-800)] text-[var(--void-400)] hover:text-[var(--void-200)] transition-colors">
            <PanelLeftClose className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-[var(--void-100)]">Nexus AI</span>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-[var(--void-800)] text-[var(--void-400)] hover:text-[var(--void-200)] transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-hidden">
        {!hasMessages ? (
          /* Empty State - Clean welcome */
          <div className="h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center mx-auto shadow-lg shadow-[var(--indigo-500)]/20">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-semibold text-[var(--void-50)] mb-3">
                What can I help with?
              </h1>
              <p className="text-[var(--void-400)] mb-10 text-lg">
                Ask about your pipeline, contacts, forecasts, or anything in your CRM.
              </p>

              {/* Suggestion cards */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-[var(--void-800)]/40 hover:bg-[var(--void-800)]/70 border border-[var(--void-800)] hover:border-[var(--void-700)] transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--void-800)] group-hover:bg-[var(--void-700)] flex items-center justify-center transition-colors">
                      <suggestion.icon className="w-4 h-4 text-[var(--void-400)] group-hover:text-[var(--void-300)]" />
                    </div>
                    <span className="text-sm text-[var(--void-300)] group-hover:text-[var(--void-100)] transition-colors flex-1">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-8">
              {messages.map((message) => (
                <div key={message.id} className="mb-8 last:mb-4">
                  {message.role === 'user' ? (
                    /* User message */
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-[var(--indigo-500)] text-white px-4 py-3 rounded-2xl rounded-br-md">
                        <p className="text-[15px] leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    /* Assistant message */
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] leading-relaxed text-[var(--void-200)] space-y-1">
                            {formatContent(message.content)}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1 mt-4">
                            <button
                              onClick={() => copyToClipboard(message.content, message.id)}
                              className="p-1.5 rounded-md hover:bg-[var(--void-800)] text-[var(--void-500)] hover:text-[var(--void-300)] transition-colors"
                              title="Copy"
                            >
                              {copiedId === message.id ? (
                                <Check className="w-4 h-4 text-[var(--emerald-400)]" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              className="p-1.5 rounded-md hover:bg-[var(--void-800)] text-[var(--void-500)] hover:text-[var(--void-300)] transition-colors"
                              title="Good response"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-md hover:bg-[var(--void-800)] text-[var(--void-500)] hover:text-[var(--void-300)] transition-colors"
                              title="Bad response"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-md hover:bg-[var(--void-800)] text-[var(--void-500)] hover:text-[var(--void-300)] transition-colors"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {message.suggestions.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="px-3 py-1.5 rounded-full bg-[var(--void-800)]/60 hover:bg-[var(--void-800)] border border-[var(--void-700)]/50 hover:border-[var(--void-600)] text-sm text-[var(--void-300)] hover:text-[var(--void-100)] transition-all"
                                >
                                  {suggestion}
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

              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-8">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-1 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--void-500)] animate-pulse" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--void-500)] animate-pulse" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--void-500)] animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* Input area - floating style */}
      <footer className="relative z-10 flex-shrink-0 px-4 pb-6 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[var(--void-800)]/80 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-2xl shadow-lg shadow-black/20">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Nexus AI..."
              rows={1}
              className="w-full px-4 py-4 pr-14 bg-transparent text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none resize-none text-[15px] leading-relaxed max-h-[200px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-xl bg-[var(--void-100)] hover:bg-white disabled:bg-[var(--void-700)] disabled:text-[var(--void-500)] text-[var(--void-900)] transition-all disabled:cursor-not-allowed"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-[var(--void-600)] mt-3">
            Nexus AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </footer>
    </div>
  );
}
