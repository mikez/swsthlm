import React from 'react';
import Link from 'next/link';
import { Music, ArrowLeft, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Stockholm Swing',
  description:
    'Stockholm\'s single, optimized calendar and aggregator for Lindy Hop, Balboa, Blues, and Shag dancing events and workshops.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--background)] text-[var(--on-surface)]">
      {/* Header - Rhythmic Heritage centered design */}
      <header className="w-full border-b border-[var(--surface-container-highest)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded border border-[var(--on-surface)] bg-[var(--primary)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--on-surface)]">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-[var(--on-surface)] flex items-center gap-1.5">
                Stockholm <span className="text-[var(--primary)]">Swing</span>
              </h1>
              <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Dance Calendar</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="font-sans text-[11px] font-bold text-zinc-500 hover:text-[var(--primary)] transition-colors uppercase tracking-widest"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calendar
          </Link>
        </div>

        {/* Hero Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] font-sans text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Stockholm&apos;s Dance & Workshop Aggregator
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight text-[var(--on-surface)] leading-tight">
            About Stockholm Swing
          </h2>
        </div>

        {/* Intro Description Card */}
        <div className="lift-card p-8 rounded-lg border border-[var(--on-surface)] bg-[var(--surface-container-lowest)] mb-10">
          <p className="font-serif text-xl md:text-2xl text-[var(--on-surface)] leading-relaxed italic text-zinc-800">
            &ldquo;Your single, optimized calendar for Lindy Hop, Balboa, Blues, and Shag dancing events in Stockholm. Evoking the warm, tactile energy of vintage jazz halls.&rdquo;
          </p>
        </div>

        {/* Informative Text Sections */}
        <div className="space-y-8 font-sans text-zinc-700 leading-relaxed font-body-md">
          <section>
            <h3 className="font-serif text-2xl font-bold text-[var(--on-surface)] mb-3">Our Mission</h3>
            <p>
              Stockholm Swing was born out of a desire to unite the local swing dance scene under one clear,
              lightweight, and easy-to-use platform. Instead of searching through fragmented social media feeds,
              different studio pages, and email newsletters, we aggregate everything in one central schedule.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl font-bold text-[var(--on-surface)] mb-3">Community First</h3>
            <p>
              This project is built and maintained by members of the community for the community. We are not
              affiliated with any single dance studio or organization, meaning we showcase events, socials, tea dances,
              and workshops from all organizers across Stockholm fairly and transparently.
            </p>
          </section>

          <section className="bg-[var(--surface-container-low)] p-6 rounded border border-[var(--surface-container-highest)]">
            <h3 className="font-serif text-xl font-bold text-[var(--on-surface)] mb-2">Are you an organizer?</h3>
            <p className="text-sm">
              If you host Lindy Hop, Balboa, Blues, or Shag dancing events in the Stockholm area and want your schedule 
              integrated into this calendar, feel free to <a href="mailto:swing@walagran.com" className="text-[var(--primary)] hover:underline font-bold">contact us</a> to have your events aggregated.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--surface-container-highest)] bg-[var(--surface-container-low)] py-10 text-zinc-500 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">© {new Date().getFullYear()} Stockholm Swing.</p>
            <p className="mt-1 text-zinc-500 max-w-sm leading-relaxed">
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
