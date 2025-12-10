'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DataTable from '@/components/DataTable';
import { Mail, Phone, Building2, Filter, Search, Plus, Users, UserPlus, Clock } from 'lucide-react';
import type { Contact } from '@/lib/db';

interface ContactWithCompany extends Contact {
  company_name: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: 'rgba(16, 185, 129, 0.15)', text: 'var(--emerald-400)' },
  lead: { bg: 'rgba(99, 102, 241, 0.15)', text: 'var(--indigo-400)' },
  inactive: { bg: 'rgba(113, 113, 122, 0.15)', text: 'var(--void-400)' },
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
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${contact.avatar_color || 'var(--indigo-500)'}, ${contact.avatar_color || 'var(--indigo-500)'}80)` }}
          >
            {contact.first_name[0]}{contact.last_name[0]}
          </div>
          <div>
            <p className="font-medium text-[var(--void-100)]">
              {contact.first_name} {contact.last_name}
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
        <div className="flex items-center gap-2 text-[var(--void-300)]">
          <Mail className="w-4 h-4 text-[var(--void-500)]" />
          <span className="truncate">{contact.email || '-'}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-2 text-[var(--void-300)]">
          <Phone className="w-4 h-4 text-[var(--void-500)]" />
          <span>{contact.phone || '-'}</span>
        </div>
      ),
    },
    {
      key: 'company_name',
      label: 'Company',
      sortable: true,
      render: (contact: ContactWithCompany) => (
        <div className="flex items-center gap-2 text-[var(--void-300)]">
          <Building2 className="w-4 h-4 text-[var(--void-500)]" />
          <span>{contact.company_name || '-'}</span>
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
            className="px-2.5 py-1 rounded-md text-xs font-semibold capitalize"
            style={{
              background: colors.bg,
              color: colors.text,
            }}
          >
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
        if (!contact.last_contacted) return <span className="text-[var(--void-500)]">Never</span>;
        const date = new Date(contact.last_contacted);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        let label = '';
        if (diffDays === 0) label = 'Today';
        else if (diffDays === 1) label = 'Yesterday';
        else if (diffDays < 7) label = `${diffDays} days ago`;
        else label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return <span className="text-[var(--void-300)]">{label}</span>;
      },
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-[var(--void-700)] rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[var(--indigo-500)] rounded-full animate-spin" />
          </div>
          <p className="text-[var(--void-400)] text-sm">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--indigo-500)] rounded-full opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--cyan-500)] rounded-full opacity-[0.02] blur-[80px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Header
          title="Contacts"
          subtitle={`${contacts.length} contacts in your network`}
          actions={
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-700)] text-[var(--void-100)] rounded-xl font-medium text-sm transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)]" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--indigo-500)]/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] focus:outline-none focus:border-[var(--indigo-500)]/50 appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="lead">Lead</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--emerald-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--emerald-500)]/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--emerald-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Active Contacts</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {contacts.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--indigo-500)]/15 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-[var(--indigo-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">New Leads</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {contacts.filter(c => c.status === 'lead').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--cyan-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--cyan-500)]/15 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--cyan-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Contacted This Week</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {contacts.filter(c => {
                      if (!c.last_contacted) return false;
                      const date = new Date(c.last_contacted);
                      const now = new Date();
                      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                      return diffDays < 7;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <DataTable
              data={filteredContacts}
              columns={columns}
              itemsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
