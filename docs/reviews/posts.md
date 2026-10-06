# Review: dev.to post publishing (task fe9fa93c)

- Review task: d2567150
- Branch: worker/frontend-developer-1
- Commit under review: e715cfa
- Base: 9e51bfb
- Reviewer: reviewer-1
- Result: PASS for checks 1 to 12. The review found no critical findings and no warning findings. The minor findings do not block the merge.
- Checks 10 to 12 (Blog link) review commit 45c683f from task b7a3d254. Task b7a3d254 finished before this review ended.

## Acceptance checks

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Each post body matches the dev.to API `body_markdown` | PASS | The reviewer fetched all 3 posts from `https://dev.to/api/articles/dominik_alberski/<slug>` (HTTP 200). A line diff of `body_markdown` against each post body shows no wording change and no missing section. The only differences are listed below this table. |
| 2 | Each post page has `link rel="canonical"` to the dev.to URL, and other pages do not | PASS | In the build of e715cfa, only the 3 post pages contain `rel="canonical"`. Each value equals the API `canonical_url`. Only the 3 post files set `canonical_url`. `head.html` keeps the old `og:url` output in the `else` branch. |
| 3 | No broken image path and no remote image hotlink | PASS | The post pages have 2 content images. Both are local files under `assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/`, and both exist. The only other `<img>` is `/assets/images/logo.png`, inside HTML comments in `header.html:10-11` and `footer.html:2`. The browser does not load it. |
| 4 | Links page badges, links, and sort rule | PASS | The build has 9 cards in A to Z title order. The 3 own posts have the "My post" badge. They link to the local post URL with no `target`. The 6 external cards keep `target="_blank" rel="noopener noreferrer"`. The sort rule is `sort_natural: "title"` (`articles/index.html:8`). |
| 5 | The placeholder post is removed, and no file references `assets/images/shark.jpg` | PASS | `collections/_posts/2016-11-04-title-of-second-post.md` and `assets/images/shark.jpg` are deleted. The only remaining `shark.jpg` references are `/images/small/shark.jpg` and `/images/large/shark.jpg` in `gallery/index.html:68-69`, which point to different files. |
| 6 | `bundle exec jekyll build` exits 0, and the `ed6e2f` grep returns nothing | PASS | The reviewer built the exact tree of e715cfa from `git archive` into a scratch directory. The build exits 0 with no warning or error lines. The grep over `assets`, `_includes`, and `_layouts` of that tree exits 1. |
| 7 | WCAG AA for the syntax theme and other new color pairs | PASS | Code blocks use `--bg` as the background. Keywords `--accent-violet` 4.91, strings `--accent-hover` 13.00, names `--accent` 10.36, comments `--text-muted` 8.89, plain `--text` 16.70. Inline code `--text` on `--surface-2` 13.84. Tags `--text-muted` on `--surface-2` 7.36. Badge `--bg` on `--accent` 10.36. The reviewer confirmed these values against the table in `docs/reviews/redesign.md`. The lowest pair (violet, 4.91) passes 4.5 to 1 for the 0.85rem code text. |
| 8 | No post page has horizontal scroll at 375px | PASS | `pre` has `overflow-x: auto` and `max-width: 100%`. `pre code` has `white-space: pre`. Tables have `display: block; overflow-x: auto`. Inline code has `overflow-wrap: anywhere`. `post-page-375.png` shows a long code line cut at the edge of the code block, not at the page edge. All 375px screenshots are 375px wide. |
| 9 | The diff touches only the task scope and has no `_site` or `.jekyll-cache` files | PASS | e715cfa changes only paths that the task inputs or deliverables name. `git show --name-only e715cfa` lists no `_site` or `.jekyll-cache` path. |
| 10 | The Blog link shows on desktop, in the mobile menu, and in the footer | PASS | See the section "Blog link (commit 45c683f)". |
| 11 | The Blog link opens /blog/ and works with the keyboard | PASS | See the section "Blog link (commit 45c683f)". |
| 12 | At 375px, the navigation has no horizontal scroll and no wrap problem | PASS | See the section "Blog link (commit 45c683f)". |

