'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DealCard from '@/components/DealCard';
import DealFunnelChart from '@/components/charts/DealFunnelChart';
import DealVelocityChart from '@/components/charts/DealVelocityChart';
import RadialChart from '@/components/charts/RadialChart';
import {
  Plus,
  DollarSign,
  TrendingUp,
  Target,
  Sparkles,
  Brain,
  Zap,
  ArrowUpRight,
  BarChart3,
  Trophy
} from 'lucide-react';
import type { Deal } from '@/lib/db';

interface DealWithRelations extends Deal {
  contact_name: string;
  company_name: string;
}

const stages = [
  { key: 'lead', label: 'Lead', color: 'var(--void-400)' },
  { key: 'qualified', label: 'Qualified', color: 'var(--cyan-400)' },
  { key: 'proposal', label: 'Proposal', color: 'var(--indigo-400)' },
  { key: 'negotiation', label: 'Negotiation', color: 'var(--purple-400)' },
  { key: 'won', label: 'Won', color: 'var(--emerald-400)' },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<DealWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline');

  useEffect(() => {
    fetch('/api/deals')
      .then((res) => res.json())
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching deals:', err);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalPipelineValue = deals
    .filter(d => d.stage !== 'lost')
    .reduce((sum, deal) => sum + (deal.value || 0), 0);

  const weightedValue = deals
    .filter(d => d.stage !== 'lost' && d.stage !== 'won')
    .reduce((sum, deal) => sum + ((deal.value || 0) * (deal.probability / 100)), 0);

  const wonValue = deals
    .filter(d => d.stage === 'won')
    .reduce((sum, deal) => sum + (deal.value || 0), 0);

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
                background: 'conic-gradient(from 0deg, transparent, var(--purple-500), var(--indigo-500), transparent)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
                animation: 'spin 1.5s linear infinite'
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-3 rounded-full bg-[var(--void-900)] flex items-center justify-center">
              <Brain className="w-6 h-6 text-[var(--purple-400)]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            </div>
            {/* Orbiting dots */}
            <div
              className="absolute w-2 h-2 bg-[var(--indigo-400)] rounded-full shadow-[0_0_10px_var(--indigo-400)]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'orbit 2s linear infinite'
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-[var(--void-300)] text-sm font-medium">Analyzing pipeline</p>
            <p className="text-[var(--void-500)] text-xs mt-1">AI is processing your deals...</p>
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
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--purple-500)] rounded-full opacity-[0.04] blur-[120px]"
          style={{ animation: 'liquid 20s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--indigo-500)] rounded-full opacity-[0.04] blur-[100px]"
          style={{ animation: 'liquid 25s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--cyan-500)] rounded-full opacity-[0.03] blur-[80px]"
          style={{ animation: 'liquid 18s ease-in-out infinite 2s' }}
        />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      <div className="relative z-10">
        <Header
          title="Deals"
          subtitle={`${deals.length} deals in your pipeline`}
          actions={
            <div className="flex items-center gap-3">
              {/* View toggle with premium styling */}
              <div className="relative flex items-center bg-[var(--void-850)]/80 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-1">
                {/* Sliding indicator */}
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] shadow-lg shadow-[var(--indigo-500)]/25 transition-all duration-300"
                  style={{ left: view === 'pipeline' ? '4px' : 'calc(50% + 2px)' }}
                />
                <button
                  onClick={() => setView('pipeline')}
                  className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'pipeline' ? 'text-white' : 'text-[var(--void-400)] hover:text-[var(--void-100)]'
                  }`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'list' ? 'text-white' : 'text-[var(--void-400)] hover:text-[var(--void-100)]'
                  }`}
                >
                  List
                </button>
              </div>
              {/* Add Deal button with premium effect */}
              <button className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] opacity-90 group-hover:opacity-100 transition-opacity" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus className="w-4 h-4 text-white relative z-10" />
                <span className="text-white relative z-10">Add Deal</span>
              </button>
            </div>
          }
        />

        <div className="p-8 space-y-6">
          {/* AI Intelligence Banner */}
          <div
            className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in"
            style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--purple-500), var(--indigo-500), var(--cyan-500))' }}>
              <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-900)]" />
            </div>

            <div className="relative bg-gradient-to-r from-[var(--purple-500)]/10 via-[var(--void-900)] to-[var(--indigo-500)]/10 p-5">
              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div
                  className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--purple-400)]/30 to-transparent"
                  style={{ animation: 'scan-line 4s linear infinite' }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--purple-500)]/20 to-[var(--indigo-500)]/20 flex items-center justify-center border border-[var(--purple-500)]/30">
                      <Brain className="w-6 h-6 text-[var(--purple-400)]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full" />
                      <div className="absolute inset-0 bg-[var(--emerald-400)] rounded-full animate-ping opacity-75" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[var(--void-100)] font-semibold flex items-center gap-2">
                      Pipeline Intelligence
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[var(--purple-500)]/20 text-[var(--purple-400)] rounded-full border border-[var(--purple-500)]/30">
                        AI Active
                      </span>
                    </h3>
                    <p className="text-sm text-[var(--void-400)]">
                      Analyzing deal patterns and predicting outcomes in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--amber-500)]/10 border border-[var(--amber-500)]/20">
                    <Zap className="w-4 h-4 text-[var(--amber-400)]" />
                    <span className="text-sm font-medium text-[var(--amber-400)]">3 insights</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--void-500)] uppercase tracking-wider">Win Rate</p>
                    <p className="text-xl font-display font-bold text-[var(--emerald-400)]">68%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats with Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            {[
              { label: 'Total Pipeline', value: formatCurrency(totalPipelineValue), icon: DollarSign, color: 'var(--indigo-500)', change: '+18%' },
              { label: 'Weighted Value', value: formatCurrency(weightedValue), icon: Target, color: 'var(--cyan-500)', change: '+12%' },
              { label: 'Won This Period', value: formatCurrency(wonValue), icon: Trophy, color: 'var(--emerald-500)', change: '+24%' }
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

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <DealFunnelChart />
            <DealVelocityChart />
          </div>

          {/* Target Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
            <RadialChart
              value={wonValue}
              target={1000000}
              title="Q4 Revenue Target"
              subtitle="Current quarter"
              color="#34d399"
            />
            <RadialChart
              value={deals.filter(d => d.stage === 'won').length}
              target={25}
              title="Deals Won"
              subtitle="Target: 25 deals"
              color="#818cf8"
            />
            <RadialChart
              value={weightedValue}
              target={750000}
              title="Weighted Pipeline"
              subtitle="Qualified opportunities"
              color="#22d3ee"
            />
          </div>

          {/* Pipeline View */}
          {view === 'pipeline' && (
            <div className="flex gap-4 overflow-x-auto pb-4 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              {stages.map((stage, stageIndex) => {
                const stageDeals = deals.filter(d => d.stage === stage.key);
                const stageValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);

                return (
                  <div
                    key={stage.key}
                    className="flex-shrink-0 w-80 opacity-0 animate-slide-in"
                    style={{ animationDelay: `${350 + stageIndex * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Stage Header with premium styling */}
                    <div className="relative group rounded-t-2xl overflow-hidden">
                      {/* Gradient border effect */}
                      <div
                        className="absolute inset-x-0 top-0 h-[2px] opacity-80"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`,
                          boxShadow: `0 0 15px ${stage.color}50`
                        }}
                      />

                      <div className="bg-[var(--void-850)]/90 backdrop-blur-xl border border-[var(--void-700)]/50 border-b-0 rounded-t-2xl p-4">
                        {/* Chrome reflection */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="relative">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  background: stage.color,
                                  boxShadow: `0 0 12px ${stage.color}`
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  background: stage.color,
                                  opacity: 0.3
                                }}
                              />
                            </div>
                            <h3 className="font-semibold text-[var(--void-100)]">{stage.label}</h3>
                          </div>
                          <span className="text-sm text-[var(--void-400)] px-2 py-0.5 bg-[var(--void-700)]/50 rounded-md">
                            {stageDeals.length} deals
                          </span>
                        </div>
                        <p className="text-2xl font-display font-bold text-[var(--void-50)]">
                          {formatCurrency(stageValue)}
                        </p>
                      </div>
                    </div>

                    {/* Stage Cards Container */}
                    <div className="bg-[var(--void-900)]/70 backdrop-blur-xl border border-[var(--void-700)]/50 border-t-0 rounded-b-2xl p-3 min-h-[400px] space-y-3">
                      {stageDeals.map((deal, index) => (
                        <DealCard key={deal.id} deal={deal} index={index} />
                      ))}
                      {stageDeals.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-32 text-sm text-[var(--void-500)]">
                          <div className="w-10 h-10 rounded-xl bg-[var(--void-800)] flex items-center justify-center mb-2">
                            <BarChart3 className="w-5 h-5 text-[var(--void-600)]" />
                          </div>
                          No deals in this stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <div className="relative rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--void-700), var(--void-800), var(--void-700))' }}>
                <div className="absolute inset-[1px] rounded-2xl bg-[var(--void-850)]" />
              </div>

              <div className="relative bg-[var(--void-850)]/90 backdrop-blur-xl rounded-2xl overflow-hidden">
                {/* Chrome reflection */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

                <table className="w-full relative z-10">
                  <thead>
                    <tr className="border-b border-[var(--void-700)]/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Deal</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Value</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Expected Close</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--void-700)]/30">
                    {deals.filter(d => d.stage !== 'lost').map((deal, index) => {
                      const stageInfo = stages.find(s => s.key === deal.stage);
                      const isHighValue = (deal.value || 0) >= 50000;
                      return (
                        <tr
                          key={deal.id}
                          className="group hover:bg-[var(--void-800)]/50 transition-colors cursor-pointer opacity-0 animate-fade-in"
                          style={{ animationDelay: `${300 + index * 30}ms`, animationFillMode: 'forwards' }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-[var(--void-100)] group-hover:text-white transition-colors">{deal.title}</p>
                                  {isHighValue && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-[var(--amber-500)]/15 text-[var(--amber-400)] rounded border border-[var(--amber-500)]/25">
                                      <Zap className="w-2 h-2" />
                                      High Value
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[var(--void-400)] mt-0.5">{deal.probability}% probability</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-display font-bold text-[var(--void-50)]">
                            {formatCurrency(deal.value || 0)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
                              style={{
                                background: `${stageInfo?.color}15`,
                                color: stageInfo?.color,
                                boxShadow: `0 0 0 1px ${stageInfo?.color}25`
                              }}
                            >
                              {deal.stage}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[var(--void-300)]">{deal.company_name || '-'}</td>
                          <td className="px-6 py-4 text-[var(--void-300)]">{deal.contact_name || '-'}</td>
                          <td className="px-6 py-4 text-[var(--void-300)]">
                            {deal.expected_close
                              ? new Date(deal.expected_close).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
