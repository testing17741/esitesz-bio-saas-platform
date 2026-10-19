'use client';

import React, { useState } from 'react';
import { Profile, ProfileLink } from '@/types';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { IconRenderer } from '../themes/IconRenderer';

interface LinksTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

const AVAILABLE_ICONS = [
  { id: 'whatsapp', name: 'WhatsApp', defaultColor: '#25D366' },
  { id: 'instagram', name: 'Instagram', defaultColor: '#E1306C' },
  { id: 'facebook', name: 'Facebook', defaultColor: '#1877F2' },
  { id: 'youtube', name: 'YouTube', defaultColor: '#FF0000' },
  { id: 'x', name: 'X / Twitter', defaultColor: '#ffffff' },
  { id: 'telegram', name: 'Telegram', defaultColor: '#229ED9' },
  { id: 'linkedin', name: 'LinkedIn', defaultColor: '#0A66C2' },
  { id: 'github', name: 'GitHub', defaultColor: '#ffffff' },
  { id: 'music', name: 'Spotify / Music', defaultColor: '#1DB954' },
  { id: 'globe', name: 'Website', defaultColor: '#38bdf8' },
  { id: 'share', name: 'Share Button', defaultColor: '#0ea5e9' },
];

export function LinksTab({ profile, onChange }: LinksTabProps) {
  const [links, setLinks] = useState<ProfileLink[]>(profile.links || []);

  const updateLinks = (newLinks: ProfileLink[]) => {
    setLinks(newLinks);
    onChange({ links: newLinks });
  };

  const handleAddLink = () => {
    const newLink: ProfileLink = {
      id: `link_${Date.now()}`,
      title: 'New Social Link',
      subtitle: 'Click to open',
      url: 'https://',
      icon: 'globe',
      color: '#38bdf8',
      active: true,
      order: links.length + 1,
    };
    updateLinks([...links, newLink]);
  };

  const handleUpdateLink = (id: string, updates: Partial<ProfileLink>) => {
    const updated = links.map((l) => (l.id === id ? { ...l, ...updates } : l));
    updateLinks(updated);
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter((l) => l.id !== id);
    updateLinks(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) return;

    const copy = [...links];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    // update orders
    const reordered = copy.map((l, i) => ({ ...l, order: i + 1 }));
    updateLinks(reordered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Social & Custom Links</h3>
          <p className="text-xs text-slate-400">
            Add, customize, reorder, or toggle your bio links in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddLink}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Link</span>
        </button>
      </div>

      {links.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
          No links added yet. Click &ldquo;Add Link&rdquo; to create your first button.
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, idx) => (
            <div
              key={link.id}
              className={`p-4 rounded-xl border transition-all ${
                link.active
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Reorder and Icon preview */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <IconRenderer name={link.icon} color={link.color} className="w-4 h-4" />
                  </div>
                  <button
                    type="button"
                    disabled={idx === links.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Form Inputs */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Button Title
                    </label>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                      placeholder="e.g. WhatsApp Channel"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Subtitle / Handle
                    </label>
                    <input
                      type="text"
                      value={link.subtitle || ''}
                      onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                      placeholder="e.g. Official Updates"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Destination URL
                    </label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                      placeholder="https://... or #share"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Platform Icon
                    </label>
                    <select
                      value={link.icon}
                      onChange={(e) => {
                        const iconId = e.target.value;
                        const found = AVAILABLE_ICONS.find((i) => i.id === iconId);
                        handleUpdateLink(link.id, {
                          icon: iconId,
                          color: found ? found.defaultColor : link.color,
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      {AVAILABLE_ICONS.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="color"
                      value={link.color || '#0ea5e9'}
                      onChange={(e) => handleUpdateLink(link.id, { color: e.target.value })}
                      className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer"
                      title="Custom Brand Color"
                    />
                    <span className="text-[11px] text-slate-400 font-mono">
                      {link.color || '#0ea5e9'}
                    </span>
                  </div>
                </div>

                {/* Visibility Toggle & Delete */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleUpdateLink(link.id, { active: !link.active })}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      link.active
                        ? 'bg-slate-800 border-slate-700 text-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                    title={link.active ? 'Hide link' : 'Show link'}
                  >
                    {link.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                    title="Delete link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
