# Mentone Educational — Project Guide

## Project Overview

Static HTML/CSS/JS website for **Mentone Educational**, an Australian medical and educational supplies company operating since 1979. The site covers product discovery, purchasing, account management, and company information — no build tool, framework, or server; all pages are plain files opened directly in a browser or served statically.

---

## Directory Structure

```
mentone/
├── Website/                  # All HTML pages (site root when served)
│   ├── index.html            # Homepage
│   ├── interstitial.html     # Healthcare professional gate page
│   ├── account/
│   │   ├── login.html
│   │   ├── account-dashboard.html
│   │   ├── account-orders.html
│   │   └── account-order-detail.html
│   ├── discovery/
│   │   ├── plp.html          # Product listing page
│   │   ├── pdp.html          # Product detail page
│   │   ├── brands.html       # All brands listing
│   │   ├── brand-landing.html# Individual brand page
│   │   └── search.html       # Search results
│   ├── error/
│   │   └── 404.html
│   ├── info/
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── shipping.html
│   │   └── terms.html
│   └── purchase/
│       ├── cart.html
│       ├── checkout-details.html
│       ├── checkout-payment.html
│       └── order-confirmation.html
├── css/
│   ├── tokens.css            # Design tokens (colours, spacing, typography)
│   ├── global.css            # Base/reset styles
│   ├── layout.css            # Grid and layout utilities
│   ├── components.css        # Reusable UI components
│   └── home.css              # Homepage-specific styles
├── js/
│   ├── shared.js             # Header/footer injection + shared helpers
│   └── main.js               # Page-specific JS
├── assets/                   # Images and static assets
└── md/                       # Project documentation (this folder)
```

---

## CSS Architecture

The stylesheet is split into four core layers loaded by every page, plus one optional file:

| File | Purpose |
|---|---|
| `tokens.css` | CSS custom properties — colours, spacing scale, typography, radii, shadows |
| `global.css` | Body reset, base typography, utility classes |
| `layout.css` | Container, grid helpers, section spacing |
| `components.css` | All reusable components (cards, buttons, badges, forms, nav, footer) |
| `home.css` | Homepage-only sections (hero, trust bar, category grid, brand strip) |

**Adding a new page:** link all four core files with the correct relative path (`../css/` for subdirectory pages, `../../css/` is not used — all pages sit at most one level deep from `Website/`).

---

## Shared Header & Footer (`js/shared.js`)

> **Rule:** The header and footer are global. Never add header or footer HTML directly to individual page files.
> - **HTML structure** → edit `js/shared.js` only. Changes propagate to every page automatically.
> - **CSS styling** → edit `css/layout.css` only. All header/footer visual changes live there.

Every page renders its header and footer via JavaScript injection into `<div id="site-header">` and `<div id="site-footer">`. This is handled by `shared.js`.

### Path resolution

Pages at the site root (`index.html`, `interstitial.html`) reference `shared.js` as `../js/shared.js`.
Pages in subdirectories reference it as `../../js/shared.js`.

`shared.js` itself calls `getBasePath()` at render time to prefix all navigation `href` values:

```js
function getBasePath() {
  const inSubdir = /\/(account|discovery|info|purchase|error)\//.test(window.location.pathname);
  return inSubdir ? '../' : '';
}
```

**Rule:** Never hardcode flat filenames (e.g. `cart.html`) in `shared.js`. Always use `${base}purchase/cart.html` style paths so the header and footer work from every page location.

### Adding a new subdirectory

If a new folder is added (e.g. `blog/`), add it to the regex in `getBasePath()` and include `../../js/shared.js` in those pages.

---

## Link Conventions

All internal links in individual HTML pages use **relative paths from that file's location**:

- From `Website/index.html` → `discovery/plp.html`
- From `Website/discovery/pdp.html` → `plp.html` (same folder) or `../purchase/cart.html`
- From `Website/account/*.html` → `account-orders.html` (same folder) or `../discovery/plp.html`
- From `Website/error/404.html` → `../index.html`, `../discovery/plp.html`

