# eInvoicing Prototype — Plan

## Purpose

Personal domain accelerator before joining Tide as a PM in June 2026. The prototype is the learning mechanism, not just the output. Building it forces concrete answers to questions that reading about e-invoicing won't.

**The three questions this prototype must answer for you:**
1. What fields does Peppol (EN 16931) require that Tide's current invoice object doesn't have?
2. Can the registration flow be made simple enough that an SME never knows they're doing Peppol?
3. Does adding e-invoicing as an upgrade layer create a coherent UX, or does it fragment the product?

---

## North Star Design Principle

**Hide Peppol complexity completely.**

Users never see: scheme IDs, participant IDs, access point names, or the word "Peppol." They see: *"Your invoice was delivered digitally."* Everything underneath is invisible. Every UX decision should be evaluated against this principle.

---

## Pre-Build Research (Do This First)

Before writing a line of code, close these two gaps. They affect scope and framing.

**Regulatory timeline** — Find the specific HMRC mandatory e-invoicing phased rollout dates, turnover thresholds, and which business types are in scope in which phase. This is the forcing function for Tide's business case. Target: 30 minutes of research, specific dates and thresholds written down.

**Build vs. partner decision** — Decide on a view before the prototype is done. The options are:
- White-label an access point partner (Storecove, Pagero) — weeks to integrate, compliance owned by partner, lower margin
- Become a Peppol Access Point — 12–18 months, Ofgem accreditation, higher long-term control and margin
- Hybrid: partner for launch, roadmap toward own access point

The prototype should include an architecture note (one paragraph) stating Tide's likely answer and why.

---

## User States — The Core State Machine

Every screen in the prototype branches from this. Document it as a state diagram before designing screens.

| State | Description |
|---|---|
| **A — Unregistered** | User has never enabled e-invoicing. No network ID exists. Tide has not registered them with an access point. |
| **B — Pending** | User initiated e-invoicing setup. Tide is processing registration using Companies House number + VAT number already held. May take minutes to 24 hours. |
| **C — Registered** | User has a Peppol Participant ID. Surfaced to the user as a plain confirmation, never as a raw ID. |

Transitions: A → B (user taps "Enable e-invoicing") → C (registration confirmed by access point partner).

---

## Data Model

The invoice object uses a `networkConfig` property — not a `peppolId` property. This communicates that Tide has built a network-agnostic routing layer, not a Peppol-specific integration.

```ts
interface NetworkConfig {
  networkType: 'PEPPOL' | 'XRECHNUNG' | 'CHORUS_PRO' | 'IRP' | 'SDI';
  participantId: string;   // e.g. "0060:123456789"
  schemeId: string;        // e.g. "0060" (DUNS), "9930" (UK Companies House)
  countryCode: string;     // ISO 3166-1 alpha-2
}

interface Invoice {
  // Existing Tide fields
  id: string;
  amount: number;
  currency: string;
  lineItems: LineItem[];
  // ...

  // EN 16931 fields (this is where the data gap lives)
  buyerReference?: string;          // BT-10 — often required by public sector
  projectReference?: string;        // BT-11
  taxCategoryCode: string;          // BT-151 e.g. "S" (standard), "Z" (zero), "E" (exempt)
  itemClassificationCode?: string;  // BT-158 — CPV or UNSPSC code
  paymentMeansCode: string;         // BT-81 e.g. "30" (credit transfer), "58" (SEPA)
  paymentTerms?: string;            // BT-20

  // Network routing
  networkConfig?: NetworkConfig;
  eInvoicingEnabled: boolean;
}
```

The gap between Tide's current fields and the EN 16931-required fields is what the prototype is designed to reveal. Don't simplify these away.

### Country-to-Network Routing Config

Hardcoded in the prototype — visible in the UI as a config, not buried in code:

```ts
const NETWORK_ROUTING = {
  GB: { networkType: 'PEPPOL',      label: 'UK Peppol Network' },
  DE: { networkType: 'XRECHNUNG',   label: 'German e-invoicing (xRechnung)' },
  FR: { networkType: 'CHORUS_PRO',  label: 'French Chorus Pro' },
  IT: { networkType: 'SDI',         label: 'Italian SdI' },
  IN: { networkType: 'IRP',         label: 'Indian IRP' },
};
```

When a user adds a customer in Germany, the invoice form silently switches the underlying network. The only visible signal is a small "e-invoice compatible" badge. If the country isn't supported, the e-invoice toggle is greyed out with: *"E-invoicing not yet available for customers in [country] — coming soon."*

---

## Screens

### Onboarding (State A → B → C)

**Screen 1 — E-invoicing discovery entry point**
- Entry from: settings or a contextual prompt in the invoicing flow
- Headline: *"Send invoices that arrive instantly — no email, no chasing."*
- 3-bullet value prop (fast, reliable, compliant)
- Single CTA: "Set up e-invoicing"

**Screen 2 — Registration confirmation**
- No form fields. Tide already has everything it needs (Companies House + VAT).
- Copy: *"We'll register your business on the UK e-invoicing network using your Companies House number. Nothing else needed from you."*
- Single button: "Confirm and set up"

**Screen 3 — Registration pending (State B)**
- Async hold state. Progress indicator.
- Copy: *"Setting up your e-invoicing — usually takes a few minutes."*
- While waiting, user can continue using Tide normally.

