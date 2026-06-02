import Papa from 'papaparse';
import { SwingEvent } from '@/types/event';

const MOCK_CSV = `id,title,status,date,start,end,venue,address,style,organizer,band,dj,ticket,body
1,Lindy Hop Social at Chicago,published,2026-06-03,19:00,23:00,Chicago Swing Dance Studio,Hornsgatan 75,lindy,Chicago Swing Dance Studio,The Hornsgatan Ramblers,DJ Swing Cat,https://www.chicago.se,Join us for a fantastic night of Lindy Hop at Stockholm's premier swing dance venue! A beginner friendly intro class starts at 19:00.
2,Balboa & Shag Night at Alvik,published,2026-06-04,18:30,22:00,Alvik Medborgarhus,Gustavslundsvägen 168,balboa,Stockholm Balboa Society,,DJ Slow Drag,,An evening dedicated to Balboa and Shag lovers. Beautiful parquet floor and great acoustics.
3,Blues at Chicago - Late Night,published,2026-06-05,20:00,00:30,Chicago Swing Dance Studio,Hornsgatan 75,blues,Swedish Blues Association,The Midnight Blues Band,,https://www.chicago.se,Late night moody blues dancing in the cozy basement. Cozy vibes, great music, and friendly dancers.
4,Saturday Lindy in the Park,published,2026-06-06,14:00,18:00,Haga Parken,Hagaparken,lindy,Swingin' Stockholm,,,https://example.com,Outdoor social dancing near the Copper Tents! Bring your own picnic and dancing shoes for the concrete/grass. Free admission!
5,Balboa Workshop & Tea Dance,published,2026-06-07,13:00,17:00,Alvik Medborgarhus,Gustavslundsvägen 168,balboa,Stockholm Balboa Society,,,https://example.com,Sunday afternoon tea dance preceded by a 1-hour workshop on Balboa footwork. Tea and cakes included!
6,Secret Draft Social,draft,2026-06-03,20:00,22:00,Chicago Swing Dance Studio,Hornsgatan 75,lindy,Private,,DJ Secret,,This is a draft event and should not be displayed in production.
7,Next Week's Jump Session,published,2026-06-10,19:00,22:30,Chicago Swing Dance Studio,Hornsgatan 75,lindy,Chicago Swing Dance Studio,The Stockholm Swingers,,,A high energy mid-week lindy hop social dancing event.`;

/**
 * Normalizes keys to lowercase, trimming whitespace
 */
function normalizeRow(row: Record<string, string>): Partial<SwingEvent> {
  const cleanRow: Record<string, string> = {};
  for (const [key, val] of Object.entries(row)) {
    const cleanKey = key.trim().toLowerCase();
    cleanRow[cleanKey] = typeof val === 'string' ? val.trim() : '';
  }

  // Parse and cast fields to match SwingEvent schema
  return {
    id: cleanRow.id || '',
    title: cleanRow.title || 'Untitled Event',
    status: (cleanRow.status === 'draft' ? 'draft' : 'published') as 'published' | 'draft',
    date: cleanRow.date || '',
    start: cleanRow.start || '',
    end: cleanRow.end || '',
    venue: cleanRow.venue || '',
    address: cleanRow.address || '',
    style: (cleanRow.style || 'all').toLowerCase(),
    organizer: cleanRow.organizer || '',
    band: cleanRow.band || undefined,
    dj: cleanRow.dj || undefined,
    ticket: cleanRow.ticket || undefined,
    body: cleanRow.body || '',
  };
}

/**
 * Fetches events from either Google Sheets (if configured) or falls back to local mock data.
 * Implementation of Incremental Static Regeneration edge caching (1 hour).
 */
export async function getEvents(): Promise<SwingEvent[]> {
  const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
  const gid = process.env.NEXT_PUBLIC_GID || '0';
  let csvText = '';

  if (spreadsheetId) {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    try {
      const response = await fetch(sheetUrl, {
        next: { revalidate: 3600 },
      });
      if (response.ok) {
        csvText = await response.text();
      } else {
        console.warn(`Failed to fetch sheet. Response code: ${response.status}. Using mock data instead.`);
        csvText = MOCK_CSV;
      }
    } catch (e) {
      console.error('Error fetching sheet, falling back to mock data:', e);
      csvText = MOCK_CSV;
    }
  } else {
    csvText = MOCK_CSV;
  }

  const parseResult = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const parsedEvents: SwingEvent[] = parseResult.data
    .map((row) => normalizeRow(row) as SwingEvent)
    .filter((event) => event.id && event.title && event.date);

  // In production, automatically filter out events where status === 'draft'
  const isProd = process.env.NODE_ENV === 'production';
  const filteredEvents = isProd
    ? parsedEvents.filter((event) => event.status === 'published')
    : parsedEvents;

  // Group and sort events chronologically by date and start time
  return filteredEvents.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return a.start.localeCompare(b.start);
  });
}

/**
 * Checks if a YYYY-MM-DD date falls within "This Week".
 * We define "This Week" relative to a reference date (defaults to current date, or a custom one for testing).
 * A week starts on Monday and ends on Sunday.
 */
export function isCurrentWeek(dateStr: string, referenceDateStr?: string): boolean {
  try {
    const refDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
    // Normalize refDate to local midnight to avoid time zone shifts affecting calculations
    refDate.setHours(0, 0, 0, 0);

    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);

    if (isNaN(targetDate.getTime())) return false;

    // Get the start of the week (Monday)
    const day = refDate.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day; // Monday is 1, Sunday is 0
    const startOfWeek = new Date(refDate);
    startOfWeek.setDate(refDate.getDate() + diffToMonday);

    // Get the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return targetDate >= startOfWeek && targetDate <= endOfWeek;
  } catch (error) {
    console.error('Error calculating isCurrentWeek:', error);
    return false;
  }
}

/**
 * Formats a YYYY-MM-DD string into a readable Swedish/local date format, e.g., "Wednesday, Jun 3".
 */
export function formatEventDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
