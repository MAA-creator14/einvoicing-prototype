# Tide Design System

A thin visual design system for **Tide**, the UK business‑banking and admin
platform for small businesses. This system intentionally focuses on the few
things that make a Tide screen feel like Tide:

- The exact two‑blue + lavender‑grey palette
- A rounded humanist sans for body, a tighter bold for numerals
- White cards on lavender, deep‑blue hero card with chevron "swell"
- Pill buttons, large‑radius form fields
- The geometric, primary‑colour empty‑state illustration style

It is **not** a full token system; only what's needed to make new Tide screens
sit credibly next to existing ones.

---

## Sources

The system was reverse‑engineered from:

- **Live site** — https://www.tide.co/ (marketing site + footer logos/strings)
- **About page** — https://www.tide.co/about/ (mission, voice)
- **Wikipedia entry** — https://en.wikipedia.org/wiki/Tide_(financial_service)
- **Tide brand CDN** — https://web-assets.tide.co/assets/images/logo/
  (Tide\_Logo\_Blue\_RGB.svg, Tide\_Logo\_White\_RGB.svg, tide-dwyl.svg —
  copied into `assets/`)
- **App screenshots provided by the user**, stored in `assets/screens/`:
  - `app-home.png` — Payments tab with Tide Current Account balance card
  - `app-admin-invoicing.png` — Admin → Invoicing tab
  - `app-add-item.png` — Add invoice line item form
  - `app-add-customer-empty.png` — Empty state with cursor‑on‑document illustration

No codebase or Figma was attached. Component shapes were rebuilt from the
screenshots above plus the marketing site.

---

## Product context

Tide is a UK fintech (founded 2015, London) providing a **mobile‑first
business‑banking + business‑admin platform** for sole traders, freelancers and
limited companies. Tide is regulated by the FCA but is **not itself a bank** —
deposit accounts are powered by ClearBank. Its proposition is "do less
admin": one app for business current account, invoicing, expense cards,
accounting, payroll, loans, and company formation.

The brand promise is **"Do what you love"** — the strapline shown next to the
logo in the footer (`tide-dwyl.svg`).

Two surfaces are in scope here:

1. **Tide app** — iOS/Android banking + admin app. Main bottom nav: Home,
   Payments, Sales, Admin, Finance. (Screenshots all come from here.)
2. **tide.co marketing site** — top‑funnel for opening an account and
   discovering products.

---

## File index (project root)

| Path | What it is |
|------|------------|
| `README.md` | This file — context, voice, visual rules, iconography |
| `SKILL.md` | Cross‑compatible Agent Skill entry point |
| `colors_and_type.css` | All CSS variables + semantic type classes |
| `assets/` | Logos (SVG) and reference screenshots |
| `assets/screens/` | The four product screenshots used as ground truth |
| `preview/` | Small HTML cards that populate the Design System tab |
| `ui_kits/tide-app/` | React components + interactive prototype of the app |
| `ui_kits/tide-web/` | React components + a marketing‑site hero page |

---

## CONTENT FUNDAMENTALS

Tide's voice is **plain, warm, founder‑to‑founder.** It sounds like a busy
small‑business owner explaining things to another, not like a bank.

**Pronouns.** Always **"you/your"** for the customer. **"We"** for Tide.
The company calls customers **"members"** in long‑form copy. Never "user."

