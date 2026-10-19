'use client';

import React from 'react';
import { Profile } from '@/types';
import { User, MapPin, AlignLeft, Tag, Link2 } from 'lucide-react';

interface GeneralTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

export function GeneralTab({ profile, onChange }: GeneralTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white mb-1">Basic Profile Details</h3>
        <p className="text-xs text-slate-400">
          Configure your public bio link page handle, name, avatar, and introduction.
        </p>
      </div>

      <div className="space-y-4">
        {/* Username / Slug */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Username / Handle (Slug)
          </label>
          <div className="flex rounded-xl bg-slate-900 border border-slate-800 overflow-hidden focus-within:border-sky-500">
            <span className="px-3 py-2.5 text-xs text-slate-500 bg-slate-800/60 border-r border-slate-800 select-none flex items-center">
              esitesz.com/
            </span>
            <input
              type="text"
              value={profile.slug}
              onChange={(e) =>
                onChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })
              }
              placeholder="yourname"
              className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Lowercase letters, numbers, hyphens, and underscores only.
          </p>
        </div>

        {/* Display Title / Name */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Full Name / Organization Title *
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="e.g. Syed Shah Hasnain Baqai"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        {/* Subtitle / Badge */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Subtitle / Verified Badge Text
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.subtitle || ''}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              placeholder="e.g. Official Updates / Public Figure / Founder"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <Tag className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        {/* Avatar Image URL */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Profile Photo / Logo Image URL
          </label>
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-slate-500" />
              )}
            </div>
            <div className="flex-1 relative">
              <input
                type="url"
                value={profile.avatarUrl || ''}
                onChange={(e) => onChange({ avatarUrl: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
              <Link2 className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Bio / Description
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={profile.description || ''}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Write a concise description or bio statement..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
            <AlignLeft className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        {/* Location Text */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Location Banner Text
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.locationText || ''}
              onChange={(e) => onChange({ locationText: e.target.value })}
              placeholder="e.g. Safipur Sharif U.P or Antophill, Wadala, Mumbai"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <MapPin className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
