# Project website handbook

English handbook for the project website, v1.6.1, 2026-11-03 (Inbox v0.1.1 demo and release/download links; evaluation remains measured on v0.1.0, with no new held-out measurement; v1.6 one global nav and a module sub-nav, a fuller overview, the Inbox hero as a three-step flow, use cases as a grid; v1.5 several pages: `/`, `/toolkit/`, `/inbox/`, `/inbox/demo/`, see §2.0, §4.6, §5.1, §6, §9; v1.4.1 release steps: public `main` first, then fast-forward `release`; v1.4 own repository; v1.3 FAQ section, v1.2 and v1.1 earlier). Live at https://deal-ops-toolkit-site.vercel.app (source in `site/`). This is the basis for every later change to the site: when the design or a method changes, update this handbook and add a line to §9.

## 1. What the site is for

- **Readers:** people evaluating the project, and syndicate leads deciding whether the tool solves their reconciliation and allocation work.
- **After a minute they should know:** what each module does; why its results can be trusted; where the data goes (Toolkit: it stays in the browser; Inbox: on your own server, with redacted text to the model provider you configure); how it was built; where to open it or see the demo.
- **Claims:** the pages state only what is implemented, tested and released (rule P9). Every feature sentence and every figure must be traceable to the module's release notes (Toolkit `docs/RELEASE_NOTES.md`, Inbox `CHANGELOG.md`), its English docs or its sample data; the one external figure set (UK Finance, on `/inbox/`) was checked against the report itself and is pinned by `site:check`.
- **Identity:** the project's own visual design (PRD decision 8); no third-party names, marks, assets or page text. The footer keeps "Not affiliated with any platform".

## 2.0 Site structure (from v1.5)

| Address | What it is | Structure |
|---|---|---|
| `/` | Deal Ops overview | Hero ("Deal operations, / open source.", two top-aligned panels: a Toolkit bank statement and the Inbox risk check) → dark module section (two columns: one line, three capabilities, one sourced figure, two links) → Where it fits (a table of deal stages: three Toolkit cells, one Inbox band) → How we build (four columns, the division of work, three links) → shared FAQ, six questions (`dfaq-*`) → closing → footer. "Not a regulated service" is only in the footer and the FAQ (plan 14 R3) |
| `/toolkit/` | Toolkit module page | The table in §2 below (the former home page, moved; its `<main>` is unchanged word for word apart from the sub-nav added under the hero) |
| `/inbox/` | Inbox module page | Hero (sample E0225 as three steps: the email → the check → prepared) → sub-nav → problem → four-card deck (dark) → trust figures (dark) → use cases as a 2 × 3 grid and the default categories (collapsed) → security (one centred line and a risk list) → deployment and choices (with the three roles in one line) → FAQ, 14 questions in four groups (`ifaq-*`) → closing → footer |
| `/inbox/demo/` | The Inbox's own static demo | The v0.1.1 Release asset unpacked as published; the site changes none of its files; hashes locked in `inbox-demo.lock` |

- **Shared by every page:** one global navigation, identical everywhere (brand "Deal Ops"; Toolkit · Inbox · How we build · FAQ, the current module marked with `aria-current="page"`; GitHub on the right), the phone menu and the footer. Module pages add a **sub-nav** under the hero that then sticks under the global nav (module name, the page's sections, the page's main button); their `body` has `has-subnav`. Both are checked by `site:check`. The footer (four columns Modules / Code / Project / Contact, the disclaimer, the software statement, the "Deal Ops" wordmark). The footer is identical on every page (`site:check`).
- **Paths:** local references in pages start with `/` (pages sit at different depths); `url()` in `styles.css` is relative to the stylesheet and stays as it is.
- **Old links:** when the overview's address carries `#faq-…`, `#step-1..3`, `#how`, `#trust` or `#built`, `site.js` moves on to the same anchor on `/toolkit/`; so the overview must not use those ids (`site:check`). `/#faq` itself is not moved on: it now lands on the overview's shared FAQ.

## 2. Page structure (top to bottom; from v1.5 this is `/toolkit/`)

