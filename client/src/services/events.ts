export async function getEventData() {
  const url =
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export type PogoEvent = {
  eventID: string;
  name: string;
  image: string;
  eventType: string;
  start: string | null;
  end: string | null;
  heading: string;
  link: string;
};

export type EventCategory = {
  category: string;
  name: string;
};

export const EventCategoryTypes: EventCategory[] = [
  { category: "Event-Misc", name: "community-day" },
  { category: "Event-Misc", name: "event" },
  { category: "Event-Misc", name: "live-event" },
  { category: "Event-Misc", name: "pokemon-go-fest" },
  { category: "Event-Misc", name: "global-challenge" },
  { category: "Event-Misc", name: "safari-zone" },
  { category: "Event-Misc", name: "ticketed-event" },
  { category: "Event-Misc", name: "location-specific" },
  { category: "Event-Misc", name: "bonus-hour" },
  { category: "Event-Misc", name: "pokemon-spotlight-hour" },
  { category: "Event-Misc", name: "potential-ultra-unlock" },
  { category: "Event-Misc", name: "update" },
  { category: "Event-Misc", name: "season" },
  { category: "Event-Misc", name: "pokemon-go-tour" },
  { category: "Event-Misc", name: "go-pass" },
  { category: "Event-Misc", name: "ticketed" },
  { category: "Event-Misc", name: "pokestop-showcase" },
  { category: "Event-Misc", name: "wild-area" },
  { category: "Event-Misc", name: "city-safari" },
  { category: "Research", name: "research" },
  { category: "Research", name: "timed-research" },
  { category: "Research", name: "limited-research" },
  { category: "Research", name: "research-breakthrough" },
  { category: "Research", name: "special-research" },
  { category: "Research", name: "research-day" },
  { category: "Raids-and-Battles", name: "raid-day" },
  { category: "Raids-and-Battles", name: "raid-battles" },
  { category: "Raids-and-Battles", name: "raid-hour" },
  { category: "Raids-and-Battles", name: "raid-weekend" },
  { category: "Raids-and-Battles", name: "go-battle-league" },
  { category: "Raids-and-Battles", name: "elite-raids" },
  { category: "Raids-and-Battles", name: "max-battles" },
  { category: "Raids-and-Battles", name: "max-monday" },
  { category: "Go-Rocket", name: "go-rocket-takeover" },
  { category: "Go-Rocket", name: "team-go-rocket" },
  { category: "Go-Rocket", name: "giovanni-special-research" },
];