Breadcrumbs in discovery and info pages follow this same pattern.

---

## CSS Reference — Key Custom Properties

```css
/* Colours */
--color-primary         /* Mentone teal/blue — brand primary */
--color-accent          /* CTA accent colour */
--color-success / --color-info / --color-warning / --color-error
--color-text / --color-text-muted / --color-text-light
--color-bg / --color-bg-subtle / --color-bg-muted
--color-border

/* Spacing (4px base) */
--space-1 … --space-16

/* Typography */
--font-size-xs … --font-size-4xl
--font-weight-normal / --font-weight-medium / --font-weight-bold
--line-height-tight / --line-height-base / --line-height-relaxed

/* Shape & elevation */
--radius-sm / --radius-md / --radius-lg / --radius-xl / --radius-full
--shadow-sm / --shadow-md / --shadow-lg / --shadow-xl
```

---

## CTA Button Rules

> **Rule:** CTA buttons (`.btn-primary`, `.btn-accent`, `.btn-outline`) must always have **bold** text, **uppercase** labels, and `--space-4` vertical padding. Do not apply these styles to `.btn-ghost`, which is a utility/secondary action button, not a CTA.

- Font weight: `var(--font-weight-bold)`
- Text transform: `uppercase`
- Letter spacing: `0.05em`
- Vertical padding: `var(--space-4)` (one token above the base `--space-3`)
- These rules live in `css/global.css` after the size modifiers (`.btn-sm`, `.btn-lg`) so they cascade correctly.
- **Exception — product card buttons:** `.product-card-footer .btn` overrides vertical padding back to `--space-3` (12px) in `css/components.css` to keep cards compact. All other CTA rules (bold, uppercase) still apply.
- **Product card button labels:** always use "Add to Cart" (not "Add") and "Enquire Now" (not "Enquire").
- Never override these properties per-page or per-component. If a new button variant is added that behaves as a CTA, add it to this group in `global.css`.

---

## Product Card Rules

> **Rule:** Any UI change to a product card must be applied to **every** product card across the entire site. Product cards appear in multiple pages — `index.html`, `discovery/plp.html`, `discovery/search.html`, `discovery/brand-landing.html` — and must always be visually consistent.

> **Rule — Badge placement:** Badges (`.product-card-badges`) must only appear on product cards with an "Add to Cart" button. Never place a badge on a card whose primary action is "Enquire Now". If a product is Out of Stock, the badge may be used but the button must be disabled (not removed).

When modifying product card markup or styles:
1. Search all HTML files for `.product-card` before and after making changes.
2. Apply the same structural change (add/remove elements, reorder children) to every card in every file.
3. CSS changes to `.product-card` and its sub-elements (`.product-card-body`, `.product-card-footer`, `.product-card-price`, `.product-card-brand`, `.product-card-name`, `.price-current`, `.price-was`) live in `css/components.css` and automatically apply sitewide — no per-page overrides needed for shared styles.
4. Per-page layout overrides (e.g. column count on `plp.html`) are the only acceptable page-level exceptions.

---

## Carousel Arrow Rules

> **Rule:** Navigation arrows on carousels (e.g. the Featured Products carousel) must always use the same visual style as the PLP pagination buttons (`.pagination-btn`).

- Size: `40px × 40px`
- Shape: `border-radius: var(--radius-md)` — slightly rounded square, **not** circular
- Default: `background: var(--color-bg)`, `border: 1.5px solid var(--color-border)`, `color: var(--color-text)`
- Hover: `border-color: var(--color-primary)`, `color: var(--color-primary)` — border and text change colour, **no background fill**
- No `box-shadow` on the button itself
- On mobile (≤768px) arrows are hidden — touch swipe handles navigation natively
- Arrows are placed in the section header alongside the section title, **not** flanking the carousel track

---

## Component Classes

