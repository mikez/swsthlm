import React from 'react';
import Link from 'next/link';
import { getEvents, getStockholmCurrentDate } from '@/lib/events';
import { EventFilters } from '@/components/EventFilters';
import { Music, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'This Week in Swing Dance Stockholm | Stockholm Swing',
  description:
    'A lightweight, optimized guide to Lindy Hop, Balboa, Shag, and Blues social dancing and workshops in Stockholm. Real-time updates and edge-cached schedule.',
};

export default async function Page() {
  const events = await getEvents();
  const currentDate = getStockholmCurrentDate();

  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--background)] text-[var(--on-surface)]">
      {/* Header - Rhythmic Heritage centered design */}
      <header className="w-full border-b border-[var(--surface-container-highest)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-[var(--on-surface)] bg-[var(--primary)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--on-surface)]">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-serif text-xl font-bold tracking-tight text-[var(--on-surface)] flex items-center gap-1.5">
                Stockholm <span className="text-[var(--primary)]">Swing</span>
              </div>
              <p className="font-sans text-[10px] text-[var(--outline)] uppercase tracking-widest font-extrabold mt-0.5">Dance Calendar</p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link 
              href="/about" 
              className="font-sans text-[11px] font-bold text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-[var(--primary)] pb-0.5"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 mt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] font-sans text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Stockholm&apos;s Swing Dance Aggregator
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--on-surface)] leading-tight">
            This <span className="italic font-normal">Week</span> in Swing Dance Stockholm
          </h1>
          <p className="mt-4 font-sans text-sm md:text-base text-[var(--on-surface-variant)] leading-relaxed max-w-md mx-auto">
            Your single, optimized guide to Lindy Hop, Balboa, Shag, and Blues social dancing and workshops in Stockholm.
          </p>
        </div>

        {/* Client-Side Interactive Filters and Event Listing */}
        <EventFilters events={events} currentDate={currentDate} />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--surface-container-highest)] bg-[var(--surface-container-low)] py-10 text-[var(--on-surface-variant)]/70 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">© {new Date().getFullYear()} Stockholm Swing.</p>
            <p className="mt-1 text-[var(--on-surface-variant)]/70 max-w-sm leading-relaxed">
              Not affiliated with any specific studio. Built to support the local Stockholm swing dance community.
            </p>
          </div>
          <div className="flex gap-6 uppercase font-bold tracking-wider text-[11px] text-[var(--on-surface-variant)]">
            <span>Stockholm, Sweden</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