| # | Section | Background | Content | Motion |
|---|---|---|---|---|
| 1 | Navigation | Floating glass capsules, then the sub-nav | Global nav (§2.0): Deal Ops · Toolkit · Inbox · How we build · FAQ · GitHub; under the hero the sub-nav: Deal Ops Toolkit · How it works · Why trust it · How it was built · Toolkit FAQ · Open the app | A pill slides to the hovered link; both bars turn dark over dark sections |
| 2 | Hero | Light, open, no container | Headline "Reconcile an SPV / to the penny.", the grey verb turning to Allocate and Distribute and back; lead paragraph; two buttons | Focus-in entrance; the verb turns letter by letter every 4.5 s, once round, then stops |
| 3 | Hero illustration | Full-width soft glow fading out above and below | Three panels: bank statement, closing allocation, exit waterfall (§4.2) | Panels rise in turn; bars grow; Review → Confirmed; the panel for the headline's verb lifts |
| 4 | Light to dark | Hard edge, no band (2026-10-30) | none ("How it works" for screen readers only); 96px of space at the top of the dark section (56px on phones) | — |
| 5 | Three-step deck | Dark full-width band | Three cards: text and a close-up clip from the real app; step labels with progress bars | Pinned; each card slides up over the last (§4.3) |
| 6 | Why trust the numbers | Same dark band | Small section label; four large figures, filled with a white-to-grey gradient: Exact · 1,800 · 267 / 267 · 199 / 199; the release the figures come from | Fade in |
| 7 | Dark to light | Hard edge (2026-10-30) | — | — |
| 8 | Privacy | Light, centred type | "Your deal data stays in your browser" and the app's privacy sentence (R-X-02) word for word | Fade in |
| 9 | How it was built | Light, four columns under hairlines | 01–04, the closing line on who does what, links to the repository and the review summary | Fade in |
| 10 | FAQ | Light, hairlines, group name left, questions right | 16 questions in 4 groups, native disclosure, closed by default (§4.5) | No entrance (§10 item 12) |
| 11 | Closing call to action | Full-width glow, echoing the hero | "Try it with the sample deal" / "No sign-up, nothing to install." / tour button | The glow drifts once (24 s) |
| 12 | Footer | Dark | Product / Code / Contact; the app's disclaimer (R-X-03); last, a near full-width wordmark fading downwards and cut off by the bottom edge (decorative, hidden from screen readers) | No entrance (§10 item 11) |

**Layout rules**
- At most one rounded container per screen (adopted after the first sample read as "cards stacked on cards").
- No bare large headings; section headings are small mono labels.
- Light and dark sections alternate and **meet at a hard edge**: a linear gradient between them passes through a muddy grey (bands removed 2026-10-30).
- A nav link lands with the section's content about 140px below the top; sections without their own top padding use `scroll-margin-top: 140px`. A link to one FAQ question lands it 140px down too (72px on phones, below the bar).

## 3. Design system

### 3.1 Colour
The light-mode core colours and the primary button match the app (its values are in `src/tokens.css`, shared word for word with Deal Ops Inbox), so the site and the app read as one product. The site keeps its own copy of these values and does not use `tokens.css`; its design is frozen (Inbox design rules v0.3, not yet published).

| Use | Light | Dark |
|---|---|---|
| Page `--bg` | `#f6f8f3` | `#161616` |
| Text `--text` | `#151619` | `#f9fafb` |
| Secondary `--muted` | `#5f6359` | `#a3a3a3` |
| Rotating verb `--soft` (large text only) | `#8a8f84` | `#8c8c8c` |
| Hairline `--line` | `#dde2d6` | `#2e2e2e` |
| Dark band `--band` | `#151619` | `#0b0b0c` |
| Cards on the band | `#1d1e22` | `#1c1c1c` |
| Primary button | ink `#151619`, text `#f6f8f3` | peach `#eab189`, text `#161616` |
| Glow | `#f3c7a3`, `#cfe0b8`, `#e7a57f` | `#6b4630`, `#3e4d33`, `#7a4a33` |
| Waterfall bars | investors `#151619`, lead `#e39a6c` | investors `#e9ede4`, lead `#e39a6c` |