| Class | Description |
|---|---|
| `.btn .btn-primary` | Filled primary button |
| `.btn .btn-outline` | Bordered button |
| `.btn .btn-accent` | Accent/CTA button |
| `.btn .btn-ghost` | Text-only button |
| `.btn-sm / .btn-lg / .btn-full` | Size modifiers |
| `.product-card` | Product tile with image, body, footer slots |
| `.badge .badge-new / .badge-sale` | Product badges |
| `.category-card` | Homepage category tile (anchor element) |
| `.brand-logo-item` | Brand strip link |
| `.breadcrumb / .breadcrumb-item / .breadcrumb-sep` | Page breadcrumb |
| `.site-header / .primary-nav / .nav-dropdown` | Injected header structure |
| `.site-footer / .footer-grid / .footer-links` | Injected footer structure |
| `.account-layout / .account-sidebar / .account-nav` | Account page two-column layout |

---

## Business Context

- **Company:** Mentone Educational, Melbourne, Australia. ABN placeholder in footer.
- **Phone:** (03) 9547 6638 | **Email:** sales@mentone-educational.com.au
- **Products:** Medical simulation, anatomical models, health education resources, Demo Dose simulated medications.
- **Key brands:** 3B Scientific, Gaumard, Prestan, SynDaver, iSimulate, SOMSO, Erler Zimmer, NASCO.
- **Audience:** Universities, hospitals, nursing schools, healthcare professionals, educators, students.
- **Tone:** Professional, trust-focused, Australian.

---

## Development Notes

- No build step — edit files directly and refresh the browser.
- CSS uses `file://` compatible relative paths; no root-relative (`/`) paths are used.
- The site has no backend; all forms and cart interactions are front-end only (prototype/design stage).
- `main.js` contains page-specific logic such as `addToCart()`.
- The `interstitial.html` page is a standalone design mockup of the healthcare professional gate modal.

---

## Badge System

Badges live in `css/global.css` and use tokens from `css/tokens.css`. The reference source of truth is `Components/components/badges.html` + `badges.css`.

| Class | Colour | Use on product cards |
|---|---|---|
| `.badge-new` | Green (`--color-success`) | New arrivals — Add to Cart only |
| `.badge-sale` | Red (`--color-sale`) | Sale/discounted — Add to Cart only |
| `.badge-primary` | Teal (`--color-primary`) | Featured — Add to Cart only |
| `.badge-accent` | Amber (`--amber-500`) | Best Seller — Add to Cart only |
| `.badge-info` | Teal (`--color-info`) | Coming Soon — Add to Cart only |
| `.badge-muted` | Grey (`--color-bg-muted`) | Out of Stock — button must be `disabled` |
| `.badge-pill` | Modifier — rounds to `radius-full` | Order status badges only |

**Key decisions:**
- `--badge-radius` is `--radius-sm` (2px), not pill-shaped. Use `.badge-pill` modifier for pill shape.
- `badge-accent` uses `--amber-500` (not `--color-accent` which is red, same as sale) to distinguish Best Seller from Sale visually.
- Out of Stock cards keep the button present but add the `disabled` attribute; `.product-card-footer .btn:disabled` styles it at 45% opacity with `cursor: not-allowed`.

---

## Clickable Product Cards (Stretched Link Pattern)

Every product card is fully clickable to its PDP without nested `<a>` tags. Implementation in `css/components.css`:

- `.product-card` has `position: relative` (stacking context)
- `.product-card-name::after` is `position: absolute; inset: 0` — stretches the name anchor to cover the entire card
- `.product-card-footer` and `.product-card-badges` have `z-index: 1` — lift the CTA button and badges above the overlay so they remain independently clickable

**Rule:** The `href` on `.product-card-name` is the single source of truth for where the card links. Always set it to the correct PDP path.

---

## Hero Banner (index.html)

