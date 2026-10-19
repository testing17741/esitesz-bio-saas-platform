'use client';

import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, Send } from 'lucide-react';
import { Profile } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export function ShareModal({ isOpen, onClose, profile }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = typeof window !== 'undefined' ? `${window.location.origin}/${profile.slug}` : `https://esitesz.com/${profile.slug}`;
  const shareText = `Check out ${profile.title}'s official bio link page:`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleNativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: profile.title,
          text: shareText,
          url,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Share Page</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-400 mt-3 mb-5">
          Share <span className="text-white font-medium">{profile.title}</span> with your contacts and followers.
        </p>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 mb-6">
          <input
            type="text"
            readOnly
            value={url}
            className="bg-transparent text-xs sm:text-sm text-slate-300 w-full focus:outline-none px-2"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 shrink-0 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Share Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] text-xs font-medium transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>Telegram</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>X</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </a>
        </div>

        <button
          type="button"
          onClick={handleNativeShare}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors text-center"
        >
          More Sharing Options...
        </button>
      </div>
    </div>
  );
}
