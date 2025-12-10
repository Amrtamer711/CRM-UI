'use client';

import { Phone, Mail, Calendar, CheckSquare, Clock, User, AlertCircle } from 'lucide-react';
import type { Activity } from '@/lib/db';

interface ActivityItemProps {
  activity: Activity;
  index?: number;
}

const typeIcons: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckSquare,
};

const typeColors: Record<string, { color: string; bg: string }> = {
  call: { color: 'var(--amber-400)', bg: 'rgba(251, 191, 36, 0.15)' },
  email: { color: 'var(--cyan-400)', bg: 'rgba(34, 211, 238, 0.15)' },
  meeting: { color: 'var(--purple-400)', bg: 'rgba(192, 132, 252, 0.15)' },
  task: { color: 'var(--indigo-400)', bg: 'rgba(129, 140, 248, 0.15)' },
};

const priorityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: 'var(--rose-400)', bg: 'rgba(251, 113, 133, 0.15)' },
  medium: { color: 'var(--amber-400)', bg: 'rgba(251, 191, 36, 0.15)' },
  low: { color: 'var(--void-400)', bg: 'rgba(113, 113, 122, 0.15)' },
};

export default function ActivityItem({ activity, index = 0 }: ActivityItemProps) {
  const Icon = typeIcons[activity.type] || CheckSquare;
  const typeStyle = typeColors[activity.type] || typeColors.task;
  const priorityStyle = priorityConfig[activity.priority] || priorityConfig.medium;

  const formatDateTime = (date: string | null) => {
    if (!date) return 'No date';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const isOverdue = () => {
    if (!activity.due_date || activity.completed) return false;
    return new Date(activity.due_date) < new Date();
  };

  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 opacity-0 animate-slide-in ${
        activity.completed
          ? 'bg-[var(--void-800)]/30 border-[var(--void-700)]/30'
          : 'bg-[var(--void-800)]/60 border-[var(--void-700)] hover:bg-[var(--void-800)] hover:border-[var(--void-600)]'
      }`}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'forwards' }}
    >
      {/* Icon */}
      <div
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          activity.completed ? 'opacity-40' : ''
        }`}
        style={{ background: typeStyle.bg }}
      >
        <Icon className="w-5 h-5" style={{ color: typeStyle.color }} />
        {/* Glow on hover */}
        {!activity.completed && (
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"
            style={{ background: typeStyle.color }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-sm transition-colors ${
                activity.completed
                  ? 'text-[var(--void-500)] line-through'
                  : 'text-[var(--void-100)] group-hover:text-white'
              }`}
            >
              {activity.title}
            </h3>
            {activity.description && (
              <p className="text-xs text-[var(--void-400)] mt-1 line-clamp-1">
                {activity.description}
              </p>
            )}
          </div>

          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider flex-shrink-0"
            style={{
              background: priorityStyle.bg,
              color: priorityStyle.color,
            }}
          >
            {activity.priority}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-2.5 text-xs text-[var(--void-500)]">
          <div className={`flex items-center gap-1.5 ${isOverdue() ? 'text-[var(--rose-400)]' : ''}`}>
            {isOverdue() ? (
              <AlertCircle className="w-3.5 h-3.5" />
            ) : (
              <Clock className="w-3.5 h-3.5" />
            )}
            <span>{formatDateTime(activity.due_date)}</span>
            {isOverdue() && <span className="font-semibold">Overdue</span>}
          </div>
          {activity.contact_name && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{activity.contact_name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <button
        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          activity.completed
            ? 'bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] shadow-lg shadow-[var(--indigo-500)]/20'
            : 'border-2 border-[var(--void-600)] hover:border-[var(--indigo-500)] hover:shadow-[0_0_12px_rgba(99,102,241,0.3)]'
        }`}
      >
        {activity.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
