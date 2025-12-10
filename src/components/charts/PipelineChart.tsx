'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { stage: 'Lead', value: 450000, count: 24, color: '#71717a' },
  { stage: 'Qualified', value: 680000, count: 18, color: '#22d3ee' },
  { stage: 'Proposal', value: 520000, count: 12, color: '#818cf8' },
  { stage: 'Negotiation', value: 380000, count: 8, color: '#c084fc' },
  { stage: 'Won', value: 920000, count: 15, color: '#34d399' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = data.find(d => d.stage === label);
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-4 shadow-2xl">
        <p className="text-[var(--void-50)] font-bold mb-1">{label}</p>
        <p className="text-[var(--void-300)] text-sm">
          Value: <span className="text-[var(--void-50)] font-semibold">${(payload[0].value / 1000).toFixed(0)}K</span>
        </p>
        <p className="text-[var(--void-400)] text-sm">
          {item?.count} deals
        </p>
      </div>
    );
  }
  return null;
};

export default function PipelineChart() {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-500)]/5 via-transparent to-[var(--emerald-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Pipeline by Stage</h3>
            <p className="text-sm text-[var(--void-400)] mt-1">Deal value distribution</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-[var(--void-50)]">${(totalValue / 1000000).toFixed(2)}M</p>
            <p className="text-xs text-[var(--void-400)]">Total Pipeline</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {data.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
                <filter id="barGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(39, 39, 42, 0.5)" vertical={false} />
              <XAxis
                dataKey="stage"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} filter="url(#barGlow)">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#barGradient-${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage indicators */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--void-700)]">
          {data.map((item) => (
            <div key={item.stage} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}80`
                }}
              />
              <span className="text-xs text-[var(--void-400)]">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
