'use client';

import React from 'react';
import { Profile } from '@/types';
import { ThemeRenderer } from '../themes/ThemeRenderer';
import { ExternalLink } from 'lucide-react';

interface MobileMockupPreviewProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
}

export function MobileMockupPreview({
  profile,
  onShareClick,
  onQrClick,
}: MobileMockupPreviewProps) {
  return (
    <div className="flex flex-col items-center sticky top-6">
      <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Mobile Preview
        </span>
        <a
          href={`/${profile.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-sky-400 hover:underline inline-flex items-center gap-1"
        >
          <span>Open Live</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Modern Smartphone Mockup Frame */}
      <div className="relative w-[340px] h-[680px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
          <div className="w-2 h-2 rounded-full bg-slate-800" />
        </div>

        {/* Scrollable Screen Content */}
        <div className="w-full h-full rounded-[34px] overflow-y-auto no-scrollbar pt-6 bg-slate-950 text-slate-100 text-xs">
          <div className="scale-[0.88] origin-top -mt-2">
            <ThemeRenderer
              profile={profile}
              onShareClick={onShareClick}
              onQrClick={onQrClick}
              isLivePreview={true}
            />
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-700 rounded-full z-30 pointer-events-none" />
      </div>
    </div>
  );
}
