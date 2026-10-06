# Fact-check: rewritten experience entries (task 534442d8)

- Review task: aa280fb9
- Branch: worker/frontend-developer-1
- Commit under review: 9ed891f
- Base: 5d47565
- Reviewer: reviewer-1
- Result: FAIL. The review found 2 critical findings: added claims in `devtactics.md` and `admad.md`. Each fix is a small wording change. The other 4 entries have no added fact.

## Acceptance checks

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Every fact in the before text appears in the after text | PASS, with 1 warning | All 6 entries keep all company names, roles, dates, technologies, team details, responsibilities, and achievements. W2 records one weakened fact in `admad.md`. |
| 2 | Flag every fact or claim in the after text that the before text lacks | FAIL | C1 (`devtactics.md`) and C2 (`admad.md`) are added claims. W1 is an added claim that the front matter supports. M1 to M3 are small added qualifiers. |
| 3 | The diff changes no front matter | PASS | For each of the 6 files, the front matter block at 5d47565 and at 9ed891f is byte-identical. The commit changes only the 6 position files and `docs/copy/positions-before-after.md`. |
| 4 | Active voice and an impact-first opening in each entry | PASS for active voice. FAIL for impact-first in 2 entries | All sentences use active voice. `react_poland.md` and `ruby_on_saas.md` open with the stated achievement. `devtactics.md` and `logihub.md` open with the main responsibility, which the task permits when no outcome is stated. `admad.md` and `lli.md` do not open with impact or with the main responsibility (W3). |
| 5 | Word counts of 70 to 120 | PASS | After counts, with link URLs removed: admad 75, devtactics 91, lli 73, logihub 90, react_poland 73, ruby_on_saas 90. These match the developer report. The reviewer counted admad before as 73, not 74. The difference comes from `branch/brand`, which is one word or two words depending on the counting method. |
| 6 | `bundle exec jekyll build` exits 0 | PASS | The reviewer built the exact tree of 9ed891f from `git archive`. The build exits 0 with no warning or error lines. |

## Findings

### C1 (critical): devtactics.md states a goal as an achieved result

- File: `collections/_positions/devtactics.md`, paragraph 1.
- Before: "My goal is to create high-quality software solutions that meet the needs of our customers and help them achieve their business objectives."
- After: "As a Solution Architect, I design and implement software solutions that meet our customers' needs and help them achieve their business objectives."
- Evidence: The before text states "help them achieve their business objectives" only as a goal. The after text states it as a fact about the solutions. The checklist in `docs/copy/positions-before-after.md` maps "Goal: help customers achieve their business objectives" to this sentence. This mapping confirms the change from goal to claim.
- Failure scenario: A reader takes the opening sentence as a claim of customer results. The user never made that claim.
- Fix: Keep the result as a goal. Example: "As a Solution Architect, I design and implement software solutions that meet our customers' needs." Then move "help them achieve their business objectives" back into the goal sentence in paragraph 3.

### C2 (critical): admad.md says that each team member would present

- File: `collections/_positions/admad.md`, paragraph 2, sentence 2.
- Before: "an annual knowledge exchange thru presentations of what we have learned in the last period."
- After: "In it, each of us would present what we had learned in the last period."
- Evidence: The before text names presentations of what "we" learned. The before text does not say that each person presents. "Each of us" is a new detail about the format.
- Failure scenario: A reader who knows the team reads a format that the user did not describe. The claim is small, but the task rule makes every added fact critical.
- Fix: Use "In it, we would present what we had learned in the last period." Or keep the original structure: "an annual knowledge exchange through presentations of what we had learned in the last period."

### W1 (warning): admad.md adds "a new role"

- File: `collections/_positions/admad.md`, paragraph 1, sentence 1.
- Before: "This is a direct continuation of the previous contract, for the same company and management but a different branch/brand."
- After: "I extended my previous contract into a new role for the same company and management, now for a different branch and brand."
- Evidence: The before body does not mention a new role. The before body says that coding duties "haven't changed much". The front matter supports a change of title: the previous entry `logihub.md` has `title: Junior Ruby Developer`, and `admad.md` has `title: Ruby Developer`. The developer checklist does not list "new role" as a fact or as a front matter source.
- Fix: Ask the user to confirm the new role. If the user does not confirm it, use "I continued my previous contract with the same company and management, now for a different branch or brand."

### W2 (warning): admad.md changes "we were trying to introduce" to "I pushed the team to introduce"

- File: `collections/_positions/admad.md`, paragraph 2, sentence 1.
- Before: "due to my initiative, and nagging we were trying to introduce some sort of annual knowledge exchange".
- After: "On my own initiative, and with steady nagging, I pushed the team to introduce an annual knowledge exchange."
- Evidence: The before text says that the team tried to introduce the exchange, and the attempt came from the user's initiative. The after text keeps the initiative. The after text drops the fact that the team only tried. The after text also drops the hedge "some sort of". The phrase "pushed the team to introduce" can be read as a successful introduction. The developer note says that the text "does not claim that it happened", but a reader cannot see that difference.
- Fix: Keep the attempt explicit. Example: "On my own initiative, and with a lot of nagging, I got the team to try an annual knowledge exchange."

### W3 (warning): admad.md and lli.md do not open with impact or the main responsibility

