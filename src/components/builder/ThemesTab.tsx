'use client';

import React from 'react';
import { Profile, ThemeId } from '@/types';
import { Check, Sparkles, Layout, CreditCard, Flame, Moon } from 'lucide-react';

interface ThemesTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  previewBg: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'esitesz-dark-luxury',
    name: 'Esitesz Dark Luxury',
    tagline: 'Hasnain Baqai & JRM Antophill Style',
    description: 'Deep navy glassmorphism card, rounded avatar, sliding buttons, and 3-column contact grid.',
    icon: Moon,
    accentColor: '#0ea5e9',
    previewBg: 'bg-[#0f1724]',
  },
  {
    id: 'linktree-minimal',
    name: 'Minimalist Linktree',
    tagline: 'Clean Vertical Link Stack',
    description: 'Full-width rounded pill links with center alignment and ultra-clean modern typography.',
    icon: Layout,
    accentColor: '#6366f1',
    previewBg: 'bg-[#0a0d14]',
  },
  {
    id: 'executive-card',
    name: 'Executive Business Card',
    tagline: 'Corporate & Consultant Bio',
    description: 'Dual-tone banner card, instant vCard download action, and verified authenticity badge.',
    icon: CreditCard,
    accentColor: '#38bdf8',
    previewBg: 'bg-[#0d1117]',
  },
  {
    id: 'creator-glow',
    name: 'Creator Neon Glow',
    tagline: 'Influencers, Artists & Gamers',
    description: 'Vibrant neon gradient borders, soft ambient background glows, and prominent badge tags.',
    icon: Flame,
    accentColor: '#ec4899',
    previewBg: 'bg-[#050508]',
  },
  {
    id: 'islamic-community',
    name: 'Islamic Community Org',
    tagline: 'Trusts, Masajid & Spiritual Leaders',
    description: 'Dedicated mission statement card, official channel links, donation support, and location pin.',
    icon: Sparkles,
    accentColor: '#22c55e',
    previewBg: 'bg-[#0b0f1a]',
  },
];

export function ThemesTab({ profile, onChange }: ThemesTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white mb-1">Layout Themes</h3>
        <p className="text-xs text-slate-400">
          Select the design system style for your public bio link page. Changes preview in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {THEMES.map((t) => {
          const isSelected = profile.theme === t.id;
          const IconComp = t.icon;

          return (
            <div
              key={t.id}
              onClick={() => onChange({ theme: t.id })}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                isSelected
                  ? 'bg-slate-900 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-sky-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 ${t.previewBg}`}
              >
                <IconComp className="w-6 h-6" style={{ color: t.accentColor }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500 text-slate-950">
                        Active
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                </div>
                <p className="text-xs text-sky-400 font-medium mt-0.5">{t.tagline}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
