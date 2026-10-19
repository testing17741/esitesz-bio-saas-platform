import React from 'react';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import Link from 'next/link';
import { LogOut, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | eSitesz Bio Platform',
  description: 'Manage your bio link profiles, custom themes, and SEO analytics.',
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col font-sans">
      {/* Dashboard Top Header */}
      <header className="border-b border-slate-800 bg-[#0f1724] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
              E
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white">eSitesz</span>
              <span className="text-[11px] text-slate-400 ml-1">/ Dashboard</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {user.role === 'superadmin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </Link>
            )}

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
        <UserDashboard user={user} />
      </main>
    </div>
  );
}
