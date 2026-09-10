import { EventCategoryTypes } from "../services/events.ts";
import { cleanEventName } from "../util/functions.tsx";

type CategoryFilterProps = {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClear: () => void;
};

export default function CategoryFilter({
  selectedCategories,
  onToggleCategory,
  onClear,
}: CategoryFilterProps) {
  return (
    <div className="mt-6 w-full">
      <div className="flex items-start gap-3">
        <details className="group relative min-w-0 flex-1 sm:max-w-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:border-accent-ink [&::-webkit-details-marker]:hidden">
            Filter by category
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="size-4 shrink-0 transition-transform group-open:rotate-180"
            >
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>

          <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
            <p className="border-b border-line px-4 py-3 text-xs text-muted">
              Choose as many as you like.
            </p>
            <fieldset className="max-h-72 overflow-y-auto overscroll-contain p-2">
              <legend className="sr-only">Event categories</legend>
              {EventCategoryTypes.map((eventCategory) => (
                <label
                  key={eventCategory.name}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gold/20"
                >
                  <input
                    checked={selectedCategories.includes(eventCategory.name)}
                    onChange={() => onToggleCategory(eventCategory.name)}
                    type="checkbox"
                    name="eventCategories"
                    value={eventCategory.name}
                    className="size-4 shrink-0 accent-accent-ink"
                  />
                  {cleanEventName(eventCategory.name)}
                </label>
              ))}
            </fieldset>
          </div>
        </details>

        {/* Add your clear-selection handler here when you implement state. */}
        <button
          onClick={onClear}
          type="button"
          className="shrink-0 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-accent-ink transition-colors hover:border-accent-ink hover:bg-accent/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
