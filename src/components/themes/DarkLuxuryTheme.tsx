'use client';

import React, { useState } from 'react';
import { Profile, ProfileLink } from '@/types';
import { IconRenderer } from './IconRenderer';
import { ChevronRight, MapPin } from 'lucide-react';
import { ShareModal } from '../ShareModal';
import { QrCodeModal } from '../QrCodeModal';

interface ThemeProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
  isLivePreview?: boolean;
}

export function DarkLuxuryTheme({
  profile,
  onShareClick,
  onQrClick,
  isLivePreview = false,
}: ThemeProps) {
  const [internalShareOpen, setInternalShareOpen] = useState(false);
  const [internalQrOpen, setInternalQrOpen] = useState(false);

  const handleShareTrigger = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: profile.title,
          text: profile.description || profile.title,
          url: typeof window !== 'undefined' ? window.location.href : '',
        })
        .catch(() => {
          if (onShareClick) {
            onShareClick();
          } else {
            setInternalShareOpen(true);
          }
        });
      return;
    }
    if (onShareClick) {
      onShareClick();
    } else {
      setInternalShareOpen(true);
    }
  };

  const handleLinkClick = (link: ProfileLink) => {
    if (link.url === '#share' || link.icon === 'share') {
      handleShareTrigger();
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

  // Helper for brand-accurate background and border
  const getIconContainerStyle = (link: ProfileLink) => {
    const icon = link.icon.toLowerCase();
    if (icon === 'whatsapp') {
      return {
        color: '#25D366',
        background: 'linear-gradient(180deg, rgba(37,211,102,0.06), rgba(37,211,102,0.02))',
        border: '1px solid rgba(37,211,102,0.06)',
      };
    }
    if (icon === 'instagram') {
      return {
        color: '#E1306C',
        background: 'linear-gradient(180deg, rgba(225,48,108,0.06), rgba(225,48,108,0.02))',
        border: '1px solid rgba(225,48,108,0.06)',
      };
    }
    if (icon === 'facebook') {
      return {
        color: '#1877F2',
        background: 'linear-gradient(180deg, rgba(24,119,242,0.04), rgba(24,119,242,0.02))',
        border: '1px solid rgba(24,119,242,0.04)',
      };
    }
    if (icon === 'youtube') {
      return {
        color: '#FF0000',
        background: 'linear-gradient(180deg, rgba(255,0,0,0.04), rgba(255,0,0,0.02))',
        border: '1px solid rgba(255,0,0,0.04)',
      };
    }
    if (icon === 'share') {
      return {
        color: '#0ea5e9',
        background: 'linear-gradient(180deg, rgba(14,165,233,0.04), rgba(14,165,233,0.02))',
        border: '1px solid rgba(14,165,233,0.04)',
      };
    }
    const color = link.color || '#0ea5e9';
    return {
      color,
      background: `linear-gradient(180deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}20`,
    };
  };

  return (
    <div className="min-h-screen w-full bg-[#0f1724] text-[#e6eef8] font-sans antialiased p-2 sm:p-7 flex justify-center items-start">
      <main className="w-full max-w-[760px] mx-auto mt-0 sm:mt-10">
        <article className="bg-gradient-to-b from-white/[0.02] to-white/[0.01] rounded-[14px] p-3 sm:p-7 shadow-[0_8px_30px_rgba(2,6,23,0.6)] border border-white/[0.03] overflow-hidden">
          
          {/* Profile Header (Horizontal on desktop, Centered on mobile) */}
          <header className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-10 mb-5 sm:mb-7 pt-0 sm:pt-5 text-center sm:text-left">
            <div className="w-[120px] h-[120px] sm:w-[138px] sm:h-[138px] rounded-full border-4 border-[#0ea5e9]/15 flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] shadow-[0_6px_28px_rgba(2,6,23,0.6)] overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt={profile.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0b0f1a] text-sky-400 font-bold text-3xl">
                  {profile.title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 sm:pt-5">
              <div className="flex flex-col items-center sm:items-start gap-2 mb-2 sm:mb-3">
                <h1 className="font-['Montserrat',sans-serif] font-bold text-xl sm:text-[2rem] text-white tracking-[0.3px] leading-tight text-center sm:text-left max-w-[600px]">
                  {profile.title}
                </h1>
                {profile.subtitle && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[0.85rem] font-medium bg-gradient-to-r from-[#0ea5e9]/12 to-[#22c55e]/6 text-[#cdeffd] border border-[#0ea5e9]/10 shadow-sm mx-auto sm:mx-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{profile.subtitle}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Description Section */}
          {profile.description && (
            <section
              aria-label="About"
              className="my-3 sm:my-4 p-3.5 sm:p-4 text-center text-[#d6e6f5] text-sm sm:text-base leading-relaxed bg-gradient-to-b from-white/[0.02] to-white/[0.01] rounded-xl border border-white/[0.02]"
            >
              {profile.description}
            </section>
          )}

          {/* Social Links List */}
          <nav aria-label="Social links" className="flex flex-col gap-2.5 sm:gap-3 my-4 sm:my-5">
            {activeLinks.map((link) => {
              const iconStyle = getIconContainerStyle(link);
              const isShare = link.url === '#share' || link.icon === 'share';
              const linkClasses = "w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl text-left bg-gradient-to-b from-white/[0.015] to-white/[0.01] hover:bg-gradient-to-r hover:from-[#0ea5e9]/[0.04] hover:to-[#22c55e]/[0.02] border border-transparent hover:border-[#0ea5e9]/10 shadow-[0_4px_16px_rgba(2,6,23,0.3)] hover:shadow-[0_12px_36px_rgba(2,6,23,0.5)] transition-all duration-300 hover:translate-x-2 group cursor-pointer no-underline text-inherit";

              const innerContent = (
                <>
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div
                      className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(2,6,23,0.45)]"
                      style={{
                        background: iconStyle.background,
                        border: iconStyle.border,
                        color: iconStyle.color,
                      }}
                    >
                      <IconRenderer name={link.icon} color={iconStyle.color} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-[#eef6ff] group-hover:text-white truncate">
                        {link.title}
                      </h3>
                      {link.subtitle && (
                        <p className="text-xs sm:text-[0.86rem] text-[#a9b7c8] group-hover:text-slate-300 truncate mt-0.5">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#a9b7c8] group-hover:text-sky-300 transition-colors shrink-0" />
                </>
              );

              if (isShare) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={handleShareTrigger}
                    className={linkClasses}
                    aria-label={`Share ${profile.title}`}
                  >
                    {innerContent}
                  </button>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
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
                  }}
                  className={linkClasses}
                  aria-label={`${link.title}${link.subtitle ? ` - ${link.subtitle}` : ''}`}
                >
                  {innerContent}
                </a>
              );
            })}
          </nav>

          {/* Contact Section */}
          {(profile.contact?.showCall ||
            profile.contact?.showWhatsapp ||
            profile.contact?.showEmail) && (
            <section aria-label="Contact" className="mt-4 sm:mt-6">
              <h3 className="text-center font-bold text-base sm:text-lg text-[#e9f3ff] mb-3">
                Contact Us
              </h3>
              <div className="flex flex-row justify-center items-stretch gap-2 sm:gap-3">
                {profile.contact?.showCall && profile.contact?.callPhone && (
                  <a
                    href={`tel:${profile.contact.callPhone}`}
                    className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-white/[0.03] hover:to-white/[0.02] border border-white/[0.02] text-inherit transition-all duration-200 hover:-translate-y-1.5 shadow-[0_8px_20px_rgba(2,6,23,0.45)] no-underline"
                    aria-label={`Call ${profile.contact.callPhone}`}
                  >
                    <IconRenderer name="phone" color="#38bdf8" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">Call</span>
                  </a>
                )}

                {profile.contact?.showWhatsapp && profile.contact?.whatsappNumber && (
                  <a
                    href={`https://wa.me/${profile.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-white/[0.03] hover:to-white/[0.02] border border-white/[0.02] text-inherit transition-all duration-200 hover:-translate-y-1.5 shadow-[0_8px_20px_rgba(2,6,23,0.45)] no-underline"
                    aria-label={`WhatsApp ${profile.contact.whatsappNumber}`}
                  >
                    <IconRenderer name="whatsapp" color="#22c55e" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">WhatsApp</span>
                  </a>
                )}

                {profile.contact?.showEmail && profile.contact?.emailAddress && (
                  <a
                    href={`mailto:${profile.contact.emailAddress}`}
                    className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-white/[0.03] hover:to-white/[0.02] border border-white/[0.02] text-inherit transition-all duration-200 hover:-translate-y-1.5 shadow-[0_8px_20px_rgba(2,6,23,0.45)] no-underline cursor-pointer"
                    aria-label={`Email ${profile.contact.emailAddress}`}
                  >
                    <IconRenderer name="email" color="#f87171" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">Email</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Location Badge */}
          {profile.contact?.showLocation && profile.locationText && (
            <div className="my-4 sm:my-5 p-3 rounded-xl bg-gradient-to-b from-white/[0.01] to-white/[0.005] border border-white/[0.02] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#a9b7c8] text-center uppercase tracking-wide">
              <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>{profile.locationText}</span>
            </div>
          )}

          {/* Exact Signature Esitesz Footer */}
          <footer className="mt-3 pt-3 border-t border-white/[0.02] flex justify-center items-center text-center w-full" aria-label="Footer">
            <div className="text-center text-xs sm:text-[0.85rem] text-[#a9b7c8] leading-relaxed">
              <p>
                {profile.copyrightText ||
                  `© ${currentYear} ${profile.title}. All Rights Reserved.`}
              </p>
              <p>
                {profile.footerText || 'Designed & Developed by'}{' '}
                <a
                  href={profile.footerUrl || 'https://www.esitesz.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0ea5e9] hover:underline font-semibold"
                >
                  {profile.footerBrand || 'Esitesz'}
                </a>
              </p>
            </div>
          </footer>
        </article>
      </main>

      {/* Sharing and QR Modals (Triggered when user clicks "Share Page") */}
      <ShareModal
        isOpen={internalShareOpen}
        onClose={() => setInternalShareOpen(false)}
        profile={profile}
      />
      <QrCodeModal
        isOpen={internalQrOpen}
        onClose={() => setInternalQrOpen(false)}
        profile={profile}
      />
    </div>
  );
}
