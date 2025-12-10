'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import DealCard from '@/components/DealCard';
import ActivityItem from '@/components/ActivityItem';
import RevenueChart from '@/components/charts/RevenueChart';
import PipelineChart from '@/components/charts/PipelineChart';
import ActivityChart from '@/components/charts/ActivityChart';
import RadialChart from '@/components/charts/RadialChart';
import AIInsightsCard from '@/components/charts/AIInsightsCard';
import {
  Users,
  Building2,
  DollarSign,
  Trophy,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Brain,
  Zap,
  Activity,
  BarChart3,
  Cpu,
} from 'lucide-react';
import type { Deal, Activity as ActivityType, Contact } from '@/lib/db';

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
  upcomingActivities: ActivityType[];
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
  lead: 'var(--void-500)',
  qualified: 'var(--void-400)',
  proposal: 'var(--void-300)',
  negotiation: 'var(--void-200)',
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
        <div className="flex flex-col items-center gap-6">
          {/* Sophisticated loader */}
          <div className="relative w-24 h-24">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[var(--void-700)]" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin-slow"
              style={{
                borderTopColor: 'var(--void-200)',
                borderRightColor: 'var(--void-300)',
                animationDuration: '2s',
              }}
            />
            {/* Middle ring - reverse spin */}
            <div
              className="absolute inset-3 rounded-full border border-transparent animate-spin-reverse"
              style={{
                borderTopColor: 'var(--void-400)',
                borderLeftColor: 'var(--void-400)',
                opacity: 0.5,
                animationDuration: '3s',
              }}
            />
            {/* Inner glow orb */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
            {/* AI icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-[var(--void-200)]" />
            </div>
            {/* Orbiting dot */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-lg text-[var(--void-50)] tracking-tight">Initializing Dashboard</p>
            <p className="text-[var(--void-400)] text-sm mt-2">AI is analyzing your data...</p>
          </div>
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
      {/* Advanced ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow orbs with morphing - subtle white */}
        <div
          className="absolute -top-40 right-1/4 w-[700px] h-[700px] bg-white rounded-full opacity-[0.02] blur-[150px] animate-liquid"
        />
        <div
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-white rounded-full opacity-[0.015] blur-[120px] animate-liquid"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-20 right-1/3 w-[600px] h-[600px] bg-white rounded-full opacity-[0.015] blur-[130px] animate-liquid"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--emerald-500)] rounded-full opacity-[0.02] blur-[100px] animate-liquid"
          style={{ animationDelay: '6s' }}
        />

        {/* Subtle animated lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      </div>

      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-60" />

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Noise texture */}
      <div className="fixed inset-0 bg-noise pointer-events-none" />

      <div className="relative z-10">
        <Header
          title="Command Center"
          subtitle="AI-powered insights at a glance"
        />

        <div className="p-8 space-y-8">
          {/* AI Neural Banner - Premium */}
          <div
            className="relative overflow-hidden rounded-2xl opacity-0 animate-reveal-up"
            style={{ animationFillMode: 'forwards' }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[var(--void-500)] via-[var(--void-300)] to-[var(--void-500)] animate-gradient" style={{ backgroundSize: '200% 200%' }}>
              <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-900)]" />
            </div>

            <div className="relative bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-white/[0.03] p-5">
              {/* Holographic shimmer */}
              <div className="absolute inset-0 holo-shimmer" />

              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: 'scan-line 4s linear infinite' }} />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {/* AI Core Icon */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/20">
                      <Cpu className="w-7 h-7 text-[var(--void-950)]" />
                    </div>
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-xl bg-white animate-ping opacity-20" style={{ animationDuration: '2s' }} />
                    {/* Status indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4">
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-60" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-bold text-[var(--void-50)]">Neural Engine Online</h3>
                      <span className="px-2.5 py-1 bg-[var(--emerald-500)]/15 text-[var(--emerald-400)] text-[10px] font-bold tracking-wider uppercase rounded-full border border-[var(--emerald-500)]/30">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-[var(--void-300)] mt-1">Real-time analysis of 3 pipeline opportunities</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Insights count */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-[var(--void-800)]/60 border border-[var(--void-700)]/50 rounded-xl backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-[var(--void-200)]" />
                    <span className="text-sm font-semibold text-[var(--void-100)]">3 Insights</span>
                  </div>

                  <button className="group flex items-center gap-2 px-5 py-2.5 bg-[var(--void-800)]/80 hover:bg-[var(--void-700)] border border-[var(--void-600)]/50 rounded-xl text-sm font-semibold text-[var(--void-50)] transition-all duration-300 hover:border-white/20">
                    <span>View Analysis</span>
                    <ArrowRight className="w-4 h-4 text-[var(--void-400)] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Contacts"
              value={data.stats.totalContacts}
              change={12}
              icon={Users}
              iconColor="var(--void-100)"
              delay={0}
            />
            <StatCard
              title="Companies"
              value={data.stats.totalCompanies}
              change={8}
              icon={Building2}
              iconColor="var(--void-200)"
              delay={80}
            />
            <StatCard
              title="Pipeline Value"
              value={formatCurrency(data.stats.totalDealValue)}
              change={24}
              icon={DollarSign}
              iconColor="var(--void-100)"
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

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <RevenueChart />
            <PipelineChart />
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="lg:col-span-2">
              <ActivityChart />
            </div>
            <AIInsightsCard />
          </div>

          {/* Radial Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <RadialChart
              value={data.stats.wonDealsValue}
              target={1000000}
              title="Q4 Revenue Target"
              subtitle="Quarterly goal"
              color="#cccccc"
            />
            <RadialChart
              value={42}
              target={50}
              title="New Leads"
              subtitle="Monthly target"
              color="#999999"
            />
            <RadialChart
              value={28}
              target={30}
              title="Deals Closed"
              subtitle="This quarter"
              color="#777777"
            />
            <RadialChart
              value={89}
              target={100}
              title="Activities"
              subtitle="Weekly target"
              color="#34d399"
            />
          </div>

          {/* Pipeline Overview - Premium */}
          <div
            className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl p-[1px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-white/10" />
            </div>

            <div className="relative bg-[var(--void-850)]/80 backdrop-blur-2xl border border-[var(--void-700)]/50 rounded-2xl p-7">
              {/* Chrome reflection */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

              {/* Background accents */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-white rounded-full opacity-[0.03] blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-[80px]" />

              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/15">
                        <BarChart3 className="w-6 h-6 text-[var(--void-950)]" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-[var(--void-50)] tracking-tight">Pipeline Overview</h2>
                      <p className="text-sm text-[var(--void-400)] mt-0.5">Deal stages and values</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[var(--emerald-500)]/10 border border-[var(--emerald-500)]/25 rounded-xl">
                    <TrendingUp className="w-4 h-4 text-[var(--emerald-400)]" />
                    <span className="text-[var(--emerald-400)] text-sm font-bold">+24%</span>
                    <span className="text-[var(--void-400)] text-sm">this month</span>
                  </div>
                </div>

                {/* Pipeline bars */}
                <div className="space-y-6">
                  {pipelineData.map((stage, index) => {
                    const percentage = totalPipelineValue > 0 ? (stage.value / totalPipelineValue) * 100 : 0;
                    return (
                      <div
                        key={stage.stage}
                        className="group opacity-0 animate-slide-in"
                        style={{ animationDelay: `${700 + index * 80}ms`, animationFillMode: 'forwards' }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125"
                              style={{
                                background: stage.color,
                                boxShadow: `0 0 15px ${stage.color}80`,
                              }}
                            />
                            <span className="text-sm font-semibold text-[var(--void-100)]">{stage.label}</span>
                            <span className="text-xs text-[var(--void-500)] bg-[var(--void-800)] px-2.5 py-1 rounded-md font-medium">{stage.count} deals</span>
                          </div>
                          <span className="text-sm font-bold text-[var(--void-50)] font-display">
                            {formatCurrency(stage.value)}
                          </span>
                        </div>
                        <div className="h-3 bg-[var(--void-800)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden group-hover:brightness-110"
                            style={{
                              width: `${percentage}%`,
                              background: `linear-gradient(90deg, ${stage.color}, ${stage.color}90)`,
                              boxShadow: `0 0 25px ${stage.color}50`,
                            }}
                          >
                            {/* Animated shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Deals */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              <div className="relative bg-[var(--void-850)]/80 backdrop-blur-2xl border border-[var(--void-700)]/50 rounded-2xl p-7">
                {/* Chrome reflection */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-[80px]" />
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-xl font-bold text-[var(--void-50)]">Recent Deals</h2>
                      <Sparkles className="w-4 h-4 text-[var(--void-300)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
                    </div>
                    <a href="/deals" className="group text-sm text-[var(--void-200)] hover:text-white flex items-center gap-1.5 transition-colors font-medium">
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
            </div>

            {/* Upcoming Activities */}
            <div className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              <div className="relative bg-[var(--void-850)]/80 backdrop-blur-2xl border border-[var(--void-700)]/50 rounded-2xl p-7 h-full">
                {/* Chrome reflection */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                <div className="absolute -top-32 -right-32 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-[80px]" />
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-xl font-bold text-[var(--void-50)]">Activities</h2>
                      <span className="px-2.5 py-1 bg-white/10 text-[var(--void-100)] text-[10px] font-bold tracking-wider uppercase rounded-full border border-white/15">
                        {data.stats.pendingActivities} pending
                      </span>
                    </div>
                    <a href="/activities" className="group text-sm text-[var(--void-200)] hover:text-white flex items-center gap-1.5 transition-colors font-medium">
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
          </div>

          {/* Recent Contacts */}
          <div className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            <div className="relative bg-[var(--void-850)]/80 backdrop-blur-2xl border border-[var(--void-700)]/50 rounded-2xl p-7">
              {/* Chrome reflection */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-[80px]" />
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-[var(--void-50)]">Recent Contacts</h2>
                  <a href="/contacts" className="group text-sm text-[var(--void-200)] hover:text-white flex items-center gap-1.5 transition-colors font-medium">
                    View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.recentContacts.map((contact, index) => (
                    <div
                      key={contact.id}
                      className="group relative flex items-center gap-4 p-4 bg-[var(--void-800)]/40 rounded-xl border border-[var(--void-700)]/40 hover:border-white/15 hover:bg-[var(--void-800)]/60 transition-all duration-300 cursor-pointer opacity-0 animate-fade-in overflow-hidden"
                      style={{ animationDelay: `${1100 + index * 50}ms`, animationFillMode: 'forwards' }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${contact.avatar_color || 'var(--void-400)'}, ${contact.avatar_color || 'var(--void-400)'}80)`,
                              boxShadow: `0 4px 15px ${contact.avatar_color || 'var(--void-400)'}30`
                            }}
                          >
                            {contact.first_name[0]}{contact.last_name[0]}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5">
                            <div className="absolute inset-0 bg-[var(--emerald-500)] rounded-full border-2 border-[var(--void-850)]" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--void-100)] truncate group-hover:text-white transition-colors">
                            {contact.first_name} {contact.last_name}
                          </p>
                          <p className="text-xs text-[var(--void-400)] truncate">{contact.title}</p>
                          <p className="text-xs text-[var(--void-500)] truncate">{contact.company_name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
