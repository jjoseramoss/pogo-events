import { useEffect, useState } from "react";

import { getEventData } from "../services/events.ts";
import type { PogoEvent } from "../services/events.ts";
import { cleanEventName } from "../util/functions.tsx";

import CategoryFilter from "../components/CategoryFilter.tsx";

export default function HomePage() {
  const [events, setEvents] = useState<PogoEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter by Categories selected
  const filteredEvents = events.filter((event) => {
    if (selectedCategories.length <= 0) {
      return true;
    } else {
      if (selectedCategories.includes(event.eventType)) {
        return true;
      }
      return false;
    }
  });

  // Sort by earliest start time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return getStartTime(a.start) - getStartTime(b.start);
  });

  // Helper function for sorting events
  function getStartTime(value: string | null | undefined) {
    const time = value ? new Date(value).getTime() : NaN;

    return Number.isNaN(time) ? Infinity : time;
  }

  function handleToggleCategory(category: string) {
    // implement adding/removing category
    // Check if category inside selected Categories
    // If it is, remove it since its been clicked to be removed
    // If not, add it, without changign original array

    setSelectedCategories((previous) => {
      if (previous.includes(category)) {
        return previous.filter((item) => item !== category);
      } else {
        return [...previous, category];
      }
    });
  }

  function handleClearCategory() {
    setSelectedCategories([]);
  }
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getEventData();

        if (!Array.isArray(data))
          throw new Error("Unable to load events. Please try again later.");
        setEvents(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load events. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []); // Load this page’s event feed when it mounts.

  function formatEventDate(time: string | null | undefined) {
    if (!time) return "Not announced";

    const date = new Date(time);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  return (
    <div>
      <section className="flex flex-col items-center relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-14 md:flex-row md:justify-around">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 size-60 rounded-full border-[35px] border-gold/25"
        />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">
            Your field guide to Pokémon GO
          </p>
          <h1 className="mt-5 font-pixel text-5xl leading-[1.05] sm:text-7xl">
            Big adventures.
            <br />
            <span className="text-accent-ink">One little scout.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted sm:text-lg">
            Find your next raid, community gathering, or reason to head outside.
            Start with what catches your eye.
          </p>
        </div>

        <div className="mt-10 border-4 border-accent-ink rounded-full overflow-hidden w-40 md:w-60 md:ml-5 lg:w-80">
          <img
            className="w-full h-full object-cover -z-10"
            src="/charizard-gif.gif"
            alt="retro charizard shooting fire ball."
          />
        </div>
      </section>

      <section
        className="mt-12"
        aria-labelledby="events-heading"
        aria-busy={isLoading}
      >
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">
              On the radar
            </p>
            <h2
              id="events-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Explore events
            </h2>
          </div>
          {!isLoading && !error && (
            <span className="rounded-full bg-gold/30 px-3 py-1 text-sm font-medium">
              {events.length} in the feed
            </span>
          )}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          From LeekDuck via ScrapedDuck. The feed may include recently ended
          events; check each listing for its dates.
        </p>

        {isLoading ? (
          <div className="w-full flex flex-col justify-center items-center ">
            <img
              className="w-50 h-50 pt-10"
              src="/loading-poke.gif"
              alt="Loading Pokemon GIF"
            />
            <p className="p-5">Scouting Latest Events ...</p>
          </div>
        ) : error ? (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-8 text-accent-ink"
          >
            {error}
          </p>
        ) : events.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-line bg-surface p-8 text-muted">
            No events to show right now. Check back soon.
          </p>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              onClear={handleClearCategory}
            />

            {/* CHECKED CATEGORY LIST  */}
            <div className="mt-3 w-full">
              {selectedCategories.length > 0 && (
                <h3 className="mb-2 text-xs font-semibold text-ink">
                  Selected Categories:
                </h3>
              )}

              <div className="flex w-full flex-wrap items-center gap-1.5">
                {selectedCategories.map((c, idx) => (
                  <div
                    key={idx}
                    className="inline-flex max-w-full items-center rounded-full bg-[#87AE73] px-2 py-0.5 text-[11px] leading-4 font-semibold text-white wrap-break-word"
                  >
                    {cleanEventName(c)}
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <article
                  key={event.eventID}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-neutral/30">
                    <img
                      src={event.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="self-start rounded-md bg-gold/30 px-2.5 py-1 text-xs font-bold text-ink">
                      {event.heading}
                    </span>
                    <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
                      {event.name}
                    </h3>
                    <span className="text-sm">
                      Start: {formatEventDate(event.start)}
                    </span>
                    <span className="text-sm">
                      End: {formatEventDate(event.end)}
                    </span>
                    <a
                      href={event.link}
                      className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-bold text-accent-ink underline-offset-4 hover:underline"
                      aria-label={`Read details for ${event.name} on LeekDuck`}
                    >
                      Event details <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
