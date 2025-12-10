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
  iconColor = 'var(--indigo-500)',
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
    if (change > 0) return 'bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/20';
    if (change < 0) return 'bg-[var(--rose-500)]/10 border border-[var(--rose-500)]/20';
    return 'bg-[var(--void-700)]';
  };

  const TrendIcon = getTrendIcon();
  const glow = glowColor || iconColor;

  return (
    <div
      className="group relative rounded-2xl p-[1px] overflow-hidden opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${iconColor}, transparent 40%, ${iconColor}60, transparent 80%, ${iconColor}40)`,
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
        }}
      />

      {/* Card content */}
      <div className="relative bg-[var(--void-800)]/90 backdrop-blur-xl rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-[var(--void-800)]/70">
        {/* Ambient glow - enhanced */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 blur-[50px] transition-all duration-700 group-hover:opacity-50 group-hover:scale-110"
          style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
        />

        {/* Secondary glow for depth */}
        <div
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-10 blur-[30px] group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: glow }}
        />

        {/* Neural mesh pattern */}
        <div className="absolute inset-0 bg-grid opacity-20 rounded-2xl" />

        {/* Scan line effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(99, 102, 241, 0.03) 50%, transparent 55%, transparent 100%)',
            backgroundSize: '100% 200%',
            animation: 'scan-line 2s linear infinite',
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="relative">
              {/* Icon container with pulse ring */}
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${iconColor}15` }}
              >
                <Icon className="w-5 h-5 relative z-10" style={{ color: iconColor }} />

                {/* Pulse ring effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 0 0 ${iconColor}`,
                    animation: 'pulse-ring 2s ease-out infinite',
                  }}
                />

                {/* Icon glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
                  style={{ background: iconColor }}
                />
              </div>

              {/* AI indicator dot */}
              {aiEnhanced && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div
                    className="absolute inset-0 rounded-full bg-[var(--emerald-400)]"
                    style={{ animation: 'glow-breathe 2s ease-in-out infinite' }}
                  />
                  <div className="absolute inset-0 rounded-full bg-[var(--emerald-400)] animate-ping opacity-75" />
                </div>
              )}
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
            <p className="text-sm text-[var(--void-400)] font-medium mb-2 flex items-center gap-2">
              {title}
              {aiEnhanced && (
                <Sparkles className="w-3 h-3 text-[var(--indigo-400)]" style={{ animation: 'glow-breathe 2s ease-in-out infinite' }} />
              )}
            </p>
            <p
              className="text-3xl font-display font-bold text-[var(--void-50)] tracking-tight"
              style={{
                textShadow: '0 0 30px rgba(99, 102, 241, 0.1)'
              }}
            >
              {value}
            </p>
            {changeLabel && change !== undefined && (
              <p className="text-xs text-[var(--void-500)] mt-3 flex items-center gap-1">
                <span>{changeLabel}</span>
                <ArrowUpRight className="w-3 h-3" />
              </p>
            )}
          </div>
        </div>

        {/* Bottom accent line - animated */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)`,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(225deg, ${iconColor}20 0%, transparent 50%)`,
          }}
        />
      </div>
    </div>
  );
}