**Screen 4 — Registration complete (State C)**
- Confirmation. No ID shown.
- Copy: *"You're set up. Invoices sent to compatible customers will now be delivered digitally."*
- CTA: "Send your first e-invoice"

---

### Invoice Creation (existing flow, upgraded)

**Customer record screen — e-invoicing preference**
- Per-customer toggle: "Always send e-invoices to [customer name]"
- If customer is Peppol-registered: badge shows "e-invoice compatible"
- If not: badge shows "standard invoice only"
- Receiver lookup: real-time query against Peppol SMP/SML directory (mocked in prototype, but use realistic latency ~300ms)

**Invoice creation screen — e-invoice mode**
- Customer-level default pre-sets the toggle. Override available per invoice.
- If e-invoice enabled: additional EN 16931 fields appear (tax category, payment means, optional buyer reference)
- Visual indicator: subtle "e-invoice" badge on the invoice card
- If customer country is unsupported: toggle greyed out with tooltip

**Invoice send — State B blocker (unhappy path)**
- If user tries to send with e-invoicing on but registration is still pending:
- Don't fail silently. Show: *"E-invoicing is still being set up. You can send this as a standard invoice now — we'll notify you when e-invoicing is ready so you can resend."*
- Two actions: "Send as standard invoice" (primary) and "Wait for e-invoicing" (secondary)

---

### Post-Send

**Resend notification**
- Push/in-app: *"Your e-invoicing is ready. Tap to resend Invoice #123 to ACME Ltd as an e-invoice."*
- User confirms → Tide resends via network → invoice updated to show e-invoice delivery status

**Invoice detail — advanced view (overflow menu)**
- Plain-language delivery status: *"Delivered via UK Peppol Network"*
- No technical IDs surfaced unless user explicitly taps "View technical details" (power-user escape hatch)

---

## Technical Stack

**PWA shell** — React, mobile-first, Tide-branded colour palette. No native app wrappers.

**Mocked API layer** — All Peppol/network calls are mocked with realistic latency. The mock responses must use real EN 16931 field names and values — this is how the prototype reveals the data gap.

**State management** — Simple React context for registration state (A/B/C). Persist to localStorage so refreshing doesn't reset the demo.

**Peppol directory lookup** — Mocked. Real implementation would call the Peppol SML/SMP. The mock should return:
- `{ registered: true, participantId: "9930:12345678", networkType: "PEPPOL" }` for GB customers
- `{ registered: false }` for unsupported cases

---

## Build Sequence

### Pre-build (before Day 1)
- Research UK mandatory e-invoicing regulatory timeline — specific dates and thresholds
- Form a view on build vs. partner (one paragraph written down)
- Draw the A/B/C state diagram

### Day 1–2 — Data model and state machine
- Define the full invoice TypeScript interface including all EN 16931 fields
- Note which fields Tide's current product likely doesn't collect — this is the gap list
- Build the registration state machine (A → B → C) with mock async delay
- No UI yet — just the data layer working correctly

### Day 3–4 — Core screens
- Onboarding flow (screens 1–4)
- Customer record with e-invoice preference toggle
- Invoice creation with EN 16931 fields conditional on e-invoice mode

### Day 5 — Unhappy paths
- State B blocker on send (with fallback option)
- Unsupported country greyed toggle
- Resend notification and confirmation flow

### Day 6 — Polish and routing logic
- Country-to-network routing config visible in the app
- "Delivered via UK Peppol Network" on invoice detail
- Receiver lookup mock with realistic latency

### Day 7 — Review and gap analysis
- Click through the full happy path and all three unhappy paths
- Write the data gap list: which EN 16931 fields did the prototype require that Tide's current product doesn't collect?
- Note one paragraph on the build vs. partner recommendation

---

## Key Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Toggle level | Per-customer default + per-invoice override | Reduces friction for recurring relationships; preserves flexibility |
| Registration blocker UX | Fallback send (PDF now) + notification to resend as e-invoice | Don't block the user; make e-invoicing feel like an upgrade, not a gate |
| Resend trigger | User notification + explicit confirmation | Avoids duplicate delivery; keeps user in control |
| Receiver lookup method | Real-time Peppol SMP/SML query (mocked) | Most accurate; performance/cost tradeoff acknowledged but correct at launch scale |
| Network abstraction | `networkConfig` object, not `peppolId` field | Communicates multi-network architecture even in UK-only prototype |
| Peppol complexity | Hidden entirely from user | North star principle: users should never see a scheme ID or access point name |

---

## Open Questions (Resolve as You Build)

1. **Exact regulatory timeline** — Which HMRC consultation covers mandatory UK e-invoicing? What are the VAT threshold and date for each phase?
2. **Tide's current invoice data model** — Which EN 16931 fields are already collected? Which are genuinely missing?
3. **Build vs. partner** — Storecove or Pagero for launch? What's the API surface, onboarding time, and revenue share model?
4. **Peppol SMP query performance** — At Tide's transaction volume, is real-time lookup feasible, or does Tide need a cached participant registry?
5. **Buyer-side adoption** — What percentage of Tide's existing B2B customer base is Peppol-registered today? Without this number, the feature's near-term utility is unknown.
