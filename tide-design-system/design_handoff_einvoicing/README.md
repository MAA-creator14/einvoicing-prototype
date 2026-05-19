# Handoff: E-invoicing for Tide invoicing

A 3-screen mobile feature that adds e-invoicing (Peppol-network delivery) to Tide's existing **Create invoice** flow without exposing any of the underlying compliance jargon to the user. Tide registers the user with the access-point partner in the background using business details Tide already holds.

> **Strict copy rule** — the words *Peppol, XML, UBL, EN 16931, access point, scheme ID* must never appear in user-facing copy. The user thinks about "sending the invoice straight into my client's accounting system," not about networks or schemas.

---

## About the design files

The files in this bundle are **design references created in HTML/React** — interactive prototypes that show the intended look, copy, and behaviour. They are **not** production code to lift wholesale.

**Your task:** recreate these designs inside Tide's existing mobile app (React Native, Swift, Kotlin — whatever the live app uses), reusing Tide's established components, tokens and patterns. Use this bundle for **visual + behavioural specification**, not as a starting codebase.

If the target codebase has its own `Toggle`, `Card`, `PrimaryButton`, `Callout`, `Timeline` etc., use those instead of recreating ours. The Tide design system tokens (colours, type, radii, spacing) listed below should already exist in the codebase — map onto them rather than hard-coding the hex values from our CSS file.

## Fidelity

**High-fidelity.** Final colours, typography, spacing, radii, copy, and interaction states are all production-ready. Pixel-perfect recreation expected. Animations and microcopy are specified — don't paraphrase the copy without sign-off.

---

## Feature context

Tide is a UK SME business-banking app. The existing invoicing feature generates web invoices sent by email with a payment link. This feature adds structured e-invoicing as an **opt-in delivery method**, alongside the existing email/web flow — never replacing it.

### User-facing concept

> "Send as e-invoice" = the invoice lands directly in the client's accounting software.

### Registration states (drives Screen 1 logic)

| State | Meaning |
|---|---|
| **A — Not registered** | User has never enabled e-invoicing. No e-invoicing identifier exists. |
| **B — Pending** | User has tapped "Set up e-invoicing". Background registration with the access-point partner is in flight, may take minutes. |
| **C — Registered** | Registration complete. Identifier is held by Tide; user never sees it. |

Screen 2 is the transition **A → B**. Screen 3 assumes **C**.

---

## Screens

### Screen 1 — Create invoice (with new e-invoice section)

**Purpose:** extend the existing Create invoice form with a new **Delivery** section containing the "Send as e-invoice" toggle and an action bar that adapts to the user's registration state.

> **Important:** do not redesign the rest of the Create invoice form. The Customer selector, Items list, Total card, and screen chrome remain whatever Tide's live form uses. This handoff only specifies the **Delivery section + bottom action bar**.

#### Layout (top → bottom inside the existing form)

1. (Existing) Customer selector
2. **(NEW) Delivery section** — `--ds-space-5` (20px) margin-bottom
3. (Existing) Items list + Add item row
4. (Existing) Total card
5. **(MODIFIED) Sticky bottom action bar** — adapts to state

#### Delivery section — markup

A standard Tide white card (`--ds-radius-lg` / 20px, on `--ds-bg` canvas) preceded by an overline label `DELIVERY`.

Inside the card, padded `16px 18px`:

| Element | Spec |
|---|---|
| Title | "Send as e-invoice" — `--ds-fw-semibold` / 16px / `--ds-ink` |
| Subtitle | "Delivers straight into your client's accounting software" — 13px / `--ds-ink-3` / line-height 1.4 |
| Toggle | Right-aligned. 50×30px pill, knob 24px. ON = `--ds-blue`; OFF = `#C4CBDB`. 160ms cubic-bezier(0.22,0.61,0.36,1) transition on both bg and knob translate. |

Below the toggle row, when toggle is **ON**, render one of three inline messages keyed off registration state:

##### Inline state — State C (Registered)

- Background `var(--ds-success-bg)`, text `var(--ds-success)`, radius 12px, padding `10px 12px`, margin-top 14px
- Leading checkmark icon (Lucide `check`, 18px, stroke 2.6)
- Copy: **"Your client will receive this directly in their accounting system"** — 13px / `--ds-fw-semibold` / line-height 1.4

##### Inline state — State A (Not registered)

