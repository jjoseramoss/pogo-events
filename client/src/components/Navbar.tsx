import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8"
      >
        <Link to="/" className="flex items-center gap-3 rounded-lg">
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface">
            <img src="/poke-icon.png" alt="" className="size-7 object-contain" />
          </span>
          <span className="font-pixel text-2xl font-semibold text-ink">
            PoGo Scout<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 font-pixel text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-paper"
                    : "text-muted hover:bg-neutral/25 hover:text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
