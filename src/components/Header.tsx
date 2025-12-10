'use client';

import { Bell, Plus, ChevronDown, Zap, Sparkles, Brain, Command, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New deal created', description: 'Enterprise Security Suite - $450,000', time: '5 min ago', unread: true, type: 'deal' },
    { id: 2, title: 'AI Insight Available', description: 'Deal momentum detected for Acme Corp', time: '15 min ago', unread: true, type: 'ai' },
    { id: 3, title: 'Meeting reminder', description: 'Contract review with James Morrison', time: '1 hour ago', unread: true, type: 'meeting' },
    { id: 4, title: 'Deal stage updated', description: 'Fleet Management System moved to Negotiation', time: '3 hours ago', unread: false, type: 'update' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'deal': return 'var(--emerald-500)';
      case 'meeting': return 'var(--void-200)';
      case 'ai': return 'var(--void-100)';
      case 'update': return 'var(--void-300)';
      default: return 'var(--void-200)';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ai': return Brain;
      default: return null;
    }
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Glass morphism background with gradient */}
      <div className="absolute inset-0 bg-[var(--void-950)]/80 backdrop-blur-2xl" />

      {/* Bottom border with gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--void-700)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="relative flex items-center justify-between px-8 py-5">
        {/* Title section with enhanced typography */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-semibold text-[var(--void-50)] tracking-tight">{title}</h1>
            {/* AI status pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
              <div className="relative w-1.5 h-1.5">
                <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[10px] font-semibold text-[var(--void-200)] uppercase tracking-wider">AI Active</span>
            </div>
          </div>
          {subtitle && (
            <p className="text-sm text-[var(--void-400)] mt-1 flex items-center gap-1.5">
              {subtitle}
              <ArrowUpRight className="w-3 h-3 text-[var(--void-500)]" />
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {actions}

          {/* Command palette hint */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-[var(--void-850)]/80 border border-[var(--void-700)]/50 rounded-xl">
            <Command className="w-3.5 h-3.5 text-[var(--void-500)]" />
            <span className="text-xs text-[var(--void-500)]">K</span>
            <span className="text-xs text-[var(--void-500)] ml-1">Quick actions</span>
          </div>

          {/* Notifications with premium styling */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="group relative p-2.5 rounded-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background with hover effect */}
              <div className="absolute inset-0 bg-[var(--void-850)]/80 border border-[var(--void-700)]/50 rounded-xl transition-all duration-300 group-hover:border-white/15 group-hover:bg-[var(--void-800)]" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.08)' }} />

              <Bell className="w-5 h-5 text-[var(--void-400)] group-hover:text-[var(--void-100)] transition-colors relative z-10" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-[var(--void-950)] z-20">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-white/30" />
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                  <span className="relative z-10">{unreadCount}</span>
                </span>
              )}
            </button>

            {/* Enhanced notifications dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-[420px] z-50 animate-scale-in origin-top-right">
                  {/* Gradient border container */}
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Border gradient */}
                    <div className="absolute inset-0 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--void-600), var(--void-800), var(--void-600))' }}>
                      <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
                    </div>

                    <div className="relative bg-[var(--void-850)]/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                      {/* Chrome reflection */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                      {/* Header */}
                      <div className="relative px-5 py-4 border-b border-[var(--void-700)]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[var(--void-50)]">Notifications</h3>
                          <span className="px-2 py-0.5 bg-white/10 text-[var(--void-100)] text-xs font-semibold rounded-full border border-white/15">
                            {unreadCount} new
                          </span>
                        </div>
                        <button className="text-xs text-[var(--void-500)] hover:text-[var(--void-300)] transition-colors">
                          Mark all read
                        </button>
                      </div>

                      {/* Notifications list */}
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.map((notification, index) => {
                          const NotificationIcon = getNotificationIcon(notification.type);
                          return (
                            <div
                              key={notification.id}
                              className={`group/item relative px-5 py-4 cursor-pointer border-b border-[var(--void-700)]/30 last:border-0 opacity-0 animate-fade-in transition-all duration-200 hover:bg-[var(--void-800)]/50 ${notification.unread ? 'bg-gradient-to-r from-white/[0.03] to-transparent' : ''}`}
                              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                            >
                              {/* Hover glow */}
                              <div
                                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover/item:opacity-100 transition-opacity"
                                style={{ background: getNotificationColor(notification.type) }}
                              />

                              <div className="flex items-start gap-3">
                                {/* Icon or dot indicator */}
                                {notification.type === 'ai' ? (
                                  <div className="relative w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/15 flex-shrink-0">
                                    <Brain className="w-4 h-4 text-[var(--void-100)]" />
                                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-[var(--void-200)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
                                  </div>
                                ) : (
                                  <div className="relative w-8 h-8 rounded-lg bg-[var(--void-700)]/50 flex items-center justify-center flex-shrink-0">
                                    <div
                                      className="w-2.5 h-2.5 rounded-full"
                                      style={{
                                        background: notification.unread ? getNotificationColor(notification.type) : 'var(--void-600)',
                                        boxShadow: notification.unread ? `0 0 10px ${getNotificationColor(notification.type)}` : 'none'
                                      }}
                                    />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-[var(--void-100)] group-hover/item:text-white transition-colors">
                                      {notification.title}
                                    </p>
                                    {notification.type === 'ai' && (
                                      <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-white/10 text-[var(--void-100)] rounded border border-white/15">
                                        AI
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-[var(--void-400)] mt-1 truncate">{notification.description}</p>
                                  <p className="text-[10px] text-[var(--void-500)] mt-1.5 uppercase tracking-wider">{notification.time}</p>
                                </div>

                                {notification.unread && (
                                  <div className="w-2 h-2 rounded-full bg-white flex-shrink-0 mt-1" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="relative px-5 py-3.5 border-t border-[var(--void-700)]/50 bg-[var(--void-900)]/50">
                        <button className="flex items-center gap-1.5 text-sm text-[var(--void-200)] hover:text-white transition-colors font-medium group/link">
                          View all notifications
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick add button with enhanced premium effect */}
          <button className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-white opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }} />

            <Zap className="w-4 h-4 text-[var(--void-950)] relative z-10" />
            <span className="relative z-10 text-[var(--void-950)] font-semibold">Create</span>
            <ChevronDown className="w-4 h-4 relative z-10 text-[var(--void-950)]/70 group-hover:text-[var(--void-950)] transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
