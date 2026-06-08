'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[var(--surface-container-highest)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded border border-[var(--on-surface)] bg-[var(--primary)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--on-surface)]">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold tracking-tight text-[var(--on-surface)] flex items-center gap-1.5">
              Stockholm <span className="text-[var(--primary)]">Swing</span>
            </div>
            <p className="font-sans text-[10px] text-[var(--outline)] uppercase tracking-widest font-extrabold mt-0.5">Dance Calendar</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`font-sans text-xs font-bold uppercase tracking-widest py-2 px-3 rounded transition-colors ${
              pathname === '/'
                ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                : 'text-[var(--on-surface-variant)] hover:text-[var(--primary)]'
            }`}
          >
            Calendar
          </Link>
          <Link
            href="/about"
            className={`font-sans text-xs font-bold uppercase tracking-widest py-2 px-3 rounded transition-colors ${
              pathname === '/about'
                ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                : 'text-[var(--on-surface-variant)] hover:text-[var(--primary)]'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