- Background `--ds-blue-soft`, text `--ds-blue-deep`, radius 12px, padding `12px 14px`, margin-top 14px
- Leading filled blue info circle (18px)
- Line 1: **"Set up e-invoicing first — takes 30 seconds."**
- Line 2 (margin-top 6px, flex row, gap 14px): two underlined link CTAs, both `--ds-blue` / `--ds-fw-bold`:
  - **"Set up now"** → navigates to Screen 2
  - **"Send the usual way"** → flips toggle OFF (no navigation)

##### Inline state — State B (Pending)

- Background `var(--ds-warning-bg)`, text `var(--ds-warning)`, radius 12px, padding `12px 14px`, margin-top 14px
- Leading clock icon (Lucide `clock`, 16px, stroke 2.6)
- Line 1: **"We're still setting up your e-invoicing — usually ready in a few minutes."**
- Line 2 (margin-top 6px): single underlined link **"Send the usual way"** (same `--ds-warning` colour as surrounding text) → flips toggle OFF

##### Toggle OFF

No inline message at all. The Delivery card collapses back to just the toggle row.

#### Bottom action bar — three configurations

Sticky at the bottom of the screen. Background `--ds-surface`, top border `1px solid --ds-divider`, padding `12px 16px 14px`.

`cannotSend = einvoiceToggleOn && userState ≠ 'C'`

##### When `cannotSend === false`

Single full-width primary pill button: **"Send invoice"** — `--ds-blue` bg, `#fff` text, `--ds-fw-bold` 16px, padding `17px 24px`, border-radius 999.

##### When `cannotSend === true` and `userState === 'A'`

Stacked vertically with 10px gap:

1. **Inline callout strip** (12px margin-bottom): bg `--ds-blue-softer`, text `--ds-blue-deep`, radius 12px, padding `10px 12px`. Leading 16px alert-circle (stroke 2.6). Copy: **"To send as an e-invoice you'll need to set up e-invoicing first. Or send this one the usual way and set up later."**
2. **Primary pill** — **"Set up e-invoicing — 30 seconds"** → navigates to Screen 2
3. **Secondary outline pill** — **"Send the usual way"** — `#fff` bg, `1px solid --ds-blue` border, `--ds-blue` text, padding `15px 24px`, radius 999 → flips toggle OFF (the next render passes `cannotSend === false`, revealing the standard Send button)

##### When `cannotSend === true` and `userState === 'B'`

1. **Inline callout strip** (same shape as above but amber): bg `var(--ds-warning-bg)`, text `var(--ds-warning)`. Leading clock icon. Copy: **"Your e-invoicing isn't quite ready yet. Send this one the usual way for now — we'll let you know when it's ready."**
2. **Secondary outline pill** — **"Send the usual way"** (no primary "set up" button here — setup is already in progress)

---

### Screen 2 — Set up e-invoicing (nudge + async holding state)

**Purpose:** single-screen onboarding. Entered from the State A inline link on Screen 1 or from an entry point in the invoice list. Two phases on the same screen — **idle** and **loading**. No wizard, no multi-step indicator.

#### Layout

Vertical column, full-bleed on `--ds-bg`:

1. Screen header — close (×) icon top-left, no title text. Standard `--ds-surface` header bar, padding `6px 16px 12px`.
2. Illustration block — centred, 220×170 SVG, padding `20px 0 28px`
3. Headline — `--ds-fw-bold` 28px / line-height 1.15 / letter-spacing -0.015em / `--ds-ink`
4. Body paragraph — 16px / `--ds-ink-2` / line-height 1.5
5. Reassurance card (white `--ds-surface`, 18px radius, padding `14px 16px`) with two checkmark bullets
6. Spacer (margin-bottom: auto pushes CTAs to the bottom)
7. CTA stack (padding `20px 0 8px`, gap 12px)
8. Reassurance line below CTAs (idle phase only)

Horizontal padding on the screen body is 24px (slightly tighter than Screen 1 because this is a comms screen, not a form).

#### Copy

| Slot | Copy |
|---|---|
| Headline | "Get paid faster with e-invoicing" |
| Body | "Your invoices land directly in your clients' accounting software — no chasing, no manual entry on their end. We'll set this up using your business details. Nothing else needed from you." |
| Bullet 1 | "Uses the business details Tide already has — no forms to fill" |
| Bullet 2 | "Works alongside your usual email invoices" |
| Primary CTA (idle) | "Set up e-invoicing" |
| Secondary (idle) | "Not now" — ghost-style, `--ds-blue` text, no chrome |
| Sub-CTA reassurance (idle) | "Usually ready in a few minutes" — 13px / `--ds-ink-3` / centred / 4px below the Not-now button |

