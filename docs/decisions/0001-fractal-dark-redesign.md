# 0001. Fractal dark redesign

## Status

Accepted. Date: 2026-09-24.

## Context

The site used a white and black layout with an orange accent (#ed6e2f).
The headings used Raleway at weight 100. This weight was thin and hard to read.
The home hero shows the image assets/images/code_fractale.jpg.
The fractal image has deep blue, cyan, and violet tones on a near-black background.
The colors were hard-coded in many rules in assets/css/main.css.
Some pages had horizontal scroll at a 375px viewport width.

## Decision

Use a dark deep-space theme.
Derive the theme from assets/images/code_fractale.jpg.
Keep the fractal image as the home hero visual.

Define all colors as CSS custom properties on `:root` in assets/css/main.css.
Exception: gradients and shadows can use alpha variants of `--bg` as `rgba(7, 11, 18, alpha)`.
Use these palette tokens:

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #070b12 | Page background |
| `--surface` | #0e1520 | Cards |
| `--surface-2` | #152033 | Dropdown menu and mobile menu panel |
| `--border` | #1f2d42 | Card borders and separators |
| `--text` | #e6edf5 | Body text and headings |
| `--text-muted` | #9fb0c3 | Secondary text |
| `--accent` | #5cc8f5 | Links, nav hover, active states, focus rings |
| `--accent-hover` | #8fdcff | Link hover |
| `--accent-deep` | #2a6f9e | Article card hover border |
| `--accent-violet` | #7a6cf0 | Secondary accent. Use it sparsely. |
| `--accent-warm` | #ff9e59 | Hero name only. Do not use it for other elements. |

Remove the orange color #ed6e2f from assets, _includes, and _layouts.

Load three fonts from Google Fonts in _includes/head.html:

- Use Space Grotesk for headings.
- Use Inter for body text.
- Use JetBrains Mono for dates and small labels.

Show experience, education, and article entries as cards on `--surface` with a `--border` border.
Put a dark gradient overlay on the home hero.

Sample `--accent-warm` from the orange binary digits in assets/images/code_fractale.jpg.
The source pixel is at x 382, y 634 in the 1920 by 1312 image.
Put a backing of `rgba(7, 11, 18, 0.8)` behind the hero name.
Keep cyan `--accent` as the main accent.

On the home page, make the whole experience card and the whole education card a link.
Stretch the title link over the card with a pseudo-element.
On hover and on keyboard focus, show the card border and the card title in `--accent`.

## Consequences

Each text and background pair meets WCAG AA.
The lowest text contrast is 7.36 to 1 (`--text-muted` on `--surface-2`).
`--accent-violet` is used only for list markers and decoration.
These uses are not text.
The non-text contrast of `--accent-violet` on `--surface` is 4.56 to 1.

The hero name sits on a photo.
The backing makes the name contrast independent of the photo.
If the pixel behind the backing is white, `--accent-warm` has a contrast of 5.44 to 1.
If the pixel behind the backing is black, `--accent-warm` has a contrast of 9.78 to 1.
`--accent-warm` on `--bg` has a contrast of 9.65 to 1.

To change a color, edit the token on `:root`.
Do not add hard-coded colors to new rules.

The site is dark only.
The site does not have a light theme.

The pages depend on Google Fonts.
If Google Fonts does not load, the browser uses the fallback fonts in the font stacks.

The hero title sits on a photo.
The hero title has no single contrast ratio.
A gradient overlay and a text shadow keep the hero title readable.