- File: `collections/_positions/admad.md` sentence 1, `collections/_positions/lli.md` sentence 1.
- Evidence: `admad.md` opens with the contract history. The strongest stated items are the pull request reviews and the knowledge exchange initiative, and both come later. `lli.md` opens with "I started my commercial programming career at LLinformatics and learned a lot there." The main responsibility (Stillpoint maintenance and features) comes in sentence 2. The task requires each entry to lead with its strongest stated impact.
- Fix: In `admad.md`, open with the pull request reviews or the knowledge exchange initiative. In `lli.md`, open with the Stillpoint responsibility, and move the first-job sentence after it.

### M1 (minor): admad.md changes "branch/brand" to "branch and brand"

- Evidence: The slash means one of the two, or both. "Branch and brand" states both.
- Fix: Use "branch or brand", as the developer checklist already does.

### M2 (minor): admad.md adds "steady" to "nagging"

- Evidence: The before text says "nagging". "Steady" adds a degree that the before text does not state.
- Fix: Remove "steady".

### M3 (minor): devtactics.md shifts two responsibilities

- File: `collections/_positions/devtactics.md`, paragraph 2.
- Evidence: The before text lists "understand business requirements" and "creating technical specifications" as two separate tasks. The after text says "turn them into technical specifications", which links the two tasks. The before text says "to ensure that the solutions are delivered on time and within budget". The after text says "to deliver solutions on time and within budget", which makes the user the one who delivers.
- Fix: Optional. Use "create technical specifications" and "to make sure that solutions are delivered on time and within budget".

## Entries with no finding

- `logihub.md`: All facts are kept. "RabitMQ" is now "RabbitMQ". This change fixes a spelling error and adds no fact.
- `react_poland.md`: All facts are kept. The entry opens with the stated achievement. "We" stays with the coverage result, as in the before text. The capitalization changes (Grape, Swagger, Sidekiq, MariaDB, Minitest) add no fact.
- `ruby_on_saas.md`: All facts are kept. The entry opens with the stated achievement. "And others" is now "and other tools", with no change in meaning.
- `lli.md`: All facts are kept. The company name LLinformatics comes from the front matter `company` field. See W3 for the opening.

## Method

- The reviewer compared the before body at 5d47565 with the after body at 9ed891f for each of the 6 files, sentence by sentence.
- The reviewer read the fact checklists in `docs/copy/positions-before-after.md`.
- The reviewer counted words with the link URLs removed.
- The reviewer built the exact tree of 9ed891f. The reviewer did not check page layout, because the task scope excludes styles.
- The reviewer gives no opinion on word choice, except where the words change a fact.

## Re-check (task 62688f90)

- Commit under review: 5aee6f3 (task a9509aaf)
- Scope: `admad.md`, `devtactics.md`, `lli.md`, and `docs/copy/positions-before-after.md`
- Result: PASS. All 8 findings are fixed. The re-check found no new added fact.

### Findings from the first review

| Finding | Status | Evidence in 5aee6f3 |
|---------|--------|---------------------|
| C1 | FIXED | `devtactics.md` paragraph 1 ends at "meet our customers' needs". "Helps them achieve their business objectives" is back in the goal sentence of paragraph 3: "My goal is high-quality software that meets our customers' needs and helps them achieve their business objectives." |
| C2 | FIXED | `admad.md` says "presentations of what we had learned in the last period". The text has no "each of us". |
| W1 | FIXED | `admad.md` says "This work was a direct continuation of my previous contract". The text has no "new role". |
| W2 | FIXED | `admad.md` says "I also got the team to try to introduce some sort of annual knowledge exchange". The attempt and the hedge "some sort of" are back. The text does not say that the exchange happened. |
| W3 | FIXED | `admad.md` opens with the pull request reviews. `lli.md` opens with the Stillpoint responsibility, and the first-job sentence comes second. |
| M1 | FIXED | `admad.md` says "a different branch or brand". |
| M2 | FIXED | `admad.md` says "by nagging". The text has no "steady". |
| M3 | FIXED | `devtactics.md` lists "understand business requirements" and "create technical specifications" as separate tasks. The text says "make sure that solutions are delivered on time and within budget". |

### New facts

The re-check compared each sentence of the 3 new after texts with the before texts at 5d47565. No sentence adds a fact, number, name, or claim.

- `admad.md`: "As an additional task, I started to review my teammates' pull requests" matches the before text. "My coding duties did not change much from the previous ones" matches the before text.
- `devtactics.md`: every sentence restates a before sentence. "Make sure each solution is scalable, maintainable, and aligned with industry best practices" matches "ensuring that the solutions are scalable, maintainable, and aligned with industry best practices".
- `lli.md`: "It was my first commercial programming experience, at LLinformatics" matches the before text. The company name comes from the front matter `company` field.

### Other checks

- Word counts, with link URLs removed: admad 77, devtactics 94, lli 75. All 3 are in the range 70 to 120. The counts in `docs/copy/positions-before-after.md` match.
- Front matter: for all 6 position files, the front matter at 5aee6f3 is byte-identical to the front matter at 5d47565.
- Scope: 5aee6f3 changes only `admad.md`, `devtactics.md`, `lli.md`, and `docs/copy/positions-before-after.md`.
- Before-after file: the diff removes only the 3 old after texts. The before texts do not change.
- Build: the reviewer built the exact tree of 5aee6f3. The build exits 0 with no warning or error lines.
