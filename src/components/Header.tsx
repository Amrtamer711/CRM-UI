'use client';

import { Bell, Plus, ChevronDown, Zap } from 'lucide-react';
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
    { id: 2, title: 'Meeting reminder', description: 'Contract review with James Morrison', time: '1 hour ago', unread: true, type: 'meeting' },
    { id: 3, title: 'Deal stage updated', description: 'Fleet Management System moved to Negotiation', time: '3 hours ago', unread: false, type: 'update' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'deal': return 'var(--emerald-500)';
      case 'meeting': return 'var(--purple-500)';
      case 'update': return 'var(--cyan-500)';
      default: return 'var(--indigo-500)';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--void-950)]/60 backdrop-blur-2xl border-b border-[var(--void-800)]">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Title section */}
        <div className="animate-fade-in">
          <h1 className="font-display text-2xl font-semibold text-[var(--void-50)] tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--void-400)] mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {actions}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-[var(--void-800)]/50 hover:bg-[var(--void-800)] border border-[var(--void-700)] transition-all duration-200 group"
            >
              <Bell className="w-5 h-5 text-[var(--void-400)] group-hover:text-[var(--void-100)] transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-[var(--indigo-500)]/30">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-96 bg-[var(--void-800)]/95 backdrop-blur-xl border border-[var(--void-700)] rounded-2xl shadow-2xl shadow-black/40 z-50 animate-scale-in origin-top-right overflow-hidden">
                  <div className="px-5 py-4 border-b border-[var(--void-700)] flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--void-50)]">Notifications</h3>
                    <span className="px-2 py-0.5 bg-[var(--indigo-500)]/20 text-[var(--indigo-400)] text-xs font-medium rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={`px-5 py-4 hover:bg-[var(--void-700)]/30 transition-colors cursor-pointer border-b border-[var(--void-700)]/50 last:border-0 opacity-0 animate-fade-in ${notification.unread ? 'bg-[var(--indigo-500)]/5' : ''}`}
                        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{
                              background: notification.unread ? getNotificationColor(notification.type) : 'var(--void-600)',
                              boxShadow: notification.unread ? `0 0 8px ${getNotificationColor(notification.type)}` : 'none'
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--void-100)]">{notification.title}</p>
                            <p className="text-xs text-[var(--void-400)] mt-1">{notification.description}</p>
                            <p className="text-xs text-[var(--void-500)] mt-1.5">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-[var(--void-700)] bg-[var(--void-800)]/50">
                    <button className="text-sm text-[var(--indigo-400)] hover:text-[var(--indigo-300)] transition-colors font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick add button */}
          <button className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-[var(--indigo-500)]/25 hover:shadow-[var(--indigo-500)]/40 hover:scale-[1.02] group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-400)] to-[var(--purple-400)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Zap className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Create</span>
            <ChevronDown className="w-4 h-4 relative z-10 opacity-60" />
          </button>
        </div>
      </div>
    </header>
  );
}
