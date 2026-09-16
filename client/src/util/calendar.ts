import { createEvent } from "ics";
import type { PogoEvent } from "../services/events";

export function createStartReminder(event: PogoEvent): string {
  if (!event.start) {
    throw new Error("This event's start time hasnt been announced.");
  }
  const start = new Date(event.start);

  if (Number.isNaN(start.getTime())) {
    throw new Error("This event has an invalid start time.");
  }

  if (start.getTime() <= Date.now()) {
    throw new Error("this event has already started.");
  }

  // Z or an explicit offset means source specifies global instant.
  const isGlobalTime = /(?:Z|[+-]\d{2}:\d{2})$/i.test(event.start);

  const calendarStart: [number, number, number, number, number] = isGlobalTime
    ? [
        start.getUTCFullYear(),
        start.getUTCMonth() + 1,
        start.getUTCDate(),
        start.getUTCHours(),
        start.getUTCMinutes(),
      ]
    : [
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
      ];

  const { error, value } = createEvent({
    uid: `${event.eventID}-start@pogo-event-scout`,
    title: `${event.name} begins`,
    start: calendarStart,
    startInputType: isGlobalTime ? "utc" : "local",
    startOutputType: isGlobalTime ? "utc" : "local",
    duration: { minutes: 15 },
    description: [
      "A 15-minute marker for the start of this Pokémon GO event.",
      "This calendar entry does not represent the full event duration.",
      "Check the source for full dates and any schedule changes.",
      "",
      event.link,
      "",
      "Event data: LeekDuck.com via ScrapedDuck.",
    ].join("\n"),
    url: event.link,
    alarms: [
      {
        action: "display",
        description: `${event.name} starts in 30 minutes!`,
        trigger: { minutes: 30, before: true },
      },
    ],
  });

  if (error || !value) {
    throw new Error("Couldn't create the calendar reminder. Please try again.");
  }

  return value;
}
