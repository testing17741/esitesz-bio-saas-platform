'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { GeneralTab } from './GeneralTab';
import { LinksTab } from './LinksTab';
import { ContactTab } from './ContactTab';
import { ThemesTab } from './ThemesTab';
import { SeoStudioTab } from './SeoStudioTab';
import { AnalyticsTab } from './AnalyticsTab';
import { MobileMockupPreview } from './MobileMockupPreview';
import { ShareModal } from '../ShareModal';
import { QrCodeModal } from '../QrCodeModal';
import {
  User,
  Link2,
  Phone,
  Palette,
  Search,
  BarChart2,
  Save,
  CheckCircle2,
  ExternalLink,
  Eye,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

interface ProfileEditorProps {
  initialProfile: Profile;
  onBack?: () => void;
}

export function ProfileEditor({ initialProfile, onBack }: ProfileEditorProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [activeTab, setActiveTab] = useState<'general' | 'links' | 'contact' | 'themes' | 'seo' | 'analytics'>('general');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showMobilePreviewModal, setShowMobilePreviewModal] = useState(false);

  const handleProfileChange = (updates: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save changes');
      }

      setProfile(data.data.profile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation & Save */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#161b22] border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to my profiles"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-[260px]">
                {profile.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                /{profile.slug}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Editing live bio link page • Theme: <span className="capitalize">{profile.theme}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Preview Button */}
          <button
            type="button"
            onClick={() => setShowMobilePreviewModal(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <a
            href={`/${profile.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-50"
          >
            {saving ? (
              <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Save Notification Alerts */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Profile changes saved and updated live successfully!</span>
        </div>
      )}

      {saveError && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Grid: Tabs & Mobile Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor Tabs & Form */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#161b22] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'general'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>General</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('links')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'links'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Links ({profile.links?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'contact'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'themes'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Themes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'seo'
                  ? 'bg-purple-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEO • AEO • GEO</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </button>
          </div>

          {/* Active Tab Component */}
          {activeTab === 'general' && (
            <GeneralTab profile={profile} onChange={handleProfileChange} />
          )}
          {activeTab === 'links' && (
            <LinksTab profile={profile} onChange={handleProfileChange} />
          )}
          {activeTab === 'contact' && (
            <ContactTab profile={profile} onChange={handleProfileChange} />
          )}
          {activeTab === 'themes' && (
            <ThemesTab profile={profile} onChange={handleProfileChange} />
          )}
          {activeTab === 'seo' && (
            <SeoStudioTab profile={profile} onChange={handleProfileChange} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab
              profile={profile}
              onShareClick={() => setShowShareModal(true)}
              onQrClick={() => setShowQrModal(true)}
            />
          )}
        </div>

        {/* Right Column: Live Mobile Mockup Preview (Desktop view) */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-center">
          <MobileMockupPreview
            profile={profile}
            onShareClick={() => setShowShareModal(true)}
            onQrClick={() => setShowQrModal(true)}
          />
        </div>
      </div>

      {/* Mobile Preview Modal (for screens < lg) */}
      {showMobilePreviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md lg:hidden"
          onClick={() => setShowMobilePreviewModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MobileMockupPreview
              profile={profile}
              onShareClick={() => setShowShareModal(true)}
              onQrClick={() => setShowQrModal(true)}
            />
            <button
              type="button"
              onClick={() => setShowMobilePreviewModal(false)}
              className="w-full mt-3 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Share and QR Modals */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        profile={profile}
      />
      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        profile={profile}
      />
    </div>
  );
}
