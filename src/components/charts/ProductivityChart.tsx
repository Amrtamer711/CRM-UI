'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp } from 'lucide-react';

const data = [
  { hour: '9am', activities: 8 },
  { hour: '10am', activities: 15 },
  { hour: '11am', activities: 22 },
  { hour: '12pm', activities: 12 },
  { hour: '1pm', activities: 8 },
  { hour: '2pm', activities: 25 },
  { hour: '3pm', activities: 28 },
  { hour: '4pm', activities: 20 },
  { hour: '5pm', activities: 15 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-3 shadow-2xl">
        <p className="text-[var(--void-50)] font-bold">{label}</p>
        <p className="text-[var(--void-300)] text-sm mt-1">
          <span className="text-[var(--emerald-400)] font-semibold">{payload[0].value}</span> activities
        </p>
      </div>
    );
  }
  return null;
};

export default function ProductivityChart() {
  const peakHour = data.reduce((max, item) => item.activities > max.activities ? item : max, data[0]);
  const totalActivities = data.reduce((sum, item) => sum + item.activities, 0);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-500)]/5 via-transparent to-[var(--cyan-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--emerald-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--emerald-500)] to-[var(--cyan-500)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--amber-400)] rounded-full flex items-center justify-center">
                <TrendingUp className="w-2.5 h-2.5 text-[var(--void-900)]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Productivity</h3>
              <p className="text-sm text-[var(--void-400)]">Activity by hour today</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-xs text-[var(--void-400)]">Peak:</span>
              <span className="text-sm font-semibold text-[var(--emerald-400)]">{peakHour.hour}</span>
            </div>
            <p className="text-xs text-[var(--void-500)]">{totalActivities} total today</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <filter id="productivityGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(39, 39, 42, 0.5)" vertical={false} />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="activities"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#productivityGradient)"
                filter="url(#productivityGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--emerald-400)]" style={{ boxShadow: '0 0 8px #34d399' }} />
              <span className="text-xs text-[var(--void-400)]">Morning: 45</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--cyan-400)]" style={{ boxShadow: '0 0 8px #22d3ee' }} />
              <span className="text-xs text-[var(--void-400)]">Afternoon: 108</span>
            </div>
          </div>
          <div className="px-2 py-1 bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/20 rounded-lg">
            <span className="text-xs font-semibold text-[var(--emerald-400)]">+23% vs yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
