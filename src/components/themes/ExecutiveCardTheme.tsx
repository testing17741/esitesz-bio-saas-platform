'use client';

import React from 'react';
import { Profile, ProfileLink } from '@/types';
import { IconRenderer } from './IconRenderer';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, UserPlus, QrCode } from 'lucide-react';

interface ThemeProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
  isLivePreview?: boolean;
}

export function ExecutiveCardTheme({
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
    <div className="min-h-screen w-full bg-[#0d1117] text-slate-100 font-sans antialiased py-8 px-4 flex justify-center items-start">
      <main className="w-full max-w-[680px] mx-auto">
        <div className="bg-[#161b22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-slate-800 via-sky-950 to-slate-900 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={onQrClick}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors"
                title="View QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Card Body */}
          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-14 mb-4 gap-4">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-[#161b22] bg-slate-800 shadow-xl flex items-center justify-center">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-sky-400">
                    {profile.title.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <a
                  href={`/api/vcard/${profile.slug}`}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Save Contact</span>
                </a>
              </div>
            </div>

            {/* Title & Organization */}
            <div className="mb-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{profile.title}</h1>
                <ShieldCheck className="w-5 h-5 text-sky-400" />
              </div>
              {profile.subtitle && (
                <p className="text-sm text-sky-400 font-medium mt-0.5">{profile.subtitle}</p>
              )}
              {profile.description && (
                <p className="text-sm text-slate-300 leading-relaxed mt-2.5">
                  {profile.description}
                </p>
              )}
            </div>

            {/* Direct Contact Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              {profile.contact?.callPhone && (
                <a
                  href={`tel:${profile.contact.callPhone}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">{profile.contact.callPhone}</span>
                </a>
              )}
              {profile.contact?.emailAddress && (
                <a
                  href={`mailto:${profile.contact.emailAddress}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="truncate">{profile.contact.emailAddress}</span>
                </a>
              )}
              {profile.locationText && (
                <div className="flex items-center gap-2 p-2 rounded-lg text-xs sm:text-sm text-slate-400 col-span-2 sm:col-span-1">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{profile.locationText}</span>
                </div>
              )}
            </div>

            {/* Links Stack */}
            <div className="space-y-2.5 my-6">
              {activeLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50">
                      <IconRenderer name={link.icon} color={link.color} className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white group-hover:text-sky-300">
                        {link.title}
                      </h2>
                      {link.subtitle && (
                        <p className="text-xs text-slate-400">{link.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
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
                </a>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
