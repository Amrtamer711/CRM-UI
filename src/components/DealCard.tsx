'use client';

import { Calendar, Building2, User, TrendingUp, Sparkles, Zap, Target } from 'lucide-react';
import type { Deal } from '@/lib/db';

interface DealCardProps {
  deal: Deal;
  index?: number;
}

const stageConfig: Record<string, { color: string; glow: string }> = {
  lead: { color: 'var(--void-500)', glow: 'rgba(51, 51, 51, 0.3)' },
  qualified: { color: 'var(--void-400)', glow: 'rgba(85, 85, 85, 0.3)' },
  proposal: { color: 'var(--void-300)', glow: 'rgba(119, 119, 119, 0.3)' },
  negotiation: { color: 'var(--void-200)', glow: 'rgba(153, 153, 153, 0.3)' },
  won: { color: 'var(--emerald-400)', glow: 'rgba(52, 211, 153, 0.3)' },
  lost: { color: 'var(--rose-400)', glow: 'rgba(251, 113, 133, 0.3)' },
};

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  const stage = stageConfig[deal.stage] || stageConfig.lead;
  const isHighValue = (deal.value || 0) >= 50000;
  const isHighProbability = deal.probability >= 70;

  const formatCurrency = (value: number | null) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'No date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
    >
      {/* Animated conic gradient border on hover */}
      <div
        className="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${stage.color}, ${stage.color}40, ${stage.color}80, ${stage.color}40, ${stage.color})`,
        }}
      >
        <div className="absolute inset-[1px] rounded-xl bg-[var(--void-850)]" />
      </div>

      <div className="relative bg-[var(--void-850)]/90 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-xl p-4 h-full transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--void-850)]">
        {/* Chrome reflection */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-xl pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15 blur-[40px] transition-all duration-700 group-hover:opacity-35 group-hover:scale-150"
          style={{ background: `radial-gradient(circle, ${stage.color}, transparent 60%)` }}
        />

        {/* Holographic shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 holo-shimmer" />
        </div>

        {/* Stage indicator line with glow */}
        <div
          className="absolute top-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500 group-hover:h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${stage.color}, transparent)`,
            opacity: 0.6,
            boxShadow: `0 0 10px ${stage.color}40`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 mt-1">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-semibold text-[var(--void-100)] text-sm leading-tight line-clamp-2 group-hover:text-white transition-colors">
                {deal.title}
              </h3>
              {/* AI tags */}
              <div className="flex items-center gap-1.5 mt-1.5">
                {isHighValue && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-white/10 text-[var(--void-100)] rounded border border-white/20">
                    <Zap className="w-2 h-2" />
                    High Value
                  </span>
                )}
                {isHighProbability && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[var(--emerald-500)]/15 text-[var(--emerald-400)] rounded border border-[var(--emerald-500)]/25">
                    <Target className="w-2 h-2" />
                    Hot Lead
                  </span>
                )}
              </div>
            </div>
            {/* Probability badge with enhanced styling */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: `${stage.color}15`,
                color: stage.color,
                boxShadow: `0 0 0 1px ${stage.color}25`,
              }}
            >
              <TrendingUp className="w-3 h-3" />
              {deal.probability}%
            </div>
          </div>

          {/* Value with enhanced typography */}
          <div className="relative mb-4">
            <p className="text-2xl font-display font-bold text-[var(--void-50)] tracking-tight group-hover:text-white transition-colors">
              {formatCurrency(deal.value)}
            </p>
            {/* Subtle underline accent */}
            <div
              className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-16 transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${stage.color}, transparent)` }}
            />
          </div>

          {/* Details with premium styling */}
          <div className="space-y-2">
            {deal.company_name && (
              <div className="flex items-center gap-2 text-xs text-[var(--void-400)] group-hover:text-[var(--void-300)] transition-colors">
                <div className="w-6 h-6 rounded-md bg-[var(--void-700)]/50 flex items-center justify-center">
                  <Building2 className="w-3 h-3 text-[var(--void-500)]" />
                </div>
                <span className="truncate">{deal.company_name}</span>
              </div>
            )}
            {deal.contact_name && (
              <div className="flex items-center gap-2 text-xs text-[var(--void-400)] group-hover:text-[var(--void-300)] transition-colors">
                <div className="w-6 h-6 rounded-md bg-[var(--void-700)]/50 flex items-center justify-center">
                  <User className="w-3 h-3 text-[var(--void-500)]" />
                </div>
                <span className="truncate">{deal.contact_name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-[var(--void-400)] group-hover:text-[var(--void-300)] transition-colors">
              <div className="w-6 h-6 rounded-md bg-[var(--void-700)]/50 flex items-center justify-center">
                <Calendar className="w-3 h-3 text-[var(--void-500)]" />
              </div>
              <span>{formatDate(deal.expected_close)}</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-3 right-3 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${stage.color}60, transparent)` }}
        />

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(315deg, ${stage.color}15 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}
