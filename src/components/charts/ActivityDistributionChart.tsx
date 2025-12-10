'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Phone, Mail, Calendar, CheckSquare, Sparkles } from 'lucide-react';

const data = [
  { name: 'Calls', value: 35, color: '#fbbf24', icon: Phone },
  { name: 'Emails', value: 40, color: '#22d3ee', icon: Mail },
  { name: 'Meetings', value: 15, color: '#c084fc', icon: Calendar },
  { name: 'Tasks', value: 10, color: '#34d399', icon: CheckSquare },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: payload[0].payload.color }}
          />
          <p className="text-[var(--void-50)] font-bold">{payload[0].name}</p>
        </div>
        <p className="text-[var(--void-300)] text-sm mt-1">
          {payload[0].value}% of activities
        </p>
      </div>
    );
  }
  return null;
};

export default function ActivityDistributionChart() {
  const totalActivities = 156;

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--amber-500)]/5 via-transparent to-[var(--cyan-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--amber-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--amber-500)] to-[var(--rose-500)] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Activity Mix</h3>
              <p className="text-sm text-[var(--void-400)]">Distribution by type</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-[var(--void-50)]">{totalActivities}</p>
            <p className="text-xs text-[var(--void-400)]">This Week</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {data.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`activityGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                  </linearGradient>
                ))}
                <filter id="activityGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                filter="url(#activityGlow)"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#activityGradient-${index})`}
                    stroke={entry.color}
                    strokeWidth={1}
                    strokeOpacity={0.3}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-display font-bold text-[var(--void-50)]">100%</span>
            <span className="text-xs text-[var(--void-400)]">Complete</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[var(--void-700)]">
          {data.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--void-100)]">{item.name}</p>
                  <p className="text-xs text-[var(--void-400)]">{item.value}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
