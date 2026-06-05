import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Music, Disc, Ticket, User } from 'lucide-react';
import { SwingEvent } from '@/types/event';
import { formatEventDate } from '@/lib/events';

interface EventCardProps {
  event: SwingEvent;
  isThisWeek: boolean;
}

export function EventCard({ event, isThisWeek }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Normalize style display name
  const getStyleLabel = (style: string) => {
    switch (style.toLowerCase()) {
      case 'lindy':
        return 'Lindy Hop';
      case 'balboa':
        return 'Balboa';
      case 'blues':
        return 'Blues';
      case 'all':
        return 'All Swing Styles';
      default:
        return style.charAt(0).toUpperCase() + style.slice(1);
    }
  };

  const getStyleColor = (style: string) => {
    switch (style.toLowerCase()) {
      case 'lindy':
        return 'bg-[var(--tertiary)]/10 text-[var(--tertiary)] border-[var(--tertiary)]/20'; // Warm Gold/Amber
      case 'balboa':
        return 'bg-[var(--secondary)]/10 text-[var(--secondary)] border-[var(--secondary)]/20'; // Soft Navy/Blue
      case 'blues':
        return 'bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]';
      default:
        return 'bg-[var(--surface-container)] text-[var(--on-surface-variant)] border-[var(--surface-container-highest)]';
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue} ${event.address}`)}`;

  return (
    <div className="relative lift-card rounded border-2 border-[var(--on-surface)] bg-[var(--surface-container-low)] p-6 overflow-hidden flex flex-col justify-between min-h-[340px] text-[var(--on-surface)]">
      {/* Highlighting border/accent for events happening "This Week" */}
      {isThisWeek && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--primary)]" />
      )}

      <div>
        {/* Badges / Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-sans font-label-sm">
          <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${getStyleColor(event.style)}`}>
            {getStyleLabel(event.style)}
          </span>
          <div className="flex items-center gap-2">
            {event.status === 'draft' && (
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 text-[10px] uppercase font-bold tracking-wider">
                Draft Preview
              </span>
            )}
            {isThisWeek && (
              <span className="px-2.5 py-0.5 rounded bg-[var(--primary)] text-white text-[11px] uppercase font-bold tracking-wider">
                This Week
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold tracking-tight text-[var(--on-surface)] mb-4 hover:text-[var(--primary)] transition-colors">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-3 font-sans font-body-md text-[var(--on-surface-variant)] mb-5">
          <div className="flex items-center gap-2.5 text-sm">
            <Calendar className="w-4 h-4 text-[var(--outline)] shrink-0" />
            <span className="font-semibold text-[var(--on-surface)]">{formatEventDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <Clock className="w-4 h-4 text-[var(--outline)] shrink-0" />
            <span>{event.start} – {event.end}</span>
          </div>

          <div className="flex items-start gap-2.5 text-sm">
            <MapPin className="w-4 h-4 text-[var(--outline)] shrink-0 mt-0.5" />
            <div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors font-bold underline decoration-[var(--outline)] underline-offset-4"
              >
                {event.venue}
              </a>
              {event.address && (
                <span className="block text-xs text-[var(--outline)] mt-0.5">{event.address}</span>
              )}
            </div>
          </div>

          {/* Music: Band / DJ */}
          {(event.band || event.dj) && (
            <div className="pt-3 border-t border-[var(--surface-container-highest)] space-y-1.5 mt-3">
              {event.band && (
                <div className="flex items-center gap-2 text-xs">
                  <Music className="w-3.5 h-3.5 text-[var(--outline)] shrink-0" />
                  <span className="text-[var(--on-surface-variant)]">
                    Live Band: <strong className="text-[var(--on-surface)] font-bold">{event.band}</strong>
                  </span>
                </div>
              )}
              {event.dj && (
                <div className="flex items-center gap-2 text-xs">
                  <Disc className="w-3.5 h-3.5 text-[var(--outline)] shrink-0" />
                  <span className="text-[var(--on-surface-variant)]">
                    DJ: <strong className="text-[var(--on-surface)] font-bold">{event.dj}</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Organizer */}
        {event.organizer && (
          <div className="flex items-center gap-1.5 font-sans text-xs text-[var(--outline)] mb-4 font-medium uppercase tracking-wider">
            <User className="w-3 h-3 text-[var(--outline)]" />
            <span>By {event.organizer}</span>
          </div>
        )}

        {/* Description body with On-Site Expansion */}
        <div className="mb-6 font-sans font-body-md">
          <p className={`text-[var(--on-surface-variant)] leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-3'}`}>
            {event.body}
          </p>
          {(event.body.split('\n').length > 3 || event.body.length > 150) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-bold text-[var(--primary)] hover:underline uppercase tracking-wider cursor-pointer"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>

      {/* Action Footer */}
      {event.ticket && (
        <div className="mt-auto pt-4 border-t border-[var(--surface-container-highest)]">
          <a
            href={event.ticket}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[var(--on-surface)] bg-[var(--primary)] text-white hover:bg-[var(--primary-container)] font-bold uppercase tracking-wider text-xs lift-btn-primary"
          >
            <Ticket className="w-4 h-4" />
            Get Tickets / Info
          </a>
        </div>
      )}
    </div>
  );
}
