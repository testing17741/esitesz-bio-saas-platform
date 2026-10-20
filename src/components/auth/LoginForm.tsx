'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, KeyRound, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [method, setMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'login' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send verification code');
      }
      setOtpSent(true);
      setInfoMessage(data.data.message);
    } catch (err: any) {
      setError(err.message || 'Error dispatching code');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: any = {
        email,
        loginMethod: method,
      };

      if (method === 'password') {
        payload.password = password;
      } else {
        payload.otpCode = otpCode;
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      const user = data.data.user;
      if (user.role === 'superadmin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[#161b22] border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to eSitesz</h1>
        <p className="text-xs text-slate-400 mt-1">
          Access your digital bio pages, analytics, and admin panel.
        </p>
      </div>

      {/* Login Method Toggle */}
      <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 mb-6">
        <button
          type="button"
          onClick={() => {
            setMethod('password');
            setError(null);
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
            method === 'password'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setMethod('otp');
            setError(null);
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
            method === 'otp'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Email OTP
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {infoMessage && (
        <div className="mb-4 p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-sky-400" />
          <span>{infoMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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

        {method === 'password' ? (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">6-Digit Email Code</label>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || !email}
                  className="text-xs text-sky-400 hover:underline disabled:opacity-50"
                >
                  Send OTP Code
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-xs text-slate-400 hover:text-sky-300"
                >
                  Resend OTP
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono tracking-wider text-white focus:outline-none focus:border-sky-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (method === 'otp' && !otpCode)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="text-sky-400 hover:underline font-semibold">
          Create Account
        </Link>
      </div>
    </div>
  );
}
