import React from 'react';
import { getEvents } from '@/lib/events';
import { EventFilters } from '@/components/EventFilters';
import { Music, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'This Week in Swing Stockholm | Swing Dance Events Calendar',
  description:
    'A lightweight, optimized guide to Lindy Hop, Balboa, Shag, and Blues social dancing and workshops in Stockholm. Real-time updates and edge-cached schedule.',
};

export default async function Page() {
  const events = await getEvents();

  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--background)] text-[var(--on-surface)]">
      {/* Header - Rhythmic Heritage centered design */}
      <header className="w-full border-b border-[var(--surface-container-highest)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-[var(--on-surface)] bg-[var(--primary)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--on-surface)]">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-[var(--on-surface)] flex items-center gap-1.5">
                Swing <span className="text-[var(--primary)]">Stockholm</span>
              </h1>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Rhythmic Heritage</p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <span className="font-sans text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
              Stockholm, Sweden
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] font-sans text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Stockholm&apos;s Dance & Workshop Aggregator
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-black tracking-tight text-[var(--on-surface)] mb-6 leading-tight">
            This <span className="italic font-normal">Week</span> in Swing Stockholm
          </h2>
          <p className="font-sans font-body-lg text-zinc-600 max-w-lg mx-auto">
            Your single, optimized calendar for Lindy Hop, Balboa, Blues, and Shag dancing events in Stockholm. Evoking the warm, tactile energy of vintage jazz halls.
          </p>
        </div>

        {/* Client-Side Interactive Filters and Event Listing */}
        <EventFilters events={events} />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--surface-container-highest)] bg-[var(--surface-container-low)] py-10 text-zinc-500 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">© {new Date().getFullYear()} Swing Stockholm.</p>
            <p className="mt-1 text-zinc-500 max-w-sm leading-relaxed">
              Not affiliated with any specific studio. Built to support the local Stockholm swing dance community.
            </p>
          </div>
          <div className="flex gap-6 uppercase font-bold tracking-wider text-[11px] text-[var(--on-surface-variant)]">
            <a
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SPREADSHEET_ID || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] transition-colors underline underline-offset-4"
            >
              Spreadsheet Database
            </a>
            <span>•</span>
            <span className="text-zinc-400">Noble Version</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
