import { Link } from "react-router";

export default function AboutPage() {
  return (
    <section
      aria-labelledby="about-title"
      className="mx-auto flex max-w-2xl flex-col items-center py-8 text-center sm:py-16"
    >
      <span className="mb-8 flex size-20 items-center justify-center rounded-3xl border border-line bg-surface shadow-sm">
        <img src="/poke-icon.png" alt="" className="size-12 object-contain" />
      </span>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">
        A little less scrolling. A little more exploring.
      </p>
      <h1
        id="about-title"
        className="mt-5 font-pixel text-5xl leading-tight sm:text-6xl"
      >
        Your next adventure,
        <br />a little easier to find.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
        PoGo Scout is a small fan-made project by Jose, a Pokémon GO player
        building a simpler way to keep up with the game and share it with
        friends.
      </p>
      <div className="my-9 h-1 w-14 rounded-full bg-gold" aria-hidden="true" />
      <p className="max-w-xl leading-7 text-muted">
        Browse event cards, find something that catches your eye, and follow the
        details on LeekDuck. The goal is simple: spend less time searching for
        what’s happening and more time enjoying it.
      </p>
      <p className="mt-5 max-w-xl leading-7 text-muted">
        This is still growing. Personalized filters and optional email updates
        are planned for later; today, it starts with the event feed.
      </p>
      <p className="mt-7 max-w-lg text-sm leading-6 text-muted">
        Event data is provided by LeekDuck through ScrapedDuck. This is an
        independent fan project, not an official Pokémon GO service.
      </p>
      {/* Learning task for Jose: connect this button to the home/events route. */}
      <Link
        to="/"
        className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl bg-ink px-7 py-3 font-semibold text-paper transition-colors hover:bg-accent-ink"
      >
        Explore events <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
