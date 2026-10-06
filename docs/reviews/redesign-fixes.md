# Review: sticky headings and mobile menu fixes (task 1e93d7fe)

- Review task: 8311dc01
- Branch: worker/frontend-developer-1
- Commit under review: aade129
- Base: 927eef7
- Reviewer: reviewer-1
- Result: PASS. The review found no critical findings. The review found no warning findings. The minor findings do not block the merge.

## Acceptance checks

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | The diff since 927eef7 touches only the paths in the scope of task 1e93d7fe | PASS | aade129 changes `_includes/header.html`, `_layouts/default.html`, `assets/css/main.css`, `assets/js/menu.js`, `docs/decisions/0001-fractal-dark-redesign.md`, and six PNG files in `docs/screenshots/redesign/after/`. Each path is in the task inputs, or the task requires the path. |
| 2 | `_site` and `.jekyll-cache` are not in the new commits | PASS | `git show --stat aade129` lists no `_site` or `.jekyll-cache` path. See finding M5 for the uncommitted cache changes in the worktree. |
| 3 | All three home headings use the same sticky behavior at 1440px and 375px | PASS | `main.css:470-480` gives all three `h1` elements the same sticky rule. `display: contents` on the wrappers (`main.css:494-496`) makes each `h1` the flex item of its section. The four `home-scrolled-*` screenshots show the Experience and Education headings pinned. See finding M1 for the 375px gap. |
| 4 | The mobile menu control is focusable, has an accessible name, and has `aria-expanded` that tracks the state | PASS | `_includes/header.html:5` adds `<button type="button" aria-expanded="false" aria-controls="main-menu">Menu</button>`. `assets/js/menu.js:7-14` toggles `aria-expanded` on click. A native button handles Enter and Space. The CSS opens the panel from `[aria-expanded="true"]` (`main.css:1006-1011`), so the visual state cannot differ from the ARIA state. `mobile-menu-focus-375.png` shows the focus ring. |
| 5 | Escape closes the menu, and the links of the closed menu leave the tab order | PASS | `menu.js:15-19` closes the menu on Escape and focuses the button. The closed `.header-nav` has `visibility: hidden` (`main.css:979-980`), so its links cannot get focus. |
| 6 | The menu still opens if JavaScript does not load | PASS | Without the `js-menu` class, the checkbox is visually hidden but focusable (`main.css:936-945`), and the label shows. `.mobile-menu-check:checked ~ .header-nav` still opens the panel. The `<label for="mobile-menu">` gives the checkbox the name "Menu". |
| 7 | `bundle exec jekyll build` exits 0, and `grep -ri ed6e2f` returns nothing | PASS | Build exit code is 0 at aade129. The build used a scratch destination. The grep over assets, `_includes`, and `_layouts` exits 1. The built pages include `menu.js`. |
| 8 | WCAG AA for new color pairs, and no overflow at 375px | PASS | The new pairs are `--text` on the header (16.70), `--accent` "X" on `--bg` (10.36), and the `--accent` focus ring on `--bg` (10.36). The six new screenshots show no horizontal overflow. |
| 9 | The ADR matches the shipped palette and fonts | PASS, with minor text errors | All ten tokens match `main.css:3-12`. The three fonts match `_includes/head.html:13`. See findings M3 and M4. |

## Architect item: 4px gap above the sticky heading at 375px

- Severity: **minor**.
- Evidence: `home-scrolled-experience-375.png` and `home-scrolled-education-375.png` show the tops of the card titles ("Solution Architect", "Coding Bootcamp") in a strip from about 68px to 72px. The strip is between the header bottom and the heading band.
- Cause: `--header-h` is a fixed 72px (`main.css:22`). The mobile header height is not fixed. The height comes from `margin-top: 1.5vh` on the menu control (`main.css:963`), the `1.5em` padding, and the line height. The reviewer estimates the header height as about `58px + 1.5vh`. That gives about 68px at a 667px viewport height, 72px at 932px, and 74px at 1024px.
- Failure scenario: On a short phone, a gap shows card text above the heading. On a tall phone or a portrait tablet at 800px width or less, the header covers the top 1-3px of the heading band. The heading text does not get clipped, because the band has 0.75rem top padding. No content becomes unreadable, and no control stops working. The defect is cosmetic.
- Fix: Give the mobile header a fixed height that does not use `vh`, for example `height: var(--header-h)` on `.header` in the 800px media query. Remove `margin-top: 1.5vh` from `.show-mobile-menu, .menu-toggle`, and center the control in the header. Alternatively, set the mobile `top` to `calc(var(--header-h) - 4px)`. The first fix removes the cause. The second fix only moves the error to taller viewports.

## Findings

### M1 (minor): the sticky heading offset depends on viewport height

