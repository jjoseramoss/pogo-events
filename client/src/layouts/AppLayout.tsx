import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:p-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14"
      >
        <Outlet />
      </main>
      <footer className="border-t border-line px-5 py-6 text-center text-xs leading-6 text-muted">
        Made for the next adventure. Data from{" "}
        <a
          className="underline underline-offset-4 hover:text-accent-ink"
          href="https://github.com/bigfoott/ScrapedDuck"
        >
          ScrapedDuck
        </a>{" "}
        and{" "}
        <a
          className="underline underline-offset-4 hover:text-accent-ink"
          href="https://leekduck.com/"
        >
          LeekDuck
        </a>
        .
      </footer>
    </div>
  );
}
