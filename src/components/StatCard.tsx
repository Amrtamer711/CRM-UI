'use client';

import { LucideIcon, TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  glowColor?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconColor = 'var(--indigo-500)',
  glowColor,
  delay = 0
}: StatCardProps) {
  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (change === undefined) return '';
    if (change > 0) return 'text-[var(--emerald-400)]';
    if (change < 0) return 'text-[var(--rose-400)]';
    return 'text-[var(--void-400)]';
  };

  const getTrendBg = () => {
    if (change === undefined) return '';
    if (change > 0) return 'bg-[var(--emerald-500)]/10';
    if (change < 0) return 'bg-[var(--rose-500)]/10';
    return 'bg-[var(--void-700)]';
  };

  const TrendIcon = getTrendIcon();
  const glow = glowColor || iconColor;

  return (
    <div
      className="group relative rounded-2xl p-[1px] overflow-hidden opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${iconColor}, transparent 50%, ${iconColor}40)`,
        }}
      />

      {/* Card content */}
      <div className="relative bg-[var(--void-800)] rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-[var(--void-800)]/80">
        {/* Ambient glow */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: glow }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid opacity-30 rounded-2xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${iconColor}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: iconColor }} />
              {/* Icon glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
                style={{ background: iconColor }}
              />
            </div>

            {change !== undefined && TrendIcon && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${getTrendBg()}`}>
                <TrendIcon className={`w-3.5 h-3.5 ${getTrendColor()}`} />
                <span className={`text-xs font-semibold ${getTrendColor()}`}>{Math.abs(change)}%</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-[var(--void-400)] font-medium mb-2">{title}</p>
            <p className="text-3xl font-display font-bold text-[var(--void-50)] tracking-tight">{value}</p>
            {changeLabel && change !== undefined && (
              <p className="text-xs text-[var(--void-500)] mt-3 flex items-center gap-1">
                <span>{changeLabel}</span>
                <ArrowUpRight className="w-3 h-3" />
              </p>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)` }}
        />
      </div>
    </div>
  );
}
