'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Zap } from 'lucide-react';

const data = [
  { stage: 'Lead', value: 450000, count: 24, color: '#71717a', conversion: 100 },
  { stage: 'Qualified', value: 380000, count: 18, color: '#22d3ee', conversion: 75 },
  { stage: 'Proposal', value: 280000, count: 12, color: '#818cf8', conversion: 67 },
  { stage: 'Negotiation', value: 180000, count: 8, color: '#c084fc', conversion: 67 },
  { stage: 'Won', value: 150000, count: 6, color: '#34d399', conversion: 75 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = data.find(d => d.stage === label);
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-4 shadow-2xl">
        <p className="text-[var(--void-50)] font-bold mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[var(--void-300)] text-sm">
            Value: <span className="text-[var(--void-50)] font-semibold">${(payload[0].value / 1000).toFixed(0)}K</span>
          </p>
          <p className="text-[var(--void-400)] text-sm">
            {item?.count} deals
          </p>
          <p className="text-[var(--void-400)] text-sm">
            Conversion: <span className="text-[var(--emerald-400)] font-semibold">{item?.conversion}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function DealFunnelChart() {
  const overallConversion = ((data[data.length - 1].count / data[0].count) * 100).toFixed(0);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-500)]/5 via-transparent to-[var(--cyan-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--purple-500)]/50 to-transparent" />

      {/* Animated scan effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(139, 92, 246, 0.05) 50%, transparent 55%, transparent 100%)',
          backgroundSize: '100% 200%',
          animation: 'scan-line 3s linear infinite',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--purple-500)] to-[var(--cyan-500)] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--amber-400)] rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-[var(--void-900)]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Sales Funnel</h3>
              <p className="text-sm text-[var(--void-400)]">Conversion analysis</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-[var(--void-50)]">{overallConversion}%</p>
            <p className="text-xs text-[var(--void-400)]">Overall Conversion</p>
          </div>
        </div>

        {/* Funnel Visualization */}
        <div className="space-y-2 mb-6">
          {data.map((stage, index) => {
            const widthPercentage = 100 - (index * 15);
            return (
              <div key={stage.stage} className="relative">
                <div
                  className="h-10 rounded-lg flex items-center justify-between px-4 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    width: `${widthPercentage}%`,
                    background: `linear-gradient(90deg, ${stage.color}30, ${stage.color}10)`,
                    borderLeft: `3px solid ${stage.color}`,
                    boxShadow: `0 0 20px ${stage.color}20`,
                  }}
                >
                  <span className="text-sm font-medium text-[var(--void-100)]">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--void-400)]">{stage.count} deals</span>
                    <span className="text-sm font-bold text-[var(--void-50)]">${(stage.value / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                {index < data.length - 1 && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center">
                    <div
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                      style={{
                        background: `${stage.color}20`,
                        color: stage.color,
                      }}
                    >
                      {stage.conversion}%
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Conversion Flow Indicators */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-[var(--void-700)]">
          {data.map((stage, index) => (
            <div key={stage.stage} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: stage.color,
                  boxShadow: `0 0 10px ${stage.color}60`,
                }}
              />
              {index < data.length - 1 && (
                <div className="w-4 h-px bg-gradient-to-r from-[var(--void-600)] to-[var(--void-700)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
