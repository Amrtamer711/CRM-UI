'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ActivityItem from '@/components/ActivityItem';
import ActivityDistributionChart from '@/components/charts/ActivityDistributionChart';
import ProductivityChart from '@/components/charts/ProductivityChart';
import ActivityChart from '@/components/charts/ActivityChart';
import { Phone, Mail, Calendar, CheckSquare, Plus, Clock, AlertCircle, Sparkles, Brain, Zap } from 'lucide-react';
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
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--amber-500)] to-[var(--rose-500)] flex items-center justify-center">
              <Brain className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--amber-400)] to-[var(--rose-400)] animate-ping opacity-20" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[var(--void-200)] text-sm font-medium">Loading activities...</p>
            <p className="text-[var(--void-500)] text-xs">AI is organizing your schedule</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Enhanced ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--amber-500)] rounded-full opacity-[0.04] blur-[100px]"
          style={{ animation: 'glow-breathe 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[var(--purple-500)] rounded-full opacity-[0.04] blur-[80px]"
          style={{ animation: 'glow-breathe 10s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute top-0 right-0 w-[350px] h-[350px] bg-[var(--emerald-500)] rounded-full opacity-[0.03] blur-[70px]"
          style={{ animation: 'glow-breathe 12s ease-in-out infinite 4s' }}
        />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-20" />

      <div className="relative z-10">
        <Header
          title="Activities"
          subtitle={`${pendingCount} pending activities`}
          actions={
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-700)] text-[var(--void-100)] rounded-xl font-medium text-sm transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* AI Status Banner */}
          <div className="relative bg-gradient-to-r from-[var(--amber-500)]/10 via-[var(--rose-500)]/10 to-[var(--purple-500)]/10 border border-[var(--amber-500)]/20 rounded-xl px-4 py-3 overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--amber-500)] to-[var(--rose-500)] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--amber-400)] to-[var(--rose-400)] animate-pulse opacity-50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--void-100)]">Smart Scheduling Active</p>
                  <p className="text-xs text-[var(--void-400)]">AI is optimizing your activity prioritization</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-lg">
                <Zap className="w-3.5 h-3.5 text-[var(--amber-400)]" />
                <span className="text-xs font-medium text-[var(--void-300)]">{overdueCount > 0 ? `${overdueCount} need attention` : 'All on track'}</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="group relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-xl p-5 overflow-hidden hover:border-[var(--amber-500)]/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--amber-500)] rounded-full opacity-15 blur-[40px] group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--amber-500)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--amber-500)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Due Today</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{todayCount}</p>
                </div>
              </div>
            </div>
            <div className="group relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-xl p-5 overflow-hidden hover:border-[var(--rose-500)]/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--rose-500)] rounded-full opacity-15 blur-[40px] group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--rose-500)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--rose-500)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-5 h-5 text-[var(--rose-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Overdue</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{overdueCount}</p>
                </div>
              </div>
            </div>
            <div className="group relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-xl p-5 overflow-hidden hover:border-[var(--indigo-500)]/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--indigo-500)] rounded-full opacity-15 blur-[40px] group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--indigo-500)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--indigo-500)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-5 h-5 text-[var(--indigo-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Pending</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{pendingCount}</p>
                </div>
              </div>
            </div>
            <div className="group relative bg-[var(--void-800)]/60 backdrop-blur-xl border border-[var(--void-700)] rounded-xl p-5 overflow-hidden hover:border-[var(--emerald-500)]/30 transition-all">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--emerald-500)] rounded-full opacity-15 blur-[40px] group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--emerald-500)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--emerald-500)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-[var(--emerald-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Completed</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{completedCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            <ActivityDistributionChart />
            <ProductivityChart />
            <div className="lg:col-span-1">
              <ActivityChart />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {/* Type Filter */}
            <div className="flex items-center bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl p-1.5 gap-1">
              {typeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTypeFilter(filter.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    typeFilter === filter.key
                      ? 'bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white shadow-lg shadow-[var(--indigo-500)]/25'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-700)]'
                  }`}
                >
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl p-1.5 gap-1">
              {(['all', 'pending', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white shadow-lg shadow-[var(--indigo-500)]/25'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-700)]'
                  }`}
                >
                  {status}
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
                  <h3 className="font-display text-lg font-bold text-[var(--void-50)]">{date}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--void-700)] to-transparent" />
                  <span className="text-sm text-[var(--void-400)]">
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
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--void-800)]/60 border border-[var(--void-700)] flex items-center justify-center mb-4">
                  <CheckSquare className="w-8 h-8 text-[var(--void-500)]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--void-100)] mb-2">No activities found</h3>
                <p className="text-sm text-[var(--void-400)]">
                  {statusFilter === 'completed' ? 'No completed activities yet' : 'All caught up! No pending activities.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