### Body differences between dev.to and the site

These differences are the complete output of the line diff. None of them changes the post wording.

- All 3 posts: the site body starts with one blank line after the front matter, and the site body ends with a newline.
- Pragmatic Programmer post: the developer removed the dev.to front matter block (lines 1-10 of `body_markdown`: `title`, `published`, `tags`, `cover_image`, and blank lines). The developer moved the same data into the Jekyll front matter.
- Pragmatic Programmer post: the image URL `https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/5bp2dc2kjpl53k8lhlj9.png` changed to the local copy `/assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/image-1.png`.
- Memoization post: the developer added the kramdown attribute line `{: start="2"}` after list item 2. The built HTML has `<ol start="2">`, so the second list shows "2." as it does on dev.to.

The title, date, and tags in each post front matter match the API `title`, `published_at`, and `tag_list`.

## Blog link (commit 45c683f)

- Scope: 45c683f changes `_includes/nav-links.html`, `assets/css/main.css`, and screenshots in `docs/screenshots/posts/`. The commit has no `_site` or `.jekyll-cache` path.
- Build: The reviewer built the exact tree of 45c683f. The build exits 0 with no warning or error lines. The `ed6e2f` grep over `assets`, `_includes`, and `_layouts` exits 1.
- Check 10: `nav-links.html` adds `<li><a href="/blog/">Blog</a></li>` between Education and Links. `header.html` and `footer.html` both include `nav-links.html`. Each built page has 2 links to `/blog/`: one in the header and one in the footer. `nav-1440.png` shows Blog in the desktop header. `nav-menu-open-375.png` shows Blog in the open mobile menu.
- Check 11: The Blog link is a plain `<a href>`, like the Home and Links links. `nav-menu-open-375.png` shows the focus ring on Blog in the open mobile menu. Enter on the link loads `/blog/`, and the new page starts with the menu closed. The developer report confirms these keyboard steps. The reviewer did not run a browser.
- Check 12: `.footer-nav` is now a flex container with `flex-wrap: wrap` and gaps. At 800px or less, the footer links use 0.75rem. The committed `blog-list-375.png` shows the five footer links on one line at 375px, with no horizontal scroll. On narrower screens, flex wrap moves whole links to a second line, so a link cannot break in the middle. The new footer font size keeps `--text-muted` on `--bg` at 8.89.

## Findings

### M1 (minor): the Pragmatic Programmer image keeps the placeholder alt text "Image description"

- File: `collections/_posts/2026-07-07-reading-the-pragmatic-programmer-in-the-age-of-ai.md:49`.
- Evidence: The markdown is `![Image description](...)`. This text is the default placeholder of the dev.to editor. The dev.to source has the same text.
- Failure scenario: A screen reader announces "Image description" and gives no information about the image.
- Fix: The task forbids wording changes, so the developer kept the text. Ask the user for a real alt text. Then change the alt text on dev.to and on the site together.

### M2 (minor): the blog list description of the fixtures post starts with a heading and has extra spaces

- File: `collections/_posts/2024-05-07-rails-integration-testing-with-fixtures.md`, front matter `description`.
- Evidence: The value is `The Challenge of Realistic Test Data   I recently faced a unique challenge in writing...`. dev.to generated the description from the first heading and the first paragraph. HTML collapses the three spaces, so `blog-list-375.png` shows "The Challenge of Realistic Test Data I recently faced...". The heading and the sentence run together with no separator.
- Fix: Optional. The description is dev.to metadata, not post wording. If the user agrees, remove the heading text from `description`, or change the three spaces to ". ".

### M3 (minor): the post cover is a 470 KB image with no size attributes

- File: `_layouts/post.html:21`, `assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/cover.webp`.
- Evidence: The file is a 1000x420 WebP at 481,120 bytes. The `<img class="post-cover">` has no `width`, no `height`, and no `loading` or `decoding` attribute.
- Failure scenario: On a slow mobile connection, the cover loads late and moves the post text down after the first paint.
- Fix: Add `width="1000" height="420"` to the cover `<img>`. Optionally compress the WebP again at a lower quality.