- **Background image:** `assets/Images/Mentone Hero BG.png` set in `css/home.css` via `background-image` with a dark teal gradient overlay for text legibility.
- **Parallax:** JS-driven in `js/main.js`. On scroll, `background-position-y` is set to `calc(50% + scrollY × 0.4px)` — the image moves up at ~60% of content scroll speed. The `0.4` multiplier can be tuned (lower = slower image movement).
- `background-attachment: scroll` (not `fixed`) — required for the JS parallax to work. `fixed` would pin the image to the viewport entirely.
- The right-column `.hero-image` placeholder (`🫀` emoji) is still in the HTML — candidate for replacement with a real product image or removal.

---

## Current State of Product Cards by Page (as of this session)

### `index.html` — 4 cards (Featured Products section)
| Product | Badge | Button |
|---|---|---|
| 4-Part Brain Model | `badge-new` New | Add to Cart |
| Full Skeleton Model | `badge-sale` Sale | Add to Cart |
| HAL Patient Simulator | — | Enquire Now |
| CPR Manikin Adult | `badge-accent` Best Seller | Add to Cart |

### `discovery/plp.html` — 15 cards
| Product | Badge | Button |
|---|---|---|
| HAL Adult Simulator | `badge-new` New | Add to Cart |
| CPR Manikin Adult | `badge-primary` Featured | Add to Cart |
| Airway Trainer | `badge-sale` Sale | Add to Cart |
| Newborn HAL S2209 | — | Enquire Now |
| IV Injection Arm | `badge-accent` Best Seller | Add to Cart |
| ALSi Monitor | — | Add to Cart |
| Laparoscopy VR | — | Enquire Now |
| Ultrasound Phantom | — | Add to Cart |
| Neuro Trainer | `badge-new` New | Add to Cart |
| CPR Child 4-Pack | `badge-muted` Out of Stock | Disabled |
| Wound Care Kit | — | Add to Cart |
| Premature Infant HAL | — | Enquire Now |
| Demo Dose Set | `badge-sale` Sale | Add to Cart |
| REALITi 360 | — | Enquire Now |
| SynDaver Dog Model | — | Enquire Now |

### `discovery/search.html` — 3 cards, no badges
### `discovery/brand-landing.html` — 4 cards, no badges

---

## Next Steps

The following work is identified but not yet started. Pick up from here in the next session.

### High priority
1. **Hero image placeholder** — The `.hero-image` right column still shows a `🫀` emoji inside `.hero-image-placeholder`. Replace with a real product image (or remove the column to make the hero full-width text + background image only).
2. **PDP (`pdp.html`) review** — The product detail page has not been touched this project. Needs a full pass: image gallery, pricing, Add to Cart / Enquire CTA, badges, breadcrumb placement, and consistency with card patterns.
3. **search.html and brand-landing.html badges** — These pages have no badges on their product cards. If badge distribution is needed for consistency, add them now before there are too many cards.

### Medium priority
4. **Parallax tuning** — Current multiplier is `0.4` in `main.js`. Test at different viewport sizes and adjust if the effect looks too subtle or too strong.
5. **Cart page (`cart.html`)** — Quantity inputs are read-only with `+`/`−` buttons, but the cart total, line totals, and remove functionality are all static. These will need wiring when a real cart state is introduced.
6. **Checkout flow** — `checkout-details.html` and `checkout-payment.html` are design mockups. Form validation and payment UI have not been reviewed.
7. **Account pages** — `account-dashboard.html`, `account-orders.html`, `account-order-detail.html` are untouched. Review for consistency with the design system.

### Low priority / polish
8. **`badge-info` "Coming Soon"** — No product currently uses this badge on any page. Either remove the style or add it to a genuinely pre-release product.
9. **Mobile review** — The parallax JS has no mobile breakpoint guard. On small screens the hero image may not need parallax. Consider disabling at `max-width: 768px`.
10. **Component library sync** — `Components/` is a separate design system folder with its own `tokens.css`. Any token changes made to the main `css/tokens.css` should be reviewed against the component library to keep them in sync.
