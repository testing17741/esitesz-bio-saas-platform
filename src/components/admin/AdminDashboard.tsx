'use client';

import React, { useState, useEffect } from 'react';
import { Profile, ProfileStatus, User } from '@/types';
import { ProfileEditor } from '../builder/ProfileEditor';
import {
  Users,
  Layers,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Check,
  X,
  UserCheck,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface SystemAnalytics {
  totalProfiles: number;
  approvedProfiles: number;
  pendingProfiles: number;
  rejectedProfiles: number;
  totalUsers: number;
  totalViews: number;
}

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Rejection modal state
  const [rejectModalProfile, setRejectModalProfile] = useState<Profile | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Assign modal state
  const [assignModalProfile, setAssignModalProfile] = useState<Profile | null>(null);
  const [assignTargetEmail, setAssignTargetEmail] = useState('');

  // Action messages
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, profilesRes, usersRes] = await Promise.all([
        fetch('/api/admin/analytics').then((r) => r.json()),
        fetch('/api/profiles?all=true').then((r) => r.json()),
        fetch('/api/admin/users').then((r) => r.json()),
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes.data);
      if (profilesRes.success) setProfiles(profilesRes.data.profiles);
      if (usersRes.success) setUsers(usersRes.data.users);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (
    profileId: string,
    newStatus: ProfileStatus,
    reason?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/profiles/${profileId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, rejectionReason: reason }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Profile status updated to ${newStatus}`);
        setTimeout(() => setActionMessage(null), 3000);
        fetchData();
      }
    } catch {
      setActionMessage('Failed to update status');
    }
  };

  const handleAssignOwner = async () => {
    if (!assignModalProfile || !assignTargetEmail) return;
    try {
      const res = await fetch(`/api/admin/profiles/${assignModalProfile.id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: assignTargetEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Profile successfully assigned to ${assignTargetEmail}`);
        setAssignModalProfile(null);
        setAssignTargetEmail('');
        setTimeout(() => setActionMessage(null), 3000);
        fetchData();
      }
    } catch {
      setActionMessage('Failed to assign profile');
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to permanently delete this profile?')) return;
    try {
      const res = await fetch(`/api/profiles/${profileId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionMessage('Profile deleted permanently');
        setTimeout(() => setActionMessage(null), 3000);
        fetchData();
      }
    } catch {
      setActionMessage('Failed to delete profile');
    }
  };

  if (editingProfile) {
    return (
      <ProfileEditor
        initialProfile={editingProfile}
        onBack={() => {
          setEditingProfile(null);
          fetchData();
        }}
      />
    );
  }

  const filteredProfiles = profiles.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.userEmail && p.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Super Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Super Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Full-platform moderation, analytics, user governance, and profile CRUD operations.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Total Profiles</span>
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-white font-mono">{analytics.totalProfiles}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Approved</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-emerald-400 font-mono">
              {analytics.approvedProfiles}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Pending Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-amber-400 font-mono">
              {analytics.pendingProfiles}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Rejected</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-rose-400 font-mono">
              {analytics.rejectedProfiles}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Users</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white font-mono">{analytics.totalUsers}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Total Views</span>
              <Eye className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-white font-mono">
              {analytics.totalViews.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Profiles Management & Moderation Queue */}
      <div className="bg-[#161b22] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">All Client & User Profiles</h2>
            <p className="text-xs text-slate-400">
              Moderate, approve, reject with reason, reassign, or directly edit any profile.
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar">
            {['all', 'approved', 'pending', 'rejected'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search profiles by title, slug, or owner email..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        {/* Profiles Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Profile / Handle</th>
                <th className="py-3 px-3">Owner</th>
                <th className="py-3 px-3">Theme</th>
                <th className="py-3 px-3">Views</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    No profiles match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center font-bold text-sky-400">
                          {p.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.avatarUrl} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            p.title.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white truncate max-w-[200px]">{p.title}</p>
                          <a
                            href={`/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-sky-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>/{p.slug}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-slate-300 font-mono text-[11px]">
                        {p.userEmail || 'Master Admin'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 capitalize">
                        {p.theme}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono">{p.analytics?.views || 0}</td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                          p.status === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : p.status === 'rejected'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
                      {p.status === 'rejected' && p.rejectionReason && (
                        <p className="text-[10px] text-rose-400 mt-0.5 max-w-[150px] truncate" title={p.rejectionReason}>
                          Reason: {p.rejectionReason}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Approve */}
                        {p.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(p.id, 'approved')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                            title="Approve Profile"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Reject */}
                        {p.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => {
                              setRejectModalProfile(p);
                              setRejectionReason(p.rejectionReason || '');
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                            title="Reject Profile with Reason"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Direct Edit */}
                        <button
                          type="button"
                          onClick={() => setEditingProfile(p)}
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition-colors"
                          title="Direct Edit Profile (CRUD)"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Assign to User */}
                        <button
                          type="button"
                          onClick={() => {
                            setAssignModalProfile(p);
                            setAssignTargetEmail(p.userEmail || '');
                          }}
                          className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-colors"
                          title="Assign Profile to User"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteProfile(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectModalProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Reject Profile: {rejectModalProfile.slug}</span>
              </div>
              <button
                onClick={() => setRejectModalProfile(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Please provide the reason for rejection. This will be stored in audit records and displayed to the profile owner so they can fix and re-submit.
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Inappropriate links, copyright infringement, or missing verified details."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUpdateStatus(rejectModalProfile.id, 'rejected', rejectionReason);
                  setRejectModalProfile(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Owner Modal */}
      {assignModalProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#161b22] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <UserCheck className="w-5 h-5" />
                <span>Assign Profile: /{assignModalProfile.slug}</span>
              </div>
              <button
                onClick={() => setAssignModalProfile(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Assign full editing and management ownership of this profile to a specific client email (e.g. Hasnain Baqai or JRM Antophill owner).
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target User Email
              </label>
              <input
                type="email"
                value={assignTargetEmail}
                onChange={(e) => setAssignTargetEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAssignModalProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignOwner}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
              >
                Assign Ownership
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
