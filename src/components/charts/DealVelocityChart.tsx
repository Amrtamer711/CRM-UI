'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Sparkles } from 'lucide-react';

const data = [
  { month: 'Jan', avgDays: 45, deals: 8 },
  { month: 'Feb', avgDays: 42, deals: 12 },
  { month: 'Mar', avgDays: 38, deals: 15 },
  { month: 'Apr', avgDays: 35, deals: 18 },
  { month: 'May', avgDays: 32, deals: 22 },
  { month: 'Jun', avgDays: 28, deals: 25 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-4 shadow-2xl">
        <p className="text-[var(--void-50)] font-bold mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[var(--void-300)] text-sm">
            Avg. Time: <span className="text-[var(--cyan-400)] font-semibold">{payload[0].value} days</span>
          </p>
          <p className="text-[var(--void-400)] text-sm">
            {data.find(d => d.month === label)?.deals} deals closed
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function DealVelocityChart() {
  const latestVelocity = data[data.length - 1].avgDays;
  const previousVelocity = data[data.length - 2].avgDays;
  const improvement = ((previousVelocity - latestVelocity) / previousVelocity * 100).toFixed(0);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-500)]/5 via-transparent to-[var(--indigo-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--cyan-500)] to-[var(--indigo-500)] flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              {/* AI indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--emerald-400)] rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-[var(--void-900)]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Deal Velocity</h3>
              <p className="text-sm text-[var(--void-400)]">Average time to close</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-[var(--void-50)]">{latestVelocity} days</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className="text-xs text-[var(--emerald-400)] font-semibold">↓ {improvement}%</span>
              <span className="text-xs text-[var(--void-400)]">faster</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <filter id="velocityGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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
                domain={[0, 50]}
                tickFormatter={(value) => `${value}d`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="avgDays"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: '#22d3ee', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#22d3ee', stroke: '#22d3ee', strokeWidth: 2, strokeOpacity: 0.3 }}
                filter="url(#velocityGlow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight */}
        <div className="mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex items-start gap-2 p-3 bg-[var(--indigo-500)]/10 border border-[var(--indigo-500)]/20 rounded-xl">
            <Sparkles className="w-4 h-4 text-[var(--indigo-400)] mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[var(--indigo-400)]">AI Insight</p>
              <p className="text-xs text-[var(--void-300)] mt-1">
                Deal velocity improved by 38% over 6 months. Proposal stage shows the best improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
