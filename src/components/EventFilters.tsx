'use client';

import React, { useState, useMemo } from 'react';
import { Search, CalendarDays, SlidersHorizontal, MapPin, Sparkles } from 'lucide-react';
import { SwingEvent } from '@/types/event';
import { EventCard } from './EventCard';
import { isCurrentWeek, formatEventDate } from '@/lib/events';

interface EventFiltersProps {
  events: SwingEvent[];
}

export function EventFilters({ events }: EventFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');

  // Dynamically extract unique venues from the events list
  const venuesList = useMemo(() => {
    const venues = new Set<string>();
    events.forEach((e) => {
      if (e.venue && e.venue.trim().toLowerCase() !== 'all') {
        venues.add(e.venue.trim());
      }
    });
    return ['all', ...Array.from(venues).sort()];
  }, [events]);

  // Extract unique styles
  const stylesList = useMemo(() => {
    const styles = new Set<string>();
    events.forEach((e) => {
      if (e.style && e.style.trim().toLowerCase() !== 'all') {
        styles.add(e.style.toLowerCase());
      }
    });
    return ['all', ...Array.from(styles).sort()];
  }, [events]);

  // Normalizes styles for comparison
  const normalizeStyleLabel = (style: string) => {
    switch (style.toLowerCase()) {
      case 'all':
        return 'All Styles';
      case 'lindy':
        return 'Lindy Hop';
      case 'balboa':
        return 'Balboa';
      case 'blues':
        return 'Blues';
      default:
        return style.charAt(0).toUpperCase() + style.slice(1);
    }
  };

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Search Query Filter (Title, Venue, Band, DJ, Organizer, Description)
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        (event.band && event.band.toLowerCase().includes(q)) ||
        (event.dj && event.dj.toLowerCase().includes(q)) ||
        event.organizer.toLowerCase().includes(q) ||
        event.body.toLowerCase().includes(q);

      // 2. Style Filter
      const matchesStyle = selectedStyle === 'all' || event.style.toLowerCase() === selectedStyle.toLowerCase();

      // 3. Venue Filter
      const matchesVenue = selectedVenue === 'all' || event.venue.trim() === selectedVenue;

      return matchesSearch && matchesStyle && matchesVenue;
    });
  }, [events, searchQuery, selectedStyle, selectedVenue]);

  // Group events by date into "This Week" vs "Upcoming"
  const eventSections = useMemo(() => {
    // Current date reference for "This Week" detection (local time)
    // We use the system time context 2026-06-02 as the anchor
    const REFERENCE_DATE = '2026-06-02';

    const thisWeekEvents: SwingEvent[] = [];
    const upcomingEvents: SwingEvent[] = [];

    filteredEvents.forEach((event) => {
      if (isCurrentWeek(event.date, REFERENCE_DATE)) {
        thisWeekEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    });

    // Helper to group by date
    const groupByDate = (list: SwingEvent[]) => {
      const groups: Record<string, SwingEvent[]> = {};
      list.forEach((event) => {
        if (!groups[event.date]) {
          groups[event.date] = [];
        }
        groups[event.date].push(event);
      });
      return groups;
    };

    return {
      thisWeek: groupByDate(thisWeekEvents),
      upcoming: groupByDate(upcomingEvents),
      hasThisWeek: thisWeekEvents.length > 0,
      hasUpcoming: upcomingEvents.length > 0,
    };
  }, [filteredEvents]);

  // Total count for filters label
  const totalCount = filteredEvents.length;

  return (
    <div className="w-full">
      {/* Search and Filters panel */}
      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by band, DJ, venue, title, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Style Filters */}
          <div>
            <span className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Filter by Style
            </span>
            <div className="flex flex-wrap gap-2">
              {stylesList.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedStyle === style
                      ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-zinc-900/55 hover:bg-zinc-800/80 text-zinc-300 border-zinc-800'
                  }`}
                >
                  {normalizeStyleLabel(style)}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Filters */}
          <div>
            <span className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-violet-500" /> Filter by Venue
            </span>
            <div className="flex flex-wrap gap-2">
              {venuesList.map((venue) => (
                <button
                  key={venue}
                  onClick={() => setSelectedVenue(venue)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedVenue === venue
                      ? 'bg-violet-500 text-white border-violet-500 font-bold shadow-lg shadow-violet-500/20'
                      : 'bg-zinc-900/55 hover:bg-zinc-800/80 text-zinc-300 border-zinc-800'
                  }`}
                >
                  {venue === 'all' ? 'All Venues' : venue}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info count */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--card-border)] text-xs text-zinc-500">
          <span>Found {totalCount} event{totalCount !== 1 ? 's' : ''}</span>
          {(selectedStyle !== 'all' || selectedVenue !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStyle('all');
                setSelectedVenue('all');
              }}
              className="text-amber-500 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Events Results Section */}
      <div className="space-y-12">
        {totalCount === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-[var(--card)] p-8">
            <SlidersHorizontal className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No events match your filters</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Try adjusting your search terms or filters to find dance events.
            </p>
          </div>
        ) : (
          <>
            {/* THIS WEEK EVENTS SECTION */}
            {eventSections.hasThisWeek && (
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--card-border)] pb-3">
                  <CalendarDays className="w-5 h-5 text-amber-500" />
                  <h2 className="text-2xl font-black text-white tracking-tight">Happening This Week</h2>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
                    Highlight
                  </span>
                </div>

                <div className="space-y-8">
                  {Object.entries(eventSections.thisWeek).map(([date, dateEvents]) => (
                    <div key={date} className="space-y-4">
                      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest bg-amber-500/5 py-1.5 px-3 rounded-lg inline-block border border-amber-500/10">
                        {formatEventDate(date)}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dateEvents.map((event) => (
                          <EventCard key={event.id} event={event} isThisWeek={true} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UPCOMING EVENTS SECTION */}
            {eventSections.hasUpcoming && (
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--card-border)] pb-3">
                  <CalendarDays className="w-5 h-5 text-zinc-400" />
                  <h2 className="text-2xl font-black text-white tracking-tight">Upcoming Events</h2>
                </div>

                <div className="space-y-8">
                  {Object.entries(eventSections.upcoming).map(([date, dateEvents]) => (
                    <div key={date} className="space-y-4">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest bg-zinc-800/40 py-1.5 px-3 rounded-lg inline-block border border-zinc-800">
                        {formatEventDate(date)}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dateEvents.map((event) => (
                          <EventCard key={event.id} event={event} isThisWeek={false} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
