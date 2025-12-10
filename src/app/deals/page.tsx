'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DealCard from '@/components/DealCard';
import { Plus, DollarSign, TrendingUp, Target, Sparkles } from 'lucide-react';
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
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-[var(--void-700)] rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[var(--indigo-500)] rounded-full animate-spin" />
          </div>
          <p className="text-[var(--void-400)] text-sm">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--purple-500)] rounded-full opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--indigo-500)] rounded-full opacity-[0.03] blur-[100px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Header
          title="Deals"
          subtitle={`${deals.length} deals in your pipeline`}
          actions={
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[var(--void-800)]/50 border border-[var(--void-700)] rounded-xl p-1">
                <button
                  onClick={() => setView('pipeline')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'pipeline'
                      ? 'bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white shadow-lg shadow-[var(--indigo-500)]/25'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)]'
                  }`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'list'
                      ? 'bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white shadow-lg shadow-[var(--indigo-500)]/25'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)]'
                  }`}
                >
                  List
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--void-800)] hover:bg-[var(--void-700)] border border-[var(--void-700)] text-[var(--void-100)] rounded-xl font-medium text-sm transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Deal</span>
              </button>
            </div>
          }
        />

        <div className="p-8 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--indigo-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--indigo-500)]/15 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[var(--indigo-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Total Pipeline</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {formatCurrency(totalPipelineValue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--cyan-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--cyan-500)]/15 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[var(--cyan-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Weighted Value</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {formatCurrency(weightedValue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-xl p-5 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--emerald-500)] rounded-full opacity-10 blur-[40px]" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--emerald-500)]/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[var(--emerald-400)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--void-400)]">Won This Period</p>
                  <p className="text-2xl font-display font-bold text-[var(--void-50)] mt-0.5">
                    {formatCurrency(wonValue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline View */}
          {view === 'pipeline' && (
            <div className="flex gap-4 overflow-x-auto pb-4 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              {stages.map((stage, stageIndex) => {
                const stageDeals = deals.filter(d => d.stage === stage.key);
                const stageValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);

                return (
                  <div
                    key={stage.key}
                    className="flex-shrink-0 w-80 opacity-0 animate-slide-in"
                    style={{ animationDelay: `${300 + stageIndex * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {/* Stage Header */}
                    <div className="bg-[var(--void-800)]/80 backdrop-blur-sm border border-[var(--void-700)] rounded-t-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: stage.color,
                              boxShadow: `0 0 10px ${stage.color}`
                            }}
                          />
                          <h3 className="font-medium text-[var(--void-100)]">{stage.label}</h3>
                        </div>
                        <span className="text-sm text-[var(--void-400)]">
                          {stageDeals.length} deals
                        </span>
                      </div>
                      <p className="text-lg font-display font-bold text-[var(--void-50)]">
                        {formatCurrency(stageValue)}
                      </p>
                    </div>

                    {/* Stage Cards */}
                    <div className="bg-[var(--void-900)]/50 backdrop-blur-sm border-x border-b border-[var(--void-700)] rounded-b-xl p-3 min-h-[400px] space-y-3">
                      {stageDeals.map((deal, index) => (
                        <DealCard key={deal.id} deal={deal} index={index} />
                      ))}
                      {stageDeals.length === 0 && (
                        <div className="flex items-center justify-center h-32 text-sm text-[var(--void-500)]">
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
            <div className="bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--void-700)]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Deal</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Value</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider">Expected Close</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--void-700)]/50">
                  {deals.filter(d => d.stage !== 'lost').map((deal, index) => {
                    const stageInfo = stages.find(s => s.key === deal.stage);
                    return (
                      <tr
                        key={deal.id}
                        className="hover:bg-[var(--void-700)]/30 transition-colors cursor-pointer opacity-0 animate-fade-in"
                        style={{ animationDelay: `${300 + index * 30}ms`, animationFillMode: 'forwards' }}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-[var(--void-100)]">{deal.title}</p>
                            <p className="text-xs text-[var(--void-400)] mt-0.5">{deal.probability}% probability</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-display font-bold text-[var(--void-50)]">
                          {formatCurrency(deal.value || 0)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize"
                            style={{
                              background: `${stageInfo?.color}20`,
                              color: stageInfo?.color,
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
          )}
        </div>
      </div>
    </div>
  );
}
