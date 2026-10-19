'use client';

import React, { useState } from 'react';
import { Profile, ProfileLink } from '@/types';
import { IconRenderer } from './IconRenderer';
import {
  ChevronRight,
  MapPin,
  QrCode,
  UserPlus,
  HelpCircle,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

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
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const handleLinkClick = (link: ProfileLink) => {
    if (link.url === '#share' || link.icon === 'share') {
      onShareClick?.();
      return;
    }

    if (!isLivePreview) {
      // Beacon click tracking
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

  const handleEmailClick = () => {
    const email = profile.contact?.emailAddress || 'contact@esitesz.com';
    const subject = encodeURIComponent(`Enquiry - ${profile.title}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const activeLinks = (profile.links || [])
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full bg-[#0f1724] text-[#e6eef8] font-sans antialiased py-8 px-4 sm:px-6 flex justify-center items-start">
      <main className="w-full max-w-[760px] mx-auto">
        <article className="bg-gradient-to-b from-white/[0.02] to-white/[0.01] rounded-[14px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(2,6,23,0.6)] border border-white/[0.03]">
          
          {/* Profile Header */}
          <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 mb-7 pt-4 text-center sm:text-left">
            <div className="relative group shrink-0">
              <div className="w-[120px] h-[120px] sm:w-[138px] sm:h-[138px] rounded-full border-4 border-[#0ea5e9]/20 flex items-center justify-center bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-[0_6px_28px_rgba(2,6,23,0.6)] overflow-hidden transition-transform duration-300 group-hover:scale-105">
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
            </div>

            <div className="flex-1 min-w-0 pt-1 sm:pt-4">
              <div className="flex flex-col items-center sm:items-start gap-2 mb-3">
                <h1 className="font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {profile.title}
                </h1>
                {profile.subtitle && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500/15 to-emerald-500/10 text-sky-200 border border-sky-500/20 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{profile.subtitle}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Description / Bio Section */}
          {profile.description && (
            <section
              aria-label="About"
              className="my-4 sm:my-5 p-4 sm:p-5 text-center text-[#d6e6f5] text-sm sm:text-base leading-relaxed bg-gradient-to-b from-white/[0.02] to-white/[0.01] rounded-xl border border-white/[0.02]"
            >
              {profile.description}
            </section>
          )}

          {/* Quick Action Badges: Save Contact & QR Code */}
          <div className="flex items-center justify-center gap-3 my-4">
            <a
              href={`/api/vcard/${profile.slug}`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-sky-300 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4 text-sky-400" />
              <span>Save Contact</span>
            </a>

            <button
              type="button"
              onClick={onQrClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-sky-300 transition-all hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4 text-sky-400" />
              <span>QR Code</span>
            </button>
          </div>

          {/* Social & Custom Links */}
          <nav aria-label="Social links" className="flex flex-col gap-3 my-5">
            {activeLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link)}
                className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl text-left bg-gradient-to-b from-white/[0.02] to-white/[0.01] hover:bg-gradient-to-r hover:from-sky-500/[0.06] hover:to-emerald-500/[0.03] border border-white/[0.02] hover:border-sky-500/20 shadow-[0_4px_16px_rgba(2,6,23,0.3)] hover:shadow-[0_8px_24px_rgba(2,6,23,0.5)] transition-all duration-300 hover:translate-x-1.5 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/[0.04]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    }}
                  >
                    <IconRenderer name={link.icon} color={link.color} className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-semibold text-[#eef6ff] group-hover:text-white truncate">
                      {link.title}
                    </h2>
                    {link.subtitle && (
                      <p className="text-xs sm:text-sm text-[#a9b7c8] group-hover:text-slate-300 truncate mt-0.5">
                        {link.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#a9b7c8] group-hover:text-sky-300 transition-colors shrink-0" />
              </button>
            ))}
          </nav>

          {/* Contact Section */}
          {(profile.contact?.showCall ||
            profile.contact?.showWhatsapp ||
            profile.contact?.showEmail) && (
            <section aria-label="Contact" className="mt-8">
              <h3 className="text-center font-bold text-base sm:text-lg text-[#e9f3ff] mb-3">
                Contact Us
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {profile.contact?.showCall && profile.contact?.callPhone && (
                  <a
                    href={`tel:${profile.contact.callPhone}`}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.03] text-inherit transition-all duration-200 hover:-translate-y-1 shadow-[0_6px_18px_rgba(2,6,23,0.35)]"
                  >
                    <IconRenderer name="phone" color="#38bdf8" className="w-6 h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">Call</span>
                  </a>
                )}

                {profile.contact?.showWhatsapp && profile.contact?.whatsappNumber && (
                  <a
                    href={`https://wa.me/${profile.contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.03] text-inherit transition-all duration-200 hover:-translate-y-1 shadow-[0_6px_18px_rgba(2,6,23,0.35)]"
                  >
                    <IconRenderer name="whatsapp" color="#22c55e" className="w-6 h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">WhatsApp</span>
                  </a>
                )}

                {profile.contact?.showEmail && profile.contact?.emailAddress && (
                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 sm:p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.03] text-inherit transition-all duration-200 hover:-translate-y-1 shadow-[0_6px_18px_rgba(2,6,23,0.35)] cursor-pointer"
                  >
                    <IconRenderer name="email" color="#f87171" className="w-6 h-6" />
                    <span className="text-xs sm:text-sm font-semibold text-[#eaf6ff]">Email</span>
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Location Badge */}
          {profile.contact?.showLocation && profile.locationText && (
            <div className="my-5 p-3 sm:p-4 rounded-xl bg-gradient-to-b from-white/[0.015] to-white/[0.005] border border-white/[0.03] flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#a9b7c8] text-center">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{profile.locationText}</span>
            </div>
          )}

          {/* AEO: Frequently Asked Questions (if enabled by user) */}
          {profile.seo?.showFaqOnPage && profile.seo?.faqItems?.length > 0 && (
            <section aria-label="FAQ" className="mt-8 pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 justify-center mb-4 text-[#eaf6ff] font-semibold text-sm sm:text-base">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-2">
                {profile.seo.faqItems.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-xl border border-white/[0.03] bg-white/[0.015] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-medium text-slate-200 hover:text-white"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-sky-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs sm:text-sm text-[#a9b7c8] leading-relaxed border-t border-white/[0.02] pt-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Mandatory Esitesz Platform Footer */}
          <footer className="mt-8 pt-4 border-t border-white/[0.03] text-center text-xs text-[#a9b7c8] space-y-1">
            <p>
              {profile.copyrightText ||
                `© ${currentYear} ${profile.title}. All Rights Reserved.`}
            </p>
            <p className="flex items-center justify-center gap-1">
              <span>{profile.footerText || 'Designed & Developed by'}</span>
              <a
                href={profile.footerUrl || 'https://www.esitesz.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-0.5 hover:underline"
              >
                <span>{profile.footerBrand || 'Esitesz'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
}
