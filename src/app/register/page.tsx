import React from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | eSitesz Bio SaaS',
  description: 'Create an account to build high-converting bio link pages and digital cards.',
};

export default function RegisterPage() {
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

      <RegisterForm />
    </div>
  );
}