#### Loading phase (after primary tap)

The same screen — only the CTA area changes. Do not change layout, headline, body, illustration or bullets.

- Primary button stays in place, disabled, still `--ds-blue`. Content swaps to:
  - 18px spinner (continuously rotating, 0.9s linear) — white circle with a 90° arc, stroke 3
  - Label: **"Setting up your e-invoicing…"**
  - A 3px indeterminate progress bar sits flush along the bottom edge of the button — `rgba(255,255,255,0.18)` track with a 40%-wide `rgba(255,255,255,0.9)` indicator that translates from -100% to 350% over 1.4s cubic-bezier(0.4,0,0.2,1) infinite
- The "Not now" secondary is replaced with muted permission-to-leave microcopy — **"You can leave this screen — we'll let you know when it's ready"** — 14px / `--ds-ink-3` / `--ds-fw-medium`, centred
- The "Usually ready in a few minutes" line is removed

When the background registration completes the user should be returned to wherever they came from (typically Screen 1), and registration state should be **C**.

---

### Screen 3 — Invoice sent + delivery status trail

**Purpose:** replace the standard "Invoice sent" confirmation when e-invoicing was used. Two sections: confirmation hero on top, delivery timeline below.

#### Section A — confirmation hero

Centred column, padding `14px 16px 22px`.

1. **Success badge** — 76px circle, bg `var(--ds-success-bg)`, centred 38px tick (stroke 3, `var(--ds-success)`). Outer 2px ring at `inset: -6px` with 18% opacity for subtle expansion.
2. Headline (margin-top 18px): **"Invoice sent"** — `--ds-fw-bold` 26px / `--ds-ink` / letter-spacing -0.015em
3. Subtext (margin-top 8px, max-width 280px, centred): **"Delivered to *Acme Studios*' accounting system"** — 15px / `--ds-ink-2` / client name in `--ds-fw-bold` `--ds-ink`
4. Reference pill (margin-top 14px): white pill, padding `6px 12px`, radius 999, `--ds-fw-bold` 13px tabular-nums — **"£1,960.00 · INV-2026-041"**

#### Section B — delivery status timeline

White card, padding `6px 0`. Title row: **"Delivery status"** — `--ds-fw-bold` 16px / `--ds-ink` / padding `16px 18px 8px`.

The timeline lives inside the same card, padding `4px 18px 16px`. Three rows, vertical, connected by a 2px line in the dot column.

| # | Dot | Title | Meta | Optional tag |
|---|---|---|---|---|
| 1 | **Complete** — 24px solid `var(--ds-success)` circle with 14px white tick (stroke 3.5) | "Sent" — 15px `--ds-fw-semibold` `--ds-ink` | "Today, 09:41" — 13px `--ds-ink-3` | — |
| 2 | **Active** — 20px ring (2px solid `--ds-blue`) on white bg, 10px solid blue centre dot. Wrapped in an animated pulse halo (see below). | "Delivered to *Acme Studios*' accounting system" | "Usually instant" | — |
| 3 | **Pending (optional)** — 20px circle, **2px dashed `--ds-ink-4` border**, white fill. No tick. | "Acknowledged by *Acme Studios*" — `--ds-ink-3` (muted) | "Optional — not needed for payment" | Small uppercase pill: **"OPTIONAL"** — 11px `--ds-fw-bold` `--ds-ink-3`, bg `--ds-bg`, padding `2px 8px`, radius 999, letter-spacing 0.04em |

**Timeline connector line** — 2px wide, in the dot column:
- Between Step 1 and Step 2 (the complete-to-active stretch): solid `var(--ds-success)`
- Between Step 2 and Step 3: dashed (`repeating-linear-gradient(180deg, --ds-divider 0 4px, transparent 4px 8px)`) — signals "not guaranteed to fill"

**Pulse halo on Step 2:**

```css
@keyframes tidePulse {
  0%   { transform: scale(0.85); opacity: 0.5; }
  70%  { transform: scale(1.6);  opacity: 0;   }
  100% { transform: scale(1.6);  opacity: 0;   }
}
```

Applied to an absolute-positioned `--ds-blue` disc at `inset: -2px` on the dot, 1.6s ease-out infinite.

#### Bottom action bar

Sticky, `--ds-surface` bg, top border `1px solid --ds-divider`, padding `10px 16px 14px`, two buttons stacked with 10px gap:

