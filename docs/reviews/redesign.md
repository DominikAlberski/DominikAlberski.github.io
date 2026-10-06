# Review: fractal redesign (task 08461e5d)

- Review task: 1c324d87
- Branch: worker/frontend-developer-1
- Commits: 3e2ce61 (before screenshots), 927eef7 (restyle)
- Base: da41b45
- Reviewer: reviewer-1
- Result: PASS. The review found no critical findings. The warnings and minor findings do not block the merge.

## Acceptance checks

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | The diff touches only assets/css, _includes/head.html, and docs/screenshots/redesign | PASS | `git diff --name-only da41b45..HEAD` lists only `_includes/head.html`, `assets/css/main.css`, and 24 PNG files under `docs/screenshots/redesign/`. |
| 2 | `grep -ri ed6e2f` over assets, _includes, and _layouts returns nothing | PASS | grep exit code is 1. A repo-wide grep over html, md, css, and scss also returns nothing. |
| 3 | `bundle exec jekyll build` exits 0 | PASS | Exit code 0. The build used a scratch destination and `--disable-disk-cache`. |
| 4 | WCAG AA contrast for each text and background pair in main.css | PASS | See the contrast table below. The lowest text pair is 7.36 (muted on surface-2). |
| 5 | After screenshots at 375px: no horizontal overflow, no clipped text, no broken navigation | PASS, with a coverage gap | All six 375px images are 375px wide. No text is clipped. The screenshots show only the collapsed menu (see finding M1). |
| 6 | The fractal image shows in the home hero | PASS | `.hero-home` in `assets/css/main.css:395-401` loads `code_fractale.jpg` under two gradient layers. The fractal is visible in `after/home-1440.png` and `after/home-375.png`. |

## Contrast table

The developer reported most ratios. The reviewer recomputed the pairs that the report did not include.

| Foreground | Background | Ratio | Use | Source |
|------------|------------|-------|-----|--------|
| --text #e6edf5 | --bg | 16.70 | body text | developer |
| --text | --surface | 15.52 | card text | developer |
| --text | --surface-2 | 13.84 | dropdown and mobile menu links | developer |
| --text | --border #1f2d42 | 11.77 | none now; for reference | reviewer |
| --text-muted #9fb0c3 | --bg | 8.89 | callout copy, footer links | developer |
| --text-muted | --surface | 8.26 | card sub-titles | developer |
| --text-muted | --surface-2 | 7.36 | dropdown label row | developer |
| --accent #5cc8f5 | --bg | 10.36 | links, hero sub-title | developer |
| --accent | --surface | 9.62 | card dates | developer |
| --accent | --surface-2 | 8.58 | mobile menu "Home" link and "X" close label | reviewer |
| --accent-hover #8fdcff | --border | 9.16 | dropdown link hover (`main.css:258-261`) | reviewer |
| --accent-hover | --surface-2 | 10.77 | dropdown link hover text over item edge | reviewer |
| --bg | --accent | 10.36 | social link hover | developer |
| --accent-violet #7a6cf0 | --surface | 4.56 | list markers (non-text) | developer |
| --accent-deep #2a6f9e | --bg | 3.63 | card hover border (non-text) | reviewer |

All text pairs pass 4.5 to 1. The hero title and hero sub-title sit on a photo. The contrast of these two elements has no single ratio. The screenshots show that both elements are readable.

## Findings

### W1 (warning): the mobile menu cannot be opened with a keyboard

- File: `assets/css/main.css:183-186`, `assets/css/main.css:73-78`, markup in `_includes/header.html:3-4`.
- Evidence: `.mobile-menu-check` has `display: none`. A `display: none` checkbox cannot get focus. The `<label class="show-mobile-menu">` has no `tabindex`, so the label cannot get focus either. The new `label:focus-visible` rule at line 74 never matches.
- Failure scenario: A keyboard user opens the site at 375px width. The user presses Tab. Focus goes into the collapsed `.header-nav` links (`max-height: 0; overflow: hidden`), which the user cannot see. The user cannot open the menu.
- Origin: the problem existed before this task. The new `label:focus-visible` rule suggests that the developer expected the label to get focus. The rule is dead code.
- Fix: this task cannot fix the problem, because the fix needs markup changes. Create a follow-up task. Replace `display: none` on the checkbox with a visually-hidden pattern, and add a `:focus-visible` style on `.mobile-menu-check:focus-visible + .show-mobile-menu`. Alternatively, add `visibility: hidden` to the collapsed `.header-nav` so that hidden links leave the tab order. Remove the dead `label:focus-visible` selector.

