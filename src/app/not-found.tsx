import React from 'react';
import Link from 'next/link';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-[#161b22] border border-slate-800 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
            404 • Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Bio Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The profile or page you are looking for doesn&apos;t exist or may have been renamed.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Claim This Username</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
