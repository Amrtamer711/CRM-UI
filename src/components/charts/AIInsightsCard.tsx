'use client';

import { Brain, Sparkles, TrendingUp, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const insights = [
  {
    type: 'opportunity',
    icon: TrendingUp,
    title: 'High-value deal predicted',
    description: 'Enterprise Security Suite has 89% probability of closing this week based on engagement patterns.',
    color: 'var(--emerald-400)',
    bgColor: 'var(--emerald-500)',
  },
  {
    type: 'warning',
    icon: AlertTriangle,
    title: 'Follow-up recommended',
    description: '3 deals in negotiation stage haven\'t been contacted in 5+ days. Engagement may be declining.',
    color: 'var(--amber-400)',
    bgColor: 'var(--amber-500)',
  },
  {
    type: 'insight',
    icon: Zap,
    title: 'Best time to reach out',
    description: 'Your contacts at TechCorp are most responsive on Tuesdays between 10-11 AM.',
    color: 'var(--cyan-400)',
    bgColor: 'var(--cyan-500)',
  },
];

export default function AIInsightsCard() {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentInsight];
  const Icon = insight.icon;

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden h-full">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--indigo-500)]/10 via-[var(--purple-500)]/5 to-[var(--cyan-500)]/10 animate-gradient" style={{ backgroundSize: '400% 400%' }} />

      {/* Neural network pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="neural" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="currentColor" />
            <line x1="30" y1="30" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="30" y1="30" x2="0" y2="60" stroke="currentColor" strokeWidth="0.5" />
            <line x1="30" y1="30" x2="60" y2="60" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural)" />
        </svg>
      </div>

      {/* Pulsing orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] opacity-20 blur-3xl animate-glow-breathe" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--indigo-500)] to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-[var(--indigo-400)] animate-ping opacity-20" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">AI Insights</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[var(--emerald-400)] animate-pulse" />
                <span className="text-xs text-[var(--emerald-400)]">Live analysis</span>
              </div>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-[var(--indigo-400)] animate-pulse" />
        </div>

        {/* Insight content */}
        <div
          className={`flex-1 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <div
            className="p-4 rounded-xl border"
            style={{
              background: `${insight.bgColor}10`,
              borderColor: `${insight.color}30`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${insight.bgColor}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: insight.color }} />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--void-50)] mb-1">{insight.title}</h4>
                <p className="text-sm text-[var(--void-300)] leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex gap-1.5">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentInsight(index);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentInsight
                    ? 'w-6 bg-gradient-to-r from-[var(--indigo-400)] to-[var(--purple-400)]'
                    : 'bg-[var(--void-600)] hover:bg-[var(--void-500)]'
                }`}
              />
            ))}
          </div>
          <button className="flex items-center gap-1 text-sm text-[var(--indigo-400)] hover:text-[var(--indigo-300)] transition-colors group">
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
