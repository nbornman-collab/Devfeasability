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

## ARCHITECTURAL RULES (Developer-Focused) - locked 2026-03-26

These apply to all data presentation across T1, T2, intelligence files, and any UI showing area or efficiency data:

- **GIA and NIA always presented side by side.** Never show one without the other.
- **Efficiency always shown as a percentage**, clearly defined as NIA / GIA. Label must read "Efficiency (NIA/GIA)" or equivalent - never just "efficiency" without definition.
- **Core and service areas always broken out as percentages.** Never refer to "core" alone without a number. State both core % and services % separately if data is available.
- **Always use "floorplate"** - not "plate", not "floor plate" (two words), not "gross plate". Consistent throughout all UI and copy.

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

## T0/T1 INFORMATION ARCHITECTURE (🦞 locked 2026-03-24)

### T0 principle: attraction through demonstrated competence

T0 is generous with insight. It does NOT withhold or tease.
Every data point shown freely OPENS a question the user didn't have before.
The report (T1) answers those questions.

T0 lets you ASSESS a site. T1 lets you ACT on it.
If a user can make a go/no-go decision AND know their next step from T0 alone, T0 is showing too much.

### Three entry points to T0 (all land at same site view)

1. London Top 100 / Borough Top 25 (showmanship, ranked leaderboard)
2. Enter a postcode (direct search)
3. Click around the map (browse/discover)

### T0 shows freely (each creates a question)

- Score /100 + verdict badge → "Why this score? What drags it down?"
- Est. GDV → "Does it stack? What's the margin?"
- Planning appetite score → "What precedents? What got refused?"
- Heritage tier label → "Navigable HOW? What's the strategy?"
- Added floors count → "What massing? Podium + tower? What efficiency?"
- 3 visible factor bars (relative fill) → "What about the 3 locked ones?"
- 3-sentence analyst hook:
  - Sentence 1: opportunity signal (engagement)
  - Sentence 2: constraint tension (doubt)
  - Sentence 3: unresolved question (the itch - Zeigarnik open loop)
- Borough, address, basic context

### T0 NEVER shows (resolution is paid)

- Planning precedent refs (AP/ numbers, committee decisions, approval details)
- Heritage strategy or mitigation approach
- Architecture constraints / Building Regs (Part B/M/L/O)
- Financial model, pro forma, IRR, RLV, profit on cost
- Massing scenarios, 3D model, floor plate options
- Comparable evidence or specific data sources
- Anything sufficient to ACT (not just assess)

### T1 principle: the feast

Every question T0 opened, T1 closes with evidence.
"Rocketship level insight" - so good the user keeps coming back.
Each section triangulates >= 2 data sources.
Sections: 01 Development Scope → 02 Planning Realm → 03 Architecture + Massing → 04 Massing + Financials.

---

## T2 ABSORBED INTO T1 (🦞 locked 2026-03-22)

T2 as standalone URL is deprecated (kept live for 24SS demo only).
All T2 content moves into T1 as section 04 (Massing + Financials).
Do not invest further in `/t2/` as a product URL.

---

## MAP STYLE RULES

- **Homepage**: dark-v11 vector, pitch 55, slow bearing rotation, interactive:false
- **Discover (T0)**: dark-v11 vector, pitch 0 browse / pitch 52 site focus flyTo
- **T1 (Appraise)**: standard + dusk, pitch 58, zoom 17.5, bearing -20, 3D massing layers
- **T2 (Full Insight)**: satellite-streets-v12, pitch 60, 3D massing layers

Locked camera values - do not change without explicit instruction.

---

## HERITAGE MASSING RULES (locked 2026-03-25)

**Conservative over bold. Always. No exceptions.**

The product must NEVER suggest demolishing or extruding through a building with heritage character. One screenshot comparing our proposed massing to a real building kills the brand.

### The Default Position

**Pre-1930 in reasonable structural condition = RETAIN AND ADAPT.**

The burden of proof is on demolition, not retention. This mirrors the current planning and sustainability climate (NPPF paras 205-209, London Plan SI2, LETI, Southwark P8+P69). A Whole Life Carbon assessment will almost always favour keeping what's there.

### 5 Heritage Response Types

