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
