'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import {
  Building2,
  Users,
  DollarSign,
  Globe,
  MapPin,
  Search,
  Plus,
  ExternalLink,
  TrendingUp,
  Brain,
  Sparkles,
  Target,
  BarChart3,
  ArrowUpRight,
  Zap
} from 'lucide-react';

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
        <div className="flex flex-col items-center gap-6">
          {/* Premium loader with orbiting elements */}
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[var(--void-700)]" />
            {/* Spinning gradient ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, var(--cyan-500), var(--indigo-500), transparent)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                animation: 'spin 1.5s linear infinite'
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-3 rounded-full bg-[var(--void-900)] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[var(--cyan-400)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            </div>
            {/* Orbiting dot */}
            <div
              className="absolute w-2 h-2 bg-[var(--cyan-400)] rounded-full shadow-[0_0_10px_var(--cyan-400)]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'orbit 2s linear infinite'
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-[var(--void-300)] text-sm font-medium">Loading companies</p>
            <p className="text-[var(--void-500)] text-xs mt-1">Analyzing network data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Advanced ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow orbs with liquid animation */}
        <div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[var(--cyan-500)] rounded-full opacity-[0.04] blur-[120px]"
          style={{ animation: 'liquid 20s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[var(--purple-500)] rounded-full opacity-[0.03] blur-[100px]"
          style={{ animation: 'liquid 25s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--indigo-500)] rounded-full opacity-[0.03] blur-[80px]"
          style={{ animation: 'liquid 18s ease-in-out infinite 2s' }}
        />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      <div className="relative z-10">
        <Header
          title="Companies"
          subtitle={`${companies.length} companies in your network`}
          actions={
            <button className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan-500)] to-[var(--indigo-500)] opacity-90 group-hover:opacity-100 transition-opacity" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Plus className="w-4 h-4 text-white relative z-10" />
              <span className="text-white relative z-10">Add Company</span>
            </button>
          }
        />

        <div className="p-8 space-y-6">
          {/* AI Intelligence Banner */}
          <div
            className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in"
            style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--cyan-500), var(--indigo-500), var(--purple-500))' }}>
              <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-900)]" />
            </div>

            <div className="relative bg-gradient-to-r from-[var(--cyan-500)]/10 via-[var(--void-900)] to-[var(--purple-500)]/10 p-5">
              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div
                  className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--cyan-400)]/30 to-transparent"
                  style={{ animation: 'scan-line 4s linear infinite' }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyan-500)]/20 to-[var(--indigo-500)]/20 flex items-center justify-center border border-[var(--cyan-500)]/30">
                      <Brain className="w-6 h-6 text-[var(--cyan-400)]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-75" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[var(--void-100)] font-semibold flex items-center gap-2">
                      Company Intelligence
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--cyan-500)]/20 text-[var(--cyan-400)] rounded-full border border-[var(--cyan-500)]/30">
                        AI Powered
                      </span>
                    </h3>
                    <p className="text-sm text-[var(--void-400)]">
                      Real-time analysis of company performance and growth opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-[var(--void-500)] uppercase tracking-wider">Network Value</p>
                    <p className="text-xl font-display font-bold text-[var(--void-50)]">{formatCurrency(totalValue)}</p>
                  </div>
                  <div className="w-px h-10 bg-[var(--void-700)]" />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/20">
                    <TrendingUp className="w-4 h-4 text-[var(--emerald-400)]" />
                    <span className="text-sm font-medium text-[var(--emerald-400)]">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats with Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {[
              { label: 'Companies', value: companies.length, icon: Building2, color: 'var(--indigo-500)', change: '+3' },
              { label: 'Total Contacts', value: totalContacts, icon: Users, color: 'var(--cyan-500)', change: '+12' },
              { label: 'Active Deals', value: totalDeals, icon: Target, color: 'var(--purple-500)', change: '+5' },
              { label: 'Pipeline Value', value: formatCurrency(totalValue), icon: BarChart3, color: 'var(--emerald-500)', change: '+18%' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${150 + index * 50}ms`, animationFillMode: 'forwards' }}
              >
                {/* Conic gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `conic-gradient(from 0deg, ${stat.color}, ${stat.color}40, ${stat.color}80, ${stat.color}40, ${stat.color})` }}
                >
                  <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
                </div>

                <div className="relative bg-[var(--void-850)]/90 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-2xl p-5 h-full transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--void-850)]">
                  {/* Chrome reflection */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                  {/* Ambient glow */}
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 blur-[50px] transition-all duration-700 group-hover:opacity-40 group-hover:scale-125"
                    style={{ background: `radial-gradient(circle, ${stat.color}, transparent 60%)` }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        boxShadow: `0 0 0 1px ${stat.color}25`
                      }}
                    >
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[var(--void-400)] font-medium">{stat.label}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-2xl font-display font-bold text-[var(--void-50)]">{stat.value}</p>
                        <span className="text-xs font-medium text-[var(--emerald-400)] flex items-center gap-0.5">
                          {stat.change}
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search with AI Enhancement */}
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--void-500)] group-focus-within:text-[var(--cyan-400)] transition-colors z-10" />
              <input
                type="text"
                placeholder="Search companies by name, industry, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-32 py-3.5 bg-[var(--void-850)]/80 backdrop-blur-sm border border-[var(--void-700)] rounded-xl text-sm text-[var(--void-100)] placeholder:text-[var(--void-500)] focus:outline-none focus:border-[var(--cyan-500)]/50 focus:bg-[var(--void-850)] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
              />
              {/* AI Search hint */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--cyan-500)]/10 border border-[var(--cyan-500)]/20">
                  <Sparkles className="w-3 h-3 text-[var(--cyan-400)]" />
                  <span className="text-[10px] font-medium text-[var(--cyan-400)] uppercase tracking-wider">AI Search</span>
                </div>
              </div>

              {/* Search glow effect on focus */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.1)' }} />
              </div>
            </div>
          </div>

          {/* Companies Grid with Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 50}ms`, animationFillMode: 'forwards' }}
              >
                {/* Animated gradient border */}
                <div
                  className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, ${company.logo_color || 'var(--indigo-500)'}, ${company.logo_color || 'var(--indigo-500)'}40, ${company.logo_color || 'var(--indigo-500)'}80, ${company.logo_color || 'var(--indigo-500)'}40, ${company.logo_color || 'var(--indigo-500)'})`,
                  }}
                >
                  <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
                </div>

                <div className="relative bg-[var(--void-850)]/90 backdrop-blur-xl border border-[var(--void-700)]/50 rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--void-850)]">
                  {/* Chrome reflection */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                  {/* Hover glow */}
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-30 blur-[60px] transition-all duration-700"
                    style={{ background: company.logo_color || 'var(--indigo-500)' }}
                  />

                  {/* Holographic shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 holo-shimmer" />
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-display font-bold text-white flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: `linear-gradient(135deg, ${company.logo_color || 'var(--indigo-500)'}, ${company.logo_color || 'var(--indigo-500)'}80)`,
                          boxShadow: `0 8px 32px ${company.logo_color || 'var(--indigo-500)'}40`
                        }}
                      >
                        {company.name.charAt(0)}
                        {/* Rotating highlight */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                          <div
                            className="absolute -inset-full"
                            style={{
                              background: `conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent)`,
                              animation: 'spin-slow 4s linear infinite'
                            }}
                          />
                        </div>
                      </div>
                      {/* AI score indicator */}
                      {company.deal_count > 0 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--void-900)] border-2 border-[var(--emerald-500)] flex items-center justify-center">
                          <Zap className="w-2.5 h-2.5 text-[var(--emerald-400)]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-[var(--void-50)] truncate group-hover:text-white transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-[var(--void-400)] flex items-center gap-1.5">
                        {company.industry || 'No industry'}
                        {company.deal_count > 2 && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[var(--amber-500)]/15 text-[var(--amber-400)] rounded border border-[var(--amber-500)]/25">
                            <Sparkles className="w-2 h-2" />
                            Hot
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative z-10 space-y-3 mb-5">
                    {company.website && (
                      <div className="flex items-center gap-2 text-sm text-[var(--void-300)]">
                        <div className="w-7 h-7 rounded-lg bg-[var(--void-700)]/50 flex items-center justify-center">
                          <Globe className="w-3.5 h-3.5 text-[var(--void-400)]" />
                        </div>
                        <a
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--cyan-400)] transition-colors flex items-center gap-1.5 group/link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company.website}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    )}
                    {company.location && (
                      <div className="flex items-center gap-2 text-sm text-[var(--void-300)]">
                        <div className="w-7 h-7 rounded-lg bg-[var(--void-700)]/50 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-[var(--void-400)]" />
                        </div>
                        <span>{company.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats with enhanced styling */}
                  <div className="relative z-10 grid grid-cols-3 gap-3 pt-5 border-t border-[var(--void-700)]/50">
                    {[
                      { label: 'Contacts', value: company.contact_count },
                      { label: 'Deals', value: company.deal_count },
                      { label: 'Value', value: formatCurrency(company.total_deal_value) }
                    ].map((item) => (
                      <div key={item.label} className="text-center group/stat">
                        <p className="text-lg font-display font-bold text-[var(--void-50)] group-hover/stat:text-white transition-colors">
                          {item.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-[var(--void-500)] font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags with premium styling */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-5">
                    {company.size && (
                      <span className="px-2.5 py-1 bg-[var(--void-700)]/40 backdrop-blur-sm text-[var(--void-300)] text-xs rounded-lg border border-[var(--void-600)]/30 font-medium">
                        {company.size} employees
                      </span>
                    )}
                    {company.revenue && (
                      <span className="px-2.5 py-1 bg-[var(--emerald-500)]/10 text-[var(--emerald-400)] text-xs rounded-lg border border-[var(--emerald-500)]/20 font-medium">
                        {company.revenue}
                      </span>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${company.logo_color || 'var(--indigo-500)'}60, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <div className="w-16 h-16 rounded-2xl bg-[var(--void-800)] flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-[var(--void-500)]" />
              </div>
              <h3 className="text-lg font-display font-semibold text-[var(--void-300)] mb-2">No companies found</h3>
              <p className="text-sm text-[var(--void-500)]">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
