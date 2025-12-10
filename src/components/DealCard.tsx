'use client';

import { Calendar, Building2, User, TrendingUp } from 'lucide-react';
import type { Deal } from '@/lib/db';

interface DealCardProps {
  deal: Deal;
  index?: number;
}

const stageConfig: Record<string, { color: string; glow: string }> = {
  lead: { color: 'var(--void-400)', glow: 'rgba(113, 113, 122, 0.3)' },
  qualified: { color: 'var(--cyan-400)', glow: 'rgba(34, 211, 238, 0.3)' },
  proposal: { color: 'var(--indigo-400)', glow: 'rgba(129, 140, 248, 0.3)' },
  negotiation: { color: 'var(--purple-400)', glow: 'rgba(192, 132, 252, 0.3)' },
  won: { color: 'var(--emerald-400)', glow: 'rgba(52, 211, 153, 0.3)' },
  lost: { color: 'var(--rose-400)', glow: 'rgba(251, 113, 133, 0.3)' },
};

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  const stage = stageConfig[deal.stage] || stageConfig.lead;

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
      className="group relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-4 cursor-pointer opacity-0 animate-fade-in transition-all duration-300 hover:bg-[var(--void-800)] hover:border-[var(--void-600)] hover:shadow-xl hover:shadow-black/20"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
    >
      {/* Probability indicator line */}
      <div
        className="absolute top-0 left-4 right-4 h-[2px] rounded-full transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${stage.color}, transparent)`,
          opacity: 0.5,
        }}
      />

      <div className="flex items-start justify-between mb-3 mt-1">
        <h3 className="font-medium text-[var(--void-100)] text-sm leading-tight pr-2 line-clamp-2 group-hover:text-white transition-colors">
          {deal.title}
        </h3>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
          style={{
            background: `${stage.color}15`,
            color: stage.color,
          }}
        >
          <TrendingUp className="w-3 h-3" />
          {deal.probability}%
        </div>
      </div>

      <p className="text-2xl font-display font-bold text-[var(--void-50)] mb-4 tracking-tight">
        {formatCurrency(deal.value)}
      </p>

      <div className="space-y-2">
        {deal.company_name && (
          <div className="flex items-center gap-2 text-xs text-[var(--void-400)]">
            <Building2 className="w-3.5 h-3.5 text-[var(--void-500)]" />
            <span className="truncate">{deal.company_name}</span>
          </div>
        )}
        {deal.contact_name && (
          <div className="flex items-center gap-2 text-xs text-[var(--void-400)]">
            <User className="w-3.5 h-3.5 text-[var(--void-500)]" />
            <span className="truncate">{deal.contact_name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-[var(--void-400)]">
          <Calendar className="w-3.5 h-3.5 text-[var(--void-500)]" />
          <span>{formatDate(deal.expected_close)}</span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${stage.glow}, transparent 60%)`,
        }}
      />
    </div>
  );
}
