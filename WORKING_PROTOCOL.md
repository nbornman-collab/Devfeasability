## GOAT RULE 🐐

🐐 is posted as the **very first thing** in every reply that touches this codebase - before any reading, analysis, or output.
It means: "I have read the protocol. I am proceeding."
Nic should see 🐐 immediately. No preamble. No delay.
If Nic doesn't see 🐐 first: call it out with "declaration".

---

## CORE RULE

No code is written until:
1. Understanding is proven
2. Impact is mapped
3. Plan is explicit

No task is complete until:
4. It is verified with evidence

---

## PRODUCT ARCHITECTURE (current state)

| URL | Name | Status |
|-----|------|--------|
| `/` | Homepage | Live - dark map hero, D/P/A pills, cycling text, scroll section |
| `/discover` | Discover (T0) | Live - 155 sites, two-mode UX, intelligence hook, teased factor bars |
| `/t1/:site` | Appraise | 64 pages - 24SS rebuilt (new design), rest are old design |
| `/t2/:site` | Full Insight | 24SS only - live demo endpoint |
| `/borough/*` | Borough screeners | 301 redirect → /discover. Dead as navigation. |
| `/pd` | PD Check | Separate product strand, not in D/A nav |

**Demo flow:** `/` → `/discover` → site focus panel → `/t2/24-southwark-st`

**Public naming:** Discover / Appraise / Full Insight (never T0/T1/T2 externally)

**D/A brand is internal.** Not on product surface.

---

## LANGUAGE RULES

- **No em dashes.** Ever. Use a regular dash (-) instead. All output - code, UI, messages, docs.
- **🦞 protocol trigger**: When Nic sends 🦞, add the preceding decision to this file immediately and commit.
- **Underutilised** is the core product angle - use it in copy, titles, and framing.
- **No AI references** anywhere on the product surface.
- **Borough names** not in top ribbon - Discover dropdown only.
- **PD Check** not in D/A main nav.

---

## STEP 0 - READ & PLAN CONFIRMATION (MANDATORY)

Runs before anything else. No exceptions.

### 1. READ CONFIRMATION

- Target File: [filename]
- Core Logic: (1 sentence)
- Key Functions / Sections: [list]
- Variables & Data Types: [list]

If this cannot be completed → STOP → "I have not read the file properly"

### 2. IMPACT ASSESSMENT

- Impact Zone: (exact functions / lines)
- Downstream Effects: (files depending on this)
- Locked Constraints Check: (no conflict with confirmed values)
- Edge Case Risks: (1-2 real failure modes)

### 3. EXECUTION PLAN

- The Change: "I am changing [X] to achieve [Y]"
- Proposed Logic: (how the code changes)
- Regression Risk: (what could break)
- Verification Path: (how to prove it works)

### 4. AMBIGUITY CHECK

- Any unclear instruction?
- Any missing data?
- Any conflict with locked values?

If yes → AMBIGUITY GATE (see below)

### 5. APPROVAL REQUIRED

Do not proceed until Nic approves.

---

## STEP 1 - PRE-CHANGE DECLARATION

Before touching any file:

```
ABOUT TO CHANGE: [specific change] in [file + location]
DEPENDS ON THIS: [files/functions]
WILL NOT TOUCH: [locked values / invariants]
RISK: [what could break]
```

---

## STEP 2 - IMPLEMENTATION

Make the change exactly as planned.

If the first attempt fails → STOP → ROOT CAUSE required before next attempt.
Second attempt without root cause = breach.
Third attempt = full diagnostic + Nic approval required.

---

## STEP 3 - POST-COMMIT VERIFICATION (MANDATORY)

Run against: https://web-production-9d1a0.up.railway.app

```
POST-COMMIT VERIFICATION - [commit hash]
1. Homepage loads
2. /discover loads, sites render, focus panel works
3. T1 24SS loads, map renders, score shows
4. T2 24SS loads, massing renders, financials update
5. Files touched: [list]
6. Diff summary: lines added/removed
7. Anything uncertain: [honest answer]
8. SECOND-ORDER CHECK: What could still be wrong even if all passed?
```