| Type | Name | Trigger | Massing Rule |
|------|------|---------|-------------|
| 1 | UNRESTRICTED | Post-1980, no listing, no CA, no character | Full-plate extrusion |
| 2 | CONTEXTUAL | Post-war (1930-1980), or in CA buffer | Full extrusion, material response, +2% cost |
| 3 | RETAIN_AND_ADAPT | Pre-1930 reasonable condition (DEFAULT) | Keep existing, add 2-3F with 1.5m setback from primary facades |
| 4 | FACADE_RETENTION | Structurally compromised with valuable facade, or Grade II with no interior significance | Facade kept, 2m setback above, +15% cost, -5% NIA, +3 months |
| 5 | FULL_CONSERVATION | Grade I/II*, WHS buffer | No vertical extension |

### Classification Priority

1. Grade I / II* / WHS buffer → FULL_CONSERVATION (always)
2. Pre-1930, reasonable condition → RETAIN_AND_ADAPT (default)
3. Grade II, any age → RETAIN_AND_ADAPT (unless structurally impossible → FACADE_RETENTION)
4. CA positive contributor → RETAIN_AND_ADAPT
5. Pre-1930, structurally compromised → FACADE_RETENTION (if facade has value) or CONTEXTUAL
6. Post-war in CA → CONTEXTUAL
7. Post-1980, nothing special → UNRESTRICTED

### Cost Model Adjustments

| Type | Cost Multiplier | NIA Efficiency | Upper Floor Coverage | Programme Add |
|------|----------------|---------------|---------------------|--------------|
| 1 | 1.00 | 0% | 100% | 0 |
| 2 | 1.02 | 0% | 100% | 0 |
| 3 | Split: retrofit existing at £1,800-2,500/m2 + new above at £4,000-5,500/m2 | -3% | 65-80% (setback) | 0 (often shorter) |
| 4 | 1.15 | -5% | 60-75% | +3 months |
| 5 | N/A | N/A | N/A | N/A |

### Massing Visual Rules

- Type 3+: Upper floors MUST visually step back from existing building line
- Existing building renders as amber extrusion (retained)
- Additional floors render at REDUCED footprint with visible setback
- Setback = 1.5m from primary facades (Type 3), 2.0m (Type 4)
- Degree conversion: 1.5m ~ 0.0000135 degrees longitude at London latitude

### Full Reference

See `references/heritage-massing-rules.md` for complete framework with precedents, policy citations, and implementation details.

---

## NHLE VERIFICATION - MANDATORY (locked 2026-03-25)

**No site ships without NHLE verification. No exceptions. Ever.**

Heritage data must come from the National Heritage List for England (NHLE), not inference.

### The Rule

Before any intelligence file is created or updated:
1. Run `python3 scripts/nhle-heritage-check.py --site <name>`
2. Every listed building within 50m must be recorded in the intelligence file
3. `nhle_verified: true` and `nhle_date` must be present in `heritage_framework`
4. Heritage tier must be AT LEAST the minimum tier implied by NHLE results

### Minimum tier by NHLE result

| NHLE finding | Minimum tier |
|-------------|-------------|
| Grade I or II* ON-SITE | FULL_CONSERVATION |
| Grade II ON-SITE | RETAIN_AND_ADAPT |
| Grade I or II* ADJACENT (15-50m) | navigable |
| Grade II ADJACENT (15-50m) | manageable |
| Nothing within 50m | clean (permitted) |

### API (free, no auth required)

```
https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/ArcGIS/rest/services/
National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/0/query
?geometry=<lng>,<lat>&geometryType=esriGeometryPoint&inSR=4326
&spatialRel=esriSpatialRelIntersects&distance=50&units=esriSRUnit_Meter
&outFields=Name,Grade,ListEntry&f=json
```

### Why this exists (2026-03-25)

24 Southwark Street (The Hop Exchange) was marked as NDHA in the intelligence data. It is Grade II listed (NHLE 1385923, listed 1970). An audit of all 61 sites found 10 critical mismatches including listed buildings ON-SITE being marked "clean". All fixed in commit 29a60fa.

This is a **fatal product wound** if shown publicly. One screenshot of our massing on a beloved listed building and the product is dead.

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

## DEVELOPER SCALE CONTEXT (locked 2026-03-23)

Narrative commentary adapts to the scale of developer viewing the report.

**Scale derivation:**
- Default: auto-derived from active scenario (Lo = small, Base = mid, Hi = large)
- Override: user can manually select Small / Mid / Large via toggle pill row
- Override persists across scenario switches until cleared
- Toggle shows auto-derived value in muted text when in auto mode

**Scale bands and language register:**

