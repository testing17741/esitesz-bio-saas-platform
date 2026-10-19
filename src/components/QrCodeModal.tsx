'use client';

import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { Profile } from '@/types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export function QrCodeModal({ isOpen, onClose, profile }: QrCodeModalProps) {
  if (!isOpen) return null;

  const qrImageUrl = `/api/qr/${profile.slug}`;
  const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/${profile.slug}` : `https://esitesz.com/${profile.slug}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">QR Code</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 mb-4">
          Scan to open <span className="text-white font-medium">{profile.title}</span> on any smartphone camera.
        </p>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl mx-auto inline-block shadow-inner mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrImageUrl}
            alt={`QR code for ${profile.title}`}
            width={240}
            height={240}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain"
          />
        </div>

        <p className="text-xs text-slate-400 mb-5 break-all font-mono">
          {profileUrl}
        </p>

        <div className="flex gap-2">
          <a
            href={qrImageUrl}
            download={`${profile.slug}-qr.png`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