Rules:
- All pass → commit stands → say "done"
- Any fail → fix → rerun
- HTTP 200 alone is not evidence of working
- Map/3D always requires browser confirmation

---

## AMBIGUITY GATE

```
AMBIGUITY: [issue]
Option A: [interpretation] - consequence
Option B: [interpretation] - consequence
Await instruction.
```

No silent decisions. Ever.

---

## API DEPENDENCY GATE

Before using any external API:
1. Make live production call
2. Show response
3. Output: `API [name] verified working at [timestamp]`

**Known broken in production - do not build against:**
- OS Places API - 401
- HMLR INSPIRE WFS - permanently disabled
- Street View thumbnail - `GOOGLE_MAPS_API_KEY` not set on Railway (Nic action pending)

---

## PLACEHOLDER PROTOCOL

Any unverified data must:
1. Be marked: `// PLACEHOLDER: [description] - replace before production`
2. Be logged in `PLACEHOLDERS.md`
3. Use commit prefix: `PLACEHOLDER:`

Never removed without explicit instruction from Nic.

**Verified sites:**
- 24 Southwark Street SE1 - TGL221350, commercial, 1,550m²
- 196 Blackfriars Road SE1 - SGL322825, residential, 583m²

---

## REGRESSION PREVENTION

When editing shared files (server.js, lib/, site-intelligence.js):
- List all dependent files before touching anything
- Run full verification after every change

---

## BULK SCRIPT BAN (🦞 locked 2026-03-22)

**Python/sed bulk scripts across multiple production files are permanently banned.**
They have broken layouts. Do not use them.

Visual changes: test page `/test/t1-redesign` ONLY.
Live file edits: surgical, one file at a time, read before edit.

---

## VISUAL REVIEW RULE (🦞 locked 2026-03-22)

`/test/t1-redesign` is the canonical review URL for all design work.
No visual change touches any live page until Nic approves the test page.
Once approved - surgical rollout one file at a time.

---

## SINGLE PAYMENT GATE (🦞 locked 2026-03-22)

T0 (Discover) is always free.
One payment unlocks the full site report (T1 + T2 merged).
Double-gating is permanently off the table.
Subscription tier: do not design for now.

---

## T2 ABSORBED INTO T1 (🦞 locked 2026-03-22)

T2 as standalone URL is deprecated (kept live for 24SS demo only).
All T2 content moves into T1 as section 04 (Massing + Financials).
Do not invest further in `/t2/` as a product URL.

---

## MAP STYLE RULES

- **Homepage**: dark-v11 vector, pitch 55, slow bearing rotation, interactive:false
- **Discover (T0)**: dark-v11 vector, pitch 0 browse / pitch 52 site focus flyTo
- **T1 (Appraise)**: light-v11, pitch 0, zoom 17.5, 3D massing layers
- **T2 (Full Insight)**: satellite-streets-v12, pitch 60, 3D massing layers

Locked camera values - do not change without explicit instruction.

---

## 3D MAP - HIGH RISK RULES

Before editing any map or 3D code:
- Read entire `initMap()` / `style.load` callback
- List all variables referenced
- Confirm every variable is defined in THIS file

