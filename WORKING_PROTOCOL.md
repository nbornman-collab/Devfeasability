# Working Protocol — D/A Dev Feasibility App

Last updated: 2026-03-17
Status: LOCKED. Do not deviate without explicit instruction from Nic.

---

## Recurring Error Patterns — Root Cause Analysis

These are the patterns that have broken the same things repeatedly across sessions.
Understanding the root cause is more useful than a checklist.

---

### Pattern 1: 3D Massing breaks on small edits

**History:**
- Day 1: Z-fighting with existing building — documented, lesson noted, then repeated
- Day 2: Three.js 3D "missing" — CDN failing silently, never caught before commit
- Day 2: Core penetrating east wall — geometry assumed correct without testing
- Multiple T2 massing reverts: `da39f81`, `d06f9d0`, `d04af24` (back and forth)
- Tonight: 5 commits to fix the same massing problem (`3275b98` → `1c61d05` → `e37a10d` → `feb4cae` → `7c4e0fc`)
- Tonight final root cause: `LAT`/`LNG` undefined in T2 — ReferenceError killed `style.load` silently

**Root cause:**
1. Map initialisation code is async with multiple callbacks. Errors inside callbacks fail silently or prevent later code from running.
2. Variables are assumed to be in scope without checking. T1 and T2 share visual logic but have different variable contexts.
3. Changes are made to one part of the map pipeline without tracing all downstream dependencies.

**Rule:**
Before touching any map or 3D code:
- Read the entire `initMap()` / `style.load` callback
- List every variable referenced. Grep for each one. Confirm it's defined in THIS file.
- Know the full layer creation order before changing any layer
- Test: if adding a `console.log` would prove this works, add it mentally first

