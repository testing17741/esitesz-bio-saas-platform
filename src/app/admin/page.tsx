import React from 'react';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Admin Control Center | eSitesz',
  description: 'Enterprise governance, analytics, and moderation for all client profiles.',
};

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'superadmin') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col font-sans">
      {/* Super Admin Top Header */}
      <header className="border-b border-purple-500/20 bg-[#0f1724] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-sky-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
                E
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white">eSitesz</span>
            </Link>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Shield className="w-3 h-3" />
              <span>Super Admin Panel</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>User Dashboard</span>
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-medium text-white hidden sm:inline">{user.name}</span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AdminDashboard />
      </main>
    </div>
  );
}
