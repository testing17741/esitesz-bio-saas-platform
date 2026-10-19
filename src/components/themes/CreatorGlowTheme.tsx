'use client';

import React from 'react';
import { Profile, ProfileLink } from '@/types';
import { IconRenderer } from './IconRenderer';
import { Sparkles, ExternalLink, QrCode, UserPlus } from 'lucide-react';

interface ThemeProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
  isLivePreview?: boolean;
}

export function CreatorGlowTheme({
  profile,
  onShareClick,
  onQrClick,
  isLivePreview = false,
}: ThemeProps) {
  const handleLinkClick = (link: ProfileLink) => {
    if (link.url === '#share' || link.icon === 'share') {
      onShareClick?.();
      return;
    }

    if (!isLivePreview) {
      try {
        fetch('/api/analytics/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: profile.id, linkId: link.id }),
          keepalive: true,
        }).catch(() => {});
      } catch {}
    }

    if (link.url && !link.url.startsWith('#')) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  const activeLinks = (profile.links || [])
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white font-sans antialiased py-8 px-4 flex justify-center items-start relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <main className="w-full max-w-[640px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          {/* Glowing Avatar */}
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 animate-pulse">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                    {profile.title.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{profile.subtitle || 'Creator / Influencer'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {profile.title}
          </h1>

          {profile.description && (
            <p className="text-sm text-slate-300 max-w-[460px] leading-relaxed mb-4">
              {profile.description}
            </p>
          )}

          {/* Action Pills */}
          <div className="flex items-center gap-2 mb-4">
            <a
              href={`/api/vcard/${profile.slug}`}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
            <button
              type="button"
              onClick={onQrClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR</span>
            </button>
          </div>
        </div>

        {/* Links Stack */}
        <div className="space-y-3 mb-8">
          {activeLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-purple-500/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-black/40 border border-white/10">
                  <IconRenderer name={link.icon} color={link.color} className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300">
                    {link.title}
                  </h2>
                  {link.subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{link.subtitle}</p>
                  )}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-slate-500 space-y-1">
          <p>{profile.copyrightText || `© ${currentYear} ${profile.title}`}</p>
          <p className="flex items-center justify-center gap-1">
            <span>{profile.footerText || 'Designed & Developed by'}</span>
            <a
              href={profile.footerUrl || 'https://www.esitesz.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline inline-flex items-center gap-0.5 font-medium"
            >
              <span>{profile.footerBrand || 'Esitesz'}</span>
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
