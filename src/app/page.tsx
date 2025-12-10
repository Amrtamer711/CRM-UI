'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import DealCard from '@/components/DealCard';
import ActivityItem from '@/components/ActivityItem';
import {
  Users,
  Building2,
  DollarSign,
  Trophy,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { Deal, Activity, Contact } from '@/lib/db';

interface DashboardData {
  stats: {
    totalContacts: number;
    totalCompanies: number;
    totalDealValue: number;
    wonDealsValue: number;
    pendingActivities: number;
  };
  dealsByStage: Array<{ stage: string; count: number; value: number }>;
  recentDeals: Deal[];
  upcomingActivities: Activity[];
  recentContacts: (Contact & { company_name: string })[];
}

const stageOrder = ['lead', 'qualified', 'proposal', 'negotiation', 'won'];
const stageLabels: Record<string, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
};
const stageColors: Record<string, string> = {
  lead: 'var(--void-400)',
  qualified: 'var(--cyan-400)',
  proposal: 'var(--indigo-400)',
  negotiation: 'var(--purple-400)',
  won: 'var(--emerald-400)',
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dashboard:', err);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-[var(--void-700)] rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[var(--indigo-500)] rounded-full animate-spin" />
          </div>
          <p className="text-[var(--void-400)] text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--void-950)]">
        <p className="text-[var(--void-400)]">Failed to load dashboard data</p>
      </div>
    );
  }

  const pipelineData = stageOrder.map((stage) => {
    const stageData = data.dealsByStage.find((s) => s.stage === stage);
    return {
      stage,
      label: stageLabels[stage],
      count: stageData?.count || 0,
      value: stageData?.value || 0,
      color: stageColors[stage],
    };
  });

  const totalPipelineValue = pipelineData.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--indigo-500)] rounded-full opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--purple-500)] rounded-full opacity-[0.03] blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--cyan-500)] rounded-full opacity-[0.02] blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Header
          title="Dashboard"
          subtitle="Welcome back. Here's your pipeline overview."
        />

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Contacts"
              value={data.stats.totalContacts}
              change={12}
              icon={Users}
              iconColor="var(--indigo-500)"
              delay={0}
            />
            <StatCard
              title="Companies"
              value={data.stats.totalCompanies}
              change={8}
              icon={Building2}
              iconColor="var(--cyan-500)"
              delay={80}
            />
            <StatCard
              title="Pipeline Value"
              value={formatCurrency(data.stats.totalDealValue)}
              change={24}
              icon={DollarSign}
              iconColor="var(--purple-500)"
              delay={160}
            />
            <StatCard
              title="Won Deals"
              value={formatCurrency(data.stats.wonDealsValue)}
              change={18}
              icon={Trophy}
              iconColor="var(--emerald-500)"
              delay={240}
            />
          </div>

          {/* Pipeline Overview */}
          <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl p-6 opacity-0 animate-fade-in overflow-hidden" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            {/* Card glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[60px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--void-50)]">Pipeline Overview</h2>
                  <p className="text-sm text-[var(--void-400)] mt-1">Deal stages and values</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--emerald-500)]/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-[var(--emerald-400)]" />
                  <span className="text-[var(--emerald-400)] text-sm font-semibold">+24%</span>
                  <span className="text-[var(--void-400)] text-sm">this month</span>
                </div>
              </div>

              {/* Pipeline bars */}
              <div className="space-y-5">
                {pipelineData.map((stage, index) => {
                  const percentage = totalPipelineValue > 0 ? (stage.value / totalPipelineValue) * 100 : 0;
                  return (
                    <div
                      key={stage.stage}
                      className="group opacity-0 animate-slide-in"
                      style={{ animationDelay: `${400 + index * 60}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                            style={{
                              background: stage.color,
                              boxShadow: `0 0 12px ${stage.color}40`,
                            }}
                          />
                          <span className="text-sm font-medium text-[var(--void-100)]">{stage.label}</span>
                          <span className="text-xs text-[var(--void-500)] bg-[var(--void-700)]/50 px-2 py-0.5 rounded-md">{stage.count} deals</span>
                        </div>
                        <span className="text-sm font-bold text-[var(--void-50)]">
                          {formatCurrency(stage.value)}
                        </span>
                      </div>
                      <div className="h-2 bg-[var(--void-700)]/50 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{
                            width: `${percentage}%`,
                            background: `linear-gradient(90deg, ${stage.color}, ${stage.color}80)`,
                            boxShadow: `0 0 20px ${stage.color}40`,
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Deals */}
            <div className="lg:col-span-2 relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl p-6 opacity-0 animate-fade-in overflow-hidden" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--purple-500)] rounded-full opacity-10 blur-[60px]" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-semibold text-[var(--void-50)]">Recent Deals</h2>
                    <Sparkles className="w-4 h-4 text-[var(--indigo-400)]" />
                  </div>
                  <a href="/deals" className="text-sm text-[var(--indigo-400)] hover:text-[var(--indigo-300)] flex items-center gap-1 transition-colors group">
                    View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.recentDeals.slice(0, 4).map((deal, index) => (
                    <DealCard key={deal.id} deal={deal} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Activities */}
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl p-6 opacity-0 animate-fade-in overflow-hidden" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--cyan-500)] rounded-full opacity-10 blur-[60px]" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-semibold text-[var(--void-50)]">Activities</h2>
                    <span className="px-2.5 py-1 bg-gradient-to-r from-[var(--indigo-500)]/20 to-[var(--purple-500)]/20 text-[var(--indigo-400)] text-xs font-semibold rounded-full border border-[var(--indigo-500)]/20">
                      {data.stats.pendingActivities} pending
                    </span>
                  </div>
                  <a href="/activities" className="text-sm text-[var(--indigo-400)] hover:text-[var(--indigo-300)] flex items-center gap-1 transition-colors group">
                    View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="space-y-3">
                  {data.upcomingActivities.slice(0, 4).map((activity, index) => (
                    <ActivityItem key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl p-6 opacity-0 animate-fade-in overflow-hidden" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[60px]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-[var(--void-50)]">Recent Contacts</h2>
                <a href="/contacts" className="text-sm text-[var(--indigo-400)] hover:text-[var(--indigo-300)] flex items-center gap-1 transition-colors group">
                  View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.recentContacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className="group flex items-center gap-4 p-4 bg-[var(--void-700)]/30 rounded-xl border border-[var(--void-700)]/50 hover:border-[var(--indigo-500)]/30 hover:bg-[var(--void-700)]/50 transition-all cursor-pointer opacity-0 animate-fade-in"
                    style={{ animationDelay: `${800 + index * 50}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 transition-transform group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${contact.avatar_color || 'var(--indigo-500)'}, ${contact.avatar_color || 'var(--indigo-500)'}80)`,
                        }}
                      >
                        {contact.first_name[0]}{contact.last_name[0]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--emerald-500)] rounded-full border-2 border-[var(--void-800)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--void-100)] truncate group-hover:text-white transition-colors">
                        {contact.first_name} {contact.last_name}
                      </p>
                      <p className="text-xs text-[var(--void-400)] truncate">{contact.title}</p>
                      <p className="text-xs text-[var(--void-500)] truncate">{contact.company_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
