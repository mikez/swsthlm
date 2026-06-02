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

// Force dynamic is NOT needed because ISR is handled by fetch cache options (revalidate).
// The page will be rendered statically and revalidated on demand/ISR.
export default async function Page() {
  const events = await getEvents();

  return (
    <div className="min-h-screen flex flex-col relative text-zinc-100">
      {/* Visual background gradient mesh */}
      <div className="bg-mesh" />

      {/* Decorative Glow */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Header */}
      <header className="w-full border-b border-[var(--card-border)] bg-zinc-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-violet-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Music className="w-5 h-5 text-zinc-950 font-bold" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Swing <span className="text-amber-400">Stockholm</span>
              </h1>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">This Week</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Updated hourly via Google Sheets</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Stockholm&apos;s Social Dance & Workshop Aggregator
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            This Week in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">Swing Stockholm</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Your single, optimized calendar for Lindy Hop, Balboa, Blues, and Shag dancing events in Stockholm, Sweden. Instant load times and responsive client-side filters.
          </p>
        </div>

        {/* Client-Side Interactive Filters and Event Listing */}
        <EventFilters events={events} />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--card-border)] bg-zinc-950/60 py-8 mt-12 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p>© {new Date().getFullYear()} Swing Stockholm. All rights reserved.</p>
            <p className="mt-1 text-zinc-600">
              Not affiliated with any specific studio. Created by dancers, for dancers.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SPREADSHEET_ID || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Spreadsheet Database
            </a>
            <span>•</span>
            <span className="text-zinc-600">Stockholm, Sweden</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