### W2 (warning): the hero transform now applies, so the hero content moves up

- File: `assets/css/main.css:341-348`.
- Evidence: The old rule was `transform: translate(o, -50%)`. The letter `o` is not a number, so browsers ignored the rule. The new rule `transform: translate(0, -50%)` is valid. The hero content now moves up by half of its own height.
- Failure scenario: On a short landscape viewport, the hero content moves close to the top of the hero. The reviewer estimated about 37px of space at 667x375. The content does not go under the sticky header, because the header is in the normal flow above the hero. No clipping occurs in the supplied screenshots.
- Fix: no change is necessary. The task report does not mention this behavior change, so record it for the architect. If the architect wants the old position, remove the `transform` line.

### M1 (minor): the screenshots do not cover the open navigation states

- File: `docs/screenshots/redesign/after/*-375.png`, `docs/screenshots/redesign/after/*-1440.png`.
- Evidence: Every screenshot shows the collapsed mobile menu or the closed desktop dropdown. The new dropdown styles (`main.css:188-261`) and the new mobile menu panel (`main.css:942-992`) have no visual evidence.
- Fix: capture the checked mobile menu at 375px and one open dropdown at 1440px. Add the images to `docs/screenshots/redesign/after/`.

### M2 (minor): the "Home" link has the accent color on every page

- File: `assets/css/main.css:154-156` and `assets/css/main.css:968-970`.
- Evidence: `.header-nav > li:first-child a` always gets `--accent`. The spec says to use `--accent` for active states. On `/articles/`, the "Home" link looks active, but the current page is "Links".
- Origin: the old CSS had the same rule with `#ed6e2f`.
- Fix: no fix is possible in this scope, because a real active state needs a class in the markup. Record the problem as a follow-up.

### M3 (minor): card borders have low contrast against the page

- File: `assets/css/main.css:632-638`, `assets/css/main.css:789-797`, `assets/css/main.css:698-707`.
- Evidence: `--border` on `--bg` is 1.42. `--border` on `--surface` is 1.32. The card fill `--surface` on `--bg` also has low contrast.
- Failure scenario: none for WCAG. The cards are decorative containers, not controls. WCAG 1.4.11 does not apply. On low-quality or bright displays, the card edges are hard to see.
- Fix: optional. Use `--accent-deep` or a lighter border token if the cards must be more visible.

### M4 (minor): dead CSS rules

- `assets/css/main.css:160-177`: `.header-logo` rules. The markup in `_includes/header.html:9-11` is commented out. The developer changed the colors of these rules, but no page uses them.
- `assets/css/main.css:997`: `.half_hero` uses an underscore. The class in the markup is `half-hero`, and that markup is commented out. The rule never matches. This problem existed before this task.
- `assets/css/main.css:721-726`: `.post-aside` markup is commented out in `_layouts/experience.html:31` and `_layouts/education.html:31`.
- Fix: remove the rules in a cleanup task, or keep them for later use. No user-visible effect.

### M5 (minor): Inter weight 700 is not loaded

- File: `_includes/head.html:13`.
- Evidence: The Google Fonts URL loads Inter 400, 500, and 600. Browser defaults give `strong`, `b`, and `th` weight 700 in body text.
- Failure scenario: If later content uses bold text, the browser synthesizes a fake bold for Inter. The reviewer found no bold text in the current content, collections, or layouts.
- Fix: add `700` to the Inter weights, or set `strong, b { font-weight: 600; }`.

## Items the reviewer confirmed as correct

- The `html` black 30px frame is removed. No page has horizontal scroll at 375px. Before the change, home was 729px wide.
- The stray closing brace in the 800px media query is fixed. The mobile rules now apply correctly.
- The `:focus-within` dropdown rules are added for the desktop dropdown and suppressed in the footer and the mobile menu.
- `prefers-reduced-motion` removes the transitions.
- The palette tokens in `:root` match the spec exactly.
- The Raleway weight 100 font is removed.

## Items that are not in scope

- The blog excerpt shows raw front matter (`after/blog-375.png`). The problem existed before this task.
- The gallery images under `/images` are broken (`after/gallery-375.png`). The problem existed before this task.
- The project has no CSS linter, so no static analysis ran.
