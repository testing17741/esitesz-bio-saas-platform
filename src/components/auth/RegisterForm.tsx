'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('You must accept the terms and privacy policy to continue.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create account');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[#161b22] border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Create eSitesz Account</h1>
        <p className="text-xs text-slate-400 mt-1">
          Launch your official bio link pages and customize high-converting themes.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>
        </div>

        {/* DPDP Act & GDPR explicit consent checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="dpdp-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 rounded bg-slate-900 border-slate-800 text-sky-500 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="dpdp-consent" className="text-[11px] text-slate-400 leading-normal cursor-pointer">
            I consent to data processing in accordance with the Digital Personal Data Protection (DPDP) Act 2023 and agree to the{' '}
            <Link href="/terms" className="text-sky-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-sky-400 hover:underline">
              Privacy Policy
            </Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !consent}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? 'Creating Account...' : 'Get Started Free'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="text-sky-400 hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
