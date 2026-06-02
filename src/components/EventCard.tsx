import React from 'react';
import { Calendar, Clock, MapPin, Music, Disc, Ticket, User } from 'lucide-react';
import { SwingEvent } from '@/types/event';
import { formatEventDate } from '@/lib/events';

interface EventCardProps {
  event: SwingEvent;
  isThisWeek: boolean;
}

export function EventCard({ event, isThisWeek }: EventCardProps) {
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
        return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      case 'balboa':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/25';
      case 'blues':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/25';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue} ${event.address}`)}`;

  return (
    <div className="relative glow-card rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 overflow-hidden flex flex-col justify-between min-h-[320px]">
      {/* Highlighting background glow for events happening "This Week" */}
      {isThisWeek && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      )}

      <div>
        {/* Badges / Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStyleColor(event.style)}`}>
            {getStyleLabel(event.style)}
          </span>
          <div className="flex items-center gap-2">
            {event.status === 'draft' && (
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase font-bold tracking-wider">
                Draft Preview
              </span>
            )}
            {isThisWeek && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium">
                This Week
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2.5 text-sm text-[var(--muted)] mb-5">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{formatEventDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{event.start} – {event.end}</span>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 transition-colors font-medium underline decoration-amber-500/30 underline-offset-4"
              >
                {event.venue}
              </a>
              {event.address && (
                <span className="block text-xs text-zinc-400">{event.address}</span>
              )}
            </div>
          </div>

          {/* Music: Band / DJ */}
          {(event.band || event.dj) && (
            <div className="pt-2.5 border-t border-[var(--card-border)] space-y-1.5 mt-2.5">
              {event.band && (
                <div className="flex items-center gap-2 text-xs">
                  <Music className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span className="text-zinc-300">
                    Live Band: <strong className="text-white">{event.band}</strong>
                  </span>
                </div>
              )}
              {event.dj && (
                <div className="flex items-center gap-2 text-xs">
                  <Disc className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span className="text-zinc-300">
                    DJ: <strong className="text-white">{event.dj}</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Organizer */}
        {event.organizer && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
            <User className="w-3 h-3" />
            <span>By {event.organizer}</span>
          </div>
        )}

        {/* Description body */}
        <p className="text-sm text-zinc-300 leading-relaxed mb-6 whitespace-pre-line line-clamp-3">
          {event.body}
        </p>
      </div>

      {/* Action Footer */}
      {event.ticket && (
        <div className="mt-auto pt-4 border-t border-[var(--card-border)]">
          <a
            href={event.ticket}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold transition-all shadow-lg hover:shadow-amber-500/25"
          >
            <Ticket className="w-4 h-4" />
            Get Tickets / Info
          </a>
        </div>
      )}
    </div>
  );
}