**Casing.** **Sentence case everywhere** — buttons, nav, headings, screen
titles. Title Case only appears in legal/proper nouns (e.g. "Tide Current
Account", "Financial Services Compensation Scheme"). The app uses sentence
case for tab labels too (`Home`, `Payments`, `Admin`).

**Contractions.** Yes — *you're, we've, it's, can't, won't, that's.* Adds
warmth.

**Sentence shape.** Short. Declarative. Lead with the benefit. Examples
straight from the marketing site:

> "Apply in minutes and unlock a suite of finance management tools to help
> you run your business better."
>
> "Make and receive payments faster using our payment tools."
>
> "Stay compliant for free."
>
> "Once I'd filled in the application online, the account was active in
> about an hour. I can't stress how easy Tide is to use." *(Member quote)*

**Tagline ladder.**

- Brand strapline — **"Do what you love."**
- Product trademark — **"Do Less Banking."**
- Hero header — **"One account for all things business."**
- Subhead — **"Everything your business needs, in one powerful business
  account."**

**Numbers and money.** GBP symbol always before, no space (`£2,954.01`).
Decimals always shown, even on whole pounds (`£0.00`, not `£0`). Foreign
currencies on a second line below the GBP value (see Cursor row in the
home screenshot: `£18.03 / $24.00`). Thousands separators are commas.

**CTAs.** Verbs first, plain. *Open an account · Log in · Get £100 ·
Create an invoice · Add customer · Confirm · Learn more · Upgrade.*
Never "Click here", "Submit", or marketing fluff like "Get started today!".

**Empty‑state copy.** Reads like a hint, not an apology. From the
Add‑customer screen: *"Add or import a customer to see them here."*
The CTAs below are paired so the user always has a way forward
(`Import contact` secondary · `Add customer` primary).

**Punctuation & emoji.**
- Hyphen between word and modifier (`MTD‑ready`, `HMRC‑recognised`).
- En‑dashes for ranges (`£1,000 to £20 million`).
- **Emoji is essentially absent** from product UI. One exception observed:
  a small **🌐 globe** glyph paired with banner headlines ("Smart invoicing
  = Business growth! 🌐"). Treat emoji as a rare flourish on cross‑sell
  cards only — never in core flows, navigation, or button labels.
- Single‑apostrophe quotes around member names in copy. Standard `"…"` for
  pull‑quotes.

**Disclosures.** Always close‑voice, never small‑print‑ese: *"FSCS‑Protected
Bank Account by ClearBank"*, *"Tide is not a bank."*

---

## VISUAL FOUNDATIONS

### Colour

A very small, **deliberately limited palette**. The whole product is built
from three blues, lavender‑grey, and ink:

| Token | Hex | Where it goes |
|------|-----|---------------|
| `--ds-blue-deep` | `#00224F` | Hero balance card background, premium surfaces |
| `--ds-blue-deep-2` | `#001A3D` | Darker step inside the "swell" chevron gradient |
| `--ds-blue` | `#2B59FF` | All primary actions, links, focus, brand accents |
| `--ds-blue-logo` | `#4050FB` | Slightly violet blue used inside the Tide logo glyph |
| `--ds-blue-soft` | `#D6E0FF` | Tint backgrounds for callout banners, info pills |
| `--ds-bg` | `#F0F2F8` | Canvas behind every screen — never pure white |
| `--ds-surface` | `#FFFFFF` | Cards on top of the canvas |
| `--ds-ink` | `#0B1B3B` | Primary text |
| `--ds-mint` | `#5BC8B0` | Aqua disc used in the invoice illustration; charts only |

Semantic states (`success`, `warning`, `danger`) exist but appear sparingly —
banking tone is calm, so error reds and warning ambers are pulled back from
neon. No purples, no pinks, no greens outside of mint accent.

### Type

**GT Walsheim** is the production face (licensed). We substitute
**Mulish** from Google Fonts — same friendly geometric‑humanist character,
soft terminals, similar x‑height. Flag this swap when handing back to
production: `ASK: drop GT Walsheim woff2s in fonts/ and swap --ds-font-sans.`

- Headlines and numerals lean **800** (`bold`). The hero balance
  `£2,954.01` is set extra‑heavy.
- Body is **400**, secondary copy is **400** in `--ds-ink-2`.
- Letter‑spacing tightens (`-0.02em`) at display sizes; no tracking on
  body.
- No italics in UI. No all‑caps except very small overlines.

### Background & surface

- The default canvas is **lavender‑grey `#F0F2F8`** — *not* pure white.
  This is the single biggest tell that a screen is Tide.
- Cards sit on the canvas as **pure‑white** rectangles with **`20px`
  radius** and **almost no shadow** (a hairline at most). Tide's elevation
  language is "step up via lightness, not depth."
- Section dividers inside cards are **dashed `1px` lines** in
  `--ds-divider` — see the Sub‑total / Total separator in the Add‑item
  screenshot.
- The **deep‑blue hero card** (current account) is the one place the
  system uses imagery: an SVG "**swell**" of overlapping chevrons in three
  shades of deep navy, slanting bottom‑right to top‑right. This is the
  trademarked **Swell** motif (per Tide's footer legal text). It is
  reserved for the primary account card and a few hero treatments.

### Borders & corners

- **Pill (`999px`)** — buttons, badges, segmented controls, account chips.
- **`20px`** — large cards, the balance card, illustrations container.
- **`14px`** — form fields, inline cards on white, transaction icons.
- **`10px` and below** — only inside compact components (chips, icons).
- Borders are rare; when they exist they're **`1px` `--ds-divider`**.
  Outline buttons use the brand blue at `1px`.

### Buttons

- **Primary** — solid `--ds-blue` background, white text, **pill**, weight
  700, ~52px tall on mobile. Pressed: drops to `--ds-blue-press`.
- **Secondary** — white background, `1px` blue border, blue text,
  pill, same height as primary. (See "Import contact" / "All accounts".)
- **Tertiary / text** — blue text only, no chrome, slight underline on hover.
- **Disabled** — replace blue with `#C4CBDB` solid background, keep white
  text. (See "Confirm" disabled in Add‑item.)
- Icons inside buttons sit to the left of the label with `8px` gap.

### Form fields

- **White, fully‑rounded `14px`, no border**, sitting directly on
  `--ds-bg` lavender. The contrast against the canvas *is* the border.
- **Label above**, weight 600, ink colour. Tiny `- optional` suffix in the
  label, never in placeholder.
- Inputs are tall (~56px) with `16px` body text and an `--ds-ink-4`
  placeholder. Cursors are blue.
- Dropdowns use a small blue caret on the right.
- No floating labels.

### Quick‑action circles

A signature element on the app home tab: a row of **solid‑blue circular
icon buttons** (`--ds-blue`) with the action label *below* in ink. Icons
are stroke‑style white glyphs. Hit target is the whole tile.

### Tabs / nav

- **Top tabs** (Admin) — sentence‑case labels, ink colour, active tab in
  blue with a **`3px` rounded blue underline** flush to the baseline.
- **Bottom tab bar** — icons + sentence‑case label, active tab is blue
  (both icon and label), inactive is ink‑3. The active icon is filled,
  inactive is stroke.

### Imagery & illustration

There are two parallel styles:

1. **Photography** (marketing site) — natural light, warm UK‑indoor tones,
   real small‑business owners (per the "Founders Make Some Noise" campaign).
   Not on the app.
2. **Geometric flat illustrations** (app empty states + cross‑sells) — a
   tightly limited palette of `--ds-blue-logo`, `--ds-blue-deep`,
   `--ds-mint`, plus warm greys. Shapes are **simple, axis‑aligned
   rectangles + one circle + one cursor/arrow**, very rare strokes. No
   gradients. No shadows. No hand‑drawn feel. See the cursor‑on‑document
   illustration in the Add‑customer empty state. Rebuilds live in
   `ui_kits/tide-app/EmptyStateIllustration.jsx`.

No 3D, no isometric, no photo‑mocked phones.

### Motion

- Sparse and quick. Buttons fade press state in **120ms**. Sheets and
  modals slide up in **220ms** with `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- No bouncy springs in core flows — banking tone.
- Skeletons fade pulse for loading; no spinners on full screens.
- Page transitions on the app are simple cross‑fades.

### Hover & press

(Web only — the app handles press server‑side via the OS.)

- Primary button hover: background `--ds-blue-press`.
- Secondary button hover: background `--ds-blue-softer`.
- Card hover (clickable cards): translate up `1px`, shadow stays the same.
- Link hover: underline (text colour unchanged).
- Press: scale `0.98` for tap targets on mobile only.

### Layout rules

- Mobile screens have a fixed **header** (back arrow + screen title,
  white background) and a fixed **bottom tab bar** (white). The canvas
  between is `--ds-bg`.
- Padding: `20px` horizontal margins, `16px` between cards.
- The **"Get £100" CTA pill** in the app header is the *only* outline
  button that lives in a top‑bar — branded acquisition slot.
- The **avatar + Upgrade pill** sit top‑left of the home screen; the
  search and chat icons sit top‑right. Chat carries a red notification
  dot when unread (numeric).

### Transparency / blur

Tide barely uses transparency. The only observed use is the soft
**`--ds-blue-soft`** callout banner under transactions ("You paid £0.50 in
FX fees…"), which is a tinted fill, not a translucent layer. No glass
morphism, no frosted blur. Sheets are opaque white.

---

## ICONOGRAPHY

Tide's icon language is **monoline, rounded, two‑pixel stroke**, optical
size ~24px. Strokes are blue or ink. **There is no observable proprietary
icon font** — icons appear to be hand‑crafted SVGs that share a stroke‑and‑radius
spec.

**Substitution.** We did not have access to Tide's source SVGs. For
mock‑ups we link **[Lucide](https://lucide.dev)** via CDN — same stroke
weight, same rounded line caps, same optical size. This is the closest
free match. Flag the substitution to design when handing back.

In code:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="arrow-up" style="color: var(--ds-blue)"></i>
```

Mappings observed:

| App element | Lucide name |
|------|------|
| Send | `arrow-up` |
| Get paid | `arrow-down` |
| Card reader | `tablet-smartphone` |
| Cards | `credit-card` |
| Search | `search` |
| Chat / support | `message-square-dots` |
| Home tab | `house` |
| Payments tab | `wallet` |
| Sales tab | `shopping-bag` |
| Admin tab | `folder` |
| Finance tab | `sprout` |

**Emoji.** Effectively never used in the app. Marketing copy uses a 🌐
globe glyph once on cross‑sell cards. Treat emoji as a brand exception.

**Unicode currency.** `£` is a regular text character — never replaced by
an icon glyph. The currency *symbol* IS the icon.

**Logo lockups.** Two are shipped:

- `assets/Tide_Logo_Blue_RGB.svg` — primary, on light surfaces.
- `assets/Tide_Logo_White_RGB.svg` — on the deep blue card and dark
  backgrounds.
- `assets/tide-dwyl.svg` — "Do what you love" footer lockup.

The wordmark is a custom geometric letterform (not Mulish/GT Walsheim).
Don't try to recreate it in CSS — always use the SVG.

---

## CAVEATS

- **Font substitution.** Mulish stands in for GT Walsheim. Numerals will
  read a touch narrower than production. Drop the licensed font in
  `fonts/` and update `--ds-font-sans` to swap.
- **Icons.** Lucide stands in for Tide's bespoke set. The stroke weight
  matches; specific glyph shapes will differ.
- **Illustrations.** The empty‑state illustration is a faithful rebuild
  from the Add‑customer screenshot, but Tide's full illustration library
  was not provided.
- **No codebase / Figma.** All components were rebuilt from the four
  screenshots + marketing site. Production HTML/CSS will differ.

---

See `SKILL.md` for the Agent Skill front‑matter entry point.
