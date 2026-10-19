'use client';

import React from 'react';
import { Profile, ProfileLink } from '@/types';
import { IconRenderer } from './IconRenderer';
import { ExternalLink, UserPlus, QrCode } from 'lucide-react';

interface ThemeProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
  isLivePreview?: boolean;
}

export function LinktreeMinimalTheme({
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
    <div className="min-h-screen w-full bg-[#0a0d14] text-slate-100 font-sans antialiased py-10 px-4 flex justify-center items-start">
      <main className="w-full max-w-[620px] mx-auto flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-sky-500 to-indigo-500 shadow-xl mb-4">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-sky-400">
                {profile.title.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Title & Badge */}
        <h1 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-white mb-1">
          {profile.title}
        </h1>
        {profile.subtitle && (
          <p className="text-xs sm:text-sm text-sky-400 font-medium mb-3">
            {profile.subtitle}
          </p>
        )}

        {/* Bio */}
        {profile.description && (
          <p className="text-xs sm:text-sm text-slate-300 text-center max-w-[480px] leading-relaxed mb-6">
            {profile.description}
          </p>
        )}

        {/* Action Pills */}
        <div className="flex gap-2 mb-6">
          <a
            href={`/api/vcard/${profile.slug}`}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Save Contact</span>
          </a>
          <button
            type="button"
            onClick={onQrClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR</span>
          </button>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3 mb-8">
          {activeLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link)}
              className="w-full relative flex items-center justify-center p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/50 shadow-md transition-all duration-200 hover:scale-[1.01] group cursor-pointer"
            >
              <div className="absolute left-4">
                <IconRenderer name={link.icon} color={link.color} className="w-5 h-5" />
              </div>
              <div className="text-center font-semibold text-sm sm:text-base text-slate-100 group-hover:text-white px-8 truncate">
                {link.title}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-4 text-center text-xs text-slate-500 space-y-1">
          <p>{profile.copyrightText || `© ${currentYear} ${profile.title}`}</p>
          <p className="flex items-center justify-center gap-1">
            <span>{profile.footerText || 'Designed & Developed by'}</span>
            <a
              href={profile.footerUrl || 'https://www.esitesz.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline inline-flex items-center gap-0.5 font-medium"
            >
              <span>{profile.footerBrand || 'Esitesz'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
