'use client';

import React from 'react';
import { Profile } from '@/types';
import { BarChart3, Eye, MousePointerClick, QrCode, Download, UserPlus, Share2 } from 'lucide-react';

interface AnalyticsTabProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
}

export function AnalyticsTab({ profile, onShareClick, onQrClick }: AnalyticsTabProps) {
  const analytics = profile.analytics || { views: 0, clicks: {}, viewsHistory: [] };
  const totalClicks = Object.values(analytics.clicks || {}).reduce((acc, curr) => acc + curr, 0);
  const ctr = analytics.views > 0 ? ((totalClicks / analytics.views) * 100).toFixed(1) : '0';

  const qrImageUrl = `/api/qr/${profile.slug}`;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white mb-1">Performance & Sharing</h3>
        <p className="text-xs text-slate-400">
          Track traffic, button click conversions, and generate sharing assets.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 mx-auto mb-2 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">
            {analytics.views.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Page Views</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 mx-auto mb-2 flex items-center justify-center">
            <MousePointerClick className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">
            {totalClicks.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Total Clicks</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 mx-auto mb-2 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">{ctr}%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">CTR Rate</p>
        </div>
      </div>

      {/* Link Clicks Breakdown */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          Individual Link Performance
        </h4>
        {(!profile.links || profile.links.length === 0) ? (
          <p className="text-xs text-slate-500">No links to analyze yet.</p>
        ) : (
          <div className="space-y-2">
            {profile.links.map((link) => {
              const count = analytics.clicks[link.id] || 0;
              const percent = totalClicks > 0 ? ((count / totalClicks) * 100).toFixed(0) : 0;
              return (
                <div key={link.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate max-w-[240px]">
                      {link.title}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {count} clicks ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Code and Sharing Section */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          Export & Sharing Assets
        </h4>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-white p-2.5 rounded-xl shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrImageUrl}
              alt={`QR for ${profile.title}`}
              width={100}
              height={100}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <p className="text-xs text-slate-300">
              Download your personalized QR Code in high resolution for business cards, banners, or WhatsApp display pictures.
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a
                href={qrImageUrl}
                download={`${profile.slug}-qr.png`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>

              <a
                href={`/api/vcard/${profile.slug}`}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-sky-400" />
                <span>Export vCard</span>
              </a>

              <button
                type="button"
                onClick={onShareClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
