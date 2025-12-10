'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, Sparkles } from 'lucide-react';

interface RadialChartProps {
  value: number;
  target: number;
  title: string;
  subtitle?: string;
  color?: string;
}

export default function RadialChart({
  value,
  target,
  title,
  subtitle,
  color = '#6366f1'
}: RadialChartProps) {
  const percentage = Math.min((value / target) * 100, 100);
  const data = [
    { name: 'Progress', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${color}40 0%, transparent 70%)`
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20` }}
          >
            <Target className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--void-50)]">{title}</h3>
            {subtitle && <p className="text-xs text-[var(--void-400)]">{subtitle}</p>}
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-[160px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id={`radialGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
                <filter id="radialGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell
                  fill={`url(#radialGradient-${title})`}
                  filter="url(#radialGlow)"
                />
                <Cell fill="rgba(39, 39, 42, 0.5)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-display font-bold text-[var(--void-50)]">
              {percentage.toFixed(0)}%
            </span>
            <span className="text-xs text-[var(--void-400)]">of target</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--void-400)]">Current</span>
            <span className="font-semibold text-[var(--void-50)]">${(value / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-[var(--void-400)]">Target</span>
            <span className="text-[var(--void-300)]">${(target / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* AI indicator */}
        {percentage >= 100 && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-[var(--emerald-500)]/20 border border-[var(--emerald-500)]/30 rounded-full">
              <Sparkles className="w-3 h-3 text-[var(--emerald-400)]" />
              <span className="text-xs font-medium text-[var(--emerald-400)]">Achieved</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