1. **Primary** — "Back to invoices" — `--ds-blue` pill, full-width, padding `17px 24px`
2. **Secondary outline** — "View invoice details" — `1px solid --ds-blue`, padding `12px 24px`, blue text on white

---

### ⚠️ Critical design decision — Step 3 must not read as an error

Step 3 ("Acknowledged") may **never update** for clients whose accounting systems don't send back acknowledgements. The combination of:

- Dashed-ring dot (visually different from a solid pending dot)
- Dashed connector line (vs solid line between earlier steps)
- "OPTIONAL" pill
- "Optional — not needed for payment" meta copy
- Muted (`--ds-ink-3`) title colour

…is deliberate. Do not "improve" this to a solid pending dot or a spinner — that would imply something is in progress / waiting that may never resolve.

---

## Interactions & behaviour

### Screen 1

| Trigger | Effect |
|---|---|
| Tap toggle | Flip `einvoice` state. Inline message swaps according to `userState`. Bottom action bar re-evaluates `cannotSend`. |
| Tap "Set up now" (inline State A) | Navigate to Screen 2. |
| Tap "Send the usual way" (inline, in either State A or B) | `setEinvoice(false)`. Inline message disappears, action bar collapses to the standard "Send invoice" button. |
| Tap "Set up e-invoicing — 30 seconds" (bottom, State A) | Navigate to Screen 2. |
| Tap "Send the usual way" (bottom, either state) | `setEinvoice(false)`, then submit as a normal Tide invoice. |
| Tap "Send invoice" (bottom, when `cannotSend === false`) | Submit the invoice. If `einvoice && userState === 'C'`, the invoice is dispatched via e-invoicing → Screen 3. Otherwise it follows the existing email flow → Tide's normal "sent" confirmation. |

### Screen 2

| Trigger | Effect |
|---|---|
| Tap "Set up e-invoicing" | Optimistically transition to **loading phase** AND fire the registration request. Set `userState = 'B'`. |
| Tap "Not now" (idle) | Dismiss back to wherever the user came from. State stays **A**. |
| Tap × (close, either phase) | Dismiss. In loading phase the registration request keeps running in the background; surfacing it on Screen 1 is the State B inline. |
| Registration succeeds | `userState = 'C'`. If the user is still on Screen 2, transition smoothly to success and dismiss after ~600ms (success handling not specified in this bundle — flag to design before building). |
| Registration fails | Out of scope for this bundle — flag to design. Suggested fallback: revert to **A**, return user to Screen 1, surface a one-line danger callout. |

### Screen 3

| Trigger | Effect |
|---|---|
| Tap "Back to invoices" | Navigate to the invoice list. |
| Tap "View invoice details" | Navigate to the invoice detail view (existing screen — out of scope). |
| Step 3 updates to "Acknowledged" | Swap dot, connector, tag, meta to the **complete** style (same treatment as Step 1). Replace meta with the acknowledgement timestamp. |

---

## State model

```ts
type RegistrationState = 'A' | 'B' | 'C';

interface Store {
  registrationState: RegistrationState;     // persisted at account level
  draftInvoice: {
    customer: Customer | null;
    items: LineItem[];
    sendAsEinvoice: boolean;                // defaults: false if A, true if C; preserves last value if B
    // …existing draft fields
  };
}
```

Default `sendAsEinvoice`:
- State A → `false`
- State C → `true`
- State B → preserve whatever the user last had (`true` if they just initiated setup; otherwise `false`)

Persist `sendAsEinvoice` on the draft so a user returning from Screen 2 still sees their intent.

---

## Design tokens

All values are CSS custom properties defined in `tide-tokens.css`. **Map onto your existing Tide tokens by semantic name** rather than copying hex values — these should already exist in the codebase.

### Colour

| Token | Hex | Used for |
|---|---|---|
| `--ds-blue` | `#2B59FF` | Toggle ON, primary buttons, links, active timeline dot |
| `--ds-blue-deep` | `#00224F` | State A inline text colour |
| `--ds-blue-soft` | `#D6E0FF` | State A inline background |
| `--ds-blue-softer` | `#EDF1FF` | State A bottom callout background |
| `--ds-bg` | `#F0F2F8` | Screen canvas |
| `--ds-surface` | `#FFFFFF` | Cards, header, action bar |
| `--ds-ink` | `#0B1B3B` | Primary text |
| `--ds-ink-2` | `#283656` | Body text |
| `--ds-ink-3` | `#5F6B85` | Tertiary text, meta, pending title |
| `--ds-ink-4` | `#8A95AE` | Pending dot dashed border |
| `--ds-divider` | `#E2E6F0` | Hairlines, dashed timeline connector |
| `--ds-success` | `#1E8A5C` | Complete dot, success badge tick |
| `--ds-success-bg` | `#E2F3EA` | State C inline + success badge background |
| `--ds-warning` | `#B36900` | State B inline text |
| `--ds-warning-bg` | `#FFF1D9` | State B inline + bottom callout background |

