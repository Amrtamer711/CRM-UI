'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', revenue: 186000, forecast: 180000 },
  { month: 'Feb', revenue: 245000, forecast: 220000 },
  { month: 'Mar', revenue: 198000, forecast: 240000 },
  { month: 'Apr', revenue: 320000, forecast: 280000 },
  { month: 'May', revenue: 389000, forecast: 340000 },
  { month: 'Jun', revenue: 425000, forecast: 400000 },
  { month: 'Jul', revenue: 478000, forecast: 450000 },
  { month: 'Aug', revenue: 512000, forecast: 490000 },
  { month: 'Sep', revenue: 567000, forecast: 540000 },
  { month: 'Oct', revenue: 623000, forecast: 600000 },
  { month: 'Nov', revenue: 689000, forecast: 670000 },
  { month: 'Dec', revenue: 745000, forecast: 720000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-4 shadow-2xl">
        <p className="text-[var(--void-400)] text-xs font-medium mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[var(--void-50)] font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--indigo-400)] mr-2" />
            Revenue: ${(payload[0].value / 1000).toFixed(0)}K
          </p>
          <p className="text-[var(--void-300)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--purple-400)] mr-2 opacity-50" />
            Forecast: ${(payload[1].value / 1000).toFixed(0)}K
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const currentRevenue = data[data.length - 1].revenue;
  const previousRevenue = data[data.length - 2].revenue;
  const growth = ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--indigo-500)]/5 via-transparent to-[var(--purple-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--indigo-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Revenue Overview</h3>
            <p className="text-sm text-[var(--void-400)] mt-1">Monthly revenue vs forecast</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/30 rounded-full">
            <TrendingUp className="w-4 h-4 text-[var(--emerald-400)]" />
            <span className="text-sm font-semibold text-[var(--emerald-400)]">+{growth}%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(39, 39, 42, 0.5)" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#a855f7"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#forecastGradient)"
                strokeOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#818cf8"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                filter="url(#glow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--indigo-400)] to-[var(--indigo-500)]" />
            <span className="text-sm text-[var(--void-400)]">Actual Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--purple-400)] opacity-50" />
            <span className="text-sm text-[var(--void-400)]">Forecast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
