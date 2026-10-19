'use client';

import React, { useState, useEffect } from 'react';
import { Profile, User } from '@/types';
import { ProfileEditor } from '../builder/ProfileEditor';
import {
  Plus,
  ExternalLink,
  Edit,
  Eye,
  MousePointerClick,
  Share2,
  QrCode,
  ShieldAlert,
  CheckCircle,
  KeyRound,
  Trash2,
} from 'lucide-react';
import { ShareModal } from '../ShareModal';
import { QrCodeModal } from '../QrCodeModal';

interface UserDashboardProps {
  user: User;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Create Profile Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Claim Profile with OTP Modal
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimSlug, setClaimSlug] = useState('');
  const [claimEmail, setClaimEmail] = useState(user.email);
  const [claimOtp, setClaimOtp] = useState('');
  const [claimStep, setClaimStep] = useState<'request' | 'verify'>('request');
  const [claimMessage, setClaimMessage] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  // Modals for share / qr
  const [modalProfile, setModalProfile] = useState<Profile | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profiles');
      const data = await res.json();
      if (data.success) {
        setProfiles(data.data.profiles || []);
      }
    } catch (err) {
      console.error('Failed to load user profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);

    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newSlug.toLowerCase().trim(),
          title: newTitle.trim(),
          theme: 'esitesz-dark-luxury',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create profile');
      }

      setShowCreateModal(false);
      setNewSlug('');
      setNewTitle('');
      fetchUserProfiles();
      setEditingProfile(data.data.profile);
    } catch (err: any) {
      setCreateError(err.message || 'Creation error');
    } finally {
      setCreating(false);
    }
  };

  const handleSendClaimOtp = async () => {
    setClaiming(true);
    setClaimError(null);
    setClaimMessage(null);

    try {
      // Find profile by slug
      const slugRes = await fetch(`/api/profiles?all=true`);
      const slugData = await slugRes.json();
      const target = (slugData.data?.profiles || []).find(
        (p: Profile) => p.slug === claimSlug.toLowerCase().trim()
      );

      if (!target) {
        throw new Error(`Profile "/${claimSlug}" was not found.`);
      }

      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: claimEmail,
          purpose: 'claim',
          profileId: target.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setClaimMessage(data.data.message);
      setClaimStep('verify');
    } catch (err: any) {
      setClaimError(err.message || 'Error initiating claim');
    } finally {
      setClaiming(false);
    }
  };

  const handleVerifyClaimOtp = async () => {
    setClaiming(true);
    setClaimError(null);

    try {
      // Find profile by slug
      const slugRes = await fetch(`/api/profiles?all=true`);
      const slugData = await slugRes.json();
      const target = (slugData.data?.profiles || []).find(
        (p: Profile) => p.slug === claimSlug.toLowerCase().trim()
      );

      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: claimEmail,
          code: claimOtp.trim(),
          purpose: 'claim',
          profileId: target?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Verification code invalid');
      }

      setShowClaimModal(false);
      setClaimSlug('');
      setClaimOtp('');
      setClaimStep('request');
      fetchUserProfiles();
    } catch (err: any) {
      setClaimError(err.message || 'Failed to verify code');
    } finally {
      setClaiming(false);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    try {
      const res = await fetch(`/api/profiles/${profileId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchUserProfiles();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (editingProfile) {
    return (
      <ProfileEditor
        initialProfile={editingProfile}
        onBack={() => {
          setEditingProfile(null);
          fetchUserProfiles();
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#161b22] border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your high-converting digital bio link pages, themes, and SEO analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Claim Profile via OTP */}
          <button
            type="button"
            onClick={() => setShowClaimModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <KeyRound className="w-4 h-4 text-sky-400" />
            <span>Claim Profile via OTP</span>
          </button>

          {/* Create Profile */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Profile</span>
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Your Bio Link Pages ({profiles.length})</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs animate-pulse">
            Loading your profile pages...
          </div>
        ) : profiles.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-white">You haven&apos;t created any bio pages yet.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create a new high-converting bio profile or claim an existing page using email OTP.
            </p>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Profile</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[#161b22] border border-slate-800 hover:border-slate-700 shadow-lg flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-sky-500/20 flex items-center justify-center font-bold text-sky-400 shrink-0">
                      {p.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.avatarUrl} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        p.title.charAt(0).toUpperCase()
                      )}
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                        p.status === 'approved'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : p.status === 'rejected'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white truncate">{p.title}</h3>
                  <a
                    href={`/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>esitesz.com/{p.slug}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {p.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {p.description}
                    </p>
                  )}

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-mono text-slate-200">
                        {p.analytics?.views || 0}
                      </span>
                      <span>views</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono text-slate-200">
                        {Object.values(p.analytics?.clicks || {}).reduce((a, b) => a + b, 0)}
                      </span>
                      <span>clicks</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setModalProfile(p);
                        setShowShareModal(true);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalProfile(p);
                        setShowQrModal(true);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProfile(p.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingProfile(p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Profile Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Create New Bio Link Profile</h2>
            <p className="text-xs text-slate-400">
              Pick a unique handle and profile title. You can customize all links, styling, and SEO immediately.
            </p>

            {createError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Username / Slug *
                </label>
                <div className="flex rounded-xl bg-slate-900 border border-slate-800 overflow-hidden focus-within:border-sky-500">
                  <span className="px-3 py-2 text-xs text-slate-500 bg-slate-800/60 border-r border-slate-800 select-none flex items-center">
                    esitesz.com/
                  </span>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) =>
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
                    }
                    placeholder="handle"
                    className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name / Organization Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. John Doe or My Organization"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create & Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claim Profile with OTP Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
              <KeyRound className="w-5 h-5" />
              <span>Claim Existing Profile (OTP Protected)</span>
            </div>

            <p className="text-xs text-slate-300">
              If an official page (e.g. Hasnain Baqai or JRM Antophill) was created for you, enter the username handle and verify via email OTP to claim full edit and ownership access.
            </p>

            {claimError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {claimError}
              </div>
            )}

            {claimMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                {claimMessage}
              </div>
            )}

            {claimStep === 'request' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Profile Handle to Claim (Slug)
                  </label>
                  <input
                    type="text"
                    value={claimSlug}
                    onChange={(e) => setClaimSlug(e.target.value.toLowerCase().trim())}
                    placeholder="e.g. hasnainbaqai or jrmantophill"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Verification Email
                  </label>
                  <input
                    type="email"
                    value={claimEmail}
                    onChange={(e) => setClaimEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSendClaimOtp}
                    disabled={claiming || !claimSlug}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {claiming ? 'Sending OTP...' : 'Send Verification OTP'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Enter 6-Digit Email OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={claimOtp}
                    onChange={(e) => setClaimOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-center text-lg tracking-widest text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setClaimStep('request')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Resend Code
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowClaimModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyClaimOtp}
                      disabled={claiming || claimOtp.length !== 6}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {claiming ? 'Verifying...' : 'Verify & Claim Profile'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share and QR Modals */}
      {modalProfile && (
        <>
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            profile={modalProfile}
          />
          <QrCodeModal
            isOpen={showQrModal}
            onClose={() => setShowQrModal(false)}
            profile={modalProfile}
          />
        </>
      )}
    </div>
  );
}
