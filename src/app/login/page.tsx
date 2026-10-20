import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | eSitesz Connect',
  description: 'Sign in with your email and password or request a 6-digit email OTP.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to eSitesz Home</span>
        </Link>
      </div>

      <LoginForm />
    </div>
  );
}