### M4 (minor): the cover image is a copy of an Amazon product image

- File: `assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/cover.webp`.
- Evidence: The dev.to `cover_image` source is `https://m.media-amazon.com/images/I/911WvX7M98L._SL1500_.jpg`. The site now hosts a copy of this image.
- Risk: The book cover belongs to the publisher. dev.to shows the image through its own image proxy. Self-hosting the copy moves any rights question to this site. The risk is low for a book review, but the user should know about it.
- Fix: No code change. Tell the user. If the user wants no risk, remove `cover_image` from the post front matter.

### M5 (minor): `.post-content table` uses `display: block`

- File: `assets/css/main.css`, the `.post-content table` rule in the POST PAGE section.
- Evidence: `display: block` on a `<table>` makes wide tables scroll. Some browser and screen reader pairs, for example Safari with VoiceOver, then stop exposing the element as a data table.
- Failure scenario: None today. No current post contains a table. A later post with a table could lose table navigation for screen reader users.
- Fix: Keep `display: table` on the table. Put the horizontal scroll on a wrapper, or accept the risk until a post uses a table.

### M6 (minor): each article card still contains a `<main>` element

- File: `_includes/article-card.html:18` (new own-post branch) and `_includes/article-card.html:38` (existing external branch).
- Evidence: The links page build has 9 `<main>` elements, one per card. HTML allows only one visible `<main>` per page. The external branch had this problem before this task. The new own-post branch copies it.
- Fix: Change `<main>` to `<div>` in both branches of `article-card.html`. Update the `.articles-cards > .article-card > main` selectors in `main.css` to match.

### M7 (minor, resolved): the screenshots in e715cfa show no Blog link

- Evidence: The `blog-list-*.png` and `links-page-*.png` files in e715cfa come from before the Blog link. Commit 45c683f replaces all four files with versions that show the Blog link.
- Fix: No action is necessary.

### M8 (minor): the footer has two `<nav>` elements with no accessible name

- File: `_includes/footer.html:3` and `_includes/footer.html:9`.
- Evidence: The header `<nav>` has `aria-label="Main"`. The two footer `<nav>` elements have no label. A screen reader landmark list shows "Main navigation" and then two unnamed "navigation" entries. The Blog link makes the footer site navigation longer, but this problem existed before this task.
- Fix: Add `aria-label="Footer"` to the first footer `<nav>` and `aria-label="Social"` to the second.

## Items the reviewer confirmed as correct

- `render_with_liquid: false` on each post stops Liquid from changing code that contains `{{` or `{%`.
- The post footer links to the dev.to original with `target="_blank" rel="noopener noreferrer"`.
- The "Read post" link has `aria-label="Read post: <title>"`. The label starts with the visible text, so voice control users can say the visible text to activate the link.
- The `content: " \2192" / ""` arrow has a plain fallback declaration before it.
- `blog/index.html` no longer uses the gravatar, twitter, and `postHero` fields that the deleted placeholder post needed.
- `_includes/post-info.html` is still used by `_includes/recent-post-list.html`. The experience and education layouts include that list inside an HTML comment, so removing the `Author:` span has no visible effect.

## Method

- The reviewer fetched the 3 posts from the public dev.to API and compared the bodies with `diff`.
- The reviewer built the exact tree of commit e715cfa. The worktree had uncommitted Blog link changes, so the reviewer did not build the worktree for checks 6 to 8.
- The reviewer read the diff and viewed `post-page-375.png` and `post-page-1440.png` (committed versions). The reviewer also viewed `blog-list-375.png` and `links-page-375.png`, which are now committed in 45c683f. The post cards, badges, and descriptions in these files match the build of e715cfa. For checks 10 to 12, the reviewer viewed `nav-1440.png` and `nav-menu-open-375.png`.
- The reviewer did not run a browser. The project has no CSS linter or HTML linter, so no static analysis ran.