**Locked values:**
- `EXISTING_HEIGHT`: 24SS=24.8m, 196BR=13.7m
- `SITE_COORDS`: verified title polygons - do not regenerate
- `fill-extrusion-base` for `podium-3d`: always `0`
- `ctx-3d` opacity: always `0.20`
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`

**Known failure pattern:** Silent errors inside `style.load` stop all rendering. No error shown.

---

## LAYOUT ARCHITECTURE

| Tier | Layout | Key constraint |
|------|--------|----------------|
| Homepage | Full viewport fixed map + scrollable below-fold | `overflow-x:hidden`, hero-wrap is `100vh` |
| T0 Discover | Fixed map full canvas + fixed right panel + absolute focus overlay | Two-mode UX: browse / site-focus |
| T1 Appraise | Fixed nav + fixed left map + fixed right panel | `--panel-w:50%`, `top:52px` |
| T2 Full Insight | Fixed 50/50 split | Both `position:fixed` - external nav bars break this |

---

## COMPREHENSIVE AUDIT RULE (🦞 locked 2026-03-18)

When any page is reported broken, do NOT just fix the symptom.
Audit ALL active pages before committing:
- Homepage, /discover, T1 24SS, T2 24SS
- Check: JS syntax, CSS variable refs, map container height, script src 404s
- Fix everything in one commit - not piecemeal

---

## SITE POLYGON - SINGLE SOURCE OF TRUTH (🦞 locked 2026-03-18)

**`SITE_INTELLIGENCE.polygon` in `public/lib/intelligence-{site}.js` is the only source.**

- Both T1 and T2 read this value
- No queryRenderedFeatures for polygon
- No runtime API polygon
- `SITE_COORDS` must be `let` (not const)
- No new site enters T1 or T2 until polygon is verified

---

## DATA SOURCE ARCHITECTURE (🦞 locked 2026-03-18)

| Data | Source |
|------|--------|
| Building footprint polygon | Intelligence file (verified HMLR / OS NGD) |
| Existing building height | OS NGD `relativeheightmaximum` |
| Existing GEA | VOA (commercial) / EPC (residential) |
| Ownership / title | HMLR (hardcoded per site) |
| Planning designations | GLA Planning DataMap (ArcGIS REST) |
| Transport | TfL PTAL proxy `/api/ptal` |
| Flood zone | Environment Agency `/api/flood-zone` |
| Listed buildings | Historic England `/api/listed-buildings` |

Rules:
- GEA never derived from footprint x floors - always VOA or EPC
- No rectangle approximations, no guessing
- When a source fails: surface the error, never silently substitute

---

## FLOOR-TO-FLOOR HEIGHTS (🦞 locked 2026-03-18)

- Office lower-rise / refurb-grade: **3.5m**
- Office Grade A new-build: **4.0m**
- Residential: **3.15m**
- Never use 4.2m or any other value
- Record choice and rationale in intelligence file

---

## SITE GEOCODING - GOOGLE MAPS FIRST (🦞 locked 2026-03-19)

1. Google Geocoding API → lat/lng (validate within borough bbox)
2. OSM Overpass → polygon (prefer address-based query over proximity)
3. Fallback: rectangle at Google-verified centroid

Never use proximity-only OSM queries without Google-verified coords.
Never accept OSM `building=residential` for commercial sites.

---

## SCORING + INTELLIGENCE RULES

**Scoring weights (internal only - never share with contractors):**
- Available Sky ×2.5 | Rent Headroom ×2.0 | Planning Appetite ×2.0
- Heritage Shadow ×1.5 | Title Stack ×1.5 | Transport Links ×0.5

**Verdict thresholds:**
- Score < 50 + blocking = No Go
- Score < 70 or navigable = Amber
- Score >= 80 = Green

**Score /100 always shown alongside verdict badge.**

**No Go is a feature** - explicit negatives differentiate D/A from LandTech/Nimbus.

**OA designation** is a first-class field. OA sites get planning score bonus + explicit flag.

**Minimum 2 real planning precedents per site.** Never fabricate references.

**NIY sub-market defaults:** City core 4.25% / Southwark CAZ 4.75% / Outer London 5.5%

---

## INTELLIGENCE SYNTHESIS RULE (🦞 locked 2026-03-21)

Every section must contain a synthesis paragraph - not just data.

Each paragraph must:
1. Name the data points being triangulated
2. State how they interact
3. Give a directional conclusion

Not acceptable: listing scores without interpretation, generic descriptions, repeating data without adding judgment.

**Synthesis voice:** opinionated but not declarative.
- Good: "on the balance of it" / "the case stacks up for"
- Bad: "will approve" / "the only question is"

---

## UK BUILDING REGULATIONS (🦞 locked 2026-03-22)

Official reference for all architectural intelligence. Cite Part + clause.

**4 kickers in T0-T2 synthesis only:**
- Part B / BSA (fire safety, second staircase, 18m/30m/50m thresholds)
- Part M2 (access, lift provision, core sizing)
- Part L2 (energy performance, BREEAM/GLA energy SPG)
- Part O (overheating, glazed buildings)

Only cite a Part if it affects feasibility, cost, massing, or planning.

Source: https://www.gov.uk/government/collections/approved-documents

---

## T0 HOOK PRINCIPLE (🦞 locked 2026-03-22)

T0 shows enough to create desire - not enough to satisfy it.

- Show: score + verdict + OA flag + analyst hook (3 sentences) + 3-of-6 factor bars
- Gate: Heritage Shadow, Title Complexity, Transport Position scores - visible as locked bars
- CTA: site-specific "See why this scores X/100 → +XF · planning precedents · does it stack?"

---

## GLA PLANNING DATAMAP

Base: `https://gis2.london.gov.uk/server/rest/services/apps/planning_data_map_02/MapServer`
Query: `/{layer_id}/query?geometry={lng},{lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&f=json`

