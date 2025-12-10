'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ActivityItem from '@/components/ActivityItem';
import ActivityDistributionChart from '@/components/charts/ActivityDistributionChart';
import ProductivityChart from '@/components/charts/ProductivityChart';
import ActivityChart from '@/components/charts/ActivityChart';
import {
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  Plus,
  Clock,
  AlertCircle,
  Sparkles,
  Brain,
  Zap,
  ArrowUpRight,
  Target,
  TrendingUp
} from 'lucide-react';
import type { Activity } from '@/lib/db';

interface ActivityWithRelations extends Activity {
  contact_name: string;
  deal_title: string;
}

const typeFilters = [
  { key: 'all', label: 'All', icon: null },
  { key: 'call', label: 'Calls', icon: Phone },
  { key: 'email', label: 'Emails', icon: Mail },
  { key: 'meeting', label: 'Meetings', icon: Calendar },
  { key: 'task', label: 'Tasks', icon: CheckSquare },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/activities')
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !activity.completed) ||
      (statusFilter === 'completed' && activity.completed);
    return matchesType && matchesStatus;
  });

  const pendingCount = activities.filter(a => !a.completed).length;
  const completedCount = activities.filter(a => a.completed).length;
  const overdueCount = activities.filter(a => {
    if (!a.due_date || a.completed) return false;
    return new Date(a.due_date) < new Date();
  }).length;
  const todayCount = activities.filter(a => {
    if (!a.due_date || a.completed) return false;
    const dueDate = new Date(a.due_date).toDateString();
    const today = new Date().toDateString();
    return dueDate === today;
  }).length;

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.due_date
      ? new Date(activity.due_date).toDateString()
      : 'No Date';

    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 86400000).toDateString();

    let groupLabel = date;
    if (date === today) groupLabel = 'Today';
    else if (date === tomorrow) groupLabel = 'Tomorrow';
    else if (date !== 'No Date') {
      groupLabel = new Date(activity.due_date!).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }

    if (!groups[groupLabel]) {
      groups[groupLabel] = [];
    }
    groups[groupLabel].push(activity);
    return groups;
  }, {} as Record<string, ActivityWithRelations[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <div className="flex flex-col items-center gap-6">
          {/* Premium loader with orbiting elements */}
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[var(--void-700)]" />
            {/* Spinning gradient ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, var(--amber-500), var(--rose-500), transparent)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                animation: 'spin 1.5s linear infinite'
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-3 rounded-full bg-[var(--void-900)] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[var(--amber-400)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            </div>
            {/* Orbiting dot */}
            <div
              className="absolute w-2 h-2 bg-[var(--amber-400)] rounded-full shadow-[0_0_10px_var(--amber-400)]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'orbit 2s linear infinite'
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-[var(--void-300)] text-sm font-medium">Loading activities</p>
            <p className="text-[var(--void-500)] text-xs mt-1">AI is organizing your schedule...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Advanced ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow orbs with liquid animation */}
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[var(--amber-500)] rounded-full opacity-[0.04] blur-[120px]"
          style={{ animation: 'liquid 20s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--purple-500)] rounded-full opacity-[0.04] blur-[100px]"
          style={{ animation: 'liquid 25s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--emerald-500)] rounded-full opacity-[0.03] blur-[80px]"
          style={{ animation: 'liquid 18s ease-in-out infinite 2s' }}
        />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      <div className="relative z-10">
        <Header
          title="Activities"
          subtitle={`${pendingCount} pending activities`}
          actions={
            <button className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--amber-500)] to-[var(--rose-500)] opacity-90 group-hover:opacity-100 transition-opacity" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Plus className="w-4 h-4 text-white relative z-10" />
              <span className="text-white relative z-10">Add Activity</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* AI Intelligence Banner */}
          <div
            className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in"
            style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--amber-500), var(--rose-500), var(--purple-500))' }}>
              <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-900)]" />
            </div>

            <div className="relative bg-gradient-to-r from-[var(--amber-500)]/10 via-[var(--void-900)] to-[var(--rose-500)]/10 p-5">
              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div
                  className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--amber-400)]/30 to-transparent"
                  style={{ animation: 'scan-line 4s linear infinite' }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--amber-500)]/20 to-[var(--rose-500)]/20 flex items-center justify-center border border-[var(--amber-500)]/30">
                      <Brain className="w-6 h-6 text-[var(--amber-400)]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-75" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[var(--void-100)] font-semibold flex items-center gap-2">
                      Smart Scheduling
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--amber-500)]/20 text-[var(--amber-400)] rounded-full border border-[var(--amber-500)]/30">
                        AI Active
                      </span>
                    </h3>
                    <p className="text-sm text-[var(--void-400)]">
                      AI is optimizing your activity prioritization and schedule
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--void-800)]/50 border border-[var(--void-700)]">
                    <Zap className="w-4 h-4 text-[var(--amber-400)]" />
                    <span className="text-sm font-medium text-[var(--void-300)]">
                      {overdueCount > 0 ? `${overdueCount} need attention` : 'All on track'}
                    </span>
                  </div>
                  {overdueCount > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--rose-500)]/10 border border-[var(--rose-500)]/20">
                      <AlertCircle className="w-4 h-4 text-[var(--rose-400)]" />
                      <span className="text-sm font-medium text-[var(--rose-400)]">Overdue</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats with Premium Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {[
              { label: 'Due Today', value: todayCount, icon: Clock, color: 'var(--amber-500)', change: todayCount > 0 ? 'Focus' : 'Clear' },
              { label: 'Overdue', value: overdueCount, icon: AlertCircle, color: 'var(--rose-500)', change: overdueCount > 0 ? 'Urgent' : 'Good' },
              { label: 'Pending', value: pendingCount, icon: Target, color: 'var(--indigo-500)', change: '+3' },
              { label: 'Completed', value: completedCount, icon: Sparkles, color: 'var(--emerald-500)', change: '+12' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${150 + index * 50}ms`, animationFillMode: 'forwards' }}
              >
                {/* Conic gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `conic-gradient(from 0deg, ${stat.color}, ${stat.color}40, ${stat.color}80, ${stat.color}40, ${stat.color})` }}
                >
                  <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
                </div>

                <div className="relative bg-[var(--void-850)]/90 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-2xl p-5 h-full transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--void-850)]">
                  {/* Chrome reflection */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                  {/* Ambient glow */}
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 blur-[50px] transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"
                    style={{ background: `radial-gradient(circle, ${stat.color}, transparent 60%)` }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        boxShadow: `0 0 0 1px ${stat.color}25`
                      }}
                    >
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[var(--void-400)] font-medium">{stat.label}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-2xl font-display font-bold text-[var(--void-50)]">{stat.value}</p>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${
                          stat.label === 'Overdue' && stat.value > 0
                            ? 'text-[var(--rose-400)]'
                            : 'text-[var(--emerald-400)]'
                        }`}>
                          {stat.change}
                          {typeof stat.change === 'string' && stat.change.startsWith('+') && (
                            <ArrowUpRight className="w-3 h-3" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <ActivityDistributionChart />
            <ProductivityChart />
            <div className="lg:col-span-1">
              <ActivityChart />
            </div>
          </div>

          {/* Filters with premium styling */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
            {/* Type Filter */}
            <div className="relative flex items-center bg-[var(--void-850)]/80 backdrop-blur-sm border border-[var(--void-700)]/50 rounded-xl p-1.5 gap-1">
              {typeFilters.map((filter, index) => (
                <button
                  key={filter.key}
                  onClick={() => setTypeFilter(filter.key)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
                    typeFilter === filter.key
                      ? 'text-white'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-700)]/50'
                  }`}
                >
                  {typeFilter === filter.key && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] rounded-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer-fast" />
                    </>
                  )}
                  {filter.icon && <filter.icon className="w-4 h-4 relative z-10" />}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="relative flex items-center bg-[var(--void-850)]/80 backdrop-blur-sm border border-[var(--void-700)]/50 rounded-xl p-1.5 gap-1">
              {(['all', 'pending', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 overflow-hidden ${
                    statusFilter === status
                      ? 'text-white'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-700)]/50'
                  }`}
                >
                  {statusFilter === status && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] rounded-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer-fast" />
                    </>
                  )}
                  <span className="relative z-10">{status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-8">
            {Object.entries(groupedActivities).map(([date, dateActivities], groupIndex) => (
              <div
                key={date}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${300 + groupIndex * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-display text-lg font-bold text-[var(--void-50)] flex items-center gap-2">
                    {date}
                    {date === 'Today' && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--amber-500)]/15 text-[var(--amber-400)] rounded-full border border-[var(--amber-500)]/25">
                        Focus
                      </span>
                    )}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--void-700)] via-[var(--void-700)]/50 to-transparent" />
                  <span className="text-sm text-[var(--void-400)] px-2 py-1 bg-[var(--void-800)]/50 rounded-md">
                    {dateActivities.length} {dateActivities.length === 1 ? 'activity' : 'activities'}
                  </span>
                </div>
                <div className="space-y-3">
                  {dateActivities.map((activity, index) => (
                    <ActivityItem key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(groupedActivities).length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <div className="relative w-20 h-20 rounded-2xl bg-[var(--void-850)] border border-[var(--void-700)]/50 flex items-center justify-center mb-4">
                  {/* Chrome reflection */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />
                  <CheckSquare className="w-10 h-10 text-[var(--void-500)]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--void-100)] mb-2">No activities found</h3>
                <p className="text-sm text-[var(--void-400)] text-center max-w-md">
                  {statusFilter === 'completed' ? 'No completed activities yet' : 'All caught up! No pending activities.'}
                </p>
                <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-700)] text-[var(--void-100)] rounded-xl font-medium text-sm transition-all">
                  <Plus className="w-4 h-4" />
                  Create activity
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
