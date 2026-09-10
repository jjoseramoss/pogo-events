# PoGo Scout theme

Colors sampled from Jose’s textured reference; these are representative medians, not original vector swatches.

| Role | Tailwind token | Hex |
| --- | --- | --- |
| Background / paper | paper | #F3F4EF |
| Important text / primary button | ink | #45464D |
| Regular accent | accent | #E36042 |
| Special highlight | gold | #EDBC6B |
| Neutral decoration | neutral | #C5C5C5 |
| Normal text (supporting shade) | muted | #63656B |
| Cards (supporting shade) | surface | #FCFCF9 |
| Readable accent text (supporting shade) | accent-ink | #A13C26 |
| Dividers (supporting shade) | line | #DEDFD8 |

## How fonts and colors work

`src/index.css` imports Pixelify Sans and DM Sans from Google Fonts with `display=swap`, allowing fallback text while fonts load. Loading fonts requires network access; fallback fonts remain available.

Tailwind v4 `@theme` registers `--font-pixel` and `--font-sans`, creating `font-pixel` and `font-sans` utilities. DM Sans is also set on the body, so all normal text inherits it. Apply `font-pixel` explicitly to the navbar and page titles.

`--color-paper` creates utilities such as `bg-paper`; `--color-ink` creates `text-ink`, `bg-ink`, and related utilities. Update the variables once to change the theme everywhere. Brighter red and gold are decorative; use darker ink/accent-ink for readable text.

## Learning task

The About page’s Explore events button intentionally has no handler or navigation. Jose will connect it to `/` himself. Existing navbar links and event details links work normally.
