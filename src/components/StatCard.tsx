'use client';

import { LucideIcon, TrendingUp, TrendingDown, Minus, ArrowUpRight, Sparkles } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  glowColor?: string;
  delay?: number;
  aiEnhanced?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconColor = 'var(--void-100)',
  glowColor,
  delay = 0,
  aiEnhanced = false
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
    if (change > 0) return 'bg-[var(--emerald-500)]/12 border border-[var(--emerald-500)]/25';
    if (change < 0) return 'bg-[var(--rose-500)]/12 border border-[var(--rose-500)]/25';
    return 'bg-[var(--void-700)]';
  };

  const TrendIcon = getTrendIcon();
  const glow = glowColor || iconColor;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${iconColor}, ${iconColor}40, ${iconColor}80, ${iconColor}40, ${iconColor})`,
        }}
      >
        <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
      </div>

      {/* Card content */}
      <div className="relative bg-[var(--void-850)]/90 backdrop-blur-2xl rounded-2xl p-6 h-full transition-all duration-500 border border-[var(--void-700)]/50 group-hover:border-transparent group-hover:bg-[var(--void-850)]">
        {/* Chrome reflection */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

        {/* Primary ambient glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20 blur-[60px] transition-all duration-700 group-hover:opacity-50 group-hover:scale-125"
          style={{ background: `radial-gradient(circle, ${glow}, transparent 60%)` }}
        />

        {/* Secondary glow for depth */}
        <div
          className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full opacity-0 blur-[40px] group-hover:opacity-30 transition-all duration-700"
          style={{ background: glow }}
        />

        {/* Holographic shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 holo-shimmer" />
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
          <div
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: 'scan-line 3s linear infinite' }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              {/* Icon container with liquid effect */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
                  boxShadow: `0 0 0 1px ${iconColor}20`,
                }}
              >
                <Icon
                  className="w-6 h-6 relative z-10 transition-all duration-500 group-hover:scale-110"
                  style={{ color: iconColor }}
                />

                {/* Icon glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${iconColor}30 0%, transparent 70%)`,
                    boxShadow: `0 0 30px ${iconColor}40, inset 0 0 20px ${iconColor}10`,
                  }}
                />

                {/* Rotating highlight */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                >
                  <div
                    className="absolute -inset-full"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${iconColor}20, transparent)`,
                      animation: 'spin-slow 4s linear infinite',
                    }}
                  />
                </div>
              </div>

              {/* AI indicator dot */}
              {aiEnhanced && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4">
                  <div className="absolute inset-0 rounded-full bg-[var(--emerald-400)] shadow-[0_0_10px_var(--emerald-400)]" />
                  <div className="absolute inset-0 rounded-full bg-[var(--emerald-400)] animate-ping opacity-50" />
                </div>
              )}
            </div>

            {change !== undefined && TrendIcon && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${getTrendBg()} transition-all duration-300 group-hover:scale-105`}>
                <TrendIcon className={`w-3.5 h-3.5 ${getTrendColor()}`} />
                <span className={`text-xs font-bold ${getTrendColor()}`}>{Math.abs(change)}%</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-[var(--void-400)] font-medium mb-3 flex items-center gap-2">
              {title}
              {aiEnhanced && (
                <Sparkles className="w-3 h-3 text-[var(--void-300)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
              )}
            </p>
            <p
              className="text-4xl font-display font-bold text-[var(--void-50)] tracking-tight transition-all duration-500 group-hover:tracking-normal"
            >
              {value}
            </p>
            {changeLabel && change !== undefined && (
              <p className="text-xs text-[var(--void-500)] mt-4 flex items-center gap-1.5 group-hover:text-[var(--void-400)] transition-colors">
                <span>{changeLabel}</span>
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            )}
          </div>
        </div>

        {/* Bottom accent line - animated */}
        <div
          className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${iconColor}60, transparent)`,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(225deg, ${iconColor}15 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, ${iconColor}10 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}