Light or dark follows the device setting; there is no switch on the page.

### 3.2 Type
- Inter (variable) for text and headings, IBM Plex Mono for labels and numbers; both open-licensed, served by the site itself, Latin subset, preloaded.
- Hero headline `clamp(44px, 7.6vw, 100px)`, weight 500, line height 0.97, tracking −0.04em; below 380px `clamp(34px, 10.4vw, 44px)` so "Distribute an exit" fits one line at 320px.
- Section labels: mono 13px, upper case, tracking 0.14em. Card titles `clamp(28px, 3.1vw, 42px)` (pinned: `clamp(26px, min(3.1vw, 5.4vh), 42px)`). Trust figures `clamp(48px, 6.8vw, 98px)`, never wrapped, filled with a white-to-grey gradient (`#f6f8f3` 25% → `#8f938b` 110%, 5.8:1 at the darkest point); the box follows the figure (`width: max-content`), because a gradient clipped to the text paints only inside the box and the last digit of "199 / 199" was cut off; the size cap keeps ≥ 36px before the description at any width. Footer wordmark `calc((100vw - 2 * var(--gutter)) / 4.15)`: it spans the gutters (from v1.5 the word is "Deal Ops", measured at about 3.97 times its size, with slack for a scrollbar; measure again if the word changes), fades from 30% white to transparent and loses about 0.14em to `overflow: hidden` at the bottom; plain 14% white where `background-clip: text` is unsupported. Amounts always `tabular-nums`.

### 3.3 Shape and shadow
- Buttons and nav are pills; buttons 48px high. Hero panels radius 18px with four shadow layers; deck cards radius 24px; clip frames 12px.
- Hero panels are proportional: sides 34 % each, centre 34 % at 33 %, so the centre overlaps each side by 1 % of the width (about 11px), inside its padding. At 1080px and below the panels stack, up to 440px wide.

### 3.4 Motion
| Rule | Detail |
|---|---|
| Two curves | entrances `cubic-bezier(0.22, 1, 0.36, 1)`, hovers `cubic-bezier(0.4, 0, 0.2, 1)` |
| Durations | large entrances 0.9–1.1 s; hovers 0.18–0.24 s; bars 0.9 s |
| Once | entrances, the headline and the clips play once; nothing loops |
| Auto-motion ≤ 5 s | the page has no pause control, so every clip that plays by itself is under 5 s (WCAG 2.2.2) |
| Cheap properties | only transform, opacity and filter; the panel lift uses the separate `translate` property so it never fights the entrance `transform` |
| Reduced motion | everything still; clips give way to their last frame; the deck is a list |

## 4. Components

### 4.1 Navigation
Fixed capsules. The hover pill's position is computed by `site.js` and passed as CSS custom properties (no inline styles). The glass turns dark while a dark section sits under it; the watched band is the nav's own strip in pixels, because Intersection Observer resolves percentage margins against the width. At 760px and below (phones) the nav becomes one bar across the top, nearly opaque, blurred, with a hairline below: the brand on the left, the Menu and "GitHub" on the right, the four links hidden. Nav labels never wrap; with four links the capsules tighten from 761 to 900px (links 10px, brand and button 14px) so they fit at 761px (scanned pixel by pixel from 761 to 1200px). The floating capsules covered the text scrolling under them on a phone.

### 4.2 Hero illustration
- Three product panels drawn in type, not screenshots: crisp at any size and readable at a glance.
- **Every figure is the sample deal's** (test plan §3):
  - Bank statement: A HART £10,000.00 Matched; B OKAFOR £5,000.00 Matched; CHLOE MARTIN £20,000.00, no reference, suggested Chloe Martin with score 0.55, **confirmed by a person** (Review → Confirmed); D KIM £2,000.00 Matched.
  - Closing allocation: Amelia Hart £9,700.00, Ben Okafor £4,850.00, Chloe Martin £19,400.00, David Kim £1,940.00, "and 7 more investors · £100,395.00 invested"; Wire to company £98,895.00.
  - Exit waterfall: £390,000 exit, 20 % carry, 8 % hurdle; "£4,500 exit costs first · 6 years · full catch-up · £385,500 to share"; Return of capital £100,395.00, Preferred return £58,919.25, Lead catch-up £14,729.81, Carry split 80 / 20 £211,455.94; Carry to the lead £57,021.00. The four steps add up to £385,500 = £390,000 − £4,500.
