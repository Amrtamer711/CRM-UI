'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  CalendarCheck,
  Settings,
  Search,
  LogOut,
  Sparkles,
  Command,
  Zap,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Deals', href: '/deals', icon: Handshake },
  { name: 'Activities', href: '/activities', icon: CalendarCheck },
];

const bottomNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[var(--void-950)]/90 backdrop-blur-2xl border-r border-[var(--void-800)] flex flex-col z-50">
      {/* Neural network background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated glow orbs */}
        <div
          className="absolute top-20 -left-20 w-40 h-40 bg-[var(--indigo-500)] rounded-full opacity-15 blur-[80px]"
          style={{ animation: 'glow-breathe 4s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 -left-10 w-32 h-32 bg-[var(--purple-500)] rounded-full opacity-10 blur-[60px]"
          style={{ animation: 'glow-breathe 5s ease-in-out infinite 1s' }}
        />
        <div
          className="absolute bottom-32 -left-16 w-36 h-36 bg-[var(--cyan-500)] rounded-full opacity-10 blur-[70px]"
          style={{ animation: 'glow-breathe 6s ease-in-out infinite 2s' }}
        />

        {/* Flowing data stream lines */}
        <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-[var(--indigo-500)]/10 to-transparent" />
        <div className="absolute top-0 left-[70%] w-px h-full bg-gradient-to-b from-transparent via-[var(--purple-500)]/5 to-transparent" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      {/* Logo */}
      <div className="relative p-5 border-b border-[var(--void-800)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] flex items-center justify-center shadow-lg shadow-[var(--indigo-500)]/30 group-hover:shadow-[var(--indigo-500)]/60 transition-all duration-500 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white relative z-10" />

            {/* Animated pulse ring */}
            <div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--indigo-400)] to-[var(--purple-400)]"
              style={{ animation: 'pulse-ring 3s ease-out infinite' }}
            />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--indigo-400)] to-[var(--purple-400)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-[var(--void-50)] tracking-tight flex items-center gap-2">
              Nexus
              <Zap className="w-3.5 h-3.5 text-[var(--amber-400)]" style={{ animation: 'glow-breathe 2s ease-in-out infinite' }} />
            </h1>
            <p className="text-[10px] text-[var(--void-400)] tracking-widest uppercase font-medium">AI-Powered CRM</p>
          </div>
        </Link>

        {/* AI status indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/20 rounded-full">
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 rounded-full bg-[var(--emerald-400)]" />
            <div className="absolute inset-0 rounded-full bg-[var(--emerald-400)] animate-ping opacity-75" />
          </div>
          <span className="text-[9px] font-semibold text-[var(--emerald-400)] uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative p-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--void-500)] group-focus-within:text-[var(--indigo-400)] transition-colors z-10" />
          <input
            type="text"
            placeholder="Ask AI or search..."
            className="w-full pl-10 pr-16 py-2.5 bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--indigo-500)]/50 focus:bg-[var(--void-800)] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded-md bg-gradient-to-r from-[var(--void-700)]/60 to-[var(--void-800)]/60 border border-[var(--void-600)]/50">
            <Command className="w-3 h-3 text-[var(--indigo-400)]" />
            <span className="text-[10px] text-[var(--void-400)] font-medium">K</span>
          </div>

          {/* AI hint */}
          <div className="absolute -bottom-4 left-0 flex items-center gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity">
            <Sparkles className="w-2.5 h-2.5 text-[var(--indigo-400)]" />
            <span className="text-[9px] text-[var(--void-500)]">AI-powered search</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold text-[var(--void-500)] uppercase tracking-wider">Menu</p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden
                    ${isActive
                      ? 'text-white'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-800)]/50'
                    }
                  `}
                >
                  {/* Active background with gradient */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-500)]/20 to-transparent" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-[var(--indigo-400)] to-[var(--purple-500)] rounded-r-full shadow-[0_0_12px_var(--indigo-500)]" />
                    </>
                  )}

                  <div className={`
                    relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                    ${isActive
                      ? 'bg-[var(--indigo-500)]/20'
                      : 'bg-[var(--void-800)]/50 group-hover:bg-[var(--void-700)]'
                    }
                  `}>
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[var(--indigo-400)]' : 'text-[var(--void-400)] group-hover:text-[var(--void-200)]'} transition-colors`} />
                  </div>
                  <span className="relative z-10">{item.name}</span>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-500)]/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-[var(--void-800)]">
        <ul className="space-y-1">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive
                      ? 'bg-[var(--void-800)] text-[var(--void-100)]'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-800)]/50'
                    }
                  `}
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--void-800)] flex items-center justify-center group-hover:bg-[var(--void-700)] transition-colors">
                    <item.icon className="w-4 h-4 text-[var(--void-400)] group-hover:text-[var(--void-300)] transition-colors" />
                  </div>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile */}
      <div className="relative p-4 border-t border-[var(--void-800)]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--indigo-500)]/5 to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--void-800)]/50 transition-all cursor-pointer group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--cyan-500)] to-[var(--indigo-500)] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[var(--cyan-500)]/25 group-hover:shadow-[var(--cyan-500)]/40 transition-all">
              JD
            </div>
            {/* Online indicator with pulse */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3">
              <div className="absolute inset-0 bg-[var(--emerald-500)] rounded-full border-2 border-[var(--void-950)]" />
              <div className="absolute inset-0 bg-[var(--emerald-500)] rounded-full animate-ping opacity-50 border-2 border-transparent" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--void-100)] truncate flex items-center gap-2">
              John Doe
              <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white rounded">Pro</span>
            </p>
            <p className="text-xs text-[var(--void-500)] truncate">john@nexus.io</p>
          </div>
          <LogOut className="w-4 h-4 text-[var(--void-500)] group-hover:text-[var(--rose-400)] transition-colors" />
        </div>
      </div>
    </aside>
  );
}