| Scale | TDC band | Finance | Fees | S106 / Affordable | Programme |
|-------|----------|---------|------|-------------------|-----------|
| small | ~£2-8M | Bridging / mezzanine, 8-9%, draw on day 1 | 15-18% (min fees apply) | 10-unit threshold, commuted sum route | 2yr, no EIA |
| mid | ~£8-35M | Senior debt + mez, 7-8%, S-curve | 12-15%, full consultant team | Affordable obligation likely, on-site vs commuted sum | EIA may apply |
| large | £35M+ | Senior debt, 7-7.5%, S-curve | 10-12%, economies of scale | S106 negotiated, full affordable strategy | GLA referral likely |

**Implementation:**
- `devScaleOverride` variable: null = auto
- `getDevScale()` returns override if set, else derives from `activeIdx`
- Scale context block appended to narrative section in `render()` - additive only
- No financial calc changes. No scoring changes. No map code.
- Roll out to 24SS first, then all sites on approval.

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

---

## MISSING PARAMETERS - RULES ENGINE GAPS (2026-03-26)

The following parameters are NOT currently in the scoring/rules engine but MUST be before any public launch:

### BLOCKERS (score should be capped or site removed)
1. **Public realm / open space** - plazas, pedestrian areas, public gardens. If site IS public realm -> REMOVE
2. **Operational infrastructure** - active stations, substations, pumping stations. If operational -> score cap 50 + "Delivery: 10+ years" flag
3. **Protected open space (MOL)** - Metropolitan Open Land is untouchable -> REMOVE
4. **Active social housing** - Council estates with Section 105 ballot requirement -> score cap 40

### HEAVY PENALTIES (score modifier -15 to -25)
5. **Land ownership: NR/TfL/Crown Estate** - 3-5 year deal minimum. Apply -20 penalty + "Complex Acquisition" flag
6. **Infrastructure safeguarding** - Crossrail 2, Bakerloo Line Extension, Thames Tideway zones. Apply -15 penalty
7. **Already consented / under construction** - Not an "opportunity" -> flag as "In Progress" or remove

### COST PENALTIES (affect GDV/RLV, not score directly)
8. **Contamination risk** - Former gas works, petrol stations, industrial. Add remediation cost £500k-£5M to TDC
9. **Plot area = 0** - 132/155 sites have no plot area. WITHOUT plot area, GDV is fabricated. MUST backfill before launch.

### CONTEXT FLAGS (informational, no score impact)
10. **Current planning status** - Already refused? Consented? Under appeal? Pre-app submitted?

---

## EXTENDED INTELLIGENCE FILE SCHEMA (2026-03-26)

Added from NicInSources parameterisation framework. These fields live outside the 6-factor scoring engine - they are screening flags, cost modifiers, and workflow triggers.

### `environment` block
- `flood_zone` (1/2/3) - EA Flood Map for Planning
- `surface_water_risk` (low/medium/high) - EA RoFSW
- `historic_landfill` (boolean) + `historic_landfill_proximity_m`
- `contamination_screening` (low/medium/high) + note
- `strategic_noise` (low/moderate/high) - Defra Round 4 (2022)
- `air_quality.aqma` (boolean) + `aqma_name` + note

### `ecology` block
- `bng_mandatory` (boolean) - all new permissions from Feb 2024
- `bng_cost_estimate_low` / `bng_cost_estimate_high` (GBP)
- `designated_sites_within_500m` (array)
- `tpo_on_site` / `tpo_adjacent` (boolean)
- `protected_species_risk` (low/medium/high)

### `sustainability` block
- `wlc_required` (boolean) - GLA WLC Guidance for referable schemes
- `circular_economy_required` (boolean) - GLA CES Guidance
- `energy_planning.part_l` / `.be_seen` / `.breeam_target` / `.breeam_cost_uplift_per_sqm`
- `epc_existing.rating` / `.floor_area_m2` / `.lodgement_date`

### `policy_designations` block
- `opportunity_area` (object with name/ref/targets)
- `caz` (boolean)
- `sil` (boolean)
- `tall_building_zone` (boolean) + `tall_building_threshold_m`
- `article4_directions` (array of strings)
- `locally_listed` (boolean)

### `delivery` block
- `fire_statement_required` (boolean) - London Plan Policy D12
- `bsr_gateway` (boolean) - BSR Higher-Risk Building regime
- `eia_required` (boolean)
- `gla_referral` (boolean)
- `pre_commencement_gates` (array of strings)
- `estimated_pre_app_cost` (low/high GBP)
- `estimated_planning_duration_months` (low/high)