- Bars are to scale against the largest step (£211,455.94 = 100 %): 47.5 %, 27.9 %, 7 %; the split bar is 80 % investors, 20 % lead.
- Default styles are the final state; the entrance animations only lead up to it, so reduced motion shows the finished picture.
- Screen readers: the figcaption states the three steps in one sentence; the animated "Review / Confirmed" labels are hidden and one stable "Confirmed" is given instead.

### 4.3 Three-step deck
- Pinned only when the window is at least 900px wide and 620px tall and motion is allowed (CSS and `site.js` use the same query); otherwise a plain list.
- As the scroll progress p goes from i − 1 to i, card i rises from below the stage and covers the one before; each covered card steps back 14px and 4 % per card above it and lightens a little, so its top edge peeks out. Later cards paint on top, so there is no z-index swap (an early version swapped mid-way and the whole picture cut).
- The card area clips at its bottom edge, so a rising card appears from there; the step labels sit below it and are never covered.
- A card's clip starts once the card is 75 % up, plays once from the start and rests on its last frame; a hidden tab pauses it and it resumes where it was.
- Close-ups are feathered once, on the frame (right edge; the exit close-up on both sides). Feathering the still and the clip separately let the still show through as a ghost.

### 4.4 Other sections
Type only, no cards: large figures under hairlines; centred privacy statement; four columns under hairlines; a full-width glow for the call to action. Content fades in once (blur 12px and 28px down to sharp in 0.9 s).

### 4.5 FAQ
- **Why:** so a visitor can tell quickly whether the tool fits their deal. No articles for now.
- **Content:** 16 questions in four groups (Is it for me? / Your data / Common situations / Trust and status). Each answer is traced to a requirement or a release-notes entry. No test counts here (they live in the trust section only): the only numbers allowed are 3 (the tour), 10 (days), 2.0 (Apache-2.0) and 103 (MT103). "Where does my deal data go?" (`#faq-data`) carries the app's privacy sentence word for word. Every quoted phrase must be, whole, on-screen text in the app (its `.tsx` files, not comments or tests) or a CSV header alias in `src/lib/csv.ts`. `site:check` checks all three; each check was shown to fail on a deliberately broken copy.
- **Structure:** one native `<details class="faq__item" id="faq-…">` per question, its `<summary>` the question and one `<p>` the answer. It opens without the script and with Enter or Space. Wide screens put the group name on the left; 900px and below, one column. The marker turns from `+` to `−`.
- **Links to one question:** an address such as `#faq-import` makes `site.js` open that question, on arrival and on later in-page links; it reads the address only and stores nothing; a malformed address matches nothing and throws no error.
- **No** FAQPage structured data: it needs an inline script (against the CSP), and since August 2023 Google shows FAQ rich results only for well-known government and health sites.

