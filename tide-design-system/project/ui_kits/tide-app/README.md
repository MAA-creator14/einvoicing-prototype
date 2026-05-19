# Tide App — UI kit

A high‑fidelity, click‑through rebuild of the Tide UK mobile app, faithful to
the four screenshots in `assets/screens/`.

## Run

Open `index.html` directly. Everything is loaded via script tags — no build
step.

## What's interactive

- **Bottom tab bar** switches between *Home / Payments* (the real balance home),
  *Admin* (the Invoicing sub‑tab), and stub Sales / Finance tabs.
- On the Admin → Invoicing screen, **Create an invoice** opens the *Add item*
  form, and **Customers** opens the *Add customer empty state*. Each has a
  working back arrow.
- The *Add item* form computes Sub total / Total live from quantity, unit
  price and discount, and unlocks the Confirm button when valid.

## Components

| File | Exports |
|------|---------|
| `tide-components.jsx` | `TideHeader`, `TideButton`, `TideField`, `TideSelect`, `BalanceCard` (with the trademarked Swell motif as inline SVG), `QuickAction`, `BottomNav`, the `Ic` icon set, `TIDE` token map, `FONT` |
| `screens.jsx` | `AppTopBar`, `HomeScreen`, `AdminInvoicingScreen`, `AddCustomerEmpty`, `AddItemScreen` |
| `app.jsx` | Mounts `<App/>` and wires the screens together inside an `IOSDevice` frame |
| `ios-frame.jsx` | Starter component — iPhone bezel + status bar + home indicator |

## Caveats

- The icon set is hand‑drawn stroke SVGs, not Tide's source icons. Stroke
  weight and rounded caps match.
- The card‑reader and Cards tiles are placeholders (we have no production
  screenshots of those flows).
- Cross‑sell illustrations are rebuilt from the screenshots — Tide's full
  illustration library wasn't available.
