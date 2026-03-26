# Brand Refresh Plan - D/A Visual Identity

## Design Language (established on scroll page)

### Typography
- **Display:** Instrument Serif (headlines, site names, section titles)
- **Body:** Inter (everything else)
- **Data:** JetBrains Mono (numbers, scores, financial values)

### Colour Palette
| Token | Hex | Use |
|-------|-----|-----|
| `--accent` | `#5b7a9d` (slate blue) | Navigation, section labels, progress indicators, structural UI |
| `--accent2` | `#b8845c` (muted copper) | Financial values, scores, CTAs, warm highlights |
| `--bg` | `#f2f1ed` (off-white) | Light mode background |
| `--bg-dark` | `#111110` | Dark mode / homepage |
| `--ink` | `#111110` | Primary text (light mode) |
| `--ink2` | `#3a3a38` | Secondary text |
| `--ink3` | `#6a6a65` | Tertiary text |
| Green | `#16a34a` | Positive (PoC above target, LVMF clear) |
| Red | `#dc2626` | Negative (PoC below target, high risk) |
| Amber | `#b45309` | Warning (moderate risk) |

### Components
- **Glass panels:** `rgba(255,255,255,.55)`, `backdrop-filter: blur(20px)`, 12-20px radius
- **Pills:** Green/amber/red status indicators with rounded corners
- **Cards:** 16px radius, subtle hover glow with blue tint
- **Progress dots:** Left edge, accent colour active state

### Voice
- Direct, factual authority
- Not performative or corny
- "Heritage-led scheme" not "This is where the magic happens"
- Numbers lead, narrative supports

---

## Homepage Redesign

### Current State
- Dark map background with slow rotation (good - keep)
- Orange accent (#e07b2a) throughout
- D/P/A pills (good concept, needs refinement)
- Hero title: Inter 900 (generic)
- Below fold: light section with mode cards
- PD section, pricing tiers

### Changes

#### 1. Typography
- Hero title → Instrument Serif (massive, elegant)
- "Know every site" in Instrument Serif is immediately more premium than Inter 900
- D/P/A pill text stays Inter (functional)
- Stat numbers stay JetBrains Mono

#### 2. Colour
- All `#e07b2a` (orange) → `#b8845c` (copper) for warm accents
- D/P/A pill letters → copper
- CTA button → copper (or keep white with copper hover)
- Nav accent → copper
- Section labels → slate blue `#5b7a9d`
- Below-fold heading em colour → copper
- Mode card hover → copper border/shadow

#### 3. Below-Fold Section
- Heading → Instrument Serif
- Body text → 16px (up from 14px), line-height 1.9
- Mode card numbers → copper instead of grey

#### 4. PD Section
- Label → slate blue
- Heading → Instrument Serif
- Body → 14px (up from 13px)
- Button → copper

#### 5. Pricing Tiers
- Heading → Instrument Serif
- Featured card border → copper (was orange)
- Card label colour → slate blue

#### 6. Font Loading
- Add Instrument Serif to Google Fonts import

---

## T0 (Discover) Redesign

### Current State
- Light background (#f2f1ed)
- Orange accent throughout
- Nav with D/A logo, active state orange underline
- Full map canvas with overlay panels
- Site cards with score, verdict, factor bars
- Dark map style

### Changes

#### 1. Typography
- Nav tagline → stays Inter (functional)
- Site names in focus panel → Instrument Serif
- Borough headings → Instrument Serif
- Section labels → Inter (stay functional)

#### 2. Colour
- All `#e07b2a` → appropriate split:
  - Structural UI (nav active, section labels, focus header) → slate blue `#5b7a9d`
  - Financial/value (scores, verdicts, CTAs) → copper `#b8845c`
- Site cards: score number → copper
- Factor bars: base colour → slate blue (high bars → green stays)
- Active nav link underline → copper
- Verdict badge → copper text on copper-tint bg
- Focus panel CTA → copper

#### 3. Map
- Keep dark-v11 / night preset (homepage)
- Standard + dawn for site-level views (matches scroll page)
- Map markers: copper instead of orange

#### 4. Glass Treatment
- Focus panel → match scroll page glass (backdrop-filter, rounded corners)
- Site popup → glass treatment

#### 5. Text Sizing
- Increase where needed to match scroll page readability
- Focus panel body → 14px min
- Factor labels → 13px min

---

## Implementation Order

1. **Homepage** - CSS-only changes first (colours, fonts). No JS changes.
2. **T0** - Same approach: CSS tokens first, then font loading.
3. **Test** both at current URLs
4. Verify no breakage (these are live pages)

## Files Affected
- `/index.html` - homepage
- `/discover.html` - T0
- No intelligence files touched
- No scroll page touched (already done)
