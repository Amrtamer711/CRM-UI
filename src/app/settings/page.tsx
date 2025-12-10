'use client';

import Header from '@/components/Header';
import { User, Bell, Shield, Palette, Globe, Database, ChevronRight, Sparkles } from 'lucide-react';

const settingsSections = [
  {
    title: 'Account',
    description: 'Manage your account settings and preferences',
    icon: User,
    color: 'var(--indigo-400)',
    items: [
      { label: 'Profile Information', description: 'Update your name, email, and photo' },
      { label: 'Password & Security', description: 'Manage your password and 2FA' },
      { label: 'Connected Accounts', description: 'Link external accounts and services' },
    ],
  },
  {
    title: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: Bell,
    color: 'var(--amber-400)',
    items: [
      { label: 'Email Notifications', description: 'Choose which emails you receive' },
      { label: 'Push Notifications', description: 'Manage browser and mobile alerts' },
      { label: 'Activity Reminders', description: 'Set up task and meeting reminders' },
    ],
  },
  {
    title: 'Privacy',
    description: 'Control your data and privacy settings',
    icon: Shield,
    color: 'var(--rose-400)',
    items: [
      { label: 'Data Export', description: 'Download a copy of your data' },
      { label: 'Privacy Settings', description: 'Manage who can see your information' },
      { label: 'Delete Account', description: 'Permanently delete your account' },
    ],
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel',
    icon: Palette,
    color: 'var(--purple-400)',
    items: [
      { label: 'Theme', description: 'Choose between light, dark, or system theme' },
      { label: 'Display Density', description: 'Adjust the spacing and size of elements' },
      { label: 'Sidebar', description: 'Customize sidebar behavior' },
    ],
  },
  {
    title: 'Integrations',
    description: 'Connect with other tools and services',
    icon: Globe,
    color: 'var(--cyan-400)',
    items: [
      { label: 'Email Integration', description: 'Connect Gmail, Outlook, or other email' },
      { label: 'Calendar Sync', description: 'Sync with Google Calendar or Outlook' },
      { label: 'API Access', description: 'Manage API keys and webhooks' },
    ],
  },
  {
    title: 'Data Management',
    description: 'Import, export, and manage your CRM data',
    icon: Database,
    color: 'var(--emerald-400)',
    items: [
      { label: 'Import Data', description: 'Import contacts and deals from CSV' },
      { label: 'Export Data', description: 'Export your CRM data' },
      { label: 'Data Cleanup', description: 'Find and merge duplicate records' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--void-950)] relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[var(--indigo-500)] rounded-full opacity-[0.02] blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--purple-500)] rounded-full opacity-[0.02] blur-[80px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative z-10">
        <Header
          title="Settings"
          subtitle="Manage your account and preferences"
        />

        <div className="p-8 max-w-4xl">
          <div className="space-y-6">
            {settingsSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                className="group relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl overflow-hidden opacity-0 animate-fade-in transition-all duration-300 hover:border-[var(--void-600)]"
                style={{ animationDelay: `${100 + sectionIndex * 80}ms`, animationFillMode: 'forwards' }}
              >
                {/* Section Header */}
                <div className="p-6 border-b border-[var(--void-700)]">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: `${section.color}15`,
                      }}
                    >
                      <section.icon className="w-6 h-6 relative z-10" style={{ color: section.color }} />
                      {/* Icon glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
                        style={{ background: section.color }}
                      />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-[var(--void-50)]">{section.title}</h2>
                      <p className="text-sm text-[var(--void-400)]">{section.description}</p>
                    </div>
                  </div>
                </div>

                {/* Section Items */}
                <div className="divide-y divide-[var(--void-700)]/50">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--void-700)]/30 transition-colors text-left group/item"
                    >
                      <div>
                        <p className="font-medium text-[var(--void-100)] group-hover/item:text-white transition-colors">
                          {item.label}
                        </p>
                        <p className="text-sm text-[var(--void-400)] mt-0.5">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--void-500)] group-hover/item:text-[var(--indigo-400)] group-hover/item:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-[var(--void-800)]">
            <div className="flex items-center justify-between text-sm text-[var(--void-500)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--indigo-400)]" />
                <p>Nexus CRM v1.0.0</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-[var(--indigo-400)] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--indigo-400)] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[var(--indigo-400)] transition-colors">Help Center</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
