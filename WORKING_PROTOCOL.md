## MAP STYLE RULES (🦞 locked 2026-03-18)

- Homepage hero map: dark-v11 vector + 3D fill-extrusion buildings. NOT satellite. Camera rotation speed: 0.063 deg/frame (3x baseline).
- Borough screener map: satellite-v9 aerial (not vector). Site markers must be strong/visible - minimum 18px, high contrast, with pulse animation on verified sites.
- Borough site popups: must include (1) satellite thumbnail image from Mapbox Static API, (2) high-level score data, (3) direct link to T2 Appraise if available.
- Mapbox Static API for thumbnails: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{lng},{lat},18,0,55/320x200?access_token={token}` - lazy-loaded on popup open only (free tier: 50k/month).

---

## GLA PLANNING DATAMAP (🦞 primary resource)

Last updated: 2026-03-17
Status: LOCKED. Do not deviate without explicit instruction from Nic.

---

## GLA PLANNING DATAMAP (🦞 primary resource)

Live ArcGIS REST API - no key required. Use for all spatial policy checks.

Base: `https://gis2.london.gov.uk/server/rest/services/apps/planning_data_map_02/MapServer`
Query pattern: `/{layer_id}/query?geometry={lng},{lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&f=json`

Key layers:
- 103 Opportunity Areas | 107 Central Activities Zone | 205 Conservation Areas
- 214 Listed Buildings | 213 Protected Vistas (LVMF) | 101 Brownfield Register
- 102 Site Allocations | 108 SHLAA | 111-113 MCIL2 Charging Bands | 218 Thames Policy Area

Server endpoint: `/api/gla-planning?lat=&lng=` (all layers in one call, parallel)

Rules:
- GLA data overrides hardcoded flags. If GLA says LVMF Wider Setting Consultation Area - update the flag.
- Check all 10 layers for every new site before writing intelligence file.
- LVMF Wider Setting Consultation Area is an advisory - not a blocking constraint unless in Viewing Corridor.

---


## Why This Exists

This system fails in repeatable ways:
- Not reading files properly
- Making local fixes that break other parts
- Assuming APIs/data work
- Declaring success without real verification

The root issue: no persistent memory.

This protocol replaces memory with forced, visible reasoning and proof.

---

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


---

## LANGUAGE RULES

- **No em dashes**: Never use em dashes (—) in any output, code comments, HTML, or messages.
  Replace all em dashes with a regular hyphen-dash (-). This applies everywhere - codebase, replies, docs.
- **🦞 protocol trigger**: When Nic sends 🦞, it means "add the preceding decision/instruction to WORKING_PROTOCOL.md immediately."
  Ace must update the protocol file and commit before continuing.
- **Top nav strip**: ALL web pages must display the D/A brand + T0/T1/T2/T3 tier navigation.
  No page ships without visible D/A branding and tier context. T2 map-bar is minimum acceptable on split-screen pages.

---

## STEP 0 - READ & PLAN CONFIRMATION (MANDATORY)

Runs before anything else. No exceptions.

---

### 1. READ CONFIRMATION (Proof of Understanding)

- Target File: [filename]
- Core Logic: (1 sentence - what this file does)
- Key Functions / Sections:
  - [function] - purpose
  - [function] - purpose
- Variables & Data Types:
  - [variable] ([type]) - source/usage
  - [variable] ([type]) - source/usage

If this cannot be completed:
→ STOP
→ "I have not read the file/context properly"

---

### 2. IMPACT ASSESSMENT (Proof of Scope)

- Impact Zone: (exact functions / lines being changed)
- Downstream Effects: (files/functions depending on this)
- Locked Constraints Check: (confirm no conflict with confirmed values, map constraints, layout rules, scoring systems)
- Edge Case Risks: (1–2 real failure modes)

---

### 3. EXECUTION PLAN (Proof of Logic)

- The Change: "I am changing [X] to achieve [Y]"
- Proposed Logic: (how the code will actually change)
- Regression Risk: (what could break elsewhere)
- Verification Path: (which parts of Step 2 will prove this works)

---

### 4. AMBIGUITY CHECK (Forced)

- Any unclear instruction?
- Any missing data?
- Any conflict with existing logic or locked values?

If yes → AMBIGUITY GATE (see below)

---

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

