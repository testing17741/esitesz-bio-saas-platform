'use client';

import React, { useState, useEffect } from 'react';
import { Profile, ProfileStatus, User, ContactInquiry } from '@/types';
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
  Mail,
  MessageSquare,
  Phone,
  Inbox,
  Calendar,
  Shield,
  Send,
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
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'profiles' | 'inquiries' | 'users'>('profiles');

  // Profile Filter & Search
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Inquiry Filter & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

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
      const [analyticsRes, profilesRes, usersRes, inquiriesRes] = await Promise.all([
        fetch('/api/admin/analytics').then((r) => r.json()),
        fetch('/api/profiles?all=true').then((r) => r.json()),
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/inquiries').then((r) => r.json()),
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes.data);
      if (profilesRes.success) setProfiles(profilesRes.data.profiles);
      if (usersRes?.data?.users) setUsers(usersRes.data.users);
      if (inquiriesRes.success) setInquiries(inquiriesRes.data || []);
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

  const handleUpdateInquiryStatus = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Inquiry marked as ${status}`);
        setTimeout(() => setActionMessage(null), 3000);
        fetchData();
      }
    } catch {
      setActionMessage('Failed to update inquiry status');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage('Inquiry deleted successfully');
        setTimeout(() => setActionMessage(null), 3000);
        fetchData();
      }
    } catch {
      setActionMessage('Failed to delete inquiry');
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

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.phone && inq.phone.toLowerCase().includes(inquirySearch.toLowerCase())) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Super Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-sky-400" />
            <span>Super Admin Control Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Full-platform moderation, client inquiries, user accounts, and profile CRUD operations.
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
              <span className="text-[11px] font-semibold text-slate-400">Total Views</span>
              <Eye className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-white font-mono">
              {analytics.totalViews.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Users</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white font-mono">{users.length || analytics.totalUsers}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22] border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Contact Leads</span>
              <Inbox className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white font-mono">{inquiries.length}</p>
              {newInquiriesCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {newInquiriesCount} new
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('profiles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'profiles'
              ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Profiles Moderation & Accounts</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
            activeTab === 'profiles' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}>
            {profiles.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeTab === 'inquiries'
              ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Contact Inquiries / Leads</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
            activeTab === 'inquiries' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}>
            {inquiries.length}
          </span>
          {newInquiriesCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'users'
              ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Users</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
            activeTab === 'users' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}>
            {users.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PROFILES MANAGEMENT */}
      {activeTab === 'profiles' && (
        <div className="bg-[#161b22] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">All Profiles & Handles</h2>
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
      )}

      {/* TAB 2: CONTACT INQUIRIES / LEADS */}
      {activeTab === 'inquiries' && (
        <div className="bg-[#161b22] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-emerald-400" />
                <span>Contact Inquiries & Customer Leads</span>
              </h2>
              <p className="text-xs text-slate-400">
                All client submissions from the /contact page. Directly message via WhatsApp or Gmail, update workflow status, or delete.
              </p>
            </div>

            {/* Inquiries Status Filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar">
              {(['all', 'new', 'contacted', 'resolved'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setInquiryStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                    inquiryStatusFilter === st
                      ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st} ({st === 'all' ? inquiries.length : inquiries.filter((i) => i.status === st).length})
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={inquirySearch}
              onChange={(e) => setInquirySearch(e.target.value)}
              placeholder="Search inquiries by name, email, phone, subject, or message content..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          {/* Inquiries List */}
          {filteredInquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs bg-slate-900/30 rounded-xl border border-slate-800/60">
              <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-60" />
              <p className="font-semibold text-slate-400">No contact inquiries found</p>
              <p className="text-slate-500 text-[11px] mt-1">Inquiries submitted via the /contact page will appear right here in real-time.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredInquiries.map((inq) => {
                const formattedDate = new Date(inq.createdAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                });
                const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, '') : null;
                const whatsappUrl = cleanPhone
                  ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.name}, thank you for contacting Esitesz regarding "${inq.subject}".`)}`
                  : null;
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inq.email)}&su=${encodeURIComponent(`Re: ${inq.subject} - Esitesz`)}`;

                return (
                  <div
                    key={inq.id}
                    className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            inq.status === 'new'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                              : inq.status === 'contacted'
                              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                              : 'bg-slate-700/40 text-slate-300 border border-slate-600/30'
                          }`}
                        >
                          {inq.status}
                        </span>
                        <h3 className="font-bold text-white text-sm sm:text-base">
                          {inq.subject}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-mono capitalize">
                          {inq.serviceType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Sender Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Sender Name</span>
                        <span className="font-semibold text-white">{inq.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Email</span>
                        <span className="font-mono text-sky-400">{inq.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Phone / WhatsApp</span>
                        <span className="font-mono text-slate-200">{inq.phone || 'Not provided'}</span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="text-xs text-slate-300 leading-relaxed bg-[#0b0f17] p-3.5 rounded-lg border border-slate-800/60 whitespace-pre-wrap">
                      {inq.message}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      {/* Contact Channels */}
                      <div className="flex items-center gap-2">
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors no-underline"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                        )}

                        <a
                          href={gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-colors no-underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Compose Gmail</span>
                        </a>
                      </div>

                      {/* Status and Delete Controls */}
                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(inq.id, e.target.value as 'new' | 'contacted' | 'resolved')
                          }
                          className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer capitalize"
                        >
                          <option value="new">Mark: New</option>
                          <option value="contacted">Mark: Contacted</option>
                          <option value="resolved">Mark: Resolved</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REGISTERED USERS */}
      {activeTab === 'users' && (
        <div className="bg-[#161b22] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Registered Accounts & Roles</span>
            </h2>
            <p className="text-xs text-slate-400">
              Platform users, verification statuses, and account creation timeline.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Verified</th>
                  <th className="py-3 px-3">Joined Date</th>
                  <th className="py-3 px-3 text-right">Profiles Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const userProfilesCount = profiles.filter(
                      (p) => p.userId === u.id || (p.userEmail && p.userEmail.toLowerCase() === u.email.toLowerCase())
                    ).length;

                    return (
                      <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-xs">
                              {u.name?.charAt(0).toUpperCase() || u.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-white">{u.name || 'Unnamed User'}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-300">
                          {u.email}
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'superadmin'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          {u.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                              <CheckCircle className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 text-[11px] font-medium">
                              <Clock className="w-3 h-3" />
                              <span>Unverified</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono font-semibold text-white">
                          {userProfilesCount}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
