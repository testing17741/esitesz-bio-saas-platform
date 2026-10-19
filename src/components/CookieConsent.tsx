'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('esitesz_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('esitesz_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('esitesz_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 bg-[#161b22] border border-slate-800 rounded-2xl shadow-2xl text-slate-200 text-xs sm:text-sm animate-slide-up"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white mb-1">Privacy & Cookie Notice</p>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            In compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023 and GDPR, we use essential cookies to maintain secure sessions and privacy-friendly visitor analytics.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              Essential Only
            </button>
            <Link
              href="/privacy"
              className="text-xs text-sky-400 hover:underline ml-auto"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShow(false)}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
