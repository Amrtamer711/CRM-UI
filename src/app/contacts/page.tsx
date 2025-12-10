'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DataTable from '@/components/DataTable';
import { Mail, Phone, Building2, Filter, Search, Plus, Users, UserPlus, Clock, Sparkles, Brain, Zap, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Contact } from '@/lib/db';

interface ContactWithCompany extends Contact {
  company_name: string;
}

const statusColors: Record<string, { bg: string; text: string; glow: string }> = {
  active: { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--emerald-400)', glow: 'rgba(16, 185, 129, 0.3)' },
  lead: { bg: 'rgba(99, 102, 241, 0.12)', text: 'var(--indigo-400)', glow: 'rgba(99, 102, 241, 0.3)' },
  inactive: { bg: 'rgba(113, 113, 122, 0.12)', text: 'var(--void-400)', glow: 'rgba(113, 113, 122, 0.2)' },
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactWithCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err);
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      contact.email?.toLowerCase().includes(search.toLowerCase()) ||
      contact.company_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      label: 'Contact',
      sortable: true,
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-4 group/contact cursor-pointer">
          <div className="relative">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 transition-all duration-300 group-hover/contact:scale-105"
              style={{
                background: `linear-gradient(135deg, ${contact.avatar_color || 'var(--indigo-500)'}, ${contact.avatar_color || 'var(--indigo-500)'}80)`,
                boxShadow: `0 4px 15px ${contact.avatar_color || 'var(--indigo-500)'}40`,
              }}
            >
              {contact.first_name[0]}{contact.last_name[0]}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5">
              <div className="absolute inset-0 bg-[var(--emerald-500)] rounded-full border-2 border-[var(--void-850)]" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-[var(--void-100)] group-hover/contact:text-white transition-colors flex items-center gap-2">
              {contact.first_name} {contact.last_name}
              <ExternalLink className="w-3.5 h-3.5 text-[var(--void-500)] opacity-0 group-hover/contact:opacity-100 transition-opacity" />
            </p>
            <p className="text-xs text-[var(--void-400)]">{contact.title}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-2.5 text-[var(--void-300)] hover:text-[var(--indigo-400)] transition-colors cursor-pointer group/email">
          <div className="w-8 h-8 rounded-lg bg-[var(--void-800)]/80 flex items-center justify-center group-hover/email:bg-[var(--indigo-500)]/15 transition-colors">
            <Mail className="w-4 h-4 text-[var(--void-500)] group-hover/email:text-[var(--indigo-400)] transition-colors" />
          </div>
          <span className="truncate text-sm">{contact.email || '-'}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-2.5 text-[var(--void-300)] hover:text-[var(--cyan-400)] transition-colors cursor-pointer group/phone">
          <div className="w-8 h-8 rounded-lg bg-[var(--void-800)]/80 flex items-center justify-center group-hover/phone:bg-[var(--cyan-500)]/15 transition-colors">
            <Phone className="w-4 h-4 text-[var(--void-500)] group-hover/phone:text-[var(--cyan-400)] transition-colors" />
          </div>
          <span className="text-sm">{contact.phone || '-'}</span>
        </div>
      ),
    },
    {
      key: 'company_name',
      label: 'Company',
      sortable: true,
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-2.5 text-[var(--void-300)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--void-800)]/80 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-[var(--void-500)]" />
          </div>
          <span className="text-sm">{contact.company_name || '-'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (contact: ContactWithCompany) => {
        const colors = statusColors[contact.status] || statusColors.active;
        return (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold capitalize tracking-wide"
            style={{
              background: colors.bg,
              color: colors.text,
              boxShadow: `0 0 20px ${colors.glow}`,
              border: `1px solid ${colors.text}25`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.text }}
            />
            {contact.status}
          </span>
        );
      },
    },
    {
      key: 'last_contacted',
      label: 'Last Contact',
      sortable: true,
      render: (contact: ContactWithCompany) => {
        if (!contact.last_contacted) return <span className="text-[var(--void-500)] text-sm">Never</span>;
        const date = new Date(contact.last_contacted);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        let label = '';
        let color = 'var(--void-300)';
        if (diffDays === 0) {
          label = 'Today';
          color = 'var(--emerald-400)';
        } else if (diffDays === 1) {
          label = 'Yesterday';
          color = 'var(--cyan-400)';
        } else if (diffDays < 7) {
          label = `${diffDays} days ago`;
          color = 'var(--void-300)';
        } else {
          label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        return <span className="text-sm" style={{ color }}>{label}</span>;
      },
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--void-700)]" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: 'var(--indigo-500)',
                borderRightColor: 'var(--purple-500)',
                animation: 'spin-slow 2s linear infinite',
              }}
            />
            <div
              className="absolute inset-3 rounded-full border border-transparent"
              style={{
                borderTopColor: 'var(--cyan-400)',
                borderLeftColor: 'var(--cyan-400)',
                opacity: 0.5,
                animation: 'spin-reverse 3s linear infinite',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-7 h-7 text-[var(--indigo-400)]" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-lg text-[var(--void-50)]">Loading Contacts</p>
            <p className="text-[var(--void-400)] text-sm mt-1">Syncing your network...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeCount = contacts.filter(c => c.status === 'active').length;
  const leadCount = contacts.filter(c => c.status === 'lead').length;
  const recentCount = contacts.filter(c => {
    if (!c.last_contacted) return false;
    const date = new Date(c.last_contacted);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays < 7;
  }).length;

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Advanced ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-1/3 w-[600px] h-[600px] bg-[var(--indigo-500)] rounded-full opacity-[0.05] blur-[140px] animate-liquid"
        />
        <div
          className="absolute top-1/2 -left-32 w-[500px] h-[500px] bg-[var(--cyan-500)] rounded-full opacity-[0.04] blur-[120px] animate-liquid"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-32 right-0 w-[450px] h-[450px] bg-[var(--purple-500)] rounded-full opacity-[0.04] blur-[110px] animate-liquid"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Mesh & Grid */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-50" />
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="fixed inset-0 bg-noise pointer-events-none" />

      <div className="relative z-10">
        <Header
          title="Contacts"
          subtitle={`${contacts.length} contacts in your network`}
          actions={
            <button className="group flex items-center gap-2 px-5 py-2.5 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-600)]/50 text-[var(--void-100)] rounded-xl font-semibold text-sm transition-all duration-300 hover:border-[var(--indigo-500)]/30">
              <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              <span>Add Contact</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* AI Insights Banner */}
          <div
            className="relative overflow-hidden rounded-2xl opacity-0 animate-reveal-up"
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--indigo-500)]/10 via-[var(--purple-500)]/10 to-[var(--cyan-500)]/10" />
            <div className="absolute inset-0 rounded-2xl border border-[var(--indigo-500)]/20" />

            <div className="relative p-5">
              <div className="absolute inset-0 holo-shimmer rounded-2xl" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--indigo-500)] to-[var(--purple-600)] flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5">
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-50" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[var(--void-50)] flex items-center gap-2">
                      Contact Intelligence
                      <span className="px-2 py-0.5 bg-[var(--emerald-500)]/15 text-[var(--emerald-400)] text-[9px] font-bold tracking-wider uppercase rounded border border-[var(--emerald-500)]/30">
                        Active
                      </span>
                    </h3>
                    <p className="text-sm text-[var(--void-400)]">3 contacts need follow-up this week</p>
                  </div>
                </div>

                <button className="group flex items-center gap-2 px-4 py-2 bg-[var(--void-800)]/80 hover:bg-[var(--void-700)] border border-[var(--void-600)]/50 rounded-xl text-sm font-semibold text-[var(--void-100)] transition-all hover:border-[var(--indigo-500)]/30">
                  <Sparkles className="w-4 h-4 text-[var(--amber-400)]" />
                  <span>View Insights</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--void-400)] group-hover:text-[var(--indigo-400)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Summary - Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {/* Active Contacts */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'conic-gradient(from 0deg, var(--emerald-500), var(--emerald-500)40, var(--emerald-500)80, var(--emerald-500)40, var(--emerald-500))' }}>
                <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
              </div>
              <div className="relative bg-[var(--void-850)]/90 backdrop-blur-2xl border border-[var(--void-700)]/50 group-hover:border-transparent rounded-2xl p-6 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-[var(--emerald-500)] rounded-full opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity" />

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--emerald-500)]/20 to-[var(--emerald-500)]/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <Users className="w-6 h-6 text-[var(--emerald-400)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--void-400)] font-medium">Active Contacts</p>
                    <p className="text-3xl font-display font-bold text-[var(--void-50)] mt-1">{activeCount}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--emerald-500)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* New Leads */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'conic-gradient(from 0deg, var(--indigo-500), var(--indigo-500)40, var(--indigo-500)80, var(--indigo-500)40, var(--indigo-500))' }}>
                <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
              </div>
              <div className="relative bg-[var(--void-850)]/90 backdrop-blur-2xl border border-[var(--void-700)]/50 group-hover:border-transparent rounded-2xl p-6 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-[var(--indigo-500)] rounded-full opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity" />

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--indigo-500)]/20 to-[var(--indigo-500)]/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <UserPlus className="w-6 h-6 text-[var(--indigo-400)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--void-400)] font-medium">New Leads</p>
                    <p className="text-3xl font-display font-bold text-[var(--void-50)] mt-1">{leadCount}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--indigo-500)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Contacted This Week */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'conic-gradient(from 0deg, var(--cyan-500), var(--cyan-500)40, var(--cyan-500)80, var(--cyan-500)40, var(--cyan-500))' }}>
                <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
              </div>
              <div className="relative bg-[var(--void-850)]/90 backdrop-blur-2xl border border-[var(--void-700)]/50 group-hover:border-transparent rounded-2xl p-6 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-[var(--cyan-500)] rounded-full opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity" />

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--cyan-500)]/20 to-[var(--cyan-500)]/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <Clock className="w-6 h-6 text-[var(--cyan-400)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--void-400)] font-medium">Contacted This Week</p>
                    <p className="text-3xl font-display font-bold text-[var(--void-50)] mt-1">{recentCount}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--cyan-500)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {/* Search */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)] group-focus-within:text-[var(--indigo-400)] transition-colors" />
              <input
                type="text"
                placeholder="Search contacts by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[var(--void-850)]/80 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--indigo-500)]/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1),0_0_30px_-10px_rgba(99,102,241,0.3)] transition-all duration-300"
              />
              {/* AI hint */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-[var(--void-700)]/60 rounded-lg opacity-60">
                <Sparkles className="w-3 h-3 text-[var(--indigo-400)]" />
                <span className="text-[10px] text-[var(--void-400)]">AI Search</span>
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-10 py-3.5 bg-[var(--void-850)]/80 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-xl text-sm text-[var(--void-100)] focus:outline-none focus:border-[var(--indigo-500)]/50 appearance-none cursor-pointer min-w-[180px] transition-all duration-300"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="lead">Lead</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[var(--void-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--indigo-500)]/5 via-transparent to-[var(--purple-500)]/5" />
              <div className="relative bg-[var(--void-850)]/80 backdrop-blur-2xl border border-[var(--void-700)]/50 rounded-2xl">
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--indigo-500)]/30 to-transparent" />

                <DataTable
                  data={filteredContacts}
                  columns={columns}
                  itemsPerPage={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
