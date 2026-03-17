# Working Protocol — D/A Dev Feasibility App

Last updated: 2026-03-17
Status: LOCKED. Do not deviate without explicit instruction from Nic.

---

## Why This Exists

This project has repeated the same categories of mistakes across sessions despite documenting them. The root problem: I have no persistent memory. Every session I start fresh. Rules only work if they produce visible, checkable outputs — not if they're filed and assumed to be followed.

This protocol is a ritual script, not a reference document. Every significant action generates specific outputs. That's how compliance is enforced without babysitting.

---

## The Two Non-Negotiable Steps

These run on every task. No exceptions. No matter how small it seems.

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
No declaration = no code.

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
8. Anything uncertain: [honest answer — especially for map/visual rendering]
```

All pass → commit stands. I say "done."
Any fail → I fix it and re-run. I do not say "done" until all pass.
HTTP 200 ≠ map renders. For any map or 3D change, a browser check is required — flag this explicitly.
I never say "pushed" or "done" without running this. Ever.

---

### What Nic does

Nothing mid-task. No babysitting.
If something looks wrong days later — send me the commit hash. I trace it.

---

## Ambiguity Gate

If any instruction is unclear, conflicts with existing code, or conflicts with a confirmed decision:

**STOP. Output:**

```
AMBIGUITY: [what conflicts]
Option A: [interpretation] — consequence: [what this does]
Option B: [interpretation] — consequence: [what this does]
Awaiting instruction before proceeding.
```

Silent interpretation is a protocol breach. I never resolve ambiguity unilaterally.

---

## Piecemeal Fix Prevention

If a fix doesn't work and I'm about to try again:

**STOP. Output root cause analysis first:**

```
ROOT CAUSE: [what actually caused the bug — not the symptom]
FIX SCOPE: [what needs to change to fix the cause]
```

Second commit on the same bug = root cause analysis required before any code.
Third commit on the same bug = full diagnostic, Nic sees and approves before I touch anything.

---

## Placeholder Data Protocol

Any fabricated, estimated, batch-generated, or unverified data must:

1. Be marked in code: `// PLACEHOLDER: [what this is] — replace before production`
2. Be logged in `PLACEHOLDERS.md` with: file, line number, what it stands in for, who owns replacing it
3. Use commit message prefix: `PLACEHOLDER:` — never committed as if it's real

I never remove a PLACEHOLDER marker without explicit instruction from Nic.
Nic reviews `PLACEHOLDERS.md` at the end of each sprint.

**Verified sites (HMLR + EPC + PropertyData confirmed):**
- 24 Southwark Street SE1 — TGL221350, RREEF Bankside II, commercial, 1,550m²
- 196 Blackfriars Road SE1 — SGL322825, Barts Charity, residential, 583m²

**All other demo sites are unverified or disqualified:**
- 100LH — SOM Diamond, planning granted Jan 2025, plot area wrong (1,551m² used vs 4,450m² actual consolidated site)
- 1SS — polygon fought over for days, area uncertain, status unverified
- Surrey Quays, Tesco, Lavington St, Ministry of Sound — fabricated, never real
- Convoys Wharf — hot mess, bad data from the start

---

## API Dependency Test Gate

Before writing any code that depends on an external API:

1. Make a live test call to the production endpoint
2. Show the response or confirm success
3. Output: `API [name] verified working in production at [timestamp]`

**Known broken in production — do not build against:**
- OS NGD `/api/building-data` — returns `found:false` in production. Hardcoded fallbacks only.
- OS Places API — returns 401 in production. Do not use for polygon data.

---

## Regression Prevention

Silent regressions are the most damaging failure mode — things get broken by edits to other files, discovered days later by coincidence, and pile up.

**Every time I edit a shared file (server.js, any lib/, site-intelligence.js):**
- List every page/file that imports or depends on it
- Run the full verification checklist after committing, not just the pages I edited

**The verification checklist (Step 2) is the regression net.**
It runs after every commit. Not occasionally. Every time.

---

## 3D Map / Massing — Highest Risk Area

Every change must follow this before touching map code:

**Read the entire `initMap()` / `style.load` callback.**
List every variable referenced. Grep for each one. Confirm it's defined in THIS file.

**Confirmed values — do not change without explicit instruction:**
- `EXISTING_HEIGHT`: 100LH=28.6m, 1SS=30.0m, 24SS=24.8m, 196BR=13.7m
- `CENTROID`: use this in T2, not `LAT`/`LNG` — those variables don't exist in T2
- `SITE_COORDS`: verified title polygons — do not regenerate
- `fill-extrusion-base` for `podium-3d`: always `0` — prevents z-fighting
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`
- `map.moveLayer('podium-3d')` called after all layers added

**Known fragile patterns:**
- Errors inside `style.load` callbacks fail silently — `updateMap()` never runs if there's an error above it
- `bufferPoly()` output must be wrapped: `coordinates: [envCoords]`
- OS NGD returns `found:false` in production — hardcoded fallbacks are the only reliable source

---

## Layout Architecture — Do Not Mix

T1, T2, T3 have completely different layout architectures. Never assume they're the same.

| Tier | Layout | Key constraint |
|------|--------|----------------|
| T1 | Fixed ribbons + contained map | `--left-w:52px`, `--right-w:420px`, `--ribbon-h:96px` |
| T2 | Fixed 50/50 split (map + panel) | Both `position:fixed` — external nav bars break this entirely |
| T3 | Scrollable long-form report | Has own sticky `.tier-nav` |

Before adding anything to a page: read its layout model first.

---

## Things That Must Not Change Without Explicit Instruction

- Mapbox camera angles on any page
- `SITE_COORDS` polygon data
- `EXISTING_HEIGHT` confirmed values
- T1 100LH layout spec (the reference for all T1 pages)
- Intelligence scoring weights and factor names
- D/A brand: product name, slash colour, nav structure
- Borough screener scoring formula
- Any value described as "confirmed" or "locked" in memory files

---

## Protocol Updates

If a rule isn't working, or a new failure pattern emerges that isn't covered:

1. I flag it explicitly: "The protocol says X but it failed because Y — I think we need to update it. Here's what I'd propose."
2. Nic approves the change
3. I update the file, commit it, show exactly what changed
4. No silent edits to this protocol. Ever.

The protocol improves through use. If something keeps breaking despite the rules, that's a signal the rule is wrong or incomplete — not a reason to ignore it.

---

## Sprint Process

1. State the plan in plain language
2. List files that will be touched
3. List variables/functions being added or changed
4. Identify the riskiest part and how it will be handled
5. Wait for Nic's go-ahead
6. Run full verification after every commit
7. Post results before calling the sprint done

---

## Known Broken / Parked — Do Not Touch

- OS NGD `building-data` — `found:false` in production
- OS Places API — 401 in production
- T3 floor plan PDF timing — Overpass async issue, parked
- Borough screener paywall — parked until Nic confirms approach
- 3D polygon accuracy for 100LH and 1SS — parked, sites being replaced
- 100LH plot area (1,551m² is single title only — real site is 4,450m²) — do not use 100LH financials as accurate until corrected

---

## Recurring Error Patterns — For Reference

These are documented so the pattern is visible, not to be re-read and forgotten.

**Pattern 1 — 3D breaks on small edits:** Async callbacks fail silently. Variables assumed in scope. Errors before `updateMap()` prevent massing from ever rendering.

**Pattern 2 — Fabricated data presented as real:** Placeholder data committed without markers. Looks intentional once in the code. Tesco, Surrey Quays, Convoys — all examples.

**Pattern 3 — Not reading the file before editing:** Mental model of the file is outdated. 1SS polygon went through 4 broken attempts because I never understood the existing geometry first.

**Pattern 4 — Piecemeal fixes:** Fixing symptom not cause. Tonight's massing took 5 commits. Each fixed the visible thing, not the actual error (LAT/LNG undefined).

**Pattern 5 — Softening instructions:** "Eliminate bad sites" became "add score penalties." Easier to implement, wrong outcome.

**Pattern 6 — API dependencies assumed working:** OS Places and OS NGD both broken in production. Built against them anyway. Multiple polygon failures resulted.
