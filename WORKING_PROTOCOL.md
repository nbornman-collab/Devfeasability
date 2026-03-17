# PROTOCOL v2 — LOCKED

Last updated: 2026-03-17
Status: LOCKED. Do not deviate without explicit instruction from Nic.

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

Every task that touches this codebase starts with 🐐 on its own line.
That emoji is proof the protocol was read before anything was done.
If Nic doesn't see 🐐 before code or decisions: call it out.

---

## CORE RULE

No code is written until:
1. Understanding is proven
2. Impact is mapped
3. Plan is explicit

No task is complete until:
4. It is verified with evidence

---

## STEP 0 — READ & PLAN CONFIRMATION (MANDATORY)

Runs before anything else. No exceptions.

---

### 1. READ CONFIRMATION (Proof of Understanding)

- Target File: [filename]
- Core Logic: (1 sentence — what this file does)
- Key Functions / Sections:
  - [function] — purpose
  - [function] — purpose
- Variables & Data Types:
  - [variable] ([type]) — source/usage
  - [variable] ([type]) — source/usage

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

## STEP 1 — PRE-CHANGE DECLARATION

Before touching any file:

```
ABOUT TO CHANGE: [specific change] in [file + location]
DEPENDS ON THIS: [files/functions]
WILL NOT TOUCH: [locked values / invariants]
RISK: [what could break]
```

If any part is unclear → go back to Step 0.

---

## STEP 2 — IMPLEMENTATION

Make the change exactly as planned.

If the first attempt fails:
→ STOP
→ ROOT CAUSE required before next attempt

Second attempt without root cause = breach.
Third attempt = full diagnostic + Nic approval required.

---

## STEP 3 — POST-COMMIT VERIFICATION (MANDATORY)

Run against: https://web-production-9d1a0.up.railway.app

```
POST-COMMIT VERIFICATION — [commit hash]
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
9. Anything uncertain: [honest answer — especially maps/3D]
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
Option A: [interpretation] — consequence
Option B: [interpretation] — consequence
Await instruction.
```

No silent decisions. Ever.

---

## API DEPENDENCY GATE

Before using any external API:
1. Make live production call
2. Show response
3. Output: `API [name] verified working at [timestamp]`

**Known broken in production — do not build against:**
- OS NGD `/api/building-data` — returns `found:false`
- OS Places API — returns 401

---

## PLACEHOLDER PROTOCOL

Any unverified data must:
1. Be marked in code: `// PLACEHOLDER: [description] — replace before production`
2. Be logged in `PLACEHOLDERS.md`: file, line, purpose, owner
3. Use commit prefix: `PLACEHOLDER:`

Never removed without explicit instruction from Nic.
Nic reviews `PLACEHOLDERS.md` at sprint end.

**Verified sites only (HMLR + EPC + PropertyData confirmed):**
- 24 Southwark Street SE1 — TGL221350, RREEF Bankside II, commercial, 1,550m²
- 196 Blackfriars Road SE1 — SGL322825, Barts Charity, residential, 583m²

**Disqualified / unverified:**
- 100LH — SOM Diamond, planning granted Jan 2025, plot area wrong
- 1SS — polygon uncertain, status unverified
- Surrey Quays, Tesco, Lavington St, Ministry of Sound — fabricated

---

## REGRESSION PREVENTION

When editing shared files (server.js, lib/, site-intelligence.js):
- List all dependent files before touching anything
- Run full verification (not partial) after every change

---

## 3D MAP — HIGH RISK RULES

Before editing any map or 3D code:
- Read entire `initMap()` / `style.load` callback
- List all variables referenced
- Confirm every variable is defined in THIS file

**Locked values — do not change without explicit instruction:**
- `EXISTING_HEIGHT`: 100LH=28.6m, 1SS=30.0m, 24SS=24.8m, 196BR=13.7m
- Use `CENTROID` in T2, not `LAT`/`LNG` — those don't exist in T2
- `SITE_COORDS`: verified title polygons — do not regenerate
- `fill-extrusion-base` for `podium-3d`: always `0`
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`

**Known failure pattern:** Silent errors inside `style.load` stop all rendering. `updateMap()` never runs. No error shown.

---

## LAYOUT ARCHITECTURE — DO NOT MIX

| Tier | Layout | Key constraint |
|------|--------|----------------|
| T1 | Fixed ribbons + contained map | `--left-w:52px`, `--right-w:420px`, `--ribbon-h:96px` |
| T2 | Fixed 50/50 split | Both `position:fixed` — external nav bars break this |
| T3 | Scrollable report | Has own sticky `.tier-nav` |

---

## PROTOCOL UPDATES

If a rule isn't working or a new failure pattern emerges:
1. Flag it: "Protocol says X but it failed because Y — proposing update"
2. Nic approves
3. Update file, commit, show exactly what changed
4. No silent edits to this protocol. Ever.

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

## KNOWN BROKEN / PARKED — DO NOT TOUCH

- OS NGD `building-data` — `found:false` in production
- OS Places API — 401 in production
- T3 floor plan PDF timing — Overpass async issue
- Borough screener paywall — parked
- 100LH plot area (1,551m² is single title — real consolidated site is 4,450m²)
