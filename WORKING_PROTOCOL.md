# Working Protocol — D/A Dev Feasibility App

Last updated: 2026-03-17
Status: LOCKED. Do not deviate without explicit instruction from Nic.

---

## Core Rule

**Read before write. Plan before code. State assumptions explicitly.**

If any of these three steps is skipped, stop and do them first.

---

## Before Any Code Change

1. **Read the file** — grep or read the relevant section. Understand what's already there.
2. **State the plan** — 3–5 bullet points: what I'll change, what I won't touch, known risks.
3. **Wait for a nod** on anything non-trivial (layout changes, new data, new routes, map code).
4. **Do exactly what was asked** — no silent softening (e.g. "score them down" instead of "remove them").

---

## 3D Map / Massing (Highest Risk Area)

This is the most fragile part of the codebase. Every change must follow this checklist:

### Before touching map code:
- [ ] Read the full `initMap()` function
- [ ] List every variable referenced (especially in closures and async callbacks)
- [ ] Confirm all referenced variables are defined in scope — **check for LAT, LNG, CENTROID, EXISTING_HEIGHT, SITE_COORDS, FTF**
- [ ] Note which event (`style.load` vs `load`) layers are added in

### Known fragile patterns:
- `LAT` / `LNG` are defined in T1 pages but **NOT in T2**. Use `CENTROID[1]` / `CENTROID[0]` in T2.
- `EXISTING_HEIGHT` must be hardcoded to a confirmed value. OS NGD `/api/building-data` returns `found:false` in production — do not rely on it as the sole source.
- `fill-extrusion-base` overlapping with another `fill-extrusion` layer at the same polygon → z-fighting. Green massing always uses `base: 0` (full proposed volume).
- `map.moveLayer(id)` must be called after all layers are added, not before.
- `bufferPoly(SITE_COORDS, dist)` output must be wrapped in `[result]` for GeoJSON coordinates: `coordinates: [envCoords]`
- Sources must be added before layers. Sources start as `emptyPoly()`. `setData()` is called in `updateMap()`.
- `updateMap(0)` is called at the END of the `style.load` callback, after all sources/layers are added.

### Do not change without explicit instruction:
- Mapbox style (`light-v11` for T2)
- Camera angles (zoom, pitch, bearing, center)
- `EXISTING_HEIGHT` confirmed values: 100LH = 28.6m, 1SS = 30.0m, 24SS = 24.8m, 196BR = 13.7m
- `SITE_COORDS` polygons — these are verified HMLR title polygons
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`

---

## Layout Changes (Second Highest Risk)

T1, T2, and T3 each have completely different layout architectures:

| Tier | Layout type | Key constraint |
|------|-------------|----------------|
| T1 | Fixed ribbons + contained map | `--left-w:52px`, `--right-w:420px`, `--ribbon-h:96px` |
| T2 | Fixed 50/50 split (map left, panel right) | Map and panel both `position:fixed`. Adding external nav breaks this. |
| T3 | Scrollable long-form report | Has its own sticky `.tier-nav` |

**Rule: Never inject a nav bar into a page with `position:fixed` full-screen layout (T2).** Add nav to T2's existing internal tier-nav instead.

**Rule: When adding nav to multiple pages, read each page's layout first — don't assume they're the same.**

---

## Data Integrity

### Never fabricate site data
- If demo data is needed, label it `// PLACEHOLDER — replace before launch` in the code
- Tell Nic explicitly: "This is placeholder data"
- Do not put Tesco, Surrey Quays, shopping centres, or sites with active planning consent into a screener as if they're real opportunities

### Confirmed real sites (researched with HMLR + EPC + PropertyData):
- **24 Southwark Street SE1** — TGL221350, RREEF Bankside II Limited, commercial, 1,550m², £22M EUV
- **196 Blackfriars Road SE1** — SGL322825, Barts Charity, residential, 583m², £4.5M EUV

### Sites to remove / replace:
- Surrey Quays Shopping Centre — fabricated placeholder
- Tesco Extra Canada Water — fabricated placeholder
- 100 Leadenhall Street — SOM Diamond, planning granted Jan 2025, disqualified
- 1 Silk Street — verify before using; likely already consented or under development
- Lavington Street — now Timber Square (Landsec, completed), not a buildable site

---

## When Instructions Are Given

1. **Do exactly what was asked.** If the instruction is "eliminate bad sites", remove them. Do not soften to "score them down".
2. **If something is unclear**, ask before coding — not after.
3. **If I disagree with the approach**, say so before writing code, not after breaking something.
4. **Flag scope changes** — if the correct fix turns out to be larger than expected, say so and wait.

---

## Commit Discipline

- One commit per logical change. Not one commit per file.
- Never commit broken code. Verify the logic before committing.
- Commit message must state: what changed, why, and what was the root cause (for bug fixes).
- Do not stack "also fix X while I'm here" into a commit without flagging it.

---

## Before Any Sprint

1. State the plan in plain language
2. List the files that will be touched
3. List variables/functions that will be added or changed
4. Identify the riskiest part and explain how it'll be handled
5. Wait for Nic's go-ahead

---

## Things That Must Not Change Without Explicit Instruction

- Mapbox camera angles on any page
- `SITE_COORDS` polygon data
- `EXISTING_HEIGHT` values
- T1 100LH layout spec (the reference)
- Intelligence scoring weights and factor names
- D/A brand: product name, slash colour, nav structure
- Borough screener scoring formula (unless Nic asks)
- `HEARTBEAT.md` cron tasks

---

## Known Broken / Parked

Do not touch these unless specifically asked:

- OS NGD `/api/building-data` — returns `found:false` in production. Hardcoded fallbacks are the fix.
- T3 floor plan "Loading…" for PDF — timing issue with Overpass async render. Parked.
- 3D polygon issues — parked until instructed.
- Borough screener paywall — parked until Nic confirms approach.