### 4.6 Components added for several pages (v1.5)
- **Page nav (plan 14 R10, replacing the sticky strip below):** on module pages the global nav is not fixed and scrolls away; once it has gone, the page nav (`nav subnav`, the same three glass capsules: logo and module name, the page's sections, the main button) comes down from the top (`subnavShow` in `site.js` adds `is-on`; without the script it stays under the hero). Only one bar shows at a time, and nothing overlaps at the bottom.
- **Logo (R11):** a D with a round counter, inline SVG with `currentColor` and `fill-rule: evenodd`, following the nav's tone; `favicon.svg` is a light D on a dark rounded square.
- **Heroes (R12, R13):** a large title, at most one short line under it, the buttons; what changes lives in the title's grey rotating word (`.rot`; on the overview the grey part comes second, `data-grey="rest"`).
- **(Superseded) Sub-nav `.subnav` (first v1.6):** `position: sticky; top: 72px` (56px on phones), hairlines on the page colour rather than glass; once stuck it turns dark over dark sections (`navTone` in `site.js` measures it where it sticks). On these pages anchors land about 180px down (112px on phones) and the pinned deck stage moves to 136px. On phones the section links scroll sideways and fade at the edge.
- **Three-step hero (`.scene--flow`, v1.6):** three equal panels in a row, top-aligned, not overlapping, joined by arrows (stacked with ↓ at ≤ 1080px); only what a reader takes in at a glance: the email (the impostor letter of the look-alike domain in `<mark>`), "High risk" with three reasons in the review screen's own words, the fixed reply and the call-back checklist. No code names.
- **Module columns (`.modules__grid`) and lifecycle table (`.fits`, v1.6):** two columns on the dark band with a hairline between; a real `<table>` of deal stages with one band per module (peach, sage), stacked on phones.
- **Phone menu:** at ≤ 760px a native `<details>` ("Menu") in the nav bar lists the site's links (the same on every page); it opens and closes without the script, and `site.js` only closes it after a link is followed.
- **Two-panel hero (`.scene--two`):** the overview's two panels, 42% wide each; stacked at ≤ 1080px like the three.
- **Four-card deck (`.deck--4`):** only `--steps` changes to 4; `site.js` counts the cards.
- **Use cases (v1.6):** the hairline grid of How it was built, three columns by two rows (`.built__grid--3`): number, situation, one sentence on what the Inbox does, an "Open in the demo" deep link; each has an `id` and, being reached by links, no entrance (`site:check`).
- **Risk badge `.pill--warn`:** the amber of the hero's "Review" state (dark mode: the existing dark brown with peach text); no new colour.
- **Security:** the privacy section's centred line, then a two-column hairline list (risk / defence).
- **Module list:** the trust figures' type and hairlines, with two text links in the description (light on the dark band).
- **Source line `.source-note`:** the trust note's type on a light section (the UK Finance source under the `/inbox/` problem section).

## 5. Media: close-up clips

### 5.1 Inbox clips (v1.5)
- Recorded from the **local demo mode** of the public Inbox repo at the commit in `inbox.ref` (its README's "Try it": fictional data, recorded model replies, no outbound connections), not from the static snapshot, where no button works. Script: `scripts/inbox-media.mjs light|dark`, same method as below (2×, screencast frames, 640 × 400 close-up, ≤ 5 s, ends on the last frame).
- **Reset the demo before each scheme:** the clips approve a reply, and every `up` resets the demo's database, so run `docker compose ... up -d --force-recreate` first; right after a start Cases are still being processed, and the script waits for the list and the classification.
- Four clips: the Case list (scrolling) · from the email down to the model's category and the fields · E0225's signals to the risk set by the rules · E0001's reply approved, then "Copy text". Scrolling clips use a higher CRF (31–35); the Case list is about 0.3 MB.


- **Only the real app**, on the sample deal Northwind Robotics. `scripts/site-media.mjs` clicks the real buttons, as the end-to-end tests do.
- **Captured at 2×:** the window is 2880 × 1720 and the app is zoomed × 2 with CSS zoom (the same layout as 1440 × 860); frames come from Chrome's screencast and are joined with ffmpeg. Playwright's video and Chrome's screencast both capture CSS pixels, so a device-pixel ratio alone does not give 2×.
- **Framing:** a 640 × 400 region around one action: reconciliation from Summary, allocation from Result, exit from "Carry to the lead" (the totals that change).
- **Length:** each under 5 s (4.2–5.0 s now); no fades; each ends on its real last frame.
- **Format:** MP4 (H.264) only, 0.1–0.2 MB each (VP9 came out about 5 × larger). The still is the last frame: the picture before loading and under reduced motion. Light and dark sets, chosen by `<source media>`.
- **Re-record:** in the Toolkit repository, at the released commit (ideally the one in `toolkit.ref`), run `npm run build && npx vite preview --port 4175`; then in this repository `npx playwright install chromium` (once) and `node scripts/site-media.mjs` (needs ffmpeg). Re-record whenever the app's screens change.

## 6. Technology and files

| File | Role |
|---|---|
| `site/index.html` | The page (no inline styles or scripts) |
| `site/styles.css` | All styles |
| `site-src/site.js` | Readable source of the motion script |
| `site/site.js` | Built by `npm run site:build` (rolldown, pinned in `package.json` so the build is byte-identical); lint skips it |
| `toolkit.ref`, `scripts/fetch-toolkit.mjs` | The public Toolkit commit the checks read the app's sentences, labels and release notes from; `npm run toolkit:fetch` checks it out into `vendor/toolkit` |
| `scripts/site-media.mjs` | Records the clips and stills from the running app (§5) |
| `site/vercel.json` | Security headers: `script-src 'self'`, `media-src 'self'`, otherwise as the app; one rule for the whole site (the demo too, `connect-src 'none'` unchanged); three redirects `/toolkit`, `/inbox`, `/inbox/demo` → with the slash (the demo uses relative paths) |
| `inbox.ref`, `scripts/fetch-inbox.mjs` (`npm run inbox:fetch`) | The public Inbox commit whose release notes, UI text and default categories the checks read, checked out to `vendor/inbox` |
| `site/inbox/demo/`, `inbox-demo.lock`, `scripts/inbox-demo.mjs` | The Inbox demo package: `node scripts/inbox-demo.mjs <tar.gz> <.sha256>` checks the Release asset's hash, its manifest and its commit, unpacks the whole package and writes the lock; no file in it is edited by hand |
| `scripts/inbox-media.mjs` | Records the `/inbox/` clips from the Inbox's local demo (§5.1) |
| `site/media/`, `site/fonts/`, `site/img/grain.svg` | Clips and stills, fonts, grain texture |
| `scripts/check-site.mjs` (`npm run site:check`, also in CI) | One external script and no inline script, style attribute or handler; local files and anchors exist; external links only to the app and the public repository; the privacy and disclaimer sentences match the app word for word; the trust figures are backed by the release notes; `site/site.js` is the current build and ≤ 6 KB gzip; every clip ≤ 5 s; the CSP is complete |
| `scripts/site-preview.mjs` | Serves `site/` with the headers and redirects from `vercel.json`: `node scripts/site-preview.mjs 4181` |
| `scripts/site-shots.mjs` (`node scripts/site-shots.mjs <dir> [base]`, default `http://localhost:4181`) | Screenshots of the four pages at desktop light and dark, 1261 × 657, 375px and reduced motion; page width at 320/375/390/768px; the nav at every width from 761 to 1200px; console and CSP errors |

- The script only adds classes, sets custom properties through the CSSOM, plays the clips, opens an FAQ question a link points at, closes the phone menu after a link, and on `/` moves old Toolkit links on to `/toolkit/`; every page is complete without it. Limit: ≤ 6 KB as served (gzip); about 2 KB now.
- Page weight: about 1 MB for one theme (clips, stills, fonts).
- **No sideways scroll on phones:** `overflow-x: clip` on both `html` and `body`. The glows are 100vw wide; on `body` alone the setting passes to the viewport and phone browsers widen the layout to 1.5 ×.

## 7. Accessibility
- Focus rings: ink on light surfaces, light on the dark band, cards and footer (≥ 3:1).
- Skip link; every section has a heading (labels are h2).
- Auto-motion ≤ 5 s and once; reduced motion is fully still.
- Animated text states are hidden from screen readers, with one stable text instead.
- The FAQ uses native `<details>/<summary>` with their roles untouched, so screen readers announce the open state.

## 8. Change checklist
1. **Copy and figures (P9):** check against the Toolkit's `docs/RELEASE_NOTES.md` and test plan §3; after a release, update the trust figures and the "Figures from …" line. Check each FAQ answer against its source; when the app's features or wording change, update the FAQ.
2. **App screens changed:** re-record the close-ups (§5); check the framing and ≤ 5 s.
3. **Automatic checks:** `npm run toolkit:fetch && npm run inbox:fetch && npm run site:check`. From v1.5 it also checks every page's references and cross-page anchors, the shared footer, that each `/inbox/` figure is in the Inbox release notes, that quoted words are Inbox UI text, template text or demo data, the test-scope sentences, the category table against the default configuration, a demo link per use case, the demo package against its lock byte for byte, `.example`-only addresses in the snapshot, the old anchors and the redirects. **New Inbox release:** update `inbox.ref`, replace the package with `scripts/inbox-demo.mjs`, check figures and copy, re-record the clips if the screens changed (§5.1).
4. **Screenshots:** `scripts/site-shots.mjs` with no errors; on a phone profile at 320, 375, 390 and 768px the page width equals the window; from 1081 to 1920px the hero panels stay clear of each other.
5. **Anchors:** each of the four nav links lands about 140px below the top; an address such as `#faq-import` opens that question below the nav.
6. **Lint and format:** `npm run lint`; prettier only on changed files, `--single-quote --no-semi --print-width 160`.
7. **Script:** `npm run site:build`, ≤ 6 KB gzip.
8. **Review:** self-test, then cross-review. Judge every finding first — is it true, is it worth it, is there a better fix — and record accept, reject or a different fix, with the reason.
9. **Update this handbook** and add a line to §9.

## 9. Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-11-03 | Upgrade the static Inbox demo to v0.1.1, pin its public commit and package, and update version and release/download links. Keep E0225 and the risk wording; explicitly retain the v0.1.0 evaluation with no new held-out measurement. | Published package and tag verified. Existing product clips remain the accepted v0.1.0 recordings; this update replaces the static demo only. |
| 2026-10-29 | A separate static site in `site/`, its own hosting project, English only | Keeps the app and its gates untouched |
| 2026-10-29 | One small hand-written script, no framework | Pure CSS can only tie motion to the scroll bar; "play once on entering the view" needs a few lines of script |
| 2026-10-29 | Open hero and a dark full-width band; at most one rounded container per screen | The first sample read as cards stacked on cards; of three layout options the owner chose this one |
| 2026-10-29 | The hero illustration is drawn in type, not a screenshot | A shrunken screenshot was dense and unreadable; the owner asked for a designed image |
| 2026-10-29 | No page-wide pause control; every auto-motion ≤ 5 s instead | The owner found the control superfluous. Remaining: the headline changes three times over 13.5 s, then stops |
| 2026-10-29 | No bare large headings; small labels; 120px bands | The owner's direction; a review also found the 180px band heavy |
| 2026-10-29 | All three nav links kept, and their sections built | Removing links to sections not yet built was the wrong fix |
| 2026-10-29 | The script limit counts the size as served (gzip) | Owner's choice |
| 2026-10-29 | Proportional hero panels rather than a higher stacking breakpoint | A review suggested stacking up to 1216px; that would turn small laptops into one narrow column |
| 2026-10-30 | FAQ section: 16 questions in four groups after "How it was built", a fourth nav link; native disclosure; a link to one question opens it; no articles, no structured data | Owner's decision, every answer approved. A new section describing money rules, so it also had one cross-review round on factual accuracy |
| 2026-10-30 | Trust figures filled with a white-to-grey gradient; footer wordmark moved to the bottom, near full width, fading and cut off; light and dark sections meet at a hard edge (120px bands removed, 96px top space on the dark section); no grain on the dark sections | Owner's decision. A gradient between dark and light passes through a muddy grey; grain on the dark sections was barely visible and risked dropped frames while the deck is pinned |
| 2026-11-02 | The site moves to its own repository; the hosting project deploys from the public site repository (same project and address); every live file unchanged, checked byte for byte | One site for every module, not tied to one module's repository |
| 2026-11-03 | Second round: one bar at a time on module pages (the page nav appears once the global nav has scrolled away); a logo (a D with a round counter); rotating grey words in the overview and Inbox titles; one short line under every hero title | Two stacked bars looked odd and overlapped at the bottom; the hero copy should say what changes in the title, not in paragraphs |
| 2026-11-03 | Whole-site revision: one global nav and a module sub-nav; a fuller overview (module columns, where it fits, built to be checked) without a standalone regulated-service statement (footer and FAQ only); the Inbox hero as a three-step flow; use cases as a grid; fewer Inbox sections and 14 FAQ questions; one claim per section | The navigation changed between pages, the overview was too thin, and the pages repeated themselves; the aim is simple, efficient and clearly professional |
| 2026-11-03 | Several pages, released on the same day as Deal Ops Inbox: the home page becomes the Deal Ops overview, the Toolkit page moves to `/toolkit/` unchanged, and `/inbox/` and `/inbox/demo/` are added; the demo is the Inbox's own published static package (the site only serves the files and locks their hashes); the site-wide CSP is unchanged | One site for every module, each with a page built on the same template; the demo is the real interface, so the site does not keep a second copy of its display rules |
| 2026-11-03 | Release steps follow the Toolkit's rules v0.7.5: publish `main` and check it, then fast-forward `release`; acceptance on a local preview | Same process as the Toolkit |

## 10. Lessons
1. Judge review findings before changing anything.
2. Swapping z-index mid-transition cuts the picture; let later cards paint on top.
3. Dimming dark cards with the light page colour makes them look like grey plastic; on a dark band, lighten covered cards slightly.
4. Playwright and Chrome capture 1 × pixels; for 2 ×, double the window and zoom the app.
5. Feathering two stacked layers separately makes a ghost; feather the frame once.
6. 100vw decorations can widen a phone layout; clip on `html` too, and measure `scrollWidth`, not just one screenshot.
7. Intersection Observer's percentage margins resolve against the width; use pixels.
8. Mid widths escape screenshots: 1081–1200px once had overlapping panels, and with a fourth nav link the nav wrapped at 761–785px while the 800px screenshot looked fine. Scan nav changes pixel by pixel from 761 to 1200px.
9. Desktop spacing does not carry over to phones: gaps became empty screens; phones use about half. Floating capsules cover content on a phone; use a bar.
10. An illustration must add up and must not mislead: the missing £4,500 of exit costs, and a confirmation that looked automatic, both weakened it.
11. Nothing at the very bottom of the page may use the scroll-in entrance: its trigger line sits "12%" above the bottom of the window, and that percentage resolves against the window **width** (item 7), about 170px on a desktop; the footer wordmark never reaches it, so it would stay invisible. Show such elements as they are.
12. Content reached by a link must not use the entrance: it starts 28px low, the browser scrolls to that position, then the content rises 28px and on a phone slips under the nav bar (an FAQ question link, 2026-10-30). The FAQ has no entrance.

13. A deliberately broken copy that changes one place can miss a check that only asks for the text once. The test-scope and privacy sentences appear twice; changing one still passed (three misses in the first round, 2026-11-03). For every word-for-word sentence, check each place, or the place it belongs.
14. Playwright will not click a button with `aria-disabled`; to test "a click shows the reason", focus it and press Enter, which is also how a screen-reader user does it.
15. Another old preview server may hold port 4180 (on 2026-11-03 one started on 10-30 from the Toolkit repo, serving files that had moved: every page a 404). `curl` it before screenshots; from v1.5 the default is 4181.

## 11. Deployment
- Own repository since 2026-11-02 (it used to live in the Toolkit repository). Hosting project `deal-ops-toolkit-site` deploys from the public repository `deal-ops/deal-ops-site`: root directory `site`, no build, production branch `release` (production only from `release`).
- `npm run site:check` reads the app's sentences, labels, CSV header aliases and release notes from the public Toolkit repository at the commit in `toolkit.ref` (`npm run toolkit:fetch`); after each Toolkit release, update `toolkit.ref` to the new public commit.
- Changes are made in a development repository, which has no hosting previews. They are accepted on a local preview (`node scripts/site-preview.mjs`, served with the production headers). A hosted preview is used only from a separate preview branch of this repository (never `main` or `release`), with the owner's OK first.
- Release: run the full §8 checklist, `npm run site:check` and screenshots on the development `main`, and have the owner check a local preview of it. Then publish it here as one commit on `main`. Its `site` tree must equal the development `main`'s, and CI must pass. Only then is `release` fast-forwarded to the same commit (no force push), and the live headers and files are checked.
- Roll back by pointing production at the previous deployment, or by committing a revert and publishing it the same way.

## 12. Not done yet
- Nothing. The owner checked the site on an iPhone; the two problems he found (the nav covering text, oversized phone gaps) are fixed.
