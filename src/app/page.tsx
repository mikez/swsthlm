import React from 'react';
import { getEvents, getStockholmCurrentDate, getStockholmCurrentTime } from '@/lib/events';
import { EventFilters } from '@/components/EventFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'This Week in Swing Dance Stockholm | Stockholm Swing',
  description:
    'A lightweight, optimized guide to Lindy Hop, Balboa, Shag, and Blues social dancing and workshops in Stockholm. Real-time updates and edge-cached schedule.',
};

export default async function Page() {
  const events = await getEvents();
  const currentDate = getStockholmCurrentDate();
  const currentTime = getStockholmCurrentTime();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Compact Hero */}
      <div className="text-center max-w-2xl mx-auto mb-6 mt-2">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[var(--on-surface)] leading-tight">
          Swing Dance <span className="italic font-normal">This Week</span>
        </h1>
        <p className="mt-2 font-sans text-sm md:text-base text-[var(--on-surface-variant)] leading-relaxed max-w-md mx-auto">
          Your guide to Lindy Hop, Balboa, Shag, and Blues social dancing in Stockholm.
        </p>
      </div>

      {/* Client-Side Interactive Filters and Event Listing */}
      <EventFilters events={events} currentDate={currentDate} currentTime={currentTime} />
    </div>
  );
}