**Known confirmed values — do not change without Nic's instruction:**
- `EXISTING_HEIGHT`: 100LH=28.6m, 1SS=30.0m, 24SS=24.8m, 196BR=13.7m
- `CENTROID`: verified HMLR centroids per site (do NOT use `LAT`/`LNG` in T2 — they don't exist there)
- `SITE_COORDS`: verified title polygons — do not regenerate
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`
- `podium-3d` base: always `0` (not `EXISTING_HEIGHT`) — prevents z-fighting
- OS NGD `/api/building-data`: returns `found:false` in production. Do not rely on it.

---

### Pattern 2: Fabricated data presented as real

**History:**
- March 13: Batch-scored Southwark buildings, surfaced Surrey Quays Shopping Centre, Tesco Extra, Ministry of Sound — these were from an OSM query but were never verified as real development opportunities
- These stayed in the screener for weeks, unquestioned
- Tonight: Nic had to point them out. "Joking me" looking at a Borough screener with a Tesco at the top.

**Root cause:**
Placeholder / batch-generated data was committed without a visible marker. Once in the code, it looked like intentional data. Nobody caught it because it was never labelled as approximate.

**Rule:**
- If data is placeholder, batch-generated, or unverified: comment it `// PLACEHOLDER — not verified, do not show to anyone`
- Tell Nic explicitly: "This is placeholder data"
- Only two sites have been fully verified (HMLR + EPC + PropertyData): 24SS and 196BR
- Do not add a site to the screener unless its address, ownership, use, and approximate area have been verified against a named source

---

### Pattern 3: Not reading the existing file before editing

**History:**
- 1SS polygon: 4 attempts (`975ade9`, `8808ff9`, `50a651d`, `e71f9f9`), each worse than the last, because the first attempt didn't understand how the geometry was constructed
- T2 nav: injected a fixed 44px nav bar without reading that T2 is a fixed 50/50 full-screen layout — broke the whole page
- EPC: duplicate server handlers sat in server.js for days (`906c613` fixed it) — would have been caught if I'd read the file first
- Tonight: LAT/LNG undefined — would have been caught if I'd scanned variable declarations before writing map code

**Root cause:**
Starting to write before understanding what's already there. The assumption is always "I know what this file does." The reality is "this file has accumulated changes across multiple sessions and may not match my mental model."

**Rule:**
Before editing any existing file:
1. Read the relevant sections (grep for the function/variable being changed)
2. Identify what other code depends on what I'm changing
3. State the change in plain English before writing a single line

---

### Pattern 4: Piecemeal fixes — same problem, multiple commits

**History:**
- T2 3D: reverted and re-applied three times in one sprint
- Tonight: 5 commits fixing the same massing bug iteratively
- T1 redesign: multiple commits patching the same visual issues (dark text, panel border, HMLR watermark)

**Root cause:**
Fixing the visible symptom rather than diagnosing the actual cause. When something doesn't work, the first response is to change the most visible property. This hides the real issue.

**Rule:**
When something doesn't work:
1. State what the expected behaviour is
2. State what the actual behaviour is
3. Identify the CAUSE (not the symptom) before writing any fix
4. Write the fix for the cause, not the symptom
5. If the cause is unknown, add logging/debugging before guessing

One fix per problem. If a second commit is needed to fix the first fix, that's a protocol violation — go back and understand why the first fix was wrong before trying again.

---

### Pattern 5: Softening instructions without flagging it

**History:**
- Nic: "eliminate the knucklehead sites" → Ace: adds badges + score penalties
- Nic: "3D approach from March 13 10:36 is locked" → multiple T2 3D reverts and re-attempts
- Nic: "expert panel check-in before every sprint" → sprints started without it

**Root cause:**
When an instruction seems hard or the "softened" version seems more pragmatic, the temptation is to implement the easier version silently. This is always wrong. If the exact instruction can't be done, say so before doing anything else.

**Rule:**
Do exactly what was asked. If I can't or won't, say that explicitly before doing an alternative. "I can't do X because Y — should I do Z instead?" is acceptable. Silently doing Z is not.

---

### Pattern 6: API dependencies assumed working without verification

**History:**
- OS Places API: assumed it worked, returned 401 in production. Multiple T1/T2 polygon attempts failed because of this.
- OS NGD `/api/building-data`: assumed it worked, returns `found:false` in production
- Both were used as the basis for polygons and heights in the UI — when they failed silently, the UI fell back to wrong data

**Root cause:**
Building against an API endpoint without testing it in the actual production environment. Local dev or curl tests pass; Railway production has different env var configuration.

**Rule:**
When building against an external API:
1. Test the endpoint in production before writing code that depends on it
2. Write fallbacks that are clearly labelled as fallbacks (not silently wrong)
3. Log when a fallback is used — don't let errors disappear quietly

---

## The Two Non-Negotiable Steps

These run on every task. No exceptions. No matter how small.

---

### Step 1 — Before touching any file

State in the chat:

```
ABOUT TO CHANGE: [specific change] in [filename]
DEPENDS ON THIS: [other files/pages that use what I'm changing]
WILL NOT TOUCH: [confirmed values, locked behaviour]
RISK: [honest — what could break]
```

If I cannot answer all four lines, I read the file first until I can.

---

### Step 2 — After every commit, before saying anything is done

Run live verification against https://web-production-9d1a0.up.railway.app and post:

```
POST-COMMIT VERIFICATION — [commit hash]
1. Homepage loads: [pass/fail]
2. T0 Borough screener loads, shows sites: [pass/fail]
3. T1 [site] loads, map renders, score shows: [pass/fail]
4. T2 [site] loads, map renders, massing appears on scenario change: [pass/fail]
5. T3 loads, financials show non-zero numbers: [pass/fail]
6. Files touched: [list]
7. Files NOT touched but depend on what I changed: [list]
8. Anything uncertain: [honest answer]
```

All pass → commit stands. I say "done."
Any fail → I fix it and re-run. I do not say "done" until all pass.
I never say "pushed" or "done" without running this. Ever.

---

### What Nic does

Nothing mid-task. No babysitting.
If something looks wrong days later — send me the commit hash. I trace it.

---

## Before Any Code Change

1. **Read the file** — grep or read the relevant section. Understand what's already there.
2. **State the plan** — 3–5 bullet points: what I'll change, what I won't touch, known risks.
3. **Do exactly what was asked** — no silent softening.

---

## Layout Architecture — Do Not Mix

T1, T2, T3 have completely different layout architectures. They are not interchangeable.

| Tier | Layout | Key constraint |
|------|--------|----------------|
| T1 | Fixed ribbons + contained map | `--left-w:52px`, `--right-w:420px`, `--ribbon-h:96px` |
| T2 | Fixed 50/50 (map left, panel right) | Both `position:fixed`. External nav bars break this. |
| T3 | Scrollable long-form report | Has own sticky `.tier-nav` |

Never inject external HTML into a page without understanding its layout model first.

---

## Data Integrity

### Verified sites (HMLR + EPC + PropertyData confirmed)
- **24 Southwark Street SE1** — TGL221350, RREEF Bankside II Limited, commercial, 1,550m²
- **196 Blackfriars Road SE1** — SGL322825, Barts Charity, residential, 583m²

### Sites removed / disqualified
- **100 Leadenhall Street** — SOM Diamond, planning granted Jan 2025 → disqualified
- **1 Silk Street** — status needs verification before re-use
- **Surrey Quays Shopping Centre** — fabricated placeholder, never real
- **Tesco Extra Canada Water** — fabricated placeholder, never real
- **Lavington Street** — now Timber Square (Landsec, completed)
- **Ministry of Sound** — politically complex, wrong product fit

---

## Sprint Process

1. State the plan in plain language
2. List files that will be touched
3. List variables/functions being added or changed
4. Identify the riskiest part and how it will be handled
5. Wait for Nic's go-ahead

---

## Things That Must Not Change Without Explicit Instruction

- Mapbox camera angles on any page
- `SITE_COORDS` polygon data
- `EXISTING_HEIGHT` confirmed values
- T1 100LH layout (the reference)
- Intelligence scoring weights and factor names
- D/A brand: product name, slash colour, nav structure
- `fill-extrusion-base` for `podium-3d` (must stay `0` to prevent z-fighting)
- Borough screener scoring formula

---

## Known Broken / Parked — Do Not Touch

- OS NGD `/api/building-data` — returns `found:false` in production. Hardcoded fallbacks are the fix.
- OS Places API — returns 401 in production. Do not use for polygon data.
- T3 floor plan "Loading…" for PDF — Overpass async timing. Parked.
- Borough screener paywall — parked until Nic confirms approach.
- 3D polygon issues — parked until instructed.
