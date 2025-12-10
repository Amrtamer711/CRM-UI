'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Building2, Users, DollarSign, Globe, MapPin, Search, Plus, ExternalLink, TrendingUp } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  industry: string | null;
  website: string | null;
  size: string | null;
  revenue: string | null;
  location: string | null;
  logo_color: string | null;
  contact_count: number;
  deal_count: number;
  total_deal_value: number;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching companies:', err);
        setLoading(false);
      });
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.industry?.toLowerCase().includes(search.toLowerCase()) ||
    company.location?.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const totalContacts = companies.reduce((sum, c) => sum + c.contact_count, 0);
  const totalDeals = companies.reduce((sum, c) => sum + c.deal_count, 0);
  const totalValue = companies.reduce((sum, c) => sum + c.total_deal_value, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-[var(--void-700)] rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[var(--indigo-500)] rounded-full animate-spin" />
          </div>
          <p className="text-[var(--void-400)] text-sm">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[var(--cyan-500)] rounded-full opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-[var(--purple-500)] rounded-full opacity-[0.02] blur-[80px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Header
          title="Companies"
          subtitle={`${companies.length} companies in your network`}
          actions={
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-700)] text-[var(--void-100)] rounded-xl font-medium text-sm transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Company</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--indigo-500)]/15 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--indigo-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Companies</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{companies.length}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--cyan-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--cyan-500)]/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--cyan-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Total Contacts</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{totalContacts}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--purple-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--purple-500)]/15 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[var(--purple-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Active Deals</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{totalDeals}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--emerald-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--emerald-500)]/15 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[var(--emerald-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Total Value</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">{formatCurrency(totalValue)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)]" />
            <input
              type="text"
              placeholder="Search companies by name, industry, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--indigo-500)]/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all"
            />
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="group relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl p-6 cursor-pointer opacity-0 animate-fade-in transition-all duration-300 hover:border-[var(--void-600)] hover:bg-[var(--void-800)]"
                style={{ animationDelay: `${300 + index * 50}ms`, animationFillMode: 'forwards' }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--indigo-500)]/5 to-[var(--purple-500)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Header */}
                <div className="relative z-10 flex items-start gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-display font-bold text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${company.logo_color || 'var(--indigo-500)'}, ${company.logo_color || 'var(--indigo-500)'}80)`,
                      boxShadow: `0 8px 24px ${company.logo_color || 'var(--indigo-500)'}30`
                    }}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-[var(--void-50)] truncate group-hover:text-white transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-[var(--void-400)]">{company.industry || 'No industry'}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 space-y-3 mb-5">
                  {company.website && (
                    <div className="flex items-center gap-2 text-sm text-[var(--void-300)]">
                      <Globe className="w-4 h-4 text-[var(--void-500)]" />
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--indigo-400)] transition-colors flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {company.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {company.location && (
                    <div className="flex items-center gap-2 text-sm text-[var(--void-300)]">
                      <MapPin className="w-4 h-4 text-[var(--void-500)]" />
                      <span>{company.location}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="relative z-10 grid grid-cols-3 gap-4 pt-5 border-t border-[var(--void-700)]">
                  <div className="text-center">
                    <p className="text-lg font-display font-bold text-[var(--void-50)]">{company.contact_count}</p>
                    <p className="text-xs text-[var(--void-400)]">Contacts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-display font-bold text-[var(--void-50)]">{company.deal_count}</p>
                    <p className="text-xs text-[var(--void-400)]">Deals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-display font-bold text-[var(--void-50)]">
                      {formatCurrency(company.total_deal_value)}
                    </p>
                    <p className="text-xs text-[var(--void-400)]">Value</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-5">
                  {company.size && (
                    <span className="px-2.5 py-1 bg-[var(--void-700)]/50 text-[var(--void-300)] text-xs rounded-lg">
                      {company.size} employees
                    </span>
                  )}
                  {company.revenue && (
                    <span className="px-2.5 py-1 bg-[var(--void-700)]/50 text-[var(--void-300)] text-xs rounded-lg">
                      {company.revenue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