### Evidence hierarchy rule
Every parameter must be classified as one of:
1. **Hard rule** - deterministic from authoritative source (flood zone, listed status)
2. **Screening flag** - strong official evidence, not final conclusion (contamination, noise)
3. **Workflow trigger** - requires survey/expert/search (heritage statement, fire strategy, GI)
4. **Informational context** - useful but not decisive (EPC, PTAL, precedent count)

Never present screening flags as definitive compliance. The platform structures evidence and generates workflow tasks - it does not replace professional judgment.

---

## TYPOGRAPHY SCALE (locked 2026-03-26)

Global text size rules - apply to ALL pages, no exceptions:

| Role | Size | Examples |
|------|------|---------|
| Eyebrow / section labels | **11px** | PRICING, DISCOVER, PLANNING, ARCHITECTURE |
| Tier card names, feature types, CTA buttons, nav sub-label | **13px** | "Appraise", "Free", nav tagline |
| Secondary body, features, labels | **14px minimum** | Body copy, matrix labels, list items |
| Nav links, subheadings | **18-20px** | Nav, section subheadings |
| Headings, display, hero | **20px+** | Section headings, hero text |

**No text smaller than 11px anywhere on the product surface.**
**No text smaller than 14px for body copy or functional labels.**

---

## CONTRAST RULES (locked 2026-03-26)

### Dark backgrounds (dark sections, glass cards, map overlays)
- Body text: minimum `rgba(255,255,255,0.65)` — never below 65% opacity
- Secondary/labels: minimum `rgba(255,255,255,0.50)`
- Tertiary/decorative: minimum `rgba(255,255,255,0.40)` — only for non-readable UI elements
- **Ban: any rgba opacity below 0.65 on readable text**

### Light backgrounds (cream/white sections)
- Body text: minimum `--ink2: #3a3a38` — never lighter
- Secondary: minimum `--ink3: #6a6a65` — never lighter
- **Ban: any grey hex lighter than #6a6a65 on light backgrounds**

### Enforcement
After reset: grep audit across all files flagging opacity < 0.65 on dark backgrounds and hex greys lighter than #6a6a65 on light backgrounds. Fix all violations in one pass.

---

## BISCUIT (MONOSPACE) FONT RULE (locked 2026-03-26)

- Minimum monospace (`var(--mono)`, JetBrains Mono) font size: **18px**
- Applies to all metric values, scores, prices, financial figures
- No mono text smaller than 18px anywhere on the product surface

## DISCOVER MASSING POPUP - LOCKED DESIGN (2026-03-27, commit 48a28a4)

**Do not modify popup design without Nic explicit approval.**

### Tab card
- Single unified dark box: `rgba(0,0,0,.65)` + `1px solid rgba(255,255,255,.1)` - NO backdrop-filter/blur
- `min-width: 476px`, left-aligned at `top: 16px; left: 16px`
- Tab format: `LOW - 8F` / `BASE - 11F` / `HIGH - 14F` (single line, label + sep + floors)
- Active tab: `rgba(255,255,255,.1)` bg + white text + copper inset border `box-shadow: inset 0 0 0 1.5px var(--accent)`
- Inactive tabs: transparent + `rgba(255,255,255,.35)` text
- **Copper divider**: `4px solid var(--accent)` between tabs and data row + `drop-shadow(0 3px 8px rgba(184,132,92,.45))`
- Data row: copper tint bg `rgba(184,132,92,.06)`, shows Added floors / Added NIA / Est. height / Build cost
- Data row fades in on popup open and on tab switch

### Right panel
- Width: `480px`, padding `32px 36px`
- Site name: `36px Instrument Serif`
- Address: uppercase `13px` sans, `rgba(255,255,255,.45)`
- Verdict pill: `align-self: flex-start` (not full width)
- Gated list: 5 items with icon + name + copper "Full report" tag

### Street View (pegman)
- Drag 🚶 onto map canvas - drop pin (copper teardrop, `position:fixed z-index:99999`) follows cursor
- On drop: `StreetViewService.getPanorama` with 100m radius, opens in left canvas
- `← 3D` button at `top: 68px right: 20px` to return
- Escape key: first press exits SV → back to 3D; second press closes popup

### Scrim
- Close only on genuine click (mousedown AND mouseup both on scrim) - drag-rotate safe

### Ghosted black standard (approved 2026-03-27)
All UI overlays on maps use `rgba(0,0,0,.65)` + `1px solid rgba(255,255,255,.1)` - NO glass/blur effects.
