import { useEffect, useState } from "react";

import { getEventData } from "./services/events.ts";
import type { PogoEvent } from "./services/events.ts";

function App() {
  const [events, setEvents] = useState<PogoEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getEventData();

        setEvents(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Something went wrong lol",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []); // this means it runs exactly ONCE when component mounts

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-amber-400">
          Pokémon GO Event Scout
        </p>

        <h1 className="mt-3 text-4xl font-bold">Your next adventure.</h1>

        <p className="mt-4 text-slate-400">
          Find upcoming events worth heading out for.
        </p>

        <section className="mt-10" aria-labelledby="events-heading">
          <h2 id="events-heading" className="text-xl font-semibold">
            Upcoming events
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Sample events for development — not live announcements.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.eventID}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <span className="inline-block rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold capitalize text-amber-300">
                  {event.eventType}
                </span>

                <h3 className="mt-4 text-xl font-semibold">{event.name}</h3>

                <p className="mt-3 text-sm text-slate-300">{event.heading}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
