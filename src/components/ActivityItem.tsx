'use client';

import { Phone, Mail, Calendar, CheckSquare, Clock, User, AlertCircle, Sparkles, Zap, Target } from 'lucide-react';
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

const typeColors: Record<string, { color: string; bg: string; glow: string }> = {
  call: { color: 'var(--void-200)', bg: 'rgba(153, 153, 153, 0.15)', glow: 'rgba(153, 153, 153, 0.3)' },
  email: { color: 'var(--void-300)', bg: 'rgba(119, 119, 119, 0.15)', glow: 'rgba(119, 119, 119, 0.3)' },
  meeting: { color: 'var(--void-100)', bg: 'rgba(204, 204, 204, 0.15)', glow: 'rgba(204, 204, 204, 0.3)' },
  task: { color: 'var(--void-200)', bg: 'rgba(153, 153, 153, 0.15)', glow: 'rgba(153, 153, 153, 0.3)' },
};

const priorityConfig: Record<string, { color: string; bg: string; label: string }> = {
  high: { color: 'var(--rose-400)', bg: 'rgba(251, 113, 133, 0.15)', label: 'High' },
  medium: { color: 'var(--void-200)', bg: 'rgba(153, 153, 153, 0.15)', label: 'Medium' },
  low: { color: 'var(--void-400)', bg: 'rgba(85, 85, 85, 0.15)', label: 'Low' },
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

  const isToday = () => {
    if (!activity.due_date) return false;
    const dueDate = new Date(activity.due_date).toDateString();
    const today = new Date().toDateString();
    return dueDate === today;
  };

  const isHighPriority = activity.priority === 'high';

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer opacity-0 animate-slide-in"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'forwards' }}
    >
      {/* Animated gradient border for high priority items */}
      {isHighPriority && !activity.completed && (
        <div
          className="absolute inset-0 rounded-xl p-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from 0deg, ${typeStyle.color}, ${typeStyle.color}40, ${typeStyle.color}80, ${typeStyle.color}40, ${typeStyle.color})`,
          }}
        >
          <div className="absolute inset-[1px] rounded-xl bg-[var(--void-850)]" />
        </div>
      )}

      <div
        className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
          activity.completed
            ? 'bg-[var(--void-850)]/50 border-[var(--void-700)]/30'
            : 'bg-[var(--void-850)]/80 backdrop-blur-xl border-[var(--void-700)]/50 hover:border-transparent hover:bg-[var(--void-850)]'
        }`}
      >
        {/* Chrome reflection */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-xl pointer-events-none" />

        {/* Ambient glow */}
        {!activity.completed && (
          <div
            className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-0 blur-[40px] transition-all duration-700 group-hover:opacity-30"
            style={{ background: typeStyle.color }}
          />
        )}

        {/* Holographic shimmer */}
        {!activity.completed && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 holo-shimmer" />
          </div>
        )}

        {/* Icon with enhanced styling */}
        <div
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            activity.completed ? 'opacity-40' : ''
          }`}
          style={{
            background: typeStyle.bg,
            boxShadow: activity.completed ? 'none' : `0 0 0 1px ${typeStyle.color}30`,
          }}
        >
          <Icon className="w-5 h-5 relative z-10" style={{ color: typeStyle.color }} />

          {/* Icon glow on hover */}
          {!activity.completed && (
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${typeStyle.glow} 0%, transparent 70%)`,
                boxShadow: `0 0 20px ${typeStyle.glow}`,
              }}
            />
          )}

          {/* Rotating highlight */}
          {!activity.completed && (
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              <div
                className="absolute -inset-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent)`,
                  animation: 'spin-slow 4s linear infinite',
                }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`font-semibold text-sm transition-colors ${
                    activity.completed
                      ? 'text-[var(--void-500)] line-through'
                      : 'text-[var(--void-100)] group-hover:text-white'
                  }`}
                >
                  {activity.title}
                </h3>
                {/* Smart tags */}
                {!activity.completed && (
                  <div className="flex items-center gap-1.5">
                    {isOverdue() && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[var(--rose-500)]/15 text-[var(--rose-400)] rounded border border-[var(--rose-500)]/25">
                        <AlertCircle className="w-2 h-2" />
                        Overdue
                      </span>
                    )}
                    {isToday() && !isOverdue() && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-white/15 text-white rounded border border-white/25">
                        <Zap className="w-2 h-2" />
                        Today
                      </span>
                    )}
                    {isHighPriority && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[var(--rose-500)]/15 text-[var(--rose-400)] rounded border border-[var(--rose-500)]/25">
                        <Target className="w-2 h-2" />
                        Urgent
                      </span>
                    )}
                  </div>
                )}
              </div>
              {activity.description && (
                <p className={`text-xs mt-1 line-clamp-1 ${activity.completed ? 'text-[var(--void-600)]' : 'text-[var(--void-400)]'}`}>
                  {activity.description}
                </p>
              )}
            </div>

            {/* Priority badge with enhanced styling */}
            <span
              className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: priorityStyle.bg,
                color: priorityStyle.color,
                boxShadow: activity.completed ? 'none' : `0 0 0 1px ${priorityStyle.color}25`,
              }}
            >
              {priorityStyle.label}
            </span>
          </div>

          {/* Meta with enhanced styling */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
              isOverdue()
                ? 'text-[var(--rose-400)] bg-[var(--rose-500)]/10'
                : activity.completed
                  ? 'text-[var(--void-600)]'
                  : 'text-[var(--void-400)] bg-[var(--void-700)]/30'
            }`}>
              {isOverdue() ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span>{formatDateTime(activity.due_date)}</span>
            </div>
            {activity.contact_name && (
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
                activity.completed ? 'text-[var(--void-600)]' : 'text-[var(--void-400)] bg-[var(--void-700)]/30'
              }`}>
                <User className="w-3.5 h-3.5" />
                <span>{activity.contact_name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced checkbox */}
        <button
          className={`relative w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group/check ${
            activity.completed
              ? 'bg-white shadow-lg shadow-white/30'
              : 'border-2 border-[var(--void-600)] hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-110'
          }`}
        >
          {activity.completed ? (
            <svg className="w-3.5 h-3.5 text-[var(--void-950)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <>
              {/* Hover glow ring */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover/check:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)' }} />
              {/* Sparkle icon on hover */}
              <Sparkles className="w-3 h-3 text-[var(--void-600)] opacity-0 group-hover/check:opacity-100 group-hover/check:text-white transition-all duration-300" />
            </>
          )}
        </button>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${typeStyle.color}40, transparent)` }}
        />
      </div>
    </div>
  );
}