### Type

GT Walsheim in production. Falls back to Mulish on web. All weights used: 400 (regular), 600 (medium), 700 (semibold), 800 (bold).

| Use | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Screen 2 headline | 28px | 800 | 1.15 | -0.015em |
| Screen 3 headline | 26px | 800 | 1.25 | -0.015em |
| Screen header title | 19px | 800 | 1.25 | -0.01em |
| Card/section title | 16px | 800 | 1.25 | — |
| Body | 16px | 400 | 1.5 | — |
| Item title | 15px | 700 | 1.3 | — |
| Inline messages | 13px | 600 | 1.4 | — |
| Meta / muted | 13px | 400 | 1.4 | — |
| Overline label ("DELIVERY") | 13px | 800 | 1.0 | 0.08em uppercase |
| Optional pill | 11px | 700 | 1.0 | 0.04em uppercase |

Numerals: use `font-variant-numeric: tabular-nums` for totals, references, and timestamps.

### Spacing

8-point scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64.
Card-to-card gap: 16-20px. Card padding: 16-18px horizontal, 14-16px vertical. Sticky action bar padding: `12px 16px 14px`.

### Radius

| Use | Value |
|---|---|
| Cards, screen 2 reassurance | 20px (`--ds-radius-lg`) |
| Inline messages, small inner cards | 12-14px (`--ds-radius-md`) |
| Buttons, toggle, pills, badges | 999px (`--ds-radius-pill`) |
| Reference pill | 999px |

### Shadows

Tide is almost flat. Cards: no shadow (a hairline at most — `0 1px 0 rgba(11,27,59,0.02)`). Toggle knob: `0 1px 2px rgba(11,27,59,0.18)`. Avoid heavy elevation.

### Motion

| Effect | Duration | Easing |
|---|---|---|
| Toggle transition | 160ms | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Spinner rotation | 900ms | linear, infinite |
| Indeterminate progress bar shimmer | 1400ms | `cubic-bezier(0.4, 0, 0.2, 1)`, infinite |
| Timeline active-dot pulse | 1600ms | ease-out, infinite |
| Button press (mobile) | 120ms | scale 0.98 |

---

## Assets

- **Icons** — Lucide stand-in in our prototype (production uses Tide's bespoke monoline 2px-stroke set). Icons used: `arrow-left`, `x`, `check`, `clock`, `info`, `alert-circle`, `chevron-right`, `plus`. Map onto the in-codebase icon component.
- **Illustration (Screen 2)** — geometric flat SVG (two stacked invoice docs with chevron-arrow + mint accent disc) embedded in the JSX. Replace with the production illustration set if available; otherwise the inline SVG is implementation-ready.
- **No photography** in this feature.
- **No logos** required.

---

## Files in this bundle

| File | What it is |
|---|---|
| `E-invoicing Screens.html` | Self-contained prototype — open in a browser to see all three screens with live toggle, registration-state switcher, and async loading state. |
| `e-invoicing-screens.jsx` | React component source for all three screens (Babel-transpiled at runtime in the HTML). Read this for exact spec — every measurement, colour, animation timing is here. |
| `tide-components.jsx` | Shared atoms from the Tide UI kit — colour map (`TIDE`), font stack (`FONT`), header chrome, button, field, etc. The new screens use `TIDE` and `FONT` from this module. |
| `tide-tokens.css` | The full Tide design-system CSS custom properties. All `var(--ds-*)` references in the prototype resolve here. |

---

## Out of scope (flag to design before building)

1. **Registration failure handling** — what does the user see if the access-point partner rejects their details?
2. **State C "registered" success moment** — what does the user see *immediately* after a successful registration completes if they're still on Screen 2?
3. **Notification when registration completes asynchronously** — push, in-app banner, or just the next time they enter the invoice flow?
4. **Invoice list entry point for Screen 2** — the brief mentions it but doesn't specify the surface.
5. **Acknowledgement timestamp format** in the timeline (and what state the timeline ends in if no acknowledgement ever arrives).
6. **Step 3 in-progress polling** — does Tide poll for acknowledgement, push it via WebSocket, or only update on next view?