See the architect item above. The desktop rule has the same dependency: `.header-nav` uses `padding: 2.5vh 3vw` (`main.css:135`). The desktop rule adds 2rem of space (`main.css:479`), so the header does not cover the heading at typical desktop heights.

### M2 (minor): the menu can stay open if the user taps it before menu.js runs

- File: `assets/js/menu.js:11`, `assets/css/main.css:1006-1007`.
- Evidence: `.mobile-menu-check:checked ~ .header-nav` still opens the panel when the `js-menu` class is present. `menu.js` hides the checkbox but does not read or clear its `checked` state.
- Failure scenario: On a slow network, the user taps "Menu" before the deferred `menu.js` runs. The checkbox becomes checked, and the panel opens. Then `menu.js` runs and hides the checkbox. The button shows `aria-expanded="false"`, but the panel stays open. The button and Escape cannot close the panel, because the checkbox holds the open state.
- Fix: In `menu.js`, read `checkbox.checked` at start-up. If the checkbox is checked, call `setOpen(true)` and clear the checkbox. Alternatively, scope the checkbox rules to `.main-nav:not(.js-menu)`.

### M3 (minor): the ADR gives a wrong lowest text contrast

- File: `docs/decisions/0001-fractal-dark-redesign.md`, section Consequences.
- Evidence: The ADR says that the lowest text contrast is 4.56 to 1 for `--accent-violet` on `--surface`. The next sentence says that `--accent-violet` is used only for list markers and decoration. List markers are not text. The lowest text pair is `--text-muted` on `--surface-2` at 7.36 (see `docs/reviews/redesign.md`).
- Fix: Change the sentence to "The lowest text contrast is 7.36 to 1 (`--text-muted` on `--surface-2`)." Keep the violet ratio as a non-text value.

### M4 (minor): the ADR says that all colors are tokens, but main.css has color literals

- File: `docs/decisions/0001-fractal-dark-redesign.md`, section Decision and section Consequences. `assets/css/main.css:248`, `358`, `367`, `401-402`.
- Evidence: The ADR says "Define all colors as CSS custom properties" and "Do not add hard-coded colors to new rules". `main.css` has `rgba(7, 11, 18, …)` in the hero gradient and in two text shadows, and `rgba(0, 0, 0, 0.45)` in the dropdown shadow.
- Fix: Either add tokens for these values, or add one ADR sentence that permits alpha variants of `--bg` in gradients and shadows.

### M5 (minor): the frontend worktree has uncommitted .jekyll-cache changes, and the repository tracks 68 generated files

- Evidence: `git -C .worktrees/frontend-developer-1 status --short` shows one modified and one deleted file under `.jekyll-cache/`. `git ls-files .jekyll-cache _site` lists 68 files, although `.gitignore` lines 5-6 ignore both directories. The tracked files existed before this task.
- Failure scenario: Every local build changes tracked cache files. A later `git add -A` or `git commit -a` commits generated files by accident.
- Fix: Create a follow-up task to run `git rm -r --cached .jekyll-cache _site`. Do not merge the uncommitted worktree changes.

### M6 (minor): the menu stays open after the user selects an in-page link

- File: `assets/js/menu.js`.
- Evidence: The menu has "Experience" (`/#positions`) and "Education" (`/#educations`) links. On the home page, these links scroll the page and do not load a new page. `menu.js` does not close the menu on link activation or on a click outside the menu.
- Failure scenario: A user on the home page at 375px opens the menu and selects "Experience". The page scrolls to the section, but the open panel still covers the top of the section. The user must close the menu manually. The CSS-only menu before this task had the same behavior.
- Fix: Optional. In `menu.js`, call `setOpen(false)` on a click on any `#main-menu a`.

## Items the reviewer confirmed as correct

- The desktop navigation rules do not change. The button, the checkbox, and the label have `display: none` above 800px (`main.css:186-190`).
- The `content: "X" / ""` declaration comes after a plain `content: "X"` fallback. Browsers without alt-text support use the fallback. The only effect in those browsers is that "X" becomes part of the accessible name, as the developer reported.
- `aria-controls="main-menu"` points to the `ul` that has `id="main-menu"`. The `nav` has `aria-label="Main"`.
- The focus ring uses `outline-offset: -6px` in the mobile menu, so the header does not clip the ring.
- `menu.js` is 20 lines, has no dependencies, and exits early if `.main-nav` is missing.
- The previous finding W1 in `docs/reviews/redesign.md` is fixed. The dead `label:focus-visible` selector is removed.

## Method

- The reviewer read the diff and the new files, and viewed all six new screenshots.
- The reviewer did not run a browser. The keyboard, Escape, and no-JavaScript results come from reading the code and from the steps in the developer report.
- The project has no CSS linter or JavaScript linter, so no static analysis ran.
