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
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[var(--void-950)]/80 backdrop-blur-xl border-r border-[var(--void-800)] flex flex-col z-50">
      {/* Ambient glow */}
      <div className="absolute top-20 -left-20 w-40 h-40 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-40 -left-10 w-32 h-32 bg-[var(--purple-500)] rounded-full opacity-10 blur-[60px] pointer-events-none" />

      {/* Logo */}
      <div className="p-5 border-b border-[var(--void-800)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-500)] flex items-center justify-center shadow-lg shadow-[var(--indigo-500)]/25 group-hover:shadow-[var(--indigo-500)]/40 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--indigo-400)] to-[var(--purple-400)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-[var(--void-50)] tracking-tight">Nexus</h1>
            <p className="text-[10px] text-[var(--void-400)] tracking-widest uppercase font-medium">CRM Platform</p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--void-500)] group-focus-within:text-[var(--indigo-400)] transition-colors" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-16 py-2.5 bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--indigo-500)]/50 focus:bg-[var(--void-800)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded-md bg-[var(--void-700)]/50 border border-[var(--void-600)]/50">
            <Command className="w-3 h-3 text-[var(--void-400)]" />
            <span className="text-[10px] text-[var(--void-400)] font-medium">K</span>
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
      <div className="p-4 border-t border-[var(--void-800)]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--void-800)]/50 transition-all cursor-pointer group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--cyan-500)] to-[var(--indigo-500)] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[var(--cyan-500)]/20">
              JD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--emerald-500)] rounded-full border-2 border-[var(--void-950)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--void-100)] truncate">John Doe</p>
            <p className="text-xs text-[var(--void-500)] truncate">john@nexus.io</p>
          </div>
          <LogOut className="w-4 h-4 text-[var(--void-500)] group-hover:text-[var(--void-300)] transition-colors" />
        </div>
      </div>
    </aside>
  );
}