If any part is unclear → go back to Step 0.

---

## STEP 2 - IMPLEMENTATION

Make the change exactly as planned.

If the first attempt fails:
→ STOP
→ ROOT CAUSE required before next attempt

Second attempt without root cause = breach.
Third attempt = full diagnostic + Nic approval required.

---

## STEP 3 - POST-COMMIT VERIFICATION (MANDATORY)

Run against: https://web-production-9d1a0.up.railway.app

```
POST-COMMIT VERIFICATION - [commit hash]
1. Homepage loads
   Evidence: [response / curl / screenshot]
   Result: pass/fail
2. T0 Borough screener loads
   Evidence: [...]
   Result: pass/fail
3. T1 [site] loads, map renders, score shows
   Evidence: [...]
   Result: pass/fail
4. T2 [site] loads, map renders, massing updates
   Evidence: [...]
   Result: pass/fail
5. T3 loads, financials non-zero
   Evidence: [...]
   Result: pass/fail
6. Files touched: [list]
7. Dependent files (not touched): [list]
8. Diff summary:
   - Lines added: [#]
   - Lines removed: [#]
   - Unrelated changes: [yes/no + explanation]
9. Anything uncertain: [honest answer - especially maps/3D]
10. SECOND-ORDER CHECK: What could still be wrong even if all passed?
```

Rules:
- All pass → commit stands → say "done"
- Any fail → fix → rerun verification
- No evidence = fail
- HTTP 200 ≠ working
- For map/3D → browser verification required → must be explicitly stated

---

## AMBIGUITY GATE

If anything conflicts or is unclear:

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
- OS NGD `/api/building-data` - returns `found:false`
- OS Places API - returns 401

---

## PLACEHOLDER PROTOCOL

Any unverified data must:
1. Be marked in code: `// PLACEHOLDER: [description] - replace before production`
2. Be logged in `PLACEHOLDERS.md`: file, line, purpose, owner
3. Use commit prefix: `PLACEHOLDER:`

Never removed without explicit instruction from Nic.
Nic reviews `PLACEHOLDERS.md` at sprint end.

**Verified sites only (HMLR + EPC + PropertyData confirmed):**
- 24 Southwark Street SE1 - TGL221350, RREEF Bankside II, commercial, 1,550m²
- 196 Blackfriars Road SE1 - SGL322825, Barts Charity, residential, 583m²

**Disqualified / unverified:**
- 100LH - SOM Diamond, planning granted Jan 2025, plot area wrong
- 1SS - polygon uncertain, status unverified
- Surrey Quays, Tesco, Lavington St, Ministry of Sound - fabricated

---

## REGRESSION PREVENTION

When editing shared files (server.js, lib/, site-intelligence.js):
- List all dependent files before touching anything
- Run full verification (not partial) after every change

---

## 3D MAP - HIGH RISK RULES

Before editing any map or 3D code:
- Read entire `initMap()` / `style.load` callback
- List all variables referenced
- Confirm every variable is defined in THIS file