Key layers: 103 OA | 107 CAZ | 205 Conservation Areas | 214 Listed Buildings | 213 LVMF | 102 Site Allocations

Server proxy: `/api/gla-planning?lat=&lng=`

---

## DISCOVER (T0) - LOCKED BEHAVIOURS

- Map style: `dark-v11`
- Browse mode: pitch 0 (flat 2D)
- Site focus flyTo: pitch 52, zoom 16
- Ranking: score desc → GDV desc → plotM2 desc → planScore desc → alphabetical (no tied ranks)
- Borough colours: Southwark `#8b5cf6` | City `#38bdf8` | Hackney `#4ade80`
- `expandHTML` card expansion: permanently removed (two-mode UX replaces it)
- Bishopsgate Goodsyard: always EXCLUDE from screeners

---

## THINGS THAT MUST NOT CHANGE WITHOUT EXPLICIT INSTRUCTION

- Mapbox camera angles on any page
- `SITE_COORDS` polygon data
- `EXISTING_HEIGHT` confirmed values
- Intelligence scoring weights and factor names
- Scoring multipliers (not publicly visible)
- D/A brand: name, slash colour, nav structure
- `fill-extrusion-base` for podium-3d: always 0
- `ctx-3d` opacity: always 0.20
- Layer order in 3D map

---

## KNOWN BROKEN / PARKED - DO NOT TOUCH

- OS Places API - 401 in production
- HMLR INSPIRE WFS - permanently disabled
- Street View thumbnails - GOOGLE_MAPS_API_KEY not set on Railway
- Satellite focus panel thumbnail - same
- Mixpanel - DA_PLACEHOLDER_TOKEN needs real token
- T2 Cesium integration - blocked until cesium-demo verified in production
- OS NGD `bld-fts-building` - use `bld-fts-buildingpart` instead

---

## CONTRACTOR RULES

- NDA + IP assignment required before repo access
- Scoring weights never shared with contractors
- Two separate engagements: boundary/polygon + 3D massing
- Architecture spec reviewed by Nic before briefing

---

## LINKEDIN ACCESS - READ ONLY (🦞 locked 2026-03-19)

- Browse profiles, search, read connections only
- Never send connection requests, messages, or posts
- Never like, comment, react, follow, or engage
- Wait for explicit instruction before any action that leaves a trace

---

## PROTOCOL UPDATES

1. Flag: "Protocol says X but it failed because Y - proposing update"
2. Nic approves
3. Update file, commit, show exactly what changed
4. No silent edits to this protocol. Ever.
