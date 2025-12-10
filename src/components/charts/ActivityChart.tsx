'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Zap } from 'lucide-react';

const data = [
  { day: 'Mon', calls: 12, emails: 24, meetings: 4 },
  { day: 'Tue', calls: 18, emails: 32, meetings: 6 },
  { day: 'Wed', calls: 15, emails: 28, meetings: 8 },
  { day: 'Thu', calls: 22, emails: 38, meetings: 5 },
  { day: 'Fri', calls: 28, emails: 45, meetings: 10 },
  { day: 'Sat', calls: 8, emails: 12, meetings: 2 },
  { day: 'Sun', calls: 5, emails: 8, meetings: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-600)] rounded-xl p-4 shadow-2xl">
        <p className="text-[var(--void-50)] font-bold mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ActivityChart() {
  const totalActivities = data.reduce((acc, day) => acc + day.calls + day.emails + day.meetings, 0);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--amber-500)]/5 via-transparent to-[var(--rose-500)]/5" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--amber-500)]/50 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--amber-500)] to-[var(--rose-500)] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--emerald-400)] rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-[var(--void-900)]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[var(--void-50)]">Weekly Activity</h3>
              <p className="text-sm text-[var(--void-400)]">Team performance this week</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-[var(--void-50)]">{totalActivities}</p>
            <p className="text-xs text-[var(--void-400)]">Total Activities</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(39, 39, 42, 0.5)" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ fill: '#fbbf24', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#fbbf24', stroke: '#fbbf24', strokeWidth: 2, strokeOpacity: 0.3 }}
                filter="url(#lineGlow)"
              />
              <Line
                type="monotone"
                dataKey="emails"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: '#22d3ee', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#22d3ee', stroke: '#22d3ee', strokeWidth: 2, strokeOpacity: 0.3 }}
                filter="url(#lineGlow)"
              />
              <Line
                type="monotone"
                dataKey="meetings"
                stroke="#c084fc"
                strokeWidth={3}
                dot={{ fill: '#c084fc', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#c084fc', stroke: '#c084fc', strokeWidth: 2, strokeOpacity: 0.3 }}
                filter="url(#lineGlow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--void-700)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--amber-400)]" style={{ boxShadow: '0 0 8px #fbbf24' }} />
            <span className="text-sm text-[var(--void-400)]">Calls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--cyan-400)]" style={{ boxShadow: '0 0 8px #22d3ee' }} />
            <span className="text-sm text-[var(--void-400)]">Emails</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--purple-400)]" style={{ boxShadow: '0 0 8px #c084fc' }} />
            <span className="text-sm text-[var(--void-400)]">Meetings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
