'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ActivityItem from '@/components/ActivityItem';
import { Phone, Mail, Calendar, CheckSquare, Plus, Clock, AlertCircle, Sparkles } from 'lucide-react';
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
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-[var(--void-700)] rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[var(--indigo-500)] rounded-full animate-spin" />
          </div>
          <p className="text-[var(--void-400)] text-sm">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--amber-500)] rounded-full opacity-[0.02] blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[var(--purple-500)] rounded-full opacity-[0.03] blur-[80px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

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
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--amber-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--amber-500)]/15 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Due Today</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{todayCount}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--rose-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--rose-500)]/15 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[var(--rose-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Overdue</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{overdueCount}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--indigo-500)]/15 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-[var(--indigo-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Pending</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{pendingCount}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--emerald-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--emerald-500)]/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[var(--emerald-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Completed</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{completedCount}</p>
                </div>
              </div>
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