**Locked values - do not change without explicit instruction:**
- `EXISTING_HEIGHT`: 100LH=28.6m, 1SS=30.0m, 24SS=24.8m, 196BR=13.7m
- Use `CENTROID` in T2, not `LAT`/`LNG` - those don't exist in T2
- `SITE_COORDS`: verified title polygons - do not regenerate
- `fill-extrusion-base` for `podium-3d`: always `0`
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`

**Known failure pattern:** Silent errors inside `style.load` stop all rendering. `updateMap()` never runs. No error shown.

---

## LAYOUT ARCHITECTURE - DO NOT MIX

| Tier | Layout | Key constraint |
|------|--------|----------------|
| T1 | Fixed ribbons + contained map | `--left-w:52px`, `--right-w:420px`, `--ribbon-h:96px` |
| T2 | Fixed 50/50 split | Both `position:fixed` - external nav bars break this |
| T3 | Scrollable report | Has own sticky `.tier-nav` |

---

## PROTOCOL UPDATES

If a rule isn't working or a new failure pattern emerges:
1. Flag it: "Protocol says X but it failed because Y - proposing update"
2. Nic approves
3. Update file, commit, show exactly what changed
4. No silent edits to this protocol. Ever.

---

## OPPORTUNITY AREA RULES (🦞 locked)

- **Layer Opportunity Area (OA) designation into every site.** OA status is a first-class planning intelligence field, not a footnote.
- **OA sites receive**: Planning Tailwind score bonus, explicit OA flag in T1 planning flags (green), and relaxed height precedent framing in Available Sky insight.
- **OA source**: London Plan 2021 Policy SD1 / GLA OAPF documents. Cite the named OA and its targets (homes + jobs).
- **OA means**: Mayoral backing for intensification, departure from standard density matrix, taller buildings more justifiable, LPA expected to facilitate not resist.
- **Non-OA sites** do not get OA score treatment. Framing must be conservative on height.
- **Opportunity Area field**: add `opportunity_area: { name, ref, homes_target, jobs_target, oapf }` to the `momentum` factor in every intelligence file.

---

## PLANNING PRECEDENT RULES (🦞 locked)

- **Minimum 2 real precedents per site** in Planning Tailwind and Heritage Shadow intelligence. Must be named schemes or LPA application references within 1km or same typology.
- **Never fabricate planning references.** If uncertain, flag as "unverified - check LPA register."
- **Cite LPA application reference** (e.g. 20/AP/1537) wherever known. If unknown, cite scheme name + approximate year.
- **Precedents must address what IS achievable** - not just flag constraints. Intelligence should answer: what height, what coverage, what strategy got approved nearby?
- **Victorian/NDHA sites**: Precedent research must include retention-led schemes. Demolition-and-replace requires specific precedent justification - default to set-back/retention strategy unless a clearance scheme within 500m and same character is cited.

---

## MASSING INPUT RULES (🦞 locked)

- **makeRect and _makeRectEarly are DELETED. Do not recreate them.** No rectangle fallback for site massing, ever.
- **Site polygon source**: `m.queryRenderedFeatures` on the composite `building` layer at CENTROID after `map.once('idle')`. Sources initialise with `emptyPoly()`. Massing renders only after real polygon loads.
- **`SITE_COORDS = null` on init.** Set only after queryRenderedFeatures returns valid coords (length > 3). If it returns nothing, show empty state - never fake a polygon.
- **`SITE_COORDS` must be `let`** (not const) so the idle handler can assign it.
- **Context buildings (ctx-3d) opacity must be 0.20** - ghosted grey surroundings, not solid. `fill-extrusion-opacity: 0.20` on the ctx-3d layer. Never 1.0.

---

## THINGS THAT MUST NOT CHANGE WITHOUT EXPLICIT INSTRUCTION

- Mapbox camera angles on any page
- `SITE_COORDS` polygon data
- `EXISTING_HEIGHT` confirmed values
- T1 100LH layout spec
- Intelligence scoring weights and factor names
- D/A brand: product name, slash colour, nav structure
- Borough screener scoring formula

---

## KNOWN BROKEN / PARKED - DO NOT TOUCH

- OS NGD `building-data` - `found:false` in production
- OS Places API - 401 in production
- T3 floor plan PDF timing - Overpass async issue
- Borough screener paywall - parked
- 100LH plot area (1,551m² is single title - real consolidated site is 4,450m²)
Protocol violation logged: 2026-03-18 11:13 UTC — 🐐 omitted from reply containing commits 550bdde

---

## COMPREHENSIVE AUDIT RULE (🦞 locked 2026-03-18)

When any page is reported broken, do NOT just fix the symptom reported.
Run a full audit of ALL active pages before committing any fix:
- T0 Borough, T1 (24SS + 196BR), T2 (24SS), homepage, methodology
- Check: JS syntax validity (node --check), CSS variable references, map container height, script src 404s, API endpoint reachability
- Fix everything found in one commit - not piecemeal
- Post-commit: verify ALL pages return HTTP 200 AND log what was found + fixed

---

## SCENARIO-SPECIFIC CONSTRUCTION COST (🦞 locked 2026-03-18)

Construction cost (£/m²) must be scenario-specific — it escalates with building height.
Each SCENARIO object must carry its own `costGsm` value reflecting height-based escalation.
The financial model must use `s.costGsm` per scenario, not a flat multiplier of one slider value.
The cost slider sets the Base scenario cost; Low and High derive from scenario-defined escalation factors,
not arbitrary ×0.82 / ×1.25 multipliers.
